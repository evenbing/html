function UserInfoEditor() {
    var baseUrl = "/m";
    var saveButton = $("#btn_save_user_Info");
    saveButton.click(this.inputUserInfo);

    this.setSaveButtonText = function (text) {
        saveButton.html(text);
    }

    this.showUserInfoInput = function () {
        $("#myModalUserInfo").modal('show');
    }

    this.inputUserInfo = function () {
        saveButton.attr('disabled', true);

        var schoolName = $("#list_school_name").val();
        var qq = $("#list_qq").val();

        if (!checkInput(schoolName, qq)) {
            //输入信息无效
            saveButton.removeAttr('disabled');
            return;
        }

        jQuery.ajax({
            type: "POST",
            url: baseUrl + "/userInfo/updateUserInfo",
            data: {"schoolName": schoolName, "qqNumber": qq},
            dataType: "json",
            cache: false,
            success: function (ret) {
                //用户数据更新成功
                saveButton.removeAttr('disabled'); //其实不需要，为了双保险
                if (ret == 1 || ret == "1") { //任意一个都是对的，短路特性不影响效率
                    //显示数据更新成功
                }
                location.reload();
            }
        });
    }

    /**
     * 检查用户输入是否有效
     * @param schoolName
     * @param qq
     * @returns {boolean}
     */
    function checkInput(schoolName, qq) {
        var patternQQ = /^[0-9]{5,12}$/;
        var valid = true;

        //如果在遇到错就返回，不能保证在之前有两空错的情况即时再次检查
        if (schoolName.trim() == "") {
            $("#inputError1").css({'visibility': 'visible'});
            valid = false;
        } else {
            $("#inputError1").css({'visibility': 'hidden'});
        }

        if (qq != "" && !patternQQ.test(qq)) {
            $("#inputError3").css({'visibility': 'visible'});
            valid = false;
        } else {
            $("#inputError3").css({'visibility': 'hidden'});
        }

        if (valid) {
            $("#inputError1").remove();
            $("#inputError3").remove();
        }
        return valid;
    }
}
