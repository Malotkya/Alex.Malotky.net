use proc_macro::TokenStream;
use router::path_to_regex;

mod util;
mod layer;
mod path;
mod route;

#[proc_macro]
pub fn path(data:TokenStream) -> TokenStream {
    let input = syn::parse_macro_input!(data as syn::LitStr).value();
    let (regex_str, keys) = path_to_regex(&input, false, false);

    quote::quote! {
        (
            regex::RegexBuilder::new(#regex_str)
                .case_insensitive(true).build().unwrap(),
            [#(#keys),*]
        )
    }.into()
}

#[proc_macro_attribute]
pub fn layer(attrs: TokenStream, input: TokenStream) -> TokenStream {
    
    let args: layer::LayerAttributes = syn::parse_macro_input!(attrs);
    let handler: syn::ItemFn = syn::parse_macro_input!(input);

    layer::build(
        args, handler
    ).unwrap().into()
}