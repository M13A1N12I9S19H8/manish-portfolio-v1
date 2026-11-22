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

 const studies={
  "block-calculator":{type:"ENGINEERING TOOL · STREAMLIT",title:"Concrete Block Calculator",description:"A small digital tool exploring practical construction quantity calculations.",overview:"A practical construction calculator concept designed to make block quantity estimation quicker and easier to understand. Expand this case study with the calculation method, assumptions, screenshots, test examples and limitations.",notes:"Add calculation method, input definitions, assumptions, test cases, screenshots, your role and known limitations.",url:"https://concrete-block-calculator-bymanish.streamlit.app/",label:"Open live calculator"},
  "rainwater-planner":{type:"CIVIL · ENVIRONMENT",title:"Rainwater Harvesting Planner",description:"Exploring simple planning tools for water harvesting.",overview:"An exploration of a digital planning aid for rainwater harvesting. Add the rainfall data source, roof catchment assumptions, storage sizing method, screenshots and a sample project.",notes:"Document rainfall data, catchment area, runoff coefficient, demand assumptions, storage sizing and a worked example.",url:"https://github.com/M13A1N12I9S19H8/rainwaterharvestingplanner",label:"View project repository"},
  "micro-hydro":{type:"RENEWABLE ENERGY",title:"Micro Hydro Planner",description:"A software exploration around small-scale hydropower planning.",overview:"A software exploration focused on small-scale hydropower planning. Document head and flow inputs, power estimation, efficiency assumptions, design boundaries and a worked example.",notes:"Document gross and net head, design flow, efficiency assumptions and estimated output. State that this is a planning tool, not a substitute for detailed design.",url:"https://github.com/M13A1N12I9S19H8/microhydro",label:"View project repository"},
  "zen-widget":{type:"WINDOWS UTILITY · PYTHON",title:"Zen Button Widget",description:"A lightweight desktop idea designed to bring a moment of focus into a busy day.",overview:"A lightweight desktop utility concept intended to offer a small pause for focus. Add interface screenshots, interaction details, implementation notes and a demonstration.",notes:"Add screenshots, problem statement, user interaction flow, implementation details and lessons learned.",url:"https://github.com/M13A1N12I9S19H8/Zen_Button_widget",label:"View project repository"},
  "smart-irrigation":{type:"ARDUINO · STEM",title:"Smart Drip Irrigation",description:"A hands-on robotics and IoT learning project using sensors and automation.",overview:"A hands-on STEM project demonstrating how sensors and simple automation can support irrigation. Add a circuit diagram, component list, control logic, prototype photographs and test observations.",notes:"Add component list, wiring diagram, sensor thresholds, control logic, prototype photos and observed results.",url:"https://youtu.be/bISH9VagwCc",label:"Watch project video"}
 };
 const el={type:document.getElementById("dialog-type"),title:document.getElementById("dialog-title"),description:document.getElementById("dialog-description"),overview:document.getElementById("dialog-overview"),notes:document.getElementById("dialog-notes"),link:document.getElementById("dialog-link")};
 let lastTrigger=null;
 const close=()=>{if(dialog&&dialog.open)dialog.close();document.body.classList.remove("dialog-open");if(lastTrigger)lastTrigger.focus();};
 document.querySelectorAll("[data-case-study]").forEach(trigger=>trigger.addEventListener("click",()=>{
  const p=studies[trigger.dataset.caseStudy];if(!p||!dialog)return;lastTrigger=trigger;
  el.type.textContent=p.type;el.title.textContent=p.title;el.description.textContent=p.description;el.overview.textContent=p.overview;el.notes.textContent=p.notes;
  el.link.href=p.url;el.link.textContent=p.label+" ↗";
  if(typeof dialog.showModal==="function"){dialog.showModal();document.body.classList.add("dialog-open");closeButton?.focus();}
  else window.open(p.url,"_blank","noopener");
 }));
 closeButton?.addEventListener("click",close);dismissButton?.addEventListener("click",close);
 dialog?.addEventListener("click",e=>{if(e.target===dialog)close();});
 dialog?.addEventListener("close",()=>{document.body.classList.remove("dialog-open");if(lastTrigger)lastTrigger.focus();});
})();