import sdpTransform from 'sdp-transform';

export function mangleSDP(src: string) {
    let obj = sdpTransform.parse(src);

    console.warn(JSON.stringify(obj.media));

    // Keep only audio or video media
    obj.media = obj.media.filter((v) => {
        return v.type === 'video' || v.type === 'audio' || v.type === 'application';
    });

    // Filter codecs
    obj.media = obj.media.map((v) => {
        let codecs: string[];
        if (v.type === 'video') {
            codecs = ['H264', 'red', 'ulpfec'];
        } else if (v.type === 'audio') {
            codecs = ['opus'];
        } else if (v.type === 'application') {
            return v;
        } else {
            throw Error('Impossible');
        }

        // Find all payload ids
        let payloadIds = v.rtp.filter((r) => codecs.indexOf(r.codec) >= 0).map((p) => p.payload);

        // Filter Codecs
        v.rtp = v.rtp.filter((r) => payloadIds.indexOf(r.payload) >= 0);
        v.fmtp = v.fmtp.filter((r) => payloadIds.indexOf(r.payload) >= 0);
        if (v.rtcpFb) {
            v.rtcpFb = v.rtcpFb.filter((r) => payloadIds.indexOf(r.payload) >= 0);
        }

        // Update Payloads field
        v.payloads = payloadIds.map((p) => p.toString()).join(' ');

        return v;
    });

    console.warn(JSON.stringify(obj));

    return sdpTransform.write(obj);
}