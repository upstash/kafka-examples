addEventListener("fetch", (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
});

async function handleRequest(request) {
    const { pathname } = new URL(request.url)
    if (pathname.startsWith('/favicon')) {
        return fetch(request)
    }
    const auth = Buffer.from(`${UPSTASH_KAFKA_REST_USERNAME}:${UPSTASH_KAFKA_REST_PASSWORD}`).toString('base64')
    const message = "hello";
    const init = {headers: {"Authorization": `Basic ${auth}`},}

    resp = await fetch(`${UPSTASH_KAFKA_REST_URL}/produce/${TOPIC_NAME}/${message}`,init);
    return resp
}