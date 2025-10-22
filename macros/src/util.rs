use std::collections::HashMap;
use proc_macro2::Span;
use syn::parse::ParseStream;
use syn::Error;
use paste::paste;

macro_rules! get_value {
    ($type:ty, $name:ident, $error:literal) => {
        paste!{
            get_value!($type, $name, $error, |x:&syn::[<Lit $name>]|->Result<$type, syn::Error> {Ok(x.value())});
        }
    };
    ($type:ty, $name:ident, $error:literal, $helper:expr) => {
        paste!{
            #[allow(dead_code)]
            pub fn [<get_ $type:lower>](&self, key:&str) -> Result<$type, syn::Error>{
                if let Some((span, value)) = self.0.get(key) {
                    match value {
                        InputType::Literal(literal) => match literal {
                            syn::Lit::$name(v) => Ok($helper(v)?),
                            _ => Err(
                                Error::new(
                                    literal.span(),
                                    format!("Expected {} for {}!", $error, key)
                                )
                            )
                        },
                        InputType::List(_) => Err(
                            Error::new(
                                span.clone(),
                                format!("Expected {} for {}!", $error, key)
                            )
                        )
                    }
                } else {
                    Err(
                        Error::new(
                            Span::call_site(),
                            format!("Missing {} for {}!", $error, key)
                        )
                    )
                }
            }

            #[allow(dead_code)]
            pub fn [<get_ $type:lower _vec>](&self, key:&str) -> Result<Vec<$type>, syn::Error>{
                if let Some((span, value)) = self.0.get(key) {
                    match value {
                        InputType::Literal(_) => Err(
                            Error::new(
                                span.clone(),
                                format!("Expected {} List for {}!", $error, key)
                            )
                        ),
                        InputType::List(lit_list) => {
                            let mut vec = Vec::with_capacity(lit_list.len());

                            for lit in lit_list {
                                match lit {
                                    syn::Lit::$name(v) => vec.push($helper(v)?),
                                    _ => return Err(
                                        Error::new(
                                            lit.span(),
                                            format!("Expected {} in List for {}!", $error, key)
                                        )
                                    )
                                }
                            }

                            Ok(vec)
                        }
                    }
                } else {
                    Err(
                        Error::new(
                            Span::call_site(),
                            format!("Missing {} List for {}!", $error, key)
                        )
                    )
                }
            }
        }
    };
}


enum InputType {
    Literal(syn::Lit),
    List(Vec<syn::Lit>)
}
pub struct InputParser(HashMap<String, (Span, InputType)>);

impl InputParser {
    pub fn new(input:ParseStream) -> Result<Self, syn::Error>{
        let mut map:HashMap<String, (Span, InputType)> = HashMap::new();

        loop {
            let key: syn::Ident = input.parse()?;
            let _: syn::Token![=] = input.parse()?;


            let value:InputType;
            if input.peek(syn::token::Paren) {
                let list;
                syn::parenthesized!(list in input);
                let mut vec: Vec<syn::Lit> = Vec::new();

                while !list.is_empty() {
                    vec.push(list.parse()?);

                    if list.is_empty() {
                        break;
                    } else {
                        list.parse::<syn::Token![,]>()?;
                    }
                }
                
                value = InputType::List(
                    vec
                );
            } else {
                value = InputType::Literal(
                    input.parse()?
                );
            }

            map.insert(key.to_string(), (
                key.span(),
                value
            ));

            if input.is_empty() {
                break;
            } else {
                input.parse::<syn::Token![,]>()?;
            }
        }

        Ok(Self(map))
    }

    get_value!(String, Str, "string");
    get_value!(bool, Bool, "boolean");
    get_value!(u16, Int, "u16", |x: &syn::LitInt|x.base10_parse());
}