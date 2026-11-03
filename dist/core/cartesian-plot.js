import {escapeHtml as escape} from './html.js';

/** SVG geometry only: callers supply data, bounds, captions and number formatting. */
export function cartesianPlot({width=740,height=330,xMin=-2,xMax=2,yMin=-3,yMax=3,format=String,xLabel='x',yLabel='y',title='',description='',id='concept-plot'}){
  const left=49,right=18,top=29,bottom=44;
  const x=value=>left+(value-xMin)/(xMax-xMin)*(width-left-right);
  const y=value=>height-bottom-(value-yMin)/(yMax-yMin)*(height-top-bottom);
  const clipId=`${id}-clip`;
  let markup=`<title>${escape(title)}</title><desc>${escape(description)}</desc><defs><clipPath id="${clipId}"><rect x="${left}" y="${top}" width="${width-left-right}" height="${height-top-bottom}"/></clipPath></defs>`;
  for(let i=0;i<=4;i++){
    const xx=left+i*(width-left-right)/4,yy=top+i*(height-top-bottom)/4;
    markup+=`<path d="M${left} ${yy}H${width-right}M${xx} ${top}V${height-bottom}" fill="none" stroke="#e5ecde" stroke-dasharray="3 5"/><text x="${left-9}" y="${yy+4}" text-anchor="end">${escape(format(yMax-(yMax-yMin)*i/4,1))}</text><text x="${xx}" y="${height-bottom+21}" text-anchor="middle">${escape(format(xMin+(xMax-xMin)*i/4,1))}</text>`;
  }
  if(xMin<0&&xMax>0)markup+=`<path d="M${x(0)} ${top}V${height-bottom}" stroke="#b7c5a9"/>`;
  if(yMin<0&&yMax>0)markup+=`<path d="M${left} ${y(0)}H${width-right}" stroke="#b7c5a9"/>`;
  markup+=`<text x="${left}" y="14">${escape(yLabel)}</text><text x="${width-right}" y="${height-4}" text-anchor="end">${escape(xLabel)}</text>`;
  function path(points){let move=true;return points.map(point=>{
    if(!point||!point.every(Number.isFinite)){move=true;return '';}
    const command=move?'M':'L';move=false;return `${command}${x(point[0]).toFixed(2)},${y(point[1]).toFixed(2)}`;
  }).join(' ');}
  const line=(points,color='#397752',options='')=>`<path d="${path(points)}" fill="none" stroke="${color}" stroke-width="2.5" ${options}/>`;
  const point=(a,b,color='#397752')=>`<circle cx="${x(a)}" cy="${y(b)}" r="5" fill="${color}" stroke="white" stroke-width="2"/>`;
  return {x,y,line,point,clipId,markup,width,height,left,right,top,bottom};
}

export function sampledCurve(fn,start,end,count=180){
  return Array.from({length:count+1},(_,i)=>{const x=start+(end-start)*i/count;return [x,fn(x)];});
}
