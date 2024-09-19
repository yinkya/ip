// 初期設定
if (typeof roomcom == "undefined") {
    var roomcom = 0;
}
var elementToAdd = $('#i_search, #b_search');
var destination = $('#reload_btn_wrap');
elementToAdd.appendTo(destination);
var userList = {};

// IP情報取得
$.get("https://ipinfo.io", function(res) {
    if (res.ip !== "140.227.204.70") {
        confirm(`あなたのipは現在${res.ip}ですがよろしいですか？`);
    }
}, "jsonp");

// リロードボタンを削除
$('#reload_btn').remove();

var ipData = "";

// メッセージ表示関数
function show_msg(room_id, res, ini_flag, target, nowHeight) {
    $('.nonroom', $('#body')).each(function() {
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
        pc_mode(room_id ? 1 : 0);
        return;
    }

    var html = "";
    var last_id = "";
    var last_seq = 0;

    for (var i = 0; i < res.length; i++) {
        if (res[i]["comment"] !== undefined) {
            var data = res[i];
            var name = data.uname || 'ゲスト';
            
            if (data.character_name) {
                name = `${data.character_name}<span class="at_uname">@${name}</span>`;
            }

            // UIDをユーザーリストに保存
            if (data.uid) {
                userList[data.uid] = [data.uname, data.img_no];
            }

            ipData = data.ip || data.bid;

            // IPがリストにない場合、ユーザー名とIPを追加
            if (!(ipData in userList)) {
                userList[ipData] = data.uname;
            } else {
                ipData += `（ ${userList[ipData]} ）`;
            }

            // コメントHTML生成
            var is_aa = data.comment.indexOf('　 ') !== -1 ? ' is_aa' : '';
            var imgdata = data.img ? `<br><img class="click_img" src="/img/tmp/${room_id}_${data["seq"]}.jpg">` : '';
            
            html += `
                <div id="c${data["seq"]}" class="comment clearfix">
                    <div class="l">${img_users_pict(data.uid, data.img_no)}</div>
                    <div class="r">
                        <div class="comment_head">
                            <span class="m_no">${data["seq"]}</span>
                            <span class="m_uname">${name}</span>
                            <span class="m_time">${date_f(data.time)}</span>
                            <span>${ipData}</span>
                            <a> uid: ${data.uid}</a>
                        </div>
                        <div class="comd${is_aa}">${comvert_msg(data.comment)}${imgdata}</div>
                    </div>
                </div>
            `;

            last_id = `c${data["seq"]}`;
            last_seq = data["seq"];
        }
    }

    // メッセージリストに追加処理
    if (target == 1) {
        $('#d_msg_one div.h').html(`<div class="h clearfix ipop_title"><small class="link_pankuzu">≫${res[0]["seq"]}</small><div class="d_close"><span class="close" id="close_d_msg_one">&#12288;×&#12288;</span></div></div>`);
        $('#ul_msg_one').html(html);
        $('#d_msg_one').show();
        return;
    }

    $_view.append(html);
    $('#page_no').html(`${which_page(last_seq)}ページ目`);
    m_hide();
}
