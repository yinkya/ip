// ==UserScript==
// @name        ねとるむ同一人物判定
// @namespace    http://tampermonkey.net/
// @version      none
// @author       baka
// @match        https://netroom.oz96.com/*
// @grant        unsafeWindow
// @run-at       document-idle
// ==/UserScript==

const apiKey = '4fd28a682ddb23'; // ここに自分のAPIキーを入れてください

var userIpMap = loadUserIpMap();
var userIpDetails = loadUserIpDetails();
var userIpLocationMap = loadUserIpLocationMap();

function saveUserIpMap() {
    localStorage.setItem('userIpMap', JSON.stringify(userIpMap));
}

function loadUserIpMap() {
    const storedUserIpMap = localStorage.getItem('userIpMap');
    if (storedUserIpMap) {
        return JSON.parse(storedUserIpMap);
    }
    return {};
}

function saveUserIpDetails() {
    localStorage.setItem('userIpDetails', JSON.stringify(userIpDetails));
}

function loadUserIpDetails() {
    const storedUserIpDetails = localStorage.getItem('userIpDetails');
    if (storedUserIpDetails) {
        return JSON.parse(storedUserIpDetails);
    }
    return {};
}

function saveUserIpLocationMap() {
    localStorage.setItem('userIpLocationMap', JSON.stringify(userIpLocationMap));
}

function loadUserIpLocationMap() {
    const storedUserIpLocationMap = localStorage.getItem('userIpLocationMap');
    if (storedUserIpLocationMap) {
        return JSON.parse(storedUserIpLocationMap);
    }
    return {};
}

function fetchIpLocation(ip, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://ipinfo.io/${ip}?token=${apiKey}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const citydata = JSON.parse(xhr.responseText);
            userIpLocationMap[ip] = citydata;
            saveUserIpLocationMap();
            callback(citydata);
        }
    };
    xhr.send();
}

function getIpLocation(ip, callback) {
    if (userIpLocationMap[ip]) {
        callback(userIpLocationMap[ip]);
    } else {
        fetchIpLocation(ip, callback);
    }
}
//地域の日本語訳
const cityTranslations = {
    "Numazu": "沼津",
    "Kahoku": "河北",
    "Yamato-Takada": "大和高田",
    "Miyakonojō": "宮古城",
    "Tokyo": "東京",
    "Osaka": "大阪",
    "Nemuro": "根室",
    "Maebashi": "前橋",
    "Tomakomai": "苫小牧",
    "Takamatsu": "高松",
    "Noda": "野田",
    "Kumamoto": "熊本",
    "Narita": "成田",
    "Nagoya": "名古屋",
    "Himeji": "姫路",
    "Tsuruoka": "鶴岡",
    "Hiroshima": "広島",
    "Nara-shi": "奈良市",
    "Yokohama": "横浜",
    "Takatsuki": "高槻",
    "Kasama": "笠間",
    "Machida": "町田",
    "Yamato": "大和",
    "Ichinomiya": "一宮",
    "Kawasaki": "川崎",
    "Fuchū": "府中",
    "Itoman": "糸満",
    "Higashiyamato": "東大和",
    "Hatsudai": "初台",
    "Narashino": "習志野",
    "Gifu-shi": "岐阜市",
    "Nagano": "長野",
    "Sapporo": "札幌",
    "Ikeda": "池田",
    "Sasaguri": "篠栗",
    "Okazaki": "岡崎",
    "Yaizu": "焼津",
    "Toyama": "富山",
    "Hachinohe": "八戸",
    "Nagasaki": "長崎",
    "Onomichi": "尾道",
    "Saitama": "埼玉",
    "Ushiku": "牛久",
    "Tagajō-shi": "田母神市",
    "Beppu": "別府",
    "Tsukuba": "つくば",
    "Ageoshimo": "上尾下",
    "Hitachi": "日立",
    "Hanamaki": "花巻",
    "Kōya": "高野",
    "Fukuoka": "福岡",
    "Koshigaya": "越谷",
    "Gotenba": "御殿場",
    "Suzaka": "須坂",
    "Fujinomiya": "富士宮",
    "Handa": "半田",
    "Kokubunji": "国分寺",
    "Niihama": "新居浜",
    "Katō": "加東",
    "Jōetsu": "上越",
    "Kamakura": "鎌倉",
    "Kameyama": "亀山",
    "Ōita": "大分",
    "Ise": "伊勢",
    "Komatsu": "小松",
    "Kiryū": "桐生",
    "Yao": "八尾",
    "Ōtsu": "大津",
    "Fukui-shi": "福井市",
    "Toyohashi": "豊橋",
    "Moriyama": "守山",
    "Nisshin": "日進",
    "Kamagaya": "鎌ケ谷",
    "Kurume": "久留米",
    "Kobayashi": "小林",
    "Kawagoe": "川越",
    "Tama": "多摩",
    "Kobe": "神戸",
    "Komagane": "駒ヶ根",
    "Kashiba": "柏原",
    "Niigata": "新潟",
    "Ōkawara": "大川原",
    "Kosai": "湖西",
    "Sōka": "草加",
    "Tachikawa": "立川",
    "Hamamatsu": "浜松",
    "Nayoro": "名寄",
    "Miyoshi": "三好",
    "Okayama": "岡山",
    "Kawaguchi": "川口",
    "Itami": "伊丹",
    "Oyama": "小山",
    "Kawanishi": "川西",
    "Ebetsu": "江別",
    "Asaka": "朝霞",
    "Tottori": "鳥取",
    "Toyota": "豊田",
    "Yukuhashi": "行橋",
    "Fukaya": "深谷",
    "Akashi": "明石",
    "Kochi": "高知",
    "Hirakata":"枚方"
};

const regionTranslations = {
    "Tokyo": "東京",
    "Osaka": "大阪",
    "Kyoto": "京都",
    "Hokkaido": "北海道",
    "Aomori": "青森",
    "Iwate": "岩手",
    "Miyagi": "宮城",
    "Akita": "秋田",
    "Yamagata": "山形",
    "Fukushima": "福島",
    "Ibaraki": "茨城",
    "Tochigi": "栃木",
    "Gunma": "群馬",
    "Saitama": "埼玉",
    "Chiba": "千葉",
    "Tokyo": "東京",
    "Kanagawa": "神奈川",
    "Niigata": "新潟",
    "Toyama": "富山",
    "Ishikawa": "石川",
    "Fukui": "福井",
    "Yamanashi": "山梨",
    "Nagano": "長野",
    "Gifu": "岐阜",
    "Shizuoka": "静岡",
    "Aichi": "愛知",
    "Mie": "三重",
    "Shiga": "滋賀",
    "Kyoto": "京都",
    "Osaka": "大阪",
    "Hyōgo": "兵庫",
    "Nara": "奈良",
    "Wakayama": "和歌山",
    "Tottori": "鳥取",
    "Shimane": "島根",
    "Okayama": "岡山",
    "Hiroshima": "広島",
    "Yamaguchi": "山口",
    "Tokushima": "徳島",
    "Kagawa": "香川",
    "Ehime": "愛媛",
    "Kochi": "高知",
    "Fukuoka": "福岡",
    "Saga": "佐賀",
    "Nagasaki": "長崎",
    "Kumamoto": "熊本",
    "Oita": "大分",
    "Miyazaki": "宮崎",
    "Kagoshima": "鹿児島",
    "Okinawa": "沖縄",
};

unsafeWindow.show_msg = function (room_id, res, ini_flag, target, nowHeight) {
    $('.nonroom', $('#body')).each(function () {
        $(this).show();
    });
    $('#d_received_msg').hide();

    if (res.length == 0) {
        $('#prev_page').hide();
        $('#next_page').hide();
        $_view.html('');
        last_msg_seq[room_id] = 0;
        $('#page_no').html('1ページ目');
        disp_page = 1;
        m_hide();
        if (google_analytics) {
            var url = "/" + room_id + "/";
            ga('send', 'pageview', url);
        }
        if (room_id) {
            var mode = 1;
            pc_mode(mode);
        } else {
            var mode = 0;
            pc_mode(mode);
        }
        return;
    }

    var html = "";
    var last_id = "";
    var last_seq = 0;

    for (var i = 0; i < res.length; i++) {
        if (res[i]["comment"] != undefined) {
            (function (data) {
                var name = data.uname || 'ゲスト';
                if (data.character_name) {
                    name = data.character_name + '<span class="at_uname">@' + name + '</span>';
                }
                var uid_data = {};
                uid_data[data.uid] = [data.uname, data.img_no];
                add_user_store(uid_data);
                if (data.ip) {
                    userIpMap[data.ip] = userIpMap[data.ip] || [];
                    if (!userIpMap[data.ip].includes(data.uname)) {
                        userIpMap[data.ip].push(data.uname);
                    }
                    saveUserIpMap();
                    var key = `${data.ip}:${data.uname}`;
                    var page = which_page(data.seq);
                    var urlToSave;

                    if (location.search.includes("&p")) {
                        urlToSave = location.href;
                    } else {
                        urlToSave = location.href + `&p=${page}`;
                    }

                    if (!userIpDetails[key]) {
                        userIpDetails[key] = {
                            uname: data.uname,
                            room_id: data.room_id,
                            url: urlToSave
                        };
                        saveUserIpDetails();
                    }

                    var existingKey = `${data.ip}:${data.uname}`;
                    if (!userIpDetails[existingKey]) {
                        userIpDetails[existingKey] = {
                            uname: data.uname,
                            room_id: data.room_id,
                            time: data.time
                        };
                        saveUserIpDetails();
                    }
                }

                if (data.uid == "" || data.uid == "guest" || data.uid == undefined) {
                    data.img_no = 0;
                    var img = 'guest';
                } else {
                    var img = data.uid;
                }

                if (target == 1) {
                    var id_head = "oc";
                } else {
                    var id_head = "c";
                }

                var imgdata = data.img ? '<br><img class="click_img" src="/img/tmp/' + room_id + '_' + data["seq"] + '.jpg" >' : "";
                var is_aa = data.comment.indexOf('　 ') !== -1 ? ' is_aa' : '';
                var ip = data.ip || '';
                var ipLabel = '';
                var ipLocation = '';

                if (ip) {
                    getIpLocation(ip, function (citydata) {
                        var city = citydata.city || '';
                        var region = citydata.region || '';
                        var cityInJapanese = cityTranslations[city] || city;
                        var regionInJapanese = regionTranslations[region] || region;
                        ipLocation = cityInJapanese ? `${cityInJapanese}, ${regionInJapanese}` : '';
                        var ipInfo = `ip : ${ip} (${ipLocation})`;
                        var otherNames = userIpMap[ip].filter(n => n !== data.uname).join(', ');
                        if (otherNames) {
                            var otherUserLinks = userIpMap[ip].filter(n => n !== data.uname)
                                .map(n => {
                                    var otherKey = `${data.ip}:${n}`;
                                    var otherUrl = userIpDetails[otherKey]?.url || '#';
                                    return `<a href="${otherUrl}" target="_blank" style="color: inherit; font-size: inherit;">${n}</a>`;
                                })
                                .join(', ');
                            ipLabel = `<span style="color: white;">（${otherUserLinks}と同一人物です）</span>`;
                        }
                        html += '<div id="' + id_head + data["seq"] + '" class="comment clearfix">';
                        html += '<div class="l">' + img_users_pict(data.uid, data.img_no) + '</div>';
                        html += '<div class="r">';
                        html += '<div class="comment_head">';
                        html += '<span class="m_no">' + data["seq"] + '</span>';
                        html += '<span class="m_uname">' + name + '</span>';
                        html += `<span class="m_time">${date_f(data.time)}</span> `;
                        html += '</div>';
                        html += '<div class="comment_info">';
                        html += `<span class="info_item">${ipInfo}</span>`;
                        html += `<span class="info_item"> UID : ${data.uid}</span>`;
                        html += `<span class="info_item"> BID : ${data.bid}</span>`;
                        html += '</div>';
                        if (ip) {
                            html += ' ' + ipLabel;
                        }
                        html += '<div class="comd' + is_aa + '">' + comvert_msg(data.comment) +
                            (imgdata ? imgdata : '') + '</div>';
                        html += '</div>';
                        html += '</div>';
                        last_id = 'c' + data["seq"];
                        last_seq = data["seq"] - 0;
                    });
                } else {
                    html += '<div id="' + id_head + data["seq"] + '" class="comment clearfix">';
                    html += '<div class="l">' + img_users_pict(data.uid, data.img_no) + '</div>';
                    html += '<div class="r">';
                    html += '<div class="comment_head">';
                    html += '<span class="m_no">' + data["seq"] + '</span>';
                    html += '<span class="m_uname">' + name + '</span>';
                    html += `<span class="m_time">${date_f(data.time)}ip : ${ip}  UID : ${data.uid}　BID :${data.bid} </span> `;
                    html += '</div>';
                    html += '<div class="comd' + is_aa + '">' + comvert_msg(data.comment) +
                        (imgdata ? imgdata : '') + '</div>';
                    html += '</div>';
                    html += '</div>';
                    last_id = 'c' + data["seq"];
                    last_seq = data["seq"] - 0;
                }
            })(res[i]);
        }
    }

    if (target == 1) {
        $('#d_msg_one div.h').html(
            '<div class="h clearfix ipop_title"><small class="link_pankuzu">≫' + res[0]["seq"] +
            '</small><div class="d_close"><span class="close" id="close_d_msg_one">&#12288;×&#12288;</span></div></div>'
        );
        $('#close_d_msg_one').unbind(_E.clickd);
        $('#close_d_msg_one').bind(_E.clickd, function (e) {
            e.preventDefault();
            $('#d_msg_one').hide();
            sp_d_hide();
        });
        $('#d_msg_one').show();
        $('#ul_msg_one').html(html);
        m_hide();
        return;
    }

    var page = get_parameter(1);
    if (!page) {
        last_msg_seq[room_id] = last_seq;
    }
    var room_last_seq = last_msg_seq[room_id];
    var this_last_seq = res[(res.length - 1)].seq;

    if (ini_flag == 1 || ini_flag == 2) {
        $('#prev_page').toggle(res[0]['seq'] > 1);
        $('#totop2').toggle(res[0]['seq'] > 1);

        if ((!room_last_seq) || this_last_seq < room_last_seq) {
            $('#next_page').show();
            $('#tobottom2').show();
        } else {
            $('#next_page').hide();
            $('#tobottom2').hide();
        }
    } else {
        if (last_seq % msg_limit == 0) {
            $('#next_page').show();
            $('#tobottom2').show();
            to_bottom('div_view', 0);
        }
    }

    if (ini_flag == 1) {
        $_view.html(html);
        var page = which_page(last_seq);
        $('#page_no').html(page + 'ページ目');
        var mode = room_id ? 1 : 0;
        pc_mode(mode);
    } else if (ini_flag == 2) {
        $_view.html(html);
        var page = which_page(last_seq);
        $('#page_no').html(page + 'ページ目');
        if (jump_bottom) {
            to_bottom('div_view', 0);
        } else {
            to_top('div_view', 0);
        }
        now_page = which_page(last_seq);
    } else {
        var bandai = which_page(last_seq);
        if (bandai == disp_page) {
            var _cur_scroll = _MY_SP_ != '1' ? $("#div_view").scrollTop() : window.pageYOffset + window.innerHeight;
            var _max_scroll = _MY_SP_ != '1' ? $("#div_view_in").outerHeight() - $("#div_view").height() - 100 : document.documentElement.scrollHeight - 200;
            var _do_scroll = _max_scroll <= _cur_scroll;

            $_view.append(html);
            if (_do_scroll) {
                if (_Android_) {
                    setTimeout(() => to_bottom("div_view", 0), 500);
                } else {
                    to_bottom('div_view', 100);
                }
            } else {
                now_received_msg[room_id] = res[0];
                if (_Android_) {
                    if (document.activeElement.id != "comment") {
                        $('#d_received_msg').show();
                        $('#ul_received_msg').html(html);
                    }
                } else {
                    $('#d_received_msg').show();
                    $('#ul_received_msg').html(html);
                }
            }
        } else {
            now_received_msg[room_id] = res[0];
            if (_Android_) {
                if (document.activeElement.id != "comment") {
                    $('#d_received_msg').show();
                    $('#ul_received_msg').html(html);
                }
            } else {
                $('#d_received_msg').show();
                $('#ul_received_msg').html(html);
            }
        }
    }

    m_hide();

    if (ini_flag == 1 || ini_flag == 2) {
        disp_page = which_page(last_seq);
        var url_page = which_page(last_seq, room_id);
        if (google_analytics) {
            var url = "/" + room_id + "/" + (url_page || "");
            ga('send', 'pageview', url);
        }
    }
}
