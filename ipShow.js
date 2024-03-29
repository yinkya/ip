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
                ipData = data.bid;
            }
            if (ipData === "60.70.166.142"){
                ipData += "  （ FI ）";
            }
            if (ipData === "133.114.35.230"){
                ipData += "  （ 管理人 ）";
            }
            if (ipData === "222.148.94.215"){
                ipData += "  （ 璃空 ）";
            }
            if (ipData === "124.212.82.244"){
                ipData += "  （ がらんどう ）";
            }
            if (ipData === "58.87.210.126"){
                ipData += "  （ ゆぅあ ）";
            }
            if (ipData === "43.235.23.216"){
                ipData += "  （ ナーヴィ ）";
            }
            if (ipData === "115.165.9.202"){
                ipData += "  （ 歌えない寿司 ）";
            }
            if (ipData === "180.31.17.14"){
                ipData += "  （ ねこらて ）";
            }
            if (ipData === "222.9.88.115"){
                ipData += "  （ 海姫 ）";
            }
            if (ipData === "133.106.38.26"){
                ipData += "  （ お琴 ）";
            }
            if (ipData === "115.179.168.89"){
                ipData += "  （ ひな 自演してた ）";
            }
            if (ipData === "60.147.58.16" || ipData === "126.1.230.174"){
                ipData += "  （ 寿司打廃人 ）";
            }
            if (ipData === "126.241.58.117"){
                ipData += "  （ なる@暇人w ）";
            }
            if (ipData === "219.124.62.15"){
                ipData += "  （ グロウサギ ）";
            }
            if (ipData === "118.8.217.11"){
                ipData += "  （ みかみか ）";
            }
            if (ipData === "1.73.25.107" || ipData === "1.73.14.88"){
                ipData += "  （ ともき ）";
            }
            if (ipData === "153.243.82.141"){
                ipData += "  （ 騎士ノア ）";
            }
            if (ipData === "220.144.230.32"){
                ipData += "  （ 悲しいひまわり )";
            }
            if (ipData === "221.118.90.24"){
                ipData += "  （ わるむし ）";
            }
            if (ipData === "60.141.0.176"){
                ipData += "  （ sirokuru ）";
            }
            if (ipData === "133.32.177.252" || ipData === "123.226.10.59"){
                ipData += "  （ 鵺 ）";
            }
            if (ipData === "123.222.118.6"){
                ipData += "  （ 饗陽 ）";
            }
            if (ipData === "27.84.161.139"){
                ipData += "  （ 相川みあ ）";
            }
            if (ipData === "126.183.113.144"){
                ipData += "  （ ばすて ）";
            }
            if (ipData === "106.160.84.100"){
                ipData += "  （ さくぱんだ ）";
            }
            if (ipData === "126.254.199.128" || ipData === "126.253.185.248"){
                ipData += "  （ ファイト ）";
            }
            if (ipData === "27.95.91.211"){
                ipData += "  （ ばすて ）";
            }
            if (ipData === "27.143.231.36"){
                ipData += "  （ あるせ ）";
            }
            if (ipData === "61.89.132.115"){
                ipData += "  （ えくそ ）";
            }
            if (ipData === "14.9.6.0"){
                ipData += "  （ ヘリコプタースピーカーの相方 ）";
            }
            if (ipData === "122.131.30.0"){
                ipData += "  （ ヘリコプタースピーカー ）";
            }
            if (ipData === "219.165.229.152"){
                ipData += "  （ 学校のヘリコプタースピーカーたち ）";
            }
            if (ipData === "222.148.166.39"){
                ipData += "  （ ひとにゃー ）";
            }
            if (ipData === "219.100.180.161" || ipData === "43.234.229.210"){
                ipData += "  （ 藍らん ）";
            }
            if (ipData === "59.134.80.40"){
                ipData += "  （ お前を殺す01 ）";
            }
            if (ipData === "14.11.160.129"){
                ipData += "  （ 軒 ）";
            }
            if (ipData === "180.0.115.137"){
                ipData += "  （ 舞音 ）";
            }
            if (ipData === "1.73.139.34" || ipData === "1.73.129.98"){
                ipData += "  （ ラプラス ）";
            }
            if (ipData === "103.5.140.181" || ipData === "220.152.98.9"){
                ipData += "  （ りくら ）";
            }
            if (ipData === "220.153.161.118"){
                ipData += "  （ 稀那 ）";
            }
            if (ipData === "126.182.128.130" || ipData === "110.93.108.32"){
                ipData += "  （ 鯖だ ）";
            }
            if (ipData === "180.52.61.196"){
                ipData += "  （ ぺりむ ）";
            }
            if (ipData === "218.230.162.233"){
                ipData += "  （ クノチ ）";
            }
            if (ipData === "202.208.175.118"){
                ipData += "  （ らあと ）";
            }
            if (ipData === "202.242.21.20"){
                ipData += "  （ エビマヨ ）";
            }
            if (ipData === "202.95.171.146"){
                ipData += "  （ ガラパコ ）";
            }
            if (ipData === undefined || ipData === "undefined"){
                ipData = "  読み込み後に追加されたので取得不可";
            }
            if (ipData === "106.167.71.54" || ipData === "103.5.140.161"){
                ipData += "  （ 臥薪 ）";
            }
            if (ipData === "180.60.148.0"){
                ipData += "  （ りお ）";
            }
            if (ipData === "126.214.112.142"){
                ipData += "  （ アイス星 ）";
            }
            if (ipData === "60.106.251.168"){
                ipData += "  （ 狐猫 ）";
            }
            if (ipData === "221.119.143.254"){
                ipData += "  （ えむ19 ）";
            }
            if (ipData === "170.249.124.64"){
                ipData += "  （ にょきにょきねこ ）";
            }
            if (ipData === "14.8.129.97"){
                ipData += "  （ サーモンです ）";
            }
            if (ipData === "14.13.210.193"){
                ipData += "  （ ばななせいじん ）";
            }
            if (ipData === "14.12.50.128"){
                ipData += "  （ ハマチ ）";
            }
            if (ipData === "60.69.187.224"){
                ipData += "  （ 月白来 ）";
            }
            if (ipData === "60.126.71.201"){
                ipData += "  （ gaster614 ）";
            }
            if (ipData === "60.102.56.133"){
                ipData += "  （ xなる ）";
            }
            if (ipData === "133.200.195.225"){
                ipData += "  （ 春ですよ ）";
            }
            if (ipData === "133.106.35.32"){
                ipData += "  （ 超めるめる ）";
            }
            if (ipData === "153.238.134.10"){
                ipData += "  （ NTだぅ ）";
            }
            if (ipData.includes("114.129.4.") === true){
                ipData += "  （ i-FILTER@Cloud利用者 ）";
            }
            if (ipData === "106.146.65.203"){
                ipData += "  （ 游雲 ）";
            }
            if (ipData === "124.143.108.195"){
                ipData += "  （ 色並朱音 ）";
            }
            if (ipData === "222.11.51.207"){
                ipData += "  （ ペテロ ）";
            }
            if (ipData === "153.169.150.84"){
                ipData += "  （ 苺かもよ ）";
            }
            if (ipData === "180.145.156.130"){
                ipData += "  （ ぬこ ）";
            }
            if (ipData === "126.85.52.52"){
                ipData += "  （ みりんこちゃん ）";
            }
            if (ipData === "49.104.32.35"){
                ipData += "  （ らあと ）";
            }
            if (ipData === "123.50.245.19"){
                ipData += "  （ ヤドリ ）";
            }
            if (ipData === "153.139.8.128"){
                ipData += "  （ そらーる ）";
            }
            if (ipData === "133.206.96.224"){
                ipData += "  （ もてょ ）";
            }
            if (ipData === "106.174.122.196"){
                ipData += "  （ nekocchi ）";
            }
            if (ipData === "121.116.2.158"){
                ipData += "  （ 虎魅 ）";
            }
            if (ipData === "221.132.109.162"){
                ipData += "  （ ろぜ ）";
            }
            if (ipData === "106.136.101.202"){
                ipData += "  （ gdプレ ）";
            }
            if (ipData === "106.136.101.202"){
                ipData += "  （ メイドのあさん ）";
            }
            if (ipData === "119.243.26.32"){
                ipData += "  （ お疲れさま ）";
            }
            if (ipData === "133.149.82.204"){
                ipData += "  （ TARBO2011 ）";
            }
            html += '<div id="' + id_head + data["seq"] + '" class="comment clearfix" >';
            html += '<div class="l">' + img_users_pict(data.uid, data.img_no) + '</div>';
            html += '<div class="r">';
            html += '<div class="comment_head"><span class="m_no">' + data["seq"] + '</span><span class="m_uname">' + name + '</span><span class="m_time">' + date_f(data.time) + '</span> <span>' + ipData + '</span></div>';
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

$("#mes_wrap_box").prepend(`<textarea id="roomNo" rows="1" placeholder="発言先の部屋番号を入力"></textarea>`);

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
