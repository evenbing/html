/**
 * Created by Frank on 2014/11/26.
 */
/*region 一些扩展的工具类*/
/* js实现的HashMap */
function HashMap() {
    // 定义属性
    this.keys = new Array();
    this.values = new Array();
    this.length = 0;

    var forEachIn = function (key, value, action) {
        action(key, value);
    };

    HashMap.prototype.forEach = function (action) {
        for (var i = 0; i < this.length; i++) {
            forEachIn(this.keys[i], this.values[i], action);
        }
    };

    HashMap.prototype.keySet = function () {
        return this.keys;
    };

    /**
     * 这个方法和常用map的put不一致
     * 尽量改用set方法
     * @param key
     * @param value
     */
    HashMap.prototype.put = function (key, value) {
        // 判断元素是否已添加
        var i = 0;
        for (; i < this.length; i++) {
            if (this.keys[i] == key) {
                break;
            }
        }
        if (i == this.length) {
            this.keys.push(key);
            this.values.push(value);
            this.length++;
        }
    };

    HashMap.prototype.set = function (key, value) {
        var i = 0;
        if (typeof(key) == "undefined") {
            return;
        }
        for (; i < this.length; i++) {
            if (this.keys[i] == key) {
                break;
            }
        }
        if (i == this.length) {
            this.keys.push(key);
            this.values.push(value);
            this.length++;
        } else {
            this.values[i] = value;
        }
    }

    HashMap.prototype.get = function (key) {
        var i = 0;
        for (; i < this.length; i++) {
            if (this.keys[i] == key) {
                break;
            }
        }
        if (i != this.length) {
            return this.values[i];
        }
        return null;
    };

    HashMap.prototype.remove = function (key) {
        for (var i = 0; i < this.length; i++) {
            if (this.keys[i] == key) {
                this.keys.remove(this.keys[i]);
                this.values.remove(this.values[i]);
                this.length--;
                break;
            }
        }
    };

    HashMap.prototype.containsKey = function (key) {
        var ret = false;
        for (var i = 0; i < this.length; i++) {
            if (this.keys[i] == key) {
                ret = true;
                break;
            }
        }
        return ret;
    };

    HashMap.prototype.toString = function () {
        var array = new Array();
        for (var i = 0; i < this.length; i++) {
            array[this.keys[i]] = this.values[i];
        }
        return JSON.stringify(array);
    };
}

/* 扩展js原生的array */
Array.prototype.indexOf = function (obj) {
    for (var i = 0; i < obj.length; i++) {
        if (this[i] == obj) {
            return i;
        }
    }
    return -1;
}

Array.prototype.remove = function (object) {
    var index = this.indexOf(object);
    for (var i = 0; i < this.length; i++) {
        if (this[i] == object) {
            index = i;
            break;
        }
    }
    if (index != -1) {
        this.splice(index, 1);
    }
}

Array.prototype.contains = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (obj == this[i]) {
            return true;
        }
    }
    return false;
}

Array.prototype.contains1 = function (func) {
    for (var i = 0; i < this.length; i++) {
        if (func(this[i])) {
            return true;
        }
    }
    return false;
}

Array.prototype.clone = function () {
    return this.slice(0);
};

/**
 * 合并数组
 * @param arr
 * @returns {*}
 */
Array.prototype.merge = function (arr) {
    if (arr == null || typeof(arr) == "undefined") {
        return this;
    }

    return this.concat(arr);
};

/**
 *
 * @param callback
 * @returns {*}
 */
Array.prototype.get = function (func) {
    for (var i = 0; i < this.length; i++) {
        if (func(this[i])) {
            return this[i];
        }
    }
    return null;
}

/**
 * 去重
 * @returns {*[]}
 */
Array.prototype.unique = function () {
    this.sort();
    var re = [this[0]];
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== re[re.length - 1]) {
            re.push(this[i]);
        }
    }
    return re;
}

/*endregion 一些扩展的工具类*/