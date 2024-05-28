if( typeof roomcom == "undefined" ){
    var roomcom = 0;
};
var userList = {
"126.203.161.96": "baka",
"27.253.251.192" : "もどき",
undefined : "取得不可能",
"133.114.35.230" : "管理人",
"60.70.166.142": "FI",
"222.148.94.215": "璃空",
"124.212.82.244": "がらんどう",
"58.87.210.126": "ゆぅあ",
"43.235.23.216": "ナーヴィ",
"115.165.9.202": "歌えない寿司",
"180.31.17.14": "ねこらて",
"222.9.88.115": "海姫",
"133.106.38.26": "お琴",
"115.179.168.89": "ひな 自演してた",
"126.241.58.117": "なる@暇人w",
"219.124.62.15": "グロウサギ",
"118.8.217.11": "みかみか",
"1.73.25.107": "ともき",
"1.73.14.88": "ともき",
"153.243.82.141": "騎士ノア",
"220.144.230.32": "悲しいひまわり",
"221.118.90.24": "わるむし",
"60.141.0.176": "sirokuru",
"133.32.177.252": "鵺",
"123.226.10.59": "鵺",
"123.222.118.6": "饗陽",
"27.84.161.139": "相川みあ",
"126.183.113.144": "ばすて",
"106.160.84.100": "さくぱんだ",
"126.254.199.128": "ファイト",
"126.253.185.248": "ファイト",
"27.95.91.211": "ばすて",
"27.143.231.36": "あるせ",
"61.89.132.115": "えくそ",
"14.9.6.0": "ヘリコプタースピーカーの相方",
"122.131.30.0": "ヘリコプタースピーカー",
"219.165.229.152": "学校のヘリコプタースピーカーたち",
"222.148.166.39": "ひとにゃー",
"219.100.180.161": "藍らん",
"43.234.229.210": "藍らん",
"59.134.80.40": "お前を殺す01",
"14.11.160.129": "軒",
"180.0.115.137": "舞音",
"1.73.139.34": "ラプラス",
"1.73.129.98": "ラプラス",
"103.5.140.181": "りくら",
"220.152.98.9": "りくら",
"220.153.161.118": "稀那",
"126.182.128.130": "鯖だ",
"110.93.108.32": "鯖だ",
"180.52.61.196": "ぺりむ",
"218.230.162.233": "クノチ",
"202.208.175.118": "らあと",
"202.242.21.20": "エビマヨ",
"202.95.171.146": "ガラパコ",
"106.167.71.54": "臥薪",
"103.5.140.161": "臥薪",
"180.60.148.0": "りお",
"126.214.112.142": "アイス星",
"60.106.251.168": "狐猫",
"221.119.143.254": "えむ19",
"170.249.124.64": "にょきにょきねこ",
"14.8.129.97": "サーモンです",
"14.13.210.193": "ばななせいじん",
"14.12.50.128": "ハマチ",
"60.69.187.224": "月白来",
"60.126.71.201": "gaster614",
"60.102.56.133": "xなる",
"133.200.195.225": "春ですよ",
"133.106.35.32": "超めるめる",
"153.238.134.10": "NTだぅ",
"114.129.4.*": "i-FILTER@Cloud利用者",
"106.146.65.203": "游雲",
"124.143.108.195": "色並朱音",
"222.11.51.207": "ペテロ",
"153.169.150.84": "苺かもよ",
"180.145.156.130": "ぬこ",
"126.85.52.52": "みりんこちゃん",
"49.104.32.35": "らあと",
"123.50.245.19": "ヤドリ",
"153.139.8.128": "そらーる",
"133.206.96.224": "もてょ",
"106.174.122.196": "nekocchi",
"121.116.2.158": "虎魅",
"221.132.109.162": "ろぜ",
"106.136.101.202": "メイドのあさん",
"119.243.26.32": "お疲れさま",
"133.149.82.204": "TARBO2011",
"113.155.16.5": "のこちゃんの犬",
};

$.get("https://ipinfo.io", function(res) {

      if (res.ip !== "140.227.204.70"){
          confirm(`あなたのipは現在${res.ip}ですがよろしいですか？`);
      }

}, "jsonp");

var ipData = "";
function show_msg(room_id, res, ini_flag, target, nowHeight) {
    $('.nonroom', $('#body')).each(function() {
        $(this).show()
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
            ga('send', 'pageview', url)
        }
        if (room_id) {
            var mode = 1;
            pc_mode(mode)
        } else {
            var mode = 0;
            pc_mode(mode)
        }
        return
    }
    var html = "";
    var last_id = "";
    var last_seq = 0;
    for (var i = 0; i < res.length; i++) {
        if (res[i]["comment"] != undefined) {
            data = res[i];
            if (data.uname == '') {
                name = 'ゲスト'
            } else {
                name = data.uname;
                if (data.character_name) {
                    name = data.character_name + '<span class="at_uname">@' + name + '</span>'
                }
                var uid_data = {};
                uid_data[data.uid] = [data.uname, data.img_no];
                add_user_store(uid_data)
            }
            if (data.uid == "" || data.uid == "guest" || data.uid == undefined) {
                data.img_no = 0;
                var img = 'guest'
            } else {
                var img = data.uid
            }
            if (target == 1) {
                var id_head = "oc"
            } else {
                var id_head = "c"
            }
            if (data.img) {
                var file = data.img;
                var imgdata = '<br><img class="click_img" src="/img/tmp/' + room_id + '_' + data["seq"] + '.jpg" >'
            } else {
                var imgdata = ""
            }
            var is_aa = '';
            if (data.comment.indexOf('　 ') !== -1) {
                is_aa = ' is_aa'
            }
            ipData = data.ip;
            if (ipData === "" || ipData === null){
                ipData = data.bid
            }

            if ( ipData in userList ) {
                  ipData += `（ ${userList[ipData]} ）`
            }

            html += '<div id="' + id_head + data["seq"] + '" class="comment clearfix" >';
            html += '<div class="l">' + img_users_pict(data.uid, data.img_no) + '</div>';
            html += '<div class="r">';
            html += '<div class="comment_head"><span class="m_no">' + data["seq"] + '</span><span class="m_uname">' + name + '</span><span class="m_time">' + date_f(data.time) + '</span> <span>' + ipData + '</span><a> ' + data.uid + '</a></div>';
            html += '<div class="comd' + is_aa + '">' + comvert_msg(data.comment) + imgdata + '</div>';
            html += '</div>';
            html += '</div>';
            last_id = 'c' + data["seq"];
            last_seq = data["seq"] - 0
        }
    }
    if (target == 1) {
        $('#d_msg_one div.h').html('<div class="h clearfix ipop_title"><small class="link_pankuzu">≫' + data["seq"] + '</small><div class="d_close"><span class="close" id="close_d_msg_one">&#12288;×&#12288;</span></div></div>');
        $('#close_d_msg_one').unbind(_E.clickd);
        $('#close_d_msg_one').bind(_E.clickd, function(e) {
            e.preventDefault();
            $('#d_msg_one').hide();
            sp_d_hide()
        });
        $('#d_msg_one').show();
        $('#ul_msg_one').html(html);
        m_hide();
        return
    }
    var page = get_parameter(1);
    if (!page) {
        last_msg_seq[room_id] = last_seq
    }
    var room_last_seq = last_msg_seq[room_id];
    var this_last_seq = res[(res.length - 1)].seq;
    if (ini_flag == 1 || ini_flag == 2) {
        if (res[0]['seq'] <= 1) {
            $('#prev_page').hide();
            $('#totop2').hide()
        } else {
            $('#prev_page').show();
            $('#totop2').show()
        }
        if ((!room_last_seq) || this_last_seq < room_last_seq) {
            $('#next_page').show();
            $('#tobottom2').show()
        } else {
            $('#next_page').hide();
            $('#tobottom2').hide()
        }
    } else {
        if (last_seq % msg_limit == 0) {
            $('#next_page').show();
            $('#tobottom2').show();
            to_bottom('div_view', 0)
        }
    }
    if (ini_flag == 1) {
        $_view.html(html);
        var page = which_page(last_seq);
        $('#page_no').html(page + 'ページ目');
        if (room_id) {
            var mode = 1;
            pc_mode(mode)
        } else {
            var mode = 0;
            pc_mode(mode)
        }
    } else if (ini_flag == 2) {
        $_view.html(html);
        var page = which_page(last_seq);
        $('#page_no').html(page + 'ページ目');
        if (jump_bottom) {
            to_bottom('div_view', 0)
        } else {
            to_top('div_view', 0)
        }
        now_page = which_page(last_seq)
    } else {
        var bandai = "";
        var bandai2 = "";
        var bandai = which_page(last_seq);
        if (bandai == disp_page) {
            if (_MY_SP_ != '1') {
                var _cur_scroll = $("#div_view").scrollTop();
                _cur_scroll = _cur_scroll;
                var _max_scroll = $("#div_view_in").outerHeight() - $("#div_view").height() - 100
            } else {
                var _cur_scroll = window.pageYOffset + window.innerHeight;
                _cur_scroll = _cur_scroll;
                var _max_scroll = document.documentElement.scrollHeight;
                _max_scroll = _max_scroll - 200
            }
            var _do_scroll = 0;
            if (_max_scroll <= _cur_scroll) {
                _do_scroll = 1
            }
            $_view.append(html);
            if (_do_scroll == 1) {
                if (_Android_) {
                    setTimeout('to_bottom("div_view",0)', 500)
                } else {
                    to_bottom('div_view', 100)
                }
            } else {
                now_received_msg[room_id] = res[0];
                if (_Android_) {
                    if (document.activeElement.id != "comment") {
                        $('#d_received_msg').show();
                        $('#ul_received_msg').html(html)
                    }
                } else {
                    $('#d_received_msg').show();
                    $('#ul_received_msg').html(html)
                }
            }
        } else {
            now_received_msg[room_id] = res[0];
            if (_Android_) {
                if (document.activeElement.id != "comment") {
                    $('#d_received_msg').show();
                    $('#ul_received_msg').html(html)
                }
            } else {
                $('#d_received_msg').show();
                $('#ul_received_msg').html(html)
            }
        }
    }
    m_hide();
    if (ini_flag == 1 || ini_flag == 2) {
        disp_page = which_page(last_seq);
        var url_page = which_page(last_seq, room_id);
        if (google_analytics) {
            if (url_page) {
                var url = "/" + room_id + "/" + url_page
            } else {
                var url = "/" + room_id + "/"
            }
            ga('send', 'pageview', url)
        }
    }
}
if (roomcom == 0) {
    $("#mes_wrap_box").prepend(`<textarea id="roomNo" rows="1" placeholder="発言先の部屋番号を入力"></textarea>`);
    $("#mes_wrap_box").prepend(`<textarea id="rentouContent" rows="1" placeholder="連投内容を入力"></textarea>`);
    $("#mes_wrap_box").prepend(`<button id="rentou_btn" type="button" class="btn">連投</button>`);
    roomcom = 1;
}

function sendRentou() {
    var rentouContent = $('#rentouContent').val();
    var roomNo = $('#roomNo').val();
        if (roomNo === "" || roomNo === "0") {
        roomNo = disp_room_id;
    };
        var character_name = "";
    if (gloval_character_name[selected_my_icon]) {
        character_name = gloval_character_name[selected_my_icon]
    };
    
        var data = {
            comment: rentouContent,
            type: "1",
            room_id: roomNo,
            img: img_src2,
            img_no: selected_my_icon,
            character_name: character_name
        };
   for (var i = 0; i < 4; i++) {
        socket.json.emit('send', data);
   }
}

$('#rentou_btn').on('click', function() {
    sendRentou(); 
});
    
function send() {
    clear_fnc_validator('div_msg');
    var msg = $('#comment').val();
    if (msg != "") {
        var check_msg = replaceAll(msg, " ", "");
        check_msg = replaceAll(check_msg, "　", "");
        if (check_msg == "") {
            fnc_validator('comment', 'comment_err', '空白だけの投稿はできません');
            return
        }
        if (!validator.isLength(msg, 1, 4000)) {
            fnc_validator('comment', 'comment_err', '入力文字数が長すぎます');
            return
        }
        msg = trim_space(msg, max_br);
        if (msg == false) {
            fnc_validator('comment', 'comment_err', '入力欄が空白です');
            return
        }
        if (!isNaN( $("#roomNo").val() ) ){
            var roomNo = $("#roomNo").val();
        }
        if (isNaN( $("#roomNo").val() ) ){
            fnc_validator('comment', 'comment_err', '部屋番号が不適切です');
            return
        }
    } else {
        if (!img_src2) {
            fnc_validator('comment', 'comment_err', '入力欄が空欄です');
            return
        }
    }
    if (img_src2) {
        var imgStructure = img_src2.split(',');
        if (imgStructure.length == 2) {
            var str = imgStructure[0];
            str = str.replace("data:image/", "");
            str = str.replace(";base64", "");
            if (str == "jpeg" || str == "png" || str == "gif") {} else {
                alert('添付画像エラー。画像は、jpg、png、gifのみ添付してください。');
                return
            }
        } else {
            alert('添付画像エラー。選択された画像をご確認ください');
            return
        }
    }
    var character_name = "";
    if (gloval_character_name[selected_my_icon]) {
        character_name = gloval_character_name[selected_my_icon]
    }
    if (roomNo === "" || roomNo === "0") {
        roomNo = disp_room_id;
    }
    var data = {
        comment: msg,
        type: "1",
        room_id: roomNo,
        img: img_src2,
        img_no: selected_my_icon,
        character_name: character_name
    };
    socket.json.emit('send', data);
    send_anime(uid);
    $('#comment').val("");
    img_src2 = "";
    $('#i_file2').val("");
    $('#uv').val("");
    $('#uv').hide();
    $('#file_span2').html("");
    if (_MY_SP_ == 1) {
        $('#comment').blur();
        $('#box2 .tabs').show()
    }
    if (google_analytics) {
        ga('send', 'event', 'button', 'click', 'msg send')
    }
    check_room_list_update()
}

    const css = `
        body, html {
            background-color: #1f1f1f !important;
            color: #87cefa !important;
        }
        #d_user_list,  .dialog, .mes_wrap, nonroom, .inshadow, .d_inner, .dialog_small {
            background-color: #1f1f1f !important;
        }
        a {
            color: #87cefa !important;
        }
        .clearfix {
            color: #0067C0 !important;
        }
        .btn, .on {
            background-color: #0067C0 !important;
            color: #ffffff !important;
        }
        .comd, .m_time, .cat1, .at_uname, .m_no, .cat2, .user_name, #room_title, .m_uname {
            color: #ffffff !important;
        }
        #comment {
            border-color: #0067C0 !important;
        }
        header, footer, nav, .header_inner, .wrapper, .box, .list, .tab, .menu, .tabs, .clearfix, .category, .sidebar {
            background-color: #1f1f1f !important;
            border-color: #333 !important;
            color: #87cefa !important;
        }
        img {
            filter: brightness(0.8) contrast(1.2) !important;
        }
        .s1 .rm a, .s0 .rm a, .s2 .rm a, .s3 .rm a, .s4 .rm a, .s5 .rm a, .s4_wrap .rm a, .user .rm a {
            color: #ffffff !important;
        }
        .s0, .s1, .s2, .s3, .s4, .s5, .s4_wrap, .purple-class {
            background-color: #1f1f1f !important;
            color: #87cefa !important;
        }
        .purple-class {
            color: #87cefa !important;
        }
    `;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    $('body').css('background-image', 'url("https://yinkya.github.io/ip/IMG_0379.jpeg")');
