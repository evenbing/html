/*
 * 日期控件
 */

define(['zepto'],function ($) {
    var body = $('body');

    // 构建日历列表
    var _calendarHtml =
        '<div class="tabletitle">' +
        	'<header class="picker_header"><i class="picker_black"></i></header>'+
            '<div class="cell w40"><span id="prev"></span></div>' +
            '<div class="cell">' +
                '<span class="year"></span>年 <span class="mon"></span>月' +
            '</div>' +
            '<div class="cell w40"><span id="next"></span></div>' +
        '</div>' +
        '<ul class="week">' +
            '<li>日</li>' +
            '<li>一</li>' +
            '<li>二</li>' +
            '<li>三</li>' +
            '<li>四</li>' +
            '<li>五</li>' +
            '<li>六</li>' +
        '</ul>' +
        '<ul class="day"></ul>';

    body.append('<div class="datepicker">' + _calendarHtml + '</div>');

    var _picker = $('.datepicker'),
        dayWrap = $('.day'),
        month = $('.mon'),
        year = $('.year');
     
    var _currentYear = new Date().getFullYear();
    year.html(_currentYear)

    var monthArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        weekZH = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    
    var _today = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate());
    // 遮罩层
    var _elOverlay = $('.overlay');
    if (_elOverlay.length <= 0) {
        body.append($('<div class="overlay"></div>'));
        _elOverlay = $('.overlay');
    }

    // 获取当月的天数。
    function getDaysInMonth(d) {
        return new Date(d.getFullYear(), (d.getMonth() + 1), 0).getDate();
    }

    $.fn.datePicker = function (options) {
        var defaults = {
            type: '',
            day: 0,
            okreturn:function(){}
        };
        var _options = $.extend(defaults, options);

        var _this = this;
        
        _this.forEach(function (element, i) {
            var _class = $(element).attr('class'),
                _id = $(element).attr('id');

            $(element).on('click', function () {
                var _val = '';
                _val = $(this).val();
                
                if (!_val) {
                    initDays(0);
                } else {
                    initDays(_val);
                }

                setTimeout(function () {
                    _elOverlay.show();
                    _picker.addClass('active');
                    dayWrap.addClass('active');
                }, 100);

                var _thisval = $(this);
                // 选择一个日期
                body.off('touchend').on('touchend', '.day .now', function () {
                    var _currDay = $(this).attr('data-date');
                    $(this).addClass("active");
                    if (_options.type == 'reserve') {
                        _thisval.val(_currDay).attr('data-date', _currDay);
                    } else {
                        _thisval.val(_currDay).attr('data-date', _currDay);
                    }
                    _thisval.find('[data-template-value]').html(_currDay);

                    _picker.removeClass('active');
                    _elOverlay.hide();
                    setTimeout(function () {
                        _picker.removeClass('active');
                        //回调函数
                       	_options.okreturn();
                    }, 300);
                    return false;
                });
            });
        });

        // 初始化当月日期
        function initDays(_step) {
            dayWrap.removeClass('active');
            var _date = new Date();
            var _year = parseInt(year.html());
            var _month = 0;
            if (typeof _step == 'string') {
                _year = _step.split('-')[0];
                _month = _step.split('-')[1];
                _today = _step;
            } else {
                if (_step == 0) {
                    _month = _date.getMonth() + 1;
                } else {
                    _month = parseInt(month.data('month')) - _step;
                }
            }    
            // 当月份数等于0时，将值改写为12，年份数减1
            if (_month == 0) {
                _year--; _month = 12;
            }
                //当月份数等于13时，将值改写为1，年份数加1
            else if (_month == 13) {
                _year++; _month = 1
            }
            //构造格式化的日期（用于取得当前月份或者是上一月份的最后一个日期）
            var obj = _year + '-' + _month + '-' + 1;
            var lastMonth = _year + '-' + (_month - 1) + '-' + 1;
            var d = new Date(obj.replace(/-/g, '/'));
            var lastMonthDay = new Date(lastMonth.replace(/-/g, '/'));
            var daysItems = '';
            //清空上次的记录。
            dayWrap.html('');

           

            //上一月日期，通过获取本月1号是周几，来控制上月日期在当前列表显示的天数
            for (var a = d.getDay() ; a > 0 ; a--) {
                if (_month == 1) {
                    daysItems += '<li class="last">' + (31 - a + 1) + '</li>';
                } else {
                    daysItems += '<li class="last">' + (getDaysInMonth(lastMonthDay) - a + 1) + '</li>';
                }
            }
            var nowDate = new Date();
            //当月日期
            for (var b = 1; b < getDaysInMonth(d) + 1; b++) {
                _month = Number(_month)
                if (_month < 10) {
                    _month = "0" + _month
                }
                var todayDate=_year + '-' + _month + '-' +b;
                //var currentDate=nowDate.getFullYear() + '-' + _month + '-' +b;
                if(todayDate==_today){ 
                	daysItems += '<li class="now" data-date="' + _year + '-' + _month + '-' + (b >= 10 ? b : "0" + b) + '">今天</li>';
                }else{
                	daysItems += '<li class="now" data-date="' + _year + '-' + _month + '-' + (b >= 10 ? b : "0" + b) + '">'+ b +'</li>';
                }
            }

            //下一月日期，通过获取本月最后一天是周几，来控制下月日期在当前列表显示的天数
            var lastWeekDay = new Date(d.getFullYear(), (d.getMonth() + 1), 0).getDay();
            for (var c = 1; c < (7 - lastWeekDay) ; c++) {
                daysItems += '<li class="now" data-date="' + _year + '-' + (_month+1) + '-' + (c >= 10 ? c : "0" + c) + '">' + c + '</li>';
            }
           



            // 设置年月日
            year.html(_year);
            dayWrap.html(daysItems);
            setTimeout(function () {
                dayWrap.addClass('active');
            }, 400);
            month.html(monthArr[_month - 1]).data('month', _month);

            //今天高亮
            dayWrap.find('li').each(function (i, n) {
                if ($(n).attr('data-date') == _today) {
                    $(n).addClass('active');               
                }
            });

            //选生日的时候，不能选择今天之后的日期
            if (_options.type == 'birthday') {
                DateDo(function (_currDay) { return new Date(_currDay) > new Date() });
            }
            //预约的时候，不能选择今天之前的日期
            if (_options.type == 'reserve') {
                DateDo(function (_currDay) { 
                	var cdate = new Date(_currDay);
                	cdate.setDate(cdate.getDate()+1);
                	return  cdate <= new Date(); 
                });
            }
            //预约的时候，只能选择N天之内
            if (_options.type == 'reserve' && parseInt(_options.day) > 0) {
                DateDo(function (_currDay) { 
                	var date = new Date();
                    date.setDate(date.getDate() + _options.day - 1);
                	return new Date(_currDay) > date });
            }
            //不能选择周末
            if (_options.type == 'notWeekend') {
                DateDo(function (_currDay) {
                    var _reg = new Date(_currDay).getDay();
                    if (_reg == 6 || _reg == 0) {
                        return 1;
                    }
                    return 0;
                });
            }
        }

        function DateDo(_time) {
            dayWrap.find('li').each(function (i, n) {
                var _currDay = $(n).attr('data-date');
                if (_time(_currDay)) {
                    $(n).addClass('last').removeClass('now');
                }
            });
        }

        // 向前翻页选择日期
        $('#prev').off("click").on('click', function (e) {
            initDays(1);
            return false;
        });
        // 向后翻页选择日期
        $('#next').off("click").on('click', function () {
            initDays(-1);
            return false;
        });
        
        $('.picker_black').on("click",function () {
        	_picker.removeClass('active');
            _elOverlay.hide();
            setTimeout(function () {
                _picker.removeClass('active');
            }, 300);
            return false;
        });
    };
});