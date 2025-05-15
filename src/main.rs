use axum::{Router, routing::get};
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(|| async { "ZK Delivery backend online!" }));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("🚀 Servidor ouvindo em http://{}", addr);

    axum::serve(tokio::net::TcpListener::bind(addr).await.unwrap(), app)
        .await
        .unwrap();
}
