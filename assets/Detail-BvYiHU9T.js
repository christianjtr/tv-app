import{r as h,j as s,u as k,a as C,b as y,L as j}from"./index-C5d9Cw03.js";import{s as L,a as N,R as g}from"./tvshow.api.services-WveW_0iH.js";import{u as D}from"./useSearchQueryParams-2vuBEOUI.js";/* empty css               */const S=async(a,i)=>{try{return await{movies:L,"tv-shows":N}[i](a)}catch(t){throw new Error(t)}},M=(a,i)=>{const[t,l]=h.useState(null),[e,n]=h.useState(!1);return h.useEffect(()=>{a&&i&&(async()=>{try{n(!0);const c=await S(a,i);l(c)}catch(c){throw new Error(`Error fetching tv program, [Error]: ${c}`)}finally{n(!1)}})()},[a,i]),{tvProgram:t,isLoading:e}},B=a=>{const{info:i}=a,t=i.firstAirDate,l=new Date(t).toLocaleDateString("en-US",{month:"long",year:"numeric"});return s.jsxs("div",{className:"card bg-base-200 shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-base-300 duration-300","data-element":"season-card",tabIndex:0,children:[s.jsx("figure",{children:s.jsx("img",{src:i.images.w300,alt:"Season poster","aria-label":"Season poster",className:"rounded-t-md md:w-full sm:w-fit xs:w-fit"})}),s.jsxs("div",{className:"card-body text-base sm:flex xs:flex items-center",children:[s.jsx("h3",{className:"card-title",children:i.name}),s.jsx(g,{value:i.rating,className:"border-none"}),s.jsxs("p",{children:[s.jsx("span",{className:"block",children:l}),s.jsxs("span",{className:"block",children:["Season: ",i.seasonNumber]}),s.jsxs("span",{className:"block",children:["Episodes: ",i.numberOfEpisodes]})]})]})]})},E="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20width='100'%20height='100'%20fill='none'%20stroke='white'%20stroke-width='10'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3ccircle%20cx='50'%20cy='50'%20r='40'/%3e%3cpath%20d='M50%2025V50%20H75'%20/%3e%3c/svg%3e",I="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20575%20289.83'%20width='575'%20height='289.83'%3e%3cdefs%3e%3cpath%20d='M575%2024.91C573.44%2012.15%20563.97%201.98%20551.91%200C499.05%200%2076.18%200%2023.32%200C10.11%202.17%200%2014.16%200%2028.61C0%2051.84%200%20237.64%200%20260.86C0%20276.86%2012.37%20289.83%2027.64%20289.83C79.63%20289.83%20495.6%20289.83%20547.59%20289.83C561.65%20289.83%20573.26%20278.82%20575%20264.57C575%20216.64%20575%2048.87%20575%2024.91Z'%20id='d1pwhf9wy2'%3e%3c/path%3e%3cpath%20d='M69.35%2058.24L114.98%2058.24L114.98%20233.89L69.35%20233.89L69.35%2058.24Z'%20id='g5jjnq26yS'%3e%3c/path%3e%3cpath%20d='M201.2%20139.15C197.28%20112.38%20195.1%2097.5%20194.67%2094.53C192.76%2080.2%20190.94%2067.73%20189.2%2057.09C185.25%2057.09%20165.54%2057.09%20130.04%2057.09L130.04%20232.74L170.01%20232.74L170.15%20116.76L186.97%20232.74L215.44%20232.74L231.39%20114.18L231.54%20232.74L271.38%20232.74L271.38%2057.09L211.77%2057.09L201.2%20139.15Z'%20id='i3Prh1JpXt'%3e%3c/path%3e%3cpath%20d='M346.71%2093.63C347.21%2095.87%20347.47%20100.95%20347.47%20108.89C347.47%20115.7%20347.47%20170.18%20347.47%20176.99C347.47%20188.68%20346.71%20195.84%20345.2%20198.48C343.68%20201.12%20339.64%20202.43%20333.09%20202.43C333.09%20190.9%20333.09%2098.66%20333.09%2087.13C338.06%2087.13%20341.45%2087.66%20343.25%2088.7C345.05%2089.75%20346.21%2091.39%20346.71%2093.63ZM367.32%20230.95C372.75%20229.76%20377.31%20227.66%20381.01%20224.67C384.7%20221.67%20387.29%20217.52%20388.77%20212.21C390.26%20206.91%20391.14%20196.38%20391.14%20180.63C391.14%20174.47%20391.14%20125.12%20391.14%20118.95C391.14%20102.33%20390.49%2091.19%20389.48%2085.53C388.46%2079.86%20385.93%2074.71%20381.88%2070.09C377.82%2065.47%20371.9%2062.15%20364.12%2060.13C356.33%2058.11%20343.63%2057.09%20321.54%2057.09C319.27%2057.09%20307.93%2057.09%20287.5%2057.09L287.5%20232.74L342.78%20232.74C355.52%20232.34%20363.7%20231.75%20367.32%20230.95Z'%20id='a4ov9rRGQm'%3e%3c/path%3e%3cpath%20d='M464.76%20204.7C463.92%20206.93%20460.24%20208.06%20457.46%20208.06C454.74%20208.06%20452.93%20206.98%20452.01%20204.81C451.09%20202.65%20450.64%20197.72%20450.64%20190C450.64%20185.36%20450.64%20148.22%20450.64%20143.58C450.64%20135.58%20451.04%20130.59%20451.85%20128.6C452.65%20126.63%20454.41%20125.63%20457.13%20125.63C459.91%20125.63%20463.64%20126.76%20464.6%20129.03C465.55%20131.3%20466.03%20136.15%20466.03%20143.58C466.03%20146.58%20466.03%20161.58%20466.03%20188.59C465.74%20197.84%20465.32%20203.21%20464.76%20204.7ZM406.68%20231.21L447.76%20231.21C449.47%20224.5%20450.41%20220.77%20450.6%20220.02C454.32%20224.52%20458.41%20227.9%20462.9%20230.14C467.37%20232.39%20474.06%20233.51%20479.24%20233.51C486.45%20233.51%20492.67%20231.62%20497.92%20227.83C503.16%20224.05%20506.5%20219.57%20507.92%20214.42C509.34%20209.26%20510.05%20201.42%20510.05%20190.88C510.05%20185.95%20510.05%20146.53%20510.05%20141.6C510.05%20131%20509.81%20124.08%20509.34%20120.83C508.87%20117.58%20507.47%20114.27%20505.14%20110.88C502.81%20107.49%20499.42%20104.86%20494.98%20102.98C490.54%20101.1%20485.3%20100.16%20479.26%20100.16C474.01%20100.16%20467.29%20101.21%20462.81%20103.28C458.34%20105.35%20454.28%20108.49%20450.64%20112.7C450.64%20108.89%20450.64%2089.85%20450.64%2055.56L406.68%2055.56L406.68%20231.21Z'%20id='fk968BpsX'%3e%3c/path%3e%3c/defs%3e%3cg%3e%3cg%3e%3cg%3e%3cuse%20xlink:href='%23d1pwhf9wy2'%20opacity='1'%20fill='%23f6c700'%20fill-opacity='1'%3e%3c/use%3e%3cg%3e%3cuse%20xlink:href='%23d1pwhf9wy2'%20opacity='1'%20fill-opacity='0'%20stroke='%23000000'%20stroke-width='1'%20stroke-opacity='0'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3cg%3e%3cuse%20xlink:href='%23g5jjnq26yS'%20opacity='1'%20fill='%23000000'%20fill-opacity='1'%3e%3c/use%3e%3cg%3e%3cuse%20xlink:href='%23g5jjnq26yS'%20opacity='1'%20fill-opacity='0'%20stroke='%23000000'%20stroke-width='1'%20stroke-opacity='0'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3cg%3e%3cuse%20xlink:href='%23i3Prh1JpXt'%20opacity='1'%20fill='%23000000'%20fill-opacity='1'%3e%3c/use%3e%3cg%3e%3cuse%20xlink:href='%23i3Prh1JpXt'%20opacity='1'%20fill-opacity='0'%20stroke='%23000000'%20stroke-width='1'%20stroke-opacity='0'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3cg%3e%3cuse%20xlink:href='%23a4ov9rRGQm'%20opacity='1'%20fill='%23000000'%20fill-opacity='1'%3e%3c/use%3e%3cg%3e%3cuse%20xlink:href='%23a4ov9rRGQm'%20opacity='1'%20fill-opacity='0'%20stroke='%23000000'%20stroke-width='1'%20stroke-opacity='0'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3cg%3e%3cuse%20xlink:href='%23fk968BpsX'%20opacity='1'%20fill='%23000000'%20fill-opacity='1'%3e%3c/use%3e%3cg%3e%3cuse%20xlink:href='%23fk968BpsX'%20opacity='1'%20fill-opacity='0'%20stroke='%23000000'%20stroke-width='1'%20stroke-opacity='0'%3e%3c/use%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e",$=()=>{var p,x,m,f;const a=k(),{pathname:i}=C(),{id:t}=y(),l=D(i),{tvProgram:e,isLoading:n}=M(t,l),c=(e==null?void 0:e.title)||(e==null?void 0:e.name),u=(e==null?void 0:e.releaseDate)||(e==null?void 0:e.firstAirDate),w=new Date(u).toLocaleDateString("en-US",{month:"long",year:"numeric"}),o=(e==null?void 0:e.numberOfEpisodes)&&(e==null?void 0:e.numberOfSeasons);return n?s.jsx(j,{}):s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"hero min-h-max text-left detail-container__wrapper bg-transparent",style:{"--background-image":`url(${(p=e==null?void 0:e.images)==null?void 0:p.original})`},children:[s.jsxs("button",{id:"btn_back",name:"btn_back","data-testid":"btn_back",onClick:()=>a.goBack(),className:"btn btn-ghost absolute top-5 left-0","aria-label":"Back button",children:[s.jsx("svg",{className:"h-6 w-6 fill-current md:h-8 md:w-8",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",children:s.jsx("path",{d:"M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"})}),"Return"]}),s.jsxs("div",{className:"hero-content flex-col lg:flex-row mt-16",children:[s.jsx("img",{src:(x=e==null?void 0:e.images)==null?void 0:x.w300,className:"max-w-sm rounded-lg shadow-2xl",alt:`${c} poster`,"aria-label":`${c} poster`}),s.jsxs("div",{className:"ml-3 text-white",children:[s.jsx("h6",{className:"text-sm mb-1",children:e==null?void 0:e.tagLine}),s.jsx("h1",{className:"text-5xl font-semibold",children:c}),s.jsxs("div",{className:"my-3",children:[s.jsxs("div",{className:"my-3 flex align-baseline",children:[s.jsx(g,{value:e==null?void 0:e.rating,className:"text-base p-3 border-none"}),!o&&s.jsxs(s.Fragment,{children:[s.jsx("img",{src:E,className:"inline-block mx-2",alt:"Clock icon","aria-label":"Clock image",width:"16"}),s.jsxs("span",{children:[e==null?void 0:e.runtime," min."]})]}),s.jsx("a",{id:"official_site","data-testid":"official_site",href:e==null?void 0:e.homepage,className:"link link-hover mx-2",target:"_blank",title:"Official site",rel:"noreferrer","aria-label":"TV program official site",children:"Official site ➜"})]}),s.jsxs("p",{className:"my-2",children:[!o&&s.jsx("a",{id:"imdb_link","data-testid":"imdb_link",className:"link link-hover inline-block",href:`https://www.imdb.com/title/${e==null?void 0:e.IMDBId}`,rel:"noreferrer",target:"_blank",title:"IMDb Official site","aria-label":"IMDb official site",children:s.jsx("img",{src:I,className:"inline-block mr-2",alt:"IMDb icon","aria-label":"IMDb image",width:"45"})}),s.jsx("span",{className:"inline-block",children:w}),o&&s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"mx-2",children:"|"}),s.jsxs("span",{className:"inline-block",children:["Duration: ",e==null?void 0:e.numberOfSeasons," Seasons, ",e==null?void 0:e.numberOfEpisodes," Episodes"]}),s.jsx("span",{className:"mx-2",children:"|"}),s.jsxs("span",{className:"inline-block",children:["Ended: ",e!=null&&e.inProduction?"In production":"Yes"]})]})]})]}),s.jsx("p",{className:"my-6",children:(m=e==null?void 0:e.genres)==null?void 0:m.map(({id:r,name:d},b)=>s.jsx("span",{className:"badge badge-secondary mr-2 rounded-xl bg-pink-500 text-white p-3 border-none",children:d},`genre_${b}_${r}`))}),s.jsx("p",{className:"my-6",children:e==null?void 0:e.description})]})]})]}),o&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"text-2xl divider divider-start mb-10",children:"Seasons"}),s.jsx("div",{className:"grid md:grid-cols-5 gap-5 mb-10 sm:grid-cols-1 xs:grid-cols-1",children:(f=e==null?void 0:e.seasons)==null?void 0:f.map((r,d)=>s.jsx(B,{info:r},`season_${t}_${d}`))})]})]})};export{$ as default};
