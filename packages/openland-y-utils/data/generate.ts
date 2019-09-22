import * as rankings from './emoji-ranking.json';
import * as emojiList from 'emoji.json';
import { emojiConvertToName } from '../emojiExtract';
import * as toolkit from 'emoji-toolkit';
import * as fs from 'fs';

const data: {
    v: string /* value */,
    n: string /* name */,
    sn: string /* short name */,
    r?: number /* rank */,
    a?: string /* animated */,
    c?: number /* category */,
    sc: string /* sprite category */
}[] = [];

const categories = [
    'Smileys & Emotion',
    'People & Body',
    'Animals & Nature',
    'Food & Drink',
    'Travel & Places',
    'Activities',
    'Objects',
    'Symbols',
    'Flags',
    'Component'
];

const animatedEmoji = [
    ['100', '💯'],
    ['angry_face', '😠'],
    ['backhand_index_pointing_down', '👇'],
    ['backhand_index_pointing_right', '👉'],
    ['backhand_index_pointing_left', '👈'],
    ['backhand_index_pointing_up', '👆'],
    ['beaming_face_with_smiling_eyes', '😁'],
    ['bomb', '💣'],
    ['bottle_with_popping_cork', '🍾'],
    ['broken_heart', '💔'],
    ['cat_face', '🐱'],
    ['clapping_hands', '👏'],
    ['clinking_beer_mugs', '🍻'],
    ['clinking_glasses', '🥂'],
    ['cold_face', '🥶'],
    ['collision', '💥'],
    ['confetti_ball', '🎊'],
    ['cow_boy_hat_face', '🤠'],
    ['crossed_fingers', '🤞'],
    ['crown', '👑'],
    ['crying_face', '😢'],
    ['desert_island', '🏝️'],
    ['direct_hit', '🎯'],
    ['dizzy_face', '😵'],
    ['dog_face', '🐶'],
    ['drooling_face', '🤤'],
    ['exploding_head', '🤯'],
    ['face_screaming_in_fear', '😱'],
    ['face_throwing_a_kiss', '😘'],
    ['face_with_head_bandage', '🤕'],
    ['face_with_monocle', '🧐'],
    ['face_with_open_mouth_vomiting', '🤮'],
    ['face_with_rolling_eyes', '🙄'],
    ['face_with_thermometer', '🤒'],
    ['fire', '🔥'],
    ['firework', '🎆'],
    ['flexed_biceps', '💪'],
    ['flushed_face', '😳'],
    ['ghost', '👻'],
    ['grimacing_face', '😬'],
    ['grinning_squinting_face', '😆'],
    ['hear_no_evil_monkey', '🙉'],
    ['heart_eyes', '😍'],
    ['hot_beverage', '☕'],
    ['hot_face', '🥵'],
    ['hugging_face', '🤗'],
    ['light_bulb', '💡'],
    ['loudly_crying_face', '😭'],
    ['lying_face', '🤥'],
    ['man_facepalming', '🤦‍♂️'],
    ['man_raising_hand', '🙋‍♂️'],
    ['man_shrugging', '🤷‍♂️'],
    ['man_tipping_hand', '💁‍♂️'],
    ['middle_finger', '🖕'],
    ['money_mouth_face', '🤑'],
    ['money_with_wings', '💸'],
    ['nerd_face', '🤓'],
    ['oncoming_fist', '👊'],
    ['party_face', '🥳'],
    ['party_popper', '🎉'],
    ['pile_of_poo', '💩'],
    ['pistol', '🔫'],
    ['raising_hands', '🙌'],
    ['relieved_face', '😌'],
    ['revolving_hearts', '💞'],
    ['rocket', '🚀'],
    ['rolling_on_the_floor_laughing', '🤣'],
    ['see_no_evil_monkey', '🙈'],
    ['serious_face_with_symbols_covering_mouth', '🤬'],
    ['shushing_face', '🤫'],
    ['sleeping_face', '😴'],
    ['smiling_face', '☺️'],
    ['smiling_face_with_halo', '😇'],
    ['smiling_face_with_horns', '😈'],
    ['smiling_face_with_sunglasses', '😎'],
    ['smiling_face_with_three_hearts', '🥰'],
    ['smirking_face', '😏'],
    ['sparkles', '✨'],
    ['sparkling_heart', '💖'],
    ['speak_no_evil_monkey', '🙊'],
    ['star_struck', '🤩'],
    ['tears_of_joy', '😂'],
    ['thumbs_down_sign', '👎'],
    ['thumbs_up_sign', '👍'],
    ['triumph_face', '😤'],
    ['trophy', '🏆'],
    ['unamused_face', '😒'],
    ['unicorn_face', '🦄'],
    ['violin', '🎻'],
    ['waving_hand_sign', '👋'],
    ['weary_face', '😩'],
    ['winking_face', '😉'],
    ['winking_face_with_tongue', '😜'],
    ['woman_facepalming', '🤦‍♀️'],
    ['woman_raising_hand', '🙋‍♀️'],
    ['woman_shrugging', '🤷‍♀️'],
    ['woman_tipping_hand', '💁‍♀️'],
    ['woozy_face', '🥴'],
    ['zany_face', '🤪'],
    ['zipper_mouth_face', '🤐'],
];

const emojiListJoypixels = (toolkit as any).emojiList;
const processed = new Set<string>();

function convert(unicode: string) {
    if (unicode.indexOf("-") > -1) {
        var parts = [];
        var s = unicode.split('-');
        for (var i = 0; i < s.length; i++) {
            var part = parseInt(s[i], 16);
            let part2;
            if (part >= 0x10000 && part <= 0x10FFFF) {
                var hi = Math.floor((part - 0x10000) / 0x400) + 0xD800;
                var lo = ((part - 0x10000) % 0x400) + 0xDC00;
                part2 = (String.fromCharCode(hi) + String.fromCharCode(lo));
            } else {
                part2 = String.fromCharCode(part);
            }
            parts.push(part2);
        }
        return parts.join('');
    } else {
        var s1 = parseInt(unicode, 16);
        if (s1 >= 0x10000 && s1 <= 0x10FFFF) {
            var hi1 = Math.floor((s1 - 0x10000) / 0x400) + 0xD800;
            var lo1 = ((s1 - 0x10000) % 0x400) + 0xDC00;
            return (String.fromCharCode(hi1) + String.fromCharCode(lo1));
        } else {
            return String.fromCharCode(s1);
        }
    }
}

for (let em of emojiList) {
    let name = emojiConvertToName(em.char);
    if (processed.has(name)) {
        continue;
    }
    processed.add(name);

    // Unicode standard category
    let category = categories.findIndex((v) => em.category.startsWith(v));
    if (category < 0) {
        throw Error('unable to match category');
    }

    // Popularity rank from twitter
    let r = rankings.find((v) => emojiConvertToName(v.char) === emojiConvertToName(em.char));
    let rank = r ? r.score : undefined;

    // Animated emoji map
    let a = animatedEmoji.find((v) => emojiConvertToName(v[1]) === emojiConvertToName(em.char));
    let animated = a ? a[0] : undefined;

    // Sprite
    // let sns: string[] = [];
    let sn: string | undefined;
    for (let jp in emojiListJoypixels) {
        if (emojiListJoypixels[jp]) {
            let k = emojiListJoypixels[jp];
            if (k.uc_base === name) {
                sn = jp;
                break;
            }
        }
    }
    if (!sn) {
        throw Error('unable to find ' + name);
    }
    // name = emojiListJoypixels[sn].uc_full
    // name = emojiListJoypixels[sn].uc_full;
    // if (!emojiListJoypixels[sn]) {
    //     for (var emoji in emojiListJoypixels) {
    //         if (!emojiListJoypixels.hasOwnProperty(emoji) || (emoji === '')) {
    //             continue;
    //         }
    //         if (emojiListJoypixels[emoji].shortnames.indexOf(sn) === -1) {
    //             continue;
    //         }
    //         sn = emoji;
    //         sns = [...emojiListJoypixels[emoji].shortnames, emoji];
    //         break;
    //     }
    //     // throw Error('Unable to find ' + sn);
    // } else {
    //     sns = [...emojiListJoypixels[sn].shortnames, sn];
    // }

    if (!emojiListJoypixels[sn]) {
        throw Error('Unable to find ' + em.char);
    }

    // Converting emoji values since source emoji can be in unqualified form
    let value = convert(emojiListJoypixels[sn].uc_full.toUpperCase());
    const spriteCategory = (name.indexOf("-1f3f") >= 0) ? 'diversity' : emojiListJoypixels[sn].category;

    data.push({ v: value, n: name, c: category, r: rank, a: animated, sn, sc: spriteCategory });
}

fs.writeFileSync(__dirname + '/emoji.json', JSON.stringify(data));