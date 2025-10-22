use std::{
    str::FromStr,
    convert::Infallible
};
use worker::Method as HttpMethod;

#[repr(u16)]
#[derive(PartialEq, Eq, Clone, Copy)]
pub enum Method {
    Get = 1,
    Head = 2,
    Post = 4,
    Put = 8,
    Delete = 16,
    Connect = 32,
    Options = 64,
    Trace = 128,
    Patch = 256,
    Report = 512,
    All = Method::Get as u16
        + Method::Head as u16
        + Method::Post as u16
        + Method::Put as u16
        + Method::Delete as u16
        + Method::Connect as u16
        + Method::Options as u16
        + Method::Trace as u16
        + Method::Patch as u16
        + Method::Report as u16
}

impl FromStr for Method {
    type Err = String;

    fn from_str(value: &str) -> Result<Self, Self::Err> {
        match value.to_uppercase().as_str() {
            "GET" => Ok(Self::Get),
            "HEAD" => Ok(Self::Head),
            "POST" => Ok(Self::Post),
            "PUT" => Ok(Self::Put),
            "DELETE" => Ok(Self::Delete),
            "CONNECT" => Ok(Self::Connect),
            "OPTIONS" => Ok(Self::Options),
            "TRACE" => Ok(Self::Trace),
            "PATCH" => Ok(Self::Patch),
            "REPORT" => Ok(Self::Report),
            "ALL" => Ok(Self::All),
            _ => Err(format!("{} is not a Method!", value))
        }
    }
}

impl From<&HttpMethod> for Method {
    fn from(value:&HttpMethod) -> Self {
        match value {
            HttpMethod::Head => Self::Head,
            HttpMethod::Get => Self::Get,
            HttpMethod::Post => Self::Post,
            HttpMethod::Put => Self::Put,
            HttpMethod::Patch => Self::Patch,
            HttpMethod::Delete => Self::Delete,
            HttpMethod::Options => Self::Options,
            HttpMethod::Connect => Self::Connect,
            HttpMethod::Trace => Self::Trace,
            HttpMethod::Report => Self::Report
        }
    }
}

impl TryFrom<&str> for Method {
    type Error = <Method as FromStr>::Err;

    fn try_from(value: &str) -> Result<Self, Self::Error> {
        value.parse()
    }
}

impl TryFrom<String> for Method {
    type Error = <Method as FromStr>::Err;

    fn try_from(value: String) -> Result<Self, Self::Error> {
        value.parse()
    }
}

impl Default for Method {
    fn default() -> Self {
        Self::All
    }
}

pub struct Methods(u16);

impl FromStr for Methods {
    type Err = Infallible;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut value:u16 = 0;

        for sec in s.split(",") {
            if let Ok(method) = sec.trim().parse::<Method>() {
                value |= method as u16;
                if value >= Method::All as u16{
                    break;
                }
            }
        }

        Ok(Self(value))
    }
}

impl Methods {
    pub const fn new() -> Self {
        Self(0)
    }

    pub(crate) fn from(value:u16) -> Self {
        Self(value)
    }

    #[inline]
    pub fn set(&mut self, value:Method) {
        self.0 |= value as u16
    }

    #[inline]
    pub fn remove(&mut self, value:Method) {
        self.0 &= !(value as u16)
    }

    #[inline]
    pub fn toggle(&mut self, value:Method) {
        self.0 ^= value as u16
    }

    pub fn is(&self, value:&HttpMethod) -> bool {
        let value:Method = value.into();
        (self.0 & value as u16) == value as u16
    }

    #[inline]
    pub fn is_none(&self) -> bool {
        self.0 == 0
    }

    #[inline]
    pub fn is_get(&self) -> bool {
        (self.0 & Method::Get as u16) == Method::Get as u16
    }

    #[inline]
    pub fn is_head(&self) -> bool {
        (self.0 & Method::Head as u16) == Method::Head as u16
    }

    #[inline]
    pub fn is_post(&self) -> bool {
        (self.0 & Method::Post as u16) == Method::Post as u16
    }

    #[inline]
    pub fn is_put(&self) -> bool {
        (self.0 & Method::Put as u16) == Method::Put as u16
    }

    #[inline]
    pub fn is_delete(&self) -> bool {
        (self.0 & Method::Delete as u16) == Method::Delete as u16
    }

    #[inline]
    pub fn is_connect(&self) -> bool {
        (self.0 & Method::Connect as u16) == Method::Connect as u16
    }

    #[inline]
    pub fn is_options(&self) -> bool {
        (self.0 & Method::Options as u16) == Method::Options as u16
    }

    #[inline]
    pub fn is_trace(&self) -> bool {
        (self.0 & Method::Trace as u16) == Method::Trace as u16
    }

    #[inline]
    pub fn is_patch(&self) -> bool {
        (self.0 & Method::Patch as u16) == Method::Patch as u16
    }

    #[inline]
    pub fn is_report(&self) -> bool {
        (self.0 & Method::Report as u16) == Method::Report as u16
    }

    #[inline]
    pub fn is_all(&self) -> bool {
        self.0 >= Method::All as u16
    }
}
