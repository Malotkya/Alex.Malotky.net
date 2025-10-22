use proc_macro2::TokenStream;
use syn::parse::{Parse, ParseStream, Result};
use quote::quote;
use crate::path::*;
use router::Method;

pub(crate) struct LayerAttributes {
    path: PathAttributes,
    methods: u16
    
}

impl Parse for LayerAttributes {

    fn parse(input:ParseStream) -> Result<Self> {
        let map = super::util::InputParser::new(input)?;

        let path = PathAttributes {
            path: map.get_string("path")?,
            end: map.get_bool("path_end")
                    .unwrap_or(true),
            trailing: map.get_bool("path_trailing")
                    .unwrap_or(false),
            insensitive: map.get_bool("path_insensitive")
                    .unwrap_or(true),
        };
        
        let methods_list = map.get_string_vec("methods").unwrap_or(Vec::new());
        let mut methods:u16;

        if methods_list.is_empty() {
            methods = Method::All as u16;
        } else {
            methods = 0;

            for string in methods_list {
                if let Ok(method) = string.parse::<Method>() {
                    methods |= method as u16;
                }
            }
        }



        return Ok(Self{
            path,
            methods
        })
    }
}

pub fn build(args:LayerAttributes, handler:syn::ItemFn) -> Result<TokenStream> {
    let name = handler.sig.ident;
    let methods = args.methods;

    let path = build_path(&name, &args.path);
    let path_ident = path.ident;
    let path_stream = path.stream;


    let public = handler.vis;
    let hand_attr:Vec<_> = handler.sig.inputs.iter().collect();
    let hand_block = handler.block;
    let hand_return = handler.sig.output;
    let hand_genics = handler.sig.generics;
    let async_call = handler.sig.asyncness;

    //panic!("{:?}", hand_return);

    Ok(
        quote! {
            #path_stream

            #public struct #name {
                path: #path_ident,
                methods: router::Methods
            }

            impl #name {
                pub fn new() -> Self {
                    Self {
                        path: #path_ident::new(),
                        methods: Methods::from(#methods)
                    }
                }

                #async_call fn handler #hand_genics(&self, #(#hand_attr),* ) #hand_return {
                    #hand_block
                }
            }

            impl router::Layer for #name {
                async fn handle(&self, ctx:&Context<T>) -> impl Future<Output = Option<worker::Result<worker::Response>>>; {
                    if self.methods.is(ctx.method) {
                        ctx.match_path(self.path).map(|ctx|{
                            self.handler(ctx)
                        })
                    } else {
                        None
                    }
                }
            }
        }
    )
}