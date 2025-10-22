use quote::quote;
use proc_macro2::{TokenStream, Span};
use router::path_to_regex;
use syn::Ident;

pub struct PathAttributes {
    pub path: String,
    pub end: bool,
    pub trailing: bool,
    pub insensitive: bool
}

pub struct Path {
    pub stream: TokenStream,
    pub ident: Ident,
    pub param: Ident,
}

pub fn build_path_type(name:&syn::Ident, keys:&Vec<String>) -> (Ident, TokenStream, usize) {
    let mut fields = quote!();
    let mut constructor = quote!();

    let ident = Ident::new(
        &format!("{}Params", name),
        name.span()
    );

    let length = keys.len();
    for i in 0..length {
        let field = syn::Ident::new(&keys[i], Span::call_site());

        fields.extend(quote!{
            pub #field: String,
        });

        constructor.extend(quote!{
            #field: list[#i].to_owned(),
        });
    }

    (
        ident.clone(),
        quote! {
        pub struct #ident {
            #fields
        }

        impl #name {
            fn new(list: [&str; #length]) -> Self {
                Self { #constructor }
            }
        }

    }, length )
}

pub fn build_path(name:&syn::Ident, att:&PathAttributes) -> Path {
    let (pattern, keys) = path_to_regex(
        &att.path,
        att.trailing,
        att.end
    );

    let ident = Ident::new(
        &format!("{}Path", name),
        name.span()
    );
    let insensitive = att.insensitive;

    let (param_name, param_struct, size) = build_path_type(
        &ident,
        &keys
    );

    Path {
        ident: ident.clone(),
        param: param_name.clone(),
        stream: quote!{
            #param_struct

            struct #ident(reges::Regex);

            impl #ident {
                fn new() -> Self {
                    Self(
                        regex::RegexBuilder::new(#pattern)
                            .case_insensitive(#insensitive).build().unwrap()
                    )
                }
            }

            impl router::Path for #ident {
                type Param = #param_name;

                fn test_match(&self, value:&str) -> Option<(&str, Self::Param)> {
                    self.0.captures(pathname) {
                        Some(caps) => {
                            let (heystack, list) = caps.extract() as (&str, [&str; #size])
                            Some(heystack, #param_name::new(list))
                        },
                        None => None
                    }
                }
            }
        }
    }
}