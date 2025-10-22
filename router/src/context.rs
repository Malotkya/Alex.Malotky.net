use worker::{
    Env, Method
};
use std::collections::HashMap;

pub struct Context<'r, P> {
    pub env: &'r Env,
    pub search: &'r HashMap<String, String>,
    pub headers:&'r HashMap<String, String>,
    pub path: &'r str,
    pub anchor: &'r str,
    pub method: &'r Method,
    pub params: P,
    pub(crate) current:String,
}

impl<'r, Old> Context<'r, Old> {
    
    fn match_path<P: crate::Path>(&self, path: &P) -> Option<Context<'r, P::Param>> {
        path.test_match(&self.current).map(|(str, params)|{
            Context {
                env: self.env,
                search: self.search,
                headers: self.headers,
                path: self.path,
                anchor: self.anchor,
                method: self.method,
                params: params,
                current: self.current[str.len()..].to_string()
            }
        })
    }
}