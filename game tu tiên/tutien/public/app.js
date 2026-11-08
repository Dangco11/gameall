"use strict";(()=>{var wp=Object.defineProperty;var Ap=(s,e,t)=>e in s?wp(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var z=(s,e,t)=>Ap(s,typeof e!="symbol"?e+"":e,t);var wh="170";var Rp=0,zu=1,Cp=2;var hf=1,Ah=2,di=3,Pn=0,Xt=1,Dt=2,Qn=0,Qs=1,Ot=2,Vu=3,Gu=4,Ip=5,hs=100,Pp=101,Lp=102,Dp=103,Np=104,Up=200,Op=201,Fp=202,Bp=203,cl=204,ll=205,Hp=206,kp=207,zp=208,Vp=209,Gp=210,Wp=211,Xp=212,qp=213,Yp=214,hl=0,ul=1,dl=2,ir=3,fl=4,pl=5,ml=6,gl=7,uf=0,$p=1,Kp=2,Bi=0,Rh=1,Ch=2,Ih=3,go=4,Zp=5,Ph=6,Lh=7,Wu="attached",Jp="detached",df=300,sr=301,rr=302,xl=303,_l=304,$a=306,xi=1e3,pi=1001,to=1002,Qt=1003,Dh=1004;var $s=1005;var un=1006,$r=1007;var jn=1008;var _i=1009,ff=1010,pf=1011,no=1012,Nh=1013,ds=1014,Wn=1015,Xn=1016,Uh=1017,Oh=1018,or=1020,mf=35902,gf=1021,xf=1022,Cn=1023,_f=1024,yf=1025,er=1026,ar=1027,Fh=1028,Bh=1029,vf=1030,Hh=1031;var kh=1033,ua=33776,da=33777,fa=33778,pa=33779,yl=35840,vl=35841,Ml=35842,El=35843,bl=36196,Tl=37492,Sl=37496,wl=37808,Al=37809,Rl=37810,Cl=37811,Il=37812,Pl=37813,Ll=37814,Dl=37815,Nl=37816,Ul=37817,Ol=37818,Fl=37819,Bl=37820,Hl=37821,ma=36492,kl=36494,zl=36495,Mf=36283,Vl=36284,Gl=36285,Wl=36286,zh=2200,Vh=2201,jp=2202,cr=2300,lr=2301,wc=2302,Ks=2400,Zs=2401,ga=2402,Gh=2500,Qp=2501,Ef=0,Ka=1,xo=2,em=3200,tm=3201;var bf=0,nm=1,Ui="",Pt="srgb",tn="srgb-linear",Za="linear",ft="srgb";var Cs=7680;var Xu=519,im=512,sm=513,rm=514,Tf=515,om=516,am=517,cm=518,lm=519,Xl=35044,_o=35048;var qu="300 es",mi=2e3,xa=2001,yi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Yu=1234567,Kr=Math.PI/180,hr=180/Math.PI;function In(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jt[s&255]+Jt[s>>8&255]+Jt[s>>16&255]+Jt[s>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function kt(s,e,t){return Math.max(e,Math.min(t,s))}function Wh(s,e){return(s%e+e)%e}function hm(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function um(s,e,t){return s!==e?(t-s)/(e-s):0}function Zr(s,e,t){return(1-t)*s+t*e}function dm(s,e,t,n){return Zr(s,e,1-Math.exp(-t*n))}function fm(s,e=1){return e-Math.abs(Wh(s,e*2)-e)}function pm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function mm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function gm(s,e){return s+Math.floor(Math.random()*(e-s+1))}function xm(s,e){return s+Math.random()*(e-s)}function _m(s){return s*(.5-Math.random())}function ym(s){s!==void 0&&(Yu=s);let e=Yu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function vm(s){return s*Kr}function Mm(s){return s*hr}function Em(s){return(s&s-1)===0&&s!==0}function bm(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Tm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Sm(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*f,a*l);break;case"YXY":s.set(c*f,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Gn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function gt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Sf={DEG2RAD:Kr,RAD2DEG:hr,generateUUID:In,clamp:kt,euclideanModulo:Wh,mapLinear:hm,inverseLerp:um,lerp:Zr,damp:dm,pingpong:fm,smoothstep:pm,smootherstep:mm,randInt:gm,randFloat:xm,randFloatSpread:_m,seededRandom:ym,degToRad:vm,radToDeg:Mm,isPowerOfTwo:Em,ceilPowerOfTwo:bm,floorPowerOfTwo:Tm,setQuaternionFromProperEuler:Sm,normalize:gt,denormalize:Gn},j=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},qe=class s{constructor(e,t,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=i[0],m=i[3],p=i[6],v=i[1],y=i[4],_=i[7],C=i[2],w=i[5],R=i[8];return r[0]=o*x+a*v+c*C,r[3]=o*m+a*y+c*w,r[6]=o*p+a*_+c*R,r[1]=l*x+h*v+u*C,r[4]=l*m+h*y+u*w,r[7]=l*p+h*_+u*R,r[2]=d*x+f*v+g*C,r[5]=d*m+f*y+g*w,r[8]=d*p+f*_+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=u*x,e[1]=(i*l-h*n)*x,e[2]=(a*n-i*o)*x,e[3]=d*x,e[4]=(h*t-i*c)*x,e[5]=(i*r-a*t)*x,e[6]=f*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ac.makeScale(e,t)),this}rotate(e){return this.premultiply(Ac.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ac.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ac=new qe;function wf(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function io(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function wm(){let s=io("canvas");return s.style.display="block",s}var $u={};function qr(s){s in $u||($u[s]=!0,console.warn(s))}function Am(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Rm(s){let e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Cm(s){let e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var Ze={enabled:!0,workingColorSpace:tn,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===ft&&(s.r=gi(s.r),s.g=gi(s.g),s.b=gi(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===ft&&(s.r=tr(s.r),s.g=tr(s.g),s.b=tr(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ui?Za:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function gi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function tr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Ku=[.64,.33,.3,.6,.15,.06],Zu=[.2126,.7152,.0722],Ju=[.3127,.329],ju=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qu=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ze.define({[tn]:{primaries:Ku,whitePoint:Ju,transfer:Za,toXYZ:ju,fromXYZ:Qu,luminanceCoefficients:Zu,workingColorSpaceConfig:{unpackColorSpace:Pt},outputColorSpaceConfig:{drawingBufferColorSpace:Pt}},[Pt]:{primaries:Ku,whitePoint:Ju,transfer:ft,toXYZ:ju,fromXYZ:Qu,luminanceCoefficients:Zu,outputColorSpaceConfig:{drawingBufferColorSpace:Pt}}});var Is,ql=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Is===void 0&&(Is=io("canvas")),Is.width=e.width,Is.height=e.height;let n=Is.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Is}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=io("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=gi(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(gi(t[n]/255)*255):t[n]=gi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Im=0,_a=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Im++}),this.uuid=In(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Rc(i[o].image)):r.push(Rc(i[o]))}else r=Rc(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Rc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ql.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Pm=0,qt=class s extends yi{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=pi,i=pi,r=un,o=jn,a=Cn,c=_i,l=s.DEFAULT_ANISOTROPY,h=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Pm++}),this.uuid=In(),this.name="",this.source=new _a(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new j(0,0),this.repeat=new j(1,1),this.center=new j(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==df)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xi:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case to:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xi:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case to:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=df;qt.DEFAULT_ANISOTROPY=1;var at=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,_=(f+1)/2,C=(p+1)/2,w=(h+d)/4,R=(u+x)/4,I=(g+m)/4;return y>_&&y>C?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=w/n,r=R/n):_>C?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=w/i,r=I/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=R/r,i=I/r),this.set(n,i,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-x)/v,this.z=(d-h)/v,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yl=class extends yi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);let i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new qt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new _a(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},on=class extends Yl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ya=class extends qt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var $l=class extends qt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var dn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(u!==x||c!==d||l!==f||h!==g){let m=1-a,p=c*d+l*f+h*g+u*x,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let C=Math.sqrt(y),w=Math.atan2(C,p*v);m=Math.sin(m*w)/C,a=Math.sin(a*w)/C}let _=a*v;if(c=c*m+d*_,l=l*m+f*_,h=h*m+g*_,u=u*m+x*_,m===1-a){let C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-a*f,e[t+2]=l*g+h*f+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(r/2),d=c(n/2),f=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(kt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},S=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ed.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ed.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=i+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Cc.copy(this).projectOnVector(e),this.sub(Cc)}reflect(e){return this.sub(Cc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Cc=new S,ed=new dn,an=class{constructor(e=new S(1/0,1/0,1/0),t=new S(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,kn):kn.fromBufferAttribute(r,o),kn.applyMatrix4(e.matrixWorld),this.expandByPoint(kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Lo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Lo.copy(n.boundingBox)),Lo.applyMatrix4(e.matrixWorld),this.union(Lo)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,kn),kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ur),Do.subVectors(this.max,Ur),Ps.subVectors(e.a,Ur),Ls.subVectors(e.b,Ur),Ds.subVectors(e.c,Ur),Ci.subVectors(Ls,Ps),Ii.subVectors(Ds,Ls),is.subVectors(Ps,Ds);let t=[0,-Ci.z,Ci.y,0,-Ii.z,Ii.y,0,-is.z,is.y,Ci.z,0,-Ci.x,Ii.z,0,-Ii.x,is.z,0,-is.x,-Ci.y,Ci.x,0,-Ii.y,Ii.x,0,-is.y,is.x,0];return!Ic(t,Ps,Ls,Ds,Do)||(t=[1,0,0,0,1,0,0,0,1],!Ic(t,Ps,Ls,Ds,Do))?!1:(No.crossVectors(Ci,Ii),t=[No.x,No.y,No.z],Ic(t,Ps,Ls,Ds,Do))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},oi=[new S,new S,new S,new S,new S,new S,new S,new S],kn=new S,Lo=new an,Ps=new S,Ls=new S,Ds=new S,Ci=new S,Ii=new S,is=new S,Ur=new S,Do=new S,No=new S,ss=new S;function Ic(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ss.fromArray(s,r);let a=i.x*Math.abs(ss.x)+i.y*Math.abs(ss.y)+i.z*Math.abs(ss.z),c=e.dot(ss),l=t.dot(ss),h=n.dot(ss);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Lm=new an,Or=new S,Pc=new S,vn=class{constructor(e=new S,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Lm.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Or.subVectors(e,this.center);let t=Or.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Or,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Pc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Or.copy(e.center).add(Pc)),this.expandByPoint(Or.copy(e.center).sub(Pc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},ai=new S,Lc=new S,Uo=new S,Pi=new S,Dc=new S,Oo=new S,Nc=new S,ur=class{constructor(e=new S,t=new S(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ai.copy(this.origin).addScaledVector(this.direction,t),ai.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Lc.copy(e).add(t).multiplyScalar(.5),Uo.copy(t).sub(e).normalize(),Pi.copy(this.origin).sub(Lc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Uo),a=Pi.dot(this.direction),c=-Pi.dot(Uo),l=Pi.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Lc).addScaledVector(Uo,d),f}intersectSphere(e,t){ai.subVectors(e.center,this.origin);let n=ai.dot(this.direction),i=ai.dot(ai)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ai)!==null}intersectTriangle(e,t,n,i,r){Dc.subVectors(t,e),Oo.subVectors(n,e),Nc.crossVectors(Dc,Oo);let o=this.direction.dot(Nc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Pi.subVectors(this.origin,e);let c=a*this.direction.dot(Oo.crossVectors(Pi,Oo));if(c<0)return null;let l=a*this.direction.dot(Dc.cross(Pi));if(l<0||c+l>o)return null;let h=-a*Pi.dot(Nc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ve=class s{constructor(e,t,n,i,r,o,a,c,l,h,u,d,f,g,x,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,h,u,d,f,g,x,m)}set(e,t,n,i,r,o,a,c,l,h,u,d,f,g,x,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Ns.setFromMatrixColumn(e,0).length(),r=1/Ns.setFromMatrixColumn(e,1).length(),o=1/Ns.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,g=a*h,x=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-x*l,t[9]=-a*c,t[2]=x-d*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,g=l*h,x=l*u;t[0]=d+x*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=x+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,g=l*h,x=l*u;t[0]=d-x*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,f=o*u,g=a*h,x=a*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+x,t[1]=c*u,t[5]=x*l+d,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*h,t[4]=x-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-x*u}else if(e.order==="XZY"){let d=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+x,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dm,e,Nm)}lookAt(e,t,n){let i=this.elements;return _n.subVectors(e,t),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),Li.crossVectors(n,_n),Li.lengthSq()===0&&(Math.abs(n.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),Li.crossVectors(n,_n)),Li.normalize(),Fo.crossVectors(_n,Li),i[0]=Li.x,i[4]=Fo.x,i[8]=_n.x,i[1]=Li.y,i[5]=Fo.y,i[9]=_n.y,i[2]=Li.z,i[6]=Fo.z,i[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],v=n[3],y=n[7],_=n[11],C=n[15],w=i[0],R=i[4],I=i[8],b=i[12],M=i[1],L=i[5],H=i[9],D=i[13],G=i[2],J=i[6],U=i[10],X=i[14],W=i[3],ie=i[7],me=i[11],we=i[15];return r[0]=o*w+a*M+c*G+l*W,r[4]=o*R+a*L+c*J+l*ie,r[8]=o*I+a*H+c*U+l*me,r[12]=o*b+a*D+c*X+l*we,r[1]=h*w+u*M+d*G+f*W,r[5]=h*R+u*L+d*J+f*ie,r[9]=h*I+u*H+d*U+f*me,r[13]=h*b+u*D+d*X+f*we,r[2]=g*w+x*M+m*G+p*W,r[6]=g*R+x*L+m*J+p*ie,r[10]=g*I+x*H+m*U+p*me,r[14]=g*b+x*D+m*X+p*we,r[3]=v*w+y*M+_*G+C*W,r[7]=v*R+y*L+_*J+C*ie,r[11]=v*I+y*H+_*U+C*me,r[15]=v*b+y*D+_*X+C*we,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+r*c*u-i*l*u-r*a*d+n*l*d+i*a*f-n*c*f)+x*(+t*c*f-t*l*d+r*o*d-i*o*f+i*l*h-r*c*h)+m*(+t*l*u-t*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-i*a*h-t*c*u+t*a*d+i*o*u-n*o*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],v=u*m*l-x*d*l+x*c*f-a*m*f-u*c*p+a*d*p,y=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,_=h*x*l-g*u*l+g*a*f-o*x*f-h*a*p+o*u*p,C=g*u*c-h*x*c-g*a*d+o*x*d+h*a*m-o*u*m,w=t*v+n*y+i*_+r*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/w;return e[0]=v*R,e[1]=(x*d*r-u*m*r-x*i*f+n*m*f+u*i*p-n*d*p)*R,e[2]=(a*m*r-x*c*r+x*i*l-n*m*l-a*i*p+n*c*p)*R,e[3]=(u*c*r-a*d*r-u*i*l+n*d*l+a*i*f-n*c*f)*R,e[4]=y*R,e[5]=(h*m*r-g*d*r+g*i*f-t*m*f-h*i*p+t*d*p)*R,e[6]=(g*c*r-o*m*r-g*i*l+t*m*l+o*i*p-t*c*p)*R,e[7]=(o*d*r-h*c*r+h*i*l-t*d*l-o*i*f+t*c*f)*R,e[8]=_*R,e[9]=(g*u*r-h*x*r-g*n*f+t*x*f+h*n*p-t*u*p)*R,e[10]=(o*x*r-g*a*r+g*n*l-t*x*l-o*n*p+t*a*p)*R,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*f-t*a*f)*R,e[12]=C*R,e[13]=(h*x*i-g*u*i+g*n*d-t*x*d-h*n*m+t*u*m)*R,e[14]=(g*a*i-o*x*i-g*n*c+t*x*c+o*n*m-t*a*m)*R,e[15]=(o*u*i-h*a*i+h*n*c-t*u*c-o*n*d+t*a*d)*R,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,x=o*h,m=o*u,p=a*u,v=c*l,y=c*h,_=c*u,C=n.x,w=n.y,R=n.z;return i[0]=(1-(x+p))*C,i[1]=(f+_)*C,i[2]=(g-y)*C,i[3]=0,i[4]=(f-_)*w,i[5]=(1-(d+p))*w,i[6]=(m+v)*w,i[7]=0,i[8]=(g+y)*R,i[9]=(m-v)*R,i[10]=(1-(d+x))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=Ns.set(i[0],i[1],i[2]).length(),o=Ns.set(i[4],i[5],i[6]).length(),a=Ns.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],zn.copy(this);let l=1/r,h=1/o,u=1/a;return zn.elements[0]*=l,zn.elements[1]*=l,zn.elements[2]*=l,zn.elements[4]*=h,zn.elements[5]*=h,zn.elements[6]*=h,zn.elements[8]*=u,zn.elements[9]*=u,zn.elements[10]*=u,t.setFromRotationMatrix(zn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=mi){let c=this.elements,l=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),f,g;if(a===mi)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===xa)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=mi){let c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*l,f=(n+i)*h,g,x;if(a===mi)g=(o+r)*u,x=-2*u;else if(a===xa)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ns=new S,zn=new Ve,Dm=new S(0,0,0),Nm=new S(1,1,1),Li=new S,Fo=new S,_n=new S,td=new Ve,nd=new dn,ei=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(kt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-kt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(kt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return td.makeRotationFromQuaternion(e),this.setFromRotationMatrix(td,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return nd.setFromEuler(this),this.setFromQuaternion(nd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ei.DEFAULT_ORDER="XYZ";var va=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Um=0,id=new S,Us=new dn,ci=new Ve,Bo=new S,Fr=new S,Om=new S,Fm=new dn,sd=new S(1,0,0),rd=new S(0,1,0),od=new S(0,0,1),ad={type:"added"},Bm={type:"removed"},Os={type:"childadded",child:null},Uc={type:"childremoved",child:null},rt=class s extends yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Um++}),this.uuid=In(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new S,t=new ei,n=new dn,i=new S(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ve},normalMatrix:{value:new qe}}),this.matrix=new Ve,this.matrixWorld=new Ve,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new va,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Us.setFromAxisAngle(e,t),this.quaternion.multiply(Us),this}rotateOnWorldAxis(e,t){return Us.setFromAxisAngle(e,t),this.quaternion.premultiply(Us),this}rotateX(e){return this.rotateOnAxis(sd,e)}rotateY(e){return this.rotateOnAxis(rd,e)}rotateZ(e){return this.rotateOnAxis(od,e)}translateOnAxis(e,t){return id.copy(e).applyQuaternion(this.quaternion),this.position.add(id.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(sd,e)}translateY(e){return this.translateOnAxis(rd,e)}translateZ(e){return this.translateOnAxis(od,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Bo.copy(e):Bo.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(Fr,Bo,this.up):ci.lookAt(Bo,Fr,this.up),this.quaternion.setFromRotationMatrix(ci),i&&(ci.extractRotation(i.matrixWorld),Us.setFromRotationMatrix(ci),this.quaternion.premultiply(Us.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ad),Os.child=e,this.dispatchEvent(Os),Os.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bm),Uc.child=e,this.dispatchEvent(Uc),Uc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ad),Os.child=e,this.dispatchEvent(Os),Os.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,e,Om),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,Fm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};rt.DEFAULT_UP=new S(0,1,0);rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Vn=new S,li=new S,Oc=new S,hi=new S,Fs=new S,Bs=new S,cd=new S,Fc=new S,Bc=new S,Hc=new S,kc=new at,zc=new at,Vc=new at,Oi=class s{constructor(e=new S,t=new S,n=new S){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Vn.subVectors(e,t),i.cross(Vn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Vn.subVectors(i,t),li.subVectors(n,t),Oc.subVectors(e,t);let o=Vn.dot(Vn),a=Vn.dot(li),c=Vn.dot(Oc),l=li.dot(li),h=li.dot(Oc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,hi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,hi.x),c.addScaledVector(o,hi.y),c.addScaledVector(a,hi.z),c)}static getInterpolatedAttribute(e,t,n,i,r,o){return kc.setScalar(0),zc.setScalar(0),Vc.setScalar(0),kc.fromBufferAttribute(e,t),zc.fromBufferAttribute(e,n),Vc.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(kc,r.x),o.addScaledVector(zc,r.y),o.addScaledVector(Vc,r.z),o}static isFrontFacing(e,t,n,i){return Vn.subVectors(n,t),li.subVectors(e,t),Vn.cross(li).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vn.subVectors(this.c,this.b),li.subVectors(this.a,this.b),Vn.cross(li).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;Fs.subVectors(i,n),Bs.subVectors(r,n),Fc.subVectors(e,n);let c=Fs.dot(Fc),l=Bs.dot(Fc);if(c<=0&&l<=0)return t.copy(n);Bc.subVectors(e,i);let h=Fs.dot(Bc),u=Bs.dot(Bc);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Fs,o);Hc.subVectors(e,r);let f=Fs.dot(Hc),g=Bs.dot(Hc);if(g>=0&&f<=g)return t.copy(r);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Bs,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return cd.subVectors(r,i),a=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(cd,a);let p=1/(m+x+d);return o=x*p,a=d*p,t.copy(n).addScaledVector(Fs,o).addScaledVector(Bs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Af={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},Ho={h:0,s:0,l:0};function Gc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var le=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ze.workingColorSpace){if(e=Wh(e,1),t=kt(t,0,1),n=kt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Gc(o,r,e+1/3),this.g=Gc(o,r,e),this.b=Gc(o,r,e-1/3)}return Ze.toWorkingColorSpace(this,i),this}setStyle(e,t=Pt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pt){let n=Af[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gi(e.r),this.g=gi(e.g),this.b=gi(e.b),this}copyLinearToSRGB(e){return this.r=tr(e.r),this.g=tr(e.g),this.b=tr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pt){return Ze.fromWorkingColorSpace(jt.copy(this),e),Math.round(kt(jt.r*255,0,255))*65536+Math.round(kt(jt.g*255,0,255))*256+Math.round(kt(jt.b*255,0,255))}getHexString(e=Pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.fromWorkingColorSpace(jt.copy(this),t);let n=jt.r,i=jt.g,r=jt.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.fromWorkingColorSpace(jt.copy(this),t),e.r=jt.r,e.g=jt.g,e.b=jt.b,e}getStyle(e=Pt){Ze.fromWorkingColorSpace(jt.copy(this),e);let t=jt.r,n=jt.g,i=jt.b;return e!==Pt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Di),this.setHSL(Di.h+e,Di.s+t,Di.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Di),e.getHSL(Ho);let n=Zr(Di.h,Ho.h,t),i=Zr(Di.s,Ho.s,t),r=Zr(Di.l,Ho.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},jt=new le;le.NAMES=Af;var Hm=0,fn=class extends yi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hm++}),this.uuid=In(),this.name="",this.blending=Qs,this.side=Pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=cl,this.blendDst=ll,this.blendEquation=hs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new le(0,0,0),this.blendAlpha=0,this.depthFunc=ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cs,this.stencilZFail=Cs,this.stencilZPass=Cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qs&&(n.blending=this.blending),this.side!==Pn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==cl&&(n.blendSrc=this.blendSrc),this.blendDst!==ll&&(n.blendDst=this.blendDst),this.blendEquation!==hs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ir&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Cs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Cs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Cs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},xt=class extends fn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=uf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Ht=new S,ko=new j,Tt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Xl,this.updateRanges=[],this.gpuType=Wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ko.fromBufferAttribute(this,t),ko.applyMatrix3(e),this.setXY(t,ko.x,ko.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix3(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Gn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Gn(t,this.array)),t}setX(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Gn(t,this.array)),t}setY(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Gn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Gn(t,this.array)),t}setW(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array),r=gt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xl&&(e.usage=this.usage),e}};var Ma=class extends Tt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ea=class extends Tt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ke=class extends Tt{constructor(e,t,n){super(new Float32Array(e),t,n)}},km=0,Rn=new Ve,Wc=new rt,Hs=new S,yn=new an,Br=new an,Wt=new S,_t=class s extends yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:km++}),this.uuid=In(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wf(e)?Ea:Ma)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Rn.makeRotationFromQuaternion(e),this.applyMatrix4(Rn),this}rotateX(e){return Rn.makeRotationX(e),this.applyMatrix4(Rn),this}rotateY(e){return Rn.makeRotationY(e),this.applyMatrix4(Rn),this}rotateZ(e){return Rn.makeRotationZ(e),this.applyMatrix4(Rn),this}translate(e,t,n){return Rn.makeTranslation(e,t,n),this.applyMatrix4(Rn),this}scale(e,t,n){return Rn.makeScale(e,t,n),this.applyMatrix4(Rn),this}lookAt(e){return Wc.lookAt(e),Wc.updateMatrix(),this.applyMatrix4(Wc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ke(n,3))}else{for(let n=0,i=t.count;n<i;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new an);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new S(-1/0,-1/0,-1/0),new S(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];yn.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new S,1/0);return}if(e){let n=this.boundingSphere.center;if(yn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Br.setFromBufferAttribute(a),this.morphTargetsRelative?(Wt.addVectors(yn.min,Br.min),yn.expandByPoint(Wt),Wt.addVectors(yn.max,Br.max),yn.expandByPoint(Wt)):(yn.expandByPoint(Br.min),yn.expandByPoint(Br.max))}yn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Wt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Wt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Wt.fromBufferAttribute(a,l),c&&(Hs.fromBufferAttribute(e,l),Wt.add(Hs)),i=Math.max(i,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new S,c[I]=new S;let l=new S,h=new S,u=new S,d=new j,f=new j,g=new j,x=new S,m=new S;function p(I,b,M){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),h.sub(l),u.sub(l),f.sub(d),g.sub(d);let L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(L),a[I].add(x),a[b].add(x),a[M].add(x),c[I].add(m),c[b].add(m),c[M].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let I=0,b=v.length;I<b;++I){let M=v[I],L=M.start,H=M.count;for(let D=L,G=L+H;D<G;D+=3)p(e.getX(D+0),e.getX(D+1),e.getX(D+2))}let y=new S,_=new S,C=new S,w=new S;function R(I){C.fromBufferAttribute(i,I),w.copy(C);let b=a[I];y.copy(b),y.sub(C.multiplyScalar(C.dot(b))).normalize(),_.crossVectors(w,b);let L=_.dot(c[I])<0?-1:1;o.setXYZW(I,y.x,y.y,y.z,L)}for(let I=0,b=v.length;I<b;++I){let M=v[I],L=M.start,H=M.count;for(let D=L,G=L+H;D<G;D+=3)R(e.getX(D+0)),R(e.getX(D+1)),R(e.getX(D+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Tt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new S,r=new S,o=new S,a=new S,c=new S,l=new S,h=new S,u=new S;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Tt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},ld=new Ve,rs=new ur,zo=new vn,hd=new S,Vo=new S,Go=new S,Wo=new S,Xc=new S,Xo=new S,ud=new S,qo=new S,q=class extends rt{constructor(e=new _t,t=new xt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){Xo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Xc.fromBufferAttribute(u,e),o?Xo.addScaledVector(Xc,h):Xo.addScaledVector(Xc.sub(t),h))}t.add(Xo)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zo.copy(n.boundingSphere),zo.applyMatrix4(r),rs.copy(e.ray).recast(e.near),!(zo.containsPoint(rs.origin)===!1&&(rs.intersectSphere(zo,hd)===null||rs.origin.distanceToSquared(hd)>(e.far-e.near)**2))&&(ld.copy(r).invert(),rs.copy(e.ray).applyMatrix4(ld),!(n.boundingBox!==null&&rs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,rs)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=v,C=y;_<C;_+=3){let w=a.getX(_),R=a.getX(_+1),I=a.getX(_+2);i=Yo(this,p,e,n,l,h,u,w,R,I),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let v=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);i=Yo(this,o,e,n,l,h,u,v,y,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=v,C=y;_<C;_+=3){let w=_,R=_+1,I=_+2;i=Yo(this,p,e,n,l,h,u,w,R,I),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let v=m,y=m+1,_=m+2;i=Yo(this,o,e,n,l,h,u,v,y,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function zm(s,e,t,n,i,r,o,a){let c;if(e.side===Xt?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===Pn,a),c===null)return null;qo.copy(a),qo.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(qo);return l<t.near||l>t.far?null:{distance:l,point:qo.clone(),object:s}}function Yo(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,Vo),s.getVertexPosition(c,Go),s.getVertexPosition(l,Wo);let h=zm(s,e,t,n,Vo,Go,Wo,ud);if(h){let u=new S;Oi.getBarycoord(ud,Vo,Go,Wo,u),i&&(h.uv=Oi.getInterpolatedAttribute(i,a,c,l,u,new j)),r&&(h.uv1=Oi.getInterpolatedAttribute(r,a,c,l,u,new j)),o&&(h.normal=Oi.getInterpolatedAttribute(o,a,c,l,u,new S),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new S,materialIndex:0};Oi.getNormal(Vo,Go,Wo,d.normal),h.face=d,h.barycoord=u}return h}var vt=class s extends _t{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Ke(l,3)),this.setAttribute("normal",new Ke(h,3)),this.setAttribute("uv",new Ke(u,2));function g(x,m,p,v,y,_,C,w,R,I,b){let M=_/R,L=C/I,H=_/2,D=C/2,G=w/2,J=R+1,U=I+1,X=0,W=0,ie=new S;for(let me=0;me<U;me++){let we=me*L-D;for(let Ge=0;Ge<J;Ge++){let ht=Ge*M-H;ie[x]=ht*v,ie[m]=we*y,ie[p]=G,l.push(ie.x,ie.y,ie.z),ie[x]=0,ie[m]=0,ie[p]=w>0?1:-1,h.push(ie.x,ie.y,ie.z),u.push(Ge/R),u.push(1-me/I),X+=1}}for(let me=0;me<I;me++)for(let we=0;we<R;we++){let Ge=d+we+J*me,ht=d+we+J*(me+1),Z=d+(we+1)+J*(me+1),oe=d+(we+1)+J*me;c.push(Ge,ht,oe),c.push(ht,Z,oe),W+=6}a.addGroup(f,W,b),f+=W,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function dr(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function rn(s){let e={};for(let t=0;t<s.length;t++){let n=dr(s[t]);for(let i in n)e[i]=n[i]}return e}function Vm(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Rf(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}var qi={clone:dr,merge:rn},Gm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,St=class extends fn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gm,this.fragmentShader=Wm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=dr(e.uniforms),this.uniformsGroups=Vm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},ba=class extends rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ve,this.projectionMatrix=new Ve,this.projectionMatrixInverse=new Ve,this.coordinateSystem=mi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ni=new S,dd=new j,fd=new j,zt=class extends ba{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=hr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Kr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return hr*2*Math.atan(Math.tan(Kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z)}getViewSize(e,t){return this.getViewBounds(e,dd,fd),t.subVectors(fd,dd)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Kr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ks=-90,zs=1,Kl=class extends rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new zt(ks,zs,e,t);i.layers=this.layers,this.add(i);let r=new zt(ks,zs,e,t);r.layers=this.layers,this.add(r);let o=new zt(ks,zs,e,t);o.layers=this.layers,this.add(o);let a=new zt(ks,zs,e,t);a.layers=this.layers,this.add(a);let c=new zt(ks,zs,e,t);c.layers=this.layers,this.add(c);let l=new zt(ks,zs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===mi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===xa)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ta=class extends qt{constructor(e,t,n,i,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:sr,super(e,t,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Zl=class extends on{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ta(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:un}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new vt(5,5,5),r=new St({name:"CubemapFromEquirect",uniforms:dr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:Qn});r.uniforms.tEquirect.value=t;let o=new q(i,r),a=t.minFilter;return t.minFilter===jn&&(t.minFilter=un),new Kl(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},qc=new S,Xm=new S,qm=new qe,fi=class{constructor(e=new S(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=qc.subVectors(n,t).cross(Xm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(qc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||qm.getNormalMatrix(e),i=this.coplanarPoint(qc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},os=new vn,$o=new S,so=class{constructor(e=new fi,t=new fi,n=new fi,i=new fi,r=new fi,o=new fi){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=mi){let n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],x=i[10],m=i[11],p=i[12],v=i[13],y=i[14],_=i[15];if(n[0].setComponents(c-r,d-l,m-f,_-p).normalize(),n[1].setComponents(c+r,d+l,m+f,_+p).normalize(),n[2].setComponents(c+o,d+h,m+g,_+v).normalize(),n[3].setComponents(c-o,d-h,m-g,_-v).normalize(),n[4].setComponents(c-a,d-u,m-x,_-y).normalize(),t===mi)n[5].setComponents(c+a,d+u,m+x,_+y).normalize();else if(t===xa)n[5].setComponents(a,u,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),os.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),os.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(os)}intersectsSprite(e){return os.center.set(0,0,0),os.radius=.7071067811865476,os.applyMatrix4(e.matrixWorld),this.intersectsSphere(os)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if($o.x=i.normal.x>0?e.max.x:e.min.x,$o.y=i.normal.y>0?e.max.y:e.min.y,$o.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint($o)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Cf(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Ym(s){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(s.bindBuffer(l,a),u.length===0)s.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let x=u[f];s.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(s.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:r,update:o}}var Yt=class s extends _t{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,d=t/c,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let v=p*d-o;for(let y=0;y<l;y++){let _=y*u-r;g.push(_,-v,0),x.push(0,0,1),m.push(y/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){let y=v+l*p,_=v+l*(p+1),C=v+1+l*(p+1),w=v+1+l*p;f.push(y,_,w),f.push(_,C,w)}this.setIndex(f),this.setAttribute("position",new Ke(g,3)),this.setAttribute("normal",new Ke(x,3)),this.setAttribute("uv",new Ke(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},$m=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Km=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Zm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,e0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,t0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,n0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,i0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,s0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,r0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,o0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,a0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,c0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,l0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,d0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,f0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,p0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,m0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,g0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,x0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,y0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,v0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,M0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,E0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,b0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,T0="gl_FragColor = linearToOutputTexel( gl_FragColor );",S0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,w0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,A0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,R0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,C0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,I0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,P0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,L0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,D0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,N0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,U0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,O0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,F0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,B0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,H0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,k0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,z0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,V0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,G0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,W0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,X0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,q0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Y0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,K0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Z0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,J0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,j0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,eg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ng=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ig=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,og=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ag=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,hg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ug=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,dg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_g=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Eg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,bg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ag=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Ig=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Lg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Dg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ng=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ug=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Og=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Fg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,zg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Vg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Yg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$g=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ex=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,tx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,nx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ox=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ax=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,cx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ux=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,dx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,px=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,mx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_x=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ex=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Sx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$e={alphahash_fragment:$m,alphahash_pars_fragment:Km,alphamap_fragment:Zm,alphamap_pars_fragment:Jm,alphatest_fragment:jm,alphatest_pars_fragment:Qm,aomap_fragment:e0,aomap_pars_fragment:t0,batching_pars_vertex:n0,batching_vertex:i0,begin_vertex:s0,beginnormal_vertex:r0,bsdfs:o0,iridescence_fragment:a0,bumpmap_pars_fragment:c0,clipping_planes_fragment:l0,clipping_planes_pars_fragment:h0,clipping_planes_pars_vertex:u0,clipping_planes_vertex:d0,color_fragment:f0,color_pars_fragment:p0,color_pars_vertex:m0,color_vertex:g0,common:x0,cube_uv_reflection_fragment:_0,defaultnormal_vertex:y0,displacementmap_pars_vertex:v0,displacementmap_vertex:M0,emissivemap_fragment:E0,emissivemap_pars_fragment:b0,colorspace_fragment:T0,colorspace_pars_fragment:S0,envmap_fragment:w0,envmap_common_pars_fragment:A0,envmap_pars_fragment:R0,envmap_pars_vertex:C0,envmap_physical_pars_fragment:k0,envmap_vertex:I0,fog_vertex:P0,fog_pars_vertex:L0,fog_fragment:D0,fog_pars_fragment:N0,gradientmap_pars_fragment:U0,lightmap_pars_fragment:O0,lights_lambert_fragment:F0,lights_lambert_pars_fragment:B0,lights_pars_begin:H0,lights_toon_fragment:z0,lights_toon_pars_fragment:V0,lights_phong_fragment:G0,lights_phong_pars_fragment:W0,lights_physical_fragment:X0,lights_physical_pars_fragment:q0,lights_fragment_begin:Y0,lights_fragment_maps:$0,lights_fragment_end:K0,logdepthbuf_fragment:Z0,logdepthbuf_pars_fragment:J0,logdepthbuf_pars_vertex:j0,logdepthbuf_vertex:Q0,map_fragment:eg,map_pars_fragment:tg,map_particle_fragment:ng,map_particle_pars_fragment:ig,metalnessmap_fragment:sg,metalnessmap_pars_fragment:rg,morphinstance_vertex:og,morphcolor_vertex:ag,morphnormal_vertex:cg,morphtarget_pars_vertex:lg,morphtarget_vertex:hg,normal_fragment_begin:ug,normal_fragment_maps:dg,normal_pars_fragment:fg,normal_pars_vertex:pg,normal_vertex:mg,normalmap_pars_fragment:gg,clearcoat_normal_fragment_begin:xg,clearcoat_normal_fragment_maps:_g,clearcoat_pars_fragment:yg,iridescence_pars_fragment:vg,opaque_fragment:Mg,packing:Eg,premultiplied_alpha_fragment:bg,project_vertex:Tg,dithering_fragment:Sg,dithering_pars_fragment:wg,roughnessmap_fragment:Ag,roughnessmap_pars_fragment:Rg,shadowmap_pars_fragment:Cg,shadowmap_pars_vertex:Ig,shadowmap_vertex:Pg,shadowmask_pars_fragment:Lg,skinbase_vertex:Dg,skinning_pars_vertex:Ng,skinning_vertex:Ug,skinnormal_vertex:Og,specularmap_fragment:Fg,specularmap_pars_fragment:Bg,tonemapping_fragment:Hg,tonemapping_pars_fragment:kg,transmission_fragment:zg,transmission_pars_fragment:Vg,uv_pars_fragment:Gg,uv_pars_vertex:Wg,uv_vertex:Xg,worldpos_vertex:qg,background_vert:Yg,background_frag:$g,backgroundCube_vert:Kg,backgroundCube_frag:Zg,cube_vert:Jg,cube_frag:jg,depth_vert:Qg,depth_frag:ex,distanceRGBA_vert:tx,distanceRGBA_frag:nx,equirect_vert:ix,equirect_frag:sx,linedashed_vert:rx,linedashed_frag:ox,meshbasic_vert:ax,meshbasic_frag:cx,meshlambert_vert:lx,meshlambert_frag:hx,meshmatcap_vert:ux,meshmatcap_frag:dx,meshnormal_vert:fx,meshnormal_frag:px,meshphong_vert:mx,meshphong_frag:gx,meshphysical_vert:xx,meshphysical_frag:_x,meshtoon_vert:yx,meshtoon_frag:vx,points_vert:Mx,points_frag:Ex,shadow_vert:bx,shadow_frag:Tx,sprite_vert:Sx,sprite_frag:wx},fe={common:{diffuse:{value:new le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new j(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new le(16777215)},opacity:{value:1},center:{value:new j(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},Jn={basic:{uniforms:rn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:rn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new le(0)}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:rn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new le(0)},specular:{value:new le(1118481)},shininess:{value:30}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:rn([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:rn([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new le(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:rn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:rn([fe.points,fe.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:rn([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:rn([fe.common,fe.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:rn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:rn([fe.sprite,fe.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distanceRGBA:{uniforms:rn([fe.common,fe.displacementmap,{referencePosition:{value:new S},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distanceRGBA_vert,fragmentShader:$e.distanceRGBA_frag},shadow:{uniforms:rn([fe.lights,fe.fog,{color:{value:new le(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};Jn.physical={uniforms:rn([Jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new j(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new j},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new le(0)},specularColor:{value:new le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new j},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};var Ko={r:0,b:0,g:0},as=new ei,Ax=new Ve;function Rx(s,e,t,n,i,r,o){let a=new le(0),c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?t:e).get(y)),y}function x(v){let y=!1,_=g(v);_===null?p(a,c):_&&_.isColor&&(p(_,1),y=!0);let C=s.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(v,y){let _=g(y);_&&(_.isCubeTexture||_.mapping===$a)?(h===void 0&&(h=new q(new vt(1,1,1),new St({name:"BackgroundCubeMaterial",uniforms:dr(Jn.backgroundCube.uniforms),vertexShader:Jn.backgroundCube.vertexShader,fragmentShader:Jn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),as.copy(y.backgroundRotation),as.x*=-1,as.y*=-1,as.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ax.makeRotationFromEuler(as)),h.material.toneMapped=Ze.getTransfer(_.colorSpace)!==ft,(u!==_||d!==_.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=s.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new q(new Yt(2,2),new St({name:"BackgroundMaterial",uniforms:dr(Jn.background.uniforms),vertexShader:Jn.background.vertexShader,fragmentShader:Jn.background.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(_.colorSpace)!==ft,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=_,d=_.version,f=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,y){v.getRGB(Ko,Rf(s)),n.buffers.color.setClear(Ko.r,Ko.g,Ko.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),c=y,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(a,c)},render:x,addToRenderList:m}}function Cx(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(M,L,H,D,G){let J=!1,U=u(D,H,L);r!==U&&(r=U,l(r.object)),J=f(M,D,H,G),J&&g(M,D,H,G),G!==null&&e.update(G,s.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,_(M,L,H,D),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return s.createVertexArray()}function l(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,L,H){let D=H.wireframe===!0,G=n[M.id];G===void 0&&(G={},n[M.id]=G);let J=G[L.id];J===void 0&&(J={},G[L.id]=J);let U=J[D];return U===void 0&&(U=d(c()),J[D]=U),U}function d(M){let L=[],H=[],D=[];for(let G=0;G<t;G++)L[G]=0,H[G]=0,D[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:H,attributeDivisors:D,object:M,attributes:{},index:null}}function f(M,L,H,D){let G=r.attributes,J=L.attributes,U=0,X=H.getAttributes();for(let W in X)if(X[W].location>=0){let me=G[W],we=J[W];if(we===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(we=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(we=M.instanceColor)),me===void 0||me.attribute!==we||we&&me.data!==we.data)return!0;U++}return r.attributesNum!==U||r.index!==D}function g(M,L,H,D){let G={},J=L.attributes,U=0,X=H.getAttributes();for(let W in X)if(X[W].location>=0){let me=J[W];me===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(me=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(me=M.instanceColor));let we={};we.attribute=me,me&&me.data&&(we.data=me.data),G[W]=we,U++}r.attributes=G,r.attributesNum=U,r.index=D}function x(){let M=r.newAttributes;for(let L=0,H=M.length;L<H;L++)M[L]=0}function m(M){p(M,0)}function p(M,L){let H=r.newAttributes,D=r.enabledAttributes,G=r.attributeDivisors;H[M]=1,D[M]===0&&(s.enableVertexAttribArray(M),D[M]=1),G[M]!==L&&(s.vertexAttribDivisor(M,L),G[M]=L)}function v(){let M=r.newAttributes,L=r.enabledAttributes;for(let H=0,D=L.length;H<D;H++)L[H]!==M[H]&&(s.disableVertexAttribArray(H),L[H]=0)}function y(M,L,H,D,G,J,U){U===!0?s.vertexAttribIPointer(M,L,H,G,J):s.vertexAttribPointer(M,L,H,D,G,J)}function _(M,L,H,D){x();let G=D.attributes,J=H.getAttributes(),U=L.defaultAttributeValues;for(let X in J){let W=J[X];if(W.location>=0){let ie=G[X];if(ie===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(ie=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(ie=M.instanceColor)),ie!==void 0){let me=ie.normalized,we=ie.itemSize,Ge=e.get(ie);if(Ge===void 0)continue;let ht=Ge.buffer,Z=Ge.type,oe=Ge.bytesPerElement,Re=Z===s.INT||Z===s.UNSIGNED_INT||ie.gpuType===Nh;if(ie.isInterleavedBufferAttribute){let ue=ie.data,Ue=ue.stride,ke=ie.offset;if(ue.isInstancedInterleavedBuffer){for(let Be=0;Be<W.locationSize;Be++)p(W.location+Be,ue.meshPerAttribute);M.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Be=0;Be<W.locationSize;Be++)m(W.location+Be);s.bindBuffer(s.ARRAY_BUFFER,ht);for(let Be=0;Be<W.locationSize;Be++)y(W.location+Be,we/W.locationSize,Z,me,Ue*oe,(ke+we/W.locationSize*Be)*oe,Re)}else{if(ie.isInstancedBufferAttribute){for(let ue=0;ue<W.locationSize;ue++)p(W.location+ue,ie.meshPerAttribute);M.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ue=0;ue<W.locationSize;ue++)m(W.location+ue);s.bindBuffer(s.ARRAY_BUFFER,ht);for(let ue=0;ue<W.locationSize;ue++)y(W.location+ue,we/W.locationSize,Z,me,we*oe,we/W.locationSize*ue*oe,Re)}}else if(U!==void 0){let me=U[X];if(me!==void 0)switch(me.length){case 2:s.vertexAttrib2fv(W.location,me);break;case 3:s.vertexAttrib3fv(W.location,me);break;case 4:s.vertexAttrib4fv(W.location,me);break;default:s.vertexAttrib1fv(W.location,me)}}}}v()}function C(){I();for(let M in n){let L=n[M];for(let H in L){let D=L[H];for(let G in D)h(D[G].object),delete D[G];delete L[H]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;let L=n[M.id];for(let H in L){let D=L[H];for(let G in D)h(D[G].object),delete D[G];delete L[H]}delete n[M.id]}function R(M){for(let L in n){let H=n[L];if(H[M.id]===void 0)continue;let D=H[M.id];for(let G in D)h(D[G].object),delete D[G];delete H[M.id]}}function I(){b(),o=!0,r!==i&&(r=i,l(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function Ix(s,e,t){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Px(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(R){return!(R!==Cn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let I=R===Xn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==_i&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Wn&&!I)}function c(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,w=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:C,maxSamples:w}}function Lx(s){let e=this,t=null,n=0,i=!1,r=!1,o=new fi,a=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{let v=r?0:n,y=v*4,_=p.clippingState||null;c.value=_,_=h(g,d,y,f);for(let C=0;C!==y;++C)_[C]=t[C];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let p=f+x*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,_=f;y!==x;++y,_+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Dx(s){let e=new WeakMap;function t(o,a){return a===xl?o.mapping=sr:a===_l&&(o.mapping=rr),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===xl||a===_l)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Zl(c.height);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Hi=class extends ba{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Js=4,pd=[.125,.215,.35,.446,.526,.582],us=20,Yc=new Hi,md=new le,$c=null,Kc=0,Zc=0,Jc=!1,ls=(1+Math.sqrt(5))/2,Vs=1/ls,gd=[new S(-ls,Vs,0),new S(ls,Vs,0),new S(-Vs,0,ls),new S(Vs,0,ls),new S(0,ls,-Vs),new S(0,ls,Vs),new S(-1,1,-1),new S(1,1,-1),new S(-1,1,1),new S(1,1,1)],fr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){$c=this._renderer.getRenderTarget(),Kc=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel(),Jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_d(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget($c,Kc,Zc),this._renderer.xr.enabled=Jc,e.scissorTest=!1,Zo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===sr||e.mapping===rr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$c=this._renderer.getRenderTarget(),Kc=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel(),Jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:un,minFilter:un,generateMipmaps:!1,type:Xn,format:Cn,colorSpace:tn,depthBuffer:!1},i=xd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xd(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Nx(r)),this._blurMaterial=Ux(r,e,t)}return i}_compileMaterial(e){let t=new q(this._lodPlanes[0],e);this._renderer.compile(t,Yc)}_sceneToCubeUV(e,t,n,i){let a=new zt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(md),h.toneMapping=Bi,h.autoClear=!1;let f=new xt({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),g=new q(new vt,f),x=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,x=!0):(f.color.copy(md),x=!0);for(let p=0;p<6;p++){let v=p%3;v===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):v===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let y=this._cubeSize;Zo(i,v*y,p>2?y:0,y,y),h.setRenderTarget(i),x&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===sr||e.mapping===rr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=yd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_d());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new q(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Zo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Yc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=gd[(i-r-1)%gd.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new q(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*us-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):us;m>us&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${us}`);let p=[],v=0;for(let R=0;R<us;++R){let I=R/x,b=Math.exp(-I*I/2);p.push(b),R===0?v+=b:R<m&&(v+=2*b)}for(let R=0;R<p.length;R++)p[R]=p[R]/v;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;let _=this._sizeLods[i],C=3*_*(i>y-Js?i-y+Js:0),w=4*(this._cubeSize-_);Zo(t,C,w,3*_,2*_),c.setRenderTarget(t),c.render(u,Yc)}};function Nx(s){let e=[],t=[],n=[],i=s,r=s-Js+1+pd.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let c=1/a;o>s-Js?c=pd[o-s+Js-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,m=2,p=1,v=new Float32Array(x*g*f),y=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let w=0;w<f;w++){let R=w%3*2/3-1,I=w>2?0:-1,b=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];v.set(b,x*g*w),y.set(d,m*g*w);let M=[w,w,w,w,w,w];_.set(M,p*g*w)}let C=new _t;C.setAttribute("position",new Tt(v,x)),C.setAttribute("uv",new Tt(y,m)),C.setAttribute("faceIndex",new Tt(_,p)),e.push(C),i>Js&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function xd(s,e,t){let n=new on(s,e,t);return n.texture.mapping=$a,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zo(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Ux(s,e,t){let n=new Float32Array(us),i=new S(0,1,0);return new St({name:"SphericalGaussianBlur",defines:{n:us,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Xh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function _d(){return new St({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function yd(){return new St({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Xh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ox(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===xl||c===_l,h=c===sr||c===rr;if(l||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new fr(s)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new fr(s)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Fx(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&qr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Bx(s,e,t,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let g in d)e.update(d[g],s.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let x=f[g];for(let m=0,p=x.length;m<p;m++)e.update(x[m],s.ARRAY_BUFFER)}}function l(u){let d=[],f=u.index,g=u.attributes.position,x=0;if(f!==null){let v=f.array;x=f.version;for(let y=0,_=v.length;y<_;y+=3){let C=v[y+0],w=v[y+1],R=v[y+2];d.push(C,w,w,R,R,C)}}else if(g!==void 0){let v=g.array;x=g.version;for(let y=0,_=v.length/3-1;y<_;y+=3){let C=y+0,w=y+1,R=y+2;d.push(C,w,w,R,R,C)}}else return;let m=new(wf(d)?Ea:Ma)(d,1);m.version=x;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Hx(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function l(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,x){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let p=0;for(let v=0;v<g;v++)p+=f[v]*x[v];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function kx(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function zx(s,e,t){let n=new WeakMap,i=new at;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let b=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],y=0;f===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let _=a.attributes.position.count*y,C=1;_>e.maxTextureSize&&(C=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let w=new Float32Array(_*C*4*u),R=new ya(w,_,C,u);R.type=Wn,R.needsUpdate=!0;let I=y*4;for(let M=0;M<u;M++){let L=m[M],H=p[M],D=v[M],G=_*C*4*M;for(let J=0;J<L.count;J++){let U=J*I;f===!0&&(i.fromBufferAttribute(L,J),w[G+U+0]=i.x,w[G+U+1]=i.y,w[G+U+2]=i.z,w[G+U+3]=0),g===!0&&(i.fromBufferAttribute(H,J),w[G+U+4]=i.x,w[G+U+5]=i.y,w[G+U+6]=i.z,w[G+U+7]=0),x===!0&&(i.fromBufferAttribute(D,J),w[G+U+8]=i.x,w[G+U+9]=i.y,w[G+U+10]=i.z,w[G+U+11]=D.itemSize===4?i.w:1)}}d={count:u,texture:R,size:new j(_,C)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Vx(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var Sa=class extends qt{constructor(e,t,n,i,r,o,a,c,l,h=er){if(h!==er&&h!==ar)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===er&&(n=ds),n===void 0&&h===ar&&(n=or),super(null,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Qt,this.minFilter=c!==void 0?c:Qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},If=new qt,vd=new Sa(1,1),Pf=new ya,Lf=new $l,Df=new Ta,Md=[],Ed=[],bd=new Float32Array(16),Td=new Float32Array(9),Sd=new Float32Array(4);function Sr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=Md[i];if(r===void 0&&(r=new Float32Array(i),Md[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Vt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Gt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Ja(s,e){let t=Ed[e];t===void 0&&(t=new Int32Array(e),Ed[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Gx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Wx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;s.uniform2fv(this.addr,e),Gt(t,e)}}function Xx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;s.uniform3fv(this.addr,e),Gt(t,e)}}function qx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;s.uniform4fv(this.addr,e),Gt(t,e)}}function Yx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;Sd.set(n),s.uniformMatrix2fv(this.addr,!1,Sd),Gt(t,n)}}function $x(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;Td.set(n),s.uniformMatrix3fv(this.addr,!1,Td),Gt(t,n)}}function Kx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;bd.set(n),s.uniformMatrix4fv(this.addr,!1,bd),Gt(t,n)}}function Zx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Jx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;s.uniform2iv(this.addr,e),Gt(t,e)}}function jx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;s.uniform3iv(this.addr,e),Gt(t,e)}}function Qx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;s.uniform4iv(this.addr,e),Gt(t,e)}}function e_(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function t_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;s.uniform2uiv(this.addr,e),Gt(t,e)}}function n_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;s.uniform3uiv(this.addr,e),Gt(t,e)}}function i_(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;s.uniform4uiv(this.addr,e),Gt(t,e)}}function s_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(vd.compareFunction=Tf,r=vd):r=If,t.setTexture2D(e||r,i)}function r_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Lf,i)}function o_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Df,i)}function a_(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Pf,i)}function c_(s){switch(s){case 5126:return Gx;case 35664:return Wx;case 35665:return Xx;case 35666:return qx;case 35674:return Yx;case 35675:return $x;case 35676:return Kx;case 5124:case 35670:return Zx;case 35667:case 35671:return Jx;case 35668:case 35672:return jx;case 35669:case 35673:return Qx;case 5125:return e_;case 36294:return t_;case 36295:return n_;case 36296:return i_;case 35678:case 36198:case 36298:case 36306:case 35682:return s_;case 35679:case 36299:case 36307:return r_;case 35680:case 36300:case 36308:case 36293:return o_;case 36289:case 36303:case 36311:case 36292:return a_}}function l_(s,e){s.uniform1fv(this.addr,e)}function h_(s,e){let t=Sr(e,this.size,2);s.uniform2fv(this.addr,t)}function u_(s,e){let t=Sr(e,this.size,3);s.uniform3fv(this.addr,t)}function d_(s,e){let t=Sr(e,this.size,4);s.uniform4fv(this.addr,t)}function f_(s,e){let t=Sr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function p_(s,e){let t=Sr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function m_(s,e){let t=Sr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function g_(s,e){s.uniform1iv(this.addr,e)}function x_(s,e){s.uniform2iv(this.addr,e)}function __(s,e){s.uniform3iv(this.addr,e)}function y_(s,e){s.uniform4iv(this.addr,e)}function v_(s,e){s.uniform1uiv(this.addr,e)}function M_(s,e){s.uniform2uiv(this.addr,e)}function E_(s,e){s.uniform3uiv(this.addr,e)}function b_(s,e){s.uniform4uiv(this.addr,e)}function T_(s,e,t){let n=this.cache,i=e.length,r=Ja(t,i);Vt(n,r)||(s.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||If,r[o])}function S_(s,e,t){let n=this.cache,i=e.length,r=Ja(t,i);Vt(n,r)||(s.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Lf,r[o])}function w_(s,e,t){let n=this.cache,i=e.length,r=Ja(t,i);Vt(n,r)||(s.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Df,r[o])}function A_(s,e,t){let n=this.cache,i=e.length,r=Ja(t,i);Vt(n,r)||(s.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Pf,r[o])}function R_(s){switch(s){case 5126:return l_;case 35664:return h_;case 35665:return u_;case 35666:return d_;case 35674:return f_;case 35675:return p_;case 35676:return m_;case 5124:case 35670:return g_;case 35667:case 35671:return x_;case 35668:case 35672:return __;case 35669:case 35673:return y_;case 5125:return v_;case 36294:return M_;case 36295:return E_;case 36296:return b_;case 35678:case 36198:case 36298:case 36306:case 35682:return T_;case 35679:case 36299:case 36307:return S_;case 35680:case 36300:case 36308:case 36293:return w_;case 36289:case 36303:case 36311:case 36292:return A_}}var Jl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=c_(t.type)}},jl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=R_(t.type)}},Ql=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},jc=/(\w+)(\])?(\[|\.)?/g;function wd(s,e){s.seq.push(e),s.map[e.id]=e}function C_(s,e,t){let n=s.name,i=n.length;for(jc.lastIndex=0;;){let r=jc.exec(n),o=jc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){wd(t,l===void 0?new Jl(a,s,e):new jl(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new Ql(a),wd(t,u)),t=u}}}var nr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);C_(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function Ad(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var I_=37297,P_=0;function L_(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Rd=new qe;function D_(s){Ze._getMatrix(Rd,Ze.workingColorSpace,s);let e=`mat3( ${Rd.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(s)){case Za:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Cd(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+L_(s.getShaderSource(e),o)}else return i}function N_(s,e){let t=D_(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function U_(s,e){let t;switch(e){case Rh:t="Linear";break;case Ch:t="Reinhard";break;case Ih:t="Cineon";break;case go:t="ACESFilmic";break;case Ph:t="AgX";break;case Lh:t="Neutral";break;case Zp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Jo=new S;function O_(){Ze.getLuminanceCoefficients(Jo);let s=Jo.x.toFixed(4),e=Jo.y.toFixed(4),t=Jo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function F_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yr).join(`
`)}function B_(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function H_(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Yr(s){return s!==""}function Id(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Pd(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var k_=/^[ \t]*#include +<([\w\d./]+)>/gm;function eh(s){return s.replace(k_,V_)}var z_=new Map;function V_(s,e){let t=$e[e];if(t===void 0){let n=z_.get(e);if(n!==void 0)t=$e[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return eh(t)}var G_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ld(s){return s.replace(G_,W_)}function W_(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Dd(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function X_(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===hf?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Ah?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===di&&(e="SHADOWMAP_TYPE_VSM"),e}function q_(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case sr:case rr:e="ENVMAP_TYPE_CUBE";break;case $a:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Y_(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case rr:e="ENVMAP_MODE_REFRACTION";break}return e}function $_(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case uf:e="ENVMAP_BLENDING_MULTIPLY";break;case $p:e="ENVMAP_BLENDING_MIX";break;case Kp:e="ENVMAP_BLENDING_ADD";break}return e}function K_(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Z_(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=X_(t),l=q_(t),h=Y_(t),u=$_(t),d=K_(t),f=F_(t),g=B_(r),x=i.createProgram(),m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Yr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Yr).join(`
`),p.length>0&&(p+=`
`)):(m=[Dd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yr).join(`
`),p=[Dd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bi?"#define TONE_MAPPING":"",t.toneMapping!==Bi?$e.tonemapping_pars_fragment:"",t.toneMapping!==Bi?U_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,N_("linearToOutputTexel",t.outputColorSpace),O_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Yr).join(`
`)),o=eh(o),o=Id(o,t),o=Pd(o,t),a=eh(a),a=Id(a,t),a=Pd(a,t),o=Ld(o),a=Ld(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===qu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===qu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=v+m+o,_=v+p+a,C=Ad(i,i.VERTEX_SHADER,y),w=Ad(i,i.FRAGMENT_SHADER,_);i.attachShader(x,C),i.attachShader(x,w),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function R(L){if(s.debug.checkShaderErrors){let H=i.getProgramInfoLog(x).trim(),D=i.getShaderInfoLog(C).trim(),G=i.getShaderInfoLog(w).trim(),J=!0,U=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(J=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,C,w);else{let X=Cd(i,C,"vertex"),W=Cd(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+H+`
`+X+`
`+W)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(D===""||G==="")&&(U=!1);U&&(L.diagnostics={runnable:J,programLog:H,vertexShader:{log:D,prefix:m},fragmentShader:{log:G,prefix:p}})}i.deleteShader(C),i.deleteShader(w),I=new nr(i,x),b=H_(i,x)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(x,I_)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=P_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=w,this}var J_=0,th=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new nh(e),t.set(e,n)),n}},nh=class{constructor(e){this.id=J_++,this.code=e,this.usedTimes=0}};function j_(s,e,t,n,i,r,o){let a=new va,c=new th,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,M,L,H,D){let G=H.fog,J=D.geometry,U=b.isMeshStandardMaterial?H.environment:null,X=(b.isMeshStandardMaterial?t:e).get(b.envMap||U),W=X&&X.mapping===$a?X.image.height:null,ie=g[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let me=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,we=me!==void 0?me.length:0,Ge=0;J.morphAttributes.position!==void 0&&(Ge=1),J.morphAttributes.normal!==void 0&&(Ge=2),J.morphAttributes.color!==void 0&&(Ge=3);let ht,Z,oe,Re;if(ie){let mt=Jn[ie];ht=mt.vertexShader,Z=mt.fragmentShader}else ht=b.vertexShader,Z=b.fragmentShader,c.update(b),oe=c.getVertexShaderID(b),Re=c.getFragmentShaderID(b);let ue=s.getRenderTarget(),Ue=s.state.buffers.depth.getReversed(),ke=D.isInstancedMesh===!0,Be=D.isBatchedMesh===!0,nt=!!b.map,ee=!!b.matcap,re=!!X,P=!!b.aoMap,De=!!b.lightMap,ne=!!b.bumpMap,be=!!b.normalMap,de=!!b.displacementMap,Oe=!!b.emissiveMap,Me=!!b.metalnessMap,A=!!b.roughnessMap,E=b.anisotropy>0,B=b.clearcoat>0,$=b.dispersion>0,te=b.iridescence>0,K=b.sheen>0,Ce=b.transmission>0,pe=E&&!!b.anisotropyMap,Ee=B&&!!b.clearcoatMap,Qe=B&&!!b.clearcoatNormalMap,se=B&&!!b.clearcoatRoughnessMap,Te=te&&!!b.iridescenceMap,Fe=te&&!!b.iridescenceThicknessMap,He=K&&!!b.sheenColorMap,Se=K&&!!b.sheenRoughnessMap,tt=!!b.specularMap,Ye=!!b.specularColorMap,Et=!!b.specularIntensityMap,N=Ce&&!!b.transmissionMap,ge=Ce&&!!b.thicknessMap,Y=!!b.gradientMap,Q=!!b.alphaMap,ye=b.alphaTest>0,xe=!!b.alphaHash,We=!!b.extensions,Ut=Bi;b.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(Ut=s.toneMapping);let Zt={shaderID:ie,shaderType:b.type,shaderName:b.name,vertexShader:ht,fragmentShader:Z,defines:b.defines,customVertexShaderID:oe,customFragmentShaderID:Re,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Be,batchingColor:Be&&D._colorsTexture!==null,instancing:ke,instancingColor:ke&&D.instanceColor!==null,instancingMorph:ke&&D.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ue===null?s.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:tn,alphaToCoverage:!!b.alphaToCoverage,map:nt,matcap:ee,envMap:re,envMapMode:re&&X.mapping,envMapCubeUVHeight:W,aoMap:P,lightMap:De,bumpMap:ne,normalMap:be,displacementMap:d&&de,emissiveMap:Oe,normalMapObjectSpace:be&&b.normalMapType===nm,normalMapTangentSpace:be&&b.normalMapType===bf,metalnessMap:Me,roughnessMap:A,anisotropy:E,anisotropyMap:pe,clearcoat:B,clearcoatMap:Ee,clearcoatNormalMap:Qe,clearcoatRoughnessMap:se,dispersion:$,iridescence:te,iridescenceMap:Te,iridescenceThicknessMap:Fe,sheen:K,sheenColorMap:He,sheenRoughnessMap:Se,specularMap:tt,specularColorMap:Ye,specularIntensityMap:Et,transmission:Ce,transmissionMap:N,thicknessMap:ge,gradientMap:Y,opaque:b.transparent===!1&&b.blending===Qs&&b.alphaToCoverage===!1,alphaMap:Q,alphaTest:ye,alphaHash:xe,combine:b.combine,mapUv:nt&&x(b.map.channel),aoMapUv:P&&x(b.aoMap.channel),lightMapUv:De&&x(b.lightMap.channel),bumpMapUv:ne&&x(b.bumpMap.channel),normalMapUv:be&&x(b.normalMap.channel),displacementMapUv:de&&x(b.displacementMap.channel),emissiveMapUv:Oe&&x(b.emissiveMap.channel),metalnessMapUv:Me&&x(b.metalnessMap.channel),roughnessMapUv:A&&x(b.roughnessMap.channel),anisotropyMapUv:pe&&x(b.anisotropyMap.channel),clearcoatMapUv:Ee&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:Qe&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:Fe&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:He&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Se&&x(b.sheenRoughnessMap.channel),specularMapUv:tt&&x(b.specularMap.channel),specularColorMapUv:Ye&&x(b.specularColorMap.channel),specularIntensityMapUv:Et&&x(b.specularIntensityMap.channel),transmissionMapUv:N&&x(b.transmissionMap.channel),thicknessMapUv:ge&&x(b.thicknessMap.channel),alphaMapUv:Q&&x(b.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(be||E),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!J.attributes.uv&&(nt||Q),fog:!!G,useFog:b.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ue,skinning:D.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Ge,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ut,decodeVideoTexture:nt&&b.map.isVideoTexture===!0&&Ze.getTransfer(b.map.colorSpace)===ft,decodeVideoTextureEmissive:Oe&&b.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(b.emissiveMap.colorSpace)===ft,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Dt,flipSided:b.side===Xt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:We&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&b.extensions.multiDraw===!0||Be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Zt.vertexUv1s=l.has(1),Zt.vertexUv2s=l.has(2),Zt.vertexUv3s=l.has(3),l.clear(),Zt}function p(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let L in b.defines)M.push(L),M.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(v(M,b),y(M,b),M.push(s.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function v(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function y(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){let M=g[b.type],L;if(M){let H=Jn[M];L=qi.clone(H.uniforms)}else L=b.uniforms;return L}function C(b,M){let L;for(let H=0,D=h.length;H<D;H++){let G=h[H];if(G.cacheKey===M){L=G,++L.usedTimes;break}}return L===void 0&&(L=new Z_(s,M,b,r),h.push(L)),L}function w(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function R(b){c.remove(b)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:C,releaseProgram:w,releaseShaderCache:R,programs:h,dispose:I}}function Q_(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,c){s.get(o)[a]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function ey(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Nd(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Ud(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,g,x,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),e++,p}function a(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||ey),n.length>1&&n.sort(d||Nd),i.length>1&&i.sort(d||Nd)}function h(){for(let u=e,d=s.length;u<d;u++){let f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function ty(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new Ud,s.set(n,[o])):i>=r.length?(o=new Ud,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function ny(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new S,color:new le};break;case"SpotLight":t={position:new S,direction:new S,color:new le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new S,color:new le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new S,skyColor:new le,groundColor:new le};break;case"RectAreaLight":t={color:new le,position:new S,halfWidth:new S,halfHeight:new S};break}return s[e.id]=t,t}}}function iy(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var sy=0;function ry(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function oy(s){let e=new ny,t=iy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new S);let i=new S,r=new Ve,o=new Ve;function a(l){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,v=0,y=0,_=0,C=0,w=0,R=0;l.sort(ry);for(let b=0,M=l.length;b<M;b++){let L=l[b],H=L.color,D=L.intensity,G=L.distance,J=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=H.r*D,u+=H.g*D,d+=H.b*D;else if(L.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(L.sh.coefficients[U],D);R++}else if(L.isDirectionalLight){let U=e.get(L);if(U.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let X=L.shadow,W=t.get(L);W.shadowIntensity=X.intensity,W.shadowBias=X.bias,W.shadowNormalBias=X.normalBias,W.shadowRadius=X.radius,W.shadowMapSize=X.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=J,n.directionalShadowMatrix[f]=L.shadow.matrix,v++}n.directional[f]=U,f++}else if(L.isSpotLight){let U=e.get(L);U.position.setFromMatrixPosition(L.matrixWorld),U.color.copy(H).multiplyScalar(D),U.distance=G,U.coneCos=Math.cos(L.angle),U.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),U.decay=L.decay,n.spot[x]=U;let X=L.shadow;if(L.map&&(n.spotLightMap[C]=L.map,C++,X.updateMatrices(L),L.castShadow&&w++),n.spotLightMatrix[x]=X.matrix,L.castShadow){let W=t.get(L);W.shadowIntensity=X.intensity,W.shadowBias=X.bias,W.shadowNormalBias=X.normalBias,W.shadowRadius=X.radius,W.shadowMapSize=X.mapSize,n.spotShadow[x]=W,n.spotShadowMap[x]=J,_++}x++}else if(L.isRectAreaLight){let U=e.get(L);U.color.copy(H).multiplyScalar(D),U.halfWidth.set(L.width*.5,0,0),U.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=U,m++}else if(L.isPointLight){let U=e.get(L);if(U.color.copy(L.color).multiplyScalar(L.intensity),U.distance=L.distance,U.decay=L.decay,L.castShadow){let X=L.shadow,W=t.get(L);W.shadowIntensity=X.intensity,W.shadowBias=X.bias,W.shadowNormalBias=X.normalBias,W.shadowRadius=X.radius,W.shadowMapSize=X.mapSize,W.shadowCameraNear=X.camera.near,W.shadowCameraFar=X.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=J,n.pointShadowMatrix[g]=L.shadow.matrix,y++}n.point[g]=U,g++}else if(L.isHemisphereLight){let U=e.get(L);U.skyColor.copy(L.color).multiplyScalar(D),U.groundColor.copy(L.groundColor).multiplyScalar(D),n.hemi[p]=U,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==x||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==v||I.numPointShadows!==y||I.numSpotShadows!==_||I.numSpotMaps!==C||I.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+C-w,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,I.directionalLength=f,I.pointLength=g,I.spotLength=x,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=v,I.numPointShadows=y,I.numSpotShadows=_,I.numSpotMaps=C,I.numLightProbes=R,n.version=sy++)}function c(l,h){let u=0,d=0,f=0,g=0,x=0,m=h.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){let y=l[p];if(y.isDirectionalLight){let _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),u++}else if(y.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),f++}else if(y.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let _=n.point[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){let _=n.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function Od(s){let e=new oy(s),t=[],n=[];function i(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function ay(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new Od(s),e.set(i,[a])):r>=o.length?(a=new Od(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var ih=class extends fn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=em,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},sh=class extends fn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},cy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ly=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function hy(s,e,t){let n=new so,i=new j,r=new j,o=new at,a=new ih({depthPacking:tm}),c=new sh,l={},h=t.maxTextureSize,u={[Pn]:Xt,[Xt]:Pn,[Dt]:Dt},d=new St({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new j},radius:{value:4}},vertexShader:cy,fragmentShader:ly}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new _t;g.setAttribute("position",new Tt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new q(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hf;let p=this.type;this.render=function(w,R,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let b=s.getRenderTarget(),M=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),H=s.state;H.setBlending(Qn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let D=p!==di&&this.type===di,G=p===di&&this.type!==di;for(let J=0,U=w.length;J<U;J++){let X=w[J],W=X.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);let ie=W.getFrameExtents();if(i.multiply(ie),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ie.x),i.x=r.x*ie.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ie.y),i.y=r.y*ie.y,W.mapSize.y=r.y)),W.map===null||D===!0||G===!0){let we=this.type!==di?{minFilter:Qt,magFilter:Qt}:{};W.map!==null&&W.map.dispose(),W.map=new on(i.x,i.y,we),W.map.texture.name=X.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();let me=W.getViewportCount();for(let we=0;we<me;we++){let Ge=W.getViewport(we);o.set(r.x*Ge.x,r.y*Ge.y,r.x*Ge.z,r.y*Ge.w),H.viewport(o),W.updateMatrices(X,we),n=W.getFrustum(),_(R,I,W.camera,X,this.type)}W.isPointLightShadow!==!0&&this.type===di&&v(W,I),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(b,M,L)};function v(w,R){let I=e.update(x);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new on(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(R,null,I,d,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(R,null,I,f,x,null)}function y(w,R,I,b){let M=null,L=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(L!==void 0)M=L;else if(M=I.isPointLight===!0?c:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let H=M.uuid,D=R.uuid,G=l[H];G===void 0&&(G={},l[H]=G);let J=G[D];J===void 0&&(J=M.clone(),G[D]=J,R.addEventListener("dispose",C)),M=J}if(M.visible=R.visible,M.wireframe=R.wireframe,b===di?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:u[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let H=s.properties.get(M);H.light=I}return M}function _(w,R,I,b,M){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===di)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);let D=e.update(w),G=w.material;if(Array.isArray(G)){let J=D.groups;for(let U=0,X=J.length;U<X;U++){let W=J[U],ie=G[W.materialIndex];if(ie&&ie.visible){let me=y(w,ie,b,M);w.onBeforeShadow(s,w,R,I,D,me,W),s.renderBufferDirect(I,null,D,me,w,W),w.onAfterShadow(s,w,R,I,D,me,W)}}}else if(G.visible){let J=y(w,G,b,M);w.onBeforeShadow(s,w,R,I,D,J,null),s.renderBufferDirect(I,null,D,J,w,null),w.onAfterShadow(s,w,R,I,D,J,null)}}let H=w.children;for(let D=0,G=H.length;D<G;D++)_(H[D],R,I,b,M)}function C(w){w.target.removeEventListener("dispose",C);for(let I in l){let b=l[I],M=w.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var uy={[hl]:ul,[dl]:ml,[fl]:gl,[ir]:pl,[ul]:hl,[ml]:dl,[gl]:fl,[pl]:ir};function dy(s,e){function t(){let N=!1,ge=new at,Y=null,Q=new at(0,0,0,0);return{setMask:function(ye){Y!==ye&&!N&&(s.colorMask(ye,ye,ye,ye),Y=ye)},setLocked:function(ye){N=ye},setClear:function(ye,xe,We,Ut,Zt){Zt===!0&&(ye*=Ut,xe*=Ut,We*=Ut),ge.set(ye,xe,We,Ut),Q.equals(ge)===!1&&(s.clearColor(ye,xe,We,Ut),Q.copy(ge))},reset:function(){N=!1,Y=null,Q.set(-1,0,0,0)}}}function n(){let N=!1,ge=!1,Y=null,Q=null,ye=null;return{setReversed:function(xe){if(ge!==xe){let We=e.get("EXT_clip_control");ge?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT);let Ut=ye;ye=null,this.setClear(Ut)}ge=xe},getReversed:function(){return ge},setTest:function(xe){xe?ue(s.DEPTH_TEST):Ue(s.DEPTH_TEST)},setMask:function(xe){Y!==xe&&!N&&(s.depthMask(xe),Y=xe)},setFunc:function(xe){if(ge&&(xe=uy[xe]),Q!==xe){switch(xe){case hl:s.depthFunc(s.NEVER);break;case ul:s.depthFunc(s.ALWAYS);break;case dl:s.depthFunc(s.LESS);break;case ir:s.depthFunc(s.LEQUAL);break;case fl:s.depthFunc(s.EQUAL);break;case pl:s.depthFunc(s.GEQUAL);break;case ml:s.depthFunc(s.GREATER);break;case gl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Q=xe}},setLocked:function(xe){N=xe},setClear:function(xe){ye!==xe&&(ge&&(xe=1-xe),s.clearDepth(xe),ye=xe)},reset:function(){N=!1,Y=null,Q=null,ye=null,ge=!1}}}function i(){let N=!1,ge=null,Y=null,Q=null,ye=null,xe=null,We=null,Ut=null,Zt=null;return{setTest:function(mt){N||(mt?ue(s.STENCIL_TEST):Ue(s.STENCIL_TEST))},setMask:function(mt){ge!==mt&&!N&&(s.stencilMask(mt),ge=mt)},setFunc:function(mt,Bn,si){(Y!==mt||Q!==Bn||ye!==si)&&(s.stencilFunc(mt,Bn,si),Y=mt,Q=Bn,ye=si)},setOp:function(mt,Bn,si){(xe!==mt||We!==Bn||Ut!==si)&&(s.stencilOp(mt,Bn,si),xe=mt,We=Bn,Ut=si)},setLocked:function(mt){N=mt},setClear:function(mt){Zt!==mt&&(s.clearStencil(mt),Zt=mt)},reset:function(){N=!1,ge=null,Y=null,Q=null,ye=null,xe=null,We=null,Ut=null,Zt=null}}}let r=new t,o=new n,a=new i,c=new WeakMap,l=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,v=null,y=null,_=null,C=null,w=null,R=new le(0,0,0),I=0,b=!1,M=null,L=null,H=null,D=null,G=null,J=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),U=!1,X=0,W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(W)[1]),U=X>=1):W.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),U=X>=2);let ie=null,me={},we=s.getParameter(s.SCISSOR_BOX),Ge=s.getParameter(s.VIEWPORT),ht=new at().fromArray(we),Z=new at().fromArray(Ge);function oe(N,ge,Y,Q){let ye=new Uint8Array(4),xe=s.createTexture();s.bindTexture(N,xe),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let We=0;We<Y;We++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(ge,0,s.RGBA,1,1,Q,0,s.RGBA,s.UNSIGNED_BYTE,ye):s.texImage2D(ge+We,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ye);return xe}let Re={};Re[s.TEXTURE_2D]=oe(s.TEXTURE_2D,s.TEXTURE_2D,1),Re[s.TEXTURE_CUBE_MAP]=oe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Re[s.TEXTURE_2D_ARRAY]=oe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Re[s.TEXTURE_3D]=oe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ue(s.DEPTH_TEST),o.setFunc(ir),ne(!1),be(zu),ue(s.CULL_FACE),P(Qn);function ue(N){h[N]!==!0&&(s.enable(N),h[N]=!0)}function Ue(N){h[N]!==!1&&(s.disable(N),h[N]=!1)}function ke(N,ge){return u[N]!==ge?(s.bindFramebuffer(N,ge),u[N]=ge,N===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ge),N===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ge),!0):!1}function Be(N,ge){let Y=f,Q=!1;if(N){Y=d.get(ge),Y===void 0&&(Y=[],d.set(ge,Y));let ye=N.textures;if(Y.length!==ye.length||Y[0]!==s.COLOR_ATTACHMENT0){for(let xe=0,We=ye.length;xe<We;xe++)Y[xe]=s.COLOR_ATTACHMENT0+xe;Y.length=ye.length,Q=!0}}else Y[0]!==s.BACK&&(Y[0]=s.BACK,Q=!0);Q&&s.drawBuffers(Y)}function nt(N){return g!==N?(s.useProgram(N),g=N,!0):!1}let ee={[hs]:s.FUNC_ADD,[Pp]:s.FUNC_SUBTRACT,[Lp]:s.FUNC_REVERSE_SUBTRACT};ee[Dp]=s.MIN,ee[Np]=s.MAX;let re={[Up]:s.ZERO,[Op]:s.ONE,[Fp]:s.SRC_COLOR,[cl]:s.SRC_ALPHA,[Gp]:s.SRC_ALPHA_SATURATE,[zp]:s.DST_COLOR,[Hp]:s.DST_ALPHA,[Bp]:s.ONE_MINUS_SRC_COLOR,[ll]:s.ONE_MINUS_SRC_ALPHA,[Vp]:s.ONE_MINUS_DST_COLOR,[kp]:s.ONE_MINUS_DST_ALPHA,[Wp]:s.CONSTANT_COLOR,[Xp]:s.ONE_MINUS_CONSTANT_COLOR,[qp]:s.CONSTANT_ALPHA,[Yp]:s.ONE_MINUS_CONSTANT_ALPHA};function P(N,ge,Y,Q,ye,xe,We,Ut,Zt,mt){if(N===Qn){x===!0&&(Ue(s.BLEND),x=!1);return}if(x===!1&&(ue(s.BLEND),x=!0),N!==Ip){if(N!==m||mt!==b){if((p!==hs||_!==hs)&&(s.blendEquation(s.FUNC_ADD),p=hs,_=hs),mt)switch(N){case Qs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ot:s.blendFunc(s.ONE,s.ONE);break;case Vu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Gu:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Qs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ot:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Vu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Gu:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}v=null,y=null,C=null,w=null,R.set(0,0,0),I=0,m=N,b=mt}return}ye=ye||ge,xe=xe||Y,We=We||Q,(ge!==p||ye!==_)&&(s.blendEquationSeparate(ee[ge],ee[ye]),p=ge,_=ye),(Y!==v||Q!==y||xe!==C||We!==w)&&(s.blendFuncSeparate(re[Y],re[Q],re[xe],re[We]),v=Y,y=Q,C=xe,w=We),(Ut.equals(R)===!1||Zt!==I)&&(s.blendColor(Ut.r,Ut.g,Ut.b,Zt),R.copy(Ut),I=Zt),m=N,b=!1}function De(N,ge){N.side===Dt?Ue(s.CULL_FACE):ue(s.CULL_FACE);let Y=N.side===Xt;ge&&(Y=!Y),ne(Y),N.blending===Qs&&N.transparent===!1?P(Qn):P(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let Q=N.stencilWrite;a.setTest(Q),Q&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Oe(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ue(s.SAMPLE_ALPHA_TO_COVERAGE):Ue(s.SAMPLE_ALPHA_TO_COVERAGE)}function ne(N){M!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),M=N)}function be(N){N!==Rp?(ue(s.CULL_FACE),N!==L&&(N===zu?s.cullFace(s.BACK):N===Cp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ue(s.CULL_FACE),L=N}function de(N){N!==H&&(U&&s.lineWidth(N),H=N)}function Oe(N,ge,Y){N?(ue(s.POLYGON_OFFSET_FILL),(D!==ge||G!==Y)&&(s.polygonOffset(ge,Y),D=ge,G=Y)):Ue(s.POLYGON_OFFSET_FILL)}function Me(N){N?ue(s.SCISSOR_TEST):Ue(s.SCISSOR_TEST)}function A(N){N===void 0&&(N=s.TEXTURE0+J-1),ie!==N&&(s.activeTexture(N),ie=N)}function E(N,ge,Y){Y===void 0&&(ie===null?Y=s.TEXTURE0+J-1:Y=ie);let Q=me[Y];Q===void 0&&(Q={type:void 0,texture:void 0},me[Y]=Q),(Q.type!==N||Q.texture!==ge)&&(ie!==Y&&(s.activeTexture(Y),ie=Y),s.bindTexture(N,ge||Re[N]),Q.type=N,Q.texture=ge)}function B(){let N=me[ie];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function $(){try{s.compressedTexImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{s.compressedTexImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{s.texSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ce(){try{s.texSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pe(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Qe(){try{s.texStorage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function se(){try{s.texStorage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Te(){try{s.texImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Fe(){try{s.texImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function He(N){ht.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),ht.copy(N))}function Se(N){Z.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),Z.copy(N))}function tt(N,ge){let Y=l.get(ge);Y===void 0&&(Y=new WeakMap,l.set(ge,Y));let Q=Y.get(N);Q===void 0&&(Q=s.getUniformBlockIndex(ge,N.name),Y.set(N,Q))}function Ye(N,ge){let Q=l.get(ge).get(N);c.get(ge)!==Q&&(s.uniformBlockBinding(ge,Q,N.__bindingPointIndex),c.set(ge,Q))}function Et(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ie=null,me={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,v=null,y=null,_=null,C=null,w=null,R=new le(0,0,0),I=0,b=!1,M=null,L=null,H=null,D=null,G=null,ht.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ue,disable:Ue,bindFramebuffer:ke,drawBuffers:Be,useProgram:nt,setBlending:P,setMaterial:De,setFlipSided:ne,setCullFace:be,setLineWidth:de,setPolygonOffset:Oe,setScissorTest:Me,activeTexture:A,bindTexture:E,unbindTexture:B,compressedTexImage2D:$,compressedTexImage3D:te,texImage2D:Te,texImage3D:Fe,updateUBOMapping:tt,uniformBlockBinding:Ye,texStorage2D:Qe,texStorage3D:se,texSubImage2D:K,texSubImage3D:Ce,compressedTexSubImage2D:pe,compressedTexSubImage3D:Ee,scissor:He,viewport:Se,reset:Et}}function Fd(s,e,t,n){let i=fy(n);switch(t){case gf:return s*e;case _f:return s*e;case yf:return s*e*2;case Fh:return s*e/i.components*i.byteLength;case Bh:return s*e/i.components*i.byteLength;case vf:return s*e*2/i.components*i.byteLength;case Hh:return s*e*2/i.components*i.byteLength;case xf:return s*e*3/i.components*i.byteLength;case Cn:return s*e*4/i.components*i.byteLength;case kh:return s*e*4/i.components*i.byteLength;case ua:case da:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case fa:case pa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case vl:case El:return Math.max(s,16)*Math.max(e,8)/4;case yl:case Ml:return Math.max(s,8)*Math.max(e,8)/2;case bl:case Tl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Sl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case wl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Al:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Rl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Il:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Pl:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Ll:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Nl:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Ol:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Fl:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Bl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Hl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case ma:case kl:case zl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Mf:case Vl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Gl:case Wl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function fy(s){switch(s){case _i:case ff:return{byteLength:1,components:1};case no:case pf:case Xn:return{byteLength:2,components:1};case Uh:case Oh:return{byteLength:2,components:4};case ds:case Nh:case Wn:return{byteLength:4,components:1};case mf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function py(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new j,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,E){return f?new OffscreenCanvas(A,E):io("canvas")}function x(A,E,B){let $=1,te=Me(A);if((te.width>B||te.height>B)&&($=B/Math.max(te.width,te.height)),$<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let K=Math.floor($*te.width),Ce=Math.floor($*te.height);u===void 0&&(u=g(K,Ce));let pe=E?g(K,Ce):u;return pe.width=K,pe.height=Ce,pe.getContext("2d").drawImage(A,0,0,K,Ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+K+"x"+Ce+")."),pe}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){s.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(A,E,B,$,te=!1){if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=E;if(E===s.RED&&(B===s.FLOAT&&(K=s.R32F),B===s.HALF_FLOAT&&(K=s.R16F),B===s.UNSIGNED_BYTE&&(K=s.R8)),E===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.R8UI),B===s.UNSIGNED_SHORT&&(K=s.R16UI),B===s.UNSIGNED_INT&&(K=s.R32UI),B===s.BYTE&&(K=s.R8I),B===s.SHORT&&(K=s.R16I),B===s.INT&&(K=s.R32I)),E===s.RG&&(B===s.FLOAT&&(K=s.RG32F),B===s.HALF_FLOAT&&(K=s.RG16F),B===s.UNSIGNED_BYTE&&(K=s.RG8)),E===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.RG8UI),B===s.UNSIGNED_SHORT&&(K=s.RG16UI),B===s.UNSIGNED_INT&&(K=s.RG32UI),B===s.BYTE&&(K=s.RG8I),B===s.SHORT&&(K=s.RG16I),B===s.INT&&(K=s.RG32I)),E===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.RGB8UI),B===s.UNSIGNED_SHORT&&(K=s.RGB16UI),B===s.UNSIGNED_INT&&(K=s.RGB32UI),B===s.BYTE&&(K=s.RGB8I),B===s.SHORT&&(K=s.RGB16I),B===s.INT&&(K=s.RGB32I)),E===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(K=s.RGBA16UI),B===s.UNSIGNED_INT&&(K=s.RGBA32UI),B===s.BYTE&&(K=s.RGBA8I),B===s.SHORT&&(K=s.RGBA16I),B===s.INT&&(K=s.RGBA32I)),E===s.RGB&&B===s.UNSIGNED_INT_5_9_9_9_REV&&(K=s.RGB9_E5),E===s.RGBA){let Ce=te?Za:Ze.getTransfer($);B===s.FLOAT&&(K=s.RGBA32F),B===s.HALF_FLOAT&&(K=s.RGBA16F),B===s.UNSIGNED_BYTE&&(K=Ce===ft?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT_4_4_4_4&&(K=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(K=s.RGB5_A1)}return(K===s.R16F||K===s.R32F||K===s.RG16F||K===s.RG32F||K===s.RGBA16F||K===s.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function _(A,E){let B;return A?E===null||E===ds||E===or?B=s.DEPTH24_STENCIL8:E===Wn?B=s.DEPTH32F_STENCIL8:E===no&&(B=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ds||E===or?B=s.DEPTH_COMPONENT24:E===Wn?B=s.DEPTH_COMPONENT32F:E===no&&(B=s.DEPTH_COMPONENT16),B}function C(A,E){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Qt&&A.minFilter!==un?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function w(A){let E=A.target;E.removeEventListener("dispose",w),I(E),E.isVideoTexture&&h.delete(E)}function R(A){let E=A.target;E.removeEventListener("dispose",R),M(E)}function I(A){let E=n.get(A);if(E.__webglInit===void 0)return;let B=A.source,$=d.get(B);if($){let te=$[E.__cacheKey];te.usedTimes--,te.usedTimes===0&&b(A),Object.keys($).length===0&&d.delete(B)}n.remove(A)}function b(A){let E=n.get(A);s.deleteTexture(E.__webglTexture);let B=A.source,$=d.get(B);delete $[E.__cacheKey],o.memory.textures--}function M(A){let E=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(E.__webglFramebuffer[$]))for(let te=0;te<E.__webglFramebuffer[$].length;te++)s.deleteFramebuffer(E.__webglFramebuffer[$][te]);else s.deleteFramebuffer(E.__webglFramebuffer[$]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[$])}else{if(Array.isArray(E.__webglFramebuffer))for(let $=0;$<E.__webglFramebuffer.length;$++)s.deleteFramebuffer(E.__webglFramebuffer[$]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let $=0;$<E.__webglColorRenderbuffer.length;$++)E.__webglColorRenderbuffer[$]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[$]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let B=A.textures;for(let $=0,te=B.length;$<te;$++){let K=n.get(B[$]);K.__webglTexture&&(s.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(B[$])}n.remove(A)}let L=0;function H(){L=0}function D(){let A=L;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),L+=1,A}function G(A){let E=[];return E.push(A.wrapS),E.push(A.wrapT),E.push(A.wrapR||0),E.push(A.magFilter),E.push(A.minFilter),E.push(A.anisotropy),E.push(A.internalFormat),E.push(A.format),E.push(A.type),E.push(A.generateMipmaps),E.push(A.premultiplyAlpha),E.push(A.flipY),E.push(A.unpackAlignment),E.push(A.colorSpace),E.join()}function J(A,E){let B=n.get(A);if(A.isVideoTexture&&de(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){let $=A.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(B,A,E);return}}t.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+E)}function U(A,E){let B=n.get(A);if(A.version>0&&B.__version!==A.version){Z(B,A,E);return}t.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+E)}function X(A,E){let B=n.get(A);if(A.version>0&&B.__version!==A.version){Z(B,A,E);return}t.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+E)}function W(A,E){let B=n.get(A);if(A.version>0&&B.__version!==A.version){oe(B,A,E);return}t.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+E)}let ie={[xi]:s.REPEAT,[pi]:s.CLAMP_TO_EDGE,[to]:s.MIRRORED_REPEAT},me={[Qt]:s.NEAREST,[Dh]:s.NEAREST_MIPMAP_NEAREST,[$s]:s.NEAREST_MIPMAP_LINEAR,[un]:s.LINEAR,[$r]:s.LINEAR_MIPMAP_NEAREST,[jn]:s.LINEAR_MIPMAP_LINEAR},we={[im]:s.NEVER,[lm]:s.ALWAYS,[sm]:s.LESS,[Tf]:s.LEQUAL,[rm]:s.EQUAL,[cm]:s.GEQUAL,[om]:s.GREATER,[am]:s.NOTEQUAL};function Ge(A,E){if(E.type===Wn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===un||E.magFilter===$r||E.magFilter===$s||E.magFilter===jn||E.minFilter===un||E.minFilter===$r||E.minFilter===$s||E.minFilter===jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,ie[E.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,ie[E.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,ie[E.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,me[E.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,me[E.minFilter]),E.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,we[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Qt||E.minFilter!==$s&&E.minFilter!==jn||E.type===Wn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");s.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function ht(A,E){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",w));let $=E.source,te=d.get($);te===void 0&&(te={},d.set($,te));let K=G(E);if(K!==A.__cacheKey){te[K]===void 0&&(te[K]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,B=!0),te[K].usedTimes++;let Ce=te[A.__cacheKey];Ce!==void 0&&(te[A.__cacheKey].usedTimes--,Ce.usedTimes===0&&b(E)),A.__cacheKey=K,A.__webglTexture=te[K].texture}return B}function Z(A,E,B){let $=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&($=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&($=s.TEXTURE_3D);let te=ht(A,E),K=E.source;t.bindTexture($,A.__webglTexture,s.TEXTURE0+B);let Ce=n.get(K);if(K.version!==Ce.__version||te===!0){t.activeTexture(s.TEXTURE0+B);let pe=Ze.getPrimaries(Ze.workingColorSpace),Ee=E.colorSpace===Ui?null:Ze.getPrimaries(E.colorSpace),Qe=E.colorSpace===Ui||pe===Ee?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe);let se=x(E.image,!1,i.maxTextureSize);se=Oe(E,se);let Te=r.convert(E.format,E.colorSpace),Fe=r.convert(E.type),He=y(E.internalFormat,Te,Fe,E.colorSpace,E.isVideoTexture);Ge($,E);let Se,tt=E.mipmaps,Ye=E.isVideoTexture!==!0,Et=Ce.__version===void 0||te===!0,N=K.dataReady,ge=C(E,se);if(E.isDepthTexture)He=_(E.format===ar,E.type),Et&&(Ye?t.texStorage2D(s.TEXTURE_2D,1,He,se.width,se.height):t.texImage2D(s.TEXTURE_2D,0,He,se.width,se.height,0,Te,Fe,null));else if(E.isDataTexture)if(tt.length>0){Ye&&Et&&t.texStorage2D(s.TEXTURE_2D,ge,He,tt[0].width,tt[0].height);for(let Y=0,Q=tt.length;Y<Q;Y++)Se=tt[Y],Ye?N&&t.texSubImage2D(s.TEXTURE_2D,Y,0,0,Se.width,Se.height,Te,Fe,Se.data):t.texImage2D(s.TEXTURE_2D,Y,He,Se.width,Se.height,0,Te,Fe,Se.data);E.generateMipmaps=!1}else Ye?(Et&&t.texStorage2D(s.TEXTURE_2D,ge,He,se.width,se.height),N&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,se.width,se.height,Te,Fe,se.data)):t.texImage2D(s.TEXTURE_2D,0,He,se.width,se.height,0,Te,Fe,se.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ye&&Et&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ge,He,tt[0].width,tt[0].height,se.depth);for(let Y=0,Q=tt.length;Y<Q;Y++)if(Se=tt[Y],E.format!==Cn)if(Te!==null)if(Ye){if(N)if(E.layerUpdates.size>0){let ye=Fd(Se.width,Se.height,E.format,E.type);for(let xe of E.layerUpdates){let We=Se.data.subarray(xe*ye/Se.data.BYTES_PER_ELEMENT,(xe+1)*ye/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,xe,Se.width,Se.height,1,Te,We)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,Se.width,Se.height,se.depth,Te,Se.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Y,He,Se.width,Se.height,se.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?N&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,Se.width,Se.height,se.depth,Te,Fe,Se.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Y,He,Se.width,Se.height,se.depth,0,Te,Fe,Se.data)}else{Ye&&Et&&t.texStorage2D(s.TEXTURE_2D,ge,He,tt[0].width,tt[0].height);for(let Y=0,Q=tt.length;Y<Q;Y++)Se=tt[Y],E.format!==Cn?Te!==null?Ye?N&&t.compressedTexSubImage2D(s.TEXTURE_2D,Y,0,0,Se.width,Se.height,Te,Se.data):t.compressedTexImage2D(s.TEXTURE_2D,Y,He,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?N&&t.texSubImage2D(s.TEXTURE_2D,Y,0,0,Se.width,Se.height,Te,Fe,Se.data):t.texImage2D(s.TEXTURE_2D,Y,He,Se.width,Se.height,0,Te,Fe,Se.data)}else if(E.isDataArrayTexture)if(Ye){if(Et&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ge,He,se.width,se.height,se.depth),N)if(E.layerUpdates.size>0){let Y=Fd(se.width,se.height,E.format,E.type);for(let Q of E.layerUpdates){let ye=se.data.subarray(Q*Y/se.data.BYTES_PER_ELEMENT,(Q+1)*Y/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Q,se.width,se.height,1,Te,Fe,ye)}E.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,Te,Fe,se.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,He,se.width,se.height,se.depth,0,Te,Fe,se.data);else if(E.isData3DTexture)Ye?(Et&&t.texStorage3D(s.TEXTURE_3D,ge,He,se.width,se.height,se.depth),N&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,Te,Fe,se.data)):t.texImage3D(s.TEXTURE_3D,0,He,se.width,se.height,se.depth,0,Te,Fe,se.data);else if(E.isFramebufferTexture){if(Et)if(Ye)t.texStorage2D(s.TEXTURE_2D,ge,He,se.width,se.height);else{let Y=se.width,Q=se.height;for(let ye=0;ye<ge;ye++)t.texImage2D(s.TEXTURE_2D,ye,He,Y,Q,0,Te,Fe,null),Y>>=1,Q>>=1}}else if(tt.length>0){if(Ye&&Et){let Y=Me(tt[0]);t.texStorage2D(s.TEXTURE_2D,ge,He,Y.width,Y.height)}for(let Y=0,Q=tt.length;Y<Q;Y++)Se=tt[Y],Ye?N&&t.texSubImage2D(s.TEXTURE_2D,Y,0,0,Te,Fe,Se):t.texImage2D(s.TEXTURE_2D,Y,He,Te,Fe,Se);E.generateMipmaps=!1}else if(Ye){if(Et){let Y=Me(se);t.texStorage2D(s.TEXTURE_2D,ge,He,Y.width,Y.height)}N&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Te,Fe,se)}else t.texImage2D(s.TEXTURE_2D,0,He,Te,Fe,se);m(E)&&p($),Ce.__version=K.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function oe(A,E,B){if(E.image.length!==6)return;let $=ht(A,E),te=E.source;t.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+B);let K=n.get(te);if(te.version!==K.__version||$===!0){t.activeTexture(s.TEXTURE0+B);let Ce=Ze.getPrimaries(Ze.workingColorSpace),pe=E.colorSpace===Ui?null:Ze.getPrimaries(E.colorSpace),Ee=E.colorSpace===Ui||Ce===pe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let Qe=E.isCompressedTexture||E.image[0].isCompressedTexture,se=E.image[0]&&E.image[0].isDataTexture,Te=[];for(let Q=0;Q<6;Q++)!Qe&&!se?Te[Q]=x(E.image[Q],!0,i.maxCubemapSize):Te[Q]=se?E.image[Q].image:E.image[Q],Te[Q]=Oe(E,Te[Q]);let Fe=Te[0],He=r.convert(E.format,E.colorSpace),Se=r.convert(E.type),tt=y(E.internalFormat,He,Se,E.colorSpace),Ye=E.isVideoTexture!==!0,Et=K.__version===void 0||$===!0,N=te.dataReady,ge=C(E,Fe);Ge(s.TEXTURE_CUBE_MAP,E);let Y;if(Qe){Ye&&Et&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ge,tt,Fe.width,Fe.height);for(let Q=0;Q<6;Q++){Y=Te[Q].mipmaps;for(let ye=0;ye<Y.length;ye++){let xe=Y[ye];E.format!==Cn?He!==null?Ye?N&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye,0,0,xe.width,xe.height,He,xe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye,tt,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?N&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye,0,0,xe.width,xe.height,He,Se,xe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye,tt,xe.width,xe.height,0,He,Se,xe.data)}}}else{if(Y=E.mipmaps,Ye&&Et){Y.length>0&&ge++;let Q=Me(Te[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ge,tt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(se){Ye?N&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Te[Q].width,Te[Q].height,He,Se,Te[Q].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,tt,Te[Q].width,Te[Q].height,0,He,Se,Te[Q].data);for(let ye=0;ye<Y.length;ye++){let We=Y[ye].image[Q].image;Ye?N&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye+1,0,0,We.width,We.height,He,Se,We.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye+1,tt,We.width,We.height,0,He,Se,We.data)}}else{Ye?N&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,He,Se,Te[Q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,tt,He,Se,Te[Q]);for(let ye=0;ye<Y.length;ye++){let xe=Y[ye];Ye?N&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye+1,0,0,He,Se,xe.image[Q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ye+1,tt,He,Se,xe.image[Q])}}}m(E)&&p(s.TEXTURE_CUBE_MAP),K.__version=te.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function Re(A,E,B,$,te,K){let Ce=r.convert(B.format,B.colorSpace),pe=r.convert(B.type),Ee=y(B.internalFormat,Ce,pe,B.colorSpace),Qe=n.get(E),se=n.get(B);if(se.__renderTarget=E,!Qe.__hasExternalTextures){let Te=Math.max(1,E.width>>K),Fe=Math.max(1,E.height>>K);te===s.TEXTURE_3D||te===s.TEXTURE_2D_ARRAY?t.texImage3D(te,K,Ee,Te,Fe,E.depth,0,Ce,pe,null):t.texImage2D(te,K,Ee,Te,Fe,0,Ce,pe,null)}t.bindFramebuffer(s.FRAMEBUFFER,A),be(E)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,$,te,se.__webglTexture,0,ne(E)):(te===s.TEXTURE_2D||te>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,$,te,se.__webglTexture,K),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ue(A,E,B){if(s.bindRenderbuffer(s.RENDERBUFFER,A),E.depthBuffer){let $=E.depthTexture,te=$&&$.isDepthTexture?$.type:null,K=_(E.stencilBuffer,te),Ce=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pe=ne(E);be(E)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,pe,K,E.width,E.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,pe,K,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,K,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ce,s.RENDERBUFFER,A)}else{let $=E.textures;for(let te=0;te<$.length;te++){let K=$[te],Ce=r.convert(K.format,K.colorSpace),pe=r.convert(K.type),Ee=y(K.internalFormat,Ce,pe,K.colorSpace),Qe=ne(E);B&&be(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Qe,Ee,E.width,E.height):be(E)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Qe,Ee,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,Ee,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ue(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,A),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let $=n.get(E.depthTexture);$.__renderTarget=E,(!$.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),J(E.depthTexture,0);let te=$.__webglTexture,K=ne(E);if(E.depthTexture.format===er)be(E)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0);else if(E.depthTexture.format===ar)be(E)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function ke(A){let E=n.get(A),B=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){let $=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),$){let te=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,$.removeEventListener("dispose",te)};$.addEventListener("dispose",te),E.__depthDisposeCallback=te}E.__boundDepthTexture=$}if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Ue(E.__webglFramebuffer,A)}else if(B){E.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[$]),E.__webglDepthbuffer[$]===void 0)E.__webglDepthbuffer[$]=s.createRenderbuffer(),ue(E.__webglDepthbuffer[$],A,!1);else{let te=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer[$];s.bindRenderbuffer(s.RENDERBUFFER,K),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,K)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),ue(E.__webglDepthbuffer,A,!1);else{let $=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,te=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,te),s.framebufferRenderbuffer(s.FRAMEBUFFER,$,s.RENDERBUFFER,te)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Be(A,E,B){let $=n.get(A);E!==void 0&&Re($.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&ke(A)}function nt(A){let E=A.texture,B=n.get(A),$=n.get(E);A.addEventListener("dispose",R);let te=A.textures,K=A.isWebGLCubeRenderTarget===!0,Ce=te.length>1;if(Ce||($.__webglTexture===void 0&&($.__webglTexture=s.createTexture()),$.__version=E.version,o.memory.textures++),K){B.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer[pe]=[];for(let Ee=0;Ee<E.mipmaps.length;Ee++)B.__webglFramebuffer[pe][Ee]=s.createFramebuffer()}else B.__webglFramebuffer[pe]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer=[];for(let pe=0;pe<E.mipmaps.length;pe++)B.__webglFramebuffer[pe]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(Ce)for(let pe=0,Ee=te.length;pe<Ee;pe++){let Qe=n.get(te[pe]);Qe.__webglTexture===void 0&&(Qe.__webglTexture=s.createTexture(),o.memory.textures++)}if(A.samples>0&&be(A)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let pe=0;pe<te.length;pe++){let Ee=te[pe];B.__webglColorRenderbuffer[pe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[pe]);let Qe=r.convert(Ee.format,Ee.colorSpace),se=r.convert(Ee.type),Te=y(Ee.internalFormat,Qe,se,Ee.colorSpace,A.isXRRenderTarget===!0),Fe=ne(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,Fe,Te,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.RENDERBUFFER,B.__webglColorRenderbuffer[pe])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),ue(B.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(K){t.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture),Ge(s.TEXTURE_CUBE_MAP,E);for(let pe=0;pe<6;pe++)if(E.mipmaps&&E.mipmaps.length>0)for(let Ee=0;Ee<E.mipmaps.length;Ee++)Re(B.__webglFramebuffer[pe][Ee],A,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ee);else Re(B.__webglFramebuffer[pe],A,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);m(E)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let pe=0,Ee=te.length;pe<Ee;pe++){let Qe=te[pe],se=n.get(Qe);t.bindTexture(s.TEXTURE_2D,se.__webglTexture),Ge(s.TEXTURE_2D,Qe),Re(B.__webglFramebuffer,A,Qe,s.COLOR_ATTACHMENT0+pe,s.TEXTURE_2D,0),m(Qe)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let pe=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(pe=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(pe,$.__webglTexture),Ge(pe,E),E.mipmaps&&E.mipmaps.length>0)for(let Ee=0;Ee<E.mipmaps.length;Ee++)Re(B.__webglFramebuffer[Ee],A,E,s.COLOR_ATTACHMENT0,pe,Ee);else Re(B.__webglFramebuffer,A,E,s.COLOR_ATTACHMENT0,pe,0);m(E)&&p(pe),t.unbindTexture()}A.depthBuffer&&ke(A)}function ee(A){let E=A.textures;for(let B=0,$=E.length;B<$;B++){let te=E[B];if(m(te)){let K=v(A),Ce=n.get(te).__webglTexture;t.bindTexture(K,Ce),p(K),t.unbindTexture()}}}let re=[],P=[];function De(A){if(A.samples>0){if(be(A)===!1){let E=A.textures,B=A.width,$=A.height,te=s.COLOR_BUFFER_BIT,K=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ce=n.get(A),pe=E.length>1;if(pe)for(let Ee=0;Ee<E.length;Ee++)t.bindFramebuffer(s.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Ee=0;Ee<E.length;Ee++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(te|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(te|=s.STENCIL_BUFFER_BIT)),pe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ee]);let Qe=n.get(E[Ee]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Qe,0)}s.blitFramebuffer(0,0,B,$,0,0,B,$,te,s.NEAREST),c===!0&&(re.length=0,P.length=0,re.push(s.COLOR_ATTACHMENT0+Ee),A.depthBuffer&&A.resolveDepthBuffer===!1&&(re.push(K),P.push(K),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,P)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,re))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),pe)for(let Ee=0;Ee<E.length;Ee++){t.bindFramebuffer(s.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ee]);let Qe=n.get(E[Ee]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.TEXTURE_2D,Qe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let E=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function ne(A){return Math.min(i.maxSamples,A.samples)}function be(A){let E=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function de(A){let E=o.render.frame;h.get(A)!==E&&(h.set(A,E),A.update())}function Oe(A,E){let B=A.colorSpace,$=A.format,te=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==tn&&B!==Ui&&(Ze.getTransfer(B)===ft?($!==Cn||te!==_i)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),E}function Me(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=H,this.setTexture2D=J,this.setTexture2DArray=U,this.setTexture3D=X,this.setTextureCube=W,this.rebindTextures=Be,this.setupRenderTarget=nt,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=be}function my(s,e){function t(n,i=Ui){let r,o=Ze.getTransfer(i);if(n===_i)return s.UNSIGNED_BYTE;if(n===Uh)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Oh)return s.UNSIGNED_SHORT_5_5_5_1;if(n===mf)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===ff)return s.BYTE;if(n===pf)return s.SHORT;if(n===no)return s.UNSIGNED_SHORT;if(n===Nh)return s.INT;if(n===ds)return s.UNSIGNED_INT;if(n===Wn)return s.FLOAT;if(n===Xn)return s.HALF_FLOAT;if(n===gf)return s.ALPHA;if(n===xf)return s.RGB;if(n===Cn)return s.RGBA;if(n===_f)return s.LUMINANCE;if(n===yf)return s.LUMINANCE_ALPHA;if(n===er)return s.DEPTH_COMPONENT;if(n===ar)return s.DEPTH_STENCIL;if(n===Fh)return s.RED;if(n===Bh)return s.RED_INTEGER;if(n===vf)return s.RG;if(n===Hh)return s.RG_INTEGER;if(n===kh)return s.RGBA_INTEGER;if(n===ua||n===da||n===fa||n===pa)if(o===ft)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ua)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ua)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===da)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===pa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===yl||n===vl||n===Ml||n===El)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===yl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===vl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ml)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===El)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===bl||n===Tl||n===Sl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===bl||n===Tl)return o===ft?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Sl)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===wl||n===Al||n===Rl||n===Cl||n===Il||n===Pl||n===Ll||n===Dl||n===Nl||n===Ul||n===Ol||n===Fl||n===Bl||n===Hl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===wl)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Al)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Rl)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Cl)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Il)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Pl)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ll)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Dl)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Nl)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ul)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ol)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Fl)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Bl)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Hl)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ma||n===kl||n===zl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ma)return o===ft?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===kl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Mf||n===Vl||n===Gl||n===Wl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ma)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Gl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Wl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===or?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var rh=class extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},ce=class extends rt{constructor(){super(),this.isGroup=!0,this.type="Group"}},gy={type:"move"},Jr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ce,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ce,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new S,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new S),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ce,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new S,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new S),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(gy)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ce;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},xy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_y=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,oh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let i=new qt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new St({vertexShader:xy,fragmentShader:_y,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new q(new Yt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ah=class extends yi{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null,x=new oh,m=t.getContextAttributes(),p=null,v=null,y=[],_=[],C=new j,w=null,R=new zt;R.viewport=new at;let I=new zt;I.viewport=new at;let b=[R,I],M=new rh,L=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let oe=y[Z];return oe===void 0&&(oe=new Jr,y[Z]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(Z){let oe=y[Z];return oe===void 0&&(oe=new Jr,y[Z]=oe),oe.getGripSpace()},this.getHand=function(Z){let oe=y[Z];return oe===void 0&&(oe=new Jr,y[Z]=oe),oe.getHandSpace()};function D(Z){let oe=_.indexOf(Z.inputSource);if(oe===-1)return;let Re=y[oe];Re!==void 0&&(Re.update(Z.inputSource,Z.frame,l||o),Re.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){i.removeEventListener("select",D),i.removeEventListener("selectstart",D),i.removeEventListener("selectend",D),i.removeEventListener("squeeze",D),i.removeEventListener("squeezestart",D),i.removeEventListener("squeezeend",D),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",J);for(let Z=0;Z<y.length;Z++){let oe=_[Z];oe!==null&&(_[Z]=null,y[Z].disconnect(oe))}L=null,H=null,x.reset(),e.setRenderTarget(p),f=null,d=null,u=null,i=null,v=null,ht.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",D),i.addEventListener("selectstart",D),i.addEventListener("selectend",D),i.addEventListener("squeeze",D),i.addEventListener("squeezestart",D),i.addEventListener("squeezeend",D),i.addEventListener("end",G),i.addEventListener("inputsourceschange",J),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(C),i.renderState.layers===void 0){let oe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,oe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new on(f.framebufferWidth,f.framebufferHeight,{format:Cn,type:_i,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let oe=null,Re=null,ue=null;m.depth&&(ue=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=m.stencil?ar:er,Re=m.stencil?or:ds);let Ue={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Ue),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new on(d.textureWidth,d.textureHeight,{format:Cn,type:_i,depthTexture:new Sa(d.textureWidth,d.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),ht.setContext(i),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function J(Z){for(let oe=0;oe<Z.removed.length;oe++){let Re=Z.removed[oe],ue=_.indexOf(Re);ue>=0&&(_[ue]=null,y[ue].disconnect(Re))}for(let oe=0;oe<Z.added.length;oe++){let Re=Z.added[oe],ue=_.indexOf(Re);if(ue===-1){for(let ke=0;ke<y.length;ke++)if(ke>=_.length){_.push(Re),ue=ke;break}else if(_[ke]===null){_[ke]=Re,ue=ke;break}if(ue===-1)break}let Ue=y[ue];Ue&&Ue.connect(Re)}}let U=new S,X=new S;function W(Z,oe,Re){U.setFromMatrixPosition(oe.matrixWorld),X.setFromMatrixPosition(Re.matrixWorld);let ue=U.distanceTo(X),Ue=oe.projectionMatrix.elements,ke=Re.projectionMatrix.elements,Be=Ue[14]/(Ue[10]-1),nt=Ue[14]/(Ue[10]+1),ee=(Ue[9]+1)/Ue[5],re=(Ue[9]-1)/Ue[5],P=(Ue[8]-1)/Ue[0],De=(ke[8]+1)/ke[0],ne=Be*P,be=Be*De,de=ue/(-P+De),Oe=de*-P;if(oe.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Oe),Z.translateZ(de),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ue[10]===-1)Z.projectionMatrix.copy(oe.projectionMatrix),Z.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{let Me=Be+de,A=nt+de,E=ne-Oe,B=be+(ue-Oe),$=ee*nt/A*Me,te=re*nt/A*Me;Z.projectionMatrix.makePerspective(E,B,$,te,Me,A),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ie(Z,oe){oe===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(oe.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let oe=Z.near,Re=Z.far;x.texture!==null&&(x.depthNear>0&&(oe=x.depthNear),x.depthFar>0&&(Re=x.depthFar)),M.near=I.near=R.near=oe,M.far=I.far=R.far=Re,(L!==M.near||H!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,H=M.far),R.layers.mask=Z.layers.mask|2,I.layers.mask=Z.layers.mask|4,M.layers.mask=R.layers.mask|I.layers.mask;let ue=Z.parent,Ue=M.cameras;ie(M,ue);for(let ke=0;ke<Ue.length;ke++)ie(Ue[ke],ue);Ue.length===2?W(M,R,I):M.projectionMatrix.copy(R.projectionMatrix),me(Z,M,ue)};function me(Z,oe,Re){Re===null?Z.matrix.copy(oe.matrixWorld):(Z.matrix.copy(Re.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(oe.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(oe.projectionMatrix),Z.projectionMatrixInverse.copy(oe.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=hr*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Z){c=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let we=null;function Ge(Z,oe){if(h=oe.getViewerPose(l||o),g=oe,h!==null){let Re=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let ue=!1;Re.length!==M.cameras.length&&(M.cameras.length=0,ue=!0);for(let ke=0;ke<Re.length;ke++){let Be=Re[ke],nt=null;if(f!==null)nt=f.getViewport(Be);else{let re=u.getViewSubImage(d,Be);nt=re.viewport,ke===0&&(e.setRenderTargetTextures(v,re.colorTexture,d.ignoreDepthValues?void 0:re.depthStencilTexture),e.setRenderTarget(v))}let ee=b[ke];ee===void 0&&(ee=new zt,ee.layers.enable(ke),ee.viewport=new at,b[ke]=ee),ee.matrix.fromArray(Be.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(Be.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(nt.x,nt.y,nt.width,nt.height),ke===0&&(M.matrix.copy(ee.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ue===!0&&M.cameras.push(ee)}let Ue=i.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")){let ke=u.getDepthInformation(Re[0]);ke&&ke.isValid&&ke.texture&&x.init(e,ke,i.renderState)}}for(let Re=0;Re<y.length;Re++){let ue=_[Re],Ue=y[Re];ue!==null&&Ue!==void 0&&Ue.update(ue,oe,l||o)}we&&we(Z,oe),oe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:oe}),g=null}let ht=new Cf;ht.setAnimationLoop(Ge),this.setAnimationLoop=function(Z){we=Z},this.dispose=function(){}}},cs=new ei,yy=new Ve;function vy(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Rf(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,v,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Xt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Xt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v=e.get(p),y=v.envMap,_=v.envMapRotation;y&&(m.envMap.value=y,cs.copy(_),cs.x*=-1,cs.y*=-1,cs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(cs.y*=-1,cs.z*=-1),m.envMapRotation.value.setFromMatrix4(yy.makeRotationFromEuler(cs)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function My(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){let _=y.program;n.uniformBlockBinding(v,_)}function l(v,y){let _=i[v.id];_===void 0&&(g(v),_=h(v),i[v.id]=_,v.addEventListener("dispose",m));let C=y.program;n.updateUBOMapping(v,C);let w=e.render.frame;r[v.id]!==w&&(d(v),r[v.id]=w)}function h(v){let y=u();v.__bindingPointIndex=y;let _=s.createBuffer(),C=v.__size,w=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,C,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,_),_}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let y=i[v.id],_=v.uniforms,C=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let w=0,R=_.length;w<R;w++){let I=Array.isArray(_[w])?_[w]:[_[w]];for(let b=0,M=I.length;b<M;b++){let L=I[b];if(f(L,w,b,C)===!0){let H=L.__offset,D=Array.isArray(L.value)?L.value:[L.value],G=0;for(let J=0;J<D.length;J++){let U=D[J],X=x(U);typeof U=="number"||typeof U=="boolean"?(L.__data[0]=U,s.bufferSubData(s.UNIFORM_BUFFER,H+G,L.__data)):U.isMatrix3?(L.__data[0]=U.elements[0],L.__data[1]=U.elements[1],L.__data[2]=U.elements[2],L.__data[3]=0,L.__data[4]=U.elements[3],L.__data[5]=U.elements[4],L.__data[6]=U.elements[5],L.__data[7]=0,L.__data[8]=U.elements[6],L.__data[9]=U.elements[7],L.__data[10]=U.elements[8],L.__data[11]=0):(U.toArray(L.__data,G),G+=X.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(v,y,_,C){let w=v.value,R=y+"_"+_;if(C[R]===void 0)return typeof w=="number"||typeof w=="boolean"?C[R]=w:C[R]=w.clone(),!0;{let I=C[R];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return C[R]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function g(v){let y=v.uniforms,_=0,C=16;for(let R=0,I=y.length;R<I;R++){let b=Array.isArray(y[R])?y[R]:[y[R]];for(let M=0,L=b.length;M<L;M++){let H=b[M],D=Array.isArray(H.value)?H.value:[H.value];for(let G=0,J=D.length;G<J;G++){let U=D[G],X=x(U),W=_%C,ie=W%X.boundary,me=W+ie;_+=ie,me!==0&&C-me<X.storage&&(_+=C-me),H.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=_,_+=X.storage}}}let w=_%C;return w>0&&(_+=C-w),v.__size=_,v.__cache={},this}function x(v){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function m(v){let y=v.target;y.removeEventListener("dispose",m);let _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(let v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}var wa=class{constructor(e={}){let{canvas:t=wm(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Pt,this.toneMapping=Bi,this.toneMappingExposure=1;let _=this,C=!1,w=0,R=0,I=null,b=-1,M=null,L=new at,H=new at,D=null,G=new le(0),J=0,U=t.width,X=t.height,W=1,ie=null,me=null,we=new at(0,0,U,X),Ge=new at(0,0,U,X),ht=!1,Z=new so,oe=!1,Re=!1,ue=new Ve,Ue=new Ve,ke=new S,Be=new at,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ee=!1;function re(){return I===null?W:1}let P=n;function De(T,O){return t.getContext(T,O)}try{let T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${wh}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",xe,!1),P===null){let O="webgl2";if(P=De(O,T),P===null)throw De(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let ne,be,de,Oe,Me,A,E,B,$,te,K,Ce,pe,Ee,Qe,se,Te,Fe,He,Se,tt,Ye,Et,N;function ge(){ne=new Fx(P),ne.init(),Ye=new my(P,ne),be=new Px(P,ne,e,Ye),de=new dy(P,ne),be.reverseDepthBuffer&&d&&de.buffers.depth.setReversed(!0),Oe=new kx(P),Me=new Q_,A=new py(P,ne,de,Me,be,Ye,Oe),E=new Dx(_),B=new Ox(_),$=new Ym(P),Et=new Cx(P,$),te=new Bx(P,$,Oe,Et),K=new Vx(P,te,$,Oe),He=new zx(P,be,A),se=new Lx(Me),Ce=new j_(_,E,B,ne,be,Et,se),pe=new vy(_,Me),Ee=new ty,Qe=new ay(ne),Fe=new Rx(_,E,B,de,K,f,c),Te=new hy(_,K,be),N=new My(P,Oe,be,de),Se=new Ix(P,ne,Oe),tt=new Hx(P,ne,Oe),Oe.programs=Ce.programs,_.capabilities=be,_.extensions=ne,_.properties=Me,_.renderLists=Ee,_.shadowMap=Te,_.state=de,_.info=Oe}ge();let Y=new ah(_,P);this.xr=Y,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let T=ne.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=ne.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(T){T!==void 0&&(W=T,this.setSize(U,X,!1))},this.getSize=function(T){return T.set(U,X)},this.setSize=function(T,O,k=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=T,X=O,t.width=Math.floor(T*W),t.height=Math.floor(O*W),k===!0&&(t.style.width=T+"px",t.style.height=O+"px"),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(U*W,X*W).floor()},this.setDrawingBufferSize=function(T,O,k){U=T,X=O,W=k,t.width=Math.floor(T*k),t.height=Math.floor(O*k),this.setViewport(0,0,T,O)},this.getCurrentViewport=function(T){return T.copy(L)},this.getViewport=function(T){return T.copy(we)},this.setViewport=function(T,O,k,V){T.isVector4?we.set(T.x,T.y,T.z,T.w):we.set(T,O,k,V),de.viewport(L.copy(we).multiplyScalar(W).round())},this.getScissor=function(T){return T.copy(Ge)},this.setScissor=function(T,O,k,V){T.isVector4?Ge.set(T.x,T.y,T.z,T.w):Ge.set(T,O,k,V),de.scissor(H.copy(Ge).multiplyScalar(W).round())},this.getScissorTest=function(){return ht},this.setScissorTest=function(T){de.setScissorTest(ht=T)},this.setOpaqueSort=function(T){ie=T},this.setTransparentSort=function(T){me=T},this.getClearColor=function(T){return T.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor.apply(Fe,arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha.apply(Fe,arguments)},this.clear=function(T=!0,O=!0,k=!0){let V=0;if(T){let F=!1;if(I!==null){let ae=I.texture.format;F=ae===kh||ae===Hh||ae===Bh}if(F){let ae=I.texture.type,_e=ae===_i||ae===ds||ae===no||ae===or||ae===Uh||ae===Oh,Ie=Fe.getClearColor(),Pe=Fe.getClearAlpha(),ze=Ie.r,Xe=Ie.g,Le=Ie.b;_e?(g[0]=ze,g[1]=Xe,g[2]=Le,g[3]=Pe,P.clearBufferuiv(P.COLOR,0,g)):(x[0]=ze,x[1]=Xe,x[2]=Le,x[3]=Pe,P.clearBufferiv(P.COLOR,0,x))}else V|=P.COLOR_BUFFER_BIT}O&&(V|=P.DEPTH_BUFFER_BIT),k&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),Ee.dispose(),Qe.dispose(),Me.dispose(),E.dispose(),B.dispose(),K.dispose(),Et.dispose(),N.dispose(),Ce.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Du),Y.removeEventListener("sessionend",Nu),ns.stop()};function Q(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let T=Oe.autoReset,O=Te.enabled,k=Te.autoUpdate,V=Te.needsUpdate,F=Te.type;ge(),Oe.autoReset=T,Te.enabled=O,Te.autoUpdate=k,Te.needsUpdate=V,Te.type=F}function xe(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function We(T){let O=T.target;O.removeEventListener("dispose",We),Ut(O)}function Ut(T){Zt(T),Me.remove(T)}function Zt(T){let O=Me.get(T).programs;O!==void 0&&(O.forEach(function(k){Ce.releaseProgram(k)}),T.isShaderMaterial&&Ce.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,k,V,F,ae){O===null&&(O=nt);let _e=F.isMesh&&F.matrixWorld.determinant()<0,Ie=bp(T,O,k,V,F);de.setMaterial(V,_e);let Pe=k.index,ze=1;if(V.wireframe===!0){if(Pe=te.getWireframeAttribute(k),Pe===void 0)return;ze=2}let Xe=k.drawRange,Le=k.attributes.position,st=Xe.start*ze,bt=(Xe.start+Xe.count)*ze;ae!==null&&(st=Math.max(st,ae.start*ze),bt=Math.min(bt,(ae.start+ae.count)*ze)),Pe!==null?(st=Math.max(st,0),bt=Math.min(bt,Pe.count)):Le!=null&&(st=Math.max(st,0),bt=Math.min(bt,Le.count));let wt=bt-st;if(wt<0||wt===1/0)return;Et.setup(F,V,Ie,k,Pe);let hn,ut=Se;if(Pe!==null&&(hn=$.get(Pe),ut=tt,ut.setIndex(hn)),F.isMesh)V.wireframe===!0?(de.setLineWidth(V.wireframeLinewidth*re()),ut.setMode(P.LINES)):ut.setMode(P.TRIANGLES);else if(F.isLine){let Ne=V.linewidth;Ne===void 0&&(Ne=1),de.setLineWidth(Ne*re()),F.isLineSegments?ut.setMode(P.LINES):F.isLineLoop?ut.setMode(P.LINE_LOOP):ut.setMode(P.LINE_STRIP)}else F.isPoints?ut.setMode(P.POINTS):F.isSprite&&ut.setMode(P.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ut.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(ne.get("WEBGL_multi_draw"))ut.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Ne=F._multiDrawStarts,ri=F._multiDrawCounts,dt=F._multiDrawCount,Hn=Pe?$.get(Pe).bytesPerElement:1,Rs=Me.get(V).currentProgram.getUniforms();for(let xn=0;xn<dt;xn++)Rs.setValue(P,"_gl_DrawID",xn),ut.render(Ne[xn]/Hn,ri[xn])}else if(F.isInstancedMesh)ut.renderInstances(st,wt,F.count);else if(k.isInstancedBufferGeometry){let Ne=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,ri=Math.min(k.instanceCount,Ne);ut.renderInstances(st,wt,ri)}else ut.render(st,wt)};function mt(T,O,k){T.transparent===!0&&T.side===Dt&&T.forceSinglePass===!1?(T.side=Xt,T.needsUpdate=!0,Po(T,O,k),T.side=Pn,T.needsUpdate=!0,Po(T,O,k),T.side=Dt):Po(T,O,k)}this.compile=function(T,O,k=null){k===null&&(k=T),p=Qe.get(k),p.init(O),y.push(p),k.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),T!==k&&T.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();let V=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let ae=F.material;if(ae)if(Array.isArray(ae))for(let _e=0;_e<ae.length;_e++){let Ie=ae[_e];mt(Ie,k,F),V.add(Ie)}else mt(ae,k,F),V.add(ae)}),y.pop(),p=null,V},this.compileAsync=function(T,O,k=null){let V=this.compile(T,O,k);return new Promise(F=>{function ae(){if(V.forEach(function(_e){Me.get(_e).currentProgram.isReady()&&V.delete(_e)}),V.size===0){F(T);return}setTimeout(ae,10)}ne.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Bn=null;function si(T){Bn&&Bn(T)}function Du(){ns.stop()}function Nu(){ns.start()}let ns=new Cf;ns.setAnimationLoop(si),typeof self<"u"&&ns.setContext(self),this.setAnimationLoop=function(T){Bn=T,Y.setAnimationLoop(T),T===null?ns.stop():ns.start()},Y.addEventListener("sessionstart",Du),Y.addEventListener("sessionend",Nu),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(O),O=Y.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,O,I),p=Qe.get(T,y.length),p.init(O),y.push(p),Ue.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Z.setFromProjectionMatrix(Ue),Re=this.localClippingEnabled,oe=se.init(this.clippingPlanes,Re),m=Ee.get(T,v.length),m.init(),v.push(m),Y.enabled===!0&&Y.isPresenting===!0){let ae=_.xr.getDepthSensingMesh();ae!==null&&Sc(ae,O,-1/0,_.sortObjects)}Sc(T,O,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(ie,me),ee=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,ee&&Fe.addToRenderList(m,T),this.info.render.frame++,oe===!0&&se.beginShadows();let k=p.state.shadowsArray;Te.render(k,T,O),oe===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset();let V=m.opaque,F=m.transmissive;if(p.setupLights(),O.isArrayCamera){let ae=O.cameras;if(F.length>0)for(let _e=0,Ie=ae.length;_e<Ie;_e++){let Pe=ae[_e];Ou(V,F,T,Pe)}ee&&Fe.render(T);for(let _e=0,Ie=ae.length;_e<Ie;_e++){let Pe=ae[_e];Uu(m,T,Pe,Pe.viewport)}}else F.length>0&&Ou(V,F,T,O),ee&&Fe.render(T),Uu(m,T,O);I!==null&&(A.updateMultisampleRenderTarget(I),A.updateRenderTargetMipmap(I)),T.isScene===!0&&T.onAfterRender(_,T,O),Et.resetDefaultState(),b=-1,M=null,y.pop(),y.length>0?(p=y[y.length-1],oe===!0&&se.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Sc(T,O,k,V){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)k=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Z.intersectsSprite(T)){V&&Be.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ue);let _e=K.update(T),Ie=T.material;Ie.visible&&m.push(T,_e,Ie,k,Be.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Z.intersectsObject(T))){let _e=K.update(T),Ie=T.material;if(V&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Be.copy(T.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Be.copy(_e.boundingSphere.center)),Be.applyMatrix4(T.matrixWorld).applyMatrix4(Ue)),Array.isArray(Ie)){let Pe=_e.groups;for(let ze=0,Xe=Pe.length;ze<Xe;ze++){let Le=Pe[ze],st=Ie[Le.materialIndex];st&&st.visible&&m.push(T,_e,st,k,Be.z,Le)}}else Ie.visible&&m.push(T,_e,Ie,k,Be.z,null)}}let ae=T.children;for(let _e=0,Ie=ae.length;_e<Ie;_e++)Sc(ae[_e],O,k,V)}function Uu(T,O,k,V){let F=T.opaque,ae=T.transmissive,_e=T.transparent;p.setupLightsView(k),oe===!0&&se.setGlobalState(_.clippingPlanes,k),V&&de.viewport(L.copy(V)),F.length>0&&Io(F,O,k),ae.length>0&&Io(ae,O,k),_e.length>0&&Io(_e,O,k),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function Ou(T,O,k,V){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[V.id]===void 0&&(p.state.transmissionRenderTarget[V.id]=new on(1,1,{generateMipmaps:!0,type:ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float")?Xn:_i,minFilter:jn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));let ae=p.state.transmissionRenderTarget[V.id],_e=V.viewport||L;ae.setSize(_e.z,_e.w);let Ie=_.getRenderTarget();_.setRenderTarget(ae),_.getClearColor(G),J=_.getClearAlpha(),J<1&&_.setClearColor(16777215,.5),_.clear(),ee&&Fe.render(k);let Pe=_.toneMapping;_.toneMapping=Bi;let ze=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),p.setupLightsView(V),oe===!0&&se.setGlobalState(_.clippingPlanes,V),Io(T,k,V),A.updateMultisampleRenderTarget(ae),A.updateRenderTargetMipmap(ae),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let Le=0,st=O.length;Le<st;Le++){let bt=O[Le],wt=bt.object,hn=bt.geometry,ut=bt.material,Ne=bt.group;if(ut.side===Dt&&wt.layers.test(V.layers)){let ri=ut.side;ut.side=Xt,ut.needsUpdate=!0,Fu(wt,k,V,hn,ut,Ne),ut.side=ri,ut.needsUpdate=!0,Xe=!0}}Xe===!0&&(A.updateMultisampleRenderTarget(ae),A.updateRenderTargetMipmap(ae))}_.setRenderTarget(Ie),_.setClearColor(G,J),ze!==void 0&&(V.viewport=ze),_.toneMapping=Pe}function Io(T,O,k){let V=O.isScene===!0?O.overrideMaterial:null;for(let F=0,ae=T.length;F<ae;F++){let _e=T[F],Ie=_e.object,Pe=_e.geometry,ze=V===null?_e.material:V,Xe=_e.group;Ie.layers.test(k.layers)&&Fu(Ie,O,k,Pe,ze,Xe)}}function Fu(T,O,k,V,F,ae){T.onBeforeRender(_,O,k,V,F,ae),T.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(_,O,k,V,T,ae),F.transparent===!0&&F.side===Dt&&F.forceSinglePass===!1?(F.side=Xt,F.needsUpdate=!0,_.renderBufferDirect(k,O,V,F,T,ae),F.side=Pn,F.needsUpdate=!0,_.renderBufferDirect(k,O,V,F,T,ae),F.side=Dt):_.renderBufferDirect(k,O,V,F,T,ae),T.onAfterRender(_,O,k,V,F,ae)}function Po(T,O,k){O.isScene!==!0&&(O=nt);let V=Me.get(T),F=p.state.lights,ae=p.state.shadowsArray,_e=F.state.version,Ie=Ce.getParameters(T,F.state,ae,O,k),Pe=Ce.getProgramCacheKey(Ie),ze=V.programs;V.environment=T.isMeshStandardMaterial?O.environment:null,V.fog=O.fog,V.envMap=(T.isMeshStandardMaterial?B:E).get(T.envMap||V.environment),V.envMapRotation=V.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,ze===void 0&&(T.addEventListener("dispose",We),ze=new Map,V.programs=ze);let Xe=ze.get(Pe);if(Xe!==void 0){if(V.currentProgram===Xe&&V.lightsStateVersion===_e)return Hu(T,Ie),Xe}else Ie.uniforms=Ce.getUniforms(T),T.onBeforeCompile(Ie,_),Xe=Ce.acquireProgram(Ie,Pe),ze.set(Pe,Xe),V.uniforms=Ie.uniforms;let Le=V.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Le.clippingPlanes=se.uniform),Hu(T,Ie),V.needsLights=Sp(T),V.lightsStateVersion=_e,V.needsLights&&(Le.ambientLightColor.value=F.state.ambient,Le.lightProbe.value=F.state.probe,Le.directionalLights.value=F.state.directional,Le.directionalLightShadows.value=F.state.directionalShadow,Le.spotLights.value=F.state.spot,Le.spotLightShadows.value=F.state.spotShadow,Le.rectAreaLights.value=F.state.rectArea,Le.ltc_1.value=F.state.rectAreaLTC1,Le.ltc_2.value=F.state.rectAreaLTC2,Le.pointLights.value=F.state.point,Le.pointLightShadows.value=F.state.pointShadow,Le.hemisphereLights.value=F.state.hemi,Le.directionalShadowMap.value=F.state.directionalShadowMap,Le.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Le.spotShadowMap.value=F.state.spotShadowMap,Le.spotLightMatrix.value=F.state.spotLightMatrix,Le.spotLightMap.value=F.state.spotLightMap,Le.pointShadowMap.value=F.state.pointShadowMap,Le.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=Xe,V.uniformsList=null,Xe}function Bu(T){if(T.uniformsList===null){let O=T.currentProgram.getUniforms();T.uniformsList=nr.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function Hu(T,O){let k=Me.get(T);k.outputColorSpace=O.outputColorSpace,k.batching=O.batching,k.batchingColor=O.batchingColor,k.instancing=O.instancing,k.instancingColor=O.instancingColor,k.instancingMorph=O.instancingMorph,k.skinning=O.skinning,k.morphTargets=O.morphTargets,k.morphNormals=O.morphNormals,k.morphColors=O.morphColors,k.morphTargetsCount=O.morphTargetsCount,k.numClippingPlanes=O.numClippingPlanes,k.numIntersection=O.numClipIntersection,k.vertexAlphas=O.vertexAlphas,k.vertexTangents=O.vertexTangents,k.toneMapping=O.toneMapping}function bp(T,O,k,V,F){O.isScene!==!0&&(O=nt),A.resetTextureUnits();let ae=O.fog,_e=V.isMeshStandardMaterial?O.environment:null,Ie=I===null?_.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:tn,Pe=(V.isMeshStandardMaterial?B:E).get(V.envMap||_e),ze=V.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Xe=!!k.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Le=!!k.morphAttributes.position,st=!!k.morphAttributes.normal,bt=!!k.morphAttributes.color,wt=Bi;V.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(wt=_.toneMapping);let hn=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ut=hn!==void 0?hn.length:0,Ne=Me.get(V),ri=p.state.lights;if(oe===!0&&(Re===!0||T!==M)){let An=T===M&&V.id===b;se.setState(V,T,An)}let dt=!1;V.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==ri.state.version||Ne.outputColorSpace!==Ie||F.isBatchedMesh&&Ne.batching===!1||!F.isBatchedMesh&&Ne.batching===!0||F.isBatchedMesh&&Ne.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ne.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ne.instancing===!1||!F.isInstancedMesh&&Ne.instancing===!0||F.isSkinnedMesh&&Ne.skinning===!1||!F.isSkinnedMesh&&Ne.skinning===!0||F.isInstancedMesh&&Ne.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ne.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ne.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ne.instancingMorph===!1&&F.morphTexture!==null||Ne.envMap!==Pe||V.fog===!0&&Ne.fog!==ae||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==se.numPlanes||Ne.numIntersection!==se.numIntersection)||Ne.vertexAlphas!==ze||Ne.vertexTangents!==Xe||Ne.morphTargets!==Le||Ne.morphNormals!==st||Ne.morphColors!==bt||Ne.toneMapping!==wt||Ne.morphTargetsCount!==ut)&&(dt=!0):(dt=!0,Ne.__version=V.version);let Hn=Ne.currentProgram;dt===!0&&(Hn=Po(V,O,F));let Rs=!1,xn=!1,Dr=!1,At=Hn.getUniforms(),Zn=Ne.uniforms;if(de.useProgram(Hn.program)&&(Rs=!0,xn=!0,Dr=!0),V.id!==b&&(b=V.id,xn=!0),Rs||M!==T){de.buffers.depth.getReversed()?(ue.copy(T.projectionMatrix),Rm(ue),Cm(ue),At.setValue(P,"projectionMatrix",ue)):At.setValue(P,"projectionMatrix",T.projectionMatrix),At.setValue(P,"viewMatrix",T.matrixWorldInverse);let Ai=At.map.cameraPosition;Ai!==void 0&&Ai.setValue(P,ke.setFromMatrixPosition(T.matrixWorld)),be.logarithmicDepthBuffer&&At.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&At.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,xn=!0,Dr=!0)}if(F.isSkinnedMesh){At.setOptional(P,F,"bindMatrix"),At.setOptional(P,F,"bindMatrixInverse");let An=F.skeleton;An&&(An.boneTexture===null&&An.computeBoneTexture(),At.setValue(P,"boneTexture",An.boneTexture,A))}F.isBatchedMesh&&(At.setOptional(P,F,"batchingTexture"),At.setValue(P,"batchingTexture",F._matricesTexture,A),At.setOptional(P,F,"batchingIdTexture"),At.setValue(P,"batchingIdTexture",F._indirectTexture,A),At.setOptional(P,F,"batchingColorTexture"),F._colorsTexture!==null&&At.setValue(P,"batchingColorTexture",F._colorsTexture,A));let Nr=k.morphAttributes;if((Nr.position!==void 0||Nr.normal!==void 0||Nr.color!==void 0)&&He.update(F,k,Hn),(xn||Ne.receiveShadow!==F.receiveShadow)&&(Ne.receiveShadow=F.receiveShadow,At.setValue(P,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Zn.envMap.value=Pe,Zn.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&O.environment!==null&&(Zn.envMapIntensity.value=O.environmentIntensity),xn&&(At.setValue(P,"toneMappingExposure",_.toneMappingExposure),Ne.needsLights&&Tp(Zn,Dr),ae&&V.fog===!0&&pe.refreshFogUniforms(Zn,ae),pe.refreshMaterialUniforms(Zn,V,W,X,p.state.transmissionRenderTarget[T.id]),nr.upload(P,Bu(Ne),Zn,A)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(nr.upload(P,Bu(Ne),Zn,A),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&At.setValue(P,"center",F.center),At.setValue(P,"modelViewMatrix",F.modelViewMatrix),At.setValue(P,"normalMatrix",F.normalMatrix),At.setValue(P,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let An=V.uniformsGroups;for(let Ai=0,Ri=An.length;Ai<Ri;Ai++){let ku=An[Ai];N.update(ku,Hn),N.bind(ku,Hn)}}return Hn}function Tp(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function Sp(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,O,k){Me.get(T.texture).__webglTexture=O,Me.get(T.depthTexture).__webglTexture=k;let V=Me.get(T);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=k===void 0,V.__autoAllocateDepthBuffer||ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,O){let k=Me.get(T);k.__webglFramebuffer=O,k.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(T,O=0,k=0){I=T,w=O,R=k;let V=!0,F=null,ae=!1,_e=!1;if(T){let Pe=Me.get(T);if(Pe.__useDefaultFramebuffer!==void 0)de.bindFramebuffer(P.FRAMEBUFFER,null),V=!1;else if(Pe.__webglFramebuffer===void 0)A.setupRenderTarget(T);else if(Pe.__hasExternalTextures)A.rebindTextures(T,Me.get(T.texture).__webglTexture,Me.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Le=T.depthTexture;if(Pe.__boundDepthTexture!==Le){if(Le!==null&&Me.has(Le)&&(T.width!==Le.image.width||T.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(T)}}let ze=T.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(_e=!0);let Xe=Me.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Xe[O])?F=Xe[O][k]:F=Xe[O],ae=!0):T.samples>0&&A.useMultisampledRTT(T)===!1?F=Me.get(T).__webglMultisampledFramebuffer:Array.isArray(Xe)?F=Xe[k]:F=Xe,L.copy(T.viewport),H.copy(T.scissor),D=T.scissorTest}else L.copy(we).multiplyScalar(W).floor(),H.copy(Ge).multiplyScalar(W).floor(),D=ht;if(de.bindFramebuffer(P.FRAMEBUFFER,F)&&V&&de.drawBuffers(T,F),de.viewport(L),de.scissor(H),de.setScissorTest(D),ae){let Pe=Me.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+O,Pe.__webglTexture,k)}else if(_e){let Pe=Me.get(T.texture),ze=O||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Pe.__webglTexture,k||0,ze)}b=-1},this.readRenderTargetPixels=function(T,O,k,V,F,ae,_e){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=Me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(Ie=Ie[_e]),Ie){de.bindFramebuffer(P.FRAMEBUFFER,Ie);try{let Pe=T.texture,ze=Pe.format,Xe=Pe.type;if(!be.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!be.textureTypeReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-V&&k>=0&&k<=T.height-F&&P.readPixels(O,k,V,F,Ye.convert(ze),Ye.convert(Xe),ae)}finally{let Pe=I!==null?Me.get(I).__webglFramebuffer:null;de.bindFramebuffer(P.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(T,O,k,V,F,ae,_e){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=Me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(Ie=Ie[_e]),Ie){let Pe=T.texture,ze=Pe.format,Xe=Pe.type;if(!be.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!be.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=T.width-V&&k>=0&&k<=T.height-F){de.bindFramebuffer(P.FRAMEBUFFER,Ie);let Le=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Le),P.bufferData(P.PIXEL_PACK_BUFFER,ae.byteLength,P.STREAM_READ),P.readPixels(O,k,V,F,Ye.convert(ze),Ye.convert(Xe),0);let st=I!==null?Me.get(I).__webglFramebuffer:null;de.bindFramebuffer(P.FRAMEBUFFER,st);let bt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Am(P,bt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Le),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ae),P.deleteBuffer(Le),P.deleteSync(bt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,O=null,k=0){T.isTexture!==!0&&(qr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,T=arguments[1]);let V=Math.pow(2,-k),F=Math.floor(T.image.width*V),ae=Math.floor(T.image.height*V),_e=O!==null?O.x:0,Ie=O!==null?O.y:0;A.setTexture2D(T,0),P.copyTexSubImage2D(P.TEXTURE_2D,k,0,0,_e,Ie,F,ae),de.unbindTexture()},this.copyTextureToTexture=function(T,O,k=null,V=null,F=0){T.isTexture!==!0&&(qr("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,T=arguments[1],O=arguments[2],F=arguments[3]||0,k=null);let ae,_e,Ie,Pe,ze,Xe,Le,st,bt,wt=T.isCompressedTexture?T.mipmaps[F]:T.image;k!==null?(ae=k.max.x-k.min.x,_e=k.max.y-k.min.y,Ie=k.isBox3?k.max.z-k.min.z:1,Pe=k.min.x,ze=k.min.y,Xe=k.isBox3?k.min.z:0):(ae=wt.width,_e=wt.height,Ie=wt.depth||1,Pe=0,ze=0,Xe=0),V!==null?(Le=V.x,st=V.y,bt=V.z):(Le=0,st=0,bt=0);let hn=Ye.convert(O.format),ut=Ye.convert(O.type),Ne;O.isData3DTexture?(A.setTexture3D(O,0),Ne=P.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(A.setTexture2DArray(O,0),Ne=P.TEXTURE_2D_ARRAY):(A.setTexture2D(O,0),Ne=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,O.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,O.unpackAlignment);let ri=P.getParameter(P.UNPACK_ROW_LENGTH),dt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Hn=P.getParameter(P.UNPACK_SKIP_PIXELS),Rs=P.getParameter(P.UNPACK_SKIP_ROWS),xn=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,wt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,wt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Pe),P.pixelStorei(P.UNPACK_SKIP_ROWS,ze),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Xe);let Dr=T.isDataArrayTexture||T.isData3DTexture,At=O.isDataArrayTexture||O.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){let Zn=Me.get(T),Nr=Me.get(O),An=Me.get(Zn.__renderTarget),Ai=Me.get(Nr.__renderTarget);de.bindFramebuffer(P.READ_FRAMEBUFFER,An.__webglFramebuffer),de.bindFramebuffer(P.DRAW_FRAMEBUFFER,Ai.__webglFramebuffer);for(let Ri=0;Ri<Ie;Ri++)Dr&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Me.get(T).__webglTexture,F,Xe+Ri),T.isDepthTexture?(At&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Me.get(O).__webglTexture,F,bt+Ri),P.blitFramebuffer(Pe,ze,ae,_e,Le,st,ae,_e,P.DEPTH_BUFFER_BIT,P.NEAREST)):At?P.copyTexSubImage3D(Ne,F,Le,st,bt+Ri,Pe,ze,ae,_e):P.copyTexSubImage2D(Ne,F,Le,st,bt+Ri,Pe,ze,ae,_e);de.bindFramebuffer(P.READ_FRAMEBUFFER,null),de.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else At?T.isDataTexture||T.isData3DTexture?P.texSubImage3D(Ne,F,Le,st,bt,ae,_e,Ie,hn,ut,wt.data):O.isCompressedArrayTexture?P.compressedTexSubImage3D(Ne,F,Le,st,bt,ae,_e,Ie,hn,wt.data):P.texSubImage3D(Ne,F,Le,st,bt,ae,_e,Ie,hn,ut,wt):T.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,F,Le,st,ae,_e,hn,ut,wt.data):T.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,F,Le,st,wt.width,wt.height,hn,wt.data):P.texSubImage2D(P.TEXTURE_2D,F,Le,st,ae,_e,hn,ut,wt);P.pixelStorei(P.UNPACK_ROW_LENGTH,ri),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,dt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Hn),P.pixelStorei(P.UNPACK_SKIP_ROWS,Rs),P.pixelStorei(P.UNPACK_SKIP_IMAGES,xn),F===0&&O.generateMipmaps&&P.generateMipmap(Ne),de.unbindTexture()},this.copyTextureToTexture3D=function(T,O,k=null,V=null,F=0){return T.isTexture!==!0&&(qr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,V=arguments[1]||null,T=arguments[2],O=arguments[3],F=arguments[4]||0),qr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,O,k,V,F)},this.initRenderTarget=function(T){Me.get(T).__webglFramebuffer===void 0&&A.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?A.setTextureCube(T,0):T.isData3DTexture?A.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?A.setTexture2DArray(T,0):A.setTexture2D(T,0),de.unbindTexture()},this.resetState=function(){w=0,R=0,I=null,de.reset(),Et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}},Aa=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new le(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var pr=class extends rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},mr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Xl,this.updateRanges=[],this.version=0,this.uuid=In()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},sn=new S,fs=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Gn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Gn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Gn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Gn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Gn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array),r=gt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Tt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},cn=class extends fn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new le(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Gs,Hr=new S,Ws=new S,Xs=new S,qs=new j,kr=new j,Nf=new Ve,jo=new S,zr=new S,Qo=new S,Bd=new j,Qc=new j,Hd=new j,pn=class extends rt{constructor(e=new cn){if(super(),this.isSprite=!0,this.type="Sprite",Gs===void 0){Gs=new _t;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new mr(t,5);Gs.setIndex([0,1,2,0,2,3]),Gs.setAttribute("position",new fs(n,3,0,!1)),Gs.setAttribute("uv",new fs(n,2,3,!1))}this.geometry=Gs,this.material=e,this.center=new j(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ws.setFromMatrixScale(this.matrixWorld),Nf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Xs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ws.multiplyScalar(-Xs.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;ea(jo.set(-.5,-.5,0),Xs,o,Ws,i,r),ea(zr.set(.5,-.5,0),Xs,o,Ws,i,r),ea(Qo.set(.5,.5,0),Xs,o,Ws,i,r),Bd.set(0,0),Qc.set(1,0),Hd.set(1,1);let a=e.ray.intersectTriangle(jo,zr,Qo,!1,Hr);if(a===null&&(ea(zr.set(-.5,.5,0),Xs,o,Ws,i,r),Qc.set(0,1),a=e.ray.intersectTriangle(jo,Qo,zr,!1,Hr),a===null))return;let c=e.ray.origin.distanceTo(Hr);c<e.near||c>e.far||t.push({distance:c,point:Hr.clone(),uv:Oi.getInterpolation(Hr,jo,zr,Qo,Bd,Qc,Hd,new j),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ea(s,e,t,n,i,r){qs.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(kr.x=r*qs.x-i*qs.y,kr.y=i*qs.x+r*qs.y):kr.copy(qs),s.copy(e),s.x+=kr.x,s.y+=kr.y,s.applyMatrix4(Nf)}var kd=new S,zd=new at,Vd=new at,Ey=new S,Gd=new Ve,ta=new S,el=new vn,Wd=new Ve,tl=new ur,Ra=class extends q{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Wu,this.bindMatrix=new Ve,this.bindMatrixInverse=new Ve,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new an),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ta),this.boundingBox.expandByPoint(ta)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new vn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ta),this.boundingSphere.expandByPoint(ta)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),el.copy(this.boundingSphere),el.applyMatrix4(i),e.ray.intersectsSphere(el)!==!1&&(Wd.copy(i).invert(),tl.copy(e.ray).applyMatrix4(Wd),!(this.boundingBox!==null&&tl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,tl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new at,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Wu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Jp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;zd.fromBufferAttribute(i.attributes.skinIndex,e),Vd.fromBufferAttribute(i.attributes.skinWeight,e),kd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Vd.getComponent(r);if(o!==0){let a=zd.getComponent(r);Gd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Ey.copy(kd).applyMatrix4(Gd),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},ro=class extends rt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ca=class extends qt{constructor(e=null,t=1,n=1,i,r,o,a,c,l=Qt,h=Qt,u,d){super(null,o,a,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Xd=new Ve,by=new Ve,Ia=class s{constructor(e=[],t=[]){this.uuid=In(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ve)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ve;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:by;Xd.multiplyMatrices(a,t[r]),Xd.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ca(t,e,e,Cn,Wn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new ro),this.bones.push(o),this.boneInverses.push(new Ve().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},ps=class extends Tt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ys=new Ve,qd=new Ve,na=[],Yd=new an,Ty=new Ve,Vr=new q,Gr=new vn,mn=class extends q{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ps(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Ty)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new an),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ys),Yd.copy(e.boundingBox).applyMatrix4(Ys),this.boundingBox.union(Yd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ys),Gr.copy(e.boundingSphere).applyMatrix4(Ys),this.boundingSphere.union(Gr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Vr.geometry=this.geometry,Vr.material=this.material,Vr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gr.copy(this.boundingSphere),Gr.applyMatrix4(n),e.ray.intersectsSphere(Gr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ys),qd.multiplyMatrices(n,Ys),Vr.matrixWorld=qd,Vr.raycast(e,na);for(let o=0,a=na.length;o<a;o++){let c=na[o];c.instanceId=r,c.object=this,t.push(c)}na.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ps(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ca(new Float32Array(i*this.count),i,this.count,Fh,Wn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=i*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var oo=class extends fn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Pa=new S,La=new S,$d=new Ve,Wr=new ur,ia=new vn,nl=new S,Kd=new S,gr=class extends rt{constructor(e=new _t,t=new oo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Pa.fromBufferAttribute(t,i-1),La.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Pa.distanceTo(La);e.setAttribute("lineDistance",new Ke(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ia.copy(n.boundingSphere),ia.applyMatrix4(i),ia.radius+=r,e.ray.intersectsSphere(ia)===!1)return;$d.copy(i).invert(),Wr.copy(e.ray).applyMatrix4($d);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){let p=h.getX(x),v=h.getX(x+1),y=sa(this,e,Wr,c,p,v);y&&t.push(y)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(f),p=sa(this,e,Wr,c,x,m);p&&t.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){let p=sa(this,e,Wr,c,x,x+1);p&&t.push(p)}if(this.isLineLoop){let x=sa(this,e,Wr,c,g-1,f);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function sa(s,e,t,n,i,r){let o=s.geometry.attributes.position;if(Pa.fromBufferAttribute(o,i),La.fromBufferAttribute(o,r),t.distanceSqToSegment(Pa,La,nl,Kd)>n)return;nl.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(nl);if(!(c<e.near||c>e.far))return{distance:c,point:Kd.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}var Zd=new S,Jd=new S,Da=class extends gr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Zd.fromBufferAttribute(t,i),Jd.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Zd.distanceTo(Jd);e.setAttribute("lineDistance",new Ke(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Na=class extends gr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},ms=class extends fn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},jd=new Ve,ch=new ur,ra=new vn,oa=new S,ki=class extends rt{constructor(e=new _t,t=new ms){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ra.copy(n.boundingSphere),ra.applyMatrix4(i),ra.radius+=r,e.ray.intersectsSphere(ra)===!1)return;jd.copy(i).invert(),ch.copy(e.ray).applyMatrix4(jd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,x=f;g<x;g++){let m=l.getX(g);oa.fromBufferAttribute(u,m),Qd(oa,m,c,i,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,x=f;g<x;g++)oa.fromBufferAttribute(u,g),Qd(oa,g,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Qd(s,e,t,n,i,r,o){let a=ch.distanceSqToPoint(s);if(a<t){let c=new S;ch.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var xr=class extends qt{constructor(e,t,n,i,r,o,a,c,l){super(e,t,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ln=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),c=t||(o.isVector2?new j:new S);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new S,i=[],r=[],o=[],a=new S,c=new Ve;for(let f=0;f<=e;f++){let g=f/e;i[f]=this.getTangentAt(g,new S)}r[0]=new S,o[0]=new S;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(kt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(kt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ao=class extends Ln{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new j){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},lh=class extends ao{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function qh(){let s=0,e=0,t=0,n=0;function i(r,o,a,c){s=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var aa=new S,il=new qh,sl=new qh,rl=new qh,Mn=class extends Ln{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new S){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%r]:(aa.subVectors(i[0],i[1]).add(i[0]),l=aa);let u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(aa.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=aa),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),il.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,x,m),sl.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,x,m),rl.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(il.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),sl.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),rl.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(il.calc(c),sl.calc(c),rl.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new S().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ef(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,c=s*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*s+t}function Sy(s,e){let t=1-s;return t*t*e}function wy(s,e){return 2*(1-s)*s*e}function Ay(s,e){return s*s*e}function jr(s,e,t,n){return Sy(s,e)+wy(s,t)+Ay(s,n)}function Ry(s,e){let t=1-s;return t*t*t*e}function Cy(s,e){let t=1-s;return 3*t*t*s*e}function Iy(s,e){return 3*(1-s)*s*s*e}function Py(s,e){return s*s*s*e}function Qr(s,e,t,n,i){return Ry(s,e)+Cy(s,t)+Iy(s,n)+Py(s,i)}var Ua=class extends Ln{constructor(e=new j,t=new j,n=new j,i=new j){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new j){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Qr(e,i.x,r.x,o.x,a.x),Qr(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},hh=class extends Ln{constructor(e=new S,t=new S,n=new S,i=new S){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new S){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Qr(e,i.x,r.x,o.x,a.x),Qr(e,i.y,r.y,o.y,a.y),Qr(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Oa=class extends Ln{constructor(e=new j,t=new j){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new j){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new j){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},co=class extends Ln{constructor(e=new S,t=new S){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new S){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new S){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fa=class extends Ln{constructor(e=new j,t=new j,n=new j){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new j){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(jr(e,i.x,r.x,o.x),jr(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_r=class extends Ln{constructor(e=new S,t=new S,n=new S){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new S){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(jr(e,i.x,r.x,o.x),jr(e,i.y,r.y,o.y),jr(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ba=class extends Ln{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new j){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(ef(a,c.x,l.x,h.x,u.x),ef(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new j().fromArray(i))}return this}},Ha=Object.freeze({__proto__:null,ArcCurve:lh,CatmullRomCurve3:Mn,CubicBezierCurve:Ua,CubicBezierCurve3:hh,EllipseCurve:ao,LineCurve:Oa,LineCurve3:co,QuadraticBezierCurve:Fa,QuadraticBezierCurve3:_r,SplineCurve:Ba}),uh=class extends Ln{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ha[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Ha[i.type]().fromJSON(i))}return this}},lo=class extends uh{constructor(e){super(),this.type="Path",this.currentPoint=new j,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Oa(this.currentPoint.clone(),new j(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new Fa(this.currentPoint.clone(),new j(e,t),new j(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new Ua(this.currentPoint.clone(),new j(e,t),new j(n,i),new j(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ba(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,r,o,a,c),this}absellipse(e,t,n,i,r,o,a,c){let l=new ao(e,t,n,i,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},gs=class s extends _t{constructor(e=[new j(0,-.5),new j(.5,0),new j(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=kt(i,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/t,u=new S,d=new j,f=new S,g=new S,x=new S,m=0,p=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(x.x,x.y,x.z);break;default:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(g)}for(let v=0;v<=t;v++){let y=n+v*h*i,_=Math.sin(y),C=Math.cos(y);for(let w=0;w<=e.length-1;w++){u.x=e[w].x*_,u.y=e[w].y,u.z=e[w].x*C,o.push(u.x,u.y,u.z),d.x=v/t,d.y=w/(e.length-1),a.push(d.x,d.y);let R=c[3*w+0]*_,I=c[3*w+1],b=c[3*w+0]*C;l.push(R,I,b)}}for(let v=0;v<t;v++)for(let y=0;y<e.length-1;y++){let _=y+v*e.length,C=_,w=_+e.length,R=_+e.length+1,I=_+1;r.push(C,w,I),r.push(R,I,w)}this.setIndex(r),this.setAttribute("position",new Ke(o,3)),this.setAttribute("uv",new Ke(a,2)),this.setAttribute("normal",new Ke(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}},yr=class s extends gs{constructor(e=1,t=1,n=4,i=8){let r=new lo;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new s(e.radius,e.length,e.capSegments,e.radialSegments)}},En=class s extends _t{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new S,h=new j;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ke(o,3)),this.setAttribute("normal",new Ke(a,3)),this.setAttribute("uv",new Ke(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Mt=class s extends _t{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,x=[],m=n/2,p=0;v(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Ke(u,3)),this.setAttribute("normal",new Ke(d,3)),this.setAttribute("uv",new Ke(f,2));function v(){let _=new S,C=new S,w=0,R=(t-e)/n;for(let I=0;I<=r;I++){let b=[],M=I/r,L=M*(t-e)+e;for(let H=0;H<=i;H++){let D=H/i,G=D*c+a,J=Math.sin(G),U=Math.cos(G);C.x=L*J,C.y=-M*n+m,C.z=L*U,u.push(C.x,C.y,C.z),_.set(J,R,U).normalize(),d.push(_.x,_.y,_.z),f.push(D,1-M),b.push(g++)}x.push(b)}for(let I=0;I<i;I++)for(let b=0;b<r;b++){let M=x[b][I],L=x[b+1][I],H=x[b+1][I+1],D=x[b][I+1];(e>0||b!==0)&&(h.push(M,L,D),w+=3),(t>0||b!==r-1)&&(h.push(L,H,D),w+=3)}l.addGroup(p,w,0),p+=w}function y(_){let C=g,w=new j,R=new S,I=0,b=_===!0?e:t,M=_===!0?1:-1;for(let H=1;H<=i;H++)u.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;let L=g;for(let H=0;H<=i;H++){let G=H/i*c+a,J=Math.cos(G),U=Math.sin(G);R.x=b*U,R.y=m*M,R.z=b*J,u.push(R.x,R.y,R.z),d.push(0,M,0),w.x=J*.5+.5,w.y=U*.5*M+.5,f.push(w.x,w.y),g++}for(let H=0;H<i;H++){let D=C+H,G=L+H;_===!0?h.push(G,G+1,D):h.push(G+1,G,D),I+=3}l.addGroup(p,I,_===!0?1:2),p+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},$t=class s extends Mt{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var xs=class extends lo{constructor(e){super(e),this.uuid=In(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new lo().fromJSON(i))}return this}},Ly={triangulate:function(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=Uf(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=Fy(s,e,r,t)),s.length>80*t){a=l=s[0],c=h=s[1];for(let g=t;g<i;g+=t)u=s[g],d=s[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return ho(r,o,t,a,c,f,0),o}};function Uf(s,e,t,n,i){let r,o;if(i===$y(s,e,t,n)>0)for(r=e;r<t;r+=n)o=tf(r,s[r],s[r+1],o);else for(r=t-n;r>=e;r-=n)o=tf(r,s[r],s[r+1],o);return o&&ja(o,o.next)&&(fo(o),o=o.next),o}function _s(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(ja(t,t.next)||Nt(t.prev,t,t.next)===0)){if(fo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ho(s,e,t,n,i,r,o){if(!s)return;!o&&r&&Vy(s,n,i,r);let a=s,c,l;for(;s.prev!==s.next;){if(c=s.prev,l=s.next,r?Ny(s,n,i,r):Dy(s)){e.push(c.i/t|0),e.push(s.i/t|0),e.push(l.i/t|0),fo(s),s=l.next,a=l.next;continue}if(s=l,s===a){o?o===1?(s=Uy(_s(s),e,t),ho(s,e,t,n,i,r,2)):o===2&&Oy(s,e,t,n,i,r):ho(_s(s),e,t,n,i,r,1);break}}}function Dy(s){let e=s.prev,t=s,n=s.next;if(Nt(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=i<r?i<o?i:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=i>r?i>o?i:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l,g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&js(i,a,r,c,o,l,g.x,g.y)&&Nt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ny(s,e,t,n){let i=s.prev,r=s,o=s.next;if(Nt(i,r,o)>=0)return!1;let a=i.x,c=r.x,l=o.x,h=i.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,x=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,p=dh(f,g,e,t,n),v=dh(x,m,e,t,n),y=s.prevZ,_=s.nextZ;for(;y&&y.z>=p&&_&&_.z<=v;){if(y.x>=f&&y.x<=x&&y.y>=g&&y.y<=m&&y!==i&&y!==o&&js(a,h,c,u,l,d,y.x,y.y)&&Nt(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&js(a,h,c,u,l,d,_.x,_.y)&&Nt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=p;){if(y.x>=f&&y.x<=x&&y.y>=g&&y.y<=m&&y!==i&&y!==o&&js(a,h,c,u,l,d,y.x,y.y)&&Nt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=v;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&js(a,h,c,u,l,d,_.x,_.y)&&Nt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Uy(s,e,t){let n=s;do{let i=n.prev,r=n.next.next;!ja(i,r)&&Of(i,n,n.next,r)&&uo(i,r)&&uo(r,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),fo(n),fo(n.next),n=s=r),n=n.next}while(n!==s);return _s(n)}function Oy(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Xy(o,a)){let c=Ff(o,a);o=_s(o,o.next),c=_s(c,c.next),ho(o,e,t,n,i,r,0),ho(c,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function Fy(s,e,t,n){let i=[],r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*n,c=r<o-1?e[r+1]*n:s.length,l=Uf(s,a,c,n,!1),l===l.next&&(l.steiner=!0),i.push(Wy(l));for(i.sort(By),r=0;r<i.length;r++)t=Hy(i[r],t);return t}function By(s,e){return s.x-e.x}function Hy(s,e){let t=ky(s,e);if(!t)return e;let n=Ff(t,s);return _s(n,n.next),_s(t,t.next)}function ky(s,e){let t=e,n=-1/0,i,r=s.x,o=s.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){let d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===r))return i}t=t.next}while(t!==e);if(!i)return null;let a=i,c=i.x,l=i.y,h=1/0,u;t=i;do r>=t.x&&t.x>=c&&r!==t.x&&js(o<l?r:n,o,c,l,o<l?n:r,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(r-t.x),uo(t,s)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&zy(i,t)))&&(i=t,h=u)),t=t.next;while(t!==a);return i}function zy(s,e){return Nt(s.prev,s,e.prev)<0&&Nt(e.next,s,s.next)<0}function Vy(s,e,t,n){let i=s;do i.z===0&&(i.z=dh(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Gy(i)}function Gy(s){let e,t,n,i,r,o,a,c,l=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,l*=2}while(o>1);return s}function dh(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Wy(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function js(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function Xy(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!qy(s,e)&&(uo(s,e)&&uo(e,s)&&Yy(s,e)&&(Nt(s.prev,s,e.prev)||Nt(s,e.prev,e))||ja(s,e)&&Nt(s.prev,s,s.next)>0&&Nt(e.prev,e,e.next)>0)}function Nt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function ja(s,e){return s.x===e.x&&s.y===e.y}function Of(s,e,t,n){let i=la(Nt(s,e,t)),r=la(Nt(s,e,n)),o=la(Nt(t,n,s)),a=la(Nt(t,n,e));return!!(i!==r&&o!==a||i===0&&ca(s,t,e)||r===0&&ca(s,n,e)||o===0&&ca(t,s,n)||a===0&&ca(t,e,n))}function ca(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function la(s){return s>0?1:s<0?-1:0}function qy(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Of(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function uo(s,e){return Nt(s.prev,s,s.next)<0?Nt(s,e,s.next)>=0&&Nt(s,s.prev,e)>=0:Nt(s,e,s.prev)<0||Nt(s,s.next,e)<0}function Yy(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Ff(s,e){let t=new fh(s.i,s.x,s.y),n=new fh(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function tf(s,e,t,n){let i=new fh(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function fo(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function fh(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function $y(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var eo=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];nf(e),sf(n,e);let o=e.length;t.forEach(nf);for(let c=0;c<t.length;c++)i.push(o),o+=t[c].length,sf(n,t[c]);let a=Ly.triangulate(n,i);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function nf(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function sf(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var vr=class s extends _t{constructor(e=new xs([new j(.5,.5),new j(-.5,.5),new j(-.5,-.5),new j(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let a=0,c=e.length;a<c;a++){let l=e[a];o(l)}this.setAttribute("position",new Ke(i,3)),this.setAttribute("uv",new Ke(r,2)),this.computeVertexNormals();function o(a){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:Ky,y,_=!1,C,w,R,I;p&&(y=p.getSpacedPoints(h),_=!0,d=!1,C=p.computeFrenetFrames(h,!1),w=new S,R=new S,I=new S),d||(m=0,f=0,g=0,x=0);let b=a.extractPoints(l),M=b.shape,L=b.holes;if(!eo.isClockWise(M)){M=M.reverse();for(let ee=0,re=L.length;ee<re;ee++){let P=L[ee];eo.isClockWise(P)&&(L[ee]=P.reverse())}}let D=eo.triangulateShape(M,L),G=M;for(let ee=0,re=L.length;ee<re;ee++){let P=L[ee];M=M.concat(P)}function J(ee,re,P){return re||console.error("THREE.ExtrudeGeometry: vec does not exist"),ee.clone().addScaledVector(re,P)}let U=M.length,X=D.length;function W(ee,re,P){let De,ne,be,de=ee.x-re.x,Oe=ee.y-re.y,Me=P.x-ee.x,A=P.y-ee.y,E=de*de+Oe*Oe,B=de*A-Oe*Me;if(Math.abs(B)>Number.EPSILON){let $=Math.sqrt(E),te=Math.sqrt(Me*Me+A*A),K=re.x-Oe/$,Ce=re.y+de/$,pe=P.x-A/te,Ee=P.y+Me/te,Qe=((pe-K)*A-(Ee-Ce)*Me)/(de*A-Oe*Me);De=K+de*Qe-ee.x,ne=Ce+Oe*Qe-ee.y;let se=De*De+ne*ne;if(se<=2)return new j(De,ne);be=Math.sqrt(se/2)}else{let $=!1;de>Number.EPSILON?Me>Number.EPSILON&&($=!0):de<-Number.EPSILON?Me<-Number.EPSILON&&($=!0):Math.sign(Oe)===Math.sign(A)&&($=!0),$?(De=-Oe,ne=de,be=Math.sqrt(E)):(De=de,ne=Oe,be=Math.sqrt(E/2))}return new j(De/be,ne/be)}let ie=[];for(let ee=0,re=G.length,P=re-1,De=ee+1;ee<re;ee++,P++,De++)P===re&&(P=0),De===re&&(De=0),ie[ee]=W(G[ee],G[P],G[De]);let me=[],we,Ge=ie.concat();for(let ee=0,re=L.length;ee<re;ee++){let P=L[ee];we=[];for(let De=0,ne=P.length,be=ne-1,de=De+1;De<ne;De++,be++,de++)be===ne&&(be=0),de===ne&&(de=0),we[De]=W(P[De],P[be],P[de]);me.push(we),Ge=Ge.concat(we)}for(let ee=0;ee<m;ee++){let re=ee/m,P=f*Math.cos(re*Math.PI/2),De=g*Math.sin(re*Math.PI/2)+x;for(let ne=0,be=G.length;ne<be;ne++){let de=J(G[ne],ie[ne],De);ue(de.x,de.y,-P)}for(let ne=0,be=L.length;ne<be;ne++){let de=L[ne];we=me[ne];for(let Oe=0,Me=de.length;Oe<Me;Oe++){let A=J(de[Oe],we[Oe],De);ue(A.x,A.y,-P)}}}let ht=g+x;for(let ee=0;ee<U;ee++){let re=d?J(M[ee],Ge[ee],ht):M[ee];_?(R.copy(C.normals[0]).multiplyScalar(re.x),w.copy(C.binormals[0]).multiplyScalar(re.y),I.copy(y[0]).add(R).add(w),ue(I.x,I.y,I.z)):ue(re.x,re.y,0)}for(let ee=1;ee<=h;ee++)for(let re=0;re<U;re++){let P=d?J(M[re],Ge[re],ht):M[re];_?(R.copy(C.normals[ee]).multiplyScalar(P.x),w.copy(C.binormals[ee]).multiplyScalar(P.y),I.copy(y[ee]).add(R).add(w),ue(I.x,I.y,I.z)):ue(P.x,P.y,u/h*ee)}for(let ee=m-1;ee>=0;ee--){let re=ee/m,P=f*Math.cos(re*Math.PI/2),De=g*Math.sin(re*Math.PI/2)+x;for(let ne=0,be=G.length;ne<be;ne++){let de=J(G[ne],ie[ne],De);ue(de.x,de.y,u+P)}for(let ne=0,be=L.length;ne<be;ne++){let de=L[ne];we=me[ne];for(let Oe=0,Me=de.length;Oe<Me;Oe++){let A=J(de[Oe],we[Oe],De);_?ue(A.x,A.y+y[h-1].y,y[h-1].x+P):ue(A.x,A.y,u+P)}}}Z(),oe();function Z(){let ee=i.length/3;if(d){let re=0,P=U*re;for(let De=0;De<X;De++){let ne=D[De];Ue(ne[2]+P,ne[1]+P,ne[0]+P)}re=h+m*2,P=U*re;for(let De=0;De<X;De++){let ne=D[De];Ue(ne[0]+P,ne[1]+P,ne[2]+P)}}else{for(let re=0;re<X;re++){let P=D[re];Ue(P[2],P[1],P[0])}for(let re=0;re<X;re++){let P=D[re];Ue(P[0]+U*h,P[1]+U*h,P[2]+U*h)}}n.addGroup(ee,i.length/3-ee,0)}function oe(){let ee=i.length/3,re=0;Re(G,re),re+=G.length;for(let P=0,De=L.length;P<De;P++){let ne=L[P];Re(ne,re),re+=ne.length}n.addGroup(ee,i.length/3-ee,1)}function Re(ee,re){let P=ee.length;for(;--P>=0;){let De=P,ne=P-1;ne<0&&(ne=ee.length-1);for(let be=0,de=h+m*2;be<de;be++){let Oe=U*be,Me=U*(be+1),A=re+De+Oe,E=re+ne+Oe,B=re+ne+Me,$=re+De+Me;ke(A,E,B,$)}}}function ue(ee,re,P){c.push(ee),c.push(re),c.push(P)}function Ue(ee,re,P){Be(ee),Be(re),Be(P);let De=i.length/3,ne=v.generateTopUV(n,i,De-3,De-2,De-1);nt(ne[0]),nt(ne[1]),nt(ne[2])}function ke(ee,re,P,De){Be(ee),Be(re),Be(De),Be(re),Be(P),Be(De);let ne=i.length/3,be=v.generateSideWallUV(n,i,ne-6,ne-3,ne-2,ne-1);nt(be[0]),nt(be[1]),nt(be[3]),nt(be[1]),nt(be[2]),nt(be[3])}function Be(ee){i.push(c[ee*3+0]),i.push(c[ee*3+1]),i.push(c[ee*3+2])}function nt(ee){r.push(ee.x),r.push(ee.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Zy(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Ha[i.type]().fromJSON(i)),new s(n,e.options)}},Ky={generateTopUV:function(s,e,t,n,i){let r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[i*3],h=e[i*3+1];return[new j(r,o),new j(a,c),new j(l,h)]},generateSideWallUV:function(s,e,t,n,i,r){let o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],g=e[i*3+2],x=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new j(o,1-c),new j(l,1-u),new j(d,1-g),new j(x,1-p)]:[new j(a,1-c),new j(h,1-u),new j(f,1-g),new j(m,1-p)]}};function Zy(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var zi=class s extends _t{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],c=[],l=[],h=[],u=e,d=(t-e)/i,f=new S,g=new j;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){let p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<i;x++){let m=x*(n+1);for(let p=0;p<n;p++){let v=p+m,y=v,_=v+n+1,C=v+n+2,w=v+1;a.push(y,_,w),a.push(_,C,w)}}this.setIndex(a),this.setAttribute("position",new Ke(c,3)),this.setAttribute("normal",new Ke(l,3)),this.setAttribute("uv",new Ke(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var en=class s extends _t{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new S,d=new S,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let v=[],y=p/n,_=0;p===0&&o===0?_=.5/t:p===n&&c===Math.PI&&(_=-.5/t);for(let C=0;C<=t;C++){let w=C/t;u.x=-e*Math.cos(i+w*r)*Math.sin(o+y*a),u.y=e*Math.cos(o+y*a),u.z=e*Math.sin(i+w*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(w+_,1-y),v.push(l++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){let y=h[p][v+1],_=h[p][v],C=h[p+1][v],w=h[p+1][v+1];(p!==0||o>0)&&f.push(y,_,w),(p!==n-1||c<Math.PI)&&f.push(_,C,w)}this.setIndex(f),this.setAttribute("position",new Ke(g,3)),this.setAttribute("normal",new Ke(x,3)),this.setAttribute("uv",new Ke(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Dn=class s extends _t{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],c=[],l=[],h=new S,u=new S,d=new S;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){let x=g/i*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(x),u.y=(e+t*Math.cos(m))*Math.sin(x),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){let x=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,v=(i+1)*f+g;o.push(x,m,v),o.push(m,p,v)}this.setIndex(o),this.setAttribute("position",new Ke(a,3)),this.setAttribute("normal",new Ke(c,3)),this.setAttribute("uv",new Ke(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var bn=class s extends _t{constructor(e=new _r(new S(-1,-1,0),new S(-1,1,0),new S(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new S,c=new S,l=new j,h=new S,u=[],d=[],f=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new Ke(u,3)),this.setAttribute("normal",new Ke(d,3)),this.setAttribute("uv",new Ke(f,2));function x(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),v(),p()}function m(y){h=e.getPointAt(y/t,h);let _=o.normals[y],C=o.binormals[y];for(let w=0;w<=i;w++){let R=w/i*Math.PI*2,I=Math.sin(R),b=-Math.cos(R);c.x=b*_.x+I*C.x,c.y=b*_.y+I*C.y,c.z=b*_.z+I*C.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function p(){for(let y=1;y<=t;y++)for(let _=1;_<=i;_++){let C=(i+1)*(y-1)+(_-1),w=(i+1)*y+(_-1),R=(i+1)*y+_,I=(i+1)*(y-1)+_;g.push(C,w,I),g.push(w,R,I)}}function v(){for(let y=0;y<=t;y++)for(let _=0;_<=i;_++)l.x=y/t,l.y=_/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new Ha[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var ka=class extends St{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}},Rt=class extends fn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bf,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Tn=class extends Rt{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new j(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return kt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new le(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new le(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new le(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function ha(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Jy(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function jy(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function rf(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)i[o++]=s[a+c]}return i}function Bf(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}var Vi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ph=class extends Vi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ks,endingEnd:Ks}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Zs:r=e,a=2*t-n;break;case ga:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Zs:o=e,c=2*n-t;break;case ga:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,v=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*x+.5*g,_=f*m-f*x;for(let C=0;C!==a;++C)r[C]=p*o[h+C]+v*o[l+C]+y*o[c+C]+_*o[u+C];return r}},za=class extends Vi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},mh=class extends Vi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Nn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ha(t,this.TimeBufferType),this.values=ha(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ha(e.times,Array),values:ha(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new mh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new za(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ph(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case cr:t=this.InterpolantFactoryMethodDiscrete;break;case lr:t=this.InterpolantFactoryMethodLinear;break;case wc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return cr;case this.InterpolantFactoryMethodLinear:return lr;case this.InterpolantFactoryMethodSmooth:return wc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&Jy(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===wc,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let x=t[u+g];if(x!==t[d+g]||x!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Nn.prototype.TimeBufferType=Float32Array;Nn.prototype.ValueBufferType=Float32Array;Nn.prototype.DefaultInterpolation=lr;var Gi=class extends Nn{constructor(e,t,n){super(e,t,n)}};Gi.prototype.ValueTypeName="bool";Gi.prototype.ValueBufferType=Array;Gi.prototype.DefaultInterpolation=cr;Gi.prototype.InterpolantFactoryMethodLinear=void 0;Gi.prototype.InterpolantFactoryMethodSmooth=void 0;var Va=class extends Nn{};Va.prototype.ValueTypeName="color";var vi=class extends Nn{};vi.prototype.ValueTypeName="number";var gh=class extends Vi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t),l=e*a;for(let h=l+a;l!==h;l+=4)dn.slerpFlat(r,0,o,l-a,o,l,c);return r}},Mi=class extends Nn{InterpolantFactoryMethodLinear(e){return new gh(this.times,this.values,this.getValueSize(),e)}};Mi.prototype.ValueTypeName="quaternion";Mi.prototype.InterpolantFactoryMethodSmooth=void 0;var Wi=class extends Nn{constructor(e,t,n){super(e,t,n)}};Wi.prototype.ValueTypeName="string";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=cr;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ei=class extends Nn{};Ei.prototype.ValueTypeName="vector";var Mr=class{constructor(e="",t=-1,n=[],i=Gh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=In(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(ev(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Nn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=jy(c);c=rf(c,1,h),l=rf(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new vi(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(l)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,f,g,x){if(f.length!==0){let m=[],p=[];Bf(f,m,p,g),m.length!==0&&x.push(new u(d,m,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let x=0;x<d[g].morphTargets.length;x++)f[d[g].morphTargets[x]]=-1;for(let x in f){let m=[],p=[];for(let v=0;v!==d[g].morphTargets.length;++v){let y=d[g];m.push(y.time),p.push(y.morphTarget===x?1:0)}i.push(new vi(".morphTargetInfluence["+x+"]",m,p))}c=f.length*o}else{let f=".bones["+t[u].name+"]";n(Ei,f+".position",d,"pos",i),n(Mi,f+".quaternion",d,"rot",i),n(Ei,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function Qy(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return vi;case"vector":case"vector2":case"vector3":case"vector4":return Ei;case"color":return Va;case"quaternion":return Mi;case"bool":case"boolean":return Gi;case"string":return Wi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function ev(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Qy(s.type);if(s.times===void 0){let t=[],n=[];Bf(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var Fi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},xh=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},tv=new xh,bi=class{constructor(e){this.manager=e!==void 0?e:tv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};bi.DEFAULT_MATERIAL_NAME="__DEFAULT";var ui={},_h=class extends Error{constructor(e,t){super(e),this.response=t}},po=class extends bi{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Fi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ui[e]!==void 0){ui[e].push({onLoad:t,onProgress:n,onError:i});return}ui[e]=[],ui[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=ui[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,x=0,m=new ReadableStream({start(p){v();function v(){u.read().then(({done:y,value:_})=>{if(y)p.close();else{x+=_.byteLength;let C=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let w=0,R=h.length;w<R;w++){let I=h[w];I.onProgress&&I.onProgress(C)}p.enqueue(_),v()}},y=>{p.error(y)})}}});return new Response(m)}else throw new _h(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{Fi.add(e,l);let h=ui[e];delete ui[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=ui[e];if(h===void 0)throw this.manager.itemError(e),l;delete ui[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var yh=class extends bi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Fi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=io("img");function c(){h(),Fi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var Ga=class extends bi{constructor(e){super(e)}load(e,t,n,i){let r=new qt,o=new yh(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Er=class extends rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new le(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Wa=class extends Er{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new le(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},ol=new Ve,of=new S,af=new S,mo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new j(512,512),this.map=null,this.mapPass=null,this.matrix=new Ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new so,this._frameExtents=new j(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;of.setFromMatrixPosition(e.matrixWorld),t.position.copy(of),af.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(af),t.updateMatrixWorld(),ol.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ol),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ol)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},vh=class extends mo{constructor(){super(new zt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=hr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Xa=class extends Er{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.target=new rt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new vh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},cf=new Ve,Xr=new S,al=new S,Mh=class extends mo{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new j(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new S(1,0,0),new S(-1,0,0),new S(0,0,1),new S(0,0,-1),new S(0,1,0),new S(0,-1,0)],this._cubeUps=[new S(0,1,0),new S(0,1,0),new S(0,1,0),new S(0,1,0),new S(0,0,1),new S(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Xr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Xr),al.copy(n.position),al.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(al),n.updateMatrixWorld(),i.makeTranslation(-Xr.x,-Xr.y,-Xr.z),cf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cf)}},ti=class extends Er{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Mh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Eh=class extends mo{constructor(){super(new Hi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},br=class extends Er{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.target=new rt,this.shadow=new Eh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Xi=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var qa=class extends bi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Fi.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Fi.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Fi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Fi.add(e,c),r.manager.itemStart(e)}};var Tr=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=lf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=lf();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function lf(){return performance.now()}var bh=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){dn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let o=this._workIndex*r;dn.multiplyQuaternionsFlat(e,o,e,t,e,n),dn.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){let o=1-i;for(let a=0;a!==r;++a){let c=t+a;e[c]=e[c]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*i}}},Yh="\\[\\]\\.:\\/",nv=new RegExp("["+Yh+"]","g"),$h="[^"+Yh+"]",iv="[^"+Yh.replace("\\.","")+"]",sv=/((?:WC+[\/:])*)/.source.replace("WC",$h),rv=/(WCOD+)?/.source.replace("WCOD",iv),ov=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$h),av=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$h),cv=new RegExp("^"+sv+rv+ov+av+"$"),lv=["material","materials","bones","map"],Th=class{constructor(e,t,n){let i=n||yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},yt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(nv,"")}static parseTrackName(e){let t=cv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);lv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[i];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};yt.Composite=Th;yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};yt.prototype.GetterByBindingType=[yt.prototype._getValue_direct,yt.prototype._getValue_array,yt.prototype._getValue_arrayElement,yt.prototype._getValue_toArray];yt.prototype.SetterByBindingTypeAndVersioning=[[yt.prototype._setValue_direct,yt.prototype._setValue_direct_setNeedsUpdate,yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_array,yt.prototype._setValue_array_setNeedsUpdate,yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_arrayElement,yt.prototype._setValue_arrayElement_setNeedsUpdate,yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_fromArray,yt.prototype._setValue_fromArray_setNeedsUpdate,yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Sh=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,o=r.length,a=new Array(o),c={endingStart:Ks,endingEnd:Ks};for(let l=0;l!==o;++l){let h=r[l].createInterpolant(null);a[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Vh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);let c=a.parameterPositions,l=a.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Qp:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case Gh:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,o=n===jp;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===zh){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){let a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=Zs,i.endingEnd=Zs):(e?i.endingStart=this.zeroSlopeAtStart?Zs:Ks:i.endingStart=ga,t?i.endingEnd=this.zeroSlopeAtEnd?Zs:Ks:i.endingEnd=ga)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,c=o.sampleValues;return a[0]=r,c[0]=t,a[1]=r+e,c[1]=n,this}},hv=new Float32Array(1),Ya=class extends yi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){let d=i[u],f=d.name,g=h[f];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,f));continue}let x=t&&t._propertyBindings[u].binding.parsedPath;g=new bh(yt.create(n,f,x),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,f),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],c=a.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],c.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new za(new Float32Array(2),new Float32Array(2),1,hv),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,o=typeof e=="string"?Mr.findByName(i,e):e,a=o!==null?o.uuid:e,c=this._actionsByClip[a],l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Gh),c!==void 0){let u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;let h=new Sh(this,o,t,n);return this._bindAction(h,l),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?Mr.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,r,o);let a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let o=r.knownActions;for(let a=0,c=o.length;a!==c;++a){let l=o[a];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wh);var Qa={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Sn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},uv=new Hi(-1,1,1,-1,0,1),Kh=class extends _t{constructor(){super(),this.setAttribute("position",new Ke([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ke([0,2,0,0,2,0],2))}},dv=new Kh,Yi=class{constructor(e){this._mesh=new q(dv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,uv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var ec=class extends Sn{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof St?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=qi.clone(e.uniforms),this.material=new St({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Yi(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var yo=class extends Sn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}},tc=class extends Sn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var nc=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new j);this._width=n.width,this._height=n.height,t=new on(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Xn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ec(Qa),this.copyPass.material.blending=Qn,this.clock=new Tr}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,r=this.passes.length;i<r;i++){let o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){let a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}yo!==void 0&&(o instanceof yo?n=!0:o instanceof tc&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new j);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var ic=class extends Sn{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new le}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}};var Hf={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new le(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var wr=class s extends Sn{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new j(e.x,e.y):new j(256,256),this.clearColor=new le(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new on(r,o,{type:Xn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new on(r,o,{type:Xn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let f=new on(r,o,{type:Xn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}let a=Hf;this.highPassUniforms=qi.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new St({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new j(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new S(1,1,1),new S(1,1,1),new S(1,1,1),new S(1,1,1),new S(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=Qa;this.copyUniforms=qi.clone(h.uniforms),this.blendMaterial=new St({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Ot,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new le,this.oldClearAlpha=1,this.basic=new xt,this.fsQuad=new Yi(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new j(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=s.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=s.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new St({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new j(.5,.5)},direction:{value:new j(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new St({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};wr.BlurDirectionX=new j(1,0);wr.BlurDirectionY=new j(0,1);var kf={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var sc=class extends Sn{constructor(){super();let e=kf;this.uniforms=qi.clone(e.uniforms),this.material=new ka({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Yi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ze.getTransfer(this._outputColorSpace)===ft&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Rh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ch?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ih?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===go?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ph?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Lh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var rc=class extends pr{constructor(){super();let e=new vt;e.deleteAttribute("uv");let t=new Rt({side:Xt}),n=new Rt,i=new ti(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);let r=new q(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new q(e,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);let a=new q(e,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);let c=new q(e,n);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);let l=new q(e,n);l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),this.add(l);let h=new q(e,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);let u=new q(e,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);let d=new q(e,Ar(50));d.position.set(-16.116,14.37,8.208),d.scale.set(.1,2.428,2.739),this.add(d);let f=new q(e,Ar(50));f.position.set(-16.109,18.021,-8.207),f.scale.set(.1,2.425,2.751),this.add(f);let g=new q(e,Ar(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);let x=new q(e,Ar(43));x.position.set(-.462,8.89,14.52),x.scale.set(4.38,5.441,.088),this.add(x);let m=new q(e,Ar(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);let p=new q(e,Ar(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Ar(s){let e=new xt;return e.color.setScalar(s),e}var Wf=["Ph\xE0m Nh\xE2n","Luy\u1EC7n Kh\xED","Tr\xFAc C\u01A1","Kim \u0110an","Nguy\xEAn Anh","H\xF3a Th\u1EA7n","Luy\u1EC7n H\u01B0","H\u1EE3p Th\u1EC3","\u0110\u1EA1i Th\u1EEBa","\u0110\u1ED9 Ki\u1EBFp","Ch\xE2n Ti\xEAn","Kim Ti\xEAn","\u0110\u1EA1i La Kim Ti\xEAn","Ti\xEAn V\u01B0\u01A1ng","Ti\xEAn \u0110\u1EBF"],Xf=["S\u01A1 k\u1EF3","Trung k\u1EF3","H\u1EADu k\u1EF3","\u0110\u1EA1i vi\xEAn m\xE3n"],wM=Wf.length*Xf.length-1,vs=[10134706,9425919,6219432,16765002,16751164,16735870,12614655,7310335,4190463,16773754,16777215,16763196,16743410,8126417,16771496],$i=s=>Math.floor(s/4),fv=s=>s%4,vo=s=>`${Wf[$i(s)]} ${Xf[fv(s)]}`;var Ms={kiem:10479871,loi:11832575,hoa:16738858,bang:9430783,long:16763210,ma:12720191,phong:9306036,tho:14198362,quang:16774064};var et=(s,e,t,n,i,r,o,a,c,l={})=>({key:s,name:e,el:t,vfx:n,power:i,cd:r,range:o,aoe:a,minLv:c,...l}),pv=[et("kiemkhi","Ki\u1EBFm Kh\xED","kiem","qiwave",1.2,2.2,14,0,0),et("phikiem","Phi Ki\u1EBFm","kiem","flysword",1.6,3.5,22,0,6),et("kiemtran","Ki\u1EBFm Tr\u1EADn","kiem","swordarray",2.4,9,16,6,14),et("thienkiemtram","Thi\xEAn Ki\u1EBFm Tr\u1EA3m","kiem","slash",3.4,12,10,4,24),et("vankiem","V\u1EA1n Ki\u1EBFm Quy T\xF4ng","kiem","swordrain",5.5,22,26,10,36),et("loidien","L\xF4i \u0110i\u1EC7n","loi","bolt",1.3,2.4,18,0,0),et("thienloi","Thi\xEAn L\xF4i","loi","thunder",2.6,9,22,5,12),et("loilong","L\xF4i Long","loi","lightdragon",3.6,13,24,5,24),et("cuuthienthanloi","C\u1EEDu Thi\xEAn Th\u1EA7n L\xF4i","loi","thunder",5.8,24,28,11,38),et("hoacau","H\u1ECFa C\u1EA7u","hoa","fireball",1.3,2.4,18,2,0),et("hoalong","H\u1ECFa Long","hoa","firedragon",3.2,12,22,4,16),et("tammuoi","Tam Mu\u1ED9i Ch\xE2n H\u1ECFa","hoa","flamepillar",3,10,18,4,22),et("phanthien","Ph\u1EA7n Thi\xEAn Li\u1EC7t Di\u1EC5m","hoa","meteor",5.6,24,26,10,38),et("bangtien","B\u0103ng Ti\u1EC5n","bang","icearrow",1.25,2.2,20,0,0),et("hanbangtran","H\xE0n B\u0103ng Tr\u1EADn","bang","icefield",2.2,10,16,7,12),et("banglong","B\u0103ng Long","bang","icedragon",3.4,13,22,5,24),et("tuyetdoibangphong","Tuy\u1EC7t \u0110\u1ED1i B\u0103ng Phong","bang","icefield",5.2,24,22,11,38),et("longtrao","Long Tr\u1EA3o","long","claw",1.4,2.6,8,0,0),et("longkhieu","Long Khi\u1EBFu","long","roar",2.2,9,12,7,10),et("thanlong","Th\u1EA7n Long Gi\xE1ng Th\u1EBF","long","dragon",4.2,16,26,7,28),et("cuulong","C\u1EEDu Long Di\u1EC7t Th\u1EBF","long","dragon",6.2,26,30,12,42),et("matrao","Ma Tr\u1EA3o","ma","claw",1.4,2.4,9,0,0),et("huyetmachuong","Huy\u1EBFt Ma Ch\u01B0\u1EDFng","ma","demonpalm",2.4,8,14,3,10),et("malong","Ma Long","ma","bloodwave",3.4,13,20,6,22),et("dietthemaquang","Di\u1EC7t Th\u1EBF Ma Quang","ma","darkbeam",5.8,24,30,6,38),et("phongnhan","Phong Nh\u1EADn","phong","slash",1.2,2,12,0,0),et("cuongphong","Cu\u1ED3ng Phong L\u1ED1c","phong","tornado",2.4,9,18,6,12),et("vandiep","V\u1EA1n Di\u1EC7p Phi Hoa","phong","leafstorm",3.2,12,20,6,24),et("daiquyen","\u0110\u1EA1i L\u1EF1c Quy\u1EC1n","tho","claw",1.5,2.6,6,0,0),et("liasonphat","Li\u1EC7t S\u01A1n Ch\u1EA5n","tho","quake",2.6,10,10,7,12),et("thienthach","Thi\xEAn Th\u1EA1ch L\u1EA1c","tho","rockfall",3.8,14,22,6,26),et("thanhquang","Th\xE1nh Quang","quang","holybeam",1.1,2.4,18,0,0),et("hoiphuc","H\u1ED3i Xu\xE2n Thu\u1EADt","quang","heal",0,8,16,8,4,{heal:2.2}),et("kimcang","Kim Cang H\u1ED9 Th\u1EC3","quang","shield",0,14,14,9,10,{shield:.4}),et("baolien","B\u1EA3o Li\xEAn Th\xE1nh Hoa","quang","lotus",3,14,20,7,24,{heal:1.2}),et("phuonghoang","Ph\u01B0\u1EE3ng Ho\xE0ng Ni\u1EBFt B\xE0n","hoa","phoenix",4.6,20,26,8,32)],AM=new Map(pv.map(s=>[s.key,s])),qf=[{key:"kiemtu",name:"Ki\u1EBFm Tu",els:["kiem","phong"],weapon:"sword",hp:1,atk:1.15,def:.9,spd:1.1,crit:.14,role:"melee"},{key:"daotu",name:"\u0110ao Tu",els:["kiem","tho"],weapon:"saber",hp:1.15,atk:1.15,def:1,spd:.95,crit:.12,role:"melee"},{key:"phapsu",name:"Ph\xE1p S\u01B0",els:["hoa","loi"],weapon:"staff",hp:.85,atk:1.25,def:.8,spd:.95,crit:.1,role:"ranged"},{key:"matu",name:"Ma Tu",els:["ma","hoa"],weapon:"claw",hp:1.05,atk:1.2,def:.9,spd:1.05,crit:.16,role:"melee"},{key:"tiennu",name:"Ti\xEAn N\u1EEF",els:["quang","bang"],weapon:"ribbon",hp:.9,atk:1,def:.9,spd:1.1,crit:.1,role:"support"},{key:"longtoc",name:"Long T\u1ED9c",els:["long","loi"],weapon:"spear",hp:1.25,atk:1.1,def:1.1,spd:1,crit:.1,role:"melee"},{key:"yeutoc",name:"Y\xEAu T\u1ED9c",els:["phong","ma"],weapon:"claw",hp:1,atk:1.1,def:.9,spd:1.25,crit:.18,role:"melee"},{key:"thetu",name:"Th\u1EC3 Tu",els:["tho","long"],weapon:"fist",hp:1.4,atk:1,def:1.3,spd:.9,crit:.08,role:"melee"},{key:"tranphap",name:"Tr\u1EADn Ph\xE1p S\u01B0",els:["kiem","bang"],weapon:"flag",hp:.9,atk:1.15,def:.95,spd:.9,crit:.1,role:"ranged"},{key:"luyendan",name:"Luy\u1EC7n \u0110an S\u01B0",els:["hoa","quang"],weapon:"cauldron",hp:1,atk:.95,def:1,spd:.95,crit:.08,role:"support"},{key:"kiemtien",name:"Ki\u1EBFm Ti\xEAn",els:["kiem","quang"],weapon:"twin",hp:1,atk:1.3,def:.9,spd:1.15,crit:.18,role:"melee"},{key:"mavuong",name:"Ma V\u01B0\u01A1ng",els:["ma","loi"],weapon:"saber",hp:1.25,atk:1.25,def:1.05,spd:.95,crit:.12,role:"melee"},{key:"thienton",name:"Thi\xEAn T\xF4n",els:["quang","loi"],weapon:"fan",hp:1.1,atk:1.2,def:1.1,spd:1,crit:.12,role:"ranged"},{key:"loitu",name:"L\xF4i Tu",els:["loi","kiem"],weapon:"staff",hp:.95,atk:1.25,def:.85,spd:1.05,crit:.14,role:"ranged"},{key:"banghoa",name:"B\u0103ng Hoa Ti\xEAn",els:["bang","phong"],weapon:"fan",hp:.9,atk:1.2,def:.9,spd:1.05,crit:.12,role:"ranged"}],Yf=new Map(qf.map(s=>[s.key,s])),zf=[13617336,2767470,8001062,2038318,13214644,1462858,5974906,7031338,2308443,12077599,13156004,2821400,13482378,3877498,10467016],Vf=[8374527,14266714,16764778,11673163,16748481,7336134,12946431,14721882,10473727,16757575,13938487,16723285,16766826,10849279,9430783],Gf=[1118481,1774608,15329010,2759219,3810326,858922,12174289,5902352],Ki=qf.flatMap((s,e)=>[!1,!0].map(t=>({id:e*2+(t?1:0),cls:s.key,female:t,name:`${s.name} ${t?"n\u1EEF":"nam"}`,robe:zf[(e+(t?7:0))%zf.length],trim:Vf[(e+(t?3:0))%Vf.length],hair:Gf[(e*3+(t?1:0))%Gf.length],hairStyle:(e+(t?2:0))%5,skin:[15913654,15253919,16178374,14265996][(e+(t?1:0))%4]})));var mv=[{key:"phikiem",name:"Phi Ki\u1EBFm",icon:"\u{1F5E1}\uFE0F",color:10479871,shape:"sword",atk:.04,def:0,hp:0},{key:"thanhlong",name:"Thanh Long Ki\u1EBFm",icon:"\u{1F409}",color:5111728,shape:"sword",atk:.06,def:0,hp:.01},{key:"thandinh",name:"Th\u1EA7n \u0110\u1EC9nh",icon:"\u{1F3FA}",color:14721882,shape:"cauldron",atk:.01,def:.03,hp:.05},{key:"huyetma",name:"Huy\u1EBFt Ma \u0110ao",icon:"\u{1F52A}",color:16723285,shape:"saber",atk:.08,def:0,hp:0},{key:"longchau",name:"Long Ch\xE2u",icon:"\u{1F52E}",color:16765002,shape:"pearl",atk:.05,def:.02,hp:.03},{key:"kimchung",name:"Kim Chung",icon:"\u{1F514}",color:16763196,shape:"bell",atk:0,def:.08,hp:.04},{key:"cankhon",name:"C\xE0n Kh\xF4n Th\xE1p",icon:"\u{1F5FC}",color:12159999,shape:"tower",atk:.05,def:.06,hp:.04},{key:"phuongtruong",name:"Ph\u01B0\u1EE3ng Ho\xE0ng Tr\u01B0\u1EE3ng",icon:"\u{1F525}",color:16742954,shape:"staff",atk:.09,def:.02,hp:.03},{key:"baolien",name:"B\u1EA3o Li\xEAn \u0110\u0103ng",icon:"\u{1FAB7}",color:16751317,shape:"lotus",atk:.06,def:.06,hp:.08},{key:"hondon",name:"H\u1ED7n \u0110\u1ED9n Chung",icon:"\u{1F30C}",color:8126417,shape:"bell",atk:.12,def:.1,hp:.1}],Zi=new Map(mv.map(s=>[s.key,s]));var $f=[{key:"thienkiem",name:"Thi\xEAn Ki\u1EBFm T\xF4ng",color:8374527,icon:"\u2694\uFE0F",words:/^(tong ?1|thien ?kiem( tong)?)$/},{key:"huyetma",name:"Huy\u1EBFt Ma \u0110i\u1EC7n",color:16723285,icon:"\u{1FA78}",words:/^(tong ?2|huyet ?ma( dien)?)$/},{key:"thuylong",name:"Th\u1EE7y Long Cung",color:4190463,icon:"\u{1F30A}",words:/^(tong ?3|thuy ?long( cung)?)$/},{key:"phuonghoa",name:"Ph\u01B0\u1EE3ng H\u1ECFa C\xE1c",color:16753210,icon:"\u{1F525}",words:/^(tong ?4|phuong ?hoa( cac)?)$/}],oc=new Map($f.map(s=>[s.key,s])),ac=[{key:"haclong",name:"H\u1EAFc Long",body:"dragon",el:"ma",color:1709094,color2:9059839,hp:1,atk:1,horns:2,skills:["Long T\u1EE9c H\u1EAFc Di\u1EC5m","V\u0129 Qu\xE9t","H\u1EAFc Long Di\u1EC7t Th\u1EBF"]},{key:"cuuvihi",name:"C\u1EEDu V\u0129 H\u1ED3",body:"fox",el:"hoa",color:16773344,color2:16743096,hp:.9,atk:1.05,tails:9,skills:["H\u1ED3 H\u1ECFa","M\u1ECB Ho\u1EB7c","C\u1EEDu V\u0129 Ph\u1EA7n Thi\xEAn"]},{key:"maton",name:"Ma T\xF4n",body:"giant",el:"ma",color:2755864,color2:16723285,hp:1,atk:1.1,horns:2,skills:["Ma Ch\u01B0\u1EDFng","Huy\u1EBFt H\u1EA3i","V\u1EA1n Ma Tri\u1EC1u T\xF4ng"]},{key:"thienma",name:"Thi\xEAn Ma",body:"giant",el:"loi",color:1314858,color2:11832575,hp:1.05,atk:1.1,horns:4,skills:["Ma L\xF4i","Thi\xEAn Ma Gi\u1EA3i Th\u1EC3","Ma Di\u1EC7t C\xE0n Kh\xF4n"]},{key:"huyetma",name:"Huy\u1EBFt Ma",body:"giant",el:"ma",color:5900820,color2:16726843,hp:1,atk:1.15,horns:1,skills:["Huy\u1EBFt Tr\u1EA3o","Huy\u1EBFt V\u0169","Huy\u1EBFt Ma \u0110\u1EA1i Ph\xE1p"]},{key:"kimsidaibang",name:"Kim S\xED \u0110\u1EA1i B\u1EB1ng",body:"bird",el:"phong",color:13934615,color2:16773544,hp:.95,atk:1.1,skills:["Kim V\u0169","Cu\u1ED3ng Phong","B\u1EB1ng Tr\xECnh V\u1EA1n L\xFD"]},{key:"bachho",name:"B\u1EA1ch H\u1ED5",body:"beast",el:"kiem",color:16053492,color2:8374527,hp:1,atk:1.15,skills:["H\u1ED5 Tr\u1EA3o","H\u1ED5 Khi\u1EBFu","B\u1EA1ch H\u1ED5 S\xE1t Tr\u1EADn"]},{key:"huyenvu",name:"Huy\u1EC1n V\u0169",body:"turtle",el:"bang",color:2050634,color2:9430783,hp:1.4,atk:.85,skills:["Huy\u1EC1n Th\u1EE7y","Quy Gi\xE1p","B\u1EAFc Minh H\xE0n B\u0103ng"]},{key:"chutuoc",name:"Chu T\u01B0\u1EDBc",body:"bird",el:"hoa",color:16730650,color2:16765002,hp:.95,atk:1.15,skills:["Chu T\u01B0\u1EDBc H\u1ECFa V\u0169","Li\u1EC7t Di\u1EC5m","Nam Minh Ly H\u1ECFa"]},{key:"kylan",name:"K\u1EF3 L\xE2n",body:"beast",el:"quang",color:16766826,color2:7336134,hp:1.1,atk:1,horns:1,skills:["K\u1EF3 L\xE2n \u0110\u1EA1p","Th\xE1nh Quang","K\u1EF3 L\xE2n Gi\xE1ng Th\u1EBF"]},{key:"thaothiet",name:"Thao Thi\u1EBFt",body:"beast",el:"ma",color:3811866,color2:16747050,hp:1.2,atk:1.05,horns:2,skills:["Th\xF4n Ph\u1EC7","Ma Khi\u1EBFu","Thao Thi\u1EBFt Nu\u1ED1t Tr\u1EDDi"]},{key:"hondoncuthu",name:"H\u1ED7n \u0110\u1ED9n C\u1EF1 Th\xFA",body:"beast",el:"tho",color:2829114,color2:8126417,hp:1.35,atk:1,horns:3,skills:["H\u1ED7n \u0110\u1ED9n Va","\u0110\u1ECBa Ch\u1EA5n","H\u1ED7n \u0110\u1ED9n Khai Thi\xEAn"]},{key:"thienloithan",name:"Thi\xEAn L\xF4i Th\u1EA7n",body:"giant",el:"loi",color:2241114,color2:10473727,hp:1.05,atk:1.2,skills:["L\xF4i Ch\xF9y","L\xF4i V\u1EF1c","C\u1EEDu Ti\xEAu Th\u1EA7n L\xF4i"]},{key:"cuuthienhuyennu",name:"C\u1EEDu Thi\xEAn Huy\u1EC1n N\u1EEF",body:"giant",el:"quang",color:16118015,color2:16751317,hp:1,atk:1.15,skills:["Thi\xEAn N\u1EEF T\xE1n Hoa","Huy\u1EC1n Quang","C\u1EEDu Thi\xEAn Huy\u1EC1n Di\u1EC7u"]},{key:"thuongcothanlong",name:"Th\u01B0\u1EE3ng C\u1ED5 Th\u1EA7n Long",body:"dragon",el:"long",color:3809894,color2:16765002,hp:1.6,atk:1.25,horns:2,skills:["Th\u1EA7n Long T\u1EE9c","Long V\u0129 Ph\xE1 Thi\xEAn","Th\u01B0\u1EE3ng C\u1ED5 Long Uy"]}],Mo=new Map(ac.map(s=>[s.key,s]));var Eo=[{xu:1,key:"linhkhi",name:"Linh Kh\xED",icon:"\u2728",skill:"kiemkhi",vfx:"qiwave",bossMul:1,desc:"H\u1EA5p thu linh kh\xED, tu luy\u1EC7n nhanh"},{xu:5,key:"kiemkhi",name:"Ki\u1EBFm Kh\xED",icon:"\u{1F300}",skill:"kiemkhi",vfx:"qiwave",artifact:"phikiem",bossMul:1.2,desc:"Ph\xF3ng ki\u1EBFm kh\xED \xB7 n\xE2ng Phi Ki\u1EBFm"},{xu:10,key:"phikiem",name:"Phi Ki\u1EBFm",icon:"\u{1F5E1}\uFE0F",skill:"phikiem",vfx:"flysword",artifact:"thanhlong",bossMul:1.3,desc:"G\u1ECDi phi ki\u1EBFm \xB7 n\xE2ng Thanh Long Ki\u1EBFm"},{xu:30,key:"linhdan",name:"Linh \u0110an",icon:"\u{1F48A}",skill:"hoiphuc",vfx:"heal",artifact:"thandinh",bossMul:1.3,desc:"Luy\u1EC7n \u0111an h\u1ED3i m\xE1u, tu vi l\u1EDBn \xB7 n\xE2ng Th\u1EA7n \u0110\u1EC9nh"},{xu:50,key:"kiemtran",name:"Ki\u1EBFm Tr\u1EADn",icon:"\u2694\uFE0F",skill:"kiemtran",vfx:"swordarray",artifact:"huyetma",bossMul:1.4,desc:"Tri\u1EC7u h\u1ED3i ki\u1EBFm tr\u1EADn di\u1EC7n r\u1ED9ng \xB7 n\xE2ng Huy\u1EBFt Ma \u0110ao"},{xu:99,key:"hoalong",name:"H\u1ECFa Long",icon:"\u{1F432}",skill:"hoalong",vfx:"firedragon",artifact:"longchau",bossMul:1.5,desc:"Tri\u1EC7u h\u1ED3i H\u1ECFa Long \xB7 n\xE2ng Long Ch\xE2u"},{xu:199,key:"thienloi",name:"Thi\xEAn L\xF4i Gi\xE1ng Th\u1EBF",icon:"\u26A1",skill:"cuuthienthanloi",vfx:"thunder",artifact:"kimchung",bossMul:1.6,desc:"S\u1EA5m s\xE9t gi\xE1ng xu\u1ED1ng chi\u1EBFn tr\u01B0\u1EDDng \xB7 n\xE2ng Kim Chung"},{xu:299,key:"cankhon",name:"C\xE0n Kh\xF4n Th\xE1p",icon:"\u{1F5FC}",skill:"liasonphat",vfx:"quake",artifact:"cankhon",bossMul:1.7,desc:"Th\xE1p tr\u1EA5n \xE1p \u0111\u1ED1i th\u1EE7 \xB7 n\xE2ng C\xE0n Kh\xF4n Th\xE1p"},{xu:500,key:"thanthu",name:"Tri\u1EC7u H\u1ED3i Th\u1EA7n Th\xFA",icon:"\u{1F985}",skill:"phuonghoang",vfx:"phoenix",artifact:"phuongtruong",bossMul:1.9,desc:"Ph\u01B0\u1EE3ng Ho\xE0ng l\u1EEDa xu\u1EA5t th\u1EBF \xB7 n\xE2ng Ph\u01B0\u1EE3ng Ho\xE0ng Tr\u01B0\u1EE3ng"},{xu:999,key:"vankiem",name:"V\u1EA1n Ki\u1EBFm Quy T\xF4ng",icon:"\u{1F31F}",skill:"vankiem",vfx:"swordrain",artifact:"baolien",bossMul:2.1,desc:"M\u01B0a ki\u1EBFm kh\u1EAFp tr\u1EDDi \xB7 n\xE2ng B\u1EA3o Li\xEAn \u0110\u0103ng",global:!0},{xu:2999,key:"thanlong",name:"Th\u1EA7n Long Gi\xE1ng Th\u1EBF",icon:"\u{1F451}",skill:"cuulong",vfx:"dragon",artifact:"hondon",bossMul:2.5,desc:"VIP: Th\u1EA7n Long to\xE0n b\u1EA3n \u0111\u1ED3, t\xEAn b\u1EA1n r\u1EF1c s\xE1ng \xB7 n\xE2ng H\u1ED7n \u0110\u1ED9n Chung",global:!0}];var cc=["Tu S\u0129","Tinh Anh","Ch\xE2n Truy\u1EC1n","Th\xE1nh T\u1EED","Ti\xEAn Qu\xE2n","Ch\xED T\xF4n"],bo=[16777215,10479871,7208858,16765002,16743410,16730666];var Kf=[0,2,4,7,9],lc=class{constructor(){z(this,"ctx",null);z(this,"master");z(this,"sfx");z(this,"mus");z(this,"rev");z(this,"bufs",new Map);z(this,"files",[]);z(this,"audio",null);z(this,"track",0);z(this,"nextNote",0);z(this,"step",0);z(this,"intense",0);z(this,"voices",[]);z(this,"speaking",!1);z(this,"muted",!1);z(this,"musicOn",!0)}unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}let e=new AudioContext;this.ctx=e,this.master=e.createGain(),this.master.gain.value=this.muted?0:.9,this.master.connect(e.destination);let t=e.createDynamicsCompressor();t.threshold.value=-14,t.ratio.value=4,t.connect(this.master),this.sfx=e.createGain(),this.sfx.gain.value=.7,this.sfx.connect(t),this.mus=e.createGain(),this.mus.gain.value=.28,this.mus.connect(t),this.rev=e.createConvolver();let n=e.sampleRate*2.8,i=e.createBuffer(2,n,e.sampleRate);for(let o=0;o<2;o++){let a=i.getChannelData(o);for(let c=0;c<n;c++)a[c]=(Math.random()*2-1)*Math.pow(1-c/n,3)}this.rev.buffer=i;let r=e.createGain();r.gain.value=.35,this.rev.connect(r),r.connect(this.mus);for(let o of["boom-0","boom-1","boom-2","zap","shield","ring","coin","coin-big","warp","launch","boost","bomb-low","bomb-crack"])fetch(`sfx/${o}.ogg`).then(a=>a.ok?a.arrayBuffer():Promise.reject()).then(a=>e.decodeAudioData(a)).then(a=>this.bufs.set(o,a)).catch(()=>{});fetch("/music/list.json").then(o=>o.json()).then(o=>{this.files=o,o.length&&this.playFile()}).catch(()=>{}),this.nextNote=e.currentTime+.2}setMuted(e){this.muted=e,this.master&&(this.master.gain.value=e?0:.9),this.audio&&(this.audio.muted=e)}setMusic(e){this.musicOn=e,this.mus&&(this.mus.gain.value=e?.28:0),this.audio&&(e?this.audio.play().catch(()=>{}):this.audio.pause())}setIntensity(e){this.intense=e}playFile(){if(!this.files.length)return;let e=this.audio??(this.audio=new Audio);e.src=this.files[this.track++%this.files.length],e.volume=.35,e.muted=this.muted,e.onended=()=>this.playFile(),this.musicOn&&e.play().catch(()=>{})}pluck(e,t,n=.18,i=1.6){let r=this.ctx,o=r.createOscillator(),a=r.createOscillator(),c=r.createGain(),l=r.createBiquadFilter();o.type="triangle",o.frequency.value=e,a.type="sine",a.frequency.value=e*2.01,l.type="lowpass",l.frequency.setValueAtTime(e*8,t),l.frequency.exponentialRampToValueAtTime(e*1.5,t+i),c.gain.setValueAtTime(0,t),c.gain.linearRampToValueAtTime(n,t+.005),c.gain.exponentialRampToValueAtTime(8e-4,t+i),o.connect(l),a.connect(l),l.connect(c),c.connect(this.mus),c.connect(this.rev),o.start(t),a.start(t),o.stop(t+i),a.stop(t+i)}pad(e,t,n){let i=this.ctx,r=i.createGain();r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(.05,t+n*.3),r.gain.linearRampToValueAtTime(0,t+n);for(let o of[-6,6]){let a=i.createOscillator();a.type="sawtooth",a.frequency.value=e,a.detune.value=o;let c=i.createBiquadFilter();c.type="lowpass",c.frequency.value=700,a.connect(c),c.connect(r),a.start(t),a.stop(t+n)}r.connect(this.mus),r.connect(this.rev)}drum(e,t=.3){let n=this.ctx,i=n.createOscillator(),r=n.createGain();i.frequency.setValueAtTime(110,e),i.frequency.exponentialRampToValueAtTime(40,e+.3),r.gain.setValueAtTime(t,e),r.gain.exponentialRampToValueAtTime(.001,e+.4),i.connect(r),r.connect(this.mus),i.start(e),i.stop(e+.45)}update(){let e=this.ctx;if(!e||this.files.length||!this.musicOn)return;let t=this.intense>0?.26:.42;for(;this.nextNote<e.currentTime+.3;){let n=this.nextNote,i=this.step++,r=146.83,o=[0,3,4,2][Math.floor(i/16)%4];i%16===0&&this.pad(r*Math.pow(2,Kf[o]/12)/2,n,t*16);let a=[0,2,1,3,4,3,2,1,0,1,2,4,3,2,1,2];if(Math.random()<(this.intense?.85:.6)){let c=(a[i%16]+o)%5,l=Math.floor((a[i%16]+o)/5)+(i%32>24?1:0);this.pluck(r*2*Math.pow(2,(Kf[c]+12*l)/12),n,.12+Math.random()*.05)}this.intense>0&&i%4===0&&this.drum(n,i%8===0?.35:.2),this.intense>1&&i%2===1&&this.drum(n,.12),this.nextNote+=t}}play(e,t=1,n=1){let i=this.ctx,r=this.bufs.get(e);if(!i)return;if(!r){this.synth(e,t);return}let o=i.createBufferSource(),a=i.createGain();o.buffer=r,o.playbackRate.value=n*(.94+Math.random()*.12),a.gain.value=t,o.connect(a),a.connect(this.sfx),o.start()}synth(e,t){let n=this.ctx,i=n.currentTime,r=n.createOscillator(),o=n.createGain();r.type=e.startsWith("zap")?"sawtooth":"sine",r.frequency.setValueAtTime(e.startsWith("boom")?120:800,i),r.frequency.exponentialRampToValueAtTime(e.startsWith("boom")?30:200,i+.3),o.gain.setValueAtTime(.25*t,i),o.gain.exponentialRampToValueAtTime(.001,i+.35),r.connect(o),o.connect(this.sfx),r.start(i),r.stop(i+.4)}chime(e=!1){let t=this.ctx;if(!t)return;let n=t.currentTime;[0,4,7,12,e?16:12].forEach((i,r)=>this.pluck(587.33*Math.pow(2,i/12),n+r*.07,.15,2.2))}voice(e){this.voices.push(e),this.voices.length>4&&this.voices.shift(),this.nextVoice()}nextVoice(){if(this.speaking||!this.voices.length)return;this.speaking=!0;let e=new Audio(this.voices.shift());e.volume=1,e.muted=this.muted,this.mus&&(this.mus.gain.value=this.musicOn?.12:0),this.audio&&(this.audio.volume=.15);let t=()=>{this.speaking=!1,this.mus&&(this.mus.gain.value=this.musicOn?.28:0),this.audio&&(this.audio.volume=.35),this.nextVoice()};e.onended=t,e.onerror=t,e.play().catch(t)}};function Zh(s,e){if(e===Ef)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===xo||e===Ka){let t=s.getIndex();if(t===null){let o=[],a=s.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===xo)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var hc=class extends bi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new iu(t)}),this.register(function(t){return new su(t)}),this.register(function(t){return new fu(t)}),this.register(function(t){return new pu(t)}),this.register(function(t){return new mu(t)}),this.register(function(t){return new ou(t)}),this.register(function(t){return new au(t)}),this.register(function(t){return new cu(t)}),this.register(function(t){return new lu(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new hu(t)}),this.register(function(t){return new ru(t)}),this.register(function(t){return new du(t)}),this.register(function(t){return new uu(t)}),this.register(function(t){return new eu(t)}),this.register(function(t){return new gu(t)}),this.register(function(t){return new xu(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Xi.extractUrlBase(e);o=Xi.resolveURL(l,this.path)}else o=Xi.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new po(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===ep){try{o[Je.KHR_BINARY_GLTF]=new _u(e)}catch(u){i&&i(u);return}r=JSON.parse(o[Je.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Su(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case Je.KHR_MATERIALS_UNLIT:o[u]=new tu;break;case Je.KHR_DRACO_MESH_COMPRESSION:o[u]=new yu(r,this.dracoLoader);break;case Je.KHR_TEXTURE_TRANSFORM:o[u]=new vu;break;case Je.KHR_MESH_QUANTIZATION:o[u]=new Mu;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function gv(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}var Je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},eu=class{constructor(e){this.parser=e,this.name=Je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new le(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],tn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new br(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ti(h),l.distance=u;break;case"spot":l=new Xa(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Ti(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},tu=class{constructor(){this.name=Je.KHR_MATERIALS_UNLIT}getMaterialType(){return xt}extendParams(e,t,n){let i=[];e.color=new le(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],tn),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Pt))}return Promise.all(i)}},nu=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},iu=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new j(a,a)}return Promise.all(r)}},su=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},ru=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},ou=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new le(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],tn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Pt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},au=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},cu=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new le().setRGB(a[0],a[1],a[2],tn),Promise.all(r)}},lu=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},hu=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new le().setRGB(a[0],a[1],a[2],tn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Pt)),Promise.all(r)}},uu=class{constructor(e){this.parser=e,this.name=Je.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},du=class{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},fu=class{constructor(e){this.parser=e,this.name=Je.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},pu=class{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},mu=class{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},gu=class{constructor(e){this.name=Je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},xu=class{constructor(e){this.name=Je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==Un.TRIANGLES&&l.mode!==Un.TRIANGLE_STRIP&&l.mode!==Un.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(let g of u){let x=new Ve,m=new S,p=new dn,v=new S(1,1,1),y=new mn(g.geometry,g.material,d);for(let _=0;_<d;_++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&v.fromBufferAttribute(c.SCALE,_),y.setMatrixAt(_,x.compose(m,p,v));for(let _ in c)if(_==="_COLOR_0"){let C=c[_];y.instanceColor=new ps(C.array,C.itemSize,C.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&g.geometry.setAttribute(_,c[_]);rt.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},ep="glTF",To=12,Zf={JSON:1313821514,BIN:5130562},_u=class{constructor(e){this.name=Je.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,To),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ep)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-To,r=new DataView(e,To),o=0;for(;o<i;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===Zf.JSON){let l=new Uint8Array(e,To+o,a);this.content=n.decode(l)}else if(c===Zf.BIN){let l=To+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},yu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=bu[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=bu[h]||h.toLowerCase();if(o[h]!==void 0){let d=n.accessors[e.attributes[h]],f=Rr[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let g in f.attributes){let x=f.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}u(f)},a,l,tn,d)})})}},vu=class{constructor(){this.name=Je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Mu=class{constructor(){this.name=Je.KHR_MESH_QUANTIZATION}},uc=class extends Vi{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*l,x=g-l,m=-2*f+3*d,p=f-d,v=1-m,y=p-d+u;for(let _=0;_!==a;_++){let C=o[x+_+a],w=o[x+_+c]*h,R=o[g+_+a],I=o[g+_]*h;r[_]=v*C+y*w+m*R+p*I}return r}},xv=new dn,Eu=class extends uc{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return xv.fromArray(r).normalize().toArray(r),r}},Un={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Rr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Jf={9728:Qt,9729:un,9984:Dh,9985:$r,9986:$s,9987:jn},jf={33071:pi,33648:to,10497:xi},Jh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},bu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ji={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},_v={CUBICSPLINE:void 0,LINEAR:lr,STEP:cr},jh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function yv(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Rt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Pn})),s.DefaultMaterial}function Es(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ti(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function vv(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function Mv(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ev(s){let e,t=s.extensions&&s.extensions[Je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Qh(t.attributes):e=s.indices+":"+Qh(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Qh(s.targets[n]);return e}function Qh(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Tu(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function bv(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Tv=new Ve,Su=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new gv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new Ga(this.options.manager):this.textureLoader=new qa(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new po(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Es(r,a,i),Ti(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Je.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(Xi.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=Jh[i.type],a=Rr[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new Tt(l,o,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=Jh[i.type],l=Rr[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,x,m;if(f&&f!==u){let p=Math.floor(d/f),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,y=t.cache.get(v);y||(x=new l(a,p*f,i.count*f/h),y=new mr(x,f/h),t.cache.add(v,y)),m=new fs(y,c,d%f/h,g)}else a===null?x=new l(i.count*c):x=new l(a,d,i.count*c),m=new Tt(x,c,g);if(i.sparse!==void 0){let p=Jh.SCALAR,v=Rr[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,C=new v(o[1],y,i.sparse.count*p),w=new l(o[2],_,i.sparse.count*c);a!==null&&(m=new Tt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,I=C.length;R<I;R++){let b=C[R];if(m.setX(b,w[R*c]),c>=2&&m.setY(b,w[R*c+1]),c>=3&&m.setZ(b,w[R*c+2]),c>=4&&m.setW(b,w[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return h.magFilter=Jf[d.magFilter]||un,h.minFilter=Jf[d.minFilter]||jn,h.wrapS=jf[d.wrapS]||xi,h.wrapT=jf[d.wrapT]||xi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Qt&&h.minFilter!==un,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=i.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(x){let m=new qt(x);m.needsUpdate=!0,d(m)}),t.load(Xi.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),Ti(u,o),u.userData.mimeType=o.mimeType||bv(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Je.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[Je.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[Je.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new ms,fn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new oo,fn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Rt}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[Je.KHR_MATERIALS_UNLIT]){let u=i[Je.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new le(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],tn),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,Pt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Dt);let h=r.alphaMode||jh.OPAQUE;if(h===jh.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===jh.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==xt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new j(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==xt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==xt){let u=r.emissiveFactor;a.emissive=new le().setRGB(u[0],u[1],u[2],tn)}return r.emissiveTexture!==void 0&&o!==xt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Pt)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),Ti(u,r),t.associations.set(u,{materials:e}),r.extensions&&Es(i,u,r),u})}createUniqueName(e){let t=yt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[Je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Qf(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=Ev(l),u=i[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[Je.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Qf(new _t,l,t),i[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?yv(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,g=h.length;f<g;f++){let x=h[f],m=o[f],p,v=l[f];if(m.mode===Un.TRIANGLES||m.mode===Un.TRIANGLE_STRIP||m.mode===Un.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Ra(x,v):new q(x,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Un.TRIANGLE_STRIP?p.geometry=Zh(p.geometry,Ka):m.mode===Un.TRIANGLE_FAN&&(p.geometry=Zh(p.geometry,xo));else if(m.mode===Un.LINES)p=new Da(x,v);else if(m.mode===Un.LINE_STRIP)p=new gr(x,v);else if(m.mode===Un.LINE_LOOP)p=new Na(x,v);else if(m.mode===Un.POINTS)p=new ki(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Mv(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Ti(p,r),m.extensions&&Es(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Es(i,u[0],r),u[0];let d=new ce;r.extensions&&Es(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new zt(Sf.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Hi(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ti(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let d=new Ve;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Ia(a,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],g=i.samplers[f.sampler],x=f.target,m=x.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,v=i.parameters!==void 0?i.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],g=u[2],x=u[3],m=u[4],p=[];for(let v=0,y=d.length;v<y;v++){let _=d[v],C=f[v],w=g[v],R=x[v],I=m[v];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();let b=n._createAnimationTracks(_,C,w,R,I);if(b)for(let M=0;M<b.length;M++)p.push(b[M])}return new Mr(r,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Tv)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new ro:l.length>1?h=new ce:l.length===1?h=l[0]:h=new rt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Ti(h,r),r.extensions&&Es(n,h,r),r.matrix!==void 0){let u=new Ve;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new ce;n.name&&(r.name=i.createUniqueName(n.name)),Ti(r,n),n.extensions&&Es(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof fn||d instanceof qt)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],a=e.name?e.name:e.uuid,c=[];Ji[r.path]===Ji.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(Ji[r.path]){case Ji.weights:l=vi;break;case Ji.rotation:l=Mi;break;case Ji.position:case Ji.scale:l=Ei;break;default:switch(n.itemSize){case 1:l=vi;break;case 2:case 3:default:l=Ei;break}break}let h=i.interpolation!==void 0?_v[i.interpolation]:lr,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){let g=new l(c[d]+"."+Ji[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Tu(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Mi?Eu:uc;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Sv(s,e,t){let n=e.attributes,i=new an;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new S(c[0],c[1],c[2]),new S(l[0],l[1],l[2])),a.normalized){let h=Tu(Rr[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new S,c=new S;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let x=Tu(Rr[d.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;let o=new vn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function Qf(s,e,t){let n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){s.setAttribute(a,c)})}for(let o in n){let a=bu[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){let o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return Ze.workingColorSpace!==tn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),Ti(s,e),Sv(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?vv(s,e.targets,t):s})}function tp(s){let e=new Map,t=new Map,n=s.clone();return np(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,o=e.get(i),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function np(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)np(s.children[n],e.children[n],t)}var So=new Map,wv=null;function ip(){return wv??(wv=(async()=>{if(new URLSearchParams(location.search).has("nomodel"))return;let s=[];try{s=await(await fetch("/models/list.json")).json()}catch{return}let e=new URLSearchParams(location.search).get("models");if(e){let i=e.split(",").map(r=>r.trim().toLowerCase());s=s.filter(r=>i.includes(r.replace(/.glb$/i,"").toLowerCase()))}let t=new hc,n=new URLSearchParams(location.search).has("debug")?Object.assign(document.createElement("pre"),{style:"position:fixed;right:8px;top:60px;z-index:99;color:#0ff;background:#000a;font:12px monospace;padding:4px 8px;margin:0"}):null;n&&(document.body.append(n),n.textContent="\u0111ang n\u1EA1p "+s.length+` file
`),await Promise.all(s.filter(i=>/\.glb$/i.test(i)).map(async i=>{try{let r=await t.loadAsync("/models/"+encodeURIComponent(i));n&&(n.textContent+="\u2713 "+i+`
`);let o=new an().setFromObject(r.scene),a=o.getSize(new S);r.scene.traverse(c=>{let l=c;l.isMesh&&(l.castShadow=!0,l.frustumCulled=!1)}),So.set(i.replace(/\.glb$/i,"").toLowerCase(),{scene:r.scene,clips:r.animations,height:Math.max(.01,a.y)})}catch(r){console.warn("Model l\u1ED7i, d\xF9ng b\u1EA3n d\u1EF1ng b\u1EB1ng code:",i,r),n&&(n.textContent+="\u2717 "+i+" "+r.message+`
`)}}))})())}var ji=s=>So.has(s.toLowerCase()),wu=s=>So.get(s.toLowerCase())?.scene??null,dc=s=>[...So.keys()].filter(e=>e.startsWith(s)).sort(),Cr=class{constructor(e,t){z(this,"root",new ce);z(this,"mixer",null);z(this,"actions",new Map);z(this,"current","");let n=So.get(e.toLowerCase()),i=tp(n.scene),r=t>0?t/n.height:1;i.scale.setScalar(r);let o=new an().setFromObject(i);if(i.position.y-=o.min.y,this.root.add(i),n.clips.length){this.mixer=new Ya(i);for(let a of n.clips)this.actions.set(a.name.toLowerCase(),this.mixer.clipAction(a))}}find(e){for(let t of e)for(let[n,i]of this.actions)if(n.includes(t))return[n,i];return null}play(e){let t={idle:["idle","stand"],move:["run","walk","fly"],atk:["attack","slash","punch","bite"],cast:["cast","spell","magic","attack"],hit:["hit","damage","hurt"],down:["die","death","dead"],med:["meditat","sit","idle"],win:["victory","win","cheer","idle"],roar:["roar","scream","attack"],rage:["roar","rage","attack"],die:["die","death"]},n=this.find(t[e]??["idle"])??this.find(["idle"]);if(!n||n[0]===this.current)return;let i=this.actions.get(this.current),r=n[1];r.reset(),r.setLoop(e==="down"||e==="die"?zh:Vh,1/0),r.clampWhenFinished=!0,r.fadeIn(.2).play(),i?.fadeOut(.2),this.current=n[0]}update(e){this.mixer?.update(e)}info(){return`clips: ${[...this.actions.keys()].join(",")} \xB7 \u0111ang ph\xE1t: ${this.current||"(kh\xF4ng)"} \xB7 mixer: ${this.mixer?"c\xF3":"kh\xF4ng"}`}dispose(){this.mixer?.stopAllAction(),this.root.removeFromParent()}};var Qi={value:0},Ir=new Map;function Ae(s,e={}){let t=`s${s}-${e.rough??.6}-${e.metal??0}-${e.emissive??0}-${e.ei??1}-${e.side??0}`,n=Ir.get(t);return n||(n=new Rt({color:s,roughness:e.rough??.6,metalness:e.metal??0,emissive:e.emissive??0,emissiveIntensity:e.ei??1,side:e.side??Pn}),Ir.set(t,n)),n}function On(s,e=0,t=.06){let n=`c${s}-${e}-${t}`,i=Ir.get(n);return i||(i=new Rt({color:s,roughness:.75,metalness:.05,side:Dt,emissive:e,emissiveIntensity:e?.08:0}),i.onBeforeCompile=r=>{r.uniforms.uTime=Qi,r.vertexShader=`uniform float uTime;
`+r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        float wv = uv.y * uv.y;
        transformed.x += sin(uTime * 2.3 + position.y * 4.0 + position.z * 3.0) * ${t.toFixed(3)} * wv;
        transformed.z += cos(uTime * 1.9 + position.y * 3.0 + position.x * 4.0) * ${(t*1.4).toFixed(3)} * wv;`)},i.customProgramCacheKey=()=>"cloth"+t,Ir.set(n,i)),i}function Lt(s,e=1,t=!1){let n=`g${s}-${e}-${t}`,i=Ir.get(n);return i||(i=new xt({color:s,transparent:!0,opacity:e,blending:Ot,depthWrite:t,side:Dt}),Ir.set(n,i)),i}function fc(s,e,t){let n=document.createElement("canvas");n.width=s,n.height=e,t(n.getContext("2d"));let i=new xr(n);return i.colorSpace=Pt,i.anisotropy=4,i}var Av=null,qn=()=>Av??(Av=fc(128,128,s=>{let e=s.createRadialGradient(64,64,0,64,64,64);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,.7)"),e.addColorStop(.6,"rgba(255,255,255,.15)"),e.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=e,s.fillRect(0,0,128,128)})),Rv=null,pc=()=>Rv??(Rv=fc(512,512,s=>{s.translate(256,256),s.strokeStyle="#fff",s.fillStyle="#fff",s.shadowColor="#fff",s.shadowBlur=8;for(let[t,n]of[[240,6],[224,2],[170,4],[150,2],[92,3]])s.lineWidth=n,s.beginPath(),s.arc(0,0,t,0,Math.PI*2),s.stroke();let e="\u5929\u5730\u7384\u9EC4\u5B87\u5B99\u6D2A\u8352\u65E5\u6708\u76C8\u6603\u8FB0\u5BBF\u5217\u5F20\u5BD2\u6765\u6691\u5F80\u79CB\u6536\u51AC\u85CF\u4E7E\u5764\u9707\u5DFD\u574E\u79BB\u826E\u5151";s.font="bold 30px serif",s.textAlign="center",s.textBaseline="middle";for(let t=0;t<24;t++)s.save(),s.rotate(t/24*Math.PI*2),s.fillText(e[t%e.length],0,-197),s.restore();for(let t=0;t<8;t++){s.save(),s.rotate(t/8*Math.PI*2);for(let n=0;n<3;n++){let i=t>>n&1;s.lineWidth=7,s.beginPath(),i?(s.moveTo(-26,-112-n*13),s.lineTo(-6,-112-n*13),s.moveTo(6,-112-n*13),s.lineTo(26,-112-n*13)):(s.moveTo(-26,-112-n*13),s.lineTo(26,-112-n*13)),s.stroke()}s.restore()}s.lineWidth=3;for(let t=0;t<6;t++)s.save(),s.rotate(t/6*Math.PI*2),s.beginPath(),s.moveTo(0,-150),s.lineTo(130,75),s.stroke(),s.restore()})),Cv=null,mc=()=>Cv??(Cv=fc(128,128,s=>{for(let e=0;e<14;e++){let t=30+Math.random()*68,n=30+Math.random()*68,i=18+Math.random()*26,r=s.createRadialGradient(t,n,0,t,n,i);r.addColorStop(0,"rgba(255,255,255,.35)"),r.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=r,s.fillRect(0,0,128,128)}}));function sp(s,e,t,n){return fc(512,128,i=>{i.textAlign="center",i.textBaseline="middle",i.font='800 46px "Segoe UI", system-ui, sans-serif',i.lineWidth=9,i.strokeStyle="rgba(0,0,0,.85)",i.strokeText(s,256,44),i.fillStyle=n?"#c9ced8":"#fff",i.fillText(s,256,44),i.font='700 32px "Segoe UI", system-ui, sans-serif',i.lineWidth=7,i.strokeText(e,256,98),i.fillStyle=t,i.fillText(e,256,98)})}var Yn=s=>"#"+s.toString(16).padStart(6,"0");var ve={capsule:new yr(1,1,6,12),sphere:new en(1,20,16),cone:new $t(1,1,14),box:new vt(1,1,1),cyl:new Mt(1,1,1,14),ring:new zi(.62,1,48),torus:new Dn(1,.04,8,48),disc:new En(1,32)},rp=s=>new gs([.19,.21,.235,.26,.29,.325,.355].map((e,t)=>new j(e*(1+(s-1)*t/6),-t*.158)),28),Iv=rp(1),Pv=rp(1.18),Lv=new gs([.065,.08,.1,.12,.13].map((s,e)=>new j(s,-e*.085)),14);function Au(s,e,t=0){let n=new xs;n.moveTo(0,0),n.lineTo(e,.06),n.quadraticCurveTo(e+t,s*.6,e*.3,s),n.lineTo(0,s+.08),n.lineTo(-e*.3,s),n.quadraticCurveTo(-e+t*.4,s*.6,-e,.06),n.closePath();let i=new vr(n,{depth:.012,bevelEnabled:!0,bevelThickness:.008,bevelSize:.008,bevelSegments:1});return i.translate(0,0,-.006),i}var op=Au(.95,.035),ap=Au(.9,.06,.08),Dv=Au(.28,.05),he=(s,e,t=1,n=t,i=t)=>{let r=new q(s,e);return r.scale.set(t,n,i),r.castShadow=!0,r};function Pr(s,e,t){let n=new ce,i=Ae(14673647,{metal:.9,rough:.25,emissive:t,ei:.25}),r=Ae(13938487,{metal:1,rough:.3}),o=Ae(4861466,{rough:.7}),a=he(ve.cyl,Ae(2759188),.022,.2,.022);if(a.position.y=-.05,n.add(a),s==="sword"||s==="twin"){let c=he(ve.box,r,.18,.03,.05);c.position.y=.06,n.add(c);let l=he(op,i);l.position.y=.07,n.add(l);let h=he(ve.cone,Ae(e),.03,.18,.03);h.position.y=-.24,h.rotation.x=Math.PI,n.add(h)}else if(s==="saber"){let c=he(ve.cyl,r,.07,.03,.07);c.position.y=.06,n.add(c);let l=he(ap,i);l.position.y=.07,n.add(l)}else if(s==="staff"||s==="spear"||s==="flag"){let c=he(ve.cyl,s==="staff"?o:Ae(3811872),.025,1.7,.025);if(c.position.y=.45,n.add(c),s==="staff"){let l=he(ve.sphere,Lt(t,.9),.09);l.position.y=1.36,n.add(l);let h=he(ve.torus,r,.12,.12,.12);h.position.y=1.36,n.add(h)}if(s==="spear"){let l=he(Dv,i);l.position.y=1.28,n.add(l);let h=he(ve.cone,Ae(11541550),.06,.14,.06);h.position.y=1.22,h.rotation.x=Math.PI,n.add(h)}if(s==="flag"){let l=he(new Yt(.42,.6,4,4),On(e,t,.05));l.position.set(.22,1.05,0),n.add(l)}}else if(s==="fan"){let c=he(new En(.32,16,0,Math.PI*.8),Ae(e,{side:Dt,emissive:t,ei:.2}));c.rotation.z=Math.PI*.1,c.position.y=.05,n.add(c)}else if(s==="claw")for(let c=-1;c<=1;c++){let l=he(ve.cone,Ae(1710618,{metal:.8,rough:.3,emissive:t,ei:.4}),.015,.28,.015);l.position.set(c*.035,.18,.04),n.add(l)}else if(s==="ribbon"){let c=new Mn([new S(0,0,0),new S(.3,.4,.2),new S(-.2,.9,-.1),new S(.25,1.3,.1)]),l=he(new bn(c,30,.025,5,!1),Lt(e,.7));n.add(l)}else if(s==="cauldron"){let c=he(ve.sphere,Ae(9071146,{metal:.8,rough:.35}),.14,.12,.14);c.position.y=.12,n.add(c);let l=he(ve.sphere,Lt(16742954,.8),.07);l.position.y=.24,n.add(l)}return n}function Nv(s){let e=Zi.get(s),t=new ce,n=Ae(e.color,{metal:.85,rough:.25,emissive:e.color,ei:.55}),i=Lt(e.color,.5);switch(e.shape){case"sword":{let o=he(op,n,.7,.7,.7);o.rotation.z=Math.PI,t.add(o);break}case"saber":{let o=he(ap,n,.7);o.rotation.z=Math.PI,t.add(o);break}case"cauldron":{let o=he(ve.sphere,n,.16,.13,.16);t.add(o);for(let a=0;a<3;a++){let c=he(ve.cyl,n,.02,.12,.02);c.position.set(Math.sin(a*2.1)*.1,-.14,Math.cos(a*2.1)*.1),t.add(c)}break}case"pearl":t.add(he(ve.sphere,n,.13));break;case"bell":{let o=he(new gs([.02,.08,.12,.15,.16].map((a,c)=>new j(a,-c*.06)),20),n);t.add(o);break}case"tower":for(let o=0;o<4;o++){let a=he(ve.cone,n,.16-o*.03,.1,.16-o*.03);a.position.y=o*.1,t.add(a)}break;case"staff":{let o=he(ve.cyl,n,.02,.6,.02);t.add(o);let a=he(ve.sphere,Lt(e.color,.9),.07);a.position.y=.32,t.add(a);break}case"lotus":for(let o=0;o<8;o++){let a=he(ve.sphere,n,.05,.02,.12);a.rotation.y=o/8*Math.PI*2,a.rotation.x=-.5,a.position.set(Math.sin(o/8*Math.PI*2)*.08,0,Math.cos(o/8*Math.PI*2)*.08),t.add(a)}break}let r=new pn(new cn({map:qn(),color:e.color,blending:Ot,depthWrite:!1,transparent:!0,opacity:.8}));return r.scale.setScalar(.6),t.add(r),t}var Uv=3,bs=class{constructor(e,t={}){z(this,"root",new ce);z(this,"body",new ce);z(this,"hips",new ce);z(this,"torso",new ce);z(this,"head",new ce);z(this,"armL");z(this,"armR");z(this,"legL");z(this,"legR");z(this,"weapon");z(this,"weapon2",null);z(this,"arch");z(this,"label");z(this,"labelKey","");z(this,"hpBar");z(this,"hpFill");z(this,"auraRing");z(this,"auraGlow");z(this,"halo",null);z(this,"pillar",null);z(this,"orbit",new ce);z(this,"artKey","");z(this,"flashMats",[]);z(this,"hitT",0);z(this,"poseT",0);z(this,"pose","idle");z(this,"phase",Math.random()*10);z(this,"glb",null);z(this,"lv",-1);z(this,"x",0);z(this,"z",0);z(this,"ry",0);z(this,"tx",0);z(this,"tz",0);z(this,"tRy",0);z(this,"scale",1);z(this,"vip",0);z(this,"wings",[]);z(this,"ownMats",[]);let n=Ki[e]??Ki[0];this.arch=n;let i=Yf.get(n.cls),r=Ms[i.els[0]],o=this.vip=Math.max(0,Math.min(5,t.vip??0)),a=t.colors?.robe??(o>=5?15984324:o>=4?3874158:n.robe),c=t.colors?.trim??(o>=4?16763196:n.trim);this.scale=(t.scale??1)*(n.female?.94:1)*(o>=5?1.1:o>=3?1.04:1),this.root.add(this.body);let l=`${n.cls}${n.female?"_nu":""}`,h=dc(`tusi-${n.female?"nu":"nam"}-`),u=ji(l)?l:ji(n.cls)?n.cls:h.length?h[(e*7+3)%h.length]:"";u?(this.glb=new Cr(u,1.8),this.body.add(this.glb.root),this.armL=this.armR=this.legL=this.legR={root:new ce,low:new ce},this.weapon=new ce):(this.weapon=this.buildBody(n,a,c,r,i.weapon),o&&this.addVip(o,a)),this.body.scale.setScalar(this.scale),t.scale===void 0&&this.root.scale.setScalar(Uv),this.glb&&this.dressGlb(n,a,c,r,i.weapon,o),this.auraRing=new q(ve.ring,Lt(16777215,.2)),this.auraRing.rotation.x=-Math.PI/2,this.auraRing.position.y=.03,this.root.add(this.auraRing),this.auraGlow=new pn(new cn({map:qn(),color:16777215,blending:Ot,depthWrite:!1,transparent:!0,opacity:.35})),this.auraGlow.position.y=1,this.auraGlow.scale.set(2.2,2.8,1),this.root.add(this.auraGlow),this.orbit.position.y=1.5,this.root.add(this.orbit),this.label=new pn(new cn({depthWrite:!1,transparent:!0})),this.label.center.set(.5,0),this.label.position.y=2.1*this.scale,this.label.scale.set(t.scale===void 0?1.6:3,t.scale===void 0?.4:.75,1),this.label.renderOrder=10,t.noLabel||this.root.add(this.label),this.hpBar=new ce,this.hpBar.position.y=2*this.scale;let d=new q(new Yt(1.2,.09),new xt({color:0,transparent:!0,opacity:.6,depthWrite:!1}));this.hpFill=new q(new Yt(1.16,.06),new xt({color:5111688,depthWrite:!1})),this.hpFill.position.z=.001,this.hpBar.add(d,this.hpFill),this.hpBar.visible=!1,this.root.add(this.hpBar)}limb(e,t,n,i,r,o){let a=new ce,c=new ce,l=he(ve.capsule,i,n,e/2,n);l.position.y=-e/2,a.add(l),c.position.y=-e,a.add(c);let h=he(ve.capsule,r,n*.85,t/2,n*.85);if(h.position.y=-t/2,c.add(h),o){let u=he(ve.box,o,n*2.1,n*1.2,n*3.4);u.position.set(0,-t-n*.5,n*.7),c.add(u)}return{root:a,low:c}}buildBody(e,t,n,i,r){let o=Ae(e.skin,{rough:.55}),a=On(t,0,.05),c=Ae(n,{metal:.6,rough:.35,emissive:n,ei:.12}),l=Ae(new le(t).multiplyScalar(.55).getHex(),{rough:.8}),h=Ae(e.hair,{rough:.45}),u=Ae(1840918,{rough:.6}),d=Ae(13938487,{metal:1,rough:.3}),f=e.female;this.flashMats.push(o),this.hips.position.y=1,this.body.add(this.hips),this.hips.add(this.torso);let g=he(ve.capsule,l,f?.17:.2,.22,f?.13:.15);g.position.y=.3,this.torso.add(g);let x=he(ve.capsule,On(t,0,.01),f?.185:.215,.2,f?.145:.165);x.position.y=.3,this.torso.add(x);let m=he(ve.torus,c,.14,.14,.5);m.rotation.x=Math.PI/2-.3,m.position.set(0,.52,.03),this.torso.add(m);let p=he(ve.cyl,c,f?.18:.21,.07,f?.14:.16);p.position.y=.08,this.torso.add(p);let v=he(ve.sphere,Lt(i,.9),.03);if(v.position.set(0,.08,f?.15:.17),this.torso.add(v),!f||e.cls==="longtoc"||e.cls==="mavuong")for(let U of[-1,1]){let X=he(ve.sphere,e.cls==="thetu"?o:c,.1,.07,.1);X.position.set(U*.24,.47,0),this.torso.add(X)}let y=he(e.cls==="thetu"?Iv:Pv,a);y.position.y=.04,this.hips.add(y);let _=.355*(e.cls==="thetu"?1:1.18),C=he(ve.torus,c,_,_,.6);if(C.rotation.x=Math.PI/2,C.position.y=.04-.948,this.hips.add(C),["kiemtien","mavuong","thienton","longtoc","kiemtu"].includes(e.cls)){let U=he(new Yt(.62,1.45,4,10),On(new le(t).multiplyScalar(.8).getHex(),0,.1));U.geometry.translate(0,-.72,0),U.position.set(0,.5,-.17),U.rotation.x=.12,this.torso.add(U)}this.head.position.y=.62,this.torso.add(this.head);let w=he(ve.cyl,o,.055,.12,.055);w.position.y=-.06,this.head.add(w);let R=he(ve.sphere,o,f?.112:.12,f?.14:.145,f?.12:.13);R.position.y=.1,this.head.add(R);let I=Ae(e.cls==="matu"||e.cls==="mavuong"?16719936:1445912,{emissive:e.cls==="matu"||e.cls==="mavuong"?16719936:0,ei:1.5});for(let U of[-1,1]){let X=he(ve.sphere,Ae(16052714),.026,.016,.01);X.position.set(U*.046,.112,.113),this.head.add(X);let W=he(ve.sphere,I,.014,.014,.01);W.position.set(U*.046,.112,.119),this.head.add(W);let ie=he(ve.box,h,.05,.01,.012);ie.position.set(U*.046,.14,.116),ie.rotation.z=-U*.15,this.head.add(ie)}let b=he(ve.sphere,h,.128,.115,.135);b.position.set(0,.15,-.012),this.head.add(b);let M=he(ve.capsule,h,.11,f?.32:.2,.06);M.position.set(0,f?-.12:0,-.09),M.rotation.x=.12,this.head.add(M);let L=e.hairStyle;if(L===1){let U=he(ve.capsule,h,.045,.3,.045);U.position.set(0,.08,-.16),U.rotation.x=.5,this.head.add(U)}if(L===2||L===3){let U=he(ve.sphere,h,.07);U.position.set(0,.28,-.03),this.head.add(U);let X=he(ve.cyl,d,.008,.26,.008);X.rotation.z=Math.PI/2,X.position.set(0,.28,-.03),this.head.add(X)}if(L===3||e.cls==="thienton"){let U=he(ve.box,d,.1,.07,.12);U.position.set(0,.29,-.01),this.head.add(U)}if(L===4)for(let U=0;U<6;U++){let X=he(ve.cone,h,.035,.16,.035);X.position.set(Math.sin(U)*.08,.23,-.05+Math.cos(U*1.3)*.05),X.rotation.set(-.6+U*.1,0,Math.sin(U)*.6),this.head.add(X)}if(f)for(let U of[-1,1]){let X=he(ve.capsule,h,.035,.22,.03);X.position.set(U*.11,-.02,.03),this.head.add(X)}if(e.cls==="longtoc"||e.cls==="matu"||e.cls==="mavuong")for(let U of[-1,1]){let X=he(ve.cone,e.cls==="longtoc"?d:Ae(1706511,{metal:.5,rough:.3}),.025,.2,.025);X.position.set(U*.08,.28,-.02),X.rotation.set(-.5,0,-U*.4),this.head.add(X)}if(e.cls==="yeutoc"){for(let X of[-1,1]){let W=he(ve.cone,h,.05,.14,.03);W.position.set(X*.09,.28,-.02),W.rotation.z=-X*.3,this.head.add(W)}let U=he(ve.capsule,On(e.hair,0,.08),.09,.6,.09);U.position.set(0,-.15,-.3),U.rotation.x=-.9,this.hips.add(U)}if(e.cls==="thienton"||e.cls==="kiemtien"){let U=he(ve.torus,Lt(16771496,.8),.24,.24,.24);U.position.set(0,.16,-.18),this.head.add(U)}if(e.cls==="tiennu"||e.cls==="banghoa"){let U=new Mn(Array.from({length:9},(W,ie)=>new S(Math.sin(ie*.8)*.55,.2+ie*.12,Math.cos(ie*.8)*.45))),X=he(new bn(U,48,.018,5,!1),On(n,n,.08));X.position.y=-.5,this.torso.add(X)}if(e.cls==="kiemtien")for(let U of[-1,1]){let X=Pr("sword",n,i);X.position.set(U*.12,.35,-.2),X.rotation.set(0,0,Math.PI+U*.35),X.scale.setScalar(.8),this.torso.add(X)}if(e.cls==="tranphap")for(let U of[-1,1]){let X=Pr("flag",n,i);X.position.set(U*.15,-.1,-.2),X.scale.setScalar(.55),X.rotation.z=U*.2,this.torso.add(X)}let H=e.cls==="thetu"?o:On(t,0,.015),D=U=>{let X=this.limb(.3,.28,.05,H,o);if(X.root.position.set(U*.25,.47,0),this.torso.add(X.root),e.cls!=="thetu"){let ie=he(Lv,On(t,0,.05));ie.position.y=-.02,X.low.add(ie);let me=he(ve.torus,c,.13,.13,.4);me.rotation.x=Math.PI/2,me.position.y=-.34,X.low.add(me)}else{let ie=he(ve.cyl,d,.055,.1,.055);ie.position.y=-.2,X.low.add(ie)}let W=he(ve.sphere,o,.045,.055,.04);return W.position.y=-.32,X.low.add(W),X};this.armL=D(1),this.armR=D(-1);let G=l;this.legL=this.limb(.46,.44,.07,G,G,u),this.legL.root.position.set(.11,0,0),this.hips.add(this.legL.root),this.legR=this.limb(.46,.44,.07,G,G,u),this.legR.root.position.set(-.11,0,0),this.hips.add(this.legR.root);let J=Pr(r,n,i);return J.position.y=-.33,J.rotation.x=Math.PI/2,this.armR.low.add(J),r==="twin"&&(this.weapon2=Pr("sword",n,i),this.weapon2.position.y=-.33,this.weapon2.rotation.x=Math.PI/2,this.armL.low.add(this.weapon2)),J}dressGlb(e,t,n,i,r,o){let a=this.glb.root;a.traverse(_=>{let C=_;if(!C.isMesh)return;C.castShadow=!0,C.frustumCulled=!1;let w=(Array.isArray(C.material)?C.material:[C.material]).map(R=>{if(!/^(robe_|hair_extra)/.test(R.name))return R;let I=R.clone();return R.name==="robe_main"?I.color.setHex(t):R.name==="robe_inner"?I.color.copy(new le(t).multiplyScalar(.55)):R.name==="robe_trim"?(I.color.setHex(n),I.emissive.setHex(n),I.emissiveIntensity=.06):I.color.setHex(e.hair),this.ownMats.push(I),I});C.material=Array.isArray(C.material)?w:w[0]}),this.root.updateMatrixWorld(!0);let c=_=>a.getObjectByName(_),l=_=>_.getWorldPosition(new S),h=this.root.scale.x*this.scale,u=new S(0,1,0),d=new S(0,0,1),f=(_,C,w,R,I=1)=>{_&&(C.position.copy(w),R&&C.quaternion.setFromUnitVectors(u,R.clone().normalize()),C.scale.multiplyScalar(h*I),C.updateMatrixWorld(!0),_.attach(C),C.traverse(b=>{b.isMesh&&(b.castShadow=!0)}))},g=(_,C)=>{let w=c(`Bip01_${_}_Hand`),R=c(`Bip01_${_}_Forearm`);if(!w||!R)return;let I=l(w).sub(l(R)).normalize(),b=d.clone().addScaledVector(I,-d.dot(I)).normalize();f(w,C,l(w).addScaledVector(I,.075*h),b)};if(r!=="fist"){let _=Pr(r==="twin"?"sword":r,n,i);g("R",_),this.weapon=_}r==="twin"&&(this.weapon2=Pr("sword",n,i),g("L",this.weapon2));let x=c("Bip01_Head"),m=c("Bip01_Spine2"),p=x?l(x).addScaledVector(u,.17*h):new S,v=Ae(16765002,{metal:1,rough:.22,emissive:8014336,ei:.35});if(e.cls==="longtoc"||e.cls==="matu"||e.cls==="mavuong")for(let _ of[-1,1]){let C=he(ve.cone,e.cls==="longtoc"?v:Ae(1706511,{metal:.5,rough:.3}),.025,.2,.025);f(x,C,p.clone().add(new S(_*.08*h,-.02*h,-.03*h)),new S(_*.35,1,-.5))}if(e.cls==="yeutoc")for(let _ of[-1,1])f(x,he(ve.cone,Ae(e.hair,{rough:.45}),.05,.14,.03),p.clone().add(new S(_*.09*h,-.03*h,0)),new S(_*.3,1,0));if((e.cls==="thienton"||e.cls==="kiemtien")&&f(x,he(ve.torus,Lt(16771496,.8),.26,.26,.26),p.clone().add(new S(0,-.08*h,-.2*h)),d),!o)return;let y=bo[o];if(this.weapon.children.length){let _=new pn(new cn({map:qn(),color:y,blending:Ot,depthWrite:!1,transparent:!0,opacity:.7}));_.position.y=.5,_.scale.set(.35,1.3,1),this.weapon.add(_)}if(o>=2)for(let _ of["L","R"]){let C=c(`Bip01_${_}_UpperArm`);C&&f(C,he(ve.sphere,v,.11,.08,.11),l(C).addScaledVector(u,.05*h))}if(o>=3&&x){let _=new ce,C=he(ve.torus,v,.1,.1,.6);C.rotation.x=Math.PI/2,_.add(C);for(let w=0;w<5;w++){let R=he(ve.cone,v,.02,.09+(w===2?.05:0),.02),I=(w-2)*.45;R.position.set(Math.sin(I)*.1,.05,Math.cos(I)*.1),_.add(R)}f(x,_,p.clone().addScaledVector(u,-.02*h)),m&&f(m,he(ve.torus,Lt(y,.85),.42,.42,.42),l(m).add(new S(0,.12*h,-.3*h)),d)}if(o>=4&&m){let _=Lt(y,.55),C=o>=5?1.55:1;for(let w of[-1,1]){let R=new ce;for(let I=0;I<6;I++){let b=he(new Yt(.16,1,1,1),_);b.geometry.translate(0,.5,0),b.scale.set(C,(.75+(I<3?I:5-I)*.18)*C,1),b.position.x=w*(.12+I*.13)*C,b.rotation.z=-w*(.25+I*.22),R.add(b)}f(m,R,l(m).add(new S(w*.08*h,.05*h,-.2*h))),this.wings.push({g:R,s:w})}}o>=5&&m&&f(m,he(ve.torus,Lt(16765002,.6),.75,.75,.75),l(m).add(new S(0,.1*h,-.36*h)),d)}addVip(e,t){let n=bo[e],i=Ae(16765002,{metal:1,rough:.22,emissive:8014336,ei:.35}),r=new pn(new cn({map:qn(),color:n,blending:Ot,depthWrite:!1,transparent:!0,opacity:.7}));r.position.y=.5,r.scale.set(.35,1.3,1),this.weapon.add(r);for(let o of[this.armL,this.armR]){let a=he(ve.cyl,i,.06,.08,.06);a.position.y=-.24,o.low.add(a)}if(e>=2){for(let a of[-1,1]){let c=he(ve.sphere,i,.13,.09,.13);c.position.set(a*.26,.5,0),this.torso.add(c);let l=he(ve.cone,i,.03,.14,.03);l.position.set(a*.32,.58,0),l.rotation.z=-a*.6,this.torso.add(l)}let o=he(new Yt(.7,1.55,4,10),On(e>=4?12063278:new le(t).multiplyScalar(.7).getHex(),n,.11));o.geometry.translate(0,-.77,0),o.position.set(0,.52,-.19),o.rotation.x=.14,this.torso.add(o)}if(e>=3){let o=he(ve.torus,i,.11,.11,.6);o.rotation.x=Math.PI/2,o.position.y=.24,this.head.add(o);for(let l=0;l<5;l++){let h=he(ve.cone,i,.02,.09+(l===2?.05:0),.02),u=(l-2)*.45;h.position.set(Math.sin(u)*.11,.29,Math.cos(u)*.11),this.head.add(h)}let a=he(ve.sphere,Lt(n,1),.025);a.position.set(0,.26,.115),this.head.add(a);let c=he(ve.torus,Lt(n,.85),.42,.42,.42);c.position.set(0,.42,-.32),this.torso.add(c)}if(e>=4){let o=Lt(n,.55),a=e>=5?1.55:1;for(let c of[-1,1]){let l=new ce;l.position.set(c*.1,.45,-.2),this.torso.add(l);for(let h=0;h<6;h++){let u=he(new Yt(.16,1,1,1),o);u.geometry.translate(0,.5,0),u.scale.set(a,(.75+(h<3?h:5-h)*.18)*a,1),u.position.x=c*(.12+h*.13)*a,u.rotation.z=-c*(.25+h*.22),l.add(u)}this.wings.push({g:l,s:c})}}if(e>=5){let o=he(ve.capsule,i,.215,.16,.17);o.position.y=.33,this.torso.add(o);let a=he(ve.cyl,i,.24,.1,.19);a.position.y=.06,this.torso.add(a);for(let l of[this.legL,this.legR]){let h=he(ve.cyl,i,.085,.22,.085);h.position.y=-.2,l.low.add(h)}let c=he(ve.torus,Lt(16765002,.6),.75,.75,.75);c.position.set(0,.35,-.36),this.torso.add(c)}}setInfo(e,t,n,i){let r=vo(t)+(this.vip?" \xB7 "+cc[this.vip]:n?" \xB7 "+(oc.get(n)?.name??""):""),o=e+r+i;if(o!==this.labelKey){this.labelKey=o;let h=this.label.material;h.map?.dispose(),h.map=sp(e.slice(0,18),r,Yn(vs[$i(t)]),i),h.needsUpdate=!0}if(t===this.lv)return;this.lv=t;let a=$i(t),c=vs[a];this.auraRing.material=Lt(c,.12+Math.min(.28,a*.022)),this.auraRing.scale.setScalar(.7+a*.08);let l=this.auraGlow.material;l.color.setHex(c),l.opacity=a<3?0:.04+a*.01,this.auraGlow.scale.set(1.8+a*.12,2.6+a*.12,1),a>=10&&!this.halo&&(this.halo=new q(ve.torus,Lt(c,.9)),this.halo.scale.setScalar(.32),this.halo.position.set(0,.17,-.2),this.head.add(this.halo)),a>=11&&!this.pillar&&(this.pillar=new q(new Mt(.25,.7,5,20,1,!0),Lt(c,.05)),this.pillar.position.y=2.5,this.root.add(this.pillar))}setArtifacts(e){if(e===this.artKey)return;this.artKey=e;for(let n of[...this.orbit.children])this.orbit.remove(n);let t=e?e.split(",").map(n=>n.split(":")).map(([n,i])=>[n,+i]).sort((n,i)=>i[1]-n[1]).slice(0,4):[];t.forEach(([n,i],r)=>{let o=Nv(n);o.scale.setScalar(.8+Math.min(1.2,i*.06)),o.userData.i=r,o.userData.n=t.length,this.orbit.add(o)})}setHp(e,t,n){if(this.hpBar.visible=n,!n)return;let i=Math.max(0,Math.min(1,e/Math.max(1,t)));this.hpFill.scale.x=Math.max(.001,i),this.hpFill.position.x=-(1-i)*.58,this.hpFill.material.color.setHex(i>.5?5111688:i>.25?16765002:16731469)}setPose(e){e!==this.pose&&(this.pose=e,this.poseT=0)}flash(){this.hitT=.25}update(e,t,n){let i=1-Math.exp(-e*6);this.x+=(this.tx-this.x)*i,this.z+=(this.tz-this.z)*i;let r=this.tRy-this.ry;r=Math.atan2(Math.sin(r),Math.cos(r)),this.ry+=r*Math.min(1,e*8),this.root.position.set(this.x,0,this.z),this.body.rotation.y=this.ry,this.poseT+=e,this.hitT=Math.max(0,this.hitT-e);let o=t*1+this.phase;this.orbit.children.forEach((a,c)=>{let l=t*1.2+c/Math.max(1,a.userData.n)*Math.PI*2;a.position.set(Math.sin(l)*.95,Math.sin(t*2+c)*.15,Math.cos(l)*.95),a.rotation.y=-l}),this.auraRing.rotation.z=t*.6,this.halo&&(this.halo.rotation.z=t);for(let a of this.wings)a.g.rotation.y=a.s*(.35+Math.sin(t*2.2+this.phase)*.25),a.g.rotation.x=.1;this.label.material.rotation=0,this.hpBar.quaternion.copy(n.quaternion);for(let a of this.flashMats)a.emissive.setRGB(this.hitT*3,this.hitT*.6,this.hitT*.6);if(this.glb){this.glb.play(this.pose),this.glb.update(e),this.body.position.y=this.pose==="med"?.3+Math.sin(o)*.05:0,this.body.rotation.x=0;return}this.animate(e,t,o)}animate(e,t,n){let i=this.legL,r=this.legR,o=this.armL,a=this.armR,c=this.pose,l=this.poseT,h=1,u=0,d=0,f=0,g=0,x=0,m=0,p=0,v=0,y=0,_=0,C=0,w=.1,R=.12,I=-.3,b=.1,M=-.12,L=-.3,H=Math.sin(n*1.6)*.02;if(c==="med")u=.35+Math.sin(n*.9)*.08,h=.45,m=-1.45,v=-1.45,_=.75,C=-.75,p=2.3,y=2.3,w=-.5,R=.35,I=-1,b=-.5,M=-.35,L=-1,x=.08;else if(c==="move"){let D=Math.sin(t*9+this.phase);m=D*.7,v=-D*.7,p=Math.max(0,-D)*1.1+.15,y=Math.max(0,D)*1.1+.15,w=-D*.6,b=.2,L=-.8,f=.18,u=Math.abs(Math.cos(t*9+this.phase))*.06}else if(c==="atk"){let D=Math.min(1,l/.45),G=D<.35?D/.35:1-(D-.35)/.65*.3;b=-2.6*(D<.35?D/.35:1)+(D>=.35?3.4*Math.min(1,(D-.35)/.2):0),M=-.4+G*.2,L=-.2,g=D<.35?.5*D/.35:.5-1*Math.min(1,(D-.35)/.25),f=.15,m=-.5,p=.6,v=.4,y=.2,w=-.4,R=.5}else if(c==="cast"){let D=Math.min(1,l/.3);w=-1.4*D,b=-1.4*D,R=.15,M=-.15,I=-.15,L=-.15,f=-.08,u=.15*D,m=-.2,v=.25,p=.3}else if(c==="hit")f=-.35,x=-.3,w=.4,b=.4,R=.6,M=-.6;else if(c==="down"){let D=Math.min(1,l/.6);d=-D*Math.PI/2*.95,u=D*.15,R=1.2,M=-1.2,m=.2,v=-.1}else c==="win"?(b=-2.9,M=-.2,L=-.1,w=0,R=.5,u=Math.abs(Math.sin(t*4))*.1):(b=-.5+Math.sin(n)*.05,L=-.9,w=.15+Math.sin(n+1)*.04,R=.18,m=.08,v=-.08,p=.1,y=.1,f=H);this.hips.position.y=h+(c==="med"?0:H*.3),this.body.position.y=u,this.body.rotation.x=d,this.torso.rotation.set(f,g,0),this.head.rotation.x=x,i.root.rotation.set(m,0,_),i.low.rotation.x=p,r.root.rotation.set(v,0,C),r.low.rotation.x=y,o.root.rotation.set(w,0,R),o.low.rotation.x=I,a.root.rotation.set(b,0,M),a.low.rotation.x=L}dispose(){this.label.material.map?.dispose(),this.label.material.dispose(),this.glb?.dispose();for(let e of this.ownMats)e.dispose();this.root.removeFromParent()}chest(e=new S){return e.set(this.x,(this.pose==="med"?1:1.35)*this.scale*this.root.scale.y,this.z)}};var Kt=new en(1,24,18),Si=new yr(1,1,6,14),Fn=new $t(1,1,16),Ov=new Mt(1,1,1,14),gc=class{constructor(e){z(this,"root",new ce);z(this,"body",new ce);z(this,"def");z(this,"mats",[]);z(this,"accent");z(this,"parts",{});z(this,"segs",[]);z(this,"tails",[]);z(this,"giant",null);z(this,"glb",null);z(this,"rageGlow");z(this,"pose","idle");z(this,"poseT",0);z(this,"hitT",0);z(this,"deadT",0);z(this,"x",0);z(this,"z",-4);z(this,"ry",0);z(this,"tx",0);z(this,"tz",-4);z(this,"tRy",0);z(this,"phase",1);z(this,"height",10);z(this,"baseScale",1);z(this,"tgt",new S);this.def=Mo.get(e);let t=this.def;if(this.root.add(this.body),this.accent=new Rt({color:t.color2,emissive:t.color2,emissiveIntensity:1.2,roughness:.3,metalness:.3}),ji(t.key)){this.glb=new Cr(t.key,0),this.body.add(this.glb.root);let n=this.glb.root.getObjectByName("head");n&&(this.parts.head=n)}else t.body==="dragon"?this.buildDragon():t.body==="beast"||t.body==="fox"?this.buildBeast(t.body==="fox"):t.body==="turtle"?this.buildTurtle():t.body==="bird"?this.buildBird():this.buildGiant();this.rageGlow=new pn(new cn({map:qn(),color:t.color2,blending:Ot,transparent:!0,depthWrite:!1,opacity:.35})),this.rageGlow.scale.set(16,14,1),this.rageGlow.position.y=5,this.root.add(this.rageGlow),this.root.traverse(n=>{let i=n;i.isMesh&&(i.castShadow=!0)});for(let n of this.mats)n.emissive.setHex(t.color2),n.emissiveIntensity=.04,n.color.multiplyScalar(.82);this.body.scale.setScalar(1.25),this.baseScale=1.25}mat(e,t={}){let n=new Rt({color:e,roughness:t.rough??.45,metalness:t.metal??.35,emissive:t.emissive??0,emissiveIntensity:t.ei??0});return this.mats.push(n),n}m(e,t,n,i=[0,0,0],r=[0,0,0],o=this.body){let a=new q(e,t);return a.scale.set(...n),a.position.set(...i),a.rotation.set(...r),o.add(a),a}eyes(e,t,n,i,r=.18){let o=new xt({color:this.def.color2});for(let a of[-1,1])this.m(Kt,o,[r,r*.7,r*.6],[a*i,t,n],[0,0,0],e)}buildDragon(){let e=this.def,t=this.mat(e.color,{metal:.5,rough:.35}),n=this.mat(new le(e.color2).lerp(new le(16777215),.3).getHex(),{rough:.5}),i=40;for(let a=0;a<i;a++){let c=new ce,l=1.45*(1-a/i*.78);if(this.m(Kt,t,[l,l*.9,l*1.35],[0,0,0],[0,0,0],c),this.m(Kt,n,[l*.8,l*.6,l*1.2],[0,-l*.35,0],[0,0,0],c),a%2===0&&this.m(Fn,this.accent,[l*.25,l*.9,l*.5],[0,l*1.05,0],[-.4,0,0],c),a===5||a===13)for(let h of[-1,1]){let u=this.m(Si,t,[.28,.7,.28],[h*l*.9,-l*.7,0],[0,0,h*.8],c);for(let d=0;d<3;d++)this.m(Fn,this.accent,[.07,.35,.07],[(d-1)*.15,-.75,.15],[.8,0,0],u)}this.body.add(c),this.segs.push(c)}let r=new ce;this.body.add(r),this.parts.head=r,this.m(Kt,t,[1.2,1,1.6],[0,0,.3],[0,0,0],r),this.m(Kt,t,[.75,.55,1.2],[0,-.1,1.6],[0,0,0],r);let o=new ce;o.position.set(0,-.45,.6),r.add(o),this.parts.jaw=o,this.m(Kt,n,[.65,.3,1.25],[0,-.1,.9],[0,0,0],o);for(let a=0;a<6;a++)this.m(Fn,this.mat(16117984),[.06,.25,.06],[(a%2?1:-1)*.4,.15,.6+Math.floor(a/2)*.4],[Math.PI,0,0],o);for(let a of[-1,1]){this.m(Fn,this.mat(13938487,{metal:1,rough:.3}),[.18,1.9,.18],[a*.6,.9,-.5],[-1.1,0,a*.35],r);let c=new Mn([new S(a*.5,-.2,2.2),new S(a*1.4,-.4,2.4),new S(a*2.2,-1.2,1.6),new S(a*2.6,-2.2,.6)]);r.add(new q(new bn(c,20,.05,5),this.accent))}for(let a=0;a<7;a++)this.m(Fn,this.accent,[.18,1.1,.18],[Math.sin(a)*.6,.8,-.6-a*.15],[-1.4,0,Math.sin(a)*.4],r);this.eyes(r,.35,1.15,.55,.2),this.height=9}buildBeast(e){let t=this.def,n=this.mat(t.color,{metal:.1,rough:.7}),i=this.mat(new le(t.color).multiplyScalar(.35).getHex(),{rough:.6}),r=new ce;if(r.position.y=4.2,this.body.add(r),this.parts.torso=r,this.m(Si,n,e?[1.3,2.4,1.3]:[1.8,2.6,1.8],[0,0,0],[Math.PI/2,0,0],r),this.m(Kt,n,e?[1.5,1.5,1.6]:[2.2,2.1,2],[0,.3,1.9],[0,0,0],r),t.key==="bachho")for(let h=0;h<6;h++)this.m(new Dn(1,.08,6,24,Math.PI),i,[1.85,1.85,1.85],[0,0,-1.6+h*.75],[0,Math.PI/2,Math.PI/2],r);if(t.key==="kylan"||t.key==="hondoncuthu"||t.key==="thaothiet")for(let h=0;h<9;h++)this.m(Fn,this.accent,[.25,.8,.25],[0,1.9-Math.abs(h-4)*.1,-2+h*.5],[-.5,0,0],r);let o=new ce;o.position.set(0,.8,3),r.add(o),this.parts.head=o,this.m(Kt,n,e?[.95,.85,1.2]:[1.4,1.25,1.5],[0,.4,.8],[0,0,0],o),this.m(Kt,n,e?[.5,.4,.9]:[.9,.7,.9],[0,.1,2],[0,0,0],o);let a=new ce;a.position.set(0,-.3,1.5),o.add(a),this.parts.jaw=a,this.m(Kt,i,e?[.4,.2,.7]:[.75,.3,.8],[0,-.1,.4],[0,0,0],a);for(let h of[-1,1])this.m(Fn,this.mat(16117984),[.1,.5,.1],[h*.35,-.2,.6],[Math.PI,0,0],a);if(e)for(let h of[-1,1])this.m(Fn,n,[.35,1,.18],[h*.55,1.4,.5],[0,0,-h*.2],o);else for(let h of[-1,1])this.m(Kt,n,[.35,.4,.15],[h*.9,1.3,.3],[0,0,0],o);for(let h=0;h<(t.horns??0);h++)this.m(Fn,this.mat(13938487,{metal:1,rough:.3}),[.18,1.6,.18],[(h-(t.horns-1)/2)*.6,1.6,.6],[-.6,0,(h-(t.horns-1)/2)*.3],o);this.eyes(o,.6,e?1.85:2.1,e?.4:.6,e?.14:.2);let c=[];for(let[h,u]of[[1,1.8],[-1,1.8],[1,-1.8],[-1,-1.8]]){let d=new ce;d.position.set(h*(e?1:1.4),-.6,u),r.add(d),this.m(Si,n,e?[.45,1.2,.45]:[.65,1.3,.65],[0,-1,0],[0,0,0],d);let f=new ce;f.position.y=-2,d.add(f),this.m(Si,n,e?[.35,.9,.35]:[.5,.9,.5],[0,-.7,0],[0,0,0],f),this.m(Kt,i,e?[.45,.25,.6]:[.65,.3,.8],[0,-1.5,.2],[0,0,0],f),d.userData.lo=f,c.push(d)}this.segs=c;let l=e?t.tails??9:1;for(let h=0;h<l;h++){let u=[],d=r,f=new ce;f.position.set(0,.6,-2.8),f.rotation.set(-.6,(h-(l-1)/2)*(e?.32:0),0),r.add(f),d=f;for(let g=0;g<7;g++){let x=new ce;x.position.z=g===0?0:-.75,d.add(x);let m=e?.55*(1-g/9)+.15:.3*(1-g/9);this.m(Kt,e?On(g>4?t.color2:t.color,g>4?t.color2:0,.02):n,[m,m,.6],[0,0,-.3],[0,0,0],x),u.push(x),d=x}this.tails.push(u)}this.height=e?8:9}buildTurtle(){let e=this.def,t=this.mat(e.color,{metal:.4,rough:.35}),n=this.mat(new le(e.color).lerp(new le(9425088),.4).getHex(),{rough:.6}),i=new ce;i.position.y=2.4,this.body.add(i),this.parts.torso=i,this.m(new en(1,28,18,0,Math.PI*2,0,Math.PI/2),t,[4.2,3,4.8],[0,.2,0],[0,0,0],i),this.m(Ov,n,[4.2,.4,4.8],[0,0,0],[0,0,0],i);for(let u=0;u<14;u++){let d=u*2.4,f=1+u%3*1.1;this.m(new Mt(1,1,.1,6),this.accent,[.55,1,.55],[Math.sin(d)*f,2.4+.6-f*.45,Math.cos(d)*f],[-Math.cos(d)*f*.2,0,Math.sin(d)*f*.2],i)}let r=new ce;r.position.set(0,.6,4.4),i.add(r),this.parts.head=r,this.m(Si,n,[.7,1.2,.7],[0,.6,.6],[1,0,0],r),this.m(Kt,n,[1,.8,1.3],[0,1.2,1.8],[0,0,0],r);let o=new ce;o.position.set(0,.9,2.2),r.add(o),this.parts.jaw=o,this.m(Kt,n,[.75,.25,.8],[0,-.1,.3],[0,0,0],o),this.eyes(r,1.5,2.8,.55);let a=[];for(let[u,d]of[[1,2.8],[-1,2.8],[1,-2.8],[-1,-2.8]]){let f=new ce;f.position.set(u*3.4,-.4,d),i.add(f),this.m(Si,n,[.9,1,.9],[0,-1,0],[0,0,u*.3],f),f.userData.lo=f,a.push(f)}this.segs=a;let c=[],l=i,h=new ce;h.position.set(0,1,-4.4),i.add(h),l=h;for(let u=0;u<14;u++){let d=new ce;d.position.z=u?-.8:0,l.add(d),this.m(Kt,this.accent,[.45-u*.02,.45-u*.02,.6],[0,0,-.3],[0,0,0],d),c.push(d),l=d}this.tails.push(c),this.height=7}buildBird(){let e=this.def,t=this.mat(e.color,{metal:.3,rough:.4,emissive:e.color,ei:.15}),n=this.mat(e.color2,{emissive:e.color2,ei:.6,rough:.4}),i=new ce;i.position.y=6,this.body.add(i),this.parts.torso=i,this.m(Kt,t,[1.5,1.5,2.6],[0,0,0],[0,0,0],i);let r=new ce;r.position.set(0,1,2.2),i.add(r),this.parts.head=r,this.m(Si,t,[.6,.9,.6],[0,.6,.3],[.7,0,0],r),this.m(Kt,t,[.85,.85,1],[0,1.4,1],[0,0,0],r),this.m(Fn,this.mat(13938487,{metal:1,rough:.3}),[.3,1.3,.35],[0,1.25,2.2],[Math.PI/2+.3,0,0],r);for(let a=0;a<5;a++)this.m(Fn,n,[.12,1.2,.12],[0,2.1,.6-a*.3],[-.9-a*.15,0,0],r);this.eyes(r,1.6,1.85,.45,.13);let o=new ce;r.add(o),this.parts.jaw=o;for(let a of[-1,1]){let c=new ce;c.position.set(a*1.2,.6,.3),i.add(c);let l=c;for(let h=0;h<3;h++){let u=new ce;u.position.x=h?a*2.4:0,l.add(u),this.m(Si,t,[.3,1.2,.3],[a*1.2,0,0],[0,0,Math.PI/2],u);for(let d=0;d<5;d++)this.m(new vt(1,1,1),d>2?n:t,[.5,.08,2.4+h*.6-d*.1],[a*(.3+d*.48),-.1,-1.2-h*.3],[0,a*(.1+d*.08),0],u);l=u}this.tails.push([c,c.children[0]]),c.userData.side=a}for(let a=0;a<7;a++)this.m(new vt(1,1,1),a%2?n:t,[.5,.08,4.2],[(a-3)*.45,-.2,-4],[.2,(a-3)*.13,0],i);for(let a of[-1,1]){let c=this.m(Si,this.mat(3811866),[.22,1,.22],[a*.6,-2,.3],[.4,0,0],i);for(let l=0;l<3;l++)this.m(Fn,this.accent,[.08,.5,.08],[(l-1)*.2,-1.2,.3],[1.2,0,0],c)}this.height=10}buildGiant(){let e=this.def,t={maton:"mavuong",thienma:"mavuong",huyetma:"matu",thienloithan:"loitu",cuuthienhuyennu:"tiennu"},n=e.key==="cuuthienhuyennu",i=Ki.find(r=>r.cls===(t[e.key]??"mavuong")&&r.female===n)??Ki[0];this.giant=new bs(i.id,{scale:4.6,colors:{robe:e.color,trim:e.color2},noLabel:!0}),this.giant.setInfo("",59,"",!0),this.body.add(this.giant.root),this.height=9}set(e){this.tx=e.x,this.tz=e.z,this.tRy=e.ry,e.p!==this.pose&&(this.pose=e.p,this.poseT=0),this.phase=e.phase}flash(){this.hitT=.2}headPos(e=new S){let t=this.parts.head;return t?t.getWorldPosition(e):e.set(this.x,this.height*.75,this.z)}update(e,t,n){let i=1-Math.exp(-e*3);this.x+=(this.tx-this.x)*i,this.z+=(this.tz-this.z)*i;let r=this.tRy-this.ry;r=Math.atan2(Math.sin(r),Math.cos(r)),this.ry+=r*Math.min(1,e*3),this.root.position.set(this.x,0,this.z),this.body.rotation.y=this.ry,this.poseT+=e,this.hitT=Math.max(0,this.hitT-e);let o=this.pose,a=this.poseT,c=this.phase>=3||o==="rage",l=this.rageGlow.material;l.opacity=(this.phase>=3?.55:this.phase===2?.3:.15)+Math.sin(t*6)*.08,this.accent.emissiveIntensity=(c?2.6:1.2)+Math.sin(t*5)*.3;let h=new le(this.def.color2);for(let m of this.mats)this.hitT>0?m.emissive.setRGB(1,.4,.4):m.emissive.copy(h),m.emissiveIntensity=this.hitT>0?this.hitT*4:c?.18:.04;let u=(c?1.08:1)*this.baseScale;if(this.body.scale.lerp(new S(u,u,u),e*2),o==="die"){this.deadT+=e,this.body.rotation.z=Math.min(1.3,this.deadT*.8),this.body.position.y=-Math.max(0,this.deadT-1.2)*2.5,l.opacity=Math.max(0,.8-this.deadT*.3),this.giant&&this.giant.update(e,t,n);return}if(this.deadT=0,this.body.rotation.z=0,this.body.position.y=0,this.glb){this.glb.play(o==="move"?"move":o),this.glb.update(e);return}if(this.giant){this.giant.setPose(o==="atk"?"atk":o==="cast"||o==="roar"||o==="rage"?"cast":o==="hit"?"hit":o==="move"?"move":"idle"),this.giant.update(e,t,n),this.giant.root.position.y=.6+Math.sin(t*1.2)*.4;return}let d=this.parts.jaw,f=this.parts.head,g=o==="roar"||o==="rage"?.7:o==="cast"?.5:o==="atk"?.4*Math.sin(Math.min(1,a/.6)*Math.PI):.05+Math.sin(t*2)*.03;d&&(d.rotation.x=g);let x=o==="atk"?Math.sin(Math.min(1,a/.7)*Math.PI):0;if(this.def.body==="dragon"){let m=7+Math.sin(t*.8)*.8-x*3+(o==="roar"||o==="rage"?1.5:0);f.position.set(0,m,2+x*5),f.rotation.set(x*.5-(o==="roar"?.5:0)+.15,Math.sin(t*.7)*.2,0);let p=f.position.clone(),v=t*1.6;this.segs.forEach((y,_)=>{let C=_+1,w=new S(Math.sin(C*.25-v)*(1.5+C*.14),m-.3-C*.09+Math.sin(C*.34-v*1.2)*1.4,1.4-C*.78);if(C>19){let R=Math.PI+(C-19)*.29,I=Math.min(1,(C-19)/4),b=w.x,M=w.y;w.set(b*(1-I)+Math.sin(R)*5.5*I,M*(1-I)+(2.5+Math.sin(C*.4-v)*.8)*I,-7.9+Math.cos(R)*5.5)}y.position.copy(w),y.lookAt(this.body.localToWorld(p.clone())),p=w})}else if(this.def.body==="bird"){let m=this.parts.torso;m.position.y=6+Math.sin(t*2.2)*.6-x*2.5,m.rotation.x=x*.4;let p=Math.sin(t*(o==="move"||o==="atk"?7:3.5))*(o==="roar"||o==="cast"?.9:.6);for(let[v,y]of this.tails){let _=v.userData.side;v.rotation.z=_*p,v.children.forEach((C,w)=>{w!==0&&(C.rotation.z=_*p*.3)})}f.rotation.x=o==="roar"?-.6:x*.6}else{let m=this.parts.torso,p=o==="move"?t*6:0;this.segs.forEach((v,y)=>{let _=o==="move"?Math.sin(p+(y%2?Math.PI:0)+(y>1?Math.PI/2:0))*.5:0;v.rotation.x=_-(y<2?x*.9:-x*.3),v.userData.lo.rotation.x=Math.max(0,-_)*.6+(y<2?x*.8:0)}),m.rotation.x=-x*.25+(o==="roar"||o==="rage"?-.12:0),m.position.z=x*2.5,m.position.y=(this.def.body==="turtle"?2.4:4.2)+Math.sin(t*1.5)*.08,f.rotation.x=o==="roar"||o==="rage"?-.6:o==="cast"?-.3:x*.3+Math.sin(t)*.05,f.rotation.y=Math.sin(t*.6)*.15,this.tails.forEach((v,y)=>v.forEach((_,C)=>{_.rotation.y=Math.sin(t*2+C*.5+y)*.18,_.rotation.x=Math.sin(t*1.4+C*.4+y*.7)*.08+(this.tails.length>1?.06:-.05)}))}}dispose(){this.glb?.dispose(),this.giant?.dispose();for(let e of this.mats)e.dispose();this.accent.dispose(),this.rageGlow.material.dispose(),this.root.removeFromParent()}};var ot=(s=0,e=0,t=0)=>new S(s,e,t),je=(s=1)=>(Math.random()-.5)*2*s,ct={sph:new en(1,20,14),ring:new zi(.85,1,64),disc:new En(1,48),cone:new $t(1,1,10),cyl:new Mt(1,1,1,24,1,!0),box:new vt(1,1,1),arc:new Dn(1,.08,6,40,Math.PI*.9),plane:new Yt(1,1),sword:(()=>{let s=new xs;s.moveTo(0,0),s.lineTo(.08,.15),s.lineTo(.05,1.6),s.lineTo(0,1.85),s.lineTo(-.05,1.6),s.lineTo(-.08,.15),s.closePath();let e=new vr(s,{depth:.02,bevelEnabled:!1});return e.translate(0,-.9,-.01),e.rotateX(Math.PI/2),e})()},Ct=(s,e=1)=>new xt({color:s,transparent:!0,opacity:e,blending:Ot,depthWrite:!1,side:Dt}),Ru=class{constructor(){z(this,"N",6e3);z(this,"i",0);z(this,"pos");z(this,"col");z(this,"size");z(this,"alpha");z(this,"vel");z(this,"life");z(this,"max");z(this,"grav");z(this,"drag");z(this,"s0");z(this,"geo",new _t);z(this,"points");let e=this.N;this.pos=new Float32Array(e*3),this.col=new Float32Array(e*3),this.size=new Float32Array(e),this.alpha=new Float32Array(e),this.vel=new Float32Array(e*3),this.life=new Float32Array(e),this.max=new Float32Array(e),this.grav=new Float32Array(e),this.drag=new Float32Array(e),this.s0=new Float32Array(e),this.geo.setAttribute("position",new Tt(this.pos,3).setUsage(_o)),this.geo.setAttribute("color",new Tt(this.col,3).setUsage(_o)),this.geo.setAttribute("size",new Tt(this.size,1).setUsage(_o)),this.geo.setAttribute("alpha",new Tt(this.alpha,1).setUsage(_o));let t=new St({uniforms:{map:{value:qn()},scale:{value:600}},transparent:!0,depthWrite:!1,blending:Ot,vertexColors:!0,vertexShader:`attribute float size; attribute float alpha; varying vec3 vC; varying float vA; uniform float scale;
        void main(){ vC = color; vA = alpha; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * scale / -mv.z; gl_Position = projectionMatrix * mv; }`,fragmentShader:"uniform sampler2D map; varying vec3 vC; varying float vA; void main(){ vec4 t = texture2D(map, gl_PointCoord); gl_FragColor = vec4(vC * 1.6, t.a * vA); if (gl_FragColor.a < 0.01) discard; }"});this.points=new ki(this.geo,t),this.points.frustumCulled=!1,this.points.renderOrder=5}emit(e,t,n,i,r,o=0,a=.5){let c=this.i=(this.i+1)%this.N,l=c*3;this.pos[l]=e.x,this.pos[l+1]=e.y,this.pos[l+2]=e.z,this.vel[l]=t.x,this.vel[l+1]=t.y,this.vel[l+2]=t.z,this.col[l]=n.r,this.col[l+1]=n.g,this.col[l+2]=n.b,this.size[c]=this.s0[c]=i,this.life[c]=this.max[c]=r,this.grav[c]=o,this.drag[c]=a,this.alpha[c]=1}burst(e,t,n,i,r=.5,o=.9,a=-4){for(let c=0;c<n;c++){let l=ot(je(),je(),je()).normalize().multiplyScalar(i*(.3+Math.random()));this.emit(e,l,t,r*(.5+Math.random()),o*(.5+Math.random()*.8),a,1.2)}}update(e){for(let t=0;t<this.N;t++){if(this.life[t]<=0){this.alpha[t]&&(this.alpha[t]=0);continue}this.life[t]-=e;let n=t*3,i=Math.exp(-this.drag[t]*e);this.vel[n]*=i,this.vel[n+1]=this.vel[n+1]*i+this.grav[t]*e,this.vel[n+2]*=i,this.pos[n]+=this.vel[n]*e,this.pos[n+1]+=this.vel[n+1]*e,this.pos[n+2]+=this.vel[n+2]*e;let r=Math.max(0,this.life[t]/this.max[t]);this.alpha[t]=Math.min(1,r*2.2),this.size[t]=this.s0[t]*(.4+r*.6)}for(let t of["position","color","size","alpha"])this.geo.attributes[t].needsUpdate=!0}},xc=class{constructor(e){z(this,"scene");z(this,"parts",new Ru);z(this,"list",[]);z(this,"shake",0);z(this,"flash",0);z(this,"lights",[]);z(this,"telegraphs",[]);this.scene=e,e.add(this.parts.points);for(let t=0;t<6;t++){let n=new ti(16777215,0,30,1.6);e.add(n),this.lights.push({l:n,t:1,dur:1,i0:0})}}eff(e,t,n,i,r){this.scene.add(t);let o={t:0,dur:e,obj:t,mats:n,tick:i,done:r};return this.list.push(o),o}light(e,t,n=60,i=.5){let r=this.lights.reduce((o,a)=>o.t/o.dur>a.t/a.dur?o:a);r.l.position.copy(e),r.l.color.setHex(t),r.l.intensity=n,r.i0=n,r.t=0,r.dur=i}update(e,t){this.parts.update(e),this.shake=Math.max(0,this.shake-e*2.2),this.flash=Math.max(0,this.flash-e*2.5);for(let n of this.lights){if(n.t>=n.dur){n.l.intensity=0;continue}n.t+=e,n.l.intensity=n.i0*Math.max(0,1-n.t/n.dur)}for(let n=this.list.length-1;n>=0;n--){let i=this.list[n];i.t+=e;let r=Math.min(1,i.t/i.dur);if(i.tick(r,e,t),r>=1){i.done?.(),i.obj.removeFromParent();for(let o of i.mats)o.dispose();this.list.splice(n,1)}}}get count(){return this.list.length}explode(e,t,n=2,i={}){let r=new le(t),o=Ct(t,.9),a=Ct(16777215,.9),c=new ce;c.position.copy(e);let l=new q(ct.sph,o),h=new q(ct.sph,a);c.add(l,h);let u=null,d=null;i.ring!==!1&&(d=Ct(t,.8),u=new q(ct.ring,d),u.rotation.x=-Math.PI/2,u.position.y=-e.y+.1,c.add(u)),this.parts.burst(e,r,Math.round(20+n*14),6+n*3,.5+n*.12,.9,-5),this.light(e,t,40+n*25,.45),this.shake=Math.max(this.shake,i.shake??n*.08),this.eff(.7,c,[o,a,...d?[d]:[]],f=>{let g=1-Math.pow(1-f,3);l.scale.setScalar(n*(.4+g)),h.scale.setScalar(n*.5*(1-f)),o.opacity=.9*(1-f),a.opacity=1-f,u&&d&&(u.scale.setScalar(n*(.5+g*2.4)),d.opacity=.8*(1-f))})}formation(e,t,n,i=1.4,r=.08){let o=new xt({map:pc(),color:n,transparent:!0,blending:Ot,depthWrite:!1,side:Dt}),a=new q(ct.plane,o);a.rotation.x=-Math.PI/2,a.position.set(e.x,r,e.z),this.eff(i,a,[o],(c,l,h)=>{a.scale.setScalar(t*2*Math.min(1,c*4)),a.rotation.z=h*.8,o.opacity=c<.8?.95:(1-c)*4.75})}projectile(e,t,n,i,r,o){let a=new le(o.color),c=e.clone().lerp(t,.5);c.y+=o.arc??0;let l=new _r(e.clone(),c,t.clone());i.position.copy(e),this.eff(n,i,r,(h,u,d)=>{let f=l.getPoint(h),g=l.getPoint(Math.min(1,h+.02));i.position.copy(f),g.equals(f)||i.lookAt(g),o.spin&&i.rotateZ(d*20);for(let x=0;x<(o.trail??2);x++)this.parts.emit(f,ot(je(.6),je(.6),je(.6)),a,o.size??.5,.45,0,2)},()=>{o.impact&&this.explode(t,o.color,o.impact)})}bolt(e,t,n,i=.12,r=.35){let o=[],c=e.distanceTo(t);for(let x=0;x<=12;x++){let m=e.clone().lerp(t,x/12);x&&x<12&&m.add(ot(je(c*.04),je(c*.04),je(c*.04))),o.push(m)}let l=new bn(new Mn(o,!1,"catmullrom",.1),40,i,5,!1),h=Ct(16777215,1),u=Ct(n,.8),d=new ce,f=new q(l,h),g=new q(l,u);g.scale.setScalar(1),d.add(f,g);for(let x=0;x<3;x++){let m=o[3+x*3],p=m.clone().add(ot(je(c*.15),-Math.random()*c*.1,je(c*.15)));d.add(new q(new bn(new co(m,p),4,i*.5,4),u))}this.eff(r,d,[h,u],x=>{let m=Math.random()>.3?1:.3;h.opacity=(1-x)*m,u.opacity=.8*(1-x)*m},()=>{l.dispose(),d.children.forEach(x=>x.geometry.dispose())}),this.light(t,n,80,.25)}spiritDragon(e,t,n,i,r=1.6){let a=Ct(n,.85),c=Ct(16777215,.9),l=new mn(ct.sph,a,42);l.frustumCulled=!1;let h=new q(ct.sph,c),u=new ce;u.add(l,h);let d=new le(n),f=new rt,g=ot(0,9*i,0),x=ot(t.z-e.z,0,e.x-t.x).normalize().multiplyScalar(5*i),m=p=>{let v=e.clone().lerp(t,p);v.add(g.clone().multiplyScalar(Math.sin(p*Math.PI)*1)).add(x.clone().multiplyScalar(Math.sin(p*Math.PI*2)));let y=p>.75?(p-.75)*4:0;return v.x+=Math.sin(p*28)*y*2*i,v.z+=Math.cos(p*28)*y*2*i,v};this.eff(r,u,[a,c],p=>{let v=Math.min(1,p*1.25);for(let y=0;y<42;y++){let _=Math.max(0,v-y*.012);f.position.copy(m(_)),f.scale.setScalar(i*(.9-y/42*.7)*(y===0?1.5:1)),f.updateMatrix(),l.setMatrixAt(y,f.matrix),y%6===0&&this.parts.emit(f.position,ot(je(.5),je(.5),je(.5)),d,.7*i,.5,0,2)}l.instanceMatrix.needsUpdate=!0,h.position.copy(m(v)),h.scale.setScalar(i*.8),a.opacity=p>.85?(1-p)*5.6:.85},()=>this.explode(t,n,2.5*i,{shake:.4*i}))}cast(e,t,n,i,r,o=!1){let a=o?1.6:1,c=new le(i);switch(e){case"qiwave":case"slash":case"claw":{let l=e==="claw"?3:e==="slash"?2:1;for(let h=0;h<l;h++){let u=Ct(i,.95),d=new q(ct.arc,u);d.scale.setScalar(e==="qiwave"?1.1*a:1.6*a);let f=new ce;f.add(d),d.rotation.set(Math.PI/2,0,e==="claw"?-.6+h*.15:je(.8)),e==="qiwave"?this.projectile(t,n,.42,f,[u],{color:i,trail:3,impact:.8*a}):(f.position.copy(n).add(ot((h-1)*.5,.2,0)),f.lookAt(t),this.eff(.4,f,[u],g=>{d.scale.setScalar((1+g*1.5)*1.6*a),u.opacity=1-g}),this.parts.burst(n,c,18,6,.4,.5,-3))}break}case"flysword":{for(let l=0;l<(o?5:1);l++){let h=Ct(i,1),u=new q(ct.sword,h);u.scale.setScalar(1.1*a);let d=new ce;d.add(u);let f=t.clone().add(ot(je(1.5),2+l*.5,je(1.5)));this.projectile(f,n,.55+l*.08,d,[h],{arc:6,color:i,trail:3,impact:1.1*a})}break}case"swordrain":{let l=o?90:50,h=Ct(i,1),u=new mn(ct.sword,h,l);u.frustumCulled=!1;let d=Math.max(4,r),f=new rt,g=Array.from({length:l},()=>({x:n.x+je(d),z:n.z+je(d),delay:Math.random()*.9,hit:!1}));this.formation(n,d,i,2.2),this.eff(2,u,[h],x=>{let m=x*2;g.forEach((p,v)=>{let y=Math.max(0,Math.min(1,(m-p.delay)/.45));f.position.set(p.x,26-y*26,p.z),f.rotation.set(Math.PI,0,0),f.scale.setScalar(y>0&&y<1?1.3:.001),f.updateMatrix(),u.setMatrixAt(v,f.matrix),y>=1&&!p.hit&&(p.hit=!0,this.parts.burst(ot(p.x,.3,p.z),c,6,5,.4,.4,-6))}),u.instanceMatrix.needsUpdate=!0},()=>this.explode(n,i,3*a,{shake:.5})),this.shake=Math.max(this.shake,.3);break}case"swordarray":{let h=Ct(i,1),u=new mn(ct.sword,h,12);u.frustumCulled=!1;let d=new rt,f=Math.max(3,r);this.formation(n,f,i,1.8),this.eff(1.6,u,[h],(g,x,m)=>{for(let p=0;p<12;p++){let v=p/12*Math.PI*2+m*2,y=Math.max(0,(g-.6)/.4),_=f*(1-y);d.position.set(n.x+Math.sin(v)*_,6-y*5.6,n.z+Math.cos(v)*_),d.lookAt(n.x,0,n.z),d.scale.setScalar(1.2*a),d.updateMatrix(),u.setMatrixAt(p,d.matrix)}u.instanceMatrix.needsUpdate=!0},()=>this.explode(n,i,2.6*a));break}case"bolt":this.bolt(t,n,i,.08*a),this.parts.burst(n,c,14,7,.4,.4);break;case"thunder":{let l=Math.max(2,r),h=o?9:4;this.formation(n,l,i,1.6),o&&this.cloud(n,l*1.3,1708080,1.8);for(let u=0;u<h;u++)setTimeout(()=>{let d=n.clone().add(ot(je(l*.8),0,je(l*.8)));d.y=.2,this.bolt(d.clone().add(ot(je(2),34,je(2))),d,i,.18*a,.3),this.explode(d,i,1.4*a,{shake:.25})},u*140);this.flash=Math.max(this.flash,o?.6:.25);break}case"fireball":case"icearrow":{let l=Ct(i,1),h=Ct(16777215,1),u=new ce;if(e==="fireball"){let d=new q(ct.sph,l);d.scale.setScalar(.45*a);let f=new q(ct.sph,h);f.scale.setScalar(.25*a),u.add(d,f)}else{let d=new q(ct.cone,l);d.scale.set(.15*a,1.2*a,.15*a),d.rotation.x=Math.PI/2,u.add(d)}this.projectile(t,n,.5,u,[l,h],{arc:e==="fireball"?2:.5,color:i,trail:4,size:.7,impact:1.3*a});break}case"meteor":{let l=Ct(i,1),h=Ct(16774064,1),u=new ce,d=new q(ct.sph,l),f=new q(ct.sph,h);d.scale.setScalar(2.2*a),f.scale.setScalar(1.4*a),u.add(d,f),this.formation(n,Math.max(4,r),i,1.4),this.projectile(n.clone().add(ot(-14,36,-8)),n,1.1,u,[l,h],{color:i,trail:10,size:1.6,impact:5*a}),setTimeout(()=>{this.flash=Math.max(this.flash,.5),this.shake=1},1100);break}case"flamepillar":case"holybeam":{let l=Ct(i,.8),h=Ct(16777215,.7),u=new ce;u.position.set(n.x,0,n.z);let d=new q(ct.cyl,l),f=new q(ct.cyl,h);u.add(d,f);let g=Math.max(1.2,r*.5)*a;this.formation(n,g*1.6,i,1.4),this.eff(1.3,u,[l,h],(x,m,p)=>{let v=20*Math.min(1,x*3),y=x<.8?1:(1-x)*5;d.scale.set(g*y,v,g*y),d.position.y=v/2,f.scale.set(g*.45*y,v,g*.45*y),f.position.y=v/2,d.rotation.y=p*4;for(let _=0;_<4;_++)this.parts.emit(ot(n.x+je(g),Math.random()*v,n.z+je(g)),ot(0,6,0),c,.8,.6,2,.5)}),this.light(ot(n.x,3,n.z),i,120,1.2);break}case"icefield":case"quake":case"rockfall":{let l=Math.max(3,r)*(o?1.3:1),h=e==="icefield"?22:16,u=e==="icefield"?new Rt({color:12580095,emissive:i,emissiveIntensity:.6,roughness:.1,metalness:.1,transparent:!0,opacity:.9}):new Rt({color:5916210,emissive:e==="quake"?i:2230272,emissiveIntensity:.4,roughness:.9}),d=new ce,f=Array.from({length:h},()=>{let g=new q(e==="icefield"?ct.cone:ct.box,u),x=Math.random()*Math.PI*2,m=Math.sqrt(Math.random())*l;return g.position.set(n.x+Math.sin(x)*m,0,n.z+Math.cos(x)*m),g.rotation.set(je(.3),Math.random()*3,je(.3)),d.add(g),{mm:g,s:.6+Math.random()*1.2,d:Math.random()*.35}});this.formation(n,l,i,1.6),e!=="rockfall"&&this.explode(ot(n.x,.2,n.z),i,l*.4,{shake:.5}),this.eff(1.6,d,[u],g=>{let x=g*1.6;for(let m of f){let p=Math.max(0,Math.min(1,(x-m.d)/.25));if(e==="rockfall")m.mm.position.y=Math.max(m.s*.5,22*(1-p)),m.mm.scale.setScalar(m.s*(p>0?1:.001));else{let v=g>.75?1-(g-.75)*4:1;m.mm.scale.set(m.s*.5*v+.001,m.s*2.2*p*v+.001,m.s*.5*v+.001),m.mm.position.y=m.mm.scale.y/2}}e==="icefield"&&g>.75&&(u.opacity=(1-g)*3.6)},()=>this.parts.burst(ot(n.x,1,n.z),c,40,8,.5,.8,-8));break}case"tornado":case"leafstorm":{let l=Math.max(2,r)*a,h=Ct(i,.35),u=new ce;u.position.set(n.x,0,n.z);let d=new q(new Mt(l,l*.25,10,28,6,!0),h);d.position.y=5,e==="tornado"&&u.add(d),this.eff(2,u,[h],(f,g,x)=>{d.rotation.y=x*9,h.opacity=.35*Math.sin(f*Math.PI);for(let m=0;m<8;m++){let p=x*8+m*.8,v=Math.random()*9,y=l*(.3+v/12);this.parts.emit(ot(n.x+Math.sin(p)*y,v,n.z+Math.cos(p)*y),ot(Math.cos(p)*6,2,-Math.sin(p)*6),e==="leafstorm"&&m%2?new le(16751317):c,.45,.6,0,1)}});break}case"roar":{for(let l=0;l<4;l++){let h=Ct(i,.7),u=new q(new Dn(1,.1,6,40),h),d=new ce;d.add(u),d.position.copy(t),d.lookAt(n),setTimeout(()=>this.eff(.6,d,[h],f=>{u.scale.setScalar(1+f*6*a),u.position.z=f*t.distanceTo(n),h.opacity=.7*(1-f)},()=>u.geometry.dispose()),l*90)}this.shake=Math.max(this.shake,.25);break}case"demonpalm":{let l=Ct(i,.8),h=new ce,u=new ce;h.add(u);let d=new q(ct.box,l);d.scale.set(1.6,1.8,.4),u.add(d);for(let f=0;f<5;f++){let g=new q(ct.box,l);g.scale.set(.3,f===0?1:1.4,.3),g.position.set(f===0?-1:-.6+(f-1)*.4,f===0?.2:1.6,0),g.rotation.z=f===0?.6:0,u.add(g)}u.scale.setScalar(1.3*a),u.rotation.x=-Math.PI/2,this.projectile(t.clone().add(ot(0,3,0)),n,.7,h,[l],{arc:3,color:i,trail:6,size:1,impact:2.4*a});break}case"darkbeam":case"bloodwave":{if(e==="bloodwave"){this.spiritDragon(t,n,i,.9*a);break}let l=Ct(i,.9),h=Ct(16777215,.8),u=new ce,d=new q(ct.cyl,l),f=new q(ct.cyl,h);u.add(d,f);let g=t.distanceTo(n);u.position.copy(t).lerp(n,.5),u.lookAt(n),u.rotateX(Math.PI/2),this.eff(1,u,[l,h],(x,m,p)=>{let v=(x<.15?x/.15:x>.8?(1-x)*5:1)*(.9+Math.sin(p*40)*.1)*a;d.scale.set(v*.9,g,v*.9),f.scale.set(v*.35,g,v*.35),this.parts.emit(t.clone().lerp(n,Math.random()),ot(je(2),je(2),je(2)),c,.8,.4,0,1)},()=>this.explode(n,i,2.2*a)),this.light(n,i,100,1);break}case"firedragon":case"icedragon":case"lightdragon":case"dragon":this.spiritDragon(t,n,i,(e==="dragon"?1.4:1)*a,e==="dragon"?2:1.6);break;case"lotus":case"heal":{let l=Ct(i,.8),h=new ce;h.position.set(n.x,.1,n.z);let u=new q(ct.ring,l);if(u.rotation.x=-Math.PI/2,h.add(u),e==="lotus")for(let f=0;f<12;f++){let g=new q(ct.sph,l);g.scale.set(.5,.12,1.4);let x=f/12*Math.PI*2;g.position.set(Math.sin(x)*1.2,.3,Math.cos(x)*1.2),g.rotation.set(-.6,x,0),h.add(g)}let d=Math.max(2,r);this.eff(1.4,h,[l],f=>{h.scale.setScalar(d*Math.min(1,f*3)*.6),l.opacity=.8*(1-f);for(let g=0;g<3;g++)this.parts.emit(ot(n.x+je(d),.2,n.z+je(d)),ot(0,3+Math.random()*3,0),e==="heal"?new le(7208858):c,.5,.9,0,.5)});break}case"shield":{let l=new xt({color:i,transparent:!0,opacity:.25,blending:Ot,depthWrite:!1}),h=new q(ct.sph,l);h.position.set(n.x,1.1,n.z),this.eff(1.6,h,[l],(u,d,f)=>{h.scale.setScalar(Math.max(1.6,r*.5)*Math.min(1,u*5)),l.opacity=.28*(1-u)+Math.sin(f*10)*.04});break}case"phoenix":{let l=Ct(i,1),h=Ct(16765002,.85),u=new ce,d=new ce;u.add(d);let f=new q(ct.sph,l);f.scale.set(.7,.6,1.6),d.add(f);let g=new ce,x=new ce;for(let[m,p]of[[g,1],[x,-1]]){for(let v=0;v<5;v++){let y=new q(ct.box,h);y.scale.set(2.6-v*.25,.06,.5),y.position.set(p*(1.4+v*.1),0,-v*.45),y.rotation.y=p*v*.12,m.add(y)}d.add(m)}for(let m=0;m<5;m++){let p=new q(ct.box,h);p.scale.set(.25,.05,3),p.position.set((m-2)*.3,0,-2.4),p.rotation.y=(m-2)*.15,d.add(p)}d.scale.setScalar(1.5*a),this.projectile(n.clone().add(ot(-18,18,-10)),n,1.6,u,[l,h],{arc:8,color:i,trail:10,size:1.2,impact:4*a}),this.eff(1.6,new ce,[],(m,p,v)=>{let y=Math.sin(v*14)*.6;g.rotation.z=y,x.rotation.z=-y});break}}}cloud(e,t,n,i){let r=new cn({map:mc(),color:n,transparent:!0,depthWrite:!1,opacity:0}),o=new ce;o.position.set(e.x,18,e.z);for(let a=0;a<14;a++){let c=new pn(r),l=a*2.4,h=Math.sqrt(a/14)*t;c.position.set(Math.sin(l)*h,je(1),Math.cos(l)*h),c.scale.setScalar(t*.9),o.add(c)}this.eff(i,o,[r],(a,c,l)=>{r.opacity=Math.sin(a*Math.PI)*.85,o.rotation.y=l*.2})}breakthrough(e,t,n){let i=new le(t);this.formation(ot(e.x,0,e.z),n?5:2.4,t,n?3:1.6);let r=n?160:60;for(let o=0;o<r;o++){let a=Math.random()*Math.PI*2,c=4+Math.random()*6,l=ot(e.x+Math.sin(a)*c,.5+Math.random()*5,e.z+Math.cos(a)*c),h=ot(e.x,1.3,e.z).sub(l).multiplyScalar(1.4);this.parts.emit(l,h,i,.45,.7,0,0)}if(!n){setTimeout(()=>this.explode(ot(e.x,1.2,e.z),t,1.4,{shake:.1}),600);return}this.cloud(e,6,1313830,3);for(let o=0;o<6;o++)setTimeout(()=>{let a=ot(e.x+je(.3),.5,e.z+je(.3));this.bolt(a.clone().add(ot(je(3),30,je(3))),a,11832575,.2,.3),this.shake=Math.max(this.shake,.35),this.flash=Math.max(this.flash,.35)},500+o*320);setTimeout(()=>{this.cast("holybeam",e,e,t,3,!0),this.explode(ot(e.x,1.2,e.z),t,3.5,{shake:.6})},2500)}telegraph(e,t,n,i=16722474){let r=new xt({color:i,transparent:!0,opacity:.25,depthWrite:!1,side:Dt}),o=new xt({color:i,transparent:!0,opacity:.85,depthWrite:!1,side:Dt}),a=new ce;a.position.set(e.x,.12,e.z),a.rotation.x=-Math.PI/2;let c=new q(ct.disc,r),l=new q(ct.ring,o);l.scale.setScalar(t),a.add(c,l),this.eff(n,a,[r,o],h=>{c.scale.setScalar(Math.max(.01,t*h)),o.opacity=.5+Math.sin(h*30)*.35})}};var _c=class{constructor(e){z(this,"ws",null);z(this,"retry",0);z(this,"onState",()=>{});z(this,"onStatus",()=>{});z(this,"role");this.role=e}connect(){let e=new WebSocket(`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws?role=${this.role}`);this.ws=e,e.onopen=()=>{this.retry=0,this.onStatus(!0)},e.onmessage=t=>{try{this.onState(JSON.parse(t.data))}catch(n){console.error(n)}},e.onclose=()=>{this.onStatus(!1),setTimeout(()=>this.connect(),Math.min(1e4,500*2**this.retry++))}}send(e){this.ws?.readyState===1&&this.ws.send(JSON.stringify(e))}};var Ft=s=>document.getElementById(s),wn=s=>String(s??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),es=s=>s>=1e9?(s/1e9).toFixed(1)+"B":s>=1e6?(s/1e6).toFixed(1)+"M":s>=1e4?(s/1e3).toFixed(1)+"K":Math.round(s).toLocaleString("vi-VN"),cp=(s,e)=>s?`<img class="av" src="${wn(s)}" referrerpolicy="no-referrer" alt="">`:`<span class="av ph">${wn((e||"?").replace(/^NPC /,"").slice(0,1).toUpperCase())}</span>`,wo=[{key:"power",title:"\u2694\uFE0F TOP CHI\u1EBEN L\u1EF0C",unit:s=>es(s.v)},{key:"tuvi",title:"\u262F\uFE0F TOP TU VI",unit:s=>"T\u1EA7ng "+(s.v+1)},{key:"bossDmg",title:"\u{1F409} TOP S\xC1T TH\u01AF\u01A0NG BOSS",unit:s=>es(s.v)},{key:"pk",title:"\u{1F3C6} TOP PK",unit:s=>es(s.v)+" \u0111i\u1EC3m"},{key:"sects",title:"\u{1F3EF} TOP T\xD4NG M\xD4N",unit:s=>s.v+" th\u1EAFng"},{key:"donors",title:"\u{1F48E} TOP T\u1EB6NG QU\xC0",unit:s=>es(s.v)+" xu"}],yc=class{constructor(e){z(this,"boards",null);z(this,"boardIdx",0);z(this,"boardAt",0);z(this,"nums",[]);z(this,"numI",0);z(this,"bannerN",0);document.body.classList.toggle("live",e),Ft("gifts").innerHTML='<div class="ph">\u{1F381} QU\xC0 = PH\xC1P THU\u1EACT</div>'+Eo.map(t=>`<div class="gt"><b>${t.xu}</b><span>${t.icon} ${wn(t.name)}</span></div>`).join("")+'<div class="gt note">M\u1ECDi qu\xE0: +tu vi \xB7 n\xE2ng ph\xE1p b\u1EA3o \xB7 t\u1EB7ng l\xE0 v\xE0o tr\u1EADn</div>',Ft("howto").innerHTML="<b>C\xC1CH CH\u01A0I</b> \xB7 G\xF5 <i>1</i> v\xE0o game \xB7 G\xF5 l\u1EDBp: <i>kiem</i> <i>dao</i> <i>phap</i> <i>ma</i> <i>tien nu</i> <i>long</i> <i>yeu</i> <i>the tu</i> <i>tran</i> <i>dan</i> <i>loi</i> <i>bang</i> \xB7 <i>nam</i>/<i>nu</i> \xB7 T\xF4ng m\xF4n: <i>tong 1</i>\u2013<i>tong 4</i> \xB7 <i>pk</i> th\xE1ch \u0111\u1EA5u \xB7 <i>doat</i> tranh b\u1EA3o v\u1EADt \xB7 Tim = tu vi";for(let t=0;t<40;t++){let n=document.createElement("div");n.className="num",Ft("nums").append(n),this.nums.push(n)}}setMode(e,t){Ft("modeTitle").textContent=e.title;let n=Math.ceil(e.leftMs/1e3);Ft("modeTime").textContent=e.mode==="tuluyen"?`Ti\u1EBFp theo: ${e.next} \xB7 ${n}s`:`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`,document.body.dataset.mode=e.mode;let i=Ft("bossbar");if(t&&e.mode==="boss"){i.hidden=!1;let o=Math.max(0,t.hp/Math.max(1,t.mhp));Ft("bossName").textContent=t.name,Ft("bossPhase").textContent=t.p==="die"?"\u0110\xC3 B\u1ECA TI\xCAU DI\u1EC6T":`Giai \u0111o\u1EA1n ${t.phase}${t.phase===3?" \xB7 N\u1ED4I GI\u1EACN":t.phase===2?" \xB7 Cu\u1ED3ng b\u1EA1o":""}`,Ft("bossHp").textContent=`${es(t.hp)} / ${es(t.mhp)}`,Ft("bossFill").style.width=(o*100).toFixed(2)+"%",i.classList.toggle("rage",t.phase>=3)}else i.hidden=!0;let r=Ft("sides");e.sides.length===2&&e.mode!=="boss"?(r.hidden=!1,r.innerHTML=e.sides.map((o,a)=>`<div class="side s${a}" style="--c:${Yn(o.color)}"><b>${wn(o.name)}</b><span>${e.mode==="sect"?`\u{1F5E1} ${o.score} h\u1EA1 \xB7 `:""}${o.alive} c\xF2n \u0111\u1EE9ng</span></div>`).join('<div class="vs">VS</div>')):r.hidden=!0}setBoards(e,t){this.boards=e,t-this.boardAt>8e3&&(this.boardAt=t,this.boardIdx=(this.boardIdx+1)%wo.length);let n=wo[this.boardIdx],i=e[n.key];for(let o=0;o<wo.length&&!i.length;o++)this.boardIdx=(this.boardIdx+1)%wo.length,n=wo[this.boardIdx],i=e[n.key];Ft("board").innerHTML=`<div class="ph">${n.title}</div>`+(i.length?i.slice(0,8).map((o,a)=>`<div class="row r${a+1}"><span class="rk">${a+1}</span>${n.key==="sects"?"":cp(o.av,o.name)}<span class="nm">${wn(o.name)}<small>${wn(o.sub??"")}</small></span><span class="v">${wn(n.unit(o))}</span></div>`).join(""):'<div class="empty">G\xF5 1 \u0111\u1EC3 b\u01B0\u1EDBc v\xE0o ti\xEAn gi\u1EDBi!</div>');let r=e.bossNow;Ft("bossTop").innerHTML=r.length?r.map((o,a)=>`<span>${a+1}. ${wn(o.name)} <b>${es(o.v)}</b></span>`).join(""):""}setLive(e,t,n){let i=e.status==="connected"?`\u{1F534} LIVE @${e.uniqueId}`:e.status==="connecting"?"\u0110ang n\u1ED1i TikTok\u2026":e.status==="reconnecting"?"\u0110ang n\u1ED1i l\u1EA1i\u2026":e.status==="error"?"L\u1ED7i: "+e.error:"Ch\u01B0a n\u1ED1i TikTok";Ft("live").textContent=i,Ft("live").classList.toggle("on",e.status==="connected"),t!==void 0&&(Ft("viewers").textContent=`\u{1F465} ${t}${n?" \xB7 "+es(n)+" tu s\u0129":""}`)}announce(e,t="",n="#ffe9a8",i=3200){let r=Ft("center");r.innerHTML=`<div class="t" style="--c:${n}">${wn(e)}</div>${t?`<div class="s">${wn(t)}</div>`:""}`,r.hidden=!1,r.classList.remove("pop"),r.offsetWidth,r.classList.add("pop"),clearTimeout(r._t),r._t=window.setTimeout(()=>{r.hidden=!0},i)}gift(e,t,n,i,r,o,a){let c=Ft("banners"),l=document.createElement("div");for(l.className="banner"+(a>=500?" vip":a>=99?" big":""),l.innerHTML=`${cp(t,e)}<div><b>${wn(e)}</b><span>t\u1EB7ng ${wn(n)}${i>1?" x"+i:""}</span></div><div class="tier">${o} ${wn(r)}</div>`,c.prepend(l);c.children.length>4;)c.lastChild.remove();setTimeout(()=>l.classList.add("out"),4200),setTimeout(()=>l.remove(),4800),this.bannerN++}feed(e){let t=Ft("feed"),n=document.createElement("div");for(n.textContent=e,t.prepend(n);t.children.length>5;)t.lastChild.remove();setTimeout(()=>n.classList.add("out"),5e3),setTimeout(()=>n.remove(),5600)}number(e,t,n,i){let r=this.nums[this.numI=(this.numI+1)%this.nums.length];r.className="num "+i,r.textContent=n,r.style.left=e.toFixed(0)+"px",r.style.top=t.toFixed(0)+"px",r.offsetWidth,r.classList.add("go")}breakthrough(e,t,n){let i=Yn(vs[$i(t)]);n?this.announce("\u26A1 \u0110\u1ED8 KI\u1EBEP TH\xC0NH C\xD4NG \u26A1",`${e} \u0111\u1ED9t ph\xE1 ${vo(t)}`,i,4200):this.feed(`\u2728 ${e} \u0111\u1ED9t ph\xE1 ${vo(t)}`)}artifact(e,t,n,i){let r=Zi.get(t);r&&(i||n===1||n%5===0?this.announce(`${r.icon} ${i?"R\u01A0I B\u1EA2O V\u1EACT":"LUY\u1EC6N TH\xC0NH PH\xC1P B\u1EA2O"}`,`${e} \xB7 ${r.name} c\u1EA5p ${n}`,Yn(r.color),2800):this.feed(`${r.icon} ${e}: ${r.name} l\xEAn c\u1EA5p ${n}`))}controls(e){if(!e)return;let t=Ft("setVoice");t&&document.activeElement!==t&&(t.checked=e.voice);let n=Ft("setNpc");n&&document.activeElement!==n&&(n.value=String(e.npcs))}};var $n=(s=1)=>(Math.random()-.5)*2*s,Cu=7,it=()=>(Cu=Cu*16807%2147483647,Cu/2147483647);function hp(s,e,t,n=1){let i=document.createElement("canvas");i.width=s,i.height=e,t(i.getContext("2d"));let r=new xr(i);return r.colorSpace=Pt,r.wrapS=r.wrapT=xi,r.repeat.set(n,n),r.anisotropy=8,r}var Fv=()=>hp(512,512,s=>{s.fillStyle="#3e434d",s.fillRect(0,0,512,512);for(let e=0;e<8;e++)for(let t=0;t<8;t++){let n=70+it()*34;s.fillStyle=`rgb(${n-4},${n},${n+12})`,s.fillRect(t*64+2,e*64+2,60,60);for(let i=0;i<6;i++)s.fillStyle=`rgba(0,0,0,${it()*.08})`,s.beginPath(),s.arc(t*64+it()*64,e*64+it()*64,it()*10,0,7),s.fill()}},6),lp=()=>hp(256,256,s=>{s.fillStyle="#4a4440",s.fillRect(0,0,256,256);for(let e=0;e<400;e++){let t=40+it()*60;s.fillStyle=`rgba(${t},${t-4},${t-8},.5)`,s.fillRect(it()*256,it()*256,2+it()*14,2+it()*6)}},3);function Ao(s,e,t,n=.35){let i=new _t,r=[],o=[],a=10,c=Math.max(0,(s-e)/2),l=f=>{let g=[],x=s/2*(1-f)+c*f,m=e/2*(1-f),p=t*Math.pow(f,.6),v=[[x,m],[-x,m],[-x,-m],[x,-m]];for(let y=0;y<4;y++){let[_,C]=v[y],[w,R]=v[(y+1)%4];for(let I=0;I<a;I++){let b=I/a,M=_+(w-_)*b,L=C+(R-C)*b,H=Math.pow(Math.abs(b-.5)*2,4);g.push(new S(M,p+n*H*(1-f)*t,L))}}return g},h=6,u=Array.from({length:h+1},(f,g)=>l(g/h));for(let f of u)for(let g of f)r.push(g.x,g.y,g.z);let d=4*a;for(let f=0;f<h;f++)for(let g=0;g<d;g++){let x=f*d+g,m=f*d+(g+1)%d,p=(f+1)*d+g,v=(f+1)*d+(g+1)%d;o.push(x,p,m,m,p,v)}return i.setAttribute("position",new Ke(r,3)),i.setIndex(o),i.computeVertexNormals(),i}var vc=class{constructor(e,t){z(this,"scene");z(this,"sun");z(this,"hemi");z(this,"arenaGlow");z(this,"arenaRune");z(this,"skyMat");z(this,"cloudSea");z(this,"water");z(this,"fall");z(this,"floaters",[]);z(this,"qi");z(this,"lanterns",[]);z(this,"theme",new le(10479871));z(this,"themeT",new le(10479871));z(this,"fogBase",new le(13219482));z(this,"treasure");z(this,"proc",{arena:[],palace:[],gate:[]});z(this,"lite",!1);if(this.scene=e,this.lite=t,e.fog=new Aa(13219482,.0022),this.skyMat=new St({side:Xt,depthWrite:!1,uniforms:{top:{value:new le(4025e3)},mid:{value:new le(10336472)},bot:{value:new le(16763274)},sun:{value:new S(-.8,.32,.45).normalize()},uTime:Qi},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 top, mid, bot, sun; uniform float uTime; varying vec3 vD;
        float h(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,45.164))) * 43758.5453); }
        void main(){ float y = vD.y; vec3 c = y > 0.12 ? mix(mid, top, smoothstep(0.12, 0.8, y)) : mix(bot, mid, smoothstep(-0.15, 0.12, y));
          float s = max(dot(vD, sun), 0.0); c += vec3(1.0,0.85,0.55) * (pow(s, 64.0) * 1.6 + pow(s, 6.0) * 0.35);
          float st = step(0.9975, h(floor(vD * 420.0))) * smoothstep(0.3, 0.8, y); c += st * (0.6 + 0.4 * sin(uTime * 3.0 + h(vD) * 20.0));
          gl_FragColor = vec4(c, 1.0); }`}),e.add(new q(new en(600,32,16),this.skyMat)),this.hemi=new Wa(14477042,5916214,.55),e.add(this.hemi),this.sun=new br(16764826,1.7),this.sun.position.set(-55,32,30),!t){this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048);let i=this.sun.shadow.camera;i.left=i.bottom=-40,i.right=i.top=40,i.near=10,i.far=160,this.sun.shadow.bias=-5e-4,this.sun.shadow.normalBias=.03}e.add(this.sun),this.cloudSea=new St({transparent:!0,depthWrite:!1,uniforms:{uTime:Qi,tint:{value:new le(16777215)}},vertexShader:"varying vec2 vU; varying vec3 vW; void main(){ vU = uv; vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",fragmentShader:`uniform float uTime; uniform vec3 tint; varying vec2 vU; varying vec3 vW;
        float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); float a = fract(sin(dot(i, vec2(127.1,311.7)))*43758.5), b = fract(sin(dot(i+vec2(1,0), vec2(127.1,311.7)))*43758.5), c = fract(sin(dot(i+vec2(0,1), vec2(127.1,311.7)))*43758.5), d = fract(sin(dot(i+vec2(1,1), vec2(127.1,311.7)))*43758.5); return mix(mix(a,b,f.x), mix(c,d,f.x), f.y); }
        float fbm(vec2 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ s += a * n(p); p *= 2.03; a *= 0.5; } return s; }
        void main(){ vec2 p = vW.xz * 0.012 + vec2(uTime * 0.01, uTime * 0.006); float c = fbm(p) * 0.7 + fbm(p * 2.7 - uTime * 0.02) * 0.4;
          float d = length(vW.xz) / 420.0; vec3 col = mix(vec3(0.62,0.66,0.85), vec3(1.0,0.96,0.92), smoothstep(0.35, 0.9, c)) * tint;
          gl_FragColor = vec4(col, smoothstep(0.25, 0.6, c) * (1.0 - smoothstep(0.7, 1.0, d))); }`});for(let[i,r]of[[-26,1],[-34,1.3]]){let o=new q(new Yt(900*r,900*r),this.cloudSea);o.rotation.x=-Math.PI/2,o.position.y=i,e.add(o)}this.buildIsland(t);let n=e.children.length;this.buildArena(),this.proc.arena=e.children.slice(n),n=e.children.length,this.buildPalace(),this.proc.palace=e.children.slice(n),n=e.children.length,this.buildGate(),this.proc.gate=e.children.slice(n),this.buildMountains(t),this.buildDemonIsle(),this.water=this.buildDragonPool(),this.fall=this.buildWaterfall(),this.buildFloaters(),this.qi=this.buildQi(t?200:450),this.arenaGlow=new q(new zi(13.6,14.4,96),Lt(10479871,.22)),this.arenaGlow.rotation.x=-Math.PI/2,this.arenaGlow.position.y=.06,e.add(this.arenaGlow),this.arenaRune=new q(new Yt(26,26),new xt({map:pc(),color:10479871,transparent:!0,opacity:.14,blending:Ot,depthWrite:!1})),this.arenaRune.rotation.x=-Math.PI/2,this.arenaRune.position.y=.05,e.add(this.arenaRune),this.treasure=this.buildTreasure(),this.treasure.visible=!1,e.add(this.treasure)}buildIsland(e){let t=Ae(16777215,{rough:.85}),n=Fv(),i=new Rt({map:n,roughness:.85,metalness:.05}),r=new q(new En(48,96),i);r.rotation.x=-Math.PI/2,r.receiveShadow=!0,this.scene.add(r);let o=new $t(50,46,48,10,!0),a=o.attributes.position;for(let x=0;x<a.count;x++){let m=a.getY(x);if(m>22.9)continue;let p=1+$n(.18)+Math.sin(a.getX(x)*.3)*.05;a.setX(x,a.getX(x)*p),a.setZ(x,a.getZ(x)*p),a.setY(x,m+$n(2))}o.computeVertexNormals();let c=new Rt({map:lp(),color:9076600,roughness:.95}),l=new q(o,c);l.rotation.x=Math.PI,l.position.y=-23.2,this.scene.add(l);let h=new q(new Dn(48,.6,8,96),Ae(14277860,{rough:.5}));h.rotation.x=Math.PI/2,h.position.y=.3,this.scene.add(h);let u=new Mt(.25,.3,1.6,8),d=Ae(15264496,{rough:.45}),f=new mn(u,d,72),g=new rt;for(let x=0;x<72;x++){let m=x/72*Math.PI*2;Math.abs(Math.sin(m))<.12&&Math.cos(m)>0?g.scale.setScalar(.001):g.scale.setScalar(1),g.position.set(Math.sin(m)*47.3,.8,Math.cos(m)*47.3),g.updateMatrix(),f.setMatrixAt(x,g.matrix)}f.castShadow=!e,this.scene.add(f),this.trees(36,30,45,e)}trees(e,t,n,i,r=new S,o=0){let a=new Mt(.25,.45,1,7),c=new $t(1,1,8),l=new en(1,10,8),h=Ae(4863014,{rough:.9}),u=Ae(2054714,{rough:.8}),d=Ae(16758741,{rough:.7,emissive:16740264,ei:.08}),f=new mn(a,h,e),g=new mn(c,u,e*3),x=new mn(l,d,e*2),m=new rt,p=0,v=0;for(let y=0;y<e;y++){let _=it()*Math.PI*2,C=t+it()*(n-t),w=r.x+Math.sin(_)*C,R=r.z+Math.cos(_)*C,I=4+it()*4;if(Math.abs(Math.sin(_))<.25||R<-18||Math.abs(Math.abs(w)-38)<6&&Math.abs(R+14)<6||Math.hypot(w+30,R+8)<9){m.scale.setScalar(.001),m.updateMatrix(),f.setMatrixAt(y,m.matrix);continue}m.position.set(w,o+I/2,R),m.scale.set(1,I,1),m.rotation.set(0,0,0),m.updateMatrix(),f.setMatrixAt(y,m.matrix);let b=it()<.35;for(let M=0;M<(b?2:3);M++)b?(m.position.set(w+$n(1),o+I+M*.8,R+$n(1)),m.scale.setScalar(1.8-M*.4),m.updateMatrix(),x.setMatrixAt(v++,m.matrix)):(m.position.set(w,o+I*.6+M*1.3,R),m.scale.set(2.4-M*.6,2.2,2.4-M*.6),m.updateMatrix(),g.setMatrixAt(p++,m.matrix))}g.count=p,x.count=v;for(let y of[f,g,x])y.castShadow=!i,this.scene.add(y)}buildArena(){let e=new q(new Mt(15,16,.6,8),Ae(12567759,{rough:.55}));e.position.y=-.28,e.receiveShadow=!0,this.scene.add(e);let t=new q(new Mt(14.2,14.2,.05,64),new Rt({color:2765126,roughness:.35,metalness:.4}));t.position.y=.02,t.receiveShadow=!0,this.scene.add(t);let n=Ae(10165026,{rough:.45}),i=Ae(13938487,{metal:1,rough:.3}),r=Ae(3124874,{rough:.3,metal:.2,emissive:1006148,ei:.4});for(let o=0;o<8;o++){let a=o/8*Math.PI*2+Math.PI/8,c=Math.sin(a)*15.4,l=Math.cos(a)*15.4,h=new q(new Mt(.55,.65,9,16),n);h.position.set(c,4.5,l),h.castShadow=!0,this.scene.add(h);let u=new q(new Mt(.9,.7,.6,16),i);u.position.set(c,9.2,l),this.scene.add(u);let d=Array.from({length:40},(m,p)=>new S(c+Math.sin(p*.55+o)*.85,.6+p*.2,l+Math.cos(p*.55+o)*.85)),f=new q(new bn(new Mn(d),120,.22,8),r);f.castShadow=!0,this.scene.add(f);let g=new q(new en(.4,12,10),r);g.position.copy(d[d.length-1]).add(new S(0,.3,0)),g.scale.set(1,.8,1.6),this.scene.add(g);let x=new q(new en(.45,16,12),Lt(16767392,.35));x.scale.setScalar(.6),x.position.set(c,9.8,l),this.scene.add(x),this.lanterns.push(x)}for(let o=0;o<4;o++)for(let a=0;a<3;a++){let c=new q(new vt(6,.2,1),Ae(11975622,{rough:.6})),l=o*Math.PI/2;c.position.set(Math.sin(l)*(16.1+a*.9),-.1-a*.18,Math.cos(l)*(16.1+a*.9)),c.rotation.y=l,c.receiveShadow=!0,this.scene.add(c)}}hall(e,t,n,i,r,o,a=1){let c=new ce;c.position.set(e,0,t),c.scale.setScalar(a);let l=Ae(10755364,{rough:.5}),h=Ae(2112092,{rough:.35,metal:.5}),u=Ae(13938487,{metal:1,rough:.3}),d=Ae(15853266,{rough:.7}),f=Ae(14212066,{rough:.6}),g=new q(new vt(n+3,1.4,i+3),f);g.position.y=.7,g.castShadow=g.receiveShadow=!0,c.add(g);let x=1.4;for(let p=0;p<o;p++){let v=1-p*.22,y=n*v,_=i*v,C=r*(p?.6:1),w=new q(new vt(y*.86,C,_*.8),d);w.position.y=x+C/2,w.castShadow=!0,c.add(w);let R=Math.max(4,Math.round(y/2.2));for(let L=0;L<=R;L++)for(let H of[-1,1]){let D=new q(new Mt(.22,.25,C,10),l);D.position.set(-y*.45+L/R*y*.9,x+C/2,H*_*.43),D.castShadow=!0,c.add(D)}let I=new q(new vt(y*.95,.5,_*.92),l);I.position.y=x+C,c.add(I);let b=new q(Ao(y*1.35,_*1.45,C*.75,.5),h);b.position.y=x+C+.2,b.castShadow=!0,c.add(b);let M=new q(new vt(Math.max(.5,(y-_)*.7),.35,.35),u);M.position.y=x+C+C*.75+.3,c.add(M);for(let L of[-1,1]){let H=new q(new $t(.3,1.2,8),u);H.position.set(L*Math.max(.5,(y-_)*.35),x+C+C*.75+.7,0),c.add(H)}for(let L of[-1,1])for(let H of[-1,1]){let D=new q(new en(.35,12,10),new Rt({color:16726570,emissive:16730656,emissiveIntensity:.45}));D.scale.y=1.3,D.position.set(L*y*.62,x+C-.4,H*_*.65),c.add(D),this.lanterns.push(D)}x+=C+C*.55}let m=new q(new vt(3,1,.15),u);return m.position.set(0,r*.8+1.4,i*.42),c.add(m),this.scene.add(c),c}buildPalace(){this.hall(0,-38,22,12,7,3),this.hall(-24,-30,10,8,5,2),this.hall(24,-30,10,8,5,2);for(let e of[-1,1]){let t=new ce;t.position.set(e*38,0,-14);let n=Ae(10755364),i=Ae(2112092,{rough:.35,metal:.5});for(let o=0;o<7;o++){let a=5.5-o*.55,c=new q(new vt(a*.7,2.2,a*.7),Ae(15853266));c.position.y=1.2+o*3,c.castShadow=!0,t.add(c);let l=new q(Ao(a*1.2,a*1.2,1.2,.6),i);l.position.y=2.3+o*3,t.add(l);let h=new q(new Mt(.15,.15,2.2,6),n);h.position.set(a*.36,1.2+o*3,a*.36),t.add(h)}let r=new q(new $t(.4,3.5,8),Ae(13938487,{metal:1,rough:.3}));r.position.y=23.5,t.add(r),this.scene.add(t)}}buildGate(){let e=new ce;e.position.set(0,0,44);let t=Ae(10755364),n=Ae(13938487,{metal:1,rough:.3}),i=Ae(2112092,{rough:.35,metal:.5});for(let c of[-7,-2.6,2.6,7]){let l=new q(new Mt(.5,.55,c*c>20?7:9,12),t);l.position.set(c,c*c>20?3.5:4.5,0),l.castShadow=!0,e.add(l)}let r=new q(new vt(17,.9,1),t);r.position.y=8.2,e.add(r);let o=new q(new vt(4,1.6,.3),n);o.position.set(0,9.3,.4),e.add(o);let a=new q(Ao(8,2.2,1.6,.6),i);a.position.y=10.1,e.add(a);for(let c of[-1,1]){let l=new q(Ao(5.5,2,1.2,.6),i);l.position.set(c*5.5,8.7,0),e.add(l)}this.scene.add(e)}buildMountains(e){let t=new $t(1,1,9,6),n=t.attributes.position;for(let d=0;d<n.count;d++){if(n.getY(d)>.49)continue;let g=1+$n(.22);n.setX(d,n.getX(d)*g),n.setZ(d,n.getZ(d)*g)}t.computeVertexNormals();let i=Ae(6122104,{rough:.95}),r=Ae(8755124,{rough:1});for(let d=0;d<26;d++){let f=it()*Math.PI*2,g=120+it()*140,x=40+it()*90,m=10+it()*18;if(f>2.6&&f<3.7&&g<160)continue;let p=new q(t,g<170?i:r);if(p.position.set(Math.sin(f)*g,-30+x/2,Math.cos(f)*g),p.scale.set(m,x,m),this.scene.add(p),it()<.5){let v=new q(Ao(6,6,2.4,.6),Ae(2112092,{metal:.5,rough:.35}));v.position.set(p.position.x,-30+x+.2,p.position.z),this.scene.add(v)}}let o=new ce;o.position.set(62,-4,8),this.scene.add(o);let a=new q(new $t(16,22,24,4),Ae(6970706,{rough:.95}));a.rotation.x=Math.PI,a.position.y=-11,o.add(a);let c=new q(new En(16,32),Ae(4160074,{rough:.9}));c.rotation.x=-Math.PI/2,c.position.y=.01,o.add(c);let l=new mn(new Mt(.12,.14,1,6),Ae(7319114,{rough:.5}),e?60:160),h=new rt;for(let d=0;d<l.count;d++){let f=it()*7,g=Math.sqrt(it())*14,x=6+it()*6;h.position.set(62+Math.sin(f)*g,-4+x/2,8+Math.cos(f)*g),h.scale.set(1,x,1),h.rotation.set($n(.05),0,$n(.05)),h.updateMatrix(),l.setMatrixAt(d,h.matrix)}this.scene.add(l);let u=this.hall(62,8,6,6,3.5,1,.8);u.position.y=-4}buildDemonIsle(){let e=new ce;e.position.set(-66,-6,18),this.scene.add(e);let t=Ae(1840152,{rough:.9}),n=new Rt({color:16730640,emissive:16726528,emissiveIntensity:2.2}),i=new q(new $t(18,26,18,4),t);i.rotation.x=Math.PI,i.position.y=-13,e.add(i);let r=new q(new En(18,24),t);r.rotation.x=-Math.PI/2,e.add(r);for(let c=0;c<9;c++){let l=new q(new vt(.6,.1,6+it()*8),n);l.position.set($n(10),.05,$n(10)),l.rotation.y=it()*3,e.add(l)}for(let c=0;c<14;c++){let l=new q(new $t(.8+it(),6+it()*9,6),t),h=it()*7,u=6+it()*10;l.position.set(Math.sin(h)*u,3,Math.cos(h)*u),l.rotation.set($n(.3),0,$n(.3)),e.add(l)}let o=new ti(16730640,90,50,1.8);o.position.set(0,6,0),e.add(o);let a=new q(new En(4,24),n);a.rotation.x=-Math.PI/2,a.position.y=.06,e.add(a)}buildDragonPool(){let e=new St({transparent:!0,uniforms:{uTime:Qi},vertexShader:"varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform float uTime; varying vec2 vU; void main(){ vec2 p = vU * 10.0; float w = sin(p.x * 2.0 + uTime * 1.5) * 0.5 + sin(p.y * 2.7 - uTime * 1.2) * 0.5 + sin((p.x + p.y) * 1.3 + uTime) * 0.5;
        vec3 c = mix(vec3(0.02, 0.25, 0.45), vec3(0.25, 0.9, 1.0), smoothstep(0.6, 1.4, w)); float r = length(vU - 0.5) * 2.0; gl_FragColor = vec4(c, 0.88 * (1.0 - smoothstep(0.95, 1.0, r))); }`}),t=new q(new En(7,48),e);t.rotation.x=-Math.PI/2,t.position.set(-30,.08,-8),this.scene.add(t);let n=new q(new Dn(7,.35,8,48),Ae(15264496,{rough:.4}));n.rotation.x=Math.PI/2,n.position.set(-30,.25,-8),this.scene.add(n);let i=Ae(3124874,{rough:.3,metal:.2,emissive:1006148,ei:.5}),r=Array.from({length:30},(c,l)=>new S(-30+Math.sin(l*.4)*2.5,.5+l*.25+Math.sin(l*.5)*.6,-8+Math.cos(l*.4)*2.5)),o=new q(new bn(new Mn(r),100,.45,10),i);o.castShadow=!0,this.scene.add(o);let a=new q(new en(.8,14,10),i);return a.position.copy(r[29]).add(new S(0,.4,0)),a.scale.set(1,.8,1.7),this.scene.add(a),e}buildWaterfall(){let e=new St({transparent:!0,depthWrite:!1,side:Dt,uniforms:{uTime:Qi},vertexShader:"varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform float uTime; varying vec2 vU; float h(float x){ return fract(sin(x * 91.3) * 47453.1); }
        void main(){ float s = h(floor(vU.x * 40.0)); float f = fract(vU.y * 3.0 + uTime * (1.2 + s) + s); float a = smoothstep(0.0, 0.4, f) * (0.5 + s * 0.5) * smoothstep(0.0, 0.1, vU.x) * smoothstep(1.0, 0.9, vU.x) * smoothstep(0.0, 0.2, vU.y);
          gl_FragColor = vec4(mix(vec3(0.7, 0.9, 1.0), vec3(1.0), f), a * 0.85); }`}),t=new q(new Yt(6,40,1,1),e);t.position.set(76,-24,8),t.rotation.y=-Math.PI/2,this.scene.add(t);let n=new pn(new cn({map:mc(),color:16777215,transparent:!0,opacity:.6,depthWrite:!1}));return n.position.set(76,-38,8),n.scale.setScalar(22),this.scene.add(n),e}buildFloaters(){let e=new Rt({map:lp(),color:10129544,roughness:.95}),t=Ae(4885074,{rough:.9});for(let n=0;n<14;n++){let i=new ce,r=1.5+it()*4,o=new q(new $t(r,r*2.2,7),e);o.rotation.x=Math.PI,o.position.y=-r*1.1,i.add(o);let a=new q(new Mt(r,r,.3,7),t);i.add(a);let c=it()*Math.PI*2,l=60+it()*60;i.position.set(Math.sin(c)*l,-5+it()*30,Math.cos(c)*l),i.userData={y:i.position.y,p:it()*7},this.scene.add(i),this.floaters.push(i)}}buildQi(e){let t=new _t,n=new Float32Array(e*3);for(let r=0;r<e;r++){let o=Math.random()*Math.PI*2,a=Math.sqrt(Math.random())*70;n[r*3]=Math.sin(o)*a,n[r*3+1]=Math.random()*30,n[r*3+2]=Math.cos(o)*a}t.setAttribute("position",new Tt(n,3));let i=new ki(t,new ms({map:qn(),color:10479871,size:.35,transparent:!0,opacity:.3,blending:Ot,depthWrite:!1}));return this.scene.add(i),i}buildTreasure(){let e=new ce,t=Ae(13938487,{metal:1,rough:.25,emissive:5913088,ei:.6}),n=Ae(6953498,{rough:.5}),i=new q(new vt(2.4,1.4,1.6),n);i.position.y=1.7,e.add(i);let r=new q(new Mt(.8,.8,2.4,16,1,!1,0,Math.PI),n);r.rotation.z=Math.PI/2,r.position.y=2.4,e.add(r);for(let c of[-1,0,1]){let l=new q(new vt(.15,1.5,1.65),t);l.position.set(c,1.7,0),e.add(l)}let o=new q(new Mt(1.4,2.2,40,24,1,!0),Lt(16765002,.18));o.position.y=20,e.add(o);let a=new q(new Mt(2,2.4,1,8),Ae(15264496));return a.position.y=.5,e.add(a),e}useModels(){let e=ji("tg-kien-truc")?wu("tg-kien-truc"):null,t=(o,a,c,l=0,h=1)=>{let u=e?.getObjectByName(o);if(!u)return!1;let d=u.clone(!0);return d.position.set(a,0,c),d.rotation.y=l,d.scale.setScalar(h),d.traverse(f=>{let g=f;g.isMesh&&(g.castShadow=!this.lite,g.receiveShadow=!0)}),this.scene.add(d),!0};if(e){if(t("vo-dai",0,0)){for(let a of this.proc.arena)a.visible=!1;this.arenaRune.position.y=.09,this.arenaGlow.position.y=.1}if(t("dien-chinh",0,-38)&&t("lau-ben",-24,-30)&&t("lau-ben",24,-30)&&t("thap",-38,-14)&&t("thap",38,-14))for(let a of this.proc.palace)a.visible=!1;if(t("thien-mon",0,44))for(let a of this.proc.gate)a.visible=!1}let n=11,i=()=>(n=n*16807%2147483647,n/2147483647),r=(o,a,c,l,h)=>{let u=o.filter(ji);if(u.length)for(let d=0;d<a;d++){let f=c();if(!f)continue;let g=wu(u[d%u.length]),x=g.clone(!0);x.position.set(f[0],f[1],f[2]),x.rotation.y=i()*Math.PI*2,x.scale.setScalar(l+i()*(h-l)),x.traverse(m=>{let p=m;p.isMesh&&(p.castShadow=!this.lite,p.receiveShadow=!0)}),this.scene.add(x)}};r(["tg-da-1","tg-da-2","tg-da-3"],16,()=>{let o=i()*Math.PI*2;if(Math.abs(Math.sin(o))<.3)return null;let a=41+i()*5,c=Math.sin(o)*a,l=Math.cos(o)*a;return l<-20?null:[c,0,l]},1.2,2.6),r(["tg-bui-1","tg-bui-2","tg-bui-3"],26,()=>{let o=i()*Math.PI*2;if(Math.abs(Math.sin(o))<.3)return null;let a=30+i()*14,c=Math.sin(o)*a,l=Math.cos(o)*a;return l<-18||Math.hypot(c+30,l+8)<9?null:[c,0,l]},.9,1.8),r(["tg-da-1","tg-da-3"],6,()=>{let o=i()*7,a=4+i()*10;return[62+Math.sin(o)*a,-4,8+Math.cos(o)*a]},.8,1.8),r(["tg-bui-1","tg-bui-3"],10,()=>{let o=i()*7,a=3+i()*11;return[62+Math.sin(o)*a,-4,8+Math.cos(o)*a]},.8,1.4),r(["tg-da-2","tg-da-1"],8,()=>{let o=i()*7,a=5+i()*11;return[-66+Math.sin(o)*a,-6,18+Math.cos(o)*a]},1.5,3.2)}setTheme(e){this.themeT.setHex(e?Ms[e]:10479871)}update(e,t){this.theme.lerp(this.themeT,Math.min(1,e*1.5)),this.arenaGlow.material.color.copy(this.theme),this.arenaRune.material.color.copy(this.theme),this.arenaRune.rotation.z=t*.05,this.qi.material.color.copy(this.theme),this.scene.fog.color.copy(this.fogBase).lerp(this.theme,.08);let i=this.qi.geometry.attributes.position;for(let r=0;r<i.count;r++){let o=i.getY(r)+e*(.4+r%7*.1);o>30&&(o=0),i.setY(r,o)}i.needsUpdate=!0;for(let r of this.floaters)r.position.y=r.userData.y+Math.sin(t*.4+r.userData.p)*1.2,r.rotation.y+=e*.03;for(let r of this.lanterns)r.scale.x=r.scale.z=1+Math.sin(t*3+r.position.x)*.04;this.treasure.visible&&(this.treasure.rotation.y=t*.4,this.treasure.position.y=Math.sin(t*2)*.2),this.water,this.fall,this.cloudSea,this.skyMat}};var ln=new URLSearchParams(location.search),Pu=ln.has("live"),Co=ln.has("lite");if(ln.has("debug"))for(let s of["error","unhandledrejection"])addEventListener(s,e=>{let t=document.createElement("pre");t.style.cssText="position:fixed;left:0;right:0;top:30%;z-index:99;color:#f66;background:#000c;font-size:12px;white-space:pre-wrap;padding:8px";let n=e;t.textContent=String(n.error?.stack??n.reason?.stack??n.message??n.reason),document.body.append(t)});var Bv=document.getElementById("scene"),ii=new wa({canvas:Bv,antialias:!Co,powerPreference:"high-performance"});ii.setPixelRatio(Math.min(devicePixelRatio,Co?1:1.5));ii.toneMapping=go;ii.toneMappingExposure=.88;ii.outputColorSpace=Pt;ii.shadowMap.enabled=!Co;ii.shadowMap.type=Ah;var wi=new pr,Hv=new fr(ii);wi.environment=Hv.fromScene(new rc,.04).texture;wi.environmentIntensity=.22;var Kn=new zt(50,1,.3,1500),ts=new vc(wi,Co),pt=new xc(wi),It=new yc(Pu),Bt=new lc,As=null,Mc=null;Co||(As=new nc(ii),As.addPass(new ic(wi,Kn)),Mc=new wr(new j(512,512),.28,.35,.97),As.addPass(Mc),As.addPass(new sc));function yp(){let s=innerWidth,e=innerHeight;ii.setSize(s,e,!1),As?.setSize(s,e),Kn.aspect=s/e,Kn.fov=s/e<.8?62:48,Kn.updateProjectionMatrix()}addEventListener("resize",yp);yp();var nn=new Map,lt=null,vp={mode:"tuluyen",title:"",leftMs:0,round:0,sides:[],next:""},kv=null,up=null,zv=performance.now(),dp=ip().then(()=>{if(ts.useModels(),ln.has("debug")){let s=document.createElement("div");s.style.cssText="position:fixed;left:8px;bottom:8px;z-index:99;color:#0f0;background:#000a;font:14px monospace;padding:4px 8px",s.textContent="models: "+dc("").length+" \xB7 "+Math.round(performance.now()-zv)+" ms",document.body.append(s)}});function Vv(s){let e=new Set;for(let t of s){e.add(t.id);let n=nn.get(t.id);if(n&&(n.arch.id!==t.a||n.vip!==t.vip)){let i=n;t.x=i.x,t.z=i.z,i.dispose(),nn.delete(t.id),n=void 0}n||(n=new bs(t.a,{vip:t.vip}),n.x=n.tx=t.x,n.z=n.tz=t.z,n.ry=n.tRy=t.ry,wi.add(n.root),nn.set(t.id,n)),n.tx=t.x,n.tz=t.z,n.tRy=t.ry,n.setPose(t.p),n.setInfo(t.name,t.lv,t.sect,t.npc),n.setArtifacts(t.arts),n.setHp(t.hp,t.mhp,t.side>=0)}for(let[t,n]of nn)e.has(t)||(n.dispose(),nn.delete(t))}function Mp(s){if(kv=s,!s){lt&&(lt.dispose(),lt=null),ts.setTheme(null);return}(!lt||lt.def.key!==s.key)&&(lt?.dispose(),lt=new gc(s.key),lt.x=lt.tx=s.x,lt.z=lt.tz=s.z,wi.add(lt.root)),lt.set(s),ts.setTheme(Mo.get(s.key).el)}var Lr=new S(0,16,34),Ec=new S(0,2,0),Ts=new S,Ss=new S,gn=null;function ni(s,e,t,n,i,r){let o=performance.now();if(gn&&gn.until>o&&gn.prio>i)return;i<99&&(e*=2.4,t*=2.2,s=s.clone().setY(s.y*2.6));let a=r??Math.atan2(Lr.x-s.x,Lr.z-s.z),c=innerWidth/innerHeight<.8?1.3:1;gn={pos:new S(s.x+Math.sin(a)*e*c,s.y+t,s.z+Math.cos(a)*e*c),look:s.clone(),until:o+n,prio:i}}function Gv(s,e){let t=innerWidth/innerHeight<.8?1.32:1,n=performance.now();if(gn&&gn.until>n)Ts.copy(gn.pos),Ss.copy(gn.look);else{gn=null;let r=vp.mode;if(r==="boss"&&lt){let o=Math.sin(s*.07)*11,a=42*t;Ss.set(lt.x*.5,4.5,lt.z*.5+1),Ts.set(o,22+Math.sin(s*.1)*1.5,lt.z+a)}else if(r==="pk1"){let o=[...nn.values()].filter(c=>Math.hypot(c.x,c.z)<22),a=o.reduce((c,l)=>c.add(new S(l.x,0,l.z)),new S).multiplyScalar(1/Math.max(1,o.length));Ss.set(a.x,4.5,a.z),Ts.set(a.x+Math.sin(s*.15)*6,12,a.z+25*t)}else if(r==="pk3"||r==="sect"){let o=s*.05,a=(r==="sect"?42:32)*t;Ss.set(0,1.5,0),Ts.set(Math.sin(o)*a,r==="sect"?28:20,Math.cos(o)*a)}else if(r==="treasure"){let o=s*.15,a=30*t;Ss.set(0,3,0),Ts.set(Math.sin(o)*a,9,Math.cos(o)*a)}else{let o=s*.045,a=40*t;Ss.set(0,1.5,0),Ts.set(Math.sin(o)*a,25+Math.sin(s*.08)*3,Math.cos(o)*a)}}let i=1-Math.exp(-e*(gn?2.6:1.4));Lr.lerp(Ts,i),Ec.lerp(Ss,i),Kn.position.copy(Lr),pt.shake>0&&Kn.position.add(new S((Math.random()-.5)*pt.shake,(Math.random()-.5)*pt.shake,(Math.random()-.5)*pt.shake)),Kn.lookAt(Ec)}var Iu=new S;function Ro(s,e=new S){if(s==="boss"&&lt)return e.set(lt.x,lt.height*.55,lt.z);let t=nn.get(s);return t?t.chest(e):e.set(0,1.2,0)}function fp(s){let e=s.clone().project(Kn);return{x:(e.x+1)/2*innerWidth,y:(1-e.y)/2*innerHeight,ok:e.z<1}}var pp={bolt:"zap",thunder:"zap",lightdragon:"zap",flysword:"launch",swordrain:"launch",swordarray:"launch",qiwave:"boost",slash:"boost",claw:"boost",fireball:"boom-0",meteor:"bomb-low",flamepillar:"boom-1",firedragon:"boom-2",dragon:"boom-2",icefield:"bomb-crack",quake:"bomb-low",rockfall:"bomb-low",shield:"shield",heal:"ring",lotus:"ring",phoenix:"boom-2",darkbeam:"warp",demonpalm:"boom-1",tornado:"warp"},mp=0,Wv={ma:["demonpalm","darkbeam","bloodwave"],hoa:["fireball","flamepillar","meteor"],loi:["bolt","thunder","thunder"],bang:["icearrow","icefield","icefield"],phong:["qiwave","tornado","tornado"],kiem:["claw","swordarray","swordrain"],quang:["holybeam","lotus","holybeam"],tho:["claw","quake","rockfall"],long:["firedragon","dragon","dragon"]};function Xv(s){let e=performance.now();switch(s.k){case"cast":{let t=Ro(s.id),n=s.to?Ro(s.to):new S(s.tx,1.2,s.tz);if(s.to||(t.set(s.x,1.3,s.z),n.set(s.tx,1.2,s.tz)),(s.vfx==="shield"||s.vfx==="heal"||s.vfx==="lotus"||s.vfx==="holybeam"&&!s.to)&&(n.y=0),pt.cast(s.vfx,t,n,Ms[s.el]??16777215,s.r,s.big),s.big||e-mp>90){mp=e;let i=pp[s.vfx];i&&Bt.play(i,s.big?.9:.35)}s.big&&ni(n.clone().setY(2),14,6,2200,2);break}case"dmg":{let t=Ro(s.id,Iu).clone();t.y+=s.boss?3:.8,t.x+=(Math.random()-.5)*(s.boss?4:.6);let n=fp(t);n.ok&&It.number(n.x,n.y,s.dodge?"N\xE9!":(s.crit?"\u{1F4A5}":"")+"-"+Math.round(s.v).toLocaleString("vi-VN"),s.dodge?"dodge":s.crit?"crit":s.boss?"boss":"dmg"),s.boss?lt?.flash():nn.get(s.id)?.flash(),!s.boss&&s.by==="boss"&&(pt.shake=Math.max(pt.shake,.15));break}case"heal":{let t=fp(Ro(s.id,Iu).clone().setY(2.2));t.ok&&It.number(t.x,t.y,"+"+Math.round(s.v).toLocaleString("vi-VN"),"heal");break}case"down":pt.explode(Ro(s.id,Iu).clone().setY(.6),16777215,.8,{ring:!1,shake:0});break;case"gift":{It.gift(s.name,s.av,s.gift,s.count,s.tierName,s.icon,s.xu),Bt.play(s.xu>=99?"coin-big":"coin",.7),s.global&&(pt.flash=.7,pt.shake=1.2,It.announce(`${s.icon} ${s.tierName.toUpperCase()} ${s.icon}`,`${s.name} ch\u1EA5n \u0111\u1ED9ng ti\xEAn gi\u1EDBi!`,"#ffd04a",4200),Bt.chime(!0));break}case"break":{let t=nn.get(s.id),n=t?new S(t.x,0,t.z):new S;pt.breakthrough(n,vs[$i(s.lv)],s.realm),It.breakthrough(s.name,s.lv,s.realm),Bt.chime(s.realm),s.realm&&(ni(n.clone().setY(1.6),8,2.5,3800,4),setTimeout(()=>Bt.play("zap",1),600));break}case"artifact":{It.artifact(s.name,s.art,s.lv,!!s.loot);let t=nn.get(s.id);t&&pt.explode(new S(t.x,1.6,t.z),Zi.get(s.art).color,1.2,{ring:!1,shake:0}),Bt.chime(!1);break}case"boss":{let t=Mo.get(s.key),n=Ms[t.el];if(s.ev==="spawn"&&(It.announce(`\u{1F409} ${s.name} XU\u1EA4T TH\u1EBE`,"G\xF5 1 \u0111\u1EC3 v\xE0o \u0111\xE1nh Boss \xB7 T\u1EB7ng qu\xE0 tung tuy\u1EC7t chi\xEAu",Yn(t.color2),4200),Bt.play("bomb-low",1),pt.shake=1,setTimeout(()=>lt&&ni(lt.headPos(),16,1,3600,5,0),50)),s.ev==="phase"&&(It.announce(s.phase===3?`\u{1F525} ${s.name} N\u1ED4I GI\u1EACN \u{1F525}`:`\u26A0\uFE0F ${s.name} CU\u1ED2NG B\u1EA0O`,s.phase===3?"Giai \u0111o\u1EA1n 3 \xB7 Tuy\u1EC7t chi\xEAu cu\u1ED1i s\u1EAFp t\u1EDBi!":"Giai \u0111o\u1EA1n 2 \xB7 \u0110\xF2n di\u1EC7n r\u1ED9ng",s.phase===3?"#ff3b3b":"#ffb36a",3200),pt.shake=1.4,pt.flash=.4,Bt.play("bomb-low",1),lt&&ni(lt.headPos(),18,0,2600,5,0)),s.ev==="skill"&&lt&&s.x!==void 0){let i=new S(s.x,.5,s.z),r=s.r??3,o=Math.max(0,t.skills.indexOf(s.skill??""));pt.telegraph(i,Math.min(r,26),s.ult?1.5:r>3?.9:.7),o>0&&It.feed(`\u{1F409} ${s.name}: ${s.skill}`);let a=Wv[t.el][o],c=lt.headPos();setTimeout(()=>{pt.cast(a,c,i,n,s.ult?20:r,o>0);let l=pp[a];l&&Bt.play(l,o?1:.6)},s.ult?900:350),s.ult&&(It.announce(`\u2620\uFE0F ${s.skill}`,"Tuy\u1EC7t chi\xEAu to\xE0n s\xE2n!","#ff3b3b",2400),pt.flash=.5,ni(new S(0,4,0),40,22,2600,6,0),setTimeout(()=>{pt.shake=2,pt.flash=.9},1500))}if(s.ev==="die"){let i=s.killer?nn.get(s.killer):null;if(It.announce(`\u{1F480} ${s.name} B\u1ECA TI\xCAU DI\u1EC6T`,i?"\u0110\xF2n k\u1EBFt li\u1EC5u!":"","#ffd04a",5e3),lt){let r=lt;for(let o=0;o<7;o++)setTimeout(()=>pt.explode(new S(r.x+(Math.random()-.5)*8,2+Math.random()*6,r.z+(Math.random()-.5)*8),o%2?n:16765002,3+o*.4,{shake:1}),o*260);ni(r.headPos(),22,4,5e3,7,0)}pt.flash=.8,Bt.play("bomb-low",1)}s.ev==="flee"&&It.announce(`${s.name} \u0111\xE3 b\u1ECF ch\u1EA1y`,"L\u1EA7n sau h\u1EE3p s\u1EE9c m\u1EA1nh h\u01A1n!","#c0c8e8");break}case"mode":It.announce(s.title,s.mode==="tuluyen"?"T\u0129nh t\u1ECDa h\u1EA5p thu linh kh\xED \xB7 G\xF5 1 tham gia":"","#9fe8ff",2600),ts.treasure.visible=s.mode==="treasure",Bt.setIntensity(s.mode==="boss"?2:s.mode==="tuluyen"||s.mode==="treasure"?0:1);break;case"pkwin":s.side!==void 0&&It.announce(`\u{1F3C6} ${s.name} TH\u1EAENG`,s.pts>1?`+${s.pts} \u0111i\u1EC3m PK`:`\u0111\xE1nh b\u1EA1i ${s.loser}`,"#ffd04a",3400),nn.get(s.id)?.setPose("win");break;case"join":It.feed(`\u{1F31F} ${s.name} (${s.cls}) b\u01B0\u1EDBc v\xE0o ti\xEAn gi\u1EDBi`);break;case"sect":It.feed(`\u{1F3EF} ${s.name} gia nh\u1EADp ${oc.get(s.sect)?.name??""}`);break;case"treasure":if(s.ev==="spawn"){ts.treasure.visible=!0;let t=Zi.get(s.art);It.announce(`\u{1F48E} ${t.name} XU\u1EA4T TH\u1EBE`,"G\xF5 \u201Cdoat\u201D \u0111\u1EC3 tranh \u0111o\u1EA1t!",Yn(t.color),3600),pt.cast("holybeam",new S,new S(0,0,0),t.color,4,!0),ni(new S(0,2.5,0),12,3,3e3,3)}else{let t=Zi.get(s.art);It.announce(`${t.icon} ${s.name}`,`\u0111o\u1EA1t \u0111\u01B0\u1EE3c ${t.name} (c\u1EA5p ${s.lv})`,Yn(t.color),3400),ts.treasure.visible=!1,pt.explode(new S(0,2,0),t.color,3)}break;case"vip":{let t=nn.get(s.id),n=t?new S(t.x,0,t.z):new S,i=bo[s.tier];pt.formation(n,4,i,2.4),pt.cast("holybeam",n,n,i,4,!0),setTimeout(()=>pt.explode(n.clone().setY(1.4),i,3,{shake:.6}),400),It.announce(`\u{1F451} TH\u0102NG C\u1EA4P ${cc[s.tier].toUpperCase()} \u{1F451}`,`${s.name} l\u1ED9t x\xE1c, kh\xED ch\u1EA5t ng\xFAt tr\u1EDDi!`,Yn(i),4e3),Bt.chime(!0),ni(n.clone().setY(1.6),7,2,3600,4);break}case"reward":It.feed(`\u2B06\uFE0F ${s.name} +${s.stages} k\u1EF3 tu vi (${s.why})`);break;case"voice":Bt.voice(s.url);break;case"note":It.feed(s.text);break}}var bc=new _c(Pu?"view":"control"),qv=0;bc.onState=s=>{vp=s.mode,Vv(s.cults),Mp(s.boss);for(let e of s.fx)Xv(e);s.boards&&(It.setBoards(s.boards,Date.now()),qv=Date.now()),s.live?It.setLive(s.live,s.viewers,s.total):s.viewers!==void 0&&(document.getElementById("viewers").textContent=`\u{1F465} ${s.viewers}${s.total?" \xB7 "+s.total+" tu s\u0129":""}`),s.settings&&(up=s.settings,It.controls(up)),It.setMode(s.mode,s.boss),s.hello&&s.mode.mode==="treasure"&&(ts.treasure.visible=!0)};bc.onStatus=s=>{document.getElementById("offline").hidden=s};var gp=ln.get("preview");gp?(document.getElementById("app").style.display="none",dp.finally(()=>{if(gp==="boss"){let s=+(ln.get("i")??0),e=ac[s%ac.length];Mp({key:e.key,name:e.name,hp:1,mhp:1,phase:1,x:0,z:0,ry:.5,p:ln.get("p")??"idle",tgt:""}),ni(new S(0,5,0),+(ln.get("d")??26),4,1e9,99,.6),Lr.copy(gn.pos),Ec.copy(gn.look)}else{let s=["idle","atk","cast","med","move","win"];Ki.forEach((e,t)=>{let n=new bs(e.id,{vip:ln.has("vip")?t%6:0}),i=t%10,r=Math.floor(t/10);n.x=n.tx=(i-4.5)*2.2,n.z=n.tz=(r-1)*3.2,n.ry=n.tRy=0,n.setInfo(e.name,t*2,"",!1),n.setPose(s[+(ln.get("pose")??0)%s.length]),n.setArtifacts(t%3?"":"phikiem:3,longchau:2"),wi.add(n.root),nn.set("p"+t,n)}),ln.has("debug")&&setInterval(()=>{let e=[...nn.values()][0],t=document.getElementById("glbInfo");t||(t=document.createElement("div"),t.id="glbInfo",t.style.cssText="position:fixed;left:8px;bottom:40px;z-index:99;color:#ff0;background:#000a;font:13px monospace;padding:4px 8px",document.body.append(t)),t.textContent=e?.glb?.info()??"kh\xF4ng c\xF3 glb"},500),ni(new S(+(ln.get("cx")??0),1.2,+(ln.get("cz")??0)),+(ln.get("d")??17),+(ln.get("h")??3.5)*.4,1e9,99,0),Lr.copy(gn.pos),Ec.copy(gn.look)}})):dp.finally(()=>bc.connect());var Lu=document.getElementById("unlock");Lu.hidden=!1;var Tc=()=>{Bt.unlock(),Lu.hidden=!0};addEventListener("pointerdown",Tc);addEventListener("keydown",Tc);addEventListener("click",Tc);Lu.onclick=Tc;var xp=document.getElementById("soundBtn"),_p=document.getElementById("musicBtn");xp.onclick=()=>{Bt.setMuted(!Bt.muted),xp.textContent=Bt.muted?"\u{1F507}":"\u{1F508}"};_p.onclick=()=>{Bt.setMusic(!Bt.musicOn),_p.style.opacity=Bt.musicOn?"1":".4"};if(!Pu){let s=document.getElementById("sim");s.hidden=!1;let e=c=>bc.send(c);document.getElementById("simToggle").onclick=()=>document.getElementById("simBody").classList.toggle("hide");let t=["Ti\u1EC3u Long N\u1EEF","L\xFD Ti\xEAu Dao","Hoa Thi\xEAn C\u1ED1t","B\u1EA1ch T\u1EED H\u1ECDa","Thanh V\xE2n Ki\u1EBFm","M\u1ED9 Dung Ph\u1EE5c","Tr\u01B0\u01A1ng V\xF4 K\u1EF5","L\u0103ng Thi\xEAn","Phong Thanh D\u01B0\u01A1ng","C\u1ED1 Thanh Hoan","Di\u1EC7p Th\u1EA7n","T\xF4 M\u1EA1t"],n=document.getElementById("simWho");n.innerHTML=t.map(c=>`<option>${c}</option>`).join("");let i=()=>({id:n.value,name:n.value}),r=c=>document.getElementById(c);document.getElementById("ttConnect").onclick=()=>e({t:"ctl",cmd:"connect",user:r("ttUser").value}),document.getElementById("ttDisconnect").onclick=()=>e({t:"ctl",cmd:"disconnect"});let o=0;document.getElementById("simJoin").onclick=()=>{for(let c=0;c<5;c++){let l=t[o++%t.length]+(o>t.length?" "+Math.ceil(o/t.length):"");e({t:"sim",kind:"comment",id:l,name:l,text:"1"})}},document.getElementById("simLike").onclick=()=>e({t:"sim",kind:"like",...i(),count:30});let a=c=>e({t:"sim",kind:"comment",...i(),text:c});document.getElementById("simSend").onclick=()=>{a(r("simText").value||"1"),r("simText").value=""},r("simText").onkeydown=c=>{c.key==="Enter"&&document.getElementById("simSend").click()},document.getElementById("simQuick").innerHTML=["1","kiem","phap","ma","tien nu","long","tong 1","tong 2","pk","doat"].map(c=>`<button data-say="${c}">${c}</button>`).join(""),document.getElementById("simQuick").onclick=c=>{let l=c.target.closest("[data-say]");l&&a(l.dataset.say)},document.getElementById("simGifts").innerHTML=Eo.map(c=>`<button data-xu="${c.xu}" title="${c.desc}">${c.icon} ${c.xu}</button>`).join("")+'<button data-xu="1" data-n="10">\u{1F339} x10</button>',document.getElementById("simGifts").onclick=c=>{let l=c.target.closest("[data-xu]");l&&e({t:"sim",kind:"gift",...i(),gift:Eo.find(h=>h.xu===+l.dataset.xu)?.name??"Qu\xE0",diamonds:+l.dataset.xu,count:+(l.dataset.n??1)})};for(let c of document.querySelectorAll("[data-mode]"))c.onclick=()=>e({t:"ctl",cmd:c.dataset.mode});r("setVoice").onchange=()=>e({t:"ctl",cmd:"settings",settings:{voice:r("setVoice").checked}}),r("setNpc").onchange=()=>e({t:"ctl",cmd:"settings",settings:{npcs:+r("setNpc").value}}),document.getElementById("clearSim").onclick=()=>e({t:"ctl",cmd:"clearSim"}),document.getElementById("openLive").onclick=c=>{c.preventDefault(),window.open("/?live=1","tutien_live","popup,width=540,height=960")}}var Yv=new Tr,ws=0;function Ep(){let s=Math.min(.05,Yv.getDelta());ws+=s,Qi.value=ws,ts.update(s,ws);for(let e of nn.values())e.update(s,ws,Kn);lt?.update(s,ws,Kn),pt.update(s,ws),Gv(ws,s),Bt.update(),document.getElementById("flash").style.opacity=(pt.flash*.55).toFixed(3),Mc&&(Mc.strength=.28+pt.flash*.6),As?As.render():ii.render(wi,Kn),requestAnimationFrame(Ep)}requestAnimationFrame(Ep);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
