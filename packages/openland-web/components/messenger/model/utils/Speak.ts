export function speakText(message: string) {
    try {
        var msg = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(msg);
    } catch (e) {
        console.warn(e);
    }
}