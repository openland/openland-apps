import { mangleSDP } from './mangleSDP';

describe('mangleSDP', () => {
    it('should keep only opus codecs', () => {
        let sdp = `
        v=0
        o=- 7935371295621574052 2 IN IP4 127.0.0.1
        s=-
        t=0 0
        a=group:BUNDLE 0 1
        a=msid-semantic: WMS YyAaeu7fkyaQhWtoLfYDMR7UQHQzXo0O4n2v
        m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 110 112 113 126
        c=IN IP4 0.0.0.0
        a=rtcp:9 IN IP4 0.0.0.0
        a=ice-ufrag:ZT6G
        a=ice-pwd:PXDxTRsjvxfsL8PSO9s5fUKz
        a=ice-options:trickle
        a=fingerprint:sha-256 D6:D9:3D:29:DA:AE:A0:B0:93:76:80:B4:86:38:94:71:38:C3:45:5E:E2:89:2F:54:B1:6C:C0:3F:D8:C2:A0:8E
        a=setup:actpass
        a=mid:0
        a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
        a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
        na=extmap:3 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
        a=extmap:4 urn:ietf:params:rtp-hdrext:sdes:mid
        a=extmap:5 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id
        a=extmap:6 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id
        a=sendrecv
        a=msid:YyAaeu7fkyaQhWtoLfYDMR7UQHQzXo0O4n2v 66112148-2fda-44ef-8ead-459c0219e40c
        a=rtcp-mux
        a=rtpmap:111 opus/48000/2
        a=rtcp-fb:111 transport-cc
        a=fmtp:111 minptime=10;useinbandfec=1
        a=rtpmap:103 ISAC/16000
        a=rtpmap:104 ISAC/32000
        a=rtpmap:9 G722/8000
        a=rtpmap:0 PCMU/8000
        a=rtpmap:8 PCMA/8000
        a=rtpmap:110 telephone-event/48000
        a=rtpmap:112 telephone-event/32000
        a=rtpmap:113 telephone-event/16000
        a=rtpmap:126 telephone-event/8000
        a=ssrc:3082694993 cname:9X7qeldZwuCPhSku
        a=ssrc:3082694993 msid:YyAaeu7fkyaQhWtoLfYDMR7UQHQzXo0O4n2v 66112148-2fda-44ef-8ead-459c0219e40c
        a=ssrc:3082694993 mslabel:YyAaeu7fkyaQhWtoLfYDMR7UQHQzXo0O4n2v
        a=ssrc:3082694993 label:66112148-2fda-44ef-8ead-459c0219e40c
        m=video 9 UDP/TLS/RTP/SAVPF 98 100 96 97 99 101 102 122 127 121 125 107 108 109 124 120 123 119 114 115 116
        c=IN IP4 0.0.0.0
        a=rtcp:9 IN IP4 0.0.0.0
        a=ice-ufrag:ZT6G
        a=ice-pwd:PXDxTRsjvxfsL8PSO9s5fUKz
        a=ice-options:trickle
        a=fingerprint:sha-256 D6:D9:3D:29:DA:AE:A0:B0:93:76:80:B4:86:38:94:71:38:C3:45:5E:E2:89:2F:54:B1:6C:C0:3F:D8:C2:A0:8E
        a=setup:actpass
        a=mid:1
        a=extmap:14 urn:ietf:params:rtp-hdrext:toffset
        a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
        a=extmap:13 urn:3gpp:video-orientation
        a=extmap:3 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
        a=extmap:12 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay
        a=extmap:11 http://www.webrtc.org/experiments/rtp-hdrext/video-content-type
        a=extmap:7 http://www.webrtc.org/experiments/rtp-hdrext/video-timing
        a=extmap:8 http://tools.ietf.org/html/draft-ietf-avtext-framemarking-07
        a=extmap:9 http://www.webrtc.org/experiments/rtp-hdrext/color-space
        a=extmap:4 urn:ietf:params:rtp-hdrext:sdes:mid
        a=extmap:5 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id
        a=extmap:6 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id
        a=sendrecv
        a=msid:YyAaeu7fkyaQhWtoLfYDMR7UQHQzXo0O4n2v ca9c7c4d-dd2b-4cdb-b82f-fe8b91377366
        a=rtcp-mux
        a=rtcp-rsize
        a=rtpmap:96 VP8/90000
        a=rtcp-fb:96 goog-remb
        a=rtcp-fb:96 transport-cc
        a=rtcp-fb:96 ccm fir
        a=rtcp-fb:96 nack
        a=rtcp-fb:96 nack pli
        a=rtpmap:97 rtx/90000
        a=fmtp:97 apt=96
        a=rtpmap:98 VP9/90000
        a=rtcp-fb:98 goog-remb
        a=rtcp-fb:98 transport-cc
        a=rtcp-fb:98 ccm fir
        a=rtcp-fb:98 nack
        a=rtcp-fb:98 nack pli
        a=fmtp:98 profile-id=0
        a=rtpmap:99 rtx/90000
        a=fmtp:99 apt=98
        a=rtpmap:100 VP9/90000
        a=rtcp-fb:100 goog-remb
        a=rtcp-fb:100 transport-cc
        a=rtcp-fb:100 ccm fir
        a=rtcp-fb:100 nack
        a=rtcp-fb:100 nack pli
        a=fmtp:100 profile-id=2
        a=rtpmap:101 rtx/90000
        a=fmtp:101 apt=100
        a=rtpmap:102 H264/90000
        a=rtcp-fb:102 goog-remb
        a=rtcp-fb:102 transport-cc
        a=rtcp-fb:102 ccm fir
        a=rtcp-fb:102 nack
        a=rtcp-fb:102 nack pli
        a=fmtp:102 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f
        a=rtpmap:122 rtx/90000
        a=fmtp:122 apt=102
        a=rtpmap:127 H264/90000
        a=rtcp-fb:127 goog-remb
        a=rtcp-fb:127 transport-cc
        a=rtcp-fb:127 ccm fir
        a=rtcp-fb:127 nack
        a=rtcp-fb:127 nack pli
        a=fmtp:127 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42001f
        a=rtpmap:121 rtx/90000
        a=fmtp:121 apt=127
        a=rtpmap:125 H264/90000
        a=rtcp-fb:125 goog-remb
        a=rtcp-fb:125 transport-cc
        a=rtcp-fb:125 ccm fir
        a=rtcp-fb:125 nack
        a=rtcp-fb:125 nack pli
        a=fmtp:125 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f
        a=rtpmap:107 rtx/90000
        a=fmtp:107 apt=125
        a=rtpmap:108 H264/90000
        a=rtcp-fb:108 goog-remb
        a=rtcp-fb:108 transport-cc
        a=rtcp-fb:108 ccm fir
        a=rtcp-fb:108 nack
        a=rtcp-fb:108 nack pli
        a=fmtp:108 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f
        a=rtpmap:109 rtx/90000
        a=fmtp:109 apt=108
        a=rtpmap:124 H264/90000
        a=rtcp-fb:124 goog-remb
        a=rtcp-fb:124 transport-cc
        a=rtcp-fb:124 ccm fir
        a=rtcp-fb:124 nack
        a=rtcp-fb:124 nack pli
        a=fmtp:124 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=4d0032
        a=rtpmap:120 rtx/90000
        a=fmtp:120 apt=124
        a=rtpmap:123 H264/90000
        a=rtcp-fb:123 goog-remb
        a=rtcp-fb:123 transport-cc
        a=rtcp-fb:123 ccm fir
        a=rtcp-fb:123 nack
        a=rtcp-fb:123 nack pli
        a=fmtp:123 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=640032
        a=rtpmap:119 rtx/90000
        a=fmtp:119 apt=123
        a=rtpmap:114 red/90000
        a=rtpmap:115 rtx/90000
        a=fmtp:115 apt=114
        a=rtpmap:116 ulpfec/90000
        a=ssrc-group:FID 3719347516 1141567297
        a=ssrc:3719347516 cname:9X7qeldZwuCPhSku
        a=ssrc:3719347516 msid:YyAaeu7fkyaQhWtoLfYDMR7UQHQzXo0O4n2v ca9c7c4d-dd2b-4cdb-b82f-fe8b91377366
        a=ssrc:3719347516 mslabel:YyAaeu7fkyaQhWtoLfYDMR7UQHQzXo0O4n2v
        a=ssrc:3719347516 label:ca9c7c4d-dd2b-4cdb-b82f-fe8b91377366
        a=ssrc:1141567297 cname:9X7qeldZwuCPhSku
        a=ssrc:1141567297 msid:YyAaeu7fkyaQhWtoLfYDMR7UQHQzXo0O4n2v ca9c7c4d-dd2b-4cdb-b82f-fe8b91377366
        a=ssrc:1141567297 mslabel:YyAaeu7fkyaQhWtoLfYDMR7UQHQzXo0O4n2v
        a=ssrc:1141567297 label:ca9c7c4d-dd2b-4cdb-b82f-fe8b91377366`.replace(/^ +/gm, '');
        let mangled = mangleSDP(sdp);
        expect(mangled).toMatchSnapshot();
    });
});