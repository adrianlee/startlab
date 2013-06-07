/**
* /!\ This file is just an example template to create/update your own language file /!\
*/

window.ParsleyConfig = window.ParsleyConfig || {};

(function ($) {
  window.ParsleyConfig = $.extend( true, {}, window.ParsleyConfig, {
    messages: {
      // parsley //////////////////////////////////////
         defaultMessage: "不正确的值"
        , type: {
            email:      "電郵地址無效"
          , url:        "URL地址無效"
          , urlstrict:  "URL地址無效"
          , number:     "數字無效"
          , digits:     "應為個位數字"
          , dateIso:    "日期格式應為YYYY-MM-DD"
          , alphanum:   "只可包含字母和數字"
        }
      , notnull:        "必填"
      , notblank:       "必填"
      , required:       "必填"
      , regexp:         "輸入無效"
      , min:            "數字應大於 %s"
      , max:            "數字應小於 %s."
      , range:          "數字應大於 %s 並小於 %s."
      , minlength:      "數字太短，應長於或等於 %s "
      , maxlength:      "數字太長，應小於或等於 %s "
      , rangelength:    "錯誤！數字長度應在 %s 和 %s 之間"
      , mincheck:       "最少需要 %s 個選項"
      , maxcheck:       "最多能選 %s 個選項"
      , rangecheck:     "只能選擇 %s 到 %s 個選項"
      , equalto:        "數字要等於固定值"

      // parsley.extend ///////////////////////////////
      , minwords:       "最少應有 %s 個字"
      , maxwords:       "最多只可有 %s 個字"
      , rangewords:     "應有 %s 至 %s 個字"
      , greaterthan:    "應長於 %s 個字"
      , lessthan:       "應短於 %s 個字"
      , beforedate:     "日期應早於 %s."
      , afterdate:      "日期應遲於 %s."
    }
  });
}(window.jQuery || window.Zepto));
