const emojiWordCollection = {
    wow: [
        ['1f62e', [':open_mouth:'], '😮'],
        ['1f628', [':fearful:'], '😨'],
        ['1f631', [':scream:'], '😱'],
        ['1f63b', [':heart_eyes_cat:'], '😻'],
        ['1f60d', [':heart_eyes:'], '😍'],
    ],

    o: [
        ['1f62e', [':open_mouth:'], '😮'],
    ],

    hah: [
        ['1f923', [':rofl:', ':rolling_on_the_floor_laughing:'], '🤣'],
        ['1f602', [':joy:'], '😂'],
        ['1f639', [':joy_cat:'], '😹'],
        ['1f605', [':sweat_smile:'], '😅'],
        ['1f606', [':laughing:', ':satisfied:'], '😆']
    ],

    ok: [
        ['1f44d', [':thumbsup:', ':+1:', ':thumbup:'], '👍'],
        ['1f44c', [':ok_hand:'], '👌'],
        ['2705', [':white_check_mark:'], '✅'],
        ['1f197', [':ok:'], '🆗'],
    ],

    no: [
        ['1f645', [':person_gesturing_no:', ':no_good:'], '🙅'],
        ['1f645-200d-2642-fe0f', [':man_gesturing_no:'], '🙅‍♂️'],
        ['1f44e', [':thumbsdown:', ':-1:', ':thumbdown:'], '👎'],
        ['1f648', [':see_no_evil:'], '🙈'],
        // ['1f3f3-fe0f-200d-1f308', [':rainbow_flag:', ':gay_pride_flag:'], '🏳️‍🌈'],
    ],

    hi: [
        ['1f44b', [':wave:'], '👋'],
        ['270c-fe0f', [':v:'], '✌️'],
        ['1f596', [':vulcan:', ':raised_hand_with_part_between_middle_and_ring_fingers:'], '🖖'],
        ['1f91a', [':raised_back_of_hand:', ':back_of_hand:'], '🤚'],
    ],

    yo: [
        ['270c-fe0f', [':v:'], '✌️'],
    ],

    hm: [
        ['1f914', [':thinking:', ':thinking_face:'], '🤔'],
    ],

    dunno: [
        ['1f937-200d-2642-fe0f', [':man_shrugging:'], '🤷‍♂️'],
        ['1f937-200d-2640-fe0f', [':woman_shrugging:'], '🤷‍♀️'],
    ],

    wat: [
        ['1f928', [':face_with_raised_eyebrow:'], '🤨'],
        ['1f914', [':thinking:', ':thinking_face:'], '🤔'],
        ['1f937-200d-2642-fe0f', [':man_shrugging:'], '🤷‍♂️'],
        ['1f937-200d-2640-fe0f', [':woman_shrugging:'], '🤷‍♀️'],
    ],

    yay: [
        ['1f64c', [':raised_hands:'], '🙌'],
        ['1f389', [':tada:'], '🎉'],
        ['1f38a', [':confetti_ball:'], '🎊'],
        ['', [':party_face:'], '🥳'],
    ]
};

export const emojiWordMap = {
    'wow': emojiWordCollection.wow,
    'omg': emojiWordCollection.wow,
    'воу': emojiWordCollection.wow,
    'омг': emojiWordCollection.wow,

    // 'o': emojiWordCollection.o,
    // 'о': emojiWordCollection.o,

    'hah': emojiWordCollection.hah,
    'хах': emojiWordCollection.hah,
    'аха': emojiWordCollection.hah,

    'lol': emojiWordCollection.hah,
    'лол': emojiWordCollection.hah,

    'ok': emojiWordCollection.ok,
    'ок': emojiWordCollection.ok,

    'yep': emojiWordCollection.ok,
    'ага': emojiWordCollection.ok,

    'yes': emojiWordCollection.ok,
    'да': emojiWordCollection.ok,

    'no': emojiWordCollection.no,
    // 'не': emojiWordCollection.no,
    'нет': emojiWordCollection.no,

    'hi': emojiWordCollection.hi,
    'прив': emojiWordCollection.hi,

    'hm': emojiWordCollection.hm,
    'хм': emojiWordCollection.hm,
    'нуу': emojiWordCollection.hm,

    'dunno': emojiWordCollection.dunno,
    'хз': emojiWordCollection.dunno,

    'wat': emojiWordCollection.wat,
    'че': emojiWordCollection.wat,
    'чё': emojiWordCollection.wat,

    'yo': emojiWordCollection.yo,
    'йо': emojiWordCollection.yo,

    'yay': emojiWordCollection.yay,
    'ура': emojiWordCollection.yay,
};