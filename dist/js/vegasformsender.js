window.AlertFormSender={Svg:{error:'<svg viewbox="0 0 500 500" class="am_Error_Icon"><path class="am_SVG_circle" d="m444.34693,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><line class="am_SVG_error1" y2="390" x2="390" y1="110" x1="110"></line><line class="am_SVG_error2" y2="390" x2="110" y1="110" x1="390"></line></svg>',success:'<svg viewbox="0 0 500 500" class="am_Success_Icon"><path class="am_SVG_circle" d="m443.0136,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><polyline class="am_SVG_check" points="104.4892349243164,309.2001647949219 195.57406616210938,402.9600524902344 418.9292297363281,85.03718566894531 "></polyline></svg>',cross:'<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 224.512 224.512" style="enable-background:new 0 0 224.512 224.512;" xml:space="preserve"><g><polygon style="fill:#010002;" points="224.507,6.997 217.521,0 112.256,105.258 6.998,0 0.005,6.997 105.263,112.254 0.005,217.512 6.998,224.512 112.256,119.24 217.521,224.512 224.507,217.512 119.249,112.254 "/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'},modal:function(e){var r;if(e==="success"){r=AlertFormSender.Svg.success}else{r=AlertFormSender.Svg.error}var s='<div class="modal fade vg-form-sender__modal" id="modal-'+e+'" tabindex="-1" role="dialog" aria-labelledby="modal-'+e+'" aria-hidden="true">'+'    <div class="modal-dialog" role="document">'+'        <div class="modal-content">'+'            <button type="button" class="modal-close" data-dismiss="modal" aria-label="Close">'+AlertFormSender.Svg.cross+"</button>"+"            "+'            <div class="vg-form-sender__modal--alert vg-form-sender__modal--alert-'+e+'">'+r+'                <div class="title"></div>'+'                <div class="msg"></div>'+"            </div>"+"        </div>"+"    </div>"+"</div>";$("body").append(s);return false},block:function(e,r){var s;if(e==="success"){s=AlertFormSender.Svg.success}else{s=AlertFormSender.Svg.error}var a='<div class="vg-form-sender__block '+e+'">'+'<div class="icon">'+s+"</div>"+'<div class="content">'+'   <div class="title"></div>'+'   <div class="msg"></div>'+"</div>"+"</div>";r.after(a)},Action:{draw:function(e){var r=e.data("compare")||"modal";if(r==="modal"){AlertFormSender.modal("success");AlertFormSender.modal("error")}else if(r==="block"){$("body").find(".vg-form-sender__block").remove();AlertFormSender.block("success",e);AlertFormSender.block("error",e)}},success:function(e,r,s){this.draw(r);this.btn(r,false,s);this.compare(e,r,s,"success")},error:function(e,r,s){this.draw(r);this.btn(r,false,s);this.compare(e,r,s,"error")},beforeSend:function(e,r){this.btn(e,true,r)},btn:function(e,r,s){var a=e.find("[type=submit]"),t;if(r){t=a.data("text-send")||LangFormSender[s.lang].alert.text_send}else{t=a.data("btn-text")||LangFormSender[s.lang].alert.btn_text}a.attr("disabled",r).find("span").text(t)},compare:function(e,r,s,a){var t=r.find("[type=submit]"),n=r.data("compare")||"modal",o;if(a==="success"){o=t.data("success-text")||LangFormSender[s.lang].alert.success_title}else{o=t.data("error-text")||LangFormSender[s.lang].alert.error_title}if(n==="modal"){var i=$("#modal-"+a);$(".modal").modal("hide");AlertFormSender.text(e,o,i);i.modal("show")}else if(n==="block"){var l=$(".vg-form-sender__block."+a);l.addClass("show");AlertFormSender.text(e,o,l)}}},text:function(e,r,s){s.find(".msg").html(e);s.find(".title").html(r)}};$(document).ready(function(){var e=$("[data-vgFormSender]"),r=typeof VEGASFORMSENDER_INIT!=="undefined";if(r){if(!VEGASFORMSENDER_INIT){r=false}}else{r=true}if(r){e.vegasFormSender({beforeSend:function(e,r){AlertFormSender.Action.beforeSend(e,r)},success:function(e,r,s){if(e.error){AlertFormSender.Action.error(e.msg,r,s)}else{AlertFormSender.Action.success(e.msg,r,s)}},error:function(e,r,s){AlertFormSender.Action.error(e,r,s)},validate:function(e,r,s){ValidateFormSender.init(s,e,r)}})}e.each(function(){var e=$(this),r=e.find("input[data-mask]");if(typeof $.fn.inputmask!=="undefined"&&r.length){r.each(function(){var e=$(this),r=e.data("mask"),s=e.data("mask-complete")||false,a=e.data("mask-focus")||false,t={clearIncomplete:s};if(a){t.showMaskOnFocus=true;t.showMaskOnHover=false}if(r!==""&&r!=="undefined"){if(r==="phone"){t.mask="+79999999999"}else if(r==="birthday"){t.mask="99.99.9999"}else{t.mask=r}e.inputmask(t)}})}else{console.error("Plugin InputMask not installed")}})});(function(S){S.fn.vegasFormSender=function(p){p=S.extend({error:function(){},success:function(){},beforeSend:function(){},validate:function(){}},arguments[0]||{});var e=this;e.each(function(){var i=S(this),l=p.action||i.attr("action")||location.href,d=p.method||i.attr("method")||"get",c=p.fields?p.fields:false,f=p.redirectSuccess||i.data("redirect-success")||false,m=p.redirectError||i.data("redirect-error")||false,e=p.lang||i.data("lang")||"ru",u=p.jsonParse||i.data("json-parse")||false;if(c&&typeof c=="function"){c=p.fields()}var v={lang:e};i.addClass("vg-form-sender");var r=i.find("input, select, textarea");r.each(function(){S(this).parent("div").addClass("vg-form-sender__selector")});i.on("submit",function(){var e=new FormData(this),r=S(this).find("[data-validate]"),s=true;if(r.length){var a=h(r);p.validate.call(this,i,v,a);if(a.empty.length||a.email.length||a.password.length||a.checkbox.length||a.radio.length||a.select.length)s=false}if(s){if(c){for(var t in c){if(typeof c[t]==="object"){for(var n in c[t]){var o=Object.keys(c[t][n]).map(function(e){return c[t][n][e]});e.append(t,o)}}else{e.append(t,c[t])}}}S.ajax({url:l,method:d,data:e,cache:false,contentType:false,processData:false,beforeSend:function(){p.beforeSend.call(this,i,v)},success:function(e){var r;if(u){r=JSON.parse(e)}else{r=e}if(f){window.location.href=f}else{p.success.call(this,r,i,v)}},error:function(e,r){var s=JSON.parse(e.responseText);var a;if(s.errors){a=s.errors[Object.keys(s.errors)[0]][0]}else{a=s.message||s.msg}if(m){window.location.href=m}else{p.error.call(this,a,i,v)}}})}return false});function h(e){var t={empty:[],email:[],password:[],checkbox:[],select:[],radio:[]};e.each(function(){var e=S(this);if(e.val()===""){t.empty.push(e)}else if(e.attr("type")==="checkbox"&&!e.is(":checked")){t.checkbox.push(e)}else if(e.attr("type")==="radio"){t.radio.push(e)}else if(e[0].tagName==="SELECT"){var r=S(this).attr("multiple");if(typeof r!==typeof undefined&&r!==false){if(!e.find("option:selected").length)t.select.push(e)}else{var s=e.find("option:selected").attr("value");if(!s)t.select.push(e)}}else{var a=e.data("validate");if(a==="email"&&!g(e.val())){t.email.push(e)}if(a==="password"){t.password.push(e)}}});if(t.password.length>1){var r=[];for(var s=1;s<=t.password.length;s++){var a=t.password[s-1];r.push(a.val())}r=r.filter(function(e,r,s){return s.indexOf(e)===r});if(r.length===1){t.password=[]}}if(t.radio.length){var n=[],o=[];S.each(t.radio,function(){n.push(S(this).attr("name"))});n=n.filter(function(e,r,s){return s.indexOf(e)===r});S.each(n,function(r,e){o.push({name:e,self:[]});S.each(t.radio,function(){var e=S(this).attr("name");if(o[r].name===e){o[r].self.push(S(this))}})});S.each(o,function(e){var s=0;S.each(o[e].self,function(e){var r=S(this);if(!r.is(":checked")){s++}});if(o[e].self.length!==s){o[e].self=[]}});t.radio=[];S.each(o,function(e){S.each(o[e].self,function(){t.radio.push(S(this))})})}return t}function g(e){var r=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return r.test(String(e).toLowerCase())}});return this}})(jQuery);window.LangFormSender={ru:{alert:{success_title:"Успешно!",success_msg:"Ваше письмо успешно отправлено!",error_title:"Ошибка!",text_send:"Отправляем...",btn_text:"Отправить"},validate:{empty:"Это обязательное поле",email:"Вы ввели не верный email адрес",password:"Введенные пароли не совпадают",checkbox:"Чтобы продлолжить, установите этот флажок",radio:"Выберите один из вариантов",select:"Выберите вариант из списка"}},en:{alert:{success_title:"Success!",success_msg:"Your email has been successfully sent!",error_title:"Error!",text_send:"We send...",btn_text:"Send message"},validate:{empty:"This is a required field",email:"You entered an invalid email address",password:"The passwords entered do not match",checkbox:"Check this box to continue",radio:"Choose one of the options",select:"Choose an option from the list"}}};window.ValidateFormSender={init:function(e,r,o){ValidateFormSender.removeError(r.find(".vg-form-sender__selector"));$.each(e,function(t,n){if(n.length){$.each(n,function(e){var r=n[e],s=r.closest(".vg-form-sender__selector");s.addClass("error");var a=s.find("p");if(a.length===0){s.append("<p>"+LangFormSender[o.lang].validate[t]+"</p>")}ValidateFormSender.setValue(r,s)})}})},setValue:function(e,r){e.on("change",function(){ValidateFormSender.removeError(r);return false})},removeError:function(e){e.removeClass("error");e.find("p").remove()}};