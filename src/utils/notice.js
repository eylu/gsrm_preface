/**
 * Notice
 * @param  {String} msg  message content
 * @param  {String} kind message kind: alert|notice
 * @return
 */
export default function noticeShow(msg, kind = "alert") {
  let id = "Notice_" + new Date().getTime();
  addNotice(msg, id, kind);
}

function addNotice(msg, id, kind) {
  let dom = document.createElement("div");
  let klass = kind == "alert" ? "alert-primary" : "alert-danger";
  dom.id = id;
  dom.innerHTML = `
    <div class="alert ${klass}">
      ${msg}
    </div>
  `;
  addClass(dom, "gs-alert animated short fadeInDown");
  document.body.appendChild(dom);

  setTimeout(function() {
    removeClass(dom, "fadeInDown");
    addClass(dom, "fadeOutUp");
    setTimeout(function() {
      removeNotice(dom);
    }, 2 * 1000);
  }, 5 * 1000);
}

function removeNotice(dom) {
  document.body.removeChild(dom);
}

function hasClass(obj, cls) {
  return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

function addClass(obj, cls) {
  if (!hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    obj.className = obj.className.replace(reg, " ");
  }
}

function toggleClass(obj, cls) {
  if (hasClass(obj, cls)) {
    removeClass(obj, cls);
  } else {
    addClass(obj, cls);
  }
}
