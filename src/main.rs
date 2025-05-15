use axum::{routing::get, Router, Server};
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(|| async { "🚀 ZK Backend online!" }));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("Servidor rodando em http://{}", addr);

    Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
