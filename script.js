(() => {
 "use strict";
 const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
 const year=document.getElementById("year"),dialog=document.getElementById("case-study-dialog");
 const closeButton=document.querySelector(".dialog-close"),dismissButton=document.querySelector(".dialog-dismiss");
 const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(year) year.textContent=new Date().getFullYear();

 if(toggle&&nav){
  const setMenu=(open)=>{nav.classList.toggle("open",open);toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");};
  toggle.addEventListener("click",()=>setMenu(toggle.getAttribute("aria-expanded")!=="true"));
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false);});
  document.addEventListener("click",e=>{if(nav.classList.contains("open")&&!nav.contains(e.target)&&!toggle.contains(e.target))setMenu(false);});
 }

 const reveals=document.querySelectorAll(".reveal");
 if("IntersectionObserver" in window&&!reducedMotion){
  reveals.forEach(el=>el.classList.add("reveal-pending"));
  const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add("visible");entry.target.classList.remove("reveal-pending");obs.unobserve(entry.target);}
  }),{threshold:.10,rootMargin:"0px 0px -35px 0px"});
  reveals.forEach(el=>observer.observe(el));
 }else reveals.forEach(el=>el.classList.add("visible"));

 const readStudy=(key)=>{
  const t=document.getElementById("study-"+key);if(!t)return null;
  const f=(n)=>{const node=t.content.querySelector('[data-field="'+n+'"]');return node?node.textContent.trim():"";};
  return{type:f("type"),title:f("title"),description:f("description"),overview:f("overview"),image:(t.content.querySelector('[data-field="screenshot"]')||{getAttribute:()=>""}).getAttribute("src")||"",imageAlt:(t.content.querySelector('[data-field="screenshot"]')||{getAttribute:()=>""}).getAttribute("alt")||"",url:t.dataset.url||"#",label:t.dataset.label||"Open project"};
 };
 const el={type:document.getElementById("dialog-type"),title:document.getElementById("dialog-title"),description:document.getElementById("dialog-description"),overview:document.getElementById("dialog-overview"),shot:document.getElementById("dialog-shot"),image:document.getElementById("dialog-image"),caption:document.getElementById("dialog-caption"),link:document.getElementById("dialog-link")};
 const showShot=(p)=>{
  const img=el.image;
  const missing=()=>{img.hidden=true;el.shot.classList.add("no-image");el.caption.textContent="Screenshot coming soon";};
  img.hidden=false;el.shot.classList.remove("no-image");el.caption.textContent=p.imageAlt;img.alt=p.imageAlt;
  img.onerror=missing;
  if(p.image)img.src=p.image;else{img.removeAttribute("src");missing();}
 };
 let lastTrigger=null;
 const close=()=>{if(dialog&&dialog.open)dialog.close();document.body.classList.remove("dialog-open");if(lastTrigger)lastTrigger.focus();};
 document.querySelectorAll("[data-case-study]").forEach(trigger=>trigger.addEventListener("click",()=>{
  const p=readStudy(trigger.dataset.caseStudy);if(!p||!dialog)return;lastTrigger=trigger;
  el.type.textContent=p.type;el.title.textContent=p.title;el.description.textContent=p.description;el.overview.textContent=p.overview;showShot(p);
  el.link.href=p.url;el.link.textContent=p.label+" ↗";
  if(typeof dialog.showModal==="function"){dialog.showModal();document.body.classList.add("dialog-open");closeButton?.focus();}
  else window.open(p.url,"_blank","noopener");
 }));
 closeButton?.addEventListener("click",close);dismissButton?.addEventListener("click",close);
 dialog?.addEventListener("click",e=>{if(e.target===dialog)close();});
 dialog?.addEventListener("close",()=>{document.body.classList.remove("dialog-open");if(lastTrigger)lastTrigger.focus();});
})();
