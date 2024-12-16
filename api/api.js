export function stage() {
    const url = window.location.hostname;
    if (url === "localhost") {
        return "dev";
    } else {
        return "prod";
    }
}

export function api() {
    if (stage() === "dev") {
        return "http://localhost:3000";
    } else {
        return "https://api.example.com";
    }
}