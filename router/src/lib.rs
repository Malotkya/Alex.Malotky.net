use worker::{
    Request, Response, Env, Result
};
pub use path::{parse as path_to_regex, Path};
pub use method::{Method, Methods};
pub use context::Context;

mod path;
mod method;
mod context;

pub trait Layer<T> {
    fn handle(&self, ctx:&mut Context<T>)
        -> impl Future<Output = Option<Result<Response>>>;
}