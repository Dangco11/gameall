"use strict";(()=>{var vm=Object.defineProperty;var _m=(s,e,t)=>e in s?vm(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var F=(s,e,t)=>_m(s,typeof e!="symbol"?e+"":e,t);var Zh="170";var Mm=0,Dd=1,bm=2;var np=1,Jh=2,vi=3,Mn=0,tn=1,Ct=2,ti=0,$i=1,Gt=2,Nd=3,Ud=4,Em=5,vs=100,Sm=101,Tm=102,wm=103,Am=104,Rm=200,Cm=201,Pm=202,Im=203,Cc=204,Pc=205,Lm=206,Dm=207,Nm=208,Um=209,Hm=210,Bm=211,Fm=212,Om=213,km=214,Ic=0,Lc=1,Dc=2,dr=3,Nc=4,Uc=5,Hc=6,Bc=7,ip=0,zm=1,Vm=2,Ki=0,jh=1,Qh=2,eu=3,Eo=4,Gm=5,tu=6,nu=7,Hd="attached",Wm="detached",sp=300,fr=301,pr=302,Fc=303,Oc=304,ul=306,rn=1e3,$n=1001,uo=1002,nn=1003,iu=1004;var rr=1005;var _n=1006,ro=1007;var ei=1008;var bi=1009,rp=1010,op=1011,fo=1012,su=1013,Ms=1014,Kn=1015,Jn=1016,ru=1017,ou=1018,mr=1020,ap=35902,lp=1021,cp=1022,Un=1023,hp=1024,up=1025,cr=1026,gr=1027,au=1028,lu=1029,dp=1030,cu=1031;var hu=1033,Ta=33776,wa=33777,Aa=33778,Ra=33779,kc=35840,zc=35841,Vc=35842,Gc=35843,Wc=36196,Xc=37492,qc=37496,Yc=37808,$c=37809,Kc=37810,Zc=37811,Jc=37812,jc=37813,Qc=37814,eh=37815,th=37816,nh=37817,ih=37818,sh=37819,rh=37820,oh=37821,Ca=36492,ah=36494,lh=36495,fp=36283,ch=36284,hh=36285,uh=36286,Xm=2200,qm=2201,Ym=2202,xr=2300,yr=2301,Yl=2302,or=2400,ar=2401,Pa=2402,uu=2500,$m=2501,pp=0,dl=1,So=2,Km=3200,Zm=3201;var mp=0,Jm=1,Xi="",dt="srgb",cn="srgb-linear",fl="linear",gt="srgb";var ks=7680;var Bd=519,jm=512,Qm=513,e0=514,gp=515,t0=516,n0=517,i0=518,s0=519,dh=35044,Ts=35048;var Fd="300 es",_i=2e3,Ia=2001,Ei=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Od=1234567,oo=Math.PI/180,vr=180/Math.PI;function Zn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qt[s&255]+Qt[s>>8&255]+Qt[s>>16&255]+Qt[s>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]).toLowerCase()}function Vt(s,e,t){return Math.max(e,Math.min(t,s))}function du(s,e){return(s%e+e)%e}function r0(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function o0(s,e,t){return s!==e?(t-s)/(e-s):0}function ao(s,e,t){return(1-t)*s+t*e}function a0(s,e,t,n){return ao(s,e,1-Math.exp(-t*n))}function l0(s,e=1){return e-Math.abs(du(s,e*2)-e)}function c0(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function h0(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function u0(s,e){return s+Math.floor(Math.random()*(e-s+1))}function d0(s,e){return s+Math.random()*(e-s)}function f0(s){return s*(.5-Math.random())}function p0(s){s!==void 0&&(Od=s);let e=Od+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function m0(s){return s*oo}function g0(s){return s*vr}function x0(s){return(s&s-1)===0&&s!==0}function y0(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function v0(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function _0(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Yn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function yt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var oi={DEG2RAD:oo,RAD2DEG:vr,generateUUID:Zn,clamp:Vt,euclideanModulo:du,mapLinear:r0,inverseLerp:o0,lerp:ao,damp:a0,pingpong:l0,smoothstep:c0,smootherstep:h0,randInt:u0,randFloat:d0,randFloatSpread:f0,seededRandom:p0,degToRad:m0,radToDeg:g0,isPowerOfTwo:x0,ceilPowerOfTwo:y0,floorPowerOfTwo:v0,setQuaternionFromProperEuler:_0,normalize:yt,denormalize:Yn},Q=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ve=class s{constructor(e,t,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=i[0],p=i[3],m=i[6],y=i[1],_=i[4],v=i[7],R=i[2],w=i[5],A=i[8];return r[0]=o*x+a*y+l*R,r[3]=o*p+a*_+l*w,r[6]=o*m+a*v+l*A,r[1]=c*x+h*y+u*R,r[4]=c*p+h*_+u*w,r[7]=c*m+h*v+u*A,r[2]=d*x+f*y+g*R,r[5]=d*p+f*_+g*w,r[8]=d*m+f*v+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(a*n-i*o)*x,e[3]=d*x,e[4]=(h*t-i*l)*x,e[5]=(i*r-a*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply($l.makeScale(e,t)),this}rotate(e){return this.premultiply($l.makeRotation(-e)),this}translate(e,t){return this.premultiply($l.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},$l=new Ve;function xp(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function po(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function M0(){let s=po("canvas");return s.style.display="block",s}var kd={};function io(s){s in kd||(kd[s]=!0,console.warn(s))}function b0(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function E0(s){let e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function S0(s){let e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var Ke={enabled:!0,workingColorSpace:cn,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===gt&&(s.r=Mi(s.r),s.g=Mi(s.g),s.b=Mi(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===gt&&(s.r=hr(s.r),s.g=hr(s.g),s.b=hr(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Xi?fl:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Mi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function hr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var zd=[.64,.33,.3,.6,.15,.06],Vd=[.2126,.7152,.0722],Gd=[.3127,.329],Wd=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xd=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ke.define({[cn]:{primaries:zd,whitePoint:Gd,transfer:fl,toXYZ:Wd,fromXYZ:Xd,luminanceCoefficients:Vd,workingColorSpaceConfig:{unpackColorSpace:dt},outputColorSpaceConfig:{drawingBufferColorSpace:dt}},[dt]:{primaries:zd,whitePoint:Gd,transfer:gt,toXYZ:Wd,fromXYZ:Xd,luminanceCoefficients:Vd,outputColorSpaceConfig:{drawingBufferColorSpace:dt}}});var zs,fh=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{zs===void 0&&(zs=po("canvas")),zs.width=e.width,zs.height=e.height;let n=zs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=zs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=po("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Mi(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Mi(t[n]/255)*255):t[n]=Mi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},T0=0,La=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:T0++}),this.uuid=Zn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Kl(i[o].image)):r.push(Kl(i[o]))}else r=Kl(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Kl(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?fh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var w0=0,zt=class s extends Ei{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=$n,i=$n,r=_n,o=ei,a=Un,l=bi,c=s.DEFAULT_ANISOTROPY,h=Xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:w0++}),this.uuid=Zn(),this.name="",this.source=new La(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Q(0,0),this.repeat=new Q(1,1),this.center=new Q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case rn:e.x=e.x-Math.floor(e.x);break;case $n:e.x=e.x<0?0:1;break;case uo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case rn:e.y=e.y-Math.floor(e.y);break;case $n:e.y=e.y<0?0:1;break;case uo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=sp;zt.DEFAULT_ANISOTROPY=1;var rt=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],x=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,v=(f+1)/2,R=(m+1)/2,w=(h+d)/4,A=(u+x)/4,P=(g+p)/4;return _>v&&_>R?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=w/n,r=A/n):v>R?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=w/i,r=P/i):R<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(R),n=A/r,i=P/r),this.set(n,i,r,t),this}let y=Math.sqrt((p-g)*(p-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(u-x)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ph=class extends Ei{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);let i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new zt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new La(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zt=class extends ph{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Da=class extends zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=nn,this.minFilter=nn,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var mh=class extends zt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=nn,this.minFilter=nn,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var sn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(u!==x||l!==d||c!==f||h!==g){let p=1-a,m=l*d+c*f+h*g+u*x,y=m>=0?1:-1,_=1-m*m;if(_>Number.EPSILON){let R=Math.sqrt(_),w=Math.atan2(R,m*y);p=Math.sin(p*w)/R,a=Math.sin(a*w)/R}let v=a*y;if(l=l*p+d*v,c=c*p+f*v,h=h*p+g*v,u=u*p+x*v,p===1-a){let R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Vt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},S=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Zl.copy(this).projectOnVector(e),this.sub(Zl)}reflect(e){return this.sub(Zl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Zl=new S,qd=new sn,on=class{constructor(e=new S(1/0,1/0,1/0),t=new S(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Gn):Gn.fromBufferAttribute(r,o),Gn.applyMatrix4(e.matrixWorld),this.expandByPoint(Gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Yo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Yo.copy(n.boundingBox)),Yo.applyMatrix4(e.matrixWorld),this.union(Yo)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gn),Gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qr),$o.subVectors(this.max,qr),Vs.subVectors(e.a,qr),Gs.subVectors(e.b,qr),Ws.subVectors(e.c,qr),Oi.subVectors(Gs,Vs),ki.subVectors(Ws,Gs),ds.subVectors(Vs,Ws);let t=[0,-Oi.z,Oi.y,0,-ki.z,ki.y,0,-ds.z,ds.y,Oi.z,0,-Oi.x,ki.z,0,-ki.x,ds.z,0,-ds.x,-Oi.y,Oi.x,0,-ki.y,ki.x,0,-ds.y,ds.x,0];return!Jl(t,Vs,Gs,Ws,$o)||(t=[1,0,0,0,1,0,0,0,1],!Jl(t,Vs,Gs,Ws,$o))?!1:(Ko.crossVectors(Oi,ki),t=[Ko.x,Ko.y,Ko.z],Jl(t,Vs,Gs,Ws,$o))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},fi=[new S,new S,new S,new S,new S,new S,new S,new S],Gn=new S,Yo=new on,Vs=new S,Gs=new S,Ws=new S,Oi=new S,ki=new S,ds=new S,qr=new S,$o=new S,Ko=new S,fs=new S;function Jl(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){fs.fromArray(s,r);let a=i.x*Math.abs(fs.x)+i.y*Math.abs(fs.y)+i.z*Math.abs(fs.z),l=e.dot(fs),c=t.dot(fs),h=n.dot(fs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var A0=new on,Yr=new S,jl=new S,Rn=class{constructor(e=new S,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):A0.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Yr.subVectors(e,this.center);let t=Yr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Yr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(jl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Yr.copy(e.center).add(jl)),this.expandByPoint(Yr.copy(e.center).sub(jl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},pi=new S,Ql=new S,Zo=new S,zi=new S,ec=new S,Jo=new S,tc=new S,bs=class{constructor(e=new S,t=new S(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ql.copy(e).add(t).multiplyScalar(.5),Zo.copy(t).sub(e).normalize(),zi.copy(this.origin).sub(Ql);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Zo),a=zi.dot(this.direction),l=-zi.dot(Zo),c=zi.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Ql).addScaledVector(Zo,d),f}intersectSphere(e,t){pi.subVectors(e.center,this.origin);let n=pi.dot(this.direction),i=pi.dot(pi)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,n,i,r){ec.subVectors(t,e),Jo.subVectors(n,e),tc.crossVectors(ec,Jo);let o=this.direction.dot(tc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;zi.subVectors(this.origin,e);let l=a*this.direction.dot(Jo.crossVectors(zi,Jo));if(l<0)return null;let c=a*this.direction.dot(ec.cross(zi));if(c<0||l+c>o)return null;let h=-a*zi.dot(tc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ce=class s{constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,g,x,p){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,g,x,p)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,g,x,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=x,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Xs.setFromMatrixColumn(e,0).length(),r=1/Xs.setFromMatrixColumn(e,1).length(),o=1/Xs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d+x*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=x+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d-x*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=x-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-x*u}else if(e.order==="XZY"){let d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(R0,e,C0)}lookAt(e,t,n){let i=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Vi.crossVectors(n,wn),Vi.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Vi.crossVectors(n,wn)),Vi.normalize(),jo.crossVectors(wn,Vi),i[0]=Vi.x,i[4]=jo.x,i[8]=wn.x,i[1]=Vi.y,i[5]=jo.y,i[9]=wn.y,i[2]=Vi.z,i[6]=jo.z,i[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],p=n[10],m=n[14],y=n[3],_=n[7],v=n[11],R=n[15],w=i[0],A=i[4],P=i[8],b=i[12],M=i[1],I=i[5],U=i[9],B=i[13],W=i[2],Y=i[6],V=i[10],ee=i[14],X=i[3],oe=i[7],pe=i[11],Te=i[15];return r[0]=o*w+a*M+l*W+c*X,r[4]=o*A+a*I+l*Y+c*oe,r[8]=o*P+a*U+l*V+c*pe,r[12]=o*b+a*B+l*ee+c*Te,r[1]=h*w+u*M+d*W+f*X,r[5]=h*A+u*I+d*Y+f*oe,r[9]=h*P+u*U+d*V+f*pe,r[13]=h*b+u*B+d*ee+f*Te,r[2]=g*w+x*M+p*W+m*X,r[6]=g*A+x*I+p*Y+m*oe,r[10]=g*P+x*U+p*V+m*pe,r[14]=g*b+x*B+p*ee+m*Te,r[3]=y*w+_*M+v*W+R*X,r[7]=y*A+_*I+v*Y+R*oe,r[11]=y*P+_*U+v*V+R*pe,r[15]=y*b+_*B+v*ee+R*Te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],x=e[7],p=e[11],m=e[15];return g*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+x*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+p*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+m*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],x=e[13],p=e[14],m=e[15],y=u*p*c-x*d*c+x*l*f-a*p*f-u*l*m+a*d*m,_=g*d*c-h*p*c-g*l*f+o*p*f+h*l*m-o*d*m,v=h*x*c-g*u*c+g*a*f-o*x*f-h*a*m+o*u*m,R=g*u*l-h*x*l-g*a*d+o*x*d+h*a*p-o*u*p,w=t*y+n*_+i*v+r*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/w;return e[0]=y*A,e[1]=(x*d*r-u*p*r-x*i*f+n*p*f+u*i*m-n*d*m)*A,e[2]=(a*p*r-x*l*r+x*i*c-n*p*c-a*i*m+n*l*m)*A,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*A,e[4]=_*A,e[5]=(h*p*r-g*d*r+g*i*f-t*p*f-h*i*m+t*d*m)*A,e[6]=(g*l*r-o*p*r-g*i*c+t*p*c+o*i*m-t*l*m)*A,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*f+t*l*f)*A,e[8]=v*A,e[9]=(g*u*r-h*x*r-g*n*f+t*x*f+h*n*m-t*u*m)*A,e[10]=(o*x*r-g*a*r+g*n*c-t*x*c-o*n*m+t*a*m)*A,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*A,e[12]=R*A,e[13]=(h*x*i-g*u*i+g*n*d-t*x*d-h*n*p+t*u*p)*A,e[14]=(g*a*i-o*x*i-g*n*l+t*x*l+o*n*p-t*a*p)*A,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*A,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,x=o*h,p=o*u,m=a*u,y=l*c,_=l*h,v=l*u,R=n.x,w=n.y,A=n.z;return i[0]=(1-(x+m))*R,i[1]=(f+v)*R,i[2]=(g-_)*R,i[3]=0,i[4]=(f-v)*w,i[5]=(1-(d+m))*w,i[6]=(p+y)*w,i[7]=0,i[8]=(g+_)*A,i[9]=(p-y)*A,i[10]=(1-(d+x))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=Xs.set(i[0],i[1],i[2]).length(),o=Xs.set(i[4],i[5],i[6]).length(),a=Xs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Wn.copy(this);let c=1/r,h=1/o,u=1/a;return Wn.elements[0]*=c,Wn.elements[1]*=c,Wn.elements[2]*=c,Wn.elements[4]*=h,Wn.elements[5]*=h,Wn.elements[6]*=h,Wn.elements[8]*=u,Wn.elements[9]*=u,Wn.elements[10]*=u,t.setFromRotationMatrix(Wn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=_i){let l=this.elements,c=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),f,g;if(a===_i)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ia)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=_i){let l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*c,f=(n+i)*h,g,x;if(a===_i)g=(o+r)*u,x=-2*u;else if(a===Ia)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Xs=new S,Wn=new Ce,R0=new S(0,0,0),C0=new S(1,1,1),Vi=new S,jo=new S,wn=new S,Yd=new Ce,$d=new sn,ni=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Vt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $d.setFromEuler(this),this.setFromQuaternion($d,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ni.DEFAULT_ORDER="XYZ";var mo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},P0=0,Kd=new S,qs=new sn,mi=new Ce,Qo=new S,$r=new S,I0=new S,L0=new sn,Zd=new S(1,0,0),Jd=new S(0,1,0),jd=new S(0,0,1),Qd={type:"added"},D0={type:"removed"},Ys={type:"childadded",child:null},nc={type:"childremoved",child:null},Ze=class s extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:P0++}),this.uuid=Zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new S,t=new ni,n=new sn,i=new S(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ce},normalMatrix:{value:new Ve}}),this.matrix=new Ce,this.matrixWorld=new Ce,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qs.setFromAxisAngle(e,t),this.quaternion.multiply(qs),this}rotateOnWorldAxis(e,t){return qs.setFromAxisAngle(e,t),this.quaternion.premultiply(qs),this}rotateX(e){return this.rotateOnAxis(Zd,e)}rotateY(e){return this.rotateOnAxis(Jd,e)}rotateZ(e){return this.rotateOnAxis(jd,e)}translateOnAxis(e,t){return Kd.copy(e).applyQuaternion(this.quaternion),this.position.add(Kd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zd,e)}translateY(e){return this.translateOnAxis(Jd,e)}translateZ(e){return this.translateOnAxis(jd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Qo.copy(e):Qo.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),$r.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt($r,Qo,this.up):mi.lookAt(Qo,$r,this.up),this.quaternion.setFromRotationMatrix(mi),i&&(mi.extractRotation(i.matrixWorld),qs.setFromRotationMatrix(mi),this.quaternion.premultiply(qs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qd),Ys.child=e,this.dispatchEvent(Ys),Ys.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(D0),nc.child=e,this.dispatchEvent(nc),nc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qd),Ys.child=e,this.dispatchEvent(Ys),Ys.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($r,e,I0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($r,L0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Ze.DEFAULT_UP=new S(0,1,0);Ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xn=new S,gi=new S,ic=new S,xi=new S,$s=new S,Ks=new S,ef=new S,sc=new S,rc=new S,oc=new S,ac=new rt,lc=new rt,cc=new rt,qi=class s{constructor(e=new S,t=new S,n=new S){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Xn.subVectors(e,t),i.cross(Xn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Xn.subVectors(i,t),gi.subVectors(n,t),ic.subVectors(e,t);let o=Xn.dot(Xn),a=Xn.dot(gi),l=Xn.dot(ic),c=gi.dot(gi),h=gi.dot(ic),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,xi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,xi.x),l.addScaledVector(o,xi.y),l.addScaledVector(a,xi.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return ac.setScalar(0),lc.setScalar(0),cc.setScalar(0),ac.fromBufferAttribute(e,t),lc.fromBufferAttribute(e,n),cc.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(ac,r.x),o.addScaledVector(lc,r.y),o.addScaledVector(cc,r.z),o}static isFrontFacing(e,t,n,i){return Xn.subVectors(n,t),gi.subVectors(e,t),Xn.cross(gi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),Xn.cross(gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;$s.subVectors(i,n),Ks.subVectors(r,n),sc.subVectors(e,n);let l=$s.dot(sc),c=Ks.dot(sc);if(l<=0&&c<=0)return t.copy(n);rc.subVectors(e,i);let h=$s.dot(rc),u=Ks.dot(rc);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector($s,o);oc.subVectors(e,r);let f=$s.dot(oc),g=Ks.dot(oc);if(g>=0&&f<=g)return t.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Ks,a);let p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return ef.subVectors(r,i),a=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(ef,a);let m=1/(p+x+d);return o=x*m,a=d*m,t.copy(n).addScaledVector($s,o).addScaledVector(Ks,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},yp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gi={h:0,s:0,l:0},ea={h:0,s:0,l:0};function hc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var te=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ke.workingColorSpace){if(e=du(e,1),t=Vt(t,0,1),n=Vt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=hc(o,r,e+1/3),this.g=hc(o,r,e),this.b=hc(o,r,e-1/3)}return Ke.toWorkingColorSpace(this,i),this}setStyle(e,t=dt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dt){let n=yp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Mi(e.r),this.g=Mi(e.g),this.b=Mi(e.b),this}copyLinearToSRGB(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dt){return Ke.fromWorkingColorSpace(en.copy(this),e),Math.round(Vt(en.r*255,0,255))*65536+Math.round(Vt(en.g*255,0,255))*256+Math.round(Vt(en.b*255,0,255))}getHexString(e=dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(en.copy(this),t);let n=en.r,i=en.g,r=en.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(en.copy(this),t),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=dt){Ke.fromWorkingColorSpace(en.copy(this),e);let t=en.r,n=en.g,i=en.b;return e!==dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Gi),this.setHSL(Gi.h+e,Gi.s+t,Gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Gi),e.getHSL(ea);let n=ao(Gi.h,ea.h,t),i=ao(Gi.s,ea.s,t),r=ao(Gi.l,ea.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new te;te.NAMES=yp;var N0=0,bn=class extends Ei{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:N0++}),this.uuid=Zn(),this.name="",this.blending=$i,this.side=Mn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cc,this.blendDst=Pc,this.blendEquation=vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=dr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ks,this.stencilZFail=ks,this.stencilZPass=ks,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$i&&(n.blending=this.blending),this.side!==Mn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Cc&&(n.blendSrc=this.blendSrc),this.blendDst!==Pc&&(n.blendDst=this.blendDst),this.blendEquation!==vs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==dr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ks&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ks&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ks&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Fe=class extends bn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=ip,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var kt=new S,ta=new Q,lt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=dh,this.updateRanges=[],this.gpuType=Kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ta.fromBufferAttribute(this,t),ta.applyMatrix3(e),this.setXY(t,ta.x,ta.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array),r=yt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==dh&&(e.usage=this.usage),e}};var Na=class extends lt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ua=class extends lt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var we=class extends lt{constructor(e,t,n){super(new Float32Array(e),t,n)}},U0=0,Nn=new Ce,uc=new Ze,Zs=new S,An=new on,Kr=new on,qt=new S,et=class s extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:U0++}),this.uuid=Zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xp(e)?Ua:Na)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ve().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,t,n){return Nn.makeTranslation(e,t,n),this.applyMatrix4(Nn),this}scale(e,t,n){return Nn.makeScale(e,t,n),this.applyMatrix4(Nn),this}lookAt(e){return uc.lookAt(e),uc.updateMatrix(),this.applyMatrix4(uc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zs).negate(),this.translate(Zs.x,Zs.y,Zs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new we(n,3))}else{for(let n=0,i=t.count;n<i;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new on);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new S(-1/0,-1/0,-1/0),new S(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];An.setFromBufferAttribute(r),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new S,1/0);return}if(e){let n=this.boundingSphere.center;if(An.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Kr.setFromBufferAttribute(a),this.morphTargetsRelative?(qt.addVectors(An.min,Kr.min),An.expandByPoint(qt),qt.addVectors(An.max,Kr.max),An.expandByPoint(qt)):(An.expandByPoint(Kr.min),An.expandByPoint(Kr.max))}An.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)qt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(qt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)qt.fromBufferAttribute(a,c),l&&(Zs.fromBufferAttribute(e,c),qt.add(Zs)),i=Math.max(i,n.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new lt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new S,l[P]=new S;let c=new S,h=new S,u=new S,d=new Q,f=new Q,g=new Q,x=new S,p=new S;function m(P,b,M){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,P),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(I),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(I),a[P].add(x),a[b].add(x),a[M].add(x),l[P].add(p),l[b].add(p),l[M].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let P=0,b=y.length;P<b;++P){let M=y[P],I=M.start,U=M.count;for(let B=I,W=I+U;B<W;B+=3)m(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let _=new S,v=new S,R=new S,w=new S;function A(P){R.fromBufferAttribute(i,P),w.copy(R);let b=a[P];_.copy(b),_.sub(R.multiplyScalar(R.dot(b))).normalize(),v.crossVectors(w,b);let I=v.dot(l[P])<0?-1:1;o.setXYZW(P,_.x,_.y,_.z,I)}for(let P=0,b=y.length;P<b;++P){let M=y[P],I=M.start,U=M.count;for(let B=I,W=I+U;B<W;B+=3)A(e.getX(B+0)),A(e.getX(B+1)),A(e.getX(B+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new lt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new S,r=new S,o=new S,a=new S,l=new S,c=new S,h=new S,u=new S;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),x=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,p),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let x=0,p=l.length;x<p;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let m=0;m<h;m++)d[g++]=c[f++]}return new lt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},tf=new Ce,ps=new bs,na=new Rn,nf=new S,ia=new S,sa=new S,ra=new S,dc=new S,oa=new S,sf=new S,aa=new S,ge=class extends Ze{constructor(e=new et,t=new Fe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){oa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(dc.fromBufferAttribute(u,e),o?oa.addScaledVector(dc,h):oa.addScaledVector(dc.sub(t),h))}t.add(oa)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),na.copy(n.boundingSphere),na.applyMatrix4(r),ps.copy(e.ray).recast(e.near),!(na.containsPoint(ps.origin)===!1&&(ps.intersectSphere(na,nf)===null||ps.origin.distanceToSquared(nf)>(e.far-e.near)**2))&&(tf.copy(r).invert(),ps.copy(e.ray).applyMatrix4(tf),!(n.boundingBox!==null&&ps.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ps)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let p=d[g],m=o[p.materialIndex],y=Math.max(p.start,f.start),_=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let v=y,R=_;v<R;v+=3){let w=a.getX(v),A=a.getX(v+1),P=a.getX(v+2);i=la(this,m,e,n,c,h,u,w,A,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let y=a.getX(p),_=a.getX(p+1),v=a.getX(p+2);i=la(this,o,e,n,c,h,u,y,_,v),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let p=d[g],m=o[p.materialIndex],y=Math.max(p.start,f.start),_=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=y,R=_;v<R;v+=3){let w=v,A=v+1,P=v+2;i=la(this,m,e,n,c,h,u,w,A,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let y=p,_=p+1,v=p+2;i=la(this,o,e,n,c,h,u,y,_,v),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}};function H0(s,e,t,n,i,r,o,a){let l;if(e.side===tn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Mn,a),l===null)return null;aa.copy(a),aa.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(aa);return c<t.near||c>t.far?null:{distance:c,point:aa.clone(),object:s}}function la(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,ia),s.getVertexPosition(l,sa),s.getVertexPosition(c,ra);let h=H0(s,e,t,n,ia,sa,ra,sf);if(h){let u=new S;qi.getBarycoord(sf,ia,sa,ra,u),i&&(h.uv=qi.getInterpolatedAttribute(i,a,l,c,u,new Q)),r&&(h.uv1=qi.getInterpolatedAttribute(r,a,l,c,u,new Q)),o&&(h.normal=qi.getInterpolatedAttribute(o,a,l,c,u,new S),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new S,materialIndex:0};qi.getNormal(ia,sa,ra,d.normal),h.face=d,h.barycoord=u}return h}var Ye=class s extends et{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new we(c,3)),this.setAttribute("normal",new we(h,3)),this.setAttribute("uv",new we(u,2));function g(x,p,m,y,_,v,R,w,A,P,b){let M=v/A,I=R/P,U=v/2,B=R/2,W=w/2,Y=A+1,V=P+1,ee=0,X=0,oe=new S;for(let pe=0;pe<V;pe++){let Te=pe*I-B;for(let Xe=0;Xe<Y;Xe++){let ft=Xe*M-U;oe[x]=ft*y,oe[p]=Te*_,oe[m]=W,c.push(oe.x,oe.y,oe.z),oe[x]=0,oe[p]=0,oe[m]=w>0?1:-1,h.push(oe.x,oe.y,oe.z),u.push(Xe/A),u.push(1-pe/P),ee+=1}}for(let pe=0;pe<P;pe++)for(let Te=0;Te<A;Te++){let Xe=d+Te+Y*pe,ft=d+Te+Y*(pe+1),K=d+(Te+1)+Y*(pe+1),re=d+(Te+1)+Y*pe;l.push(Xe,ft,re),l.push(ft,K,re),X+=6}a.addGroup(f,X,b),f+=X,d+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function _r(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function gn(s){let e={};for(let t=0;t<s.length;t++){let n=_r(s[t]);for(let i in n)e[i]=n[i]}return e}function B0(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function vp(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}var Cn={clone:_r,merge:gn},F0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,O0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Mt=class extends bn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=F0,this.fragmentShader=O0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_r(e.uniforms),this.uniformsGroups=B0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ha=class extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ce,this.projectionMatrix=new Ce,this.projectionMatrixInverse=new Ce,this.coordinateSystem=_i}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Wi=new S,rf=new Q,of=new Q,Ut=class extends Ha{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=vr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(oo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vr*2*Math.atan(Math.tan(oo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z)}getViewSize(e,t){return this.getViewBounds(e,rf,of),t.subVectors(of,rf)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(oo*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Js=-90,js=1,gh=class extends Ze{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Ut(Js,js,e,t);i.layers=this.layers,this.add(i);let r=new Ut(Js,js,e,t);r.layers=this.layers,this.add(r);let o=new Ut(Js,js,e,t);o.layers=this.layers,this.add(o);let a=new Ut(Js,js,e,t);a.layers=this.layers,this.add(a);let l=new Ut(Js,js,e,t);l.layers=this.layers,this.add(l);let c=new Ut(Js,js,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===_i)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ia)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ba=class extends zt{constructor(e,t,n,i,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:fr,super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},xh=class extends Zt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ba(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:_n}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ye(5,5,5),r=new Mt({name:"CubemapFromEquirect",uniforms:_r(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:ti});r.uniforms.tEquirect.value=t;let o=new ge(i,r),a=t.minFilter;return t.minFilter===ei&&(t.minFilter=_n),new gh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},fc=new S,k0=new S,z0=new Ve,qn=class{constructor(e=new S(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=fc.subVectors(n,t).cross(k0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(fc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||z0.getNormalMatrix(e),i=this.coplanarPoint(fc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ms=new Rn,ca=new S,go=class{constructor(e=new qn,t=new qn,n=new qn,i=new qn,r=new qn,o=new qn){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=_i){let n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],x=i[10],p=i[11],m=i[12],y=i[13],_=i[14],v=i[15];if(n[0].setComponents(l-r,d-c,p-f,v-m).normalize(),n[1].setComponents(l+r,d+c,p+f,v+m).normalize(),n[2].setComponents(l+o,d+h,p+g,v+y).normalize(),n[3].setComponents(l-o,d-h,p-g,v-y).normalize(),n[4].setComponents(l-a,d-u,p-x,v-_).normalize(),t===_i)n[5].setComponents(l+a,d+u,p+x,v+_).normalize();else if(t===Ia)n[5].setComponents(a,u,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ms.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ms.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ms)}intersectsSprite(e){return ms.center.set(0,0,0),ms.radius=.7071067811865476,ms.applyMatrix4(e.matrixWorld),this.intersectsSphere(ms)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(ca.x=i.normal.x>0?e.max.x:e.min.x,ca.y=i.normal.y>0?e.max.y:e.min.y,ca.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ca)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function _p(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function V0(s){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let x=u[f];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var an=class s extends et{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],x=[],p=[];for(let m=0;m<h;m++){let y=m*d-o;for(let _=0;_<c;_++){let v=_*u-r;g.push(v,-y,0),x.push(0,0,1),p.push(_/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<a;y++){let _=y+c*m,v=y+c*(m+1),R=y+1+c*(m+1),w=y+1+c*m;f.push(_,v,w),f.push(v,R,w)}this.setIndex(f),this.setAttribute("position",new we(g,3)),this.setAttribute("normal",new we(x,3)),this.setAttribute("uv",new we(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},G0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,W0=`#ifdef USE_ALPHAHASH
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
#endif`,X0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,q0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Y0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,K0=`#ifdef USE_AOMAP
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
#endif`,Z0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,J0=`#ifdef USE_BATCHING
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
#endif`,j0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Q0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,eg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ng=`#ifdef USE_IRIDESCENCE
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
#endif`,ig=`#ifdef USE_BUMPMAP
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
#endif`,sg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,rg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,og=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ag=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,cg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,hg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ug=`#if defined( USE_COLOR_ALPHA )
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
#endif`,dg=`#define PI 3.141592653589793
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
} // validated`,fg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,pg=`vec3 transformedNormal = objectNormal;
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
#endif`,mg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vg="gl_FragColor = linearToOutputTexel( gl_FragColor );",_g=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Mg=`#ifdef USE_ENVMAP
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
#endif`,bg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Eg=`#ifdef USE_ENVMAP
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
#endif`,Sg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Tg=`#ifdef USE_ENVMAP
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
#endif`,wg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ag=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Rg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pg=`#ifdef USE_GRADIENTMAP
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
}`,Ig=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Lg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Dg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ng=`uniform bool receiveShadow;
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
#endif`,Ug=`#ifdef USE_ENVMAP
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
#endif`,Hg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Og=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kg=`PhysicalMaterial material;
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
#endif`,zg=`struct PhysicalMaterial {
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
}`,Vg=`
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
#endif`,Gg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Wg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Xg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,qg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$g=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Kg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Jg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,jg=`#if defined( USE_POINTS_UV )
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
#endif`,Qg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ex=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,nx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ix=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sx=`#ifdef USE_MORPHTARGETS
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
#endif`,rx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ox=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ax=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,lx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ux=`#ifdef USE_NORMALMAP
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
#endif`,dx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,px=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,yx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_x=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ex=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ax=`float getShadowMask() {
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
}`,Rx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Cx=`#ifdef USE_SKINNING
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
#endif`,Px=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ix=`#ifdef USE_SKINNING
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
#endif`,Lx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Dx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Nx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ux=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hx=`#ifdef USE_TRANSMISSION
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
#endif`,Bx=`#ifdef USE_TRANSMISSION
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
#endif`,Fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Vx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gx=`uniform sampler2D t2D;
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
}`,Wx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,qx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$x=`#include <common>
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
}`,Kx=`#if DEPTH_PACKING == 3200
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
}`,Zx=`#define DISTANCE
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
}`,Jx=`#define DISTANCE
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
}`,jx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Qx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ey=`uniform float scale;
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
}`,ty=`uniform vec3 diffuse;
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
}`,ny=`#include <common>
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
}`,iy=`uniform vec3 diffuse;
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
}`,sy=`#define LAMBERT
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
}`,ry=`#define LAMBERT
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
}`,oy=`#define MATCAP
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
}`,ay=`#define MATCAP
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
}`,ly=`#define NORMAL
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
}`,cy=`#define NORMAL
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
}`,hy=`#define PHONG
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
}`,uy=`#define PHONG
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
}`,dy=`#define STANDARD
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
}`,fy=`#define STANDARD
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
}`,py=`#define TOON
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
}`,my=`#define TOON
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
}`,gy=`uniform float size;
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
}`,xy=`uniform vec3 diffuse;
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
}`,yy=`#include <common>
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
}`,vy=`uniform vec3 color;
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
}`,_y=`uniform float rotation;
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
}`,My=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:G0,alphahash_pars_fragment:W0,alphamap_fragment:X0,alphamap_pars_fragment:q0,alphatest_fragment:Y0,alphatest_pars_fragment:$0,aomap_fragment:K0,aomap_pars_fragment:Z0,batching_pars_vertex:J0,batching_vertex:j0,begin_vertex:Q0,beginnormal_vertex:eg,bsdfs:tg,iridescence_fragment:ng,bumpmap_pars_fragment:ig,clipping_planes_fragment:sg,clipping_planes_pars_fragment:rg,clipping_planes_pars_vertex:og,clipping_planes_vertex:ag,color_fragment:lg,color_pars_fragment:cg,color_pars_vertex:hg,color_vertex:ug,common:dg,cube_uv_reflection_fragment:fg,defaultnormal_vertex:pg,displacementmap_pars_vertex:mg,displacementmap_vertex:gg,emissivemap_fragment:xg,emissivemap_pars_fragment:yg,colorspace_fragment:vg,colorspace_pars_fragment:_g,envmap_fragment:Mg,envmap_common_pars_fragment:bg,envmap_pars_fragment:Eg,envmap_pars_vertex:Sg,envmap_physical_pars_fragment:Ug,envmap_vertex:Tg,fog_vertex:wg,fog_pars_vertex:Ag,fog_fragment:Rg,fog_pars_fragment:Cg,gradientmap_pars_fragment:Pg,lightmap_pars_fragment:Ig,lights_lambert_fragment:Lg,lights_lambert_pars_fragment:Dg,lights_pars_begin:Ng,lights_toon_fragment:Hg,lights_toon_pars_fragment:Bg,lights_phong_fragment:Fg,lights_phong_pars_fragment:Og,lights_physical_fragment:kg,lights_physical_pars_fragment:zg,lights_fragment_begin:Vg,lights_fragment_maps:Gg,lights_fragment_end:Wg,logdepthbuf_fragment:Xg,logdepthbuf_pars_fragment:qg,logdepthbuf_pars_vertex:Yg,logdepthbuf_vertex:$g,map_fragment:Kg,map_pars_fragment:Zg,map_particle_fragment:Jg,map_particle_pars_fragment:jg,metalnessmap_fragment:Qg,metalnessmap_pars_fragment:ex,morphinstance_vertex:tx,morphcolor_vertex:nx,morphnormal_vertex:ix,morphtarget_pars_vertex:sx,morphtarget_vertex:rx,normal_fragment_begin:ox,normal_fragment_maps:ax,normal_pars_fragment:lx,normal_pars_vertex:cx,normal_vertex:hx,normalmap_pars_fragment:ux,clearcoat_normal_fragment_begin:dx,clearcoat_normal_fragment_maps:fx,clearcoat_pars_fragment:px,iridescence_pars_fragment:mx,opaque_fragment:gx,packing:xx,premultiplied_alpha_fragment:yx,project_vertex:vx,dithering_fragment:_x,dithering_pars_fragment:Mx,roughnessmap_fragment:bx,roughnessmap_pars_fragment:Ex,shadowmap_pars_fragment:Sx,shadowmap_pars_vertex:Tx,shadowmap_vertex:wx,shadowmask_pars_fragment:Ax,skinbase_vertex:Rx,skinning_pars_vertex:Cx,skinning_vertex:Px,skinnormal_vertex:Ix,specularmap_fragment:Lx,specularmap_pars_fragment:Dx,tonemapping_fragment:Nx,tonemapping_pars_fragment:Ux,transmission_fragment:Hx,transmission_pars_fragment:Bx,uv_pars_fragment:Fx,uv_pars_vertex:Ox,uv_vertex:kx,worldpos_vertex:zx,background_vert:Vx,background_frag:Gx,backgroundCube_vert:Wx,backgroundCube_frag:Xx,cube_vert:qx,cube_frag:Yx,depth_vert:$x,depth_frag:Kx,distanceRGBA_vert:Zx,distanceRGBA_frag:Jx,equirect_vert:jx,equirect_frag:Qx,linedashed_vert:ey,linedashed_frag:ty,meshbasic_vert:ny,meshbasic_frag:iy,meshlambert_vert:sy,meshlambert_frag:ry,meshmatcap_vert:oy,meshmatcap_frag:ay,meshnormal_vert:ly,meshnormal_frag:cy,meshphong_vert:hy,meshphong_frag:uy,meshphysical_vert:dy,meshphysical_frag:fy,meshtoon_vert:py,meshtoon_frag:my,points_vert:gy,points_frag:xy,shadow_vert:yy,shadow_frag:vy,sprite_vert:_y,sprite_frag:My},ae={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Q(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new Q(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Qn={basic:{uniforms:gn([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:gn([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new te(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:gn([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:gn([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:gn([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new te(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:gn([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:gn([ae.points,ae.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:gn([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:gn([ae.common,ae.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:gn([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:gn([ae.sprite,ae.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:gn([ae.common,ae.displacementmap,{referencePosition:{value:new S},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:gn([ae.lights,ae.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Qn.physical={uniforms:gn([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Q(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Q},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Q},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};var ha={r:0,b:0,g:0},gs=new ni,by=new Ce;function Ey(s,e,t,n,i,r,o){let a=new te(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?t:e).get(_)),_}function x(y){let _=!1,v=g(y);v===null?m(a,l):v&&v.isColor&&(m(v,1),_=!0);let R=s.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function p(y,_){let v=g(_);v&&(v.isCubeTexture||v.mapping===ul)?(h===void 0&&(h=new ge(new Ye(1,1,1),new Mt({name:"BackgroundCubeMaterial",uniforms:_r(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),gs.copy(_.backgroundRotation),gs.x*=-1,gs.y*=-1,gs.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(gs.y*=-1,gs.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(by.makeRotationFromEuler(gs)),h.material.toneMapped=Ke.getTransfer(v.colorSpace)!==gt,(u!==v||d!==v.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new ge(new an(2,2),new Mt({name:"BackgroundMaterial",uniforms:_r(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(v.colorSpace)!==gt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,f=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,_){y.getRGB(ha,vp(s)),n.buffers.color.setClear(ha.r,ha.g,ha.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),l=_,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,m(a,l)},render:x,addToRenderList:p}}function Sy(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(M,I,U,B,W){let Y=!1,V=u(B,U,I);r!==V&&(r=V,c(r.object)),Y=f(M,B,U,W),Y&&g(M,B,U,W),W!==null&&e.update(W,s.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,v(M,I,U,B),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,I,U){let B=U.wireframe===!0,W=n[M.id];W===void 0&&(W={},n[M.id]=W);let Y=W[I.id];Y===void 0&&(Y={},W[I.id]=Y);let V=Y[B];return V===void 0&&(V=d(l()),Y[B]=V),V}function d(M){let I=[],U=[],B=[];for(let W=0;W<t;W++)I[W]=0,U[W]=0,B[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:U,attributeDivisors:B,object:M,attributes:{},index:null}}function f(M,I,U,B){let W=r.attributes,Y=I.attributes,V=0,ee=U.getAttributes();for(let X in ee)if(ee[X].location>=0){let pe=W[X],Te=Y[X];if(Te===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(Te=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(Te=M.instanceColor)),pe===void 0||pe.attribute!==Te||Te&&pe.data!==Te.data)return!0;V++}return r.attributesNum!==V||r.index!==B}function g(M,I,U,B){let W={},Y=I.attributes,V=0,ee=U.getAttributes();for(let X in ee)if(ee[X].location>=0){let pe=Y[X];pe===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(pe=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(pe=M.instanceColor));let Te={};Te.attribute=pe,pe&&pe.data&&(Te.data=pe.data),W[X]=Te,V++}r.attributes=W,r.attributesNum=V,r.index=B}function x(){let M=r.newAttributes;for(let I=0,U=M.length;I<U;I++)M[I]=0}function p(M){m(M,0)}function m(M,I){let U=r.newAttributes,B=r.enabledAttributes,W=r.attributeDivisors;U[M]=1,B[M]===0&&(s.enableVertexAttribArray(M),B[M]=1),W[M]!==I&&(s.vertexAttribDivisor(M,I),W[M]=I)}function y(){let M=r.newAttributes,I=r.enabledAttributes;for(let U=0,B=I.length;U<B;U++)I[U]!==M[U]&&(s.disableVertexAttribArray(U),I[U]=0)}function _(M,I,U,B,W,Y,V){V===!0?s.vertexAttribIPointer(M,I,U,W,Y):s.vertexAttribPointer(M,I,U,B,W,Y)}function v(M,I,U,B){x();let W=B.attributes,Y=U.getAttributes(),V=I.defaultAttributeValues;for(let ee in Y){let X=Y[ee];if(X.location>=0){let oe=W[ee];if(oe===void 0&&(ee==="instanceMatrix"&&M.instanceMatrix&&(oe=M.instanceMatrix),ee==="instanceColor"&&M.instanceColor&&(oe=M.instanceColor)),oe!==void 0){let pe=oe.normalized,Te=oe.itemSize,Xe=e.get(oe);if(Xe===void 0)continue;let ft=Xe.buffer,K=Xe.type,re=Xe.bytesPerElement,be=K===s.INT||K===s.UNSIGNED_INT||oe.gpuType===su;if(oe.isInterleavedBufferAttribute){let ce=oe.data,Ne=ce.stride,Oe=oe.offset;if(ce.isInstancedInterleavedBuffer){for(let Qe=0;Qe<X.locationSize;Qe++)m(X.location+Qe,ce.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Qe=0;Qe<X.locationSize;Qe++)p(X.location+Qe);s.bindBuffer(s.ARRAY_BUFFER,ft);for(let Qe=0;Qe<X.locationSize;Qe++)_(X.location+Qe,Te/X.locationSize,K,pe,Ne*re,(Oe+Te/X.locationSize*Qe)*re,be)}else{if(oe.isInstancedBufferAttribute){for(let ce=0;ce<X.locationSize;ce++)m(X.location+ce,oe.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ce=0;ce<X.locationSize;ce++)p(X.location+ce);s.bindBuffer(s.ARRAY_BUFFER,ft);for(let ce=0;ce<X.locationSize;ce++)_(X.location+ce,Te/X.locationSize,K,pe,Te*re,Te/X.locationSize*ce*re,be)}}else if(V!==void 0){let pe=V[ee];if(pe!==void 0)switch(pe.length){case 2:s.vertexAttrib2fv(X.location,pe);break;case 3:s.vertexAttrib3fv(X.location,pe);break;case 4:s.vertexAttrib4fv(X.location,pe);break;default:s.vertexAttrib1fv(X.location,pe)}}}}y()}function R(){P();for(let M in n){let I=n[M];for(let U in I){let B=I[U];for(let W in B)h(B[W].object),delete B[W];delete I[U]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;let I=n[M.id];for(let U in I){let B=I[U];for(let W in B)h(B[W].object),delete B[W];delete I[U]}delete n[M.id]}function A(M){for(let I in n){let U=n[I];if(U[M.id]===void 0)continue;let B=U[M.id];for(let W in B)h(B[W].object),delete B[W];delete U[M.id]}}function P(){b(),o=!0,r!==i&&(r=i,c(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:p,disableUnusedAttributes:y}}function Ty(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function wy(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==Un&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let P=A===Jn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==bi&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Kn&&!P)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),_=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,w=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:v,vertexTextures:R,maxSamples:w}}function Ay(s){let e=this,t=null,n=0,i=!1,r=!1,o=new qn,a=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,x=u.clipIntersection,p=u.clipShadows,m=s.get(u);if(!i||g===null||g.length===0||r&&!p)r?h(null):c();else{let y=r?0:n,_=y*4,v=m.clippingState||null;l.value=v,v=h(g,d,_,f);for(let R=0;R!==_;++R)v[R]=t[R];m.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let x=u!==null?u.length:0,p=null;if(x!==0){if(p=l.value,g!==!0||p===null){let m=f+x*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let _=0,v=f;_!==x;++_,v+=4)o.copy(u[_]).applyMatrix4(y,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}function Ry(s){let e=new WeakMap;function t(o,a){return a===Fc?o.mapping=fr:a===Oc&&(o.mapping=pr),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Fc||a===Oc)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new xh(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Zi=class extends Ha{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},lr=4,af=[.125,.215,.35,.446,.526,.582],_s=20,pc=new Zi,lf=new te,mc=null,gc=0,xc=0,yc=!1,ys=(1+Math.sqrt(5))/2,Qs=1/ys,cf=[new S(-ys,Qs,0),new S(ys,Qs,0),new S(-Qs,0,ys),new S(Qs,0,ys),new S(0,ys,-Qs),new S(0,ys,Qs),new S(-1,1,-1),new S(1,1,-1),new S(-1,1,1),new S(1,1,1)],Mr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){mc=this._renderer.getRenderTarget(),gc=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=df(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(mc,gc,xc),this._renderer.xr.enabled=yc,e.scissorTest=!1,ua(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fr||e.mapping===pr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),mc=this._renderer.getRenderTarget(),gc=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Jn,format:Un,colorSpace:cn,depthBuffer:!1},i=hf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hf(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Cy(r)),this._blurMaterial=Py(r,e,t)}return i}_compileMaterial(e){let t=new ge(this._lodPlanes[0],e);this._renderer.compile(t,pc)}_sceneToCubeUV(e,t,n,i){let a=new Ut(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(lf),h.toneMapping=Ki,h.autoClear=!1;let f=new Fe({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),g=new ge(new Ye,f),x=!1,p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,x=!0):(f.color.copy(lf),x=!0);for(let m=0;m<6;m++){let y=m%3;y===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):y===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));let _=this._cubeSize;ua(i,y*_,m>2?_:0,_,_),h.setRenderTarget(i),x&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===fr||e.mapping===pr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=df()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uf());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new ge(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;ua(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,pc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=cf[(i-r-1)%cf.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new ge(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*_s-1),x=r/g,p=isFinite(r)?1+Math.floor(h*x):_s;p>_s&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${_s}`);let m=[],y=0;for(let A=0;A<_s;++A){let P=A/x,b=Math.exp(-P*P/2);m.push(b),A===0?y+=b:A<p&&(y+=2*b)}for(let A=0;A<m.length;A++)m[A]=m[A]/y;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:_}=this;d.dTheta.value=g,d.mipInt.value=_-n;let v=this._sizeLods[i],R=3*v*(i>_-lr?i-_+lr:0),w=4*(this._cubeSize-v);ua(t,R,w,3*v,2*v),l.setRenderTarget(t),l.render(u,pc)}};function Cy(s){let e=[],t=[],n=[],i=s,r=s-lr+1+af.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let l=1/a;o>s-lr?l=af[o-s+lr-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,p=2,m=1,y=new Float32Array(x*g*f),_=new Float32Array(p*g*f),v=new Float32Array(m*g*f);for(let w=0;w<f;w++){let A=w%3*2/3-1,P=w>2?0:-1,b=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];y.set(b,x*g*w),_.set(d,p*g*w);let M=[w,w,w,w,w,w];v.set(M,m*g*w)}let R=new et;R.setAttribute("position",new lt(y,x)),R.setAttribute("uv",new lt(_,p)),R.setAttribute("faceIndex",new lt(v,m)),e.push(R),i>lr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function hf(s,e,t){let n=new Zt(s,e,t);return n.texture.mapping=ul,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ua(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Py(s,e,t){let n=new Float32Array(_s),i=new S(0,1,0);return new Mt({name:"SphericalGaussianBlur",defines:{n:_s,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:fu(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function uf(){return new Mt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fu(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function df(){return new Mt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function fu(){return`

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
	`}function Iy(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Fc||l===Oc,h=l===fr||l===pr;if(c||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Mr(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Mr(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Ly(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&io("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Dy(s,e,t,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let p=0,m=x.length;p<m;p++)e.remove(x[p])}d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let g in d)e.update(d[g],s.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let x=f[g];for(let p=0,m=x.length;p<m;p++)e.update(x[p],s.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,g=u.attributes.position,x=0;if(f!==null){let y=f.array;x=f.version;for(let _=0,v=y.length;_<v;_+=3){let R=y[_+0],w=y[_+1],A=y[_+2];d.push(R,w,w,A,A,R)}}else if(g!==void 0){let y=g.array;x=g.version;for(let _=0,v=y.length/3-1;_<v;_+=3){let R=_+0,w=_+1,A=_+2;d.push(R,w,w,A,A,R)}}else return;let p=new(xp(d)?Ua:Na)(d,1);p.version=x;let m=r.get(u);m&&e.remove(m),r.set(u,p)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Ny(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];t.update(p,n,1)}function u(d,f,g,x){if(g===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/o,f[m],x[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let m=0;for(let y=0;y<g;y++)m+=f[y]*x[y];t.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Uy(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Hy(s,e,t){let n=new WeakMap,i=new rt;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let b=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],_=0;f===!0&&(_=1),g===!0&&(_=2),x===!0&&(_=3);let v=a.attributes.position.count*_,R=1;v>e.maxTextureSize&&(R=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let w=new Float32Array(v*R*4*u),A=new Da(w,v,R,u);A.type=Kn,A.needsUpdate=!0;let P=_*4;for(let M=0;M<u;M++){let I=p[M],U=m[M],B=y[M],W=v*R*4*M;for(let Y=0;Y<I.count;Y++){let V=Y*P;f===!0&&(i.fromBufferAttribute(I,Y),w[W+V+0]=i.x,w[W+V+1]=i.y,w[W+V+2]=i.z,w[W+V+3]=0),g===!0&&(i.fromBufferAttribute(U,Y),w[W+V+4]=i.x,w[W+V+5]=i.y,w[W+V+6]=i.z,w[W+V+7]=0),x===!0&&(i.fromBufferAttribute(B,Y),w[W+V+8]=i.x,w[W+V+9]=i.y,w[W+V+10]=i.z,w[W+V+11]=B.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new Q(v,R)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function By(s,e,t,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var Fa=class extends zt{constructor(e,t,n,i,r,o,a,l,c,h=cr){if(h!==cr&&h!==gr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===cr&&(n=Ms),n===void 0&&h===gr&&(n=mr),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:nn,this.minFilter=l!==void 0?l:nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Mp=new zt,ff=new Fa(1,1),bp=new Da,Ep=new mh,Sp=new Ba,pf=[],mf=[],gf=new Float32Array(16),xf=new Float32Array(9),yf=new Float32Array(4);function Pr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=pf[i];if(r===void 0&&(r=new Float32Array(i),pf[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Wt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Xt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function pl(s,e){let t=mf[e];t===void 0&&(t=new Int32Array(e),mf[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Fy(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Oy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;s.uniform2fv(this.addr,e),Xt(t,e)}}function ky(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;s.uniform3fv(this.addr,e),Xt(t,e)}}function zy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;s.uniform4fv(this.addr,e),Xt(t,e)}}function Vy(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;yf.set(n),s.uniformMatrix2fv(this.addr,!1,yf),Xt(t,n)}}function Gy(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;xf.set(n),s.uniformMatrix3fv(this.addr,!1,xf),Xt(t,n)}}function Wy(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;gf.set(n),s.uniformMatrix4fv(this.addr,!1,gf),Xt(t,n)}}function Xy(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function qy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;s.uniform2iv(this.addr,e),Xt(t,e)}}function Yy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;s.uniform3iv(this.addr,e),Xt(t,e)}}function $y(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;s.uniform4iv(this.addr,e),Xt(t,e)}}function Ky(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Zy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;s.uniform2uiv(this.addr,e),Xt(t,e)}}function Jy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;s.uniform3uiv(this.addr,e),Xt(t,e)}}function jy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;s.uniform4uiv(this.addr,e),Xt(t,e)}}function Qy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(ff.compareFunction=gp,r=ff):r=Mp,t.setTexture2D(e||r,i)}function ev(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Ep,i)}function tv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Sp,i)}function nv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||bp,i)}function iv(s){switch(s){case 5126:return Fy;case 35664:return Oy;case 35665:return ky;case 35666:return zy;case 35674:return Vy;case 35675:return Gy;case 35676:return Wy;case 5124:case 35670:return Xy;case 35667:case 35671:return qy;case 35668:case 35672:return Yy;case 35669:case 35673:return $y;case 5125:return Ky;case 36294:return Zy;case 36295:return Jy;case 36296:return jy;case 35678:case 36198:case 36298:case 36306:case 35682:return Qy;case 35679:case 36299:case 36307:return ev;case 35680:case 36300:case 36308:case 36293:return tv;case 36289:case 36303:case 36311:case 36292:return nv}}function sv(s,e){s.uniform1fv(this.addr,e)}function rv(s,e){let t=Pr(e,this.size,2);s.uniform2fv(this.addr,t)}function ov(s,e){let t=Pr(e,this.size,3);s.uniform3fv(this.addr,t)}function av(s,e){let t=Pr(e,this.size,4);s.uniform4fv(this.addr,t)}function lv(s,e){let t=Pr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function cv(s,e){let t=Pr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function hv(s,e){let t=Pr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function uv(s,e){s.uniform1iv(this.addr,e)}function dv(s,e){s.uniform2iv(this.addr,e)}function fv(s,e){s.uniform3iv(this.addr,e)}function pv(s,e){s.uniform4iv(this.addr,e)}function mv(s,e){s.uniform1uiv(this.addr,e)}function gv(s,e){s.uniform2uiv(this.addr,e)}function xv(s,e){s.uniform3uiv(this.addr,e)}function yv(s,e){s.uniform4uiv(this.addr,e)}function vv(s,e,t){let n=this.cache,i=e.length,r=pl(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Mp,r[o])}function _v(s,e,t){let n=this.cache,i=e.length,r=pl(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Ep,r[o])}function Mv(s,e,t){let n=this.cache,i=e.length,r=pl(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Sp,r[o])}function bv(s,e,t){let n=this.cache,i=e.length,r=pl(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||bp,r[o])}function Ev(s){switch(s){case 5126:return sv;case 35664:return rv;case 35665:return ov;case 35666:return av;case 35674:return lv;case 35675:return cv;case 35676:return hv;case 5124:case 35670:return uv;case 35667:case 35671:return dv;case 35668:case 35672:return fv;case 35669:case 35673:return pv;case 5125:return mv;case 36294:return gv;case 36295:return xv;case 36296:return yv;case 35678:case 36198:case 36298:case 36306:case 35682:return vv;case 35679:case 36299:case 36307:return _v;case 35680:case 36300:case 36308:case 36293:return Mv;case 36289:case 36303:case 36311:case 36292:return bv}}var yh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=iv(t.type)}},vh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ev(t.type)}},_h=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},vc=/(\w+)(\])?(\[|\.)?/g;function vf(s,e){s.seq.push(e),s.map[e.id]=e}function Sv(s,e,t){let n=s.name,i=n.length;for(vc.lastIndex=0;;){let r=vc.exec(n),o=vc.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){vf(t,c===void 0?new yh(a,s,e):new vh(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new _h(a),vf(t,u)),t=u}}}var ur=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);Sv(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function _f(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var Tv=37297,wv=0;function Av(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Mf=new Ve;function Rv(s){Ke._getMatrix(Mf,Ke.workingColorSpace,s);let e=`mat3( ${Mf.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(s)){case fl:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function bf(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+Av(s.getShaderSource(e),o)}else return i}function Cv(s,e){let t=Rv(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Pv(s,e){let t;switch(e){case jh:t="Linear";break;case Qh:t="Reinhard";break;case eu:t="Cineon";break;case Eo:t="ACESFilmic";break;case tu:t="AgX";break;case nu:t="Neutral";break;case Gm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var da=new S;function Iv(){Ke.getLuminanceCoefficients(da);let s=da.x.toFixed(4),e=da.y.toFixed(4),t=da.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(so).join(`
`)}function Dv(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Nv(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function so(s){return s!==""}function Ef(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Sf(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Uv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mh(s){return s.replace(Uv,Bv)}var Hv=new Map;function Bv(s,e){let t=We[e];if(t===void 0){let n=Hv.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Mh(t)}var Fv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tf(s){return s.replace(Fv,Ov)}function Ov(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function wf(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function kv(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===np?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Jh?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===vi&&(e="SHADOWMAP_TYPE_VSM"),e}function zv(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case fr:case pr:e="ENVMAP_TYPE_CUBE";break;case ul:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Vv(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case pr:e="ENVMAP_MODE_REFRACTION";break}return e}function Gv(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case ip:e="ENVMAP_BLENDING_MULTIPLY";break;case zm:e="ENVMAP_BLENDING_MIX";break;case Vm:e="ENVMAP_BLENDING_ADD";break}return e}function Wv(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Xv(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=kv(t),c=zv(t),h=Vv(t),u=Gv(t),d=Wv(t),f=Lv(t),g=Dv(r),x=i.createProgram(),p,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(so).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(so).join(`
`),m.length>0&&(m+=`
`)):(p=[wf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(so).join(`
`),m=[wf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ki?"#define TONE_MAPPING":"",t.toneMapping!==Ki?We.tonemapping_pars_fragment:"",t.toneMapping!==Ki?Pv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Cv("linearToOutputTexel",t.outputColorSpace),Iv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(so).join(`
`)),o=Mh(o),o=Ef(o,t),o=Sf(o,t),a=Mh(a),a=Ef(a,t),a=Sf(a,t),o=Tf(o),a=Tf(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Fd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let _=y+p+o,v=y+m+a,R=_f(i,i.VERTEX_SHADER,_),w=_f(i,i.FRAGMENT_SHADER,v);i.attachShader(x,R),i.attachShader(x,w),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function A(I){if(s.debug.checkShaderErrors){let U=i.getProgramInfoLog(x).trim(),B=i.getShaderInfoLog(R).trim(),W=i.getShaderInfoLog(w).trim(),Y=!0,V=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(Y=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,R,w);else{let ee=bf(i,R,"vertex"),X=bf(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+U+`
`+ee+`
`+X)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(B===""||W==="")&&(V=!1);V&&(I.diagnostics={runnable:Y,programLog:U,vertexShader:{log:B,prefix:p},fragmentShader:{log:W,prefix:m}})}i.deleteShader(R),i.deleteShader(w),P=new ur(i,x),b=Nv(i,x)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(x,Tv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wv++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=w,this}var qv=0,bh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Eh(e),t.set(e,n)),n}},Eh=class{constructor(e){this.id=qv++,this.code=e,this.usedTimes=0}};function Yv(s,e,t,n,i,r,o){let a=new mo,l=new bh,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function p(b,M,I,U,B){let W=U.fog,Y=B.geometry,V=b.isMeshStandardMaterial?U.environment:null,ee=(b.isMeshStandardMaterial?t:e).get(b.envMap||V),X=ee&&ee.mapping===ul?ee.image.height:null,oe=g[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let pe=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Te=pe!==void 0?pe.length:0,Xe=0;Y.morphAttributes.position!==void 0&&(Xe=1),Y.morphAttributes.normal!==void 0&&(Xe=2),Y.morphAttributes.color!==void 0&&(Xe=3);let ft,K,re,be;if(oe){let xt=Qn[oe];ft=xt.vertexShader,K=xt.fragmentShader}else ft=b.vertexShader,K=b.fragmentShader,l.update(b),re=l.getVertexShaderID(b),be=l.getFragmentShaderID(b);let ce=s.getRenderTarget(),Ne=s.state.buffers.depth.getReversed(),Oe=B.isInstancedMesh===!0,Qe=B.isBatchedMesh===!0,Dt=!!b.map,ot=!!b.matcap,Bt=!!ee,H=!!b.aoMap,Ln=!!b.lightMap,nt=!!b.bumpMap,it=!!b.normalMap,Ie=!!b.displacementMap,wt=!!b.emissiveMap,Re=!!b.metalnessMap,C=!!b.roughnessMap,E=b.anisotropy>0,O=b.clearcoat>0,Z=b.dispersion>0,j=b.iridescence>0,$=b.sheen>0,Ee=b.transmission>0,he=E&&!!b.anisotropyMap,me=O&&!!b.clearcoatMap,at=O&&!!b.clearcoatNormalMap,ie=O&&!!b.clearcoatRoughnessMap,xe=j&&!!b.iridescenceMap,De=j&&!!b.iridescenceThicknessMap,Ue=$&&!!b.sheenColorMap,ye=$&&!!b.sheenRoughnessMap,st=!!b.specularMap,Ge=!!b.specularColorMap,bt=!!b.specularIntensityMap,L=Ee&&!!b.transmissionMap,le=Ee&&!!b.thicknessMap,q=!!b.gradientMap,J=!!b.alphaMap,fe=b.alphaTest>0,ue=!!b.alphaHash,ke=!!b.extensions,Nt=Ki;b.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(Nt=s.toneMapping);let jt={shaderID:oe,shaderType:b.type,shaderName:b.name,vertexShader:ft,fragmentShader:K,defines:b.defines,customVertexShaderID:re,customFragmentShaderID:be,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Qe,batchingColor:Qe&&B._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&B.instanceColor!==null,instancingMorph:Oe&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ce===null?s.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:cn,alphaToCoverage:!!b.alphaToCoverage,map:Dt,matcap:ot,envMap:Bt,envMapMode:Bt&&ee.mapping,envMapCubeUVHeight:X,aoMap:H,lightMap:Ln,bumpMap:nt,normalMap:it,displacementMap:d&&Ie,emissiveMap:wt,normalMapObjectSpace:it&&b.normalMapType===Jm,normalMapTangentSpace:it&&b.normalMapType===mp,metalnessMap:Re,roughnessMap:C,anisotropy:E,anisotropyMap:he,clearcoat:O,clearcoatMap:me,clearcoatNormalMap:at,clearcoatRoughnessMap:ie,dispersion:Z,iridescence:j,iridescenceMap:xe,iridescenceThicknessMap:De,sheen:$,sheenColorMap:Ue,sheenRoughnessMap:ye,specularMap:st,specularColorMap:Ge,specularIntensityMap:bt,transmission:Ee,transmissionMap:L,thicknessMap:le,gradientMap:q,opaque:b.transparent===!1&&b.blending===$i&&b.alphaToCoverage===!1,alphaMap:J,alphaTest:fe,alphaHash:ue,combine:b.combine,mapUv:Dt&&x(b.map.channel),aoMapUv:H&&x(b.aoMap.channel),lightMapUv:Ln&&x(b.lightMap.channel),bumpMapUv:nt&&x(b.bumpMap.channel),normalMapUv:it&&x(b.normalMap.channel),displacementMapUv:Ie&&x(b.displacementMap.channel),emissiveMapUv:wt&&x(b.emissiveMap.channel),metalnessMapUv:Re&&x(b.metalnessMap.channel),roughnessMapUv:C&&x(b.roughnessMap.channel),anisotropyMapUv:he&&x(b.anisotropyMap.channel),clearcoatMapUv:me&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:at&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:De&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:ye&&x(b.sheenRoughnessMap.channel),specularMapUv:st&&x(b.specularMap.channel),specularColorMapUv:Ge&&x(b.specularColorMap.channel),specularIntensityMapUv:bt&&x(b.specularIntensityMap.channel),transmissionMapUv:L&&x(b.transmissionMap.channel),thicknessMapUv:le&&x(b.thicknessMap.channel),alphaMapUv:J&&x(b.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(it||E),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Y.attributes.uv&&(Dt||J),fog:!!W,useFog:b.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ne,skinning:B.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Xe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:Nt,decodeVideoTexture:Dt&&b.map.isVideoTexture===!0&&Ke.getTransfer(b.map.colorSpace)===gt,decodeVideoTextureEmissive:wt&&b.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(b.emissiveMap.colorSpace)===gt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ct,flipSided:b.side===tn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:ke&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&b.extensions.multiDraw===!0||Qe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return jt.vertexUv1s=c.has(1),jt.vertexUv2s=c.has(2),jt.vertexUv3s=c.has(3),c.clear(),jt}function m(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let I in b.defines)M.push(I),M.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(y(M,b),_(M,b),M.push(s.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function y(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function _(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function v(b){let M=g[b.type],I;if(M){let U=Qn[M];I=Cn.clone(U.uniforms)}else I=b.uniforms;return I}function R(b,M){let I;for(let U=0,B=h.length;U<B;U++){let W=h[U];if(W.cacheKey===M){I=W,++I.usedTimes;break}}return I===void 0&&(I=new Xv(s,M,b,r),h.push(I)),I}function w(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function A(b){l.remove(b)}function P(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:v,acquireProgram:R,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:P}}function $v(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Kv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Af(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Rf(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,g,x,p){let m=s[e];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:p},s[e]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=x,m.group=p),e++,m}function a(u,d,f,g,x,p){let m=o(u,d,f,g,x,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(u,d,f,g,x,p){let m=o(u,d,f,g,x,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(u,d){t.length>1&&t.sort(u||Kv),n.length>1&&n.sort(d||Af),i.length>1&&i.sort(d||Af)}function h(){for(let u=e,d=s.length;u<d;u++){let f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function Zv(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new Rf,s.set(n,[o])):i>=r.length?(o=new Rf,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Jv(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new S,color:new te};break;case"SpotLight":t={position:new S,direction:new S,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new S,color:new te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new S,skyColor:new te,groundColor:new te};break;case"RectAreaLight":t={color:new te,position:new S,halfWidth:new S,halfHeight:new S};break}return s[e.id]=t,t}}}function jv(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Qv=0;function e_(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function t_(s){let e=new Jv,t=jv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new S);let i=new S,r=new Ce,o=new Ce;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,x=0,p=0,m=0,y=0,_=0,v=0,R=0,w=0,A=0;c.sort(e_);for(let b=0,M=c.length;b<M;b++){let I=c[b],U=I.color,B=I.intensity,W=I.distance,Y=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=U.r*B,u+=U.g*B,d+=U.b*B;else if(I.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(I.sh.coefficients[V],B);A++}else if(I.isDirectionalLight){let V=e.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let ee=I.shadow,X=t.get(I);X.shadowIntensity=ee.intensity,X.shadowBias=ee.bias,X.shadowNormalBias=ee.normalBias,X.shadowRadius=ee.radius,X.shadowMapSize=ee.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=I.shadow.matrix,y++}n.directional[f]=V,f++}else if(I.isSpotLight){let V=e.get(I);V.position.setFromMatrixPosition(I.matrixWorld),V.color.copy(U).multiplyScalar(B),V.distance=W,V.coneCos=Math.cos(I.angle),V.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),V.decay=I.decay,n.spot[x]=V;let ee=I.shadow;if(I.map&&(n.spotLightMap[R]=I.map,R++,ee.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[x]=ee.matrix,I.castShadow){let X=t.get(I);X.shadowIntensity=ee.intensity,X.shadowBias=ee.bias,X.shadowNormalBias=ee.normalBias,X.shadowRadius=ee.radius,X.shadowMapSize=ee.mapSize,n.spotShadow[x]=X,n.spotShadowMap[x]=Y,v++}x++}else if(I.isRectAreaLight){let V=e.get(I);V.color.copy(U).multiplyScalar(B),V.halfWidth.set(I.width*.5,0,0),V.halfHeight.set(0,I.height*.5,0),n.rectArea[p]=V,p++}else if(I.isPointLight){let V=e.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),V.distance=I.distance,V.decay=I.decay,I.castShadow){let ee=I.shadow,X=t.get(I);X.shadowIntensity=ee.intensity,X.shadowBias=ee.bias,X.shadowNormalBias=ee.normalBias,X.shadowRadius=ee.radius,X.shadowMapSize=ee.mapSize,X.shadowCameraNear=ee.camera.near,X.shadowCameraFar=ee.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=I.shadow.matrix,_++}n.point[g]=V,g++}else if(I.isHemisphereLight){let V=e.get(I);V.skyColor.copy(I.color).multiplyScalar(B),V.groundColor.copy(I.groundColor).multiplyScalar(B),n.hemi[m]=V,m++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ae.LTC_FLOAT_1,n.rectAreaLTC2=ae.LTC_FLOAT_2):(n.rectAreaLTC1=ae.LTC_HALF_1,n.rectAreaLTC2=ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==x||P.rectAreaLength!==p||P.hemiLength!==m||P.numDirectionalShadows!==y||P.numPointShadows!==_||P.numSpotShadows!==v||P.numSpotMaps!==R||P.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=v+R-w,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,P.directionalLength=f,P.pointLength=g,P.spotLength=x,P.rectAreaLength=p,P.hemiLength=m,P.numDirectionalShadows=y,P.numPointShadows=_,P.numSpotShadows=v,P.numSpotMaps=R,P.numLightProbes=A,n.version=Qv++)}function l(c,h){let u=0,d=0,f=0,g=0,x=0,p=h.matrixWorldInverse;for(let m=0,y=c.length;m<y;m++){let _=c[m];if(_.isDirectionalLight){let v=n.directional[u];v.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),u++}else if(_.isSpotLight){let v=n.spot[f];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),f++}else if(_.isRectAreaLight){let v=n.rectArea[g];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(p),o.identity(),r.copy(_.matrixWorld),r.premultiply(p),o.extractRotation(r),v.halfWidth.set(_.width*.5,0,0),v.halfHeight.set(0,_.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){let v=n.point[d];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(p),d++}else if(_.isHemisphereLight){let v=n.hemi[x];v.direction.setFromMatrixPosition(_.matrixWorld),v.direction.transformDirection(p),x++}}}return{setup:a,setupView:l,state:n}}function Cf(s){let e=new t_(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function n_(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new Cf(s),e.set(i,[a])):r>=o.length?(a=new Cf(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var Sh=class extends bn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Km,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Th=class extends bn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},i_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,s_=`uniform sampler2D shadow_pass;
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
}`;function r_(s,e,t){let n=new go,i=new Q,r=new Q,o=new rt,a=new Sh({depthPacking:Zm}),l=new Th,c={},h=t.maxTextureSize,u={[Mn]:tn,[tn]:Mn,[Ct]:Ct},d=new Mt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Q},radius:{value:4}},vertexShader:i_,fragmentShader:s_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new et;g.setAttribute("position",new lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ge(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=np;let m=this.type;this.render=function(w,A,P){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;let b=s.getRenderTarget(),M=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),U=s.state;U.setBlending(ti),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let B=m!==vi&&this.type===vi,W=m===vi&&this.type!==vi;for(let Y=0,V=w.length;Y<V;Y++){let ee=w[Y],X=ee.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);let oe=X.getFrameExtents();if(i.multiply(oe),r.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/oe.x),i.x=r.x*oe.x,X.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/oe.y),i.y=r.y*oe.y,X.mapSize.y=r.y)),X.map===null||B===!0||W===!0){let Te=this.type!==vi?{minFilter:nn,magFilter:nn}:{};X.map!==null&&X.map.dispose(),X.map=new Zt(i.x,i.y,Te),X.map.texture.name=ee.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();let pe=X.getViewportCount();for(let Te=0;Te<pe;Te++){let Xe=X.getViewport(Te);o.set(r.x*Xe.x,r.y*Xe.y,r.x*Xe.z,r.y*Xe.w),U.viewport(o),X.updateMatrices(ee,Te),n=X.getFrustum(),v(A,P,X.camera,ee,this.type)}X.isPointLightShadow!==!0&&this.type===vi&&y(X,P),X.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(b,M,I)};function y(w,A){let P=e.update(x);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Zt(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(A,null,P,d,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(A,null,P,f,x,null)}function _(w,A,P,b){let M=null,I=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)M=I;else if(M=P.isPointLight===!0?l:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let U=M.uuid,B=A.uuid,W=c[U];W===void 0&&(W={},c[U]=W);let Y=W[B];Y===void 0&&(Y=M.clone(),W[B]=Y,A.addEventListener("dispose",R)),M=Y}if(M.visible=A.visible,M.wireframe=A.wireframe,b===vi?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let U=s.properties.get(M);U.light=P}return M}function v(w,A,P,b,M){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===vi)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);let B=e.update(w),W=w.material;if(Array.isArray(W)){let Y=B.groups;for(let V=0,ee=Y.length;V<ee;V++){let X=Y[V],oe=W[X.materialIndex];if(oe&&oe.visible){let pe=_(w,oe,b,M);w.onBeforeShadow(s,w,A,P,B,pe,X),s.renderBufferDirect(P,null,B,pe,w,X),w.onAfterShadow(s,w,A,P,B,pe,X)}}}else if(W.visible){let Y=_(w,W,b,M);w.onBeforeShadow(s,w,A,P,B,Y,null),s.renderBufferDirect(P,null,B,Y,w,null),w.onAfterShadow(s,w,A,P,B,Y,null)}}let U=w.children;for(let B=0,W=U.length;B<W;B++)v(U[B],A,P,b,M)}function R(w){w.target.removeEventListener("dispose",R);for(let P in c){let b=c[P],M=w.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var o_={[Ic]:Lc,[Dc]:Hc,[Nc]:Bc,[dr]:Uc,[Lc]:Ic,[Hc]:Dc,[Bc]:Nc,[Uc]:dr};function a_(s,e){function t(){let L=!1,le=new rt,q=null,J=new rt(0,0,0,0);return{setMask:function(fe){q!==fe&&!L&&(s.colorMask(fe,fe,fe,fe),q=fe)},setLocked:function(fe){L=fe},setClear:function(fe,ue,ke,Nt,jt){jt===!0&&(fe*=Nt,ue*=Nt,ke*=Nt),le.set(fe,ue,ke,Nt),J.equals(le)===!1&&(s.clearColor(fe,ue,ke,Nt),J.copy(le))},reset:function(){L=!1,q=null,J.set(-1,0,0,0)}}}function n(){let L=!1,le=!1,q=null,J=null,fe=null;return{setReversed:function(ue){if(le!==ue){let ke=e.get("EXT_clip_control");le?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT);let Nt=fe;fe=null,this.setClear(Nt)}le=ue},getReversed:function(){return le},setTest:function(ue){ue?ce(s.DEPTH_TEST):Ne(s.DEPTH_TEST)},setMask:function(ue){q!==ue&&!L&&(s.depthMask(ue),q=ue)},setFunc:function(ue){if(le&&(ue=o_[ue]),J!==ue){switch(ue){case Ic:s.depthFunc(s.NEVER);break;case Lc:s.depthFunc(s.ALWAYS);break;case Dc:s.depthFunc(s.LESS);break;case dr:s.depthFunc(s.LEQUAL);break;case Nc:s.depthFunc(s.EQUAL);break;case Uc:s.depthFunc(s.GEQUAL);break;case Hc:s.depthFunc(s.GREATER);break;case Bc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}J=ue}},setLocked:function(ue){L=ue},setClear:function(ue){fe!==ue&&(le&&(ue=1-ue),s.clearDepth(ue),fe=ue)},reset:function(){L=!1,q=null,J=null,fe=null,le=!1}}}function i(){let L=!1,le=null,q=null,J=null,fe=null,ue=null,ke=null,Nt=null,jt=null;return{setTest:function(xt){L||(xt?ce(s.STENCIL_TEST):Ne(s.STENCIL_TEST))},setMask:function(xt){le!==xt&&!L&&(s.stencilMask(xt),le=xt)},setFunc:function(xt,zn,ui){(q!==xt||J!==zn||fe!==ui)&&(s.stencilFunc(xt,zn,ui),q=xt,J=zn,fe=ui)},setOp:function(xt,zn,ui){(ue!==xt||ke!==zn||Nt!==ui)&&(s.stencilOp(xt,zn,ui),ue=xt,ke=zn,Nt=ui)},setLocked:function(xt){L=xt},setClear:function(xt){jt!==xt&&(s.clearStencil(xt),jt=xt)},reset:function(){L=!1,le=null,q=null,J=null,fe=null,ue=null,ke=null,Nt=null,jt=null}}}let r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,x=!1,p=null,m=null,y=null,_=null,v=null,R=null,w=null,A=new te(0,0,0),P=0,b=!1,M=null,I=null,U=null,B=null,W=null,Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,ee=0,X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(X)[1]),V=ee>=1):X.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),V=ee>=2);let oe=null,pe={},Te=s.getParameter(s.SCISSOR_BOX),Xe=s.getParameter(s.VIEWPORT),ft=new rt().fromArray(Te),K=new rt().fromArray(Xe);function re(L,le,q,J){let fe=new Uint8Array(4),ue=s.createTexture();s.bindTexture(L,ue),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ke=0;ke<q;ke++)L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY?s.texImage3D(le,0,s.RGBA,1,1,J,0,s.RGBA,s.UNSIGNED_BYTE,fe):s.texImage2D(le+ke,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,fe);return ue}let be={};be[s.TEXTURE_2D]=re(s.TEXTURE_2D,s.TEXTURE_2D,1),be[s.TEXTURE_CUBE_MAP]=re(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),be[s.TEXTURE_2D_ARRAY]=re(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),be[s.TEXTURE_3D]=re(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ce(s.DEPTH_TEST),o.setFunc(dr),nt(!1),it(Dd),ce(s.CULL_FACE),H(ti);function ce(L){h[L]!==!0&&(s.enable(L),h[L]=!0)}function Ne(L){h[L]!==!1&&(s.disable(L),h[L]=!1)}function Oe(L,le){return u[L]!==le?(s.bindFramebuffer(L,le),u[L]=le,L===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=le),L===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=le),!0):!1}function Qe(L,le){let q=f,J=!1;if(L){q=d.get(le),q===void 0&&(q=[],d.set(le,q));let fe=L.textures;if(q.length!==fe.length||q[0]!==s.COLOR_ATTACHMENT0){for(let ue=0,ke=fe.length;ue<ke;ue++)q[ue]=s.COLOR_ATTACHMENT0+ue;q.length=fe.length,J=!0}}else q[0]!==s.BACK&&(q[0]=s.BACK,J=!0);J&&s.drawBuffers(q)}function Dt(L){return g!==L?(s.useProgram(L),g=L,!0):!1}let ot={[vs]:s.FUNC_ADD,[Sm]:s.FUNC_SUBTRACT,[Tm]:s.FUNC_REVERSE_SUBTRACT};ot[wm]=s.MIN,ot[Am]=s.MAX;let Bt={[Rm]:s.ZERO,[Cm]:s.ONE,[Pm]:s.SRC_COLOR,[Cc]:s.SRC_ALPHA,[Hm]:s.SRC_ALPHA_SATURATE,[Nm]:s.DST_COLOR,[Lm]:s.DST_ALPHA,[Im]:s.ONE_MINUS_SRC_COLOR,[Pc]:s.ONE_MINUS_SRC_ALPHA,[Um]:s.ONE_MINUS_DST_COLOR,[Dm]:s.ONE_MINUS_DST_ALPHA,[Bm]:s.CONSTANT_COLOR,[Fm]:s.ONE_MINUS_CONSTANT_COLOR,[Om]:s.CONSTANT_ALPHA,[km]:s.ONE_MINUS_CONSTANT_ALPHA};function H(L,le,q,J,fe,ue,ke,Nt,jt,xt){if(L===ti){x===!0&&(Ne(s.BLEND),x=!1);return}if(x===!1&&(ce(s.BLEND),x=!0),L!==Em){if(L!==p||xt!==b){if((m!==vs||v!==vs)&&(s.blendEquation(s.FUNC_ADD),m=vs,v=vs),xt)switch(L){case $i:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Gt:s.blendFunc(s.ONE,s.ONE);break;case Nd:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ud:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case $i:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Gt:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Nd:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ud:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}y=null,_=null,R=null,w=null,A.set(0,0,0),P=0,p=L,b=xt}return}fe=fe||le,ue=ue||q,ke=ke||J,(le!==m||fe!==v)&&(s.blendEquationSeparate(ot[le],ot[fe]),m=le,v=fe),(q!==y||J!==_||ue!==R||ke!==w)&&(s.blendFuncSeparate(Bt[q],Bt[J],Bt[ue],Bt[ke]),y=q,_=J,R=ue,w=ke),(Nt.equals(A)===!1||jt!==P)&&(s.blendColor(Nt.r,Nt.g,Nt.b,jt),A.copy(Nt),P=jt),p=L,b=!1}function Ln(L,le){L.side===Ct?Ne(s.CULL_FACE):ce(s.CULL_FACE);let q=L.side===tn;le&&(q=!q),nt(q),L.blending===$i&&L.transparent===!1?H(ti):H(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);let J=L.stencilWrite;a.setTest(J),J&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),wt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ce(s.SAMPLE_ALPHA_TO_COVERAGE):Ne(s.SAMPLE_ALPHA_TO_COVERAGE)}function nt(L){M!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),M=L)}function it(L){L!==Mm?(ce(s.CULL_FACE),L!==I&&(L===Dd?s.cullFace(s.BACK):L===bm?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ne(s.CULL_FACE),I=L}function Ie(L){L!==U&&(V&&s.lineWidth(L),U=L)}function wt(L,le,q){L?(ce(s.POLYGON_OFFSET_FILL),(B!==le||W!==q)&&(s.polygonOffset(le,q),B=le,W=q)):Ne(s.POLYGON_OFFSET_FILL)}function Re(L){L?ce(s.SCISSOR_TEST):Ne(s.SCISSOR_TEST)}function C(L){L===void 0&&(L=s.TEXTURE0+Y-1),oe!==L&&(s.activeTexture(L),oe=L)}function E(L,le,q){q===void 0&&(oe===null?q=s.TEXTURE0+Y-1:q=oe);let J=pe[q];J===void 0&&(J={type:void 0,texture:void 0},pe[q]=J),(J.type!==L||J.texture!==le)&&(oe!==q&&(s.activeTexture(q),oe=q),s.bindTexture(L,le||be[L]),J.type=L,J.texture=le)}function O(){let L=pe[oe];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Z(){try{s.compressedTexImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function j(){try{s.compressedTexImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $(){try{s.texSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{s.texSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function he(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function me(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function at(){try{s.texStorage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ie(){try{s.texStorage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xe(){try{s.texImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function De(){try{s.texImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ue(L){ft.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),ft.copy(L))}function ye(L){K.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),K.copy(L))}function st(L,le){let q=c.get(le);q===void 0&&(q=new WeakMap,c.set(le,q));let J=q.get(L);J===void 0&&(J=s.getUniformBlockIndex(le,L.name),q.set(L,J))}function Ge(L,le){let J=c.get(le).get(L);l.get(le)!==J&&(s.uniformBlockBinding(le,J,L.__bindingPointIndex),l.set(le,J))}function bt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},oe=null,pe={},u={},d=new WeakMap,f=[],g=null,x=!1,p=null,m=null,y=null,_=null,v=null,R=null,w=null,A=new te(0,0,0),P=0,b=!1,M=null,I=null,U=null,B=null,W=null,ft.set(0,0,s.canvas.width,s.canvas.height),K.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ce,disable:Ne,bindFramebuffer:Oe,drawBuffers:Qe,useProgram:Dt,setBlending:H,setMaterial:Ln,setFlipSided:nt,setCullFace:it,setLineWidth:Ie,setPolygonOffset:wt,setScissorTest:Re,activeTexture:C,bindTexture:E,unbindTexture:O,compressedTexImage2D:Z,compressedTexImage3D:j,texImage2D:xe,texImage3D:De,updateUBOMapping:st,uniformBlockBinding:Ge,texStorage2D:at,texStorage3D:ie,texSubImage2D:$,texSubImage3D:Ee,compressedTexSubImage2D:he,compressedTexSubImage3D:me,scissor:Ue,viewport:ye,reset:bt}}function Pf(s,e,t,n){let i=l_(n);switch(t){case lp:return s*e;case hp:return s*e;case up:return s*e*2;case au:return s*e/i.components*i.byteLength;case lu:return s*e/i.components*i.byteLength;case dp:return s*e*2/i.components*i.byteLength;case cu:return s*e*2/i.components*i.byteLength;case cp:return s*e*3/i.components*i.byteLength;case Un:return s*e*4/i.components*i.byteLength;case hu:return s*e*4/i.components*i.byteLength;case Ta:case wa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Aa:case Ra:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case zc:case Gc:return Math.max(s,16)*Math.max(e,8)/4;case kc:case Vc:return Math.max(s,8)*Math.max(e,8)/2;case Wc:case Xc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case qc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Yc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case $c:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Kc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Zc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Jc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case jc:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Qc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case eh:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case th:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case nh:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case ih:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case sh:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case rh:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case oh:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ca:case ah:case lh:return Math.ceil(s/4)*Math.ceil(e/4)*16;case fp:case ch:return Math.ceil(s/4)*Math.ceil(e/4)*8;case hh:case uh:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function l_(s){switch(s){case bi:case rp:return{byteLength:1,components:1};case fo:case op:case Jn:return{byteLength:2,components:1};case ru:case ou:return{byteLength:2,components:4};case Ms:case su:case Kn:return{byteLength:4,components:1};case ap:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function c_(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Q,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,E){return f?new OffscreenCanvas(C,E):po("canvas")}function x(C,E,O){let Z=1,j=Re(C);if((j.width>O||j.height>O)&&(Z=O/Math.max(j.width,j.height)),Z<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let $=Math.floor(Z*j.width),Ee=Math.floor(Z*j.height);u===void 0&&(u=g($,Ee));let he=E?g($,Ee):u;return he.width=$,he.height=Ee,he.getContext("2d").drawImage(C,0,0,$,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+$+"x"+Ee+")."),he}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),C;return C}function p(C){return C.generateMipmaps}function m(C){s.generateMipmap(C)}function y(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function _(C,E,O,Z,j=!1){if(C!==null){if(s[C]!==void 0)return s[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let $=E;if(E===s.RED&&(O===s.FLOAT&&($=s.R32F),O===s.HALF_FLOAT&&($=s.R16F),O===s.UNSIGNED_BYTE&&($=s.R8)),E===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&($=s.R8UI),O===s.UNSIGNED_SHORT&&($=s.R16UI),O===s.UNSIGNED_INT&&($=s.R32UI),O===s.BYTE&&($=s.R8I),O===s.SHORT&&($=s.R16I),O===s.INT&&($=s.R32I)),E===s.RG&&(O===s.FLOAT&&($=s.RG32F),O===s.HALF_FLOAT&&($=s.RG16F),O===s.UNSIGNED_BYTE&&($=s.RG8)),E===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&($=s.RG8UI),O===s.UNSIGNED_SHORT&&($=s.RG16UI),O===s.UNSIGNED_INT&&($=s.RG32UI),O===s.BYTE&&($=s.RG8I),O===s.SHORT&&($=s.RG16I),O===s.INT&&($=s.RG32I)),E===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&($=s.RGB8UI),O===s.UNSIGNED_SHORT&&($=s.RGB16UI),O===s.UNSIGNED_INT&&($=s.RGB32UI),O===s.BYTE&&($=s.RGB8I),O===s.SHORT&&($=s.RGB16I),O===s.INT&&($=s.RGB32I)),E===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&($=s.RGBA8UI),O===s.UNSIGNED_SHORT&&($=s.RGBA16UI),O===s.UNSIGNED_INT&&($=s.RGBA32UI),O===s.BYTE&&($=s.RGBA8I),O===s.SHORT&&($=s.RGBA16I),O===s.INT&&($=s.RGBA32I)),E===s.RGB&&O===s.UNSIGNED_INT_5_9_9_9_REV&&($=s.RGB9_E5),E===s.RGBA){let Ee=j?fl:Ke.getTransfer(Z);O===s.FLOAT&&($=s.RGBA32F),O===s.HALF_FLOAT&&($=s.RGBA16F),O===s.UNSIGNED_BYTE&&($=Ee===gt?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function v(C,E){let O;return C?E===null||E===Ms||E===mr?O=s.DEPTH24_STENCIL8:E===Kn?O=s.DEPTH32F_STENCIL8:E===fo&&(O=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Ms||E===mr?O=s.DEPTH_COMPONENT24:E===Kn?O=s.DEPTH_COMPONENT32F:E===fo&&(O=s.DEPTH_COMPONENT16),O}function R(C,E){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==nn&&C.minFilter!==_n?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function w(C){let E=C.target;E.removeEventListener("dispose",w),P(E),E.isVideoTexture&&h.delete(E)}function A(C){let E=C.target;E.removeEventListener("dispose",A),M(E)}function P(C){let E=n.get(C);if(E.__webglInit===void 0)return;let O=C.source,Z=d.get(O);if(Z){let j=Z[E.__cacheKey];j.usedTimes--,j.usedTimes===0&&b(C),Object.keys(Z).length===0&&d.delete(O)}n.remove(C)}function b(C){let E=n.get(C);s.deleteTexture(E.__webglTexture);let O=C.source,Z=d.get(O);delete Z[E.__cacheKey],o.memory.textures--}function M(C){let E=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(E.__webglFramebuffer[Z]))for(let j=0;j<E.__webglFramebuffer[Z].length;j++)s.deleteFramebuffer(E.__webglFramebuffer[Z][j]);else s.deleteFramebuffer(E.__webglFramebuffer[Z]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[Z])}else{if(Array.isArray(E.__webglFramebuffer))for(let Z=0;Z<E.__webglFramebuffer.length;Z++)s.deleteFramebuffer(E.__webglFramebuffer[Z]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let Z=0;Z<E.__webglColorRenderbuffer.length;Z++)E.__webglColorRenderbuffer[Z]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[Z]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let O=C.textures;for(let Z=0,j=O.length;Z<j;Z++){let $=n.get(O[Z]);$.__webglTexture&&(s.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(O[Z])}n.remove(C)}let I=0;function U(){I=0}function B(){let C=I;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),I+=1,C}function W(C){let E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function Y(C,E){let O=n.get(C);if(C.isVideoTexture&&Ie(C),C.isRenderTargetTexture===!1&&C.version>0&&O.__version!==C.version){let Z=C.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(O,C,E);return}}t.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+E)}function V(C,E){let O=n.get(C);if(C.version>0&&O.__version!==C.version){K(O,C,E);return}t.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+E)}function ee(C,E){let O=n.get(C);if(C.version>0&&O.__version!==C.version){K(O,C,E);return}t.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+E)}function X(C,E){let O=n.get(C);if(C.version>0&&O.__version!==C.version){re(O,C,E);return}t.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+E)}let oe={[rn]:s.REPEAT,[$n]:s.CLAMP_TO_EDGE,[uo]:s.MIRRORED_REPEAT},pe={[nn]:s.NEAREST,[iu]:s.NEAREST_MIPMAP_NEAREST,[rr]:s.NEAREST_MIPMAP_LINEAR,[_n]:s.LINEAR,[ro]:s.LINEAR_MIPMAP_NEAREST,[ei]:s.LINEAR_MIPMAP_LINEAR},Te={[jm]:s.NEVER,[s0]:s.ALWAYS,[Qm]:s.LESS,[gp]:s.LEQUAL,[e0]:s.EQUAL,[i0]:s.GEQUAL,[t0]:s.GREATER,[n0]:s.NOTEQUAL};function Xe(C,E){if(E.type===Kn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===_n||E.magFilter===ro||E.magFilter===rr||E.magFilter===ei||E.minFilter===_n||E.minFilter===ro||E.minFilter===rr||E.minFilter===ei)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,oe[E.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,oe[E.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,oe[E.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,pe[E.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,pe[E.minFilter]),E.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,Te[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===nn||E.minFilter!==rr&&E.minFilter!==ei||E.type===Kn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function ft(C,E){let O=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",w));let Z=E.source,j=d.get(Z);j===void 0&&(j={},d.set(Z,j));let $=W(E);if($!==C.__cacheKey){j[$]===void 0&&(j[$]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,O=!0),j[$].usedTimes++;let Ee=j[C.__cacheKey];Ee!==void 0&&(j[C.__cacheKey].usedTimes--,Ee.usedTimes===0&&b(E)),C.__cacheKey=$,C.__webglTexture=j[$].texture}return O}function K(C,E,O){let Z=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Z=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(Z=s.TEXTURE_3D);let j=ft(C,E),$=E.source;t.bindTexture(Z,C.__webglTexture,s.TEXTURE0+O);let Ee=n.get($);if($.version!==Ee.__version||j===!0){t.activeTexture(s.TEXTURE0+O);let he=Ke.getPrimaries(Ke.workingColorSpace),me=E.colorSpace===Xi?null:Ke.getPrimaries(E.colorSpace),at=E.colorSpace===Xi||he===me?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,at);let ie=x(E.image,!1,i.maxTextureSize);ie=wt(E,ie);let xe=r.convert(E.format,E.colorSpace),De=r.convert(E.type),Ue=_(E.internalFormat,xe,De,E.colorSpace,E.isVideoTexture);Xe(Z,E);let ye,st=E.mipmaps,Ge=E.isVideoTexture!==!0,bt=Ee.__version===void 0||j===!0,L=$.dataReady,le=R(E,ie);if(E.isDepthTexture)Ue=v(E.format===gr,E.type),bt&&(Ge?t.texStorage2D(s.TEXTURE_2D,1,Ue,ie.width,ie.height):t.texImage2D(s.TEXTURE_2D,0,Ue,ie.width,ie.height,0,xe,De,null));else if(E.isDataTexture)if(st.length>0){Ge&&bt&&t.texStorage2D(s.TEXTURE_2D,le,Ue,st[0].width,st[0].height);for(let q=0,J=st.length;q<J;q++)ye=st[q],Ge?L&&t.texSubImage2D(s.TEXTURE_2D,q,0,0,ye.width,ye.height,xe,De,ye.data):t.texImage2D(s.TEXTURE_2D,q,Ue,ye.width,ye.height,0,xe,De,ye.data);E.generateMipmaps=!1}else Ge?(bt&&t.texStorage2D(s.TEXTURE_2D,le,Ue,ie.width,ie.height),L&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ie.width,ie.height,xe,De,ie.data)):t.texImage2D(s.TEXTURE_2D,0,Ue,ie.width,ie.height,0,xe,De,ie.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ge&&bt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,le,Ue,st[0].width,st[0].height,ie.depth);for(let q=0,J=st.length;q<J;q++)if(ye=st[q],E.format!==Un)if(xe!==null)if(Ge){if(L)if(E.layerUpdates.size>0){let fe=Pf(ye.width,ye.height,E.format,E.type);for(let ue of E.layerUpdates){let ke=ye.data.subarray(ue*fe/ye.data.BYTES_PER_ELEMENT,(ue+1)*fe/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,ue,ye.width,ye.height,1,xe,ke)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,ye.width,ye.height,ie.depth,xe,ye.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,q,Ue,ye.width,ye.height,ie.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?L&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,ye.width,ye.height,ie.depth,xe,De,ye.data):t.texImage3D(s.TEXTURE_2D_ARRAY,q,Ue,ye.width,ye.height,ie.depth,0,xe,De,ye.data)}else{Ge&&bt&&t.texStorage2D(s.TEXTURE_2D,le,Ue,st[0].width,st[0].height);for(let q=0,J=st.length;q<J;q++)ye=st[q],E.format!==Un?xe!==null?Ge?L&&t.compressedTexSubImage2D(s.TEXTURE_2D,q,0,0,ye.width,ye.height,xe,ye.data):t.compressedTexImage2D(s.TEXTURE_2D,q,Ue,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?L&&t.texSubImage2D(s.TEXTURE_2D,q,0,0,ye.width,ye.height,xe,De,ye.data):t.texImage2D(s.TEXTURE_2D,q,Ue,ye.width,ye.height,0,xe,De,ye.data)}else if(E.isDataArrayTexture)if(Ge){if(bt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,le,Ue,ie.width,ie.height,ie.depth),L)if(E.layerUpdates.size>0){let q=Pf(ie.width,ie.height,E.format,E.type);for(let J of E.layerUpdates){let fe=ie.data.subarray(J*q/ie.data.BYTES_PER_ELEMENT,(J+1)*q/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,J,ie.width,ie.height,1,xe,De,fe)}E.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,xe,De,ie.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ue,ie.width,ie.height,ie.depth,0,xe,De,ie.data);else if(E.isData3DTexture)Ge?(bt&&t.texStorage3D(s.TEXTURE_3D,le,Ue,ie.width,ie.height,ie.depth),L&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,xe,De,ie.data)):t.texImage3D(s.TEXTURE_3D,0,Ue,ie.width,ie.height,ie.depth,0,xe,De,ie.data);else if(E.isFramebufferTexture){if(bt)if(Ge)t.texStorage2D(s.TEXTURE_2D,le,Ue,ie.width,ie.height);else{let q=ie.width,J=ie.height;for(let fe=0;fe<le;fe++)t.texImage2D(s.TEXTURE_2D,fe,Ue,q,J,0,xe,De,null),q>>=1,J>>=1}}else if(st.length>0){if(Ge&&bt){let q=Re(st[0]);t.texStorage2D(s.TEXTURE_2D,le,Ue,q.width,q.height)}for(let q=0,J=st.length;q<J;q++)ye=st[q],Ge?L&&t.texSubImage2D(s.TEXTURE_2D,q,0,0,xe,De,ye):t.texImage2D(s.TEXTURE_2D,q,Ue,xe,De,ye);E.generateMipmaps=!1}else if(Ge){if(bt){let q=Re(ie);t.texStorage2D(s.TEXTURE_2D,le,Ue,q.width,q.height)}L&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,xe,De,ie)}else t.texImage2D(s.TEXTURE_2D,0,Ue,xe,De,ie);p(E)&&m(Z),Ee.__version=$.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function re(C,E,O){if(E.image.length!==6)return;let Z=ft(C,E),j=E.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+O);let $=n.get(j);if(j.version!==$.__version||Z===!0){t.activeTexture(s.TEXTURE0+O);let Ee=Ke.getPrimaries(Ke.workingColorSpace),he=E.colorSpace===Xi?null:Ke.getPrimaries(E.colorSpace),me=E.colorSpace===Xi||Ee===he?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let at=E.isCompressedTexture||E.image[0].isCompressedTexture,ie=E.image[0]&&E.image[0].isDataTexture,xe=[];for(let J=0;J<6;J++)!at&&!ie?xe[J]=x(E.image[J],!0,i.maxCubemapSize):xe[J]=ie?E.image[J].image:E.image[J],xe[J]=wt(E,xe[J]);let De=xe[0],Ue=r.convert(E.format,E.colorSpace),ye=r.convert(E.type),st=_(E.internalFormat,Ue,ye,E.colorSpace),Ge=E.isVideoTexture!==!0,bt=$.__version===void 0||Z===!0,L=j.dataReady,le=R(E,De);Xe(s.TEXTURE_CUBE_MAP,E);let q;if(at){Ge&&bt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,le,st,De.width,De.height);for(let J=0;J<6;J++){q=xe[J].mipmaps;for(let fe=0;fe<q.length;fe++){let ue=q[fe];E.format!==Un?Ue!==null?Ge?L&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,fe,0,0,ue.width,ue.height,Ue,ue.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,fe,st,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?L&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,fe,0,0,ue.width,ue.height,Ue,ye,ue.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,fe,st,ue.width,ue.height,0,Ue,ye,ue.data)}}}else{if(q=E.mipmaps,Ge&&bt){q.length>0&&le++;let J=Re(xe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,le,st,J.width,J.height)}for(let J=0;J<6;J++)if(ie){Ge?L&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,xe[J].width,xe[J].height,Ue,ye,xe[J].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,st,xe[J].width,xe[J].height,0,Ue,ye,xe[J].data);for(let fe=0;fe<q.length;fe++){let ke=q[fe].image[J].image;Ge?L&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,fe+1,0,0,ke.width,ke.height,Ue,ye,ke.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,fe+1,st,ke.width,ke.height,0,Ue,ye,ke.data)}}else{Ge?L&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ue,ye,xe[J]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,st,Ue,ye,xe[J]);for(let fe=0;fe<q.length;fe++){let ue=q[fe];Ge?L&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,fe+1,0,0,Ue,ye,ue.image[J]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,fe+1,st,Ue,ye,ue.image[J])}}}p(E)&&m(s.TEXTURE_CUBE_MAP),$.__version=j.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function be(C,E,O,Z,j,$){let Ee=r.convert(O.format,O.colorSpace),he=r.convert(O.type),me=_(O.internalFormat,Ee,he,O.colorSpace),at=n.get(E),ie=n.get(O);if(ie.__renderTarget=E,!at.__hasExternalTextures){let xe=Math.max(1,E.width>>$),De=Math.max(1,E.height>>$);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?t.texImage3D(j,$,me,xe,De,E.depth,0,Ee,he,null):t.texImage2D(j,$,me,xe,De,0,Ee,he,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),it(E)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Z,j,ie.__webglTexture,0,nt(E)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Z,j,ie.__webglTexture,$),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ce(C,E,O){if(s.bindRenderbuffer(s.RENDERBUFFER,C),E.depthBuffer){let Z=E.depthTexture,j=Z&&Z.isDepthTexture?Z.type:null,$=v(E.stencilBuffer,j),Ee=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,he=nt(E);it(E)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,he,$,E.width,E.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,he,$,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,$,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ee,s.RENDERBUFFER,C)}else{let Z=E.textures;for(let j=0;j<Z.length;j++){let $=Z[j],Ee=r.convert($.format,$.colorSpace),he=r.convert($.type),me=_($.internalFormat,Ee,he,$.colorSpace),at=nt(E);O&&it(E)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,at,me,E.width,E.height):it(E)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,at,me,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,me,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ne(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Z=n.get(E.depthTexture);Z.__renderTarget=E,(!Z.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),Y(E.depthTexture,0);let j=Z.__webglTexture,$=nt(E);if(E.depthTexture.format===cr)it(E)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0);else if(E.depthTexture.format===gr)it(E)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Oe(C){let E=n.get(C),O=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){let Z=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),Z){let j=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,Z.removeEventListener("dispose",j)};Z.addEventListener("dispose",j),E.__depthDisposeCallback=j}E.__boundDepthTexture=Z}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Ne(E.__webglFramebuffer,C)}else if(O){E.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[Z]),E.__webglDepthbuffer[Z]===void 0)E.__webglDepthbuffer[Z]=s.createRenderbuffer(),ce(E.__webglDepthbuffer[Z],C,!1);else{let j=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$=E.__webglDepthbuffer[Z];s.bindRenderbuffer(s.RENDERBUFFER,$),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,$)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),ce(E.__webglDepthbuffer,C,!1);else{let Z=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,j=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,j),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,j)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Qe(C,E,O){let Z=n.get(C);E!==void 0&&be(Z.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&Oe(C)}function Dt(C){let E=C.texture,O=n.get(C),Z=n.get(E);C.addEventListener("dispose",A);let j=C.textures,$=C.isWebGLCubeRenderTarget===!0,Ee=j.length>1;if(Ee||(Z.__webglTexture===void 0&&(Z.__webglTexture=s.createTexture()),Z.__version=E.version,o.memory.textures++),$){O.__webglFramebuffer=[];for(let he=0;he<6;he++)if(E.mipmaps&&E.mipmaps.length>0){O.__webglFramebuffer[he]=[];for(let me=0;me<E.mipmaps.length;me++)O.__webglFramebuffer[he][me]=s.createFramebuffer()}else O.__webglFramebuffer[he]=s.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){O.__webglFramebuffer=[];for(let he=0;he<E.mipmaps.length;he++)O.__webglFramebuffer[he]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(Ee)for(let he=0,me=j.length;he<me;he++){let at=n.get(j[he]);at.__webglTexture===void 0&&(at.__webglTexture=s.createTexture(),o.memory.textures++)}if(C.samples>0&&it(C)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let he=0;he<j.length;he++){let me=j[he];O.__webglColorRenderbuffer[he]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[he]);let at=r.convert(me.format,me.colorSpace),ie=r.convert(me.type),xe=_(me.internalFormat,at,ie,me.colorSpace,C.isXRRenderTarget===!0),De=nt(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,De,xe,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.RENDERBUFFER,O.__webglColorRenderbuffer[he])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),ce(O.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if($){t.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture),Xe(s.TEXTURE_CUBE_MAP,E);for(let he=0;he<6;he++)if(E.mipmaps&&E.mipmaps.length>0)for(let me=0;me<E.mipmaps.length;me++)be(O.__webglFramebuffer[he][me],C,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+he,me);else be(O.__webglFramebuffer[he],C,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);p(E)&&m(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let he=0,me=j.length;he<me;he++){let at=j[he],ie=n.get(at);t.bindTexture(s.TEXTURE_2D,ie.__webglTexture),Xe(s.TEXTURE_2D,at),be(O.__webglFramebuffer,C,at,s.COLOR_ATTACHMENT0+he,s.TEXTURE_2D,0),p(at)&&m(s.TEXTURE_2D)}t.unbindTexture()}else{let he=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(he=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(he,Z.__webglTexture),Xe(he,E),E.mipmaps&&E.mipmaps.length>0)for(let me=0;me<E.mipmaps.length;me++)be(O.__webglFramebuffer[me],C,E,s.COLOR_ATTACHMENT0,he,me);else be(O.__webglFramebuffer,C,E,s.COLOR_ATTACHMENT0,he,0);p(E)&&m(he),t.unbindTexture()}C.depthBuffer&&Oe(C)}function ot(C){let E=C.textures;for(let O=0,Z=E.length;O<Z;O++){let j=E[O];if(p(j)){let $=y(C),Ee=n.get(j).__webglTexture;t.bindTexture($,Ee),m($),t.unbindTexture()}}}let Bt=[],H=[];function Ln(C){if(C.samples>0){if(it(C)===!1){let E=C.textures,O=C.width,Z=C.height,j=s.COLOR_BUFFER_BIT,$=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ee=n.get(C),he=E.length>1;if(he)for(let me=0;me<E.length;me++)t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let me=0;me<E.length;me++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),he){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ee.__webglColorRenderbuffer[me]);let at=n.get(E[me]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,at,0)}s.blitFramebuffer(0,0,O,Z,0,0,O,Z,j,s.NEAREST),l===!0&&(Bt.length=0,H.length=0,Bt.push(s.COLOR_ATTACHMENT0+me),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Bt.push($),H.push($),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,H)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Bt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),he)for(let me=0;me<E.length;me++){t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,Ee.__webglColorRenderbuffer[me]);let at=n.get(E[me]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,at,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let E=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function nt(C){return Math.min(i.maxSamples,C.samples)}function it(C){let E=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ie(C){let E=o.render.frame;h.get(C)!==E&&(h.set(C,E),C.update())}function wt(C,E){let O=C.colorSpace,Z=C.format,j=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||O!==cn&&O!==Xi&&(Ke.getTransfer(O)===gt?(Z!==Un||j!==bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),E}function Re(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=U,this.setTexture2D=Y,this.setTexture2DArray=V,this.setTexture3D=ee,this.setTextureCube=X,this.rebindTextures=Qe,this.setupRenderTarget=Dt,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=Ln,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=be,this.useMultisampledRTT=it}function h_(s,e){function t(n,i=Xi){let r,o=Ke.getTransfer(i);if(n===bi)return s.UNSIGNED_BYTE;if(n===ru)return s.UNSIGNED_SHORT_4_4_4_4;if(n===ou)return s.UNSIGNED_SHORT_5_5_5_1;if(n===ap)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===rp)return s.BYTE;if(n===op)return s.SHORT;if(n===fo)return s.UNSIGNED_SHORT;if(n===su)return s.INT;if(n===Ms)return s.UNSIGNED_INT;if(n===Kn)return s.FLOAT;if(n===Jn)return s.HALF_FLOAT;if(n===lp)return s.ALPHA;if(n===cp)return s.RGB;if(n===Un)return s.RGBA;if(n===hp)return s.LUMINANCE;if(n===up)return s.LUMINANCE_ALPHA;if(n===cr)return s.DEPTH_COMPONENT;if(n===gr)return s.DEPTH_STENCIL;if(n===au)return s.RED;if(n===lu)return s.RED_INTEGER;if(n===dp)return s.RG;if(n===cu)return s.RG_INTEGER;if(n===hu)return s.RGBA_INTEGER;if(n===Ta||n===wa||n===Aa||n===Ra)if(o===gt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ta)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ta)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ra)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===kc||n===zc||n===Vc||n===Gc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===kc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===zc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Vc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Gc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wc||n===Xc||n===qc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Wc||n===Xc)return o===gt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===qc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Yc||n===$c||n===Kc||n===Zc||n===Jc||n===jc||n===Qc||n===eh||n===th||n===nh||n===ih||n===sh||n===rh||n===oh)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Yc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===$c)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Kc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Zc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Jc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===jc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Qc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===eh)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===th)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===nh)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ih)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===sh)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===rh)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===oh)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ca||n===ah||n===lh)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ca)return o===gt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ah)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===lh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===fp||n===ch||n===hh||n===uh)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ca)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ch)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===hh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===uh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===mr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var wh=class extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},qe=class extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},u_={type:"move"},lo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new S,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new S),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new S,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new S),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let x of e.hand.values()){let p=t.getJointPose(x,n),m=this._getHandJoint(c,x);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(u_)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new qe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},d_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,f_=`
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

}`,Ah=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let i=new zt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Mt({vertexShader:d_,fragmentShader:f_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ge(new an(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Rh=class extends Ei{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,x=new Ah,p=t.getContextAttributes(),m=null,y=null,_=[],v=[],R=new Q,w=null,A=new Ut;A.viewport=new rt;let P=new Ut;P.viewport=new rt;let b=[A,P],M=new wh,I=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let re=_[K];return re===void 0&&(re=new lo,_[K]=re),re.getTargetRaySpace()},this.getControllerGrip=function(K){let re=_[K];return re===void 0&&(re=new lo,_[K]=re),re.getGripSpace()},this.getHand=function(K){let re=_[K];return re===void 0&&(re=new lo,_[K]=re),re.getHandSpace()};function B(K){let re=v.indexOf(K.inputSource);if(re===-1)return;let be=_[re];be!==void 0&&(be.update(K.inputSource,K.frame,c||o),be.dispatchEvent({type:K.type,data:K.inputSource}))}function W(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",Y);for(let K=0;K<_.length;K++){let re=v[K];re!==null&&(v[K]=null,_[K].disconnect(re))}I=null,U=null,x.reset(),e.setRenderTarget(m),f=null,d=null,u=null,i=null,y=null,ft.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",W),i.addEventListener("inputsourceschange",Y),p.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(R),i.renderState.layers===void 0){let re={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,re),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Zt(f.framebufferWidth,f.framebufferHeight,{format:Un,type:bi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let re=null,be=null,ce=null;p.depth&&(ce=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=p.stencil?gr:cr,be=p.stencil?mr:Ms);let Ne={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Ne),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Zt(d.textureWidth,d.textureHeight,{format:Un,type:bi,depthTexture:new Fa(d.textureWidth,d.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ft.setContext(i),ft.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Y(K){for(let re=0;re<K.removed.length;re++){let be=K.removed[re],ce=v.indexOf(be);ce>=0&&(v[ce]=null,_[ce].disconnect(be))}for(let re=0;re<K.added.length;re++){let be=K.added[re],ce=v.indexOf(be);if(ce===-1){for(let Oe=0;Oe<_.length;Oe++)if(Oe>=v.length){v.push(be),ce=Oe;break}else if(v[Oe]===null){v[Oe]=be,ce=Oe;break}if(ce===-1)break}let Ne=_[ce];Ne&&Ne.connect(be)}}let V=new S,ee=new S;function X(K,re,be){V.setFromMatrixPosition(re.matrixWorld),ee.setFromMatrixPosition(be.matrixWorld);let ce=V.distanceTo(ee),Ne=re.projectionMatrix.elements,Oe=be.projectionMatrix.elements,Qe=Ne[14]/(Ne[10]-1),Dt=Ne[14]/(Ne[10]+1),ot=(Ne[9]+1)/Ne[5],Bt=(Ne[9]-1)/Ne[5],H=(Ne[8]-1)/Ne[0],Ln=(Oe[8]+1)/Oe[0],nt=Qe*H,it=Qe*Ln,Ie=ce/(-H+Ln),wt=Ie*-H;if(re.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(wt),K.translateZ(Ie),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ne[10]===-1)K.projectionMatrix.copy(re.projectionMatrix),K.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{let Re=Qe+Ie,C=Dt+Ie,E=nt-wt,O=it+(ce-wt),Z=ot*Dt/C*Re,j=Bt*Dt/C*Re;K.projectionMatrix.makePerspective(E,O,Z,j,Re,C),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function oe(K,re){re===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(re.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;let re=K.near,be=K.far;x.texture!==null&&(x.depthNear>0&&(re=x.depthNear),x.depthFar>0&&(be=x.depthFar)),M.near=P.near=A.near=re,M.far=P.far=A.far=be,(I!==M.near||U!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,U=M.far),A.layers.mask=K.layers.mask|2,P.layers.mask=K.layers.mask|4,M.layers.mask=A.layers.mask|P.layers.mask;let ce=K.parent,Ne=M.cameras;oe(M,ce);for(let Oe=0;Oe<Ne.length;Oe++)oe(Ne[Oe],ce);Ne.length===2?X(M,A,P):M.projectionMatrix.copy(A.projectionMatrix),pe(K,M,ce)};function pe(K,re,be){be===null?K.matrix.copy(re.matrixWorld):(K.matrix.copy(be.matrixWorld),K.matrix.invert(),K.matrix.multiply(re.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(re.projectionMatrix),K.projectionMatrixInverse.copy(re.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=vr*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let Te=null;function Xe(K,re){if(h=re.getViewerPose(c||o),g=re,h!==null){let be=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let ce=!1;be.length!==M.cameras.length&&(M.cameras.length=0,ce=!0);for(let Oe=0;Oe<be.length;Oe++){let Qe=be[Oe],Dt=null;if(f!==null)Dt=f.getViewport(Qe);else{let Bt=u.getViewSubImage(d,Qe);Dt=Bt.viewport,Oe===0&&(e.setRenderTargetTextures(y,Bt.colorTexture,d.ignoreDepthValues?void 0:Bt.depthStencilTexture),e.setRenderTarget(y))}let ot=b[Oe];ot===void 0&&(ot=new Ut,ot.layers.enable(Oe),ot.viewport=new rt,b[Oe]=ot),ot.matrix.fromArray(Qe.transform.matrix),ot.matrix.decompose(ot.position,ot.quaternion,ot.scale),ot.projectionMatrix.fromArray(Qe.projectionMatrix),ot.projectionMatrixInverse.copy(ot.projectionMatrix).invert(),ot.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),Oe===0&&(M.matrix.copy(ot.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ce===!0&&M.cameras.push(ot)}let Ne=i.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")){let Oe=u.getDepthInformation(be[0]);Oe&&Oe.isValid&&Oe.texture&&x.init(e,Oe,i.renderState)}}for(let be=0;be<_.length;be++){let ce=v[be],Ne=_[be];ce!==null&&Ne!==void 0&&Ne.update(ce,re,c||o)}Te&&Te(K,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),g=null}let ft=new _p;ft.setAnimationLoop(Xe),this.setAnimationLoop=function(K){Te=K},this.dispose=function(){}}},xs=new ni,p_=new Ce;function m_(s,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,vp(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,y,_,v){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,v)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),x(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,y,_):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===tn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===tn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let y=e.get(m),_=y.envMap,v=y.envMapRotation;_&&(p.envMap.value=_,xs.copy(v),xs.x*=-1,xs.y*=-1,xs.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(xs.y*=-1,xs.z*=-1),p.envMapRotation.value.setFromMatrix4(p_.makeRotationFromEuler(xs)),p.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,y,_){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=_*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===tn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function x(p,m){let y=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function g_(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,_){let v=_.program;n.uniformBlockBinding(y,v)}function c(y,_){let v=i[y.id];v===void 0&&(g(y),v=h(y),i[y.id]=v,y.addEventListener("dispose",p));let R=_.program;n.updateUBOMapping(y,R);let w=e.render.frame;r[y.id]!==w&&(d(y),r[y.id]=w)}function h(y){let _=u();y.__bindingPointIndex=_;let v=s.createBuffer(),R=y.__size,w=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,R,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,v),v}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let _=i[y.id],v=y.uniforms,R=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let w=0,A=v.length;w<A;w++){let P=Array.isArray(v[w])?v[w]:[v[w]];for(let b=0,M=P.length;b<M;b++){let I=P[b];if(f(I,w,b,R)===!0){let U=I.__offset,B=Array.isArray(I.value)?I.value:[I.value],W=0;for(let Y=0;Y<B.length;Y++){let V=B[Y],ee=x(V);typeof V=="number"||typeof V=="boolean"?(I.__data[0]=V,s.bufferSubData(s.UNIFORM_BUFFER,U+W,I.__data)):V.isMatrix3?(I.__data[0]=V.elements[0],I.__data[1]=V.elements[1],I.__data[2]=V.elements[2],I.__data[3]=0,I.__data[4]=V.elements[3],I.__data[5]=V.elements[4],I.__data[6]=V.elements[5],I.__data[7]=0,I.__data[8]=V.elements[6],I.__data[9]=V.elements[7],I.__data[10]=V.elements[8],I.__data[11]=0):(V.toArray(I.__data,W),W+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,U,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,_,v,R){let w=y.value,A=_+"_"+v;if(R[A]===void 0)return typeof w=="number"||typeof w=="boolean"?R[A]=w:R[A]=w.clone(),!0;{let P=R[A];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return R[A]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function g(y){let _=y.uniforms,v=0,R=16;for(let A=0,P=_.length;A<P;A++){let b=Array.isArray(_[A])?_[A]:[_[A]];for(let M=0,I=b.length;M<I;M++){let U=b[M],B=Array.isArray(U.value)?U.value:[U.value];for(let W=0,Y=B.length;W<Y;W++){let V=B[W],ee=x(V),X=v%R,oe=X%ee.boundary,pe=X+oe;v+=oe,pe!==0&&R-pe<ee.storage&&(v+=R-pe),U.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=ee.storage}}}let w=v%R;return w>0&&(v+=R-w),y.__size=v,y.__cache={},this}function x(y){let _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function p(y){let _=y.target;_.removeEventListener("dispose",p);let v=o.indexOf(_.__bindingPointIndex);o.splice(v,1),s.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function m(){for(let y in i)s.deleteBuffer(i[y]);o=[],i={},r={}}return{bind:l,update:c,dispose:m}}var Oa=class{constructor(e={}){let{canvas:t=M0(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),p=null,m=null,y=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=dt,this.toneMapping=Ki,this.toneMappingExposure=1;let v=this,R=!1,w=0,A=0,P=null,b=-1,M=null,I=new rt,U=new rt,B=null,W=new te(0),Y=0,V=t.width,ee=t.height,X=1,oe=null,pe=null,Te=new rt(0,0,V,ee),Xe=new rt(0,0,V,ee),ft=!1,K=new go,re=!1,be=!1,ce=new Ce,Ne=new Ce,Oe=new S,Qe=new rt,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ot=!1;function Bt(){return P===null?X:1}let H=n;function Ln(T,D){return t.getContext(T,D)}try{let T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Zh}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",fe,!1),t.addEventListener("webglcontextcreationerror",ue,!1),H===null){let D="webgl2";if(H=Ln(D,T),H===null)throw Ln(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let nt,it,Ie,wt,Re,C,E,O,Z,j,$,Ee,he,me,at,ie,xe,De,Ue,ye,st,Ge,bt,L;function le(){nt=new Ly(H),nt.init(),Ge=new h_(H,nt),it=new wy(H,nt,e,Ge),Ie=new a_(H,nt),it.reverseDepthBuffer&&d&&Ie.buffers.depth.setReversed(!0),wt=new Uy(H),Re=new $v,C=new c_(H,nt,Ie,Re,it,Ge,wt),E=new Ry(v),O=new Iy(v),Z=new V0(H),bt=new Sy(H,Z),j=new Dy(H,Z,wt,bt),$=new By(H,j,Z,wt),Ue=new Hy(H,it,C),ie=new Ay(Re),Ee=new Yv(v,E,O,nt,it,bt,ie),he=new m_(v,Re),me=new Zv,at=new n_(nt),De=new Ey(v,E,O,Ie,$,f,l),xe=new r_(v,$,it),L=new g_(H,wt,it,Ie),ye=new Ty(H,nt,wt),st=new Ny(H,nt,wt),wt.programs=Ee.programs,v.capabilities=it,v.extensions=nt,v.properties=Re,v.renderLists=me,v.shadowMap=xe,v.state=Ie,v.info=wt}le();let q=new Rh(v,H);this.xr=q,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let T=nt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=nt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(T){T!==void 0&&(X=T,this.setSize(V,ee,!1))},this.getSize=function(T){return T.set(V,ee)},this.setSize=function(T,D,k=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=T,ee=D,t.width=Math.floor(T*X),t.height=Math.floor(D*X),k===!0&&(t.style.width=T+"px",t.style.height=D+"px"),this.setViewport(0,0,T,D)},this.getDrawingBufferSize=function(T){return T.set(V*X,ee*X).floor()},this.setDrawingBufferSize=function(T,D,k){V=T,ee=D,X=k,t.width=Math.floor(T*k),t.height=Math.floor(D*k),this.setViewport(0,0,T,D)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(Te)},this.setViewport=function(T,D,k,z){T.isVector4?Te.set(T.x,T.y,T.z,T.w):Te.set(T,D,k,z),Ie.viewport(I.copy(Te).multiplyScalar(X).round())},this.getScissor=function(T){return T.copy(Xe)},this.setScissor=function(T,D,k,z){T.isVector4?Xe.set(T.x,T.y,T.z,T.w):Xe.set(T,D,k,z),Ie.scissor(U.copy(Xe).multiplyScalar(X).round())},this.getScissorTest=function(){return ft},this.setScissorTest=function(T){Ie.setScissorTest(ft=T)},this.setOpaqueSort=function(T){oe=T},this.setTransparentSort=function(T){pe=T},this.getClearColor=function(T){return T.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor.apply(De,arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha.apply(De,arguments)},this.clear=function(T=!0,D=!0,k=!0){let z=0;if(T){let N=!1;if(P!==null){let se=P.texture.format;N=se===hu||se===cu||se===lu}if(N){let se=P.texture.type,de=se===bi||se===Ms||se===fo||se===mr||se===ru||se===ou,ve=De.getClearColor(),_e=De.getClearAlpha(),He=ve.r,ze=ve.g,Me=ve.b;de?(g[0]=He,g[1]=ze,g[2]=Me,g[3]=_e,H.clearBufferuiv(H.COLOR,0,g)):(x[0]=He,x[1]=ze,x[2]=Me,x[3]=_e,H.clearBufferiv(H.COLOR,0,x))}else z|=H.COLOR_BUFFER_BIT}D&&(z|=H.DEPTH_BUFFER_BIT),k&&(z|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",fe,!1),t.removeEventListener("webglcontextcreationerror",ue,!1),me.dispose(),at.dispose(),Re.dispose(),E.dispose(),O.dispose(),$.dispose(),bt.dispose(),L.dispose(),Ee.dispose(),q.dispose(),q.removeEventListener("sessionstart",Td),q.removeEventListener("sessionend",wd),us.stop()};function J(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function fe(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let T=wt.autoReset,D=xe.enabled,k=xe.autoUpdate,z=xe.needsUpdate,N=xe.type;le(),wt.autoReset=T,xe.enabled=D,xe.autoUpdate=k,xe.needsUpdate=z,xe.type=N}function ue(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ke(T){let D=T.target;D.removeEventListener("dispose",ke),Nt(D)}function Nt(T){jt(T),Re.remove(T)}function jt(T){let D=Re.get(T).programs;D!==void 0&&(D.forEach(function(k){Ee.releaseProgram(k)}),T.isShaderMaterial&&Ee.releaseShaderCache(T))}this.renderBufferDirect=function(T,D,k,z,N,se){D===null&&(D=Dt);let de=N.isMesh&&N.matrixWorld.determinant()<0,ve=gm(T,D,k,z,N);Ie.setMaterial(z,de);let _e=k.index,He=1;if(z.wireframe===!0){if(_e=j.getWireframeAttribute(k),_e===void 0)return;He=2}let ze=k.drawRange,Me=k.attributes.position,ht=ze.start*He,Et=(ze.start+ze.count)*He;se!==null&&(ht=Math.max(ht,se.start*He),Et=Math.min(Et,(se.start+se.count)*He)),_e!==null?(ht=Math.max(ht,0),Et=Math.min(Et,_e.count)):Me!=null&&(ht=Math.max(ht,0),Et=Math.min(Et,Me.count));let At=Et-ht;if(At<0||At===1/0)return;bt.setup(N,z,ve,k,_e);let vn,pt=ye;if(_e!==null&&(vn=Z.get(_e),pt=st,pt.setIndex(vn)),N.isMesh)z.wireframe===!0?(Ie.setLineWidth(z.wireframeLinewidth*Bt()),pt.setMode(H.LINES)):pt.setMode(H.TRIANGLES);else if(N.isLine){let Se=z.linewidth;Se===void 0&&(Se=1),Ie.setLineWidth(Se*Bt()),N.isLineSegments?pt.setMode(H.LINES):N.isLineLoop?pt.setMode(H.LINE_LOOP):pt.setMode(H.LINE_STRIP)}else N.isPoints?pt.setMode(H.POINTS):N.isSprite&&pt.setMode(H.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)pt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))pt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{let Se=N._multiDrawStarts,di=N._multiDrawCounts,mt=N._multiDrawCount,Vn=_e?Z.get(_e).bytesPerElement:1,Os=Re.get(z).currentProgram.getUniforms();for(let Tn=0;Tn<mt;Tn++)Os.setValue(H,"_gl_DrawID",Tn),pt.render(Se[Tn]/Vn,di[Tn])}else if(N.isInstancedMesh)pt.renderInstances(ht,At,N.count);else if(k.isInstancedBufferGeometry){let Se=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,di=Math.min(k.instanceCount,Se);pt.renderInstances(ht,At,di)}else pt.render(ht,At)};function xt(T,D,k){T.transparent===!0&&T.side===Ct&&T.forceSinglePass===!1?(T.side=tn,T.needsUpdate=!0,qo(T,D,k),T.side=Mn,T.needsUpdate=!0,qo(T,D,k),T.side=Ct):qo(T,D,k)}this.compile=function(T,D,k=null){k===null&&(k=T),m=at.get(k),m.init(D),_.push(m),k.traverseVisible(function(N){N.isLight&&N.layers.test(D.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),T!==k&&T.traverseVisible(function(N){N.isLight&&N.layers.test(D.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),m.setupLights();let z=new Set;return T.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;let se=N.material;if(se)if(Array.isArray(se))for(let de=0;de<se.length;de++){let ve=se[de];xt(ve,k,N),z.add(ve)}else xt(se,k,N),z.add(se)}),_.pop(),m=null,z},this.compileAsync=function(T,D,k=null){let z=this.compile(T,D,k);return new Promise(N=>{function se(){if(z.forEach(function(de){Re.get(de).currentProgram.isReady()&&z.delete(de)}),z.size===0){N(T);return}setTimeout(se,10)}nt.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let zn=null;function ui(T){zn&&zn(T)}function Td(){us.stop()}function wd(){us.start()}let us=new _p;us.setAnimationLoop(ui),typeof self<"u"&&us.setContext(self),this.setAnimationLoop=function(T){zn=T,q.setAnimationLoop(T),T===null?us.stop():us.start()},q.addEventListener("sessionstart",Td),q.addEventListener("sessionend",wd),this.render=function(T,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(D),D=q.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,D,P),m=at.get(T,_.length),m.init(D),_.push(m),Ne.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),K.setFromProjectionMatrix(Ne),be=this.localClippingEnabled,re=ie.init(this.clippingPlanes,be),p=me.get(T,y.length),p.init(),y.push(p),q.enabled===!0&&q.isPresenting===!0){let se=v.xr.getDepthSensingMesh();se!==null&&ql(se,D,-1/0,v.sortObjects)}ql(T,D,0,v.sortObjects),p.finish(),v.sortObjects===!0&&p.sort(oe,pe),ot=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,ot&&De.addToRenderList(p,T),this.info.render.frame++,re===!0&&ie.beginShadows();let k=m.state.shadowsArray;xe.render(k,T,D),re===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();let z=p.opaque,N=p.transmissive;if(m.setupLights(),D.isArrayCamera){let se=D.cameras;if(N.length>0)for(let de=0,ve=se.length;de<ve;de++){let _e=se[de];Rd(z,N,T,_e)}ot&&De.render(T);for(let de=0,ve=se.length;de<ve;de++){let _e=se[de];Ad(p,T,_e,_e.viewport)}}else N.length>0&&Rd(z,N,T,D),ot&&De.render(T),Ad(p,T,D);P!==null&&(C.updateMultisampleRenderTarget(P),C.updateRenderTargetMipmap(P)),T.isScene===!0&&T.onAfterRender(v,T,D),bt.resetDefaultState(),b=-1,M=null,_.pop(),_.length>0?(m=_[_.length-1],re===!0&&ie.setGlobalState(v.clippingPlanes,m.state.camera)):m=null,y.pop(),y.length>0?p=y[y.length-1]:p=null};function ql(T,D,k,z){if(T.visible===!1)return;if(T.layers.test(D.layers)){if(T.isGroup)k=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(D);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||K.intersectsSprite(T)){z&&Qe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ne);let de=$.update(T),ve=T.material;ve.visible&&p.push(T,de,ve,k,Qe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||K.intersectsObject(T))){let de=$.update(T),ve=T.material;if(z&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Qe.copy(T.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),Qe.copy(de.boundingSphere.center)),Qe.applyMatrix4(T.matrixWorld).applyMatrix4(Ne)),Array.isArray(ve)){let _e=de.groups;for(let He=0,ze=_e.length;He<ze;He++){let Me=_e[He],ht=ve[Me.materialIndex];ht&&ht.visible&&p.push(T,de,ht,k,Qe.z,Me)}}else ve.visible&&p.push(T,de,ve,k,Qe.z,null)}}let se=T.children;for(let de=0,ve=se.length;de<ve;de++)ql(se[de],D,k,z)}function Ad(T,D,k,z){let N=T.opaque,se=T.transmissive,de=T.transparent;m.setupLightsView(k),re===!0&&ie.setGlobalState(v.clippingPlanes,k),z&&Ie.viewport(I.copy(z)),N.length>0&&Xo(N,D,k),se.length>0&&Xo(se,D,k),de.length>0&&Xo(de,D,k),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function Rd(T,D,k,z){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[z.id]===void 0&&(m.state.transmissionRenderTarget[z.id]=new Zt(1,1,{generateMipmaps:!0,type:nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float")?Jn:bi,minFilter:ei,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));let se=m.state.transmissionRenderTarget[z.id],de=z.viewport||I;se.setSize(de.z,de.w);let ve=v.getRenderTarget();v.setRenderTarget(se),v.getClearColor(W),Y=v.getClearAlpha(),Y<1&&v.setClearColor(16777215,.5),v.clear(),ot&&De.render(k);let _e=v.toneMapping;v.toneMapping=Ki;let He=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),m.setupLightsView(z),re===!0&&ie.setGlobalState(v.clippingPlanes,z),Xo(T,k,z),C.updateMultisampleRenderTarget(se),C.updateRenderTargetMipmap(se),nt.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let Me=0,ht=D.length;Me<ht;Me++){let Et=D[Me],At=Et.object,vn=Et.geometry,pt=Et.material,Se=Et.group;if(pt.side===Ct&&At.layers.test(z.layers)){let di=pt.side;pt.side=tn,pt.needsUpdate=!0,Cd(At,k,z,vn,pt,Se),pt.side=di,pt.needsUpdate=!0,ze=!0}}ze===!0&&(C.updateMultisampleRenderTarget(se),C.updateRenderTargetMipmap(se))}v.setRenderTarget(ve),v.setClearColor(W,Y),He!==void 0&&(z.viewport=He),v.toneMapping=_e}function Xo(T,D,k){let z=D.isScene===!0?D.overrideMaterial:null;for(let N=0,se=T.length;N<se;N++){let de=T[N],ve=de.object,_e=de.geometry,He=z===null?de.material:z,ze=de.group;ve.layers.test(k.layers)&&Cd(ve,D,k,_e,He,ze)}}function Cd(T,D,k,z,N,se){T.onBeforeRender(v,D,k,z,N,se),T.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),N.onBeforeRender(v,D,k,z,T,se),N.transparent===!0&&N.side===Ct&&N.forceSinglePass===!1?(N.side=tn,N.needsUpdate=!0,v.renderBufferDirect(k,D,z,N,T,se),N.side=Mn,N.needsUpdate=!0,v.renderBufferDirect(k,D,z,N,T,se),N.side=Ct):v.renderBufferDirect(k,D,z,N,T,se),T.onAfterRender(v,D,k,z,N,se)}function qo(T,D,k){D.isScene!==!0&&(D=Dt);let z=Re.get(T),N=m.state.lights,se=m.state.shadowsArray,de=N.state.version,ve=Ee.getParameters(T,N.state,se,D,k),_e=Ee.getProgramCacheKey(ve),He=z.programs;z.environment=T.isMeshStandardMaterial?D.environment:null,z.fog=D.fog,z.envMap=(T.isMeshStandardMaterial?O:E).get(T.envMap||z.environment),z.envMapRotation=z.environment!==null&&T.envMap===null?D.environmentRotation:T.envMapRotation,He===void 0&&(T.addEventListener("dispose",ke),He=new Map,z.programs=He);let ze=He.get(_e);if(ze!==void 0){if(z.currentProgram===ze&&z.lightsStateVersion===de)return Id(T,ve),ze}else ve.uniforms=Ee.getUniforms(T),T.onBeforeCompile(ve,v),ze=Ee.acquireProgram(ve,_e),He.set(_e,ze),z.uniforms=ve.uniforms;let Me=z.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Me.clippingPlanes=ie.uniform),Id(T,ve),z.needsLights=ym(T),z.lightsStateVersion=de,z.needsLights&&(Me.ambientLightColor.value=N.state.ambient,Me.lightProbe.value=N.state.probe,Me.directionalLights.value=N.state.directional,Me.directionalLightShadows.value=N.state.directionalShadow,Me.spotLights.value=N.state.spot,Me.spotLightShadows.value=N.state.spotShadow,Me.rectAreaLights.value=N.state.rectArea,Me.ltc_1.value=N.state.rectAreaLTC1,Me.ltc_2.value=N.state.rectAreaLTC2,Me.pointLights.value=N.state.point,Me.pointLightShadows.value=N.state.pointShadow,Me.hemisphereLights.value=N.state.hemi,Me.directionalShadowMap.value=N.state.directionalShadowMap,Me.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Me.spotShadowMap.value=N.state.spotShadowMap,Me.spotLightMatrix.value=N.state.spotLightMatrix,Me.spotLightMap.value=N.state.spotLightMap,Me.pointShadowMap.value=N.state.pointShadowMap,Me.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=ze,z.uniformsList=null,ze}function Pd(T){if(T.uniformsList===null){let D=T.currentProgram.getUniforms();T.uniformsList=ur.seqWithValue(D.seq,T.uniforms)}return T.uniformsList}function Id(T,D){let k=Re.get(T);k.outputColorSpace=D.outputColorSpace,k.batching=D.batching,k.batchingColor=D.batchingColor,k.instancing=D.instancing,k.instancingColor=D.instancingColor,k.instancingMorph=D.instancingMorph,k.skinning=D.skinning,k.morphTargets=D.morphTargets,k.morphNormals=D.morphNormals,k.morphColors=D.morphColors,k.morphTargetsCount=D.morphTargetsCount,k.numClippingPlanes=D.numClippingPlanes,k.numIntersection=D.numClipIntersection,k.vertexAlphas=D.vertexAlphas,k.vertexTangents=D.vertexTangents,k.toneMapping=D.toneMapping}function gm(T,D,k,z,N){D.isScene!==!0&&(D=Dt),C.resetTextureUnits();let se=D.fog,de=z.isMeshStandardMaterial?D.environment:null,ve=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:cn,_e=(z.isMeshStandardMaterial?O:E).get(z.envMap||de),He=z.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,ze=!!k.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Me=!!k.morphAttributes.position,ht=!!k.morphAttributes.normal,Et=!!k.morphAttributes.color,At=Ki;z.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(At=v.toneMapping);let vn=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,pt=vn!==void 0?vn.length:0,Se=Re.get(z),di=m.state.lights;if(re===!0&&(be===!0||T!==M)){let Dn=T===M&&z.id===b;ie.setState(z,T,Dn)}let mt=!1;z.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==di.state.version||Se.outputColorSpace!==ve||N.isBatchedMesh&&Se.batching===!1||!N.isBatchedMesh&&Se.batching===!0||N.isBatchedMesh&&Se.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Se.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Se.instancing===!1||!N.isInstancedMesh&&Se.instancing===!0||N.isSkinnedMesh&&Se.skinning===!1||!N.isSkinnedMesh&&Se.skinning===!0||N.isInstancedMesh&&Se.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Se.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Se.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Se.instancingMorph===!1&&N.morphTexture!==null||Se.envMap!==_e||z.fog===!0&&Se.fog!==se||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==ie.numPlanes||Se.numIntersection!==ie.numIntersection)||Se.vertexAlphas!==He||Se.vertexTangents!==ze||Se.morphTargets!==Me||Se.morphNormals!==ht||Se.morphColors!==Et||Se.toneMapping!==At||Se.morphTargetsCount!==pt)&&(mt=!0):(mt=!0,Se.__version=z.version);let Vn=Se.currentProgram;mt===!0&&(Vn=qo(z,D,N));let Os=!1,Tn=!1,Wr=!1,Rt=Vn.getUniforms(),jn=Se.uniforms;if(Ie.useProgram(Vn.program)&&(Os=!0,Tn=!0,Wr=!0),z.id!==b&&(b=z.id,Tn=!0),Os||M!==T){Ie.buffers.depth.getReversed()?(ce.copy(T.projectionMatrix),E0(ce),S0(ce),Rt.setValue(H,"projectionMatrix",ce)):Rt.setValue(H,"projectionMatrix",T.projectionMatrix),Rt.setValue(H,"viewMatrix",T.matrixWorldInverse);let Bi=Rt.map.cameraPosition;Bi!==void 0&&Bi.setValue(H,Oe.setFromMatrixPosition(T.matrixWorld)),it.logarithmicDepthBuffer&&Rt.setValue(H,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Rt.setValue(H,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Tn=!0,Wr=!0)}if(N.isSkinnedMesh){Rt.setOptional(H,N,"bindMatrix"),Rt.setOptional(H,N,"bindMatrixInverse");let Dn=N.skeleton;Dn&&(Dn.boneTexture===null&&Dn.computeBoneTexture(),Rt.setValue(H,"boneTexture",Dn.boneTexture,C))}N.isBatchedMesh&&(Rt.setOptional(H,N,"batchingTexture"),Rt.setValue(H,"batchingTexture",N._matricesTexture,C),Rt.setOptional(H,N,"batchingIdTexture"),Rt.setValue(H,"batchingIdTexture",N._indirectTexture,C),Rt.setOptional(H,N,"batchingColorTexture"),N._colorsTexture!==null&&Rt.setValue(H,"batchingColorTexture",N._colorsTexture,C));let Xr=k.morphAttributes;if((Xr.position!==void 0||Xr.normal!==void 0||Xr.color!==void 0)&&Ue.update(N,k,Vn),(Tn||Se.receiveShadow!==N.receiveShadow)&&(Se.receiveShadow=N.receiveShadow,Rt.setValue(H,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(jn.envMap.value=_e,jn.flipEnvMap.value=_e.isCubeTexture&&_e.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&D.environment!==null&&(jn.envMapIntensity.value=D.environmentIntensity),Tn&&(Rt.setValue(H,"toneMappingExposure",v.toneMappingExposure),Se.needsLights&&xm(jn,Wr),se&&z.fog===!0&&he.refreshFogUniforms(jn,se),he.refreshMaterialUniforms(jn,z,X,ee,m.state.transmissionRenderTarget[T.id]),ur.upload(H,Pd(Se),jn,C)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(ur.upload(H,Pd(Se),jn,C),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Rt.setValue(H,"center",N.center),Rt.setValue(H,"modelViewMatrix",N.modelViewMatrix),Rt.setValue(H,"normalMatrix",N.normalMatrix),Rt.setValue(H,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let Dn=z.uniformsGroups;for(let Bi=0,Fi=Dn.length;Bi<Fi;Bi++){let Ld=Dn[Bi];L.update(Ld,Vn),L.bind(Ld,Vn)}}return Vn}function xm(T,D){T.ambientLightColor.needsUpdate=D,T.lightProbe.needsUpdate=D,T.directionalLights.needsUpdate=D,T.directionalLightShadows.needsUpdate=D,T.pointLights.needsUpdate=D,T.pointLightShadows.needsUpdate=D,T.spotLights.needsUpdate=D,T.spotLightShadows.needsUpdate=D,T.rectAreaLights.needsUpdate=D,T.hemisphereLights.needsUpdate=D}function ym(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(T,D,k){Re.get(T.texture).__webglTexture=D,Re.get(T.depthTexture).__webglTexture=k;let z=Re.get(T);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=k===void 0,z.__autoAllocateDepthBuffer||nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,D){let k=Re.get(T);k.__webglFramebuffer=D,k.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(T,D=0,k=0){P=T,w=D,A=k;let z=!0,N=null,se=!1,de=!1;if(T){let _e=Re.get(T);if(_e.__useDefaultFramebuffer!==void 0)Ie.bindFramebuffer(H.FRAMEBUFFER,null),z=!1;else if(_e.__webglFramebuffer===void 0)C.setupRenderTarget(T);else if(_e.__hasExternalTextures)C.rebindTextures(T,Re.get(T.texture).__webglTexture,Re.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Me=T.depthTexture;if(_e.__boundDepthTexture!==Me){if(Me!==null&&Re.has(Me)&&(T.width!==Me.image.width||T.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(T)}}let He=T.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(de=!0);let ze=Re.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ze[D])?N=ze[D][k]:N=ze[D],se=!0):T.samples>0&&C.useMultisampledRTT(T)===!1?N=Re.get(T).__webglMultisampledFramebuffer:Array.isArray(ze)?N=ze[k]:N=ze,I.copy(T.viewport),U.copy(T.scissor),B=T.scissorTest}else I.copy(Te).multiplyScalar(X).floor(),U.copy(Xe).multiplyScalar(X).floor(),B=ft;if(Ie.bindFramebuffer(H.FRAMEBUFFER,N)&&z&&Ie.drawBuffers(T,N),Ie.viewport(I),Ie.scissor(U),Ie.setScissorTest(B),se){let _e=Re.get(T.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+D,_e.__webglTexture,k)}else if(de){let _e=Re.get(T.texture),He=D||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,_e.__webglTexture,k||0,He)}b=-1},this.readRenderTargetPixels=function(T,D,k,z,N,se,de){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=Re.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&de!==void 0&&(ve=ve[de]),ve){Ie.bindFramebuffer(H.FRAMEBUFFER,ve);try{let _e=T.texture,He=_e.format,ze=_e.type;if(!it.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!it.textureTypeReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=T.width-z&&k>=0&&k<=T.height-N&&H.readPixels(D,k,z,N,Ge.convert(He),Ge.convert(ze),se)}finally{let _e=P!==null?Re.get(P).__webglFramebuffer:null;Ie.bindFramebuffer(H.FRAMEBUFFER,_e)}}},this.readRenderTargetPixelsAsync=async function(T,D,k,z,N,se,de){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=Re.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&de!==void 0&&(ve=ve[de]),ve){let _e=T.texture,He=_e.format,ze=_e.type;if(!it.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!it.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=T.width-z&&k>=0&&k<=T.height-N){Ie.bindFramebuffer(H.FRAMEBUFFER,ve);let Me=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,Me),H.bufferData(H.PIXEL_PACK_BUFFER,se.byteLength,H.STREAM_READ),H.readPixels(D,k,z,N,Ge.convert(He),Ge.convert(ze),0);let ht=P!==null?Re.get(P).__webglFramebuffer:null;Ie.bindFramebuffer(H.FRAMEBUFFER,ht);let Et=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await b0(H,Et,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,Me),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,se),H.deleteBuffer(Me),H.deleteSync(Et),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,D=null,k=0){T.isTexture!==!0&&(io("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,T=arguments[1]);let z=Math.pow(2,-k),N=Math.floor(T.image.width*z),se=Math.floor(T.image.height*z),de=D!==null?D.x:0,ve=D!==null?D.y:0;C.setTexture2D(T,0),H.copyTexSubImage2D(H.TEXTURE_2D,k,0,0,de,ve,N,se),Ie.unbindTexture()},this.copyTextureToTexture=function(T,D,k=null,z=null,N=0){T.isTexture!==!0&&(io("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,T=arguments[1],D=arguments[2],N=arguments[3]||0,k=null);let se,de,ve,_e,He,ze,Me,ht,Et,At=T.isCompressedTexture?T.mipmaps[N]:T.image;k!==null?(se=k.max.x-k.min.x,de=k.max.y-k.min.y,ve=k.isBox3?k.max.z-k.min.z:1,_e=k.min.x,He=k.min.y,ze=k.isBox3?k.min.z:0):(se=At.width,de=At.height,ve=At.depth||1,_e=0,He=0,ze=0),z!==null?(Me=z.x,ht=z.y,Et=z.z):(Me=0,ht=0,Et=0);let vn=Ge.convert(D.format),pt=Ge.convert(D.type),Se;D.isData3DTexture?(C.setTexture3D(D,0),Se=H.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(C.setTexture2DArray(D,0),Se=H.TEXTURE_2D_ARRAY):(C.setTexture2D(D,0),Se=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,D.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,D.unpackAlignment);let di=H.getParameter(H.UNPACK_ROW_LENGTH),mt=H.getParameter(H.UNPACK_IMAGE_HEIGHT),Vn=H.getParameter(H.UNPACK_SKIP_PIXELS),Os=H.getParameter(H.UNPACK_SKIP_ROWS),Tn=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,At.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,At.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,_e),H.pixelStorei(H.UNPACK_SKIP_ROWS,He),H.pixelStorei(H.UNPACK_SKIP_IMAGES,ze);let Wr=T.isDataArrayTexture||T.isData3DTexture,Rt=D.isDataArrayTexture||D.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){let jn=Re.get(T),Xr=Re.get(D),Dn=Re.get(jn.__renderTarget),Bi=Re.get(Xr.__renderTarget);Ie.bindFramebuffer(H.READ_FRAMEBUFFER,Dn.__webglFramebuffer),Ie.bindFramebuffer(H.DRAW_FRAMEBUFFER,Bi.__webglFramebuffer);for(let Fi=0;Fi<ve;Fi++)Wr&&H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Re.get(T).__webglTexture,N,ze+Fi),T.isDepthTexture?(Rt&&H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Re.get(D).__webglTexture,N,Et+Fi),H.blitFramebuffer(_e,He,se,de,Me,ht,se,de,H.DEPTH_BUFFER_BIT,H.NEAREST)):Rt?H.copyTexSubImage3D(Se,N,Me,ht,Et+Fi,_e,He,se,de):H.copyTexSubImage2D(Se,N,Me,ht,Et+Fi,_e,He,se,de);Ie.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else Rt?T.isDataTexture||T.isData3DTexture?H.texSubImage3D(Se,N,Me,ht,Et,se,de,ve,vn,pt,At.data):D.isCompressedArrayTexture?H.compressedTexSubImage3D(Se,N,Me,ht,Et,se,de,ve,vn,At.data):H.texSubImage3D(Se,N,Me,ht,Et,se,de,ve,vn,pt,At):T.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,N,Me,ht,se,de,vn,pt,At.data):T.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,N,Me,ht,At.width,At.height,vn,At.data):H.texSubImage2D(H.TEXTURE_2D,N,Me,ht,se,de,vn,pt,At);H.pixelStorei(H.UNPACK_ROW_LENGTH,di),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,mt),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Vn),H.pixelStorei(H.UNPACK_SKIP_ROWS,Os),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Tn),N===0&&D.generateMipmaps&&H.generateMipmap(Se),Ie.unbindTexture()},this.copyTextureToTexture3D=function(T,D,k=null,z=null,N=0){return T.isTexture!==!0&&(io("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,z=arguments[1]||null,T=arguments[2],D=arguments[3],N=arguments[4]||0),io('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,D,k,z,N)},this.initRenderTarget=function(T){Re.get(T).__webglFramebuffer===void 0&&C.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?C.setTextureCube(T,0):T.isData3DTexture?C.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?C.setTexture2DArray(T,0):C.setTexture2D(T,0),Ie.unbindTexture()},this.resetState=function(){w=0,A=0,P=null,Ie.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}};var ka=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new te(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},br=class extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Er=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=dh,this.updateRanges=[],this.version=0,this.uuid=Zn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},mn=new S,Es=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix4(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyNormalMatrix(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.transformDirection(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array),r=yt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new lt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ii=class extends bn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new te(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},er,Zr=new S,tr=new S,nr=new S,ir=new Q,Jr=new Q,Tp=new Ce,fa=new S,jr=new S,pa=new S,If=new Q,_c=new Q,Lf=new Q,Si=class extends Ze{constructor(e=new ii){if(super(),this.isSprite=!0,this.type="Sprite",er===void 0){er=new et;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Er(t,5);er.setIndex([0,1,2,0,2,3]),er.setAttribute("position",new Es(n,3,0,!1)),er.setAttribute("uv",new Es(n,2,3,!1))}this.geometry=er,this.material=e,this.center=new Q(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),tr.setFromMatrixScale(this.matrixWorld),Tp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),nr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&tr.multiplyScalar(-nr.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;ma(fa.set(-.5,-.5,0),nr,o,tr,i,r),ma(jr.set(.5,-.5,0),nr,o,tr,i,r),ma(pa.set(.5,.5,0),nr,o,tr,i,r),If.set(0,0),_c.set(1,0),Lf.set(1,1);let a=e.ray.intersectTriangle(fa,jr,pa,!1,Zr);if(a===null&&(ma(jr.set(-.5,.5,0),nr,o,tr,i,r),_c.set(0,1),a=e.ray.intersectTriangle(fa,pa,jr,!1,Zr),a===null))return;let l=e.ray.origin.distanceTo(Zr);l<e.near||l>e.far||t.push({distance:l,point:Zr.clone(),uv:qi.getInterpolation(Zr,fa,jr,pa,If,_c,Lf,new Q),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ma(s,e,t,n,i,r){ir.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Jr.x=r*ir.x-i*ir.y,Jr.y=i*ir.x+r*ir.y):Jr.copy(ir),s.copy(e),s.x+=Jr.x,s.y+=Jr.y,s.applyMatrix4(Tp)}var ga=new S,Df=new S,za=class extends Ze{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);let t=e.levels;for(let n=0,i=t.length;n<i;n++){let r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);let i=this.levels,r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){let t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){let i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){let t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){ga.setFromMatrixPosition(this.matrixWorld);let i=e.ray.origin.distanceTo(ga);this.getObjectForDistance(i).raycast(e,t)}}update(e){let t=this.levels;if(t.length>1){ga.setFromMatrixPosition(e.matrixWorld),Df.setFromMatrixPosition(this.matrixWorld);let n=ga.distanceTo(Df)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let o=t[i].distance;if(t[i].object.visible&&(o-=o*t[i].hysteresis),n>=o)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){let t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];let n=this.levels;for(let i=0,r=n.length;i<r;i++){let o=n[i];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}},Nf=new S,Uf=new rt,Hf=new rt,x_=new S,Bf=new Ce,xa=new S,Mc=new Rn,Ff=new Ce,bc=new bs,Va=class extends ge{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Hd,this.bindMatrix=new Ce,this.bindMatrixInverse=new Ce,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new on),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,xa),this.boundingBox.expandByPoint(xa)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Rn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,xa),this.boundingSphere.expandByPoint(xa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mc.copy(this.boundingSphere),Mc.applyMatrix4(i),e.ray.intersectsSphere(Mc)!==!1&&(Ff.copy(i).invert(),bc.copy(e.ray).applyMatrix4(Ff),!(this.boundingBox!==null&&bc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,bc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new rt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Hd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Wm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Uf.fromBufferAttribute(i.attributes.skinIndex,e),Hf.fromBufferAttribute(i.attributes.skinWeight,e),Nf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Hf.getComponent(r);if(o!==0){let a=Uf.getComponent(r);Bf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(x_.copy(Nf).applyMatrix4(Bf),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},xo=class extends Ze{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ga=class extends zt{constructor(e=null,t=1,n=1,i,r,o,a,l,c=nn,h=nn,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Of=new Ce,y_=new Ce,Wa=class s{constructor(e=[],t=[]){this.uuid=Zn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ce)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ce;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:y_;Of.multiplyMatrices(a,t[r]),Of.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ga(t,e,e,Un,Kn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new xo),this.bones.push(o),this.boneInverses.push(new Ce().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},si=class extends lt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},sr=new Ce,kf=new Ce,ya=[],zf=new on,v_=new Ce,Qr=new ge,eo=new Rn,Yt=class extends ge{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new si(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,v_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new on),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,sr),zf.copy(e.boundingBox).applyMatrix4(sr),this.boundingBox.union(zf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Rn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,sr),eo.copy(e.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(eo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Qr.geometry=this.geometry,Qr.material=this.material,Qr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),eo.copy(this.boundingSphere),eo.applyMatrix4(n),e.ray.intersectsSphere(eo)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,sr),kf.multiplyMatrices(n,sr),Qr.matrixWorld=kf,Qr.raycast(e,ya);for(let o=0,a=ya.length;o<a;o++){let l=ya[o];l.instanceId=r,l.object=this,t.push(l)}ya.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new si(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ga(new Float32Array(i*this.count),i,this.count,au,Kn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var yo=class extends bn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Xa=new S,qa=new S,Vf=new Ce,to=new bs,va=new Rn,Ec=new S,Gf=new S,Sr=class extends Ze{constructor(e=new et,t=new yo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Xa.fromBufferAttribute(t,i-1),qa.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Xa.distanceTo(qa);e.setAttribute("lineDistance",new we(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),va.copy(n.boundingSphere),va.applyMatrix4(i),va.radius+=r,e.ray.intersectsSphere(va)===!1)return;Vf.copy(i).invert(),to.copy(e.ray).applyMatrix4(Vf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=f,p=g-1;x<p;x+=c){let m=h.getX(x),y=h.getX(x+1),_=_a(this,e,to,l,m,y);_&&t.push(_)}if(this.isLineLoop){let x=h.getX(g-1),p=h.getX(f),m=_a(this,e,to,l,x,p);m&&t.push(m)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=f,p=g-1;x<p;x+=c){let m=_a(this,e,to,l,x,x+1);m&&t.push(m)}if(this.isLineLoop){let x=_a(this,e,to,l,g-1,f);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function _a(s,e,t,n,i,r){let o=s.geometry.attributes.position;if(Xa.fromBufferAttribute(o,i),qa.fromBufferAttribute(o,r),t.distanceSqToSegment(Xa,qa,Ec,Gf)>n)return;Ec.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(Ec);if(!(l<e.near||l>e.far))return{distance:l,point:Gf.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}var Wf=new S,Xf=new S,Ya=class extends Sr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Wf.fromBufferAttribute(t,i),Xf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Wf.distanceTo(Xf);e.setAttribute("lineDistance",new we(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},$a=class extends Sr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Ss=class extends bn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},qf=new Ce,Ch=new bs,Ma=new Rn,ba=new S,Ji=class extends Ze{constructor(e=new et,t=new Ss){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ma.copy(n.boundingSphere),Ma.applyMatrix4(i),Ma.radius+=r,e.ray.intersectsSphere(Ma)===!1)return;qf.copy(i).invert(),Ch.copy(e.ray).applyMatrix4(qf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,x=f;g<x;g++){let p=c.getX(g);ba.fromBufferAttribute(u,p),Yf(ba,p,l,i,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,x=f;g<x;g++)ba.fromBufferAttribute(u,g),Yf(ba,g,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Yf(s,e,t,n,i,r,o){let a=Ch.distanceSqToPoint(s);if(a<t){let l=new S;Ch.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Pt=class extends zt{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Hn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new Q:new S);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new S,i=[],r=[],o=[],a=new S,l=new Ce;for(let f=0;f<=e;f++){let g=f/e;i[f]=this.getTangentAt(g,new S)}r[0]=new S,o[0]=new S;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Vt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Vt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},vo=class extends Hn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Q){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ph=class extends vo{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function pu(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var Ea=new S,Sc=new pu,Tc=new pu,wc=new pu,Ti=class extends Hn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new S){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Ea.subVectors(i[0],i[1]).add(i[0]),c=Ea);let u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Ea.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ea),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),p<1e-4&&(p=x),Sc.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,x,p),Tc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,x,p),wc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,x,p)}else this.curveType==="catmullrom"&&(Sc.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Tc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),wc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Sc.calc(l),Tc.calc(l),wc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new S().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function $f(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function __(s,e){let t=1-s;return t*t*e}function M_(s,e){return 2*(1-s)*s*e}function b_(s,e){return s*s*e}function co(s,e,t,n){return __(s,e)+M_(s,t)+b_(s,n)}function E_(s,e){let t=1-s;return t*t*t*e}function S_(s,e){let t=1-s;return 3*t*t*s*e}function T_(s,e){return 3*(1-s)*s*s*e}function w_(s,e){return s*s*s*e}function ho(s,e,t,n,i){return E_(s,e)+S_(s,t)+T_(s,n)+w_(s,i)}var Ka=class extends Hn{constructor(e=new Q,t=new Q,n=new Q,i=new Q){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new Q){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ho(e,i.x,r.x,o.x,a.x),ho(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ih=class extends Hn{constructor(e=new S,t=new S,n=new S,i=new S){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new S){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ho(e,i.x,r.x,o.x,a.x),ho(e,i.y,r.y,o.y,a.y),ho(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Za=class extends Hn{constructor(e=new Q,t=new Q){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Q){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Q){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Lh=class extends Hn{constructor(e=new S,t=new S){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new S){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new S){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ja=class extends Hn{constructor(e=new Q,t=new Q,n=new Q){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Q){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(co(e,i.x,r.x,o.x),co(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ja=class extends Hn{constructor(e=new S,t=new S,n=new S){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new S){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(co(e,i.x,r.x,o.x),co(e,i.y,r.y,o.y),co(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qa=class extends Hn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Q){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set($f(a,l.x,c.x,h.x,u.x),$f(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new Q().fromArray(i))}return this}},Dh=Object.freeze({__proto__:null,ArcCurve:Ph,CatmullRomCurve3:Ti,CubicBezierCurve:Ka,CubicBezierCurve3:Ih,EllipseCurve:vo,LineCurve:Za,LineCurve3:Lh,QuadraticBezierCurve:Ja,QuadraticBezierCurve3:ja,SplineCurve:Qa}),Nh=class extends Hn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Dh[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Dh[i.type]().fromJSON(i))}return this}},Uh=class extends Nh{constructor(e){super(),this.type="Path",this.currentPoint=new Q,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Za(this.currentPoint.clone(),new Q(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new Ja(this.currentPoint.clone(),new Q(e,t),new Q(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new Ka(this.currentPoint.clone(),new Q(e,t),new Q(n,i),new Q(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Qa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){let c=new vo(e,t,n,i,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},_o=class s extends et{constructor(e=[new Q(0,-.5),new Q(.5,0),new Q(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Vt(i,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/t,u=new S,d=new Q,f=new S,g=new S,x=new S,p=0,m=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:p=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,f.x=m*1,f.y=-p,f.z=m*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:p=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,f.x=m*1,f.y=-p,f.z=m*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(g)}for(let y=0;y<=t;y++){let _=n+y*h*i,v=Math.sin(_),R=Math.cos(_);for(let w=0;w<=e.length-1;w++){u.x=e[w].x*v,u.y=e[w].y,u.z=e[w].x*R,o.push(u.x,u.y,u.z),d.x=y/t,d.y=w/(e.length-1),a.push(d.x,d.y);let A=l[3*w+0]*v,P=l[3*w+1],b=l[3*w+0]*R;c.push(A,P,b)}}for(let y=0;y<t;y++)for(let _=0;_<e.length-1;_++){let v=_+y*e.length,R=v,w=v+e.length,A=v+e.length+1,P=v+1;r.push(R,w,P),r.push(A,P,w)}this.setIndex(r),this.setAttribute("position",new we(o,3)),this.setAttribute("uv",new we(a,2)),this.setAttribute("normal",new we(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}},ji=class s extends _o{constructor(e=1,t=1,n=4,i=8){let r=new Uh;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new s(e.radius,e.length,e.capSegments,e.radialSegments)}},Qi=class s extends et{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new S,h=new Q;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new we(o,3)),this.setAttribute("normal",new we(a,3)),this.setAttribute("uv",new we(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},$e=class s extends et{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,x=[],p=n/2,m=0;y(),o===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new we(u,3)),this.setAttribute("normal",new we(d,3)),this.setAttribute("uv",new we(f,2));function y(){let v=new S,R=new S,w=0,A=(t-e)/n;for(let P=0;P<=r;P++){let b=[],M=P/r,I=M*(t-e)+e;for(let U=0;U<=i;U++){let B=U/i,W=B*l+a,Y=Math.sin(W),V=Math.cos(W);R.x=I*Y,R.y=-M*n+p,R.z=I*V,u.push(R.x,R.y,R.z),v.set(Y,A,V).normalize(),d.push(v.x,v.y,v.z),f.push(B,1-M),b.push(g++)}x.push(b)}for(let P=0;P<i;P++)for(let b=0;b<r;b++){let M=x[b][P],I=x[b+1][P],U=x[b+1][P+1],B=x[b][P+1];(e>0||b!==0)&&(h.push(M,I,B),w+=3),(t>0||b!==r-1)&&(h.push(I,U,B),w+=3)}c.addGroup(m,w,0),m+=w}function _(v){let R=g,w=new Q,A=new S,P=0,b=v===!0?e:t,M=v===!0?1:-1;for(let U=1;U<=i;U++)u.push(0,p*M,0),d.push(0,M,0),f.push(.5,.5),g++;let I=g;for(let U=0;U<=i;U++){let W=U/i*l+a,Y=Math.cos(W),V=Math.sin(W);A.x=b*V,A.y=p*M,A.z=b*Y,u.push(A.x,A.y,A.z),d.push(0,M,0),w.x=Y*.5+.5,w.y=V*.5*M+.5,f.push(w.x,w.y),g++}for(let U=0;U<i;U++){let B=R+U,W=I+U;v===!0?h.push(W,W+1,B):h.push(W+1,W,B),P+=3}c.addGroup(m,P,v===!0?1:2),m+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ln=class s extends $e{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Hh=class s extends et{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new we(r,3)),this.setAttribute("normal",new we(r.slice(),3)),this.setAttribute("uv",new we(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){let _=new S,v=new S,R=new S;for(let w=0;w<t.length;w+=3)f(t[w+0],_),f(t[w+1],v),f(t[w+2],R),l(_,v,R,y)}function l(y,_,v,R){let w=R+1,A=[];for(let P=0;P<=w;P++){A[P]=[];let b=y.clone().lerp(v,P/w),M=_.clone().lerp(v,P/w),I=w-P;for(let U=0;U<=I;U++)U===0&&P===w?A[P][U]=b:A[P][U]=b.clone().lerp(M,U/I)}for(let P=0;P<w;P++)for(let b=0;b<2*(w-P)-1;b++){let M=Math.floor(b/2);b%2===0?(d(A[P][M+1]),d(A[P+1][M]),d(A[P][M])):(d(A[P][M+1]),d(A[P+1][M+1]),d(A[P+1][M]))}}function c(y){let _=new S;for(let v=0;v<r.length;v+=3)_.x=r[v+0],_.y=r[v+1],_.z=r[v+2],_.normalize().multiplyScalar(y),r[v+0]=_.x,r[v+1]=_.y,r[v+2]=_.z}function h(){let y=new S;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];let v=p(y)/2/Math.PI+.5,R=m(y)/Math.PI+.5;o.push(v,1-R)}g(),u()}function u(){for(let y=0;y<o.length;y+=6){let _=o[y+0],v=o[y+2],R=o[y+4],w=Math.max(_,v,R),A=Math.min(_,v,R);w>.9&&A<.1&&(_<.2&&(o[y+0]+=1),v<.2&&(o[y+2]+=1),R<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,_){let v=y*3;_.x=e[v+0],_.y=e[v+1],_.z=e[v+2]}function g(){let y=new S,_=new S,v=new S,R=new S,w=new Q,A=new Q,P=new Q;for(let b=0,M=0;b<r.length;b+=9,M+=6){y.set(r[b+0],r[b+1],r[b+2]),_.set(r[b+3],r[b+4],r[b+5]),v.set(r[b+6],r[b+7],r[b+8]),w.set(o[M+0],o[M+1]),A.set(o[M+2],o[M+3]),P.set(o[M+4],o[M+5]),R.copy(y).add(_).add(v).divideScalar(3);let I=p(R);x(w,M+0,y,I),x(A,M+2,_,I),x(P,M+4,v,I)}}function x(y,_,v,R){R<0&&y.x===1&&(o[_]=y.x-1),v.x===0&&v.z===0&&(o[_]=R/2/Math.PI+.5)}function p(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.details)}};var ri=class s extends Hh{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}};var $t=class s extends et{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new S,d=new S,f=[],g=[],x=[],p=[];for(let m=0;m<=n;m++){let y=[],_=m/n,v=0;m===0&&o===0?v=.5/t:m===n&&l===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){let w=R/t;u.x=-e*Math.cos(i+w*r)*Math.sin(o+_*a),u.y=e*Math.cos(o+_*a),u.z=e*Math.sin(i+w*r)*Math.sin(o+_*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),p.push(w+v,1-_),y.push(c++)}h.push(y)}for(let m=0;m<n;m++)for(let y=0;y<t;y++){let _=h[m][y+1],v=h[m][y],R=h[m+1][y],w=h[m+1][y+1];(m!==0||o>0)&&f.push(_,v,w),(m!==n-1||l<Math.PI)&&f.push(v,R,w)}this.setIndex(f),this.setAttribute("position",new we(g,3)),this.setAttribute("normal",new we(x,3)),this.setAttribute("uv",new we(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var En=class s extends et{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],l=[],c=[],h=new S,u=new S,d=new S;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){let x=g/i*r,p=f/n*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(x),u.y=(e+t*Math.cos(p))*Math.sin(x),u.z=t*Math.sin(p),a.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){let x=(i+1)*f+g-1,p=(i+1)*(f-1)+g-1,m=(i+1)*(f-1)+g,y=(i+1)*f+g;o.push(x,p,y),o.push(p,m,y)}this.setIndex(o),this.setAttribute("position",new we(a,3)),this.setAttribute("normal",new we(l,3)),this.setAttribute("uv",new we(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Tr=class s extends et{constructor(e=new ja(new S(-1,-1,0),new S(-1,1,0),new S(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new S,l=new S,c=new Q,h=new S,u=[],d=[],f=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new we(u,3)),this.setAttribute("normal",new we(d,3)),this.setAttribute("uv",new we(f,2));function x(){for(let _=0;_<t;_++)p(_);p(r===!1?t:0),y(),m()}function p(_){h=e.getPointAt(_/t,h);let v=o.normals[_],R=o.binormals[_];for(let w=0;w<=i;w++){let A=w/i*Math.PI*2,P=Math.sin(A),b=-Math.cos(A);l.x=b*v.x+P*R.x,l.y=b*v.y+P*R.y,l.z=b*v.z+P*R.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function m(){for(let _=1;_<=t;_++)for(let v=1;v<=i;v++){let R=(i+1)*(_-1)+(v-1),w=(i+1)*_+(v-1),A=(i+1)*_+v,P=(i+1)*(_-1)+v;g.push(R,w,P),g.push(w,A,P)}}function y(){for(let _=0;_<=t;_++)for(let v=0;v<=i;v++)c.x=_/t,c.y=v/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new Dh[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var el=class extends Mt{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}},Ae=class extends bn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mp,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},vt=class extends Ae{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Q(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Vt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new te(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new te(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new te(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function Sa(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function A_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function R_(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Kf(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function wp(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}var es=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Bh=class extends es{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:or,endingEnd:or}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case ar:r=e,a=2*t-n;break;case Pa:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ar:o=e,l=2*n-t;break;case Pa:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),x=g*g,p=x*g,m=-d*p+2*d*x-d*g,y=(1+d)*p+(-1.5-2*d)*x+(-.5+d)*g+1,_=(-1-f)*p+(1.5+f)*x+.5*g,v=f*p-f*x;for(let R=0;R!==a;++R)r[R]=m*o[h+R]+y*o[c+R]+_*o[l+R]+v*o[u+R];return r}},tl=class extends es{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},Fh=class extends es{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Bn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Sa(t,this.TimeBufferType),this.values=Sa(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Sa(e.times,Array),values:Sa(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Fh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new tl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Bh(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case xr:t=this.InterpolantFactoryMethodDiscrete;break;case yr:t=this.InterpolantFactoryMethodLinear;break;case Yl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xr;case this.InterpolantFactoryMethodLinear:return yr;case this.InterpolantFactoryMethodSmooth:return Yl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&A_(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Yl,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let x=t[u+g];if(x!==t[d+g]||x!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Bn.prototype.TimeBufferType=Float32Array;Bn.prototype.ValueBufferType=Float32Array;Bn.prototype.DefaultInterpolation=yr;var ts=class extends Bn{constructor(e,t,n){super(e,t,n)}};ts.prototype.ValueTypeName="bool";ts.prototype.ValueBufferType=Array;ts.prototype.DefaultInterpolation=xr;ts.prototype.InterpolantFactoryMethodLinear=void 0;ts.prototype.InterpolantFactoryMethodSmooth=void 0;var nl=class extends Bn{};nl.prototype.ValueTypeName="color";var wi=class extends Bn{};wi.prototype.ValueTypeName="number";var Oh=class extends es{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)sn.slerpFlat(r,0,o,c-a,o,c,l);return r}},Ai=class extends Bn{InterpolantFactoryMethodLinear(e){return new Oh(this.times,this.values,this.getValueSize(),e)}};Ai.prototype.ValueTypeName="quaternion";Ai.prototype.InterpolantFactoryMethodSmooth=void 0;var ns=class extends Bn{constructor(e,t,n){super(e,t,n)}};ns.prototype.ValueTypeName="string";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=xr;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;var Ri=class extends Bn{};Ri.prototype.ValueTypeName="vector";var wr=class{constructor(e="",t=-1,n=[],i=uu){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Zn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(P_(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Bn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=R_(l);l=Kf(l,1,h),c=Kf(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new wi(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,f,g,x){if(f.length!==0){let p=[],m=[];wp(f,p,m,g),p.length!==0&&x.push(new u(d,p,m))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let u=0;u<c.length;u++){let d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let x=0;x<d[g].morphTargets.length;x++)f[d[g].morphTargets[x]]=-1;for(let x in f){let p=[],m=[];for(let y=0;y!==d[g].morphTargets.length;++y){let _=d[g];p.push(_.time),m.push(_.morphTarget===x?1:0)}i.push(new wi(".morphTargetInfluence["+x+"]",p,m))}l=f.length*o}else{let f=".bones["+t[u].name+"]";n(Ri,f+".position",d,"pos",i),n(Ai,f+".quaternion",d,"rot",i),n(Ri,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function C_(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return wi;case"vector":case"vector2":case"vector3":case"vector4":return Ri;case"color":return nl;case"quaternion":return Ai;case"bool":case"boolean":return ts;case"string":return ns}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function P_(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=C_(s.type);if(s.times===void 0){let t=[],n=[];wp(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var Yi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},kh=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},I_=new kh,Ci=class{constructor(e){this.manager=e!==void 0?e:I_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Ci.DEFAULT_MATERIAL_NAME="__DEFAULT";var yi={},zh=class extends Error{constructor(e,t){super(e),this.response=t}},Mo=class extends Ci{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Yi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(yi[e]!==void 0){yi[e].push({onLoad:t,onProgress:n,onError:i});return}yi[e]=[],yi[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=yi[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,x=0,p=new ReadableStream({start(m){y();function y(){u.read().then(({done:_,value:v})=>{if(_)m.close();else{x+=v.byteLength;let R=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let w=0,A=h.length;w<A;w++){let P=h[w];P.onProgress&&P.onProgress(R)}m.enqueue(v),y()}},_=>{m.error(_)})}}});return new Response(p)}else throw new zh(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Yi.add(e,c);let h=yi[e];delete yi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=yi[e];if(h===void 0)throw this.manager.itemError(e),c;delete yi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Vh=class extends Ci{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Yi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=po("img");function l(){h(),Yi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var il=class extends Ci{constructor(e){super(e)}load(e,t,n,i){let r=new zt,o=new Vh(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Ar=class extends Ze{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new te(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},sl=class extends Ar{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.groundColor=new te(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Ac=new Ce,Zf=new S,Jf=new S,bo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Q(512,512),this.map=null,this.mapPass=null,this.matrix=new Ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new go,this._frameExtents=new Q(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Zf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Zf),Jf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Jf),t.updateMatrixWorld(),Ac.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ac),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ac)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Gh=class extends bo{constructor(){super(new Ut(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=vr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Rr=class extends Ar{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.target=new Ze,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Gh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},jf=new Ce,no=new S,Rc=new S,Wh=class extends bo{constructor(){super(new Ut(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Q(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new S(1,0,0),new S(-1,0,0),new S(0,0,1),new S(0,0,-1),new S(0,1,0),new S(0,-1,0)],this._cubeUps=[new S(0,1,0),new S(0,1,0),new S(0,1,0),new S(0,1,0),new S(0,0,1),new S(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),no.setFromMatrixPosition(e.matrixWorld),n.position.copy(no),Rc.copy(n.position),Rc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Rc),n.updateMatrixWorld(),i.makeTranslation(-no.x,-no.y,-no.z),jf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jf)}},rl=class extends Ar{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Wh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Xh=class extends bo{constructor(){super(new Zi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Cr=class extends Ar{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.target=new Ze,this.shadow=new Xh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var is=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},ol=class extends et{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var al=class extends Ci{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Yi.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Yi.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Yi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Yi.add(e,l),r.manager.itemStart(e)}};var ll=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Qf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=Qf();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function Qf(){return performance.now()}var qh=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){sn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let o=this._workIndex*r;sn.multiplyQuaternionsFlat(e,o,e,t,e,n),sn.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){let o=1-i;for(let a=0;a!==r;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*i}}},mu="\\[\\]\\.:\\/",L_=new RegExp("["+mu+"]","g"),gu="[^"+mu+"]",D_="[^"+mu.replace("\\.","")+"]",N_=/((?:WC+[\/:])*)/.source.replace("WC",gu),U_=/(WCOD+)?/.source.replace("WCOD",D_),H_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",gu),B_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",gu),F_=new RegExp("^"+N_+U_+H_+B_+"$"),O_=["material","materials","bones","map"],Yh=class{constructor(e,t,n){let i=n||_t.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},_t=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(L_,"")}static parseTrackName(e){let t=F_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);O_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_t.Composite=Yh;_t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_t.prototype.GetterByBindingType=[_t.prototype._getValue_direct,_t.prototype._getValue_array,_t.prototype._getValue_arrayElement,_t.prototype._getValue_toArray];_t.prototype.SetterByBindingTypeAndVersioning=[[_t.prototype._setValue_direct,_t.prototype._setValue_direct_setNeedsUpdate,_t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_array,_t.prototype._setValue_array_setNeedsUpdate,_t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_arrayElement,_t.prototype._setValue_arrayElement_setNeedsUpdate,_t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_fromArray,_t.prototype._setValue_fromArray_setNeedsUpdate,_t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var $h=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,o=r.length,a=new Array(o),l={endingStart:or,endingEnd:or};for(let c=0;c!==o;++c){let h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=qm,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case $m:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case uu:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,o=n===Ym;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===Xm){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){let a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=ar,i.endingEnd=ar):(e?i.endingStart=this.zeroSlopeAtStart?ar:or:i.endingStart=Pa,t?i.endingEnd=this.zeroSlopeAtEnd?ar:or:i.endingEnd=Pa)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}},k_=new Float32Array(1),cl=class extends Ei{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){let d=i[u],f=d.name,g=h[f];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}let x=t&&t._propertyBindings[u].binding.parsedPath;g=new qh(_t.create(n,f,x),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new tl(new Float32Array(2),new Float32Array(2),1,k_),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,o=typeof e=="string"?wr.findByName(i,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=uu),l!==void 0){let u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let h=new $h(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?wr.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var ep=new Ce,hl=class{constructor(e,t,n=0,i=1/0){this.ray=new bs(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new mo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ep.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ep),this}intersectObject(e,t=!0,n=[]){return Kh(e,this,n,t),n.sort(tp),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Kh(e[i],this,n,t);return n.sort(tp),n}};function tp(s,e){return s.distance-e.distance}function Kh(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Kh(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zh);var ml={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var Pn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},z_=new Zi(-1,1,1,-1,0,1),xu=class extends et{constructor(){super(),this.setAttribute("position",new we([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new we([0,2,0,0,2,0],2))}},V_=new xu,ss=class{constructor(e){this._mesh=new ge(V_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,z_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Ir=class extends Pn{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Mt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Cn.clone(e.uniforms),this.material=new Mt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ss(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var To=class extends Pn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}},gl=class extends Pn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var xl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new Q);this._width=n.width,this._height=n.height,t=new Zt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Jn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ir(ml),this.copyPass.material.blending=ti,this.clock=new ll}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,r=this.passes.length;i<r;i++){let o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}To!==void 0&&(o instanceof To?n=!0:o instanceof gl&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new Q);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Ap={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var yl=class extends Pn{constructor(){super();let e=Ap;this.uniforms=Cn.clone(e.uniforms),this.material=new el({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new ss(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ke.getTransfer(this._outputColorSpace)===gt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===jh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Qh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===eu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Eo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===tu?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===nu&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var vl=class extends Pn{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new te}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}};var Rp={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new te(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var Lr=class s extends Pn{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new Q(e.x,e.y):new Q(256,256),this.clearColor=new te(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Zt(r,o,{type:Jn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new Zt(r,o,{type:Jn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let f=new Zt(r,o,{type:Jn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}let a=Rp;this.highPassUniforms=Cn.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Mt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Q(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new S(1,1,1),new S(1,1,1),new S(1,1,1),new S(1,1,1),new S(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=ml;this.copyUniforms=Cn.clone(h.uniforms),this.blendMaterial=new Mt({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Gt,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new te,this.oldClearAlpha=1,this.basic=new Fe,this.fsQuad=new ss(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new Q(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=s.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=s.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Mt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Q(.5,.5)},direction:{value:new Q(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new Mt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}};Lr.BlurDirectionX=new Q(1,0);Lr.BlurDirectionY=new Q(0,1);var It={lapLen:3e4,laps:1,baseSpeed:62,lobbyMs:25e3,nextLobbyMs:15e3,countdownMs:4e3,graceMs:25e3,resultMs:16e3,maxRacers:60,idleKickMs:9e5,gridCols:6,gridGap:26,gridLane:11,takeoffM:450,landM:380,likesPerBoost:2,maxRepeat:10},_l=[{key:"racer",name:"M\xE1y bay \u0111ua",words:["dua","racer","race"]},{key:"fighter",name:"Ti\xEAm k\xEDch",words:["tiemkich","fighter","f16","f22","mig","chiendau"]},{key:"airliner",name:"M\xE1y bay ch\u1EDF kh\xE1ch",words:["chokhach","boeing","airbus","airliner","737","747"]},{key:"prop",name:"C\xE1nh qu\u1EA1t c\u1ED5 \u0111i\u1EC3n",words:["canhquat","prop","cessna","spitfire"]},{key:"supersonic",name:"Si\xEAu thanh",words:["sieuthanh","concorde","supersonic"]},{key:"bizjet",name:"Ph\u1EA3n l\u1EF1c t\u01B0 nh\xE2n",words:["tunhan","bizjet","private","gulfstream","phanluc"]},{key:"transport",name:"V\u1EADn t\u1EA3i qu\xE2n s\u1EF1",words:["vantai","transport","c130","hercules"]},{key:"stunt",name:"Nh\xE0o l\u1ED9n",words:["nhaolon","naolon","stunt","extra","bieudien"]},{key:"future",name:"M\xE1y bay t\u01B0\u01A1ng lai",words:["tuonglai","future","futuristic","scifi"]},{key:"golden",name:"VIP m\u1EA1 v\xE0ng",words:[],vip:!0}],wo=s=>_l.find(e=>e.key===s)?.name??String(s),ws=_l.filter(s=>!s.vip),Cp=[{name:"\u0110\u1ECF",words:["do","red"],hex:14165547},{name:"Cam",words:["cam","orange"],hex:15888412},{name:"V\xE0ng",words:["vang","yellow"],hex:16106776},{name:"Xanh l\xE1",words:["xanhla","green"],hex:2071116},{name:"Xanh d\u01B0\u01A1ng",words:["xanh","xanhduong","blue"],hex:1920936},{name:"T\xEDm",words:["tim","purple"],hex:6958020},{name:"H\u1ED3ng",words:["hong","pink"],hex:15220364},{name:"Tr\u1EAFng",words:["trang","white"],hex:15659509},{name:"\u0110en",words:["den","black"],hex:1908775},{name:"B\u1EA1c",words:["bac","silver"],hex:11121597}],Pp=13936186,Dr=[{xu:1,key:"boost",icon:"\u{1F4A8}",name:"T\u0103ng t\u1ED1c nh\u1EB9",desc:"+25% t\u1ED1c \u0111\u1ED9 3 gi\xE2y",gift:"Hoa h\u1ED3ng"},{xu:5,key:"engine",icon:"\u2699\uFE0F",name:"T\u0103ng t\u1ED1c \u0111\u1ED9ng c\u01A1",desc:"+50% t\u1ED1c \u0111\u1ED9 4 gi\xE2y",gift:"Tim ng\xF3n tay"},{xu:10,key:"nitro",icon:"\u{1F525}",name:"Boost",desc:"+90% t\u1ED1c \u0111\u1ED9 4 gi\xE2y, l\u1EEDa ph\u1EA3n l\u1EF1c",gift:"qu\xE0 10 xu"},{xu:20,key:"missile",icon:"\u{1F3AF}",name:"T\xEAn l\u1EEDa",desc:"B\u1EAFn cho\xE1ng m\xE1y bay ph\xEDa tr\u01B0\u1EDBc",gift:"qu\xE0 20 xu"},{xu:30,key:"thunder",icon:"\u26A1",name:"S\xE9t \u0111\xE1nh",desc:"\u0110\xE1nh ch\u1EADm Top 3 trong 4 gi\xE2y",gift:"B\xE1nh donut"},{xu:50,key:"rocket",icon:"\u{1F680}",name:"T\xEAn l\u1EEDa t\u0103ng t\u1ED1c",desc:"G\u1EAFn t\xEAn l\u1EEDa \u0111\u1EA9y +160% 3 gi\xE2y",gift:"qu\xE0 50 xu"},{xu:99,key:"super",icon:"\u{1F31F}",name:"Si\xEAu Boost",desc:"+120% 6 gi\xE2y k\xE8m khi\xEAn",gift:"qu\xE0 99 xu"},{xu:199,key:"bomb",icon:"\u{1F4A3}",name:"Bom t\u1EA5n",desc:"N\xE9m bom ng\u01B0\u1EDDi d\u1EABn \u0111\u1EA7u",gift:"qu\xE0 199 xu"},{xu:299,key:"jet",icon:"\u{1F6E9}\uFE0F",name:"Ch\u1EBF \u0111\u1ED9 ph\u1EA3n l\u1EF1c",desc:"\u0110\u1ED1t sau c\u1EF1c \u0111\u1EA1i + khi\xEAn 10 gi\xE2y",gift:"qu\xE0 299 xu"},{xu:500,key:"meteor",icon:"\u2604\uFE0F",name:"M\u01B0a thi\xEAn th\u1EA1ch",desc:"C\u1EA3 \u0111\u01B0\u1EDDng \u0111ua ch\u1EADm, b\u1EA1n b\u1EE9t ph\xE1",gift:"qu\xE0 500 xu"},{xu:999,key:"vip",icon:"\u{1F451}",name:"Tri\u1EC7u h\u1ED3i m\xE1y bay VIP",desc:"\u0110\u1ED5i sang m\xE1y bay m\u1EA1 v\xE0ng, phi \u0111\u1ED9i h\u1ED9 t\u1ED1ng",gift:"qu\xE0 999 xu"}];var Ao=s=>Dr.find(e=>e.key===s)??Dr[0],yu={boost:3e3,engine:4e3,nitro:4e3,rocket:3e3,super:6e3,superShield:6e3,stun:2500,thunderSlow:4e3,bombStun:5e3,bombSlow:3e3,jet:1e4,meteorSlow:6e3,meteorSuper:8e3,meteorShield:1e4,vipSuper:12e3,vipShield:15e3,vipEscort:15e3,likeBoost:300,padBoost:1800,crash:1600,shortCrash:2200,missileFlight:1200,bombFall:1500,maxStack:2e4,maxShield:6e4};var Le={BOOST:1,NITRO:2,SHIELD:4,STUN:8,SLOW:16,SUPER:32,ESCORT:64,ROCKET:128,ENGINE:256,JET:512,SHORT:1024,CRASH:2048},vu=s=>s.normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/Đ/g,"d").toLowerCase().replace(/[^a-z0-9]/g,"");var Nr=s=>{let e=Math.max(0,s)/1e3,t=Math.floor(e/60);return`${t}:${(e-t*60).toFixed(1).padStart(4,"0")}`};var Ro=s=>s.map(([e,t,n])=>[e*9.2,t,n*9.2]),Co=[{key:"tropical",name:"\u0110\u1EA3o nhi\u1EC7t \u0111\u1EDBi",icon:"\u{1F3DD}\uFE0F",pts:Ro([[0,40,0],[330,50,0],[560,70,-120],[740,95,-20],[780,110,220],[630,85,430],[380,45,530],[120,30,610],[-150,58,570],[-390,85,430],[-510,100,210],[-450,66,50],[-280,42,0]]),pads:[{at:.3,len:.018},{at:.66,len:.018}],obstacles:[.22,.47,.8],shortcut:{at:.53,len:.012,gain:350}},{key:"snow",name:"N\xFAi tuy\u1EBFt",icon:"\u{1F3D4}\uFE0F",pts:Ro([[0,45,0],[340,55,0],[600,80,90],[720,118,330],[570,140,570],[300,112,660],[60,80,560],[-150,98,700],[-420,128,600],[-570,108,350],[-520,78,130],[-280,46,0]]),pads:[{at:.28,len:.018},{at:.7,len:.018}],obstacles:[.2,.5,.86],shortcut:{at:.58,len:.012,gain:375}},{key:"city",name:"Th\xE0nh ph\u1ED1 hi\u1EC7n \u0111\u1EA1i",icon:"\u{1F306}",pts:Ro([[0,40,0],[330,45,0],[570,55,150],[610,62,410],[420,72,590],[150,55,630],[-120,46,570],[-330,70,430],[-430,85,210],[-360,60,50],[-280,42,0]]),pads:[{at:.32,len:.018},{at:.68,len:.018}],obstacles:[.24,.5,.82],shortcut:{at:.56,len:.012,gain:325}},{key:"jungle",name:"H\u1EBBm n\xFAi r\u1EEBng r\u1EADm",icon:"\u{1F334}",pts:Ro([[0,40,0],[330,45,0],[580,55,-80],[770,60,100],[730,70,360],[520,52,530],[260,38,570],[60,55,730],[-200,70,670],[-430,60,490],[-490,55,230],[-280,42,0]]),pads:[{at:.27,len:.018},{at:.62,len:.018}],obstacles:[.21,.45,.84],shortcut:{at:.52,len:.012,gain:375}},{key:"desert",name:"Sa m\u1EA1c",icon:"\u{1F3DC}\uFE0F",pts:Ro([[0,40,0],[330,48,0],[600,60,-60],[830,75,140],[770,90,420],[500,70,570],[240,50,480],[40,65,650],[-240,80,710],[-470,95,500],[-530,70,240],[-280,42,0]]),pads:[{at:.3,len:.018},{at:.7,len:.018}],obstacles:[.23,.5,.88],shortcut:{at:.6,len:.012,gain:350}}],ai=s=>Co.find(e=>e.key===s)??Co[0],_u=(s,e)=>(s/e%1+1)%1;var bl=class bl{constructor(){F(this,"ctx",null);F(this,"master");F(this,"sfx");F(this,"musicGain");F(this,"engine",null);F(this,"noise");F(this,"muted",!1);F(this,"voices",[]);F(this,"speaking",!1);F(this,"music",null);F(this,"playlist",[]);F(this,"track",0);F(this,"musicOn",!0);F(this,"buf",new Map);F(this,"last",new Map);F(this,"engineLoop",null);F(this,"bgm",{lobby:["/bgm/lobby.ogg"],race:["/bgm/race-1.ogg","/bgm/race-2.ogg"],final:["/bgm/final.ogg"],result:["/bgm/victory.ogg"]});F(this,"scene","");F(this,"want","");F(this,"ch",null);F(this,"idx",{lobby:0,race:0,final:0,result:0})}unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}let e=new AudioContext;this.ctx=e,this.master=e.createGain(),this.master.gain.value=this.muted?0:.9,this.master.connect(e.destination);let t=e.createDynamicsCompressor();t.threshold.value=-14,t.knee.value=8,t.ratio.value=4,t.attack.value=.004,t.release.value=.2,t.connect(this.master),this.sfx=e.createGain(),this.sfx.gain.value=.75,this.sfx.connect(t),this.musicGain=e.createGain(),this.musicGain.gain.value=.35,this.musicGain.connect(this.master);let n=e.sampleRate*2,i=e.createBuffer(1,n,e.sampleRate),r=i.getChannelData(0);for(let u=0;u<n;u++)r[u]=Math.random()*2-1;this.noise=i;let o=e.createOscillator();o.type="sawtooth",o.frequency.value=70;let a=e.createBufferSource();a.buffer=i,a.loop=!0;let l=e.createBiquadFilter();l.type="lowpass",l.frequency.value=500;let c=e.createGain();c.gain.value=0;let h=e.createGain();h.gain.value=.12,o.connect(h).connect(l),a.connect(l),l.connect(c).connect(this.sfx),o.start(),a.start(),this.engine={g:c,f:l,o},this.loadMusic(),this.loadSfx()}get ready(){return!!this.ctx&&this.ctx.state==="running"}setMuted(e){this.muted=e,this.master&&(this.master.gain.value=e?0:.9),this.music&&(this.music.muted=e)}engineAt(e,t){if(!this.engine||!this.ctx)return;let n=this.ctx.currentTime,i=Math.min(1,e/160),r=this.engineLoop?.35:1;this.engine.g.gain.setTargetAtTime(t?(.08+i*.16)*r:0,n,.3),this.engineLoop&&(this.engineLoop.g.gain.setTargetAtTime(t?.12+i*.3:0,n,.3),this.engineLoop.s.playbackRate.setTargetAtTime(.75+i*.9,n,.4)),this.engine.f.frequency.setTargetAtTime(300+i*1600,n,.2),this.engine.o.frequency.setTargetAtTime(55+i*90,n,.3)}env(e,t,n,i){let r=this.ctx.createGain(),o=this.ctx.currentTime;return r.gain.setValueAtTime(1e-4,o),r.gain.exponentialRampToValueAtTime(n,o+t),r.gain.exponentialRampToValueAtTime(1e-4,o+i),e.connect(r).connect(this.sfx),r}tone(e,t,n,i,r=.3,o=0){if(!this.ctx)return;let a=this.ctx.createOscillator(),l=this.ctx.currentTime+o;a.type=e,a.frequency.setValueAtTime(t,l),a.frequency.exponentialRampToValueAtTime(Math.max(20,n),l+i);let c=this.ctx.createGain();c.gain.setValueAtTime(1e-4,l),c.gain.exponentialRampToValueAtTime(r,l+.01),c.gain.exponentialRampToValueAtTime(1e-4,l+i),a.connect(c).connect(this.sfx),a.start(l),a.stop(l+i+.05)}hiss(e,t,n,i=.4,r=1,o="bandpass"){if(!this.ctx)return;let a=this.ctx.createBufferSource();a.buffer=this.noise;let l=this.ctx.createBiquadFilter(),c=this.ctx.currentTime;l.type=o,l.Q.value=r,l.frequency.setValueAtTime(t,c),l.frequency.exponentialRampToValueAtTime(n,c+e),a.connect(l),this.env(l,.02,i,e),a.start(),a.stop(c+e+.05)}async loadSfx(){await Promise.all(bl.FILES.map(async e=>{try{let t=await fetch(`/sfx/${e}.ogg`);t.ok&&this.buf.set(e,await this.ctx.decodeAudioData(await t.arrayBuffer()))}catch{}})),this.engineSample()}play(e,t={}){let n=this.buf.get(e);if(!n||!this.ctx)return!1;let i=this.ctx.currentTime,r=i+(t.delay??0);if(t.gap&&i-(this.last.get(e)??-9)<t.gap)return!0;this.last.set(e,i);let o=this.ctx.createBufferSource();o.buffer=n,o.playbackRate.value=(t.rate??1)*(.94+Math.random()*.12);let a=this.ctx.createGain();a.gain.value=t.vol??1,o.connect(a).connect(this.sfx);let l=Math.min(t.dur??n.duration,n.duration);return t.dur&&t.dur<n.duration&&(a.gain.setValueAtTime(t.vol??1,r+l*.6),a.gain.linearRampToValueAtTime(1e-4,r+l)),o.start(r,0,l+.05),!0}any(e,t){return`${e}-${Math.floor(Math.random()*t)}`}engineSample(){let e=this.buf.get("engine-loop");if(!e||!this.ctx)return;let t=this.ctx.createBufferSource();t.buffer=e,t.loop=!0;let n=this.ctx.createGain();n.gain.value=0,t.connect(n).connect(this.sfx),t.start(),this.engineLoop={s:t,g:n}}boost(){this.play("boost",{vol:.8,gap:.12})||this.hiss(.7,400,3e3,.35,2),this.play(this.any("thrust",5),{vol:.35,dur:.9,rate:1.15,gap:.3})}nitro(){this.play(this.any("thrust",5),{vol:.9,dur:1.8,gap:.25})||(this.hiss(1.1,200,4e3,.5,1.5),this.tone("sawtooth",90,260,.9,.12)),this.play("boost",{vol:.6,rate:.8})}shield(){this.play("shield",{vol:.7,gap:.15})||(this.tone("sine",520,1040,.4,.2),this.tone("sine",780,1560,.5,.12,.08))}launch(){this.play("launch",{vol:.85,dur:1.6,gap:.15})||(this.hiss(.9,1500,300,.35,3),this.tone("square",900,200,.5,.05))}boom(e=!1){!this.ctx||(e?this.play("bomb-low",{vol:1,gap:.2})&&(this.play("bomb-crack",{vol:.8}),this.play(this.any("boom",5),{vol:.5,rate:.8,delay:.05}),!0):this.play(this.any("boom",5),{vol:.75,gap:.08}))||(this.hiss(e?1.8:1,e?900:1400,60,e?.9:.6,.7,"lowpass"),this.tone("sine",e?90:120,30,e?1.2:.6,e?.6:.4))}zap(){this.play("zap",{vol:.8,gap:.1})||(this.hiss(.35,6e3,1500,.5,4,"highpass"),this.tone("square",1800,300,.3,.08))}warp(){this.play("warp",{vol:.8})||(this.tone("sine",200,1600,.6,.25),this.tone("triangle",1600,200,.6,.15,.3))}coin(e=!1){this.play(e?"coin-big":"coin",{vol:.7,gap:.06})||(this.tone("square",988,988,.08,.08),this.tone("square",1319,1319,.25,.08,.08))}beep(e=!1){e&&this.play("go",{vol:.9})||this.tone("square",e?880:440,e?880:440,e?.6:.25,.15)}fanfare(){[523,659,784,1047].forEach((e,t)=>this.tone("square",e,e,t===3?.8:.18,.1,t*.15)),this.play("coin-big",{vol:.6,delay:.45})}lap(){this.play("ring",{vol:.7,gap:.1})||(this.tone("triangle",660,660,.12,.15),this.tone("triangle",990,990,.3,.15,.12))}voice(e){let t=new Audio(e);for(t.preload="auto",t.muted=this.muted,this.voices.push({a:t,at:performance.now()});this.voices.length>3;)this.voices.shift();this.nextVoice()}nextVoice(){if(this.speaking||!this.ctx)return;for(;this.voices.length&&performance.now()-this.voices[0].at>7e3;)this.voices.shift();if(!this.voices.length){this.duck(!1);return}let e=this.voices.shift().a;e.muted=this.muted,this.speaking=!0,this.duck(!0);let t=()=>{this.speaking=!1,this.voices.length||this.duck(!1),setTimeout(()=>this.nextVoice(),60)};e.onended=t,e.onerror=t,e.play().catch(t)}duck(e){this.musicGain&&this.ctx&&this.musicGain.gain.setTargetAtTime(e?.12:.35,this.ctx.currentTime,.3)}async loadMusic(){try{let e=await(await fetch("/music/list.json")).json();e.length&&(this.playlist=e,this.bgm.race=e)}catch{}this.want&&this.setScene(this.want,!0)}setScene(e,t=!1){this.want=e,!(!this.ctx||!t&&e===this.scene)&&(this.scene=e,this.musicOn&&this.startTrack(e))}startTrack(e){if(!this.ctx)return;let t=this.bgm[e];if(!t.length)return;let n=this.ctx.currentTime,i=this.ch;i&&(i.g.gain.cancelScheduledValues(n),i.g.gain.setValueAtTime(i.g.gain.value,n),i.g.gain.linearRampToValueAtTime(1e-4,n+1.5),setTimeout(()=>{i.a.pause(),i.a.src=""},1700));let r=t[this.idx[e]++%t.length],o=new Audio(r);o.muted=this.muted,o.loop=t.length===1;let a=this.ctx.createGain();a.gain.setValueAtTime(1e-4,n),a.gain.linearRampToValueAtTime(1,n+(i?1.2:.6)),this.ctx.createMediaElementSource(o).connect(a).connect(this.musicGain),o.onended=()=>{this.ch?.a===o&&this.musicOn&&this.startTrack(e)},o.onerror=()=>{this.ch?.a===o&&setTimeout(()=>this.ch?.a===o&&this.startTrack(e),3e3)},o.play().catch(()=>{}),this.ch={a:o,g:a,scene:e},this.music=o}toggleMusic(){return this.musicOn=!this.musicOn,this.musicOn?this.scene&&this.startTrack(this.scene):(this.ch?.a.pause(),this.ch=null,this.music=null),this.musicOn}get hasMusic(){return!0}};F(bl,"FILES",["bomb-low","bomb-crack","boom-0","boom-1","boom-2","boom-3","boom-4","launch","boost","thrust-0","thrust-1","thrust-2","thrust-3","thrust-4","engine-loop","shield","zap","warp","coin","coin-big","go","ring"]);var Ml=bl;function El(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new et,c=0;for(let h=0;h<s.length;++h){let u=s[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,u=[];for(let d=0;d<s.length;++d){let f=s[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=Ip(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let x=0;x<o[h].length;++x)f.push(o[h][x][d]);let g=Ip(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Ip(s){let e,t,n,i=-1,r=0;for(let c=0;c<s.length;++c){let h=s[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let o=new e(r),a=new lt(o,t,n),l=0;for(let c=0;c<s.length;++c){let h=s[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<t;g++){let x=h.getComponent(d,g);a.setComponent(d+u,g,x)}}else o.set(h.array,l);l+=h.count*t}return i!==void 0&&(a.gpuType=i),a}function Mu(s,e){if(e===pp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===So||e===dl){let t=s.getIndex();if(t===null){let o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===So)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var Sl=class extends Ci{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Ru(t)}),this.register(function(t){return new Cu(t)}),this.register(function(t){return new Fu(t)}),this.register(function(t){return new Ou(t)}),this.register(function(t){return new ku(t)}),this.register(function(t){return new Iu(t)}),this.register(function(t){return new Lu(t)}),this.register(function(t){return new Du(t)}),this.register(function(t){return new Nu(t)}),this.register(function(t){return new Au(t)}),this.register(function(t){return new Uu(t)}),this.register(function(t){return new Pu(t)}),this.register(function(t){return new Bu(t)}),this.register(function(t){return new Hu(t)}),this.register(function(t){return new Tu(t)}),this.register(function(t){return new zu(t)}),this.register(function(t){return new Vu(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=is.extractUrlBase(e);o=is.resolveURL(c,this.path)}else o=is.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Mo(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Hp){try{o[tt.KHR_BINARY_GLTF]=new Gu(e)}catch(u){i&&i(u);return}r=JSON.parse(o[tt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Zu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case tt.KHR_MATERIALS_UNLIT:o[u]=new wu;break;case tt.KHR_DRACO_MESH_COMPRESSION:o[u]=new Wu(r,this.dracoLoader);break;case tt.KHR_TEXTURE_TRANSFORM:o[u]=new Xu;break;case tt.KHR_MESH_QUANTIZATION:o[u]=new qu;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function G_(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}var tt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Tu=class{constructor(e){this.parser=e,this.name=tt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new te(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],cn);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Cr(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new rl(h),c.distance=u;break;case"spot":c=new Rr(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Ii(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}},wu=class{constructor(){this.name=tt.KHR_MATERIALS_UNLIT}getMaterialType(){return Fe}extendParams(e,t,n){let i=[];e.color=new te(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],cn),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,dt))}return Promise.all(i)}},Au=class{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Ru=class{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Q(a,a)}return Promise.all(r)}},Cu=class{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Pu=class{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Iu=class{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new te(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],cn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,dt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Lu=class{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Du=class{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new te().setRGB(a[0],a[1],a[2],cn),Promise.all(r)}},Nu=class{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vt}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Uu=class{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new te().setRGB(a[0],a[1],a[2],cn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,dt)),Promise.all(r)}},Hu=class{constructor(e){this.parser=e,this.name=tt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},Bu=class{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vt}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Fu=class{constructor(e){this.parser=e,this.name=tt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Ou=class{constructor(e){this.parser=e,this.name=tt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},ku=class{constructor(e){this.parser=e,this.name=tt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},zu=class{constructor(e){this.name=tt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},Vu=class{constructor(e){this.name=tt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==Fn.TRIANGLES&&c.mode!==Fn.TRIANGLE_STRIP&&c.mode!==Fn.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(let g of u){let x=new Ce,p=new S,m=new sn,y=new S(1,1,1),_=new Yt(g.geometry,g.material,d);for(let v=0;v<d;v++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,v),l.SCALE&&y.fromBufferAttribute(l.SCALE,v),_.setMatrixAt(v,x.compose(p,m,y));for(let v in l)if(v==="_COLOR_0"){let R=l[v];_.instanceColor=new si(R.array,R.itemSize,R.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,l[v]);Ze.prototype.copy.call(_,g),this.parser.assignFinalMaterial(_),f.push(_)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},Hp="glTF",Po=12,Lp={JSON:1313821514,BIN:5130562},Gu=class{constructor(e){this.name=tt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Po),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Hp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Po,r=new DataView(e,Po),o=0;for(;o<i;){let a=r.getUint32(o,!0);o+=4;let l=r.getUint32(o,!0);if(o+=4,l===Lp.JSON){let c=new Uint8Array(e,Po+o,a);this.content=n.decode(c)}else if(l===Lp.BIN){let c=Po+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Wu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=tt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(let h in o){let u=$u[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=$u[h]||h.toLowerCase();if(o[h]!==void 0){let d=n.accessors[e.attributes[h]],f=Ur[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let g in f.attributes){let x=f.attributes[g],p=l[g];p!==void 0&&(x.normalized=p)}u(f)},a,c,cn,d)})})}},Xu=class{constructor(){this.name=tt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},qu=class{constructor(){this.name=tt.KHR_MESH_QUANTIZATION}},Tl=class extends es{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,x=g-c,p=-2*f+3*d,m=f-d,y=1-p,_=m-d+u;for(let v=0;v!==a;v++){let R=o[x+v+a],w=o[x+v+l]*h,A=o[g+v+a],P=o[g+v]*h;r[v]=y*R+_*w+p*A+m*P}return r}},W_=new sn,Yu=class extends Tl{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return W_.fromArray(r).normalize().toArray(r),r}},Fn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ur={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Dp={9728:nn,9729:_n,9984:iu,9985:ro,9986:rr,9987:ei},Np={33071:$n,33648:uo,10497:rn},bu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},$u={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},rs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},X_={CUBICSPLINE:void 0,LINEAR:yr,STEP:xr},Eu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function q_(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Ae({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Mn})),s.DefaultMaterial}function As(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ii(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Y_(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function $_(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function K_(s){let e,t=s.extensions&&s.extensions[tt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Su(t.attributes):e=s.indices+":"+Su(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Su(s.targets[n]);return e}function Su(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Ku(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Z_(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var J_=new Ce,Zu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new G_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new il(this.options.manager):this.textureLoader=new al(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Mo(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return As(r,a,i),Ii(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(let l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,h]of o.children.entries())r(h,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[tt.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(is.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=bu[i.type],a=Ur[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new lt(c,o,l))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],l=bu[i.type],c=Ur[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,x,p;if(f&&f!==u){let m=Math.floor(d/f),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count,_=t.cache.get(y);_||(x=new c(a,m*f,i.count*f/h),_=new Er(x,f/h),t.cache.add(y,_)),p=new Es(_,l,d%f/h,g)}else a===null?x=new c(i.count*l):x=new c(a,d,i.count*l),p=new lt(x,l,g);if(i.sparse!==void 0){let m=bu.SCALAR,y=Ur[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,R=new y(o[1],_,i.sparse.count*m),w=new c(o[2],v,i.sparse.count*l);a!==null&&(p=new lt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let A=0,P=R.length;A<P;A++){let b=R[A];if(p.setX(b,w[A*l]),l>=2&&p.setY(b,w[A*l+1]),l>=3&&p.setZ(b,w[A*l+2]),l>=4&&p.setW(b,w[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=g}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return h.magFilter=Dp[d.magFilter]||_n,h.minFilter=Dp[d.minFilter]||ei,h.wrapS=Np[d.wrapS]||rn,h.wrapT=Np[d.wrapT]||rn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==nn&&h.minFilter!==_n,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=i.images[e],a=self.URL||self.webkitURL,l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(x){let p=new zt(x);p.needsUpdate=!0,d(p)}),t.load(is.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),Ii(u,o),u.userData.mimeType=o.mimeType||Z_(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[tt.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[tt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=r.associations.get(o);o=r.extensions[tt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new Ss,bn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new yo,bn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Ae}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,a={},l=r.extensions||{},c=[];if(l[tt.KHR_MATERIALS_UNLIT]){let u=i[tt.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new te(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],cn),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,dt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Ct);let h=r.alphaMode||Eu.OPAQUE;if(h===Eu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Eu.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Fe&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Q(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Fe&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Fe){let u=r.emissiveFactor;a.emissive=new te().setRGB(u[0],u[1],u[2],cn)}return r.emissiveTexture!==void 0&&o!==Fe&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,dt)),Promise.all(c).then(function(){let u=new o(a);return r.name&&(u.name=r.name),Ii(u,r),t.associations.set(u,{materials:e}),r.extensions&&As(i,u,r),u})}createUniqueName(e){let t=_t.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[tt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Up(l,a,t)})}let o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a],h=K_(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[tt.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Up(new et,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let h=o[l].material===void 0?q_(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){let x=h[f],p=o[f],m,y=c[f];if(p.mode===Fn.TRIANGLES||p.mode===Fn.TRIANGLE_STRIP||p.mode===Fn.TRIANGLE_FAN||p.mode===void 0)m=r.isSkinnedMesh===!0?new Va(x,y):new ge(x,y),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===Fn.TRIANGLE_STRIP?m.geometry=Mu(m.geometry,dl):p.mode===Fn.TRIANGLE_FAN&&(m.geometry=Mu(m.geometry,So));else if(p.mode===Fn.LINES)m=new Ya(x,y);else if(p.mode===Fn.LINE_STRIP)m=new Sr(x,y);else if(p.mode===Fn.LINE_LOOP)m=new $a(x,y);else if(p.mode===Fn.POINTS)m=new Ji(x,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&$_(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Ii(m,r),p.extensions&&As(i,m,p),t.assignFinalMaterial(m),u.push(m)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&As(i,u[0],r),u[0];let d=new qe;r.extensions&&As(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ut(oi.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Zi(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ii(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){let u=o[c];if(u){a.push(u);let d=new Ce;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Wa(a,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],g=i.samplers[f.sampler],x=f.target,p=x.node,m=i.parameters!==void 0?i.parameters[g.input]:g.input,y=i.parameters!==void 0?i.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",y)),c.push(g),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],g=u[2],x=u[3],p=u[4],m=[];for(let y=0,_=d.length;y<_;y++){let v=d[y],R=f[y],w=g[y],A=x[y],P=p[y];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();let b=n._createAnimationTracks(v,R,w,A,P);if(b)for(let M=0;M<b.length;M++)m.push(b[M])}return new wr(r,void 0,m)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,J_)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new xo:c.length>1?h=new qe:c.length===1?h=c[0]:h=new Ze,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Ii(h,r),r.extensions&&As(n,h,r),r.matrix!==void 0){let u=new Ce;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new qe;n.name&&(r.name=i.createUniqueName(n.name)),Ii(r,n),n.extensions&&As(t,r,n);let o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);let c=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof bn||d instanceof zt)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],a=e.name?e.name:e.uuid,l=[];rs[r.path]===rs.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(rs[r.path]){case rs.weights:c=wi;break;case rs.rotation:c=Ai;break;case rs.position:case rs.scale:c=Ri;break;default:switch(n.itemSize){case 1:c=wi;break;case 2:case 3:default:c=Ri;break}break}let h=i.interpolation!==void 0?X_[i.interpolation]:yr,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){let g=new c(l[d]+"."+rs[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Ku(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Ai?Yu:Tl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function j_(s,e,t){let n=e.attributes,i=new on;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new S(l[0],l[1],l[2]),new S(c[0],c[1],c[2])),a.normalized){let h=Ku(Ur[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new S,l=new S;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let x=Ku(Ur[d.componentType]);l.multiplyScalar(x)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;let o=new Rn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function Up(s,e,t){let n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(let o in n){let a=$u[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){let o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return Ke.workingColorSpace!==cn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),Ii(s,e),j_(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Y_(s,e.targets,t):s})}function Bp(s){let e=new Map,t=new Map,n=s.clone();return Fp(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,o=e.get(i),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Fp(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)Fp(s.children[n],e.children[n],t)}var G=(s,e,t)=>new S(s,e,t),Lt=(s,e,t)=>{let n=Math.max(0,Math.min(1,(t-s)/(e-s)));return n*n*(3-2*n)},Li=(s,e,t,n,i=.6,r=0)=>o=>{let a=s/e+(1-s/e)*Lt(0,t,o),l=o<n?1:Math.max(0,1-((o-n)/(1-n))**2)**i;return e*Math.min(a,Math.max(l,o<1?r/e:0))};function wl(s){let e=s.index?s.toNonIndexed():s;e.attributes.normal||e.computeVertexNormals(),e.attributes.uv||e.setAttribute("uv",new we(new Float32Array(e.attributes.position.count*2),2));for(let t of Object.keys(e.attributes))t!=="position"&&t!=="normal"&&t!=="uv"&&e.deleteAttribute(t);return e.morphAttributes={},e.clearGroups(),e}function Q_(s){let e=s.attributes.position,t=s.index,n=new S,i=new S,r=new S,o=0;for(let a=0;a<t.count;a+=3)n.fromBufferAttribute(e,t.getX(a)),i.fromBufferAttribute(e,t.getX(a+1)),r.fromBufferAttribute(e,t.getX(a+2)),o+=n.dot(i.cross(r));if(o<0)for(let a=0;a<t.count;a+=3){let l=t.getX(a+1);t.setX(a+1,t.getX(a+2)),t.setX(a+2,l)}}function Op(s){let e=s.clone();e.scale(-1,1,1);let t=e.attributes.position,n=e.attributes.normal,i=e.attributes.uv;for(let r=0;r<t.count;r+=3)for(let o of[t,n,i])for(let a=0;a<o.itemSize;a++){let l=o.getComponent(r+1,a);o.setComponent(r+1,a,o.getComponent(r+2,a)),o.setComponent(r+2,a,l)}return e}function Io(s,e){let t=Math.max(6,Math.round((s.nl??60)*e)),n=Math.max(8,Math.round((s.na??36)*e)),i=[],r=[],o=[];for(let l=0;l<=t;l++){let c=l/t,h=s.r(c),u=s.sx?.(c)??1,d=s.sy?.(c)??1,f=s.yc?.(c)??0,g=s.z0+c*s.len;for(let x=0;x<=n;x++){let p=x/n,m=p*Math.PI*2-Math.PI/2,y=h*(s.ripple?.(m)??1);i.push((s.xc??0)+Math.cos(m)*y*u,f+Math.sin(m)*y*d,g),r.push(p,c)}}for(let l=0;l<t;l++)for(let c=0;c<n;c++){let h=l*(n+1)+c,u=h+n+1,d=h+1,f=u+1;s.inward?o.push(h,u,d,d,u,f):o.push(h,d,u,d,f,u)}if(s.capTail&&s.r(0)>.01){let l=i.length/3;i.push(s.xc??0,s.yc?.(0)??0,s.z0),r.push(.5,0);for(let c=0;c<n;c++)o.push(l,c,c+1)}let a=new et;return a.setAttribute("position",new we(i,3)),a.setAttribute("uv",new we(r,2)),a.setIndex(o),a.computeVertexNormals(),wl(a)}var eM=s=>5*(.2969*Math.sqrt(s)-.126*s-.3516*s*s+.2843*s**3-.1036*s**4);function ju(s,e,t,n){let i=s.chord?s.chord(e):s.cr+(s.ct-s.cr)*e,r=s.root[2]+(s.le?s.le(e):-s.sweep*e),o=eM(t)*i*(s.th??.1)*n,a=r-t*i;if(s.twist){let c=s.twist(e),h=r-.25*i,u=a-h;a=h+u*Math.cos(c)-o*Math.sin(c),o=u*Math.sin(c)+o*Math.cos(c)}let l=s.vertical?G(s.root[0]+o,s.root[1]+e*s.span,a):G(s.root[0]+e*s.span,s.root[1]+e*s.span*Math.tan(s.dih??0)+o,a);return s.cant&&l.sub(G(s.root[0],s.root[1],0)).applyAxisAngle(G(0,0,1),s.cant).add(G(s.root[0],s.root[1],0)),l}function Ju(s,e,t,n,i,r){let o=Math.max(1,Math.round((s.ns??12)*r*(i-n)+.5)),a=Math.max(4,Math.round((s.nc??16)*r)),l=[];for(let p=0;p<a;p++)l.push([e+(t-e)*(1-Math.cos(Math.PI*p/(a-1)))/2,1]);for(let p=a-1;p>=0;p--)l.push([l[p][0],-1]);let c=l.length,h=[],u=[],d=[];for(let p=0;p<=o;p++){let m=n+(i-n)*p/o;for(let[y,_]of l){let v=ju(s,m,y,_);h.push(v.x,v.y,v.z),u.push(y,m)}}for(let p=0;p<o;p++)for(let m=0;m<c;m++){let y=p*c+m,_=(p+1)*c+m,v=p*c+(m+1)%c,R=(p+1)*c+(m+1)%c;d.push(y,v,_,v,R,_)}for(let p of[0,o]){let m=0,y=0,_=0;for(let R=0;R<c;R++)m+=h[(p*c+R)*3],y+=h[(p*c+R)*3+1],_+=h[(p*c+R)*3+2];let v=h.length/3;h.push(m/c,y/c,_/c),u.push(.5,p?i:n);for(let R=0;R<c;R++)d.push(v,p*c+R,p*c+(R+1)%c)}let f=new et;f.setAttribute("position",new we(h,3)),f.setAttribute("uv",new we(u,2));let g=o*c*6,x=c*3;for(let p=g;p<g+x;p+=3){let m=d[p+1];d[p+1]=d[p+2],d[p+2]=m}return f.setIndex(d),Q_(f),f.computeVertexNormals(),wl(f)}var Al=class{constructor(e){F(this,"q");F(this,"st",new Map);F(this,"movers",[]);F(this,"lights",[]);F(this,"exhaust",[]);F(this,"decals",[]);F(this,"tips",[G(5,0,-2),G(-5,0,-2)]);F(this,"booster",G(0,-1,-2));F(this,"gearBottom",0);this.q=e}add(e,t){let n=this.st.get(e)??[];return n.push(wl(t)),this.st.set(e,n),this}mover(e,t,n,i,r,o){let a={},l=new Map;for(let[c,h]of o){let u=wl(h.clone());u.translate(-n.x,-n.y,-n.z);let d=l.get(c)??[];d.push(u),l.set(c,d)}for(let[c,h]of l)a[c]=h.length===1?h[0]:El(h);this.movers.push({kind:e,side:t,pivot:n.clone(),axis:i.clone().normalize(),max:r,geos:a})}fuse(e,t){return this.add(e,Io(t,this.q))}wing(e,t,n=[],i=!0){let r=[...new Set([0,1,...n.flatMap(o=>[o.s0,o.s1])])].sort((o,a)=>o-a);for(let o=0;o<r.length-1;o++){let a=r[o],l=r[o+1],c=n.find(g=>g.s0<=a&&g.s1>=l);if(!c||c.c>.01){let g=Ju(t,0,c?c.c:1,a,l,this.q);this.add(e,g),i&&this.add(e,Op(g))}if(!c)continue;let h=Ju(t,c.c,1,a,l,this.q),u=ju(t,a,c.c,0),d=ju(t,l,c.c,0),f=d.clone().sub(u);this.mover(c.kind,1,u,f,c.max,[[e,h]]),i&&this.mover(c.kind,-1,G(-u.x,u.y,u.z),G(-f.x,f.y,f.z),c.max,[[e,Op(h)]])}}cockpit(e,t,n,i,r,o=1){this.fuse("glass",{z0:e,len:t,r:l=>Math.sin(Math.PI*Math.min(1,l*1.05))**.55,sx:()=>n,sy:()=>i,yc:()=>r,nl:24,na:28});let a=new En(1,.05,6,24,Math.PI).scale(n,i,1).translate(0,r,e+t*.55);this.add("metal",a);for(let l=0;l<o;l++){let c=e+t*(o===1?.42:.62-l*.38);this.add("cabin",new Ye(n*.9,i*1.1,.18).translate(0,r-i*.2,c-.42)),this.add("cabin",new Ye(n*.9,.16,.6).translate(0,r-i*.75,c-.12)),this.add("suit",new ji(n*.32,i*.55,4,10).translate(0,r-i*.25,c-.18)),this.add("helmet",new $t(n*.3,16,12).translate(0,r+i*.42,c-.12)),this.add("dark",new $t(n*.31,14,10,-Math.PI*.35,Math.PI*.7,Math.PI*.32,Math.PI*.3).translate(0,r+i*.42,c-.12))}this.add("cabin",new Ye(n*1.3,i*.35,.3).translate(0,r-i*.15,e+t*.82))}turbofan(e,t,n,i="white"){this.fuse(i,{z0:e.z-n/2,len:n,r:l=>t*(.72+.28*Lt(0,.45,l))*(l>.92?.94+.06*Math.cos((l-.92)/.08*Math.PI/2):1),xc:e.x,yc:()=>e.y,nl:22,na:28}),this.fuse("dark",{z0:e.z+n*.1,len:n*.4,r:()=>t*.86,xc:e.x,yc:()=>e.y,inward:!0,nl:3,na:28});let r=[],o=18;for(let l=0;l<o;l++)r.push(["metal",new Ye(.06,t*.82,t*.18).rotateY(.5).translate(0,t*.44,0).rotateZ(l*Math.PI*2/o)]);r.push(["dark",Io({z0:-t*.05,len:t*.55,r:l=>t*.3*Math.sqrt(Math.max(0,1-l*l)),nl:8,na:16},this.q)]);let a=e.z+n*.36;this.mover("spin",1,G(e.x,e.y,a),G(0,0,1),0,r.map(([l,c])=>[l,c.clone().translate(e.x,e.y,a)])),this.fuse("metal",{z0:e.z-n/2-t*.5,len:t*.7,r:l=>t*.42*(.2+.8*l),xc:e.x,yc:()=>e.y,nl:6,na:16}),this.exhaust.push({pos:G(e.x,e.y,e.z-n/2-.2),r:t*.7,kind:"fan"})}nozzle(e,t,n){this.fuse("dark",{z0:e.z-n,len:n,r:i=>t*(.88+.12*i),ripple:i=>1+.035*Math.cos(i*14),xc:e.x,yc:()=>e.y,nl:6,na:42}),this.fuse("dark",{z0:e.z-n,len:n*.9,r:()=>t*.8,xc:e.x,yc:()=>e.y,inward:!0,nl:3,na:28}),this.add("glow",new Qi(t*.78,24).rotateY(Math.PI).translate(e.x,e.y,e.z-n*.55)),this.add("metal",new En(t*.9,t*.06,6,28).translate(e.x,e.y,e.z-n)),this.exhaust.push({pos:G(e.x,e.y,e.z-n-.1),r:t*.8,kind:"jet"})}propeller(e,t,n,i="paint",r=t*.45){let o=[];o.push([i,Io({z0:-r*.2,len:r,r:l=>t*.2*Math.sqrt(Math.max(0,1-l**2.2)),nl:12,na:20},this.q)]);let a=Ju({root:[0,t*.12,t*.08],span:t*.88,cr:t*.24,ct:t*.09,sweep:.02,th:.12,vertical:!0,twist:l=>.95-.7*l,ns:6,nc:8},0,1,0,1,this.q);for(let l=0;l<n;l++)o.push(["dark",a.clone().rotateZ(l*Math.PI*2/n)]);this.mover("spin",1,e,G(0,0,1),0,o.map(([l,c])=>[l,c.clone().translate(e.x,e.y,e.z)])),this.mover("blur",1,e,G(0,0,1),0,[["blur",new Qi(t,32).translate(e.x,e.y,e.z+.05)]]),this.exhaust.push({pos:G(e.x,e.y,e.z-.5),r:t*.15,kind:"prop"})}gear(e,t,n,i,r=!1,o=!1){let a=[];a.push(["metal",new $e(n*.16,n*.16,t*.62,8).translate(e.x,e.y-t*.31,e.z)]),a.push(["dark",new $e(n*.11,n*.11,t*.45,8).translate(e.x,e.y-t*.75,e.z)]);let l=e.y-t,c=r?[-n*.55,n*.55]:[0];a.push(["metal",new $e(n*.08,n*.08,r?n*1.6:n*.7,6).rotateZ(Math.PI/2).translate(e.x,l,e.z)]);for(let u of c)a.push(["rubber",new En(n*.72,n*.28,10,22).rotateY(Math.PI/2).translate(e.x+u,l,e.z)]),a.push(["metal",new $e(n*.52,n*.52,n*.42,16).rotateZ(Math.PI/2).translate(e.x+u,l,e.z)]);o&&a.push(["paint",Io({z0:e.z-n*1.4,len:n*2.9,r:u=>n*1.1*Math.sin(Math.PI*Math.min(1,u))**.6,sx:()=>.5,xc:e.x,yc:()=>l+n*.15,nl:14,na:16},this.q)]),i!=="fixed"&&a.push(["paint",new Ye(.06,t*.7,n*2.2).translate(e.x+(e.x>=0?n*.75:-n*.75),e.y-t*.35,e.z)]),this.gearBottom=Math.min(this.gearBottom,l-n);let h=i==="fwd"?G(1,0,0):i==="back"?G(-1,0,0):i==="in"?G(0,0,e.x>=0?-1:1):G(0,0,e.x>=0?1:-1);this.mover("gear",e.x>=0?1:-1,e,h,i==="fixed"?0:Math.PI/2*.98,a)}build(e,t,n,i,r){let o={},a=0;for(let[l,c]of this.st)o[l]=c.length===1?c[0]:El(c),a+=o[l].attributes.position.count/3;for(let l of this.movers)for(let c of Object.values(l.geos))a+=c.attributes.position.count/3;return{key:e,livery:t,size:n,gearH:-this.gearBottom,retract:i,prop:r,statics:o,movers:this.movers,lights:this.lights,exhaust:this.exhaust,tips:this.tips,decals:this.decals,booster:this.booster,tris:a}}},Di=(s,e,t,n,i)=>{s.lights.push({pos:e,kind:"red"},{pos:G(-e.x,e.y,e.z),kind:"green"},{pos:e.clone().add(G(0,0,-.3)),kind:"strobe"},{pos:G(-e.x,e.y,e.z-.3),kind:"strobe"},{pos:t,kind:"white"},{pos:n,kind:"beacon"},{pos:i,kind:"beacon"})},kp={fighter:s=>{s.fuse("paint",{z0:-7.4,len:15,r:Li(.62,1.05,.14,.62,.7),sx:e=>1.12+.15*Lt(.2,.5,e)*(1-Lt(.6,.85,e)),sy:()=>.86,yc:e=>.12*Lt(.45,.7,e)*(1-Lt(.8,1,e))}),s.add("metal",new $e(.03,.05,1.6,6).rotateX(Math.PI/2).translate(0,.02,8.3)),s.fuse("paint",{z0:-1.5,len:5.2,r:e=>.62*(.85+.15*Lt(0,.2,e))*(e>.96?.97:1),sx:()=>1.15,sy:()=>.75,yc:()=>-.95,nl:18,na:28}),s.fuse("dark",{z0:2.2,len:1.5,r:()=>.52,sx:()=>1.15,sy:()=>.72,yc:()=>-.95,inward:!0,nl:2,na:28}),s.cockpit(2,3.6,.6,.62,.62),s.wing("wing",{root:[.95,-.15,1.3],span:4.4,cr:4,ct:1.25,sweep:2.9,th:.055},[{kind:"aileron",c:.76,s0:.08,s1:.8,max:.35}]),s.wing("paint",{root:[.75,0,4.6],span:.55,cr:3.2,ct:.4,sweep:2.6,th:.04}),s.wing("wing",{root:[.85,-.1,-4.6],span:2.5,cr:2.3,ct:.95,sweep:1.5,th:.045,dih:-.08},[{kind:"elevator",c:0,s0:0,s1:1,max:.3}]),s.wing("paint",{root:[0,.75,-2.9],span:3.3,cr:3.2,ct:1.15,sweep:2.2,th:.055,vertical:!0},[{kind:"rudder",c:.72,s0:.08,s1:.85,max:.35}],!1);for(let e of[1,-1])s.wing("paint",{root:[e*.6,-.8,-4],span:.8,cr:1.3,ct:.7,sweep:.6,th:.04,vertical:!0,cant:e*2.6},[],!1),s.add("white",Io({z0:-2.6,len:3,r:t=>.11*Math.min(1,(1-t)*6+.2)*(t>.85?(1-t)/.15*.6+.4:1),xc:e*5.45,yc:()=>-.2,nl:10,na:10},s.q)),s.add("dark",new Ye(.06,.18,1.6).translate(e*5.42,-.06,-1.6));s.nozzle(G(0,.02,-7.35),.62,1.1),s.gear(G(0,-.95,3.4),1.55,.3,"back");for(let e of[1,-1])s.gear(G(e*1.05,-.8,-1.4),1.6,.38,"fwd");return Di(s,G(5.35,-.15,-1.9),G(0,3.9,-5.3),G(0,.85,-.5),G(0,-1.6,.2)),s.tips=[G(5.45,-.2,-2.6),G(-5.45,-.2,-2.6)],s.decals.push({pos:G(0,2.3,-4.2),w:1.6,h:1.6,side:1},{pos:G(0,2.3,-4.2),w:1.6,h:1.6,side:-1}),s.booster=G(0,-1.6,-2.5),{livery:"military",size:15}},airliner:s=>{s.fuse("paint",{z0:-10.5,len:21,r:Li(.2,1.62,.26,.86,.5),sy:()=>1.04,yc:e=>.95*(1-Lt(0,.26,e))-.12*Lt(.88,1,e),nl:70,na:40}),s.fuse("glass",{z0:8.15,len:1.45,r:e=>Math.sin(Math.PI*e)**.5,sx:()=>1.05,sy:()=>.32,yc:()=>.7,nl:10,na:20}),s.wing("wing",{root:[1.35,-.85,1.6],span:7.6,cr:4.6,ct:1.25,sweep:3.9,th:.11,dih:.1},[{kind:"flap",c:.74,s0:.04,s1:.58,max:.6},{kind:"aileron",c:.74,s0:.62,s1:.92,max:.35}]),s.wing("wing",{root:[8.95,.05,-2.2],span:1.5,cr:1.2,ct:.5,sweep:.9,th:.08,vertical:!0,cant:-.25},[],!1),s.wing("wing",{root:[-8.95,.05,-2.2],span:1.5,cr:1.2,ct:.5,sweep:.9,th:.08,vertical:!0,cant:.25},[],!1);for(let e of[1,-1])s.turbofan(G(e*3.1,-1.75,1.6),.82,3.4),s.wing("wing",{root:[e*3.1,-1.05,1.9],span:.55,cr:2.6,ct:2.3,sweep:.3,th:.1,vertical:!0},[],!1);s.wing("paint",{root:[0,1.6,-6.2],span:4.6,cr:4.5,ct:1.6,sweep:3.6,th:.1,vertical:!0},[{kind:"rudder",c:.7,s0:.05,s1:.95,max:.3}],!1),s.wing("wing",{root:[.5,.95,-7.3],span:3.8,cr:2.8,ct:1,sweep:2.1,th:.09,dih:.12},[{kind:"elevator",c:.68,s0:.05,s1:.95,max:.3}]),s.gear(G(0,-1.2,7),1.45,.38,"fwd",!0);for(let e of[1,-1])s.gear(G(e*1.9,-1.15,-.4),1.55,.5,"in",!0);return Di(s,G(8.9,-.05,-2),G(0,.95,-10.6),G(0,1.7,0),G(0,-1.75,1)),s.tips=[G(9,1.4,-3),G(-9,1.4,-3)],s.decals.push({pos:G(0,3.6,-8.2),w:2.3,h:2.3,side:1},{pos:G(0,3.6,-8.2),w:2.3,h:2.3,side:-1}),s.booster=G(0,-2,-3),{livery:"airline",size:21}},prop:s=>{s.fuse("paint",{z0:-5,len:9.6,r:Li(.12,.72,.4,.84,.35,.42),sy:t=>1.15-.1*t,yc:t=>.1*Lt(.4,.6,t),nl:56}),s.add("dark",new Ye(.12,.9,1.6).translate(0,-.95,-.6)),s.cockpit(-.2,2.2,.48,.55,.62);let e=t=>2.25*Math.sqrt(Math.max(.04,1-t*t));s.wing("wing",{root:[.55,-.4,1.35],span:5.2,cr:2.25,ct:.5,sweep:0,chord:e,le:t=>-.6*(1-Math.sqrt(Math.max(0,1-t*t))),th:.13,dih:.1},[{kind:"flap",c:.76,s0:.05,s1:.45,max:.5},{kind:"aileron",c:.76,s0:.5,s1:.9,max:.4}]),s.wing("wing",{root:[.25,.15,-3.9],span:2,cr:1.4,ct:.6,sweep:.3,th:.09,chord:t=>1.4*Math.sqrt(Math.max(.1,1-t*t))},[{kind:"elevator",c:.62,s0:.05,s1:.95,max:.35}]),s.wing("paint",{root:[0,.4,-3.6],span:1.7,cr:1.6,ct:.6,sweep:.5,th:.09,vertical:!0,chord:t=>1.6*Math.sqrt(Math.max(.15,1-t*t))},[{kind:"rudder",c:.6,s0:.05,s1:.95,max:.4}],!1);for(let t of[1,-1])for(let n=0;n<3;n++)s.add("dark",new Ye(.14,.12,.3).translate(t*.64,.22,2.6+n*.38));s.propeller(G(0,.05,4.75),1.75,4,"paint");for(let t of[1,-1])s.gear(G(t*1.5,-.55,1.3),1.55,.42,"in");return s.gear(G(0,-.35,-4.4),.45,.16,"fixed"),Di(s,G(5.7,.15,.9),G(0,.4,-5.05),G(0,.75,-1.5),G(0,-.8,-1.2)),s.exhaust=[{pos:G(.7,.22,2.5),r:.12,kind:"prop"},{pos:G(-.7,.22,2.5),r:.12,kind:"prop"}],s.tips=[G(5.75,.15,.6),G(-5.75,.15,.6)],s.decals.push({pos:G(0,1.2,-4),w:1,h:1,side:1},{pos:G(0,1.2,-4),w:1,h:1,side:-1}),s.booster=G(0,-1,-1.5),{livery:"warbird",size:10,prop:!0}},supersonic:s=>{s.fuse("paint",{z0:-10.6,len:21.6,r:Li(.35,.95,.12,.7,.9),sy:()=>1.08,yc:t=>-.15*Lt(.9,1,t),nl:72}),s.add("metal",new $e(.02,.04,1.4,6).rotateX(Math.PI/2).translate(0,-.15,11.6)),s.fuse("glass",{z0:6.4,len:1.2,r:t=>Math.sin(Math.PI*t)**.5,sx:()=>.7,sy:()=>.25,yc:()=>.75,nl:8,na:16});let e=t=>-11.2*t**.55+2*t;s.wing("wing",{root:[.55,-.55,4.6],span:4.6,cr:13.2,ct:1,sweep:0,chord:t=>13.2-12.2*t**.8,le:e,th:.03,ns:16},[{kind:"elevator",c:.82,s0:.08,s1:.9,max:.25}]);for(let t of[1,-1]){s.fuse("paint",{z0:-8.3,len:4.6,r:n=>.6*(.9+.1*Lt(0,.3,n)),sx:()=>1.65,sy:()=>.85,xc:t*1.65,yc:()=>-1,nl:14,na:24});for(let n of[-.5,.5])s.nozzle(G(t*1.65+n,-1,-8.25),.4,.5)}s.wing("paint",{root:[0,.6,-5.6],span:3.8,cr:4.6,ct:1.5,sweep:3.6,th:.05,vertical:!0},[{kind:"rudder",c:.72,s0:.05,s1:.95,max:.3}],!1),s.gear(G(0,-.85,5.2),2.1,.32,"fwd",!0);for(let t of[1,-1])s.gear(G(t*1.6,-1.2,-3.2),1.95,.42,"in",!0);return Di(s,G(5.15,-.65,-6.5),G(0,4.3,-9.5),G(0,1,-1),G(0,-1.05,0)),s.tips=[G(5.15,-.6,-6.8),G(-5.15,-.6,-6.8)],s.decals.push({pos:G(0,2.4,-7.6),w:2,h:2,side:1},{pos:G(0,2.4,-7.6),w:2,h:2,side:-1}),s.booster=G(0,-1.6,-2),{livery:"supersonic",size:22}},bizjet:s=>zp(s,!1),golden:s=>zp(s,!0),transport:s=>{s.fuse("paint",{z0:-9.5,len:19,r:Li(.3,1.95,.32,.84,.55,.5),sy:e=>1-.06*Lt(.3,.8,e),yc:e=>1.1*(1-Lt(0,.32,e)),nl:64,na:40}),s.fuse("glass",{z0:6.6,len:1.6,r:e=>Math.sin(Math.PI*e)**.5,sx:()=>1.1,sy:()=>.42,yc:()=>1.15,nl:10,na:20});for(let e of[1,-1])s.fuse("paint",{z0:-2.4,len:5.6,r:t=>.85*Math.sin(Math.PI*t)**.4,sx:()=>.8,sy:()=>.85,xc:e*1.85,yc:()=>-1.25,nl:16,na:20});s.wing("wing",{root:[1.2,1.75,1.6],span:9.8,cr:3.4,ct:2,sweep:.5,th:.15,dih:-.015},[{kind:"flap",c:.74,s0:.04,s1:.55,max:.6},{kind:"aileron",c:.74,s0:.6,s1:.92,max:.35}]);for(let e of[1,-1])for(let t of[3.4,7])s.fuse("paint",{z0:-1.6,len:5,r:n=>.55*(.4+.6*Lt(0,.3,n))*(n>.85?1-(n-.85)*2.5:1),sy:()=>1.15,xc:e*t,yc:()=>1.55,nl:16,na:20}),s.propeller(G(e*t,1.55,3.55),1.9,4,"paint",.8);s.exhaust=[{pos:G(3.4,1.4,-1.6),r:.2,kind:"fan"},{pos:G(-3.4,1.4,-1.6),r:.2,kind:"fan"}],s.wing("paint",{root:[0,2.2,-6.4],span:5.2,cr:4.4,ct:2.1,sweep:2.4,th:.11,vertical:!0},[{kind:"rudder",c:.68,s0:.05,s1:.95,max:.3}],!1),s.wing("wing",{root:[.5,2,-7.6],span:4.6,cr:2.8,ct:1.5,sweep:.7,th:.1},[{kind:"elevator",c:.66,s0:.05,s1:.95,max:.3}]),s.gear(G(0,-1.4,6.4),.95,.42,"fwd",!0);for(let e of[1,-1])s.gear(G(e*1.85,-1.4,-.2),.95,.55,"out");return Di(s,G(11,1.6,.9),G(0,7.4,-9.2),G(0,2,0),G(0,-2,2)),s.tips=[G(11,1.55,.2),G(-11,1.55,.2)],s.decals.push({pos:G(0,4.8,-8.3),w:2.4,h:2.4,side:1},{pos:G(0,4.8,-8.3),w:2.4,h:2.4,side:-1}),s.booster=G(0,-2.2,-2),{livery:"transport",size:20,prop:!0}},stunt:s=>{s.fuse("paint",{z0:-3.9,len:7.4,r:Li(.1,.62,.5,.82,.3,.42),sx:()=>.95,sy:e=>1.18-.18*e,yc:e=>.08*Lt(.3,.6,e),nl:48}),s.cockpit(-.4,2.4,.5,.62,.6),s.wing("wing",{root:[.45,-.3,1.5],span:3.6,cr:2,ct:1.15,sweep:.1,th:.16},[{kind:"aileron",c:.7,s0:.05,s1:.95,max:.55}]),s.wing("wing",{root:[.2,.2,-2.7],span:1.6,cr:1.15,ct:.75,sweep:.1,th:.1},[{kind:"elevator",c:.5,s0:.03,s1:.97,max:.45}]),s.wing("paint",{root:[0,.5,-2.3],span:1.45,cr:1.4,ct:.75,sweep:.55,th:.1,vertical:!0},[{kind:"rudder",c:.5,s0:.03,s1:.97,max:.5}],!1),s.propeller(G(0,.05,3.65),1.25,3,"white");for(let e of[1,-1])s.add("metal",new Ye(.08,1.1,.25).rotateZ(e*.45).translate(e*.55,-.85,1.4)),s.gear(G(e*.85,-.85,1.4),.55,.3,"fixed",!1,!0);return s.gear(G(0,-.15,-3.7),.3,.1,"fixed"),Di(s,G(4.05,-.3,.9),G(0,.5,-3.95),G(0,.7,-1),G(0,-.65,-.5)),s.exhaust=[{pos:G(.55,-.4,2.4),r:.1,kind:"prop"},{pos:G(-.55,-.4,2.4),r:.1,kind:"prop"}],s.tips=[G(4.05,-.3,.7),G(-4.05,-.3,.7)],s.decals.push({pos:G(0,1.15,-2.9),w:.9,h:.9,side:1},{pos:G(0,1.15,-2.9),w:.9,h:.9,side:-1}),s.booster=G(0,-.9,-1),{livery:"stunt",size:7.5,retract:!1,prop:!0}},racer:s=>{s.fuse("paint",{z0:-6,len:12.4,r:Li(.48,.82,.12,.42,1.05),sx:e=>1.05+.25*Lt(.15,.4,e)*(1-Lt(.45,.65,e)),sy:()=>.85,yc:e=>.1*Lt(.4,.55,e),nl:64}),s.add("metal",new $e(.02,.04,2.2,6).rotateX(Math.PI/2).translate(0,0,7.5)),s.cockpit(.6,2.6,.5,.6,.5);for(let e of[1,-1])s.fuse("paint",{z0:-2.5,len:3.6,r:t=>.42*(.8+.2*Lt(0,.3,t)),sx:()=>.75,sy:()=>1.1,xc:e*.95,yc:()=>-.1,nl:12,na:20}),s.fuse("dark",{z0:.6,len:.5,r:()=>.36,sx:()=>.75,sy:()=>1.1,xc:e*.95,yc:()=>-.1,inward:!0,nl:2,na:20});s.wing("wing",{root:[.95,-.2,2.3],span:1.2,cr:.9,ct:.35,sweep:.7,th:.05}),s.wing("wing",{root:[.95,-.25,-.6],span:4.3,cr:3,ct:.75,sweep:2.8,th:.06,dih:-.05},[{kind:"aileron",c:.75,s0:.25,s1:.9,max:.4}]),s.wing("paint",{root:[0,.6,-3.4],span:2.6,cr:2.5,ct:.9,sweep:2,th:.06,vertical:!0},[{kind:"rudder",c:.7,s0:.1,s1:.9,max:.35}],!1),s.wing("wing",{root:[.5,.1,-4.6],span:1.8,cr:1.5,ct:.6,sweep:1,th:.05,dih:.25},[{kind:"elevator",c:0,s0:0,s1:1,max:.3}]),s.nozzle(G(0,0,-5.95),.48,.8),s.gear(G(0,-.65,3),1,.26,"back");for(let e of[1,-1])s.gear(G(e*1,-.6,-1.4),1.05,.3,"in");return Di(s,G(5.25,-.4,-3.3),G(0,3.2,-5.2),G(0,.75,-1),G(0,-.75,0)),s.tips=[G(5.25,-.45,-3.6),G(-5.25,-.45,-3.6)],s.decals.push({pos:G(0,1.85,-4.2),w:1.3,h:1.3,side:1},{pos:G(0,1.85,-4.2),w:1.3,h:1.3,side:-1}),s.booster=G(0,-1.2,-2),{livery:"racer",size:12.4}},future:s=>{s.fuse("paint",{z0:-6.5,len:13.5,r:Li(.55,1.05,.12,.5,.95),sx:e=>1.6-.5*Lt(.45,.9,e),sy:()=>.6,yc:e=>.08*Lt(.4,.6,e),nl:64}),s.cockpit(1.4,3,.55,.45,.42),s.wing("wing",{root:[1.4,-.1,-1],span:5,cr:3.4,ct:1.2,sweep:-1.6,th:.05,dih:.04},[{kind:"aileron",c:.72,s0:.2,s1:.92,max:.4}]),s.wing("wing",{root:[.8,0,3.4],span:1.6,cr:1.6,ct:.5,sweep:1,th:.04});for(let e of[1,-1])s.wing("paint",{root:[e*1.2,.35,-3.4],span:2.4,cr:2.4,ct:1,sweep:1.6,th:.05,vertical:!0,cant:-e*.45},[{kind:"rudder",c:.7,s0:.1,s1:.9,max:.3}],!1),s.nozzle(G(e*.75,0,-6.45),.48,.9);s.gear(G(0,-.6,3.2),1.05,.28,"back");for(let e of[1,-1])s.gear(G(e*1.3,-.55,-1.6),1.05,.32,"in");return Di(s,G(6.4,.1,-1.6),G(0,.2,-6.6),G(0,.65,0),G(0,-.65,0)),s.tips=[G(6.4,.1,0),G(-6.4,.1,0)],s.decals.push({pos:G(1.65,1.45,-4.4),w:1.1,h:1.1,side:1},{pos:G(-1.65,1.45,-4.4),w:1.1,h:1.1,side:-1}),s.booster=G(0,-1.1,-2),{livery:"future",size:13.5}}};function zp(s,e){s.fuse("paint",{z0:-7.6,len:15.4,r:Li(.18,1.12,.3,.8,.55),sy:()=>1.04,yc:t=>.55*(1-Lt(0,.3,t))-.08*Lt(.85,1,t),nl:64}),s.fuse("glass",{z0:5.25,len:1.25,r:t=>Math.sin(Math.PI*t)**.5,sx:()=>.8,sy:()=>.3,yc:()=>.52,nl:10,na:20}),s.wing("wing",{root:[.95,-.7,1.2],span:6.2,cr:3.4,ct:.95,sweep:3.2,th:.1,dih:.07},[{kind:"flap",c:.74,s0:.05,s1:.6,max:.55},{kind:"aileron",c:.74,s0:.64,s1:.92,max:.35}]);for(let t of[1,-1])s.wing("wing",{root:[t*7.1,-.25,-2.3],span:1.2,cr:1,ct:.45,sweep:.7,th:.08,vertical:!0,cant:-t*.2},[],!1);for(let t of[1,-1])s.turbofan(G(t*1.75,.55,-4.6),.55,2.6,e?"metal":"white"),s.wing("paint",{root:[t*.8,.45,-4],span:.75,cr:1.4,ct:1.2,sweep:.2,th:.1},[],!1);e&&s.turbofan(G(0,1.55,-6.2),.5,2.2,"metal"),s.wing("paint",{root:[0,1,-5],span:2.8,cr:3,ct:1.9,sweep:2.4,th:.1,vertical:!0},[{kind:"rudder",c:.7,s0:.05,s1:.85,max:.3}],!1),s.wing("wing",{root:[.2,3.7,-7.4],span:2.7,cr:1.8,ct:.8,sweep:1.2,th:.09,dih:.04},[{kind:"elevator",c:.66,s0:.05,s1:.95,max:.3}]),s.gear(G(0,-.85,4.8),1,.3,"fwd",!0);for(let t of[1,-1])s.gear(G(t*1.5,-.85,-.6),1.05,.38,"in");return Di(s,G(7.1,-.25,-1.9),G(0,3.75,-9),G(0,1.15,0),G(0,-1.2,1)),s.tips=[G(7.25,.9,-2.9),G(-7.25,.9,-2.9)],s.decals.push({pos:G(0,2.4,-6.5),w:1.7,h:1.7,side:1},{pos:G(0,2.4,-6.5),w:1.7,h:1.7,side:-1}),s.booster=G(0,-1.4,-2),{livery:e?"golden":"bizjet",size:15.4}}var tM={paint:"paint",wing:"paint",white:"paint",metal:"metal",dark:"dark",rubber:"dark",glass:"dark",cabin:"dark",suit:"dark",helmet:"dark",glow:null,blur:null};function Vp(s){let e=kp[s]??kp.fighter,t=new Al(1),n=e(t),i=t.build(s,n.livery,n.size,n.retract??!0,n.prop??!1),r=new Al(.32);e(r);let o=r.build(s,n.livery,n.size,!0,!1),a=new Map,l=(h,u,d)=>{let f=tM[h];if(!f)return;let g=u.clone();d&&g.translate(d.x,d.y,d.z);let x=a.get(f)??[];x.push(g),a.set(f,x)};for(let[h,u]of Object.entries(o.statics))l(h,u);for(let h of o.movers)if(h.kind!=="gear"&&h.kind!=="blur")for(let[u,d]of Object.entries(h.geos))l(u,d,h.pivot);let c={};for(let[h,u]of a)c[h]=El(u);return{...i,low:c}}var nM=null;function Do(){return nM??(nM={metal:new Ae({name:"metal",color:12173512,metalness:1,roughness:.3}),dark:new Ae({name:"dark",color:3422013,metalness:.85,roughness:.42}),rubber:new Ae({name:"rubber",color:1381914,metalness:0,roughness:.92}),glass:new vt({name:"glass",color:10405631,metalness:.1,roughness:.04,transparent:!0,opacity:.32,clearcoat:1,clearcoatRoughness:.02,envMapIntensity:2.2,depthWrite:!1,side:Ct}),cabin:new Ae({name:"cabin",color:2829875,metalness:.1,roughness:.85}),suit:new Ae({name:"suit",color:5991237,metalness:0,roughness:.9}),helmet:new vt({name:"helmet",color:15921906,metalness:.1,roughness:.25,clearcoat:1}),white:new vt({name:"white",color:16054008,metalness:.15,roughness:.3,clearcoat:.8,clearcoatRoughness:.1}),blur:new Fe({name:"blur",color:1710618,transparent:!0,opacity:.16,depthWrite:!1,side:Ct})})}var Ft=s=>"#"+(s&16777215).toString(16).padStart(6,"0"),Lo=(s,e)=>{let t=new te(s),n={h:0,s:0,l:0};return t.getHSL(n),t.setHSL(n.h,n.s,Math.max(0,Math.min(1,n.l*e))),Ft(t.getHex())},Rl=(s,e,t)=>Ft(new te(s).lerp(new te(e),t).getHex());function Br(s,e){let t=document.createElement("canvas");return t.width=s,t.height=e,[t,t.getContext("2d")]}function Fr(s,e=!0){let t=new Pt(s);return e&&(t.colorSpace=dt),t.anisotropy=8,t.wrapS=t.wrapT=$n,t}function os(s,e,t,n,i=.16){s.save(),s.strokeStyle=`rgba(0,0,0,${i})`,s.lineWidth=1;for(let r=n*.5;r<t;r+=n)s.beginPath(),s.moveTo(0,r),s.lineTo(e,r),s.stroke();for(let r=0;r<e;r+=e/8)s.beginPath(),s.moveTo(r,0),s.lineTo(r,t),s.stroke();s.fillStyle=`rgba(0,0,0,${i*.8})`;for(let r=n*.5;r<t;r+=n)for(let o=3;o<e;o+=9)s.fillRect(o,r-2.5,1.2,1.2);s.restore()}function hn(s,e,t,n,i,r,o,a,l="900"){s.save(),s.translate(t*a,n),s.rotate(o===1?Math.PI/2:-Math.PI/2),s.font=`italic ${l} ${i}px "Segoe UI", Arial`,s.textAlign="center",s.textBaseline="middle",s.fillStyle=r,s.fillText(e,0,0),s.restore()}function Hr(s,e,t,n,i,r,o=!1){s.fillStyle="#1b2433";for(let a=t;a<n;a+=r)s.beginPath(),o?s.ellipse(e*i,a,3.4,5,0,0,Math.PI*2):s.roundRect(e*i-2.6,a-3.2,5.2,6.4,2.2),s.fill()}function iM(s,e,t){let[r,o]=Br(256,1024),a=(u,d,f)=>{o.fillStyle=f,o.fillRect(u*256,0,(d-u)*256,1024)},l=null;switch(s){case"military":{a(0,1,Ft(e)),a(0,.18,Lo(e,1.35)),a(.82,1,Lo(e,1.35)),o.fillStyle="#3d4047",o.fillRect(0,0,256,1024*.07),os(o,256,1024,46,.22),hn(o,`AF ${t}`,.3,1024*.62,26,"rgba(20,20,20,0.75)",1,256,"800"),hn(o,`AF ${t}`,.7,1024*.62,26,"rgba(20,20,20,0.75)",-1,256,"800"),o.fillStyle="rgba(255,240,0,0.8)",o.fillRect(.2*256,1024*.25,10,10),o.fillRect(.75*256,1024*.25,10,10);break}case"airline":case"bizjet":case"supersonic":{a(0,1,"#f3f5f8"),a(0,.2,Ft(e)),a(.8,1,Ft(e));for(let[u,d]of[[.21,1],[.79,-1]]){o.beginPath(),o.moveTo(u*256,0);for(let f=0;f<=1024;f+=16)o.lineTo((u+d*(.05+.04*Math.sin(f/1024*Math.PI)))*256,f);o.lineTo(u*256-d*2,1024),o.closePath(),o.fillStyle=Ft(e),o.fill(),o.strokeStyle="#d9b44a",o.lineWidth=3,o.stroke()}s==="airline"&&(Hr(o,.335,1024*.16,1024*.82,256,13),Hr(o,.665,1024*.16,1024*.82,256,13)),s==="bizjet"&&(Hr(o,.34,1024*.22,1024*.6,256,34,!0),Hr(o,.66,1024*.22,1024*.6,256,34,!0)),s!=="supersonic"&&(hn(o,"SKY RACE",.4,1024*.48,34,Ft(e),1,256),hn(o,"SKY RACE",.6,1024*.48,34,Ft(e),-1,256)),hn(o,`VN-${t}`,.3,1024*.9,18,"#2a2e36",1,256,"700"),hn(o,`VN-${t}`,.7,1024*.9,18,"#2a2e36",-1,256,"700"),o.strokeStyle="rgba(0,0,0,0.3)",o.lineWidth=1.5;for(let u of[.32,.68])o.strokeRect(u*256-7,1024*.1,14,30),o.strokeRect(u*256-7,1024*.84,14,28);os(o,256,1024,64,.06);break}case"golden":{let u=o.createLinearGradient(0,0,256,0);u.addColorStop(0,"#8a6418"),u.addColorStop(.35,"#f6d77a"),u.addColorStop(.5,"#fff1b8"),u.addColorStop(.65,"#f6d77a"),u.addColorStop(1,"#8a6418"),o.fillStyle=u,o.fillRect(0,0,256,1024),o.strokeStyle="rgba(60,35,0,0.55)",o.lineWidth=2;for(let d of[.2,.8]){o.beginPath();for(let f=0;f<=1024;f+=8)o.lineTo((d+.02*Math.sin(f/30))*256,f);o.stroke()}Hr(o,.34,1024*.22,1024*.62,256,34,!0),Hr(o,.66,1024*.22,1024*.62,256,34,!0),hn(o,"\u265B VIP \u265B",.4,1024*.75,30,"#4a2c00",1,256),hn(o,"\u265B VIP \u265B",.6,1024*.75,30,"#4a2c00",-1,256);break}case"warbird":{a(0,1,Ft(e)),a(0,.22,Lo(e,1.5)),a(.78,1,Lo(e,1.5)),o.fillStyle="#f5c518",o.fillRect(0,0,256,1024*.06);for(let u=0;u<5;u++)o.fillStyle=u%2?"#111":"#f4f4f4",o.fillRect(0,1024*(.78+u*.03),256,1024*.03);for(let u of[.27,.73])for(let[f,g]of[[26,"#1a3d8f"],[18,"#fff"],[9,"#c8102e"]])o.beginPath(),o.ellipse(u*256,563.2,f*.55,f,0,0,Math.PI*2),o.fillStyle=g,o.fill();os(o,256,1024,52,.2);break}case"stunt":{a(0,1,Ft(e));let u=22;for(let d=0;d<1024;d+=u)for(let f=0;f<256;f+=u){let g=(f+u/2)/256;g>.22&&g<.78||(o.fillStyle=(f+d)/u%2?"#111":"#fff",o.fillRect(f,d,u,u))}o.save(),o.translate(256/2,0);for(let d=-6;d<=6;d++)o.beginPath(),o.moveTo(0,0),o.lineTo(d*26-10,1024*.42),o.lineTo(d*26+4,1024*.42),o.closePath(),o.fillStyle=d%2?"rgba(255,255,255,0.9)":"rgba(0,0,0,0.0)",o.fill();o.restore(),hn(o,`SKY ${t}`,.38,1024*.6,34,"#fff",1,256),hn(o,`SKY ${t}`,.62,1024*.6,34,"#fff",-1,256);break}case"racer":{a(0,1,"#30333b"),o.fillStyle="#f4f5f7",o.beginPath(),o.moveTo(0,0),o.lineTo(256,0),o.lineTo(256,1024*.3),o.bezierCurveTo(256*.7,1024*.5,256*.3,1024*.5,0,1024*.3),o.fill(),o.strokeStyle=Ft(e),o.lineWidth=10,o.beginPath(),o.moveTo(0,1024*.3),o.bezierCurveTo(256*.3,1024*.5,256*.7,1024*.5,256,1024*.3),o.stroke(),o.fillStyle=Ft(e),o.fillRect(0,1024*.82,256,1024*.18);for(let u=0;u<6;u++)o.fillStyle="#f4f5f7",o.fillRect(256*.4+u*10,1024*.62,5,40),o.fillRect(256*.6-u*10-5,1024*.62,5,40);hn(o,t,.27,1024*.56,70,"#f4f5f7",1,256),hn(o,t,.73,1024*.56,70,"#f4f5f7",-1,256);break}case"transport":{a(0,1,Rl(e,7305834,.6));for(let u=0;u<70;u++)o.fillStyle=u%2?Rl(e,4147770,.55):Rl(e,10133642,.5),o.beginPath(),o.ellipse(Math.random()*256,Math.random()*1024,10+Math.random()*26,20+Math.random()*60,Math.random()*3,0,Math.PI*2),o.fill();a(0,.14,"#8f968c"),a(.86,1,"#8f968c"),hn(o,`AIR FORCE ${t}`,.38,1024*.5,22,"#1d1f22",1,256,"800"),hn(o,`AIR FORCE ${t}`,.62,1024*.5,22,"#1d1f22",-1,256,"800"),os(o,256,1024,40,.2);break}case"future":{a(0,1,"#1d2129");let[u,d]=Br(256,1024);l=u,d.fillStyle="#000",d.fillRect(0,0,256,1024);for(let f of[o,d]){f.strokeStyle=Ft(e),f.lineWidth=4;for(let g of[.24,.76,.5]){f.beginPath();for(let x=0;x<=1024;x+=8)f.lineTo((g+.03*Math.sin(x/70))*256,x);f.stroke()}f.lineWidth=2;for(let g=120;g<1024;g+=150)f.beginPath(),f.moveTo(0,g),f.lineTo(256,g+40),f.stroke()}o.fillStyle=Lo(e,.45),o.fillRect(0,1024*.85,256,1024*.15),hn(o,`X-${t}`,.33,1024*.62,40,Ft(e),1,256),hn(o,`X-${t}`,.67,1024*.62,40,Ft(e),-1,256),os(o,256,1024,70,.3);break}}let h={airline:[.89,.955],bizjet:[.835,.915],golden:[.835,.915],transport:[.847,.93],supersonic:[.79,.84]}[s];if(h){let u=(1-h[1])*1024,d=(1-h[0])*1024;for(let[f,g]of[[.29,.47],[.53,.71]]){let p=(g-f)/3;for(let m=0;m<3;m++)o.beginPath(),o.roundRect((f+m*p)*256+1.5,u,p*256-3,d-u,3),o.fillStyle="#121a26",o.fill(),o.strokeStyle="rgba(255,255,255,0.35)",o.lineWidth=1,o.stroke()}}return{map:Fr(r),glow:l?Fr(l):null}}function sM(s,e,t){let[r,o]=Br(256,256),a=null,l=s==="airline"||s==="bizjet"||s==="supersonic"?"#d9dee5":s==="golden"?"#e8c45a":s==="racer"?"#f1f2f4":s==="future"?"#1d2129":s==="transport"?Rl(e,7305834,.6):Ft(e);switch(o.fillStyle=l,o.fillRect(0,0,256,256),s){case"airline":case"bizjet":o.fillStyle=Ft(e),o.fillRect(0,0,256,256*.12),o.fillStyle="#9aa3ad",o.fillRect(0,0,256*.08,256);break;case"stunt":{for(let h=0;h<256*.4;h+=32)for(let u=0;u<256;u+=32)o.fillStyle=(u+h)/32%2?"#111":"#fff",o.fillRect(u,h,32,32);o.fillStyle="rgba(255,255,255,0.85)",o.fillRect(0,256*.55,256,18);break}case"racer":o.fillStyle=Ft(e),o.fillRect(0,0,256*.12,256),o.fillRect(0,0,256,10),o.save(),o.translate(256*.5,256*.35),o.rotate(Math.PI/2),o.font='italic 900 90px "Segoe UI"',o.textAlign="center",o.textBaseline="middle",o.fillStyle="#30333b",o.fillText(t,0,0),o.restore();break;case"warbird":for(let[c,h]of[[60,"#1a3d8f"],[42,"#fff"],[22,"#c8102e"]])o.beginPath(),o.arc(256*.45,256*.3,c*.8,0,Math.PI*2),o.fillStyle=h,o.fill();os(o,256,256,40,.2);break;case"military":o.fillStyle="rgba(0,0,0,0.25)",o.fillRect(0,0,256*.06,256),os(o,256,256,36,.22);break;case"golden":o.strokeStyle="rgba(80,50,0,0.5)",o.lineWidth=3,o.strokeRect(10,10,236,236);break;case"transport":o.fillStyle="rgba(0,0,0,0.25)",o.fillRect(0,0,256*.05,256),os(o,256,256,40,.2);break;case"future":{let[c,h]=Br(256,256);a=c,h.fillStyle="#000",h.fillRect(0,0,256,256);for(let u of[o,h])u.fillStyle=Ft(e),u.fillRect(0,0,256*.05,256),u.fillRect(0,0,256,8),u.fillRect(256*.6,0,4,256);break}case"supersonic":o.fillStyle=Ft(e),o.fillRect(0,0,256*.05,256);break}return{map:Fr(r),glow:a?Fr(a):null}}function rM(s,e,t){let[r,o]=Br(256,256);o.clearRect(0,0,256,256);let a=s==="golden"?"#4a2c00":s==="military"||s==="transport"?"rgba(25,25,25,0.85)":"#ffffff";return o.save(),o.translate(256*.5,256*.33),o.beginPath(),o.arc(0,0,50,0,Math.PI*2),o.fillStyle=s==="golden"?"#fff3c4":s==="airline"||s==="bizjet"||s==="supersonic"?Ft(e):"rgba(255,255,255,0.15)",o.fill(),o.lineWidth=5,o.strokeStyle=a,o.stroke(),o.fillStyle=a,o.beginPath(),o.moveTo(-36,10),o.quadraticCurveTo(0,-38,36,10),o.quadraticCurveTo(0,-12,-36,10),o.fill(),o.beginPath(),o.moveTo(-20,22),o.lineTo(0,6),o.lineTo(20,22),o.lineTo(0,14),o.closePath(),o.fill(),s==="golden"&&(o.font='900 34px "Segoe UI"',o.textAlign="center",o.fillText("\u265B",0,-10)),o.restore(),o.font='italic 900 64px "Segoe UI", Arial',o.textAlign="center",o.textBaseline="middle",o.fillStyle=a,o.fillText(t,256*.5,256*.75),o.font='800 22px "Segoe UI"',o.fillText(s==="military"||s==="transport"?"AF":"SKY RACE",256*.5,256*.94),Fr(r)}function Gp(s,e,t){let n=s==="golden",i=iM(s,e,t),r=sM(s,e,t),o=rM(s,e,t),a=(g,x)=>({map:g,color:16777215,metalness:n?1:s==="military"||s==="transport"?.35:.55,roughness:n?.16:s==="military"||s==="transport"?.55:.32,clearcoat:s==="military"||s==="transport"?.2:1,clearcoatRoughness:.06,envMapIntensity:n?1.6:1.1,...x?{emissiveMap:x,emissive:16777215,emissiveIntensity:1.6}:{}}),l=new vt({name:"paint",...a(i.map,i.glow)}),c=new vt({name:"wing",...a(r.map,r.glow)}),h=new Fe({map:o,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,side:Mn}),u=new Fe({color:16747050,toneMapped:!1}),d=Do(),f=n?new Ae({color:Pp,metalness:1,roughness:.2}):null;return{slots:{...d,paint:l,wing:c,glow:u,...f?{metal:f}:{}},decal:h,glow:u,own:[l,c,h,u,...f?[f]:[]],textures:[i.map,r.map,o,...i.glow?[i.glow]:[],...r.glow?[r.glow]:[]]}}function Wp(s){for(let e of s.own)e.dispose();for(let e of s.textures)e.dispose()}var Qu=null;function Xp(){if(Qu)return Qu;let[s,e]=Br(64,64),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.25,"rgba(255,255,255,0.6)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),Qu=Fr(s,!1)}var qp=new Map;function Uo(s){let e=qp.get(s);return e||(e=Vp(s),qp.set(s,e)),e}var nd=new Map,oM=null;function Yp(){return oM??(oM=(async()=>{if(new URLSearchParams(location.search).has("nomodel"))return[];let s=[],e={};try{s=await(await fetch("/models/list.json")).json()}catch{return[]}try{let i=await fetch("/models/models.json");i.ok&&(e=await i.json())}catch{}let t=new Sl,n=[];for(let i of s){let r=vu(i.replace(/\.glb$/i,"")),o=_l.find(a=>vu(a.key)===r||a.words.includes(r));if(!(!o||nd.has(o.key)))try{let a=await t.loadAsync("/models/"+encodeURIComponent(i));nd.set(o.key,aM(a.scene,a.animations,Uo(o.key).size,e[i])),n.push(`${i} \u2192 ${o.name}`)}catch(a){console.warn("Kh\xF4ng \u0111\u1ECDc \u0111\u01B0\u1EE3c model",i,a)}}return n})())}function aM(s,e,t,n){s.updateMatrixWorld(!0);let i=new on().setFromObject(s),r=i.getSize(new S),o=(n?.turn??(r.x>r.z?-90:0))*Math.PI/180,a=Math.abs(Math.sin(o))>.5?r.x:r.z,l=t/Math.max(.01,a)*(n?.scale??1),c=i.getCenter(new S).multiplyScalar(-1);return s.traverse(h=>{let u=h;u.isMesh&&(u.castShadow=!0,u.frustumCulled=!0)}),{scene:s,clips:e,scale:l,turn:o,offset:c,box:i}}var ed=new ln(1,1,14,1,!0).rotateX(-Math.PI/2).translate(0,0,-.5),lM=new $t(1,10,8),cM=new $e(.35,.35,3.2,14).rotateX(Math.PI/2),hM=new ln(.35,.9,14).rotateX(Math.PI/2).translate(0,0,2.05),td={},uM=s=>td[s]??(td[s]=new ii({map:Xp(),color:new te(s==="red"||s==="beacon"?16722474:s==="green"?2817898:16777215).multiplyScalar(5),blending:Gt,depthWrite:!1,transparent:!0,toneMapped:!1})),dM={roll:1e3,barrel:1600,loop:2600,crash:2200,victory:3800},No=s=>s<.5?2*s*s:1-(-2*s+2)**2/2,Rs=class{constructor(e,t,n){F(this,"root",new qe);F(this,"body",new qe);F(this,"key");F(this,"size");F(this,"gearH");F(this,"prop");F(this,"exhaust");F(this,"tips");F(this,"state","idle");F(this,"lod",new za);F(this,"mats");F(this,"movers",[]);F(this,"flames",[]);F(this,"outerMat");F(this,"coreMat");F(this,"lights",[]);F(this,"booster");F(this,"gear",1);F(this,"retract");F(this,"man",null);F(this,"mixer",null);F(this,"glbMats",[]);F(this,"glbProps",[]);F(this,"flameLen",.3);F(this,"tint",new te);this.key=e;let i=Uo(e),r=nd.get(e);this.size=i.size,this.gearH=i.gearH,this.prop=i.prop,this.retract=i.retract,this.exhaust=i.exhaust,this.tips=i.tips,this.mats=Gp(i.livery,t,n),this.root.add(this.body),this.body.add(this.lod);let o=r?this.fromGlb(r,t):this.fromBlueprint(i);this.lod.addLevel(o,0),this.lod.addLevel(this.lowLevel(i),Math.max(90,i.size*7)),this.outerMat=new Fe({color:16747050,transparent:!0,opacity:.75,blending:Gt,depthWrite:!1,toneMapped:!1,side:Ct}),this.coreMat=new Fe({color:16773840,transparent:!0,opacity:.9,blending:Gt,depthWrite:!1,toneMapped:!1});for(let h of i.exhaust){let u=new qe;u.position.copy(h.pos);let d=new ge(ed,this.outerMat),f=new ge(ed,this.coreMat),g=[];for(let x=0;x<4;x++){let p=new ge(lM,this.coreMat);p.visible=!1,u.add(p),g.push(p)}u.add(d,f),this.body.add(u),this.flames.push({root:u,outer:d,core:f,diamonds:g,r:h.r,kind:h.kind})}for(let h of i.lights){let u=new Si(uM(h.kind));u.position.copy(h.pos);let d=(h.kind==="beacon"?.45:h.kind==="strobe"?.9:.38)*Math.max(.7,i.size/14);u.scale.setScalar(d),this.body.add(u),this.lights.push({s:u,kind:h.kind,base:d})}this.booster=new qe;let a=new ge(cM,Do().white),l=new ge(hM,this.mats.slots.paint),c=new ge(ed,this.outerMat);c.position.z=-1.6,c.scale.set(.6,.6,6),this.booster.add(a,l,c),this.booster.position.copy(i.booster),this.booster.visible=!1,this.body.add(this.booster)}mesh(e,t){let n=new ge(e,this.mats.slots[t]??Do().dark);return n.castShadow=t!=="glass"&&t!=="blur"&&t!=="glow",(t==="glass"||t==="blur")&&(n.renderOrder=2),n}fromBlueprint(e){let t=new qe;for(let[i,r]of Object.entries(e.statics))t.add(this.mesh(r,i));for(let i of e.movers){let r=new qe;r.position.copy(i.pivot);for(let[o,a]of Object.entries(i.geos))r.add(this.mesh(a,o));t.add(r),this.movers.push({def:i,obj:r,spin:0})}let n=new an(1,1);for(let i of e.decals){let r=new ge(n,this.mats.decal);r.scale.set(i.w,i.h,1),r.rotation.y=i.side*Math.PI/2,r.position.copy(i.pos).add(new S(i.side*.09,0,0)),t.add(r)}return t}lowLevel(e){let t=new qe,n=Do();return e.low.paint&&t.add(new ge(e.low.paint,this.mats.slots.paint)),e.low.dark&&t.add(new ge(e.low.dark,n.dark)),e.low.metal&&t.add(new ge(e.low.metal,this.mats.slots.metal??n.metal)),t}fromGlb(e,t){let n=Bp(e.scene);this.tint.setHex(t),n.traverse(o=>{let a=o;if(!a.isMesh)return;let c=(Array.isArray(a.material)?a.material:[a.material]).map(h=>{if(!/paint|body|livery|fuselage|color/i.test(h.name))return h;let u=h.clone();return"color"in u&&u.color.copy(this.tint),this.glbMats.push(u),u});a.material=Array.isArray(a.material)?c:c[0],/prop|propeller|rotor|fan|blade/i.test(o.name)&&this.glbProps.push(o)});let i=new qe,r=new qe;if(n.position.copy(e.offset),r.add(n),r.rotation.y=e.turn,r.scale.setScalar(e.scale),i.add(r),e.clips.length){this.mixer=new cl(n);let o=e.clips.find(a=>/idle|fly|loop|prop/i.test(a.name))??e.clips[0];this.mixer.clipAction(o).play()}return i}maneuver(e){this.man&&(this.man.kind==="crash"||this.man.kind==="victory")&&e!=="crash"||(this.man={kind:e,t:0})}get busy(){return!!this.man}update(e){let{dt:t,t:n,flags:i}=e,r=this.retract?e.gear:1;this.gear+=Math.sign(r-this.gear)*Math.min(Math.abs(r-this.gear),t/1.6);let o=e.mode==="fly"?0:e.mode==="parked"?.2:.6,a=i&(Le.SUPER|Le.JET)?4:i&Le.NITRO?3:i&Le.ENGINE?2:i&Le.BOOST?1:0;for(let h of this.movers){let u=h.def,d=0;switch(u.kind){case"aileron":d=-e.roll*u.max;break;case"elevator":d=e.pitch*u.max*u.side;break;case"rudder":d=e.yaw*u.max;break;case"flap":d=o*u.max*u.side;break;case"gear":d=(1-this.gear)*u.max,h.obj.visible=this.gear>.02;break;case"spin":case"blur":{let f=(this.prop?14:10)+e.throttle*(this.prop?55:40)+a*10;h.spin+=t*f,d=h.spin,u.kind==="blur"&&(h.obj.visible=f>30);break}}h.obj.quaternion.setFromAxisAngle(u.axis,d)}for(let h of this.glbProps)h.rotation.z+=t*(12+e.throttle*50);this.mixer?.update(t);let l=a>=4?3.2:a===3?2.6:a===2?2:a===1?1.5:e.mode==="grid"||e.mode==="parked"?.35:.9+e.throttle*.4;this.flameLen+=(l-this.flameLen)*Math.min(1,t*5);let c=i&Le.JET?.58+.05*Math.sin(n*9):i&Le.SUPER?n*.4%1:a===3?.6:a===2?.55:.07;this.outerMat.color.setHSL(c,1,a>=3?.62:.55).multiplyScalar(1.4+a*.25),this.outerMat.opacity=.42+Math.min(.2,a*.05),this.coreMat.color.setHSL(c,.6,.85).multiplyScalar(1.8+a*.3),this.mats.glow.color.setHSL(a>=3?.58:.06,1,.35+Math.min(.35,this.flameLen*.06)+Math.random()*.05).multiplyScalar(3.5);for(let h of this.flames){let u=h.kind==="prop",d=!u||a>=1;if(h.root.visible=d,!d)continue;let f=.88+Math.random()*.24,g=this.flameLen*(u?.5:h.kind==="fan"?.7:1)*f,x=h.r*(a>=3?1.05:.9);h.outer.scale.set(x,x,g*1.8),h.core.scale.set(x*.5,x*.5,g*1),h.diamonds.forEach((p,m)=>{p.visible=a>=3&&h.kind==="jet",p.visible&&(p.position.z=-g*(.35+m*.42),p.scale.set(x*.42*(1-m*.18),x*.42*(1-m*.18),x*.9))})}this.booster.visible=(i&Le.ROCKET)!==0,this.booster.visible&&this.booster.children[2].scale.set(.7,.7,6+Math.random()*2);for(let h of this.lights){let u=1;if(h.kind==="strobe"){let d=n%1.2;u=d<.05||d>.15&&d<.2?1:0}else h.kind==="beacon"&&(u=.15+.85*Math.max(0,Math.sin(n*Math.PI*1.6))**6);h.s.visible=u>.02,h.s.scale.setScalar(h.base*(.4+u*.9))}this.animate(e)}animate(e){let t=this.body;if(t.position.set(0,0,0),t.rotation.set(0,0,0),this.man){let i=this.man,r=dM[i.kind]/1e3;i.t+=e.dt;let o=Math.min(1,i.t/r);switch(i.kind){case"roll":t.rotation.z=Math.PI*2*No(o);break;case"barrel":{let a=Math.PI*2*No(o);t.rotation.z=a,t.position.set(Math.sin(a)*4,(1-Math.cos(a))*3,0);break}case"loop":{let a=Math.PI*2*No(o),l=this.size*1.4;t.rotation.x=-a,t.position.set(0,l*(1-Math.cos(a)),l*Math.sin(a));break}case"crash":{let a=1-o;t.rotation.z=Math.PI*5*(1-a*a),t.rotation.x=Math.sin(o*18)*.35*a,t.position.set(Math.sin(o*11)*1.5*a,-Math.sin(Math.PI*o)*6,0);break}case"victory":{if(o<.68){let l=Math.PI*2*No(o/.68),c=this.size*1.4;t.rotation.x=-l,t.position.set(0,c*(1-Math.cos(l)),c*Math.sin(l))}else t.rotation.z=Math.PI*4*No((o-.68)/(1-.68));break}}this.state=i.kind,o>=1&&(this.man=null);return}let n=e.flags&(Le.SUPER|Le.JET|Le.NITRO|Le.ROCKET)?2:e.flags&(Le.BOOST|Le.ENGINE)?1:0;this.state=e.mode==="grid"||e.mode==="parked"?"idle":e.mode==="takeoff"?"takeoff":e.mode==="landing"?"landing":n===2?"boost":n===1?"accelerate":Math.abs(e.roll)>.35?"banking":"flying",this.state==="idle"&&(t.position.y=Math.sin(e.t*31+this.size)*.012)}setShadows(e){this.root.traverse(t=>{let n=t;n.isMesh&&n.material!==this.outerMat&&n.material!==this.coreMat&&(n.castShadow=e)})}dispose(){this.root.removeFromParent(),Wp(this.mats),this.outerMat.dispose(),this.coreMat.dispose();for(let e of this.glbMats)e.dispose();this.mixer&&(this.mixer.stopAllAction(),this.mixer.uncacheRoot(this.mixer.getRoot()),this.mixer=null)}};var Cl=class{constructor(e,t,n,i,r,o){F(this,"group",new qe);F(this,"center");F(this,"rig");F(this,"radius");F(this,"beams",[]);F(this,"rays");F(this,"rings",[]);F(this,"lights",[]);F(this,"t",0);F(this,"nextFw",0);F(this,"nextRoll",2.5);F(this,"fire");F(this,"confetti");F(this,"owned",[]);this.fire=r,this.confetti=o,this.center=t.clone(),this.rig=new Rs(n.plane,n.color,i);let a=15/this.rig.size;this.rig.root.scale.setScalar(a),this.radius=15,this.rig.root.position.copy(t),this.group.add(this.rig.root);let l=b=>(this.owned.push(b),b),c=l(new Ae({color:13936186,metalness:1,roughness:.18,envMapIntensity:1.6})),h=document.createElement("canvas");h.width=1024,h.height=128;let u=h.getContext("2d"),d=u.createLinearGradient(0,0,0,128);d.addColorStop(0,"#fff1b8"),d.addColorStop(.5,"#e8b844"),d.addColorStop(1,"#8a6418"),u.fillStyle=d,u.fillRect(0,0,1024,128),u.font='italic 900 70px "Segoe UI", Arial',u.textAlign="center",u.textBaseline="middle",u.fillStyle="#4a2c00";for(let b=0;b<4;b++)u.fillText("\u{1F3C6} V\xD4 \u0110\u1ECACH #1",128+b*256,66);let f=l(new Pt(h));f.colorSpace=dt,f.wrapS=rn;let g=l(new Ae({map:f,metalness:.9,roughness:.25,emissive:3810304,emissiveMap:f,emissiveIntensity:.6})),x=new qe;x.add(new ge(l(new $e(10,11.5,2.2,48)),c)),x.add(new ge(l(new $e(8.6,9.6,3.2,48,1,!0)),g).translateY(2.6)),x.add(new ge(l(new $e(9.2,8.8,.8,48)),c).translateY(4.5)),x.position.copy(t).add(new S(0,-9.5,0)),this.group.add(x);let p=l(new Fe({color:new te(16765498).multiplyScalar(4),toneMapped:!1,transparent:!0,opacity:.9,blending:Gt,depthWrite:!1}));for(let[b,M]of[[11,-4.6],[13.5,-3.2],[16,-1.6]]){let I=new ge(l(new En(b,.18,8,80)),p);I.rotation.x=Math.PI/2,I.position.copy(t).add(new S(0,M,0)),this.group.add(I),this.rings.push(I)}let m=document.createElement("canvas");m.width=4,m.height=256;let y=m.getContext("2d"),_=y.createLinearGradient(0,0,0,256);_.addColorStop(0,"rgba(255,255,255,0)"),_.addColorStop(.6,"rgba(255,255,255,0.35)"),_.addColorStop(1,"rgba(255,255,255,0.9)"),y.fillStyle=_,y.fillRect(0,0,4,256);let v=l(new Pt(m)),R=l(new $e(7,.6,90,24,1,!0).translate(0,-45,0));for(let b=0;b<6;b++){let M=new ge(R,l(new Fe({map:v,color:new te().setHSL(.12+b*.09,.9,.6),transparent:!0,opacity:.12,blending:Gt,depthWrite:!1,side:Ct,toneMapped:!1})));M.position.copy(t),this.group.add(M),this.beams.push(M)}let w=document.createElement("canvas");w.width=w.height=512;let A=w.getContext("2d");A.translate(256,256);for(let b=0;b<32;b++){A.rotate(Math.PI*2/32);let M=A.createLinearGradient(0,0,256,0);M.addColorStop(0,"rgba(255,230,140,0)"),M.addColorStop(.25,"rgba(255,230,140,0.7)"),M.addColorStop(1,"rgba(255,200,60,0)"),A.fillStyle=M,A.beginPath(),A.moveTo(0,0),A.lineTo(256,b%2?-14:-26),A.lineTo(256,b%2?14:26),A.fill()}let P=l(new Pt(w));this.rays=new Si(l(new ii({map:P,color:new te(.5,.36,.12),blending:Gt,depthWrite:!1,transparent:!0,toneMapped:!1}))),this.rays.scale.setScalar(46),this.group.add(this.rays);for(let[b,M,I,U]of[[25,30,25,16773840],[-25,18,-10,16767120],[0,-20,25,12574975]]){let B=new Rr(U,5,120,.5,.5,0);B.position.copy(t).add(new S(b,M,I)),B.target.position.copy(t),this.group.add(B,B.target),this.lights.push(B)}e.add(this.group)}update(e,t){this.t+=e;let n=this.t,i=this.center;this.rig.root.position.set(i.x,i.y+Math.sin(n*1.4)*.6,i.z),this.rig.root.rotation.set(-.08,n*.45,Math.sin(n*.9)*.18),n>this.nextRoll&&(this.rig.maneuver(Math.random()<.5?"barrel":"roll"),this.nextRoll=n+4.5),this.rig.update({dt:e,t:n,speed:60,throttle:1,roll:Math.sin(n)*.5,pitch:Math.sin(n*.7)*.4,yaw:0,gear:0,ground:!1,mode:"fly",flags:Le.NITRO|Le.SHIELD}),this.beams.forEach((r,o)=>{let a=n*.6+o/this.beams.length*Math.PI*2;r.rotation.set(Math.PI+Math.sin(a)*.55,0,Math.cos(a*1.3)*.55),r.material.opacity=.08+.05*Math.sin(n*3+o)}),this.rings.forEach((r,o)=>{r.rotation.z=n*(.4+o*.25)*(o%2?-1:1),r.scale.setScalar(1+Math.sin(n*2+o)*.04)}),this.rays.position.copy(i).addScaledVector(i.clone().sub(t.position).normalize(),45),this.rays.material.rotation=n*.15,this.rays.scale.setScalar(52+Math.sin(n*2)*4);for(let r=0;r<2;r++){let o=i.clone().add(new S((Math.random()-.5)*26,(Math.random()-.5)*9,(Math.random()-.5)*26));this.fire.emit(o,new S(0,1.5,0),Math.random()<.5?16765498:16774336,.25+Math.random()*.3,.9)}for(let r=0;r<8;r++){let o=i.clone().add(new S((Math.random()-.5)*60,30+Math.random()*10,(Math.random()-.5)*60));this.confetti.emit(o,new S((Math.random()-.5)*3,-4,(Math.random()-.5)*3),[16765498,16732120,3663615,3458905,16777215,16747039][r%6],.9,4,{drag:.4,grav:2})}if(n>this.nextFw){this.nextFw=n+.45+Math.random()*.4;let r=i.clone().add(new S((Math.random()-.5)*90,18+Math.random()*30,(Math.random()-.5)*90)),o=Math.random(),a=[new te().setHSL(o,1,.6).getHex(),new te().setHSL((o+.1)%1,1,.7).getHex(),16777215];this.fire.burst(r,a,90,34,2.2,1.6,{grav:7,drag:1.1})}}camera(e,t){let n=Math.min(1,this.t/2),i=1-(1-n)**3,r=this.t*.32+.6,o=this.radius*(4.2-2.1*i-.3*Math.min(1,Math.max(0,this.t-2)/6));e.set(this.center.x+Math.cos(r)*o,this.center.y+3+Math.sin(this.t*.5)*3,this.center.z+Math.sin(r)*o),t.copy(this.center).add(new S(0,2.5,0))}get age(){return this.t}dispose(e){e.remove(this.group),this.rig.dispose();for(let t of this.owned)t.dispose();for(let t of this.lights)t.dispose()}};var Ho=class{constructor(e,t){F(this,"points");F(this,"n");F(this,"i",0);F(this,"pos");F(this,"vel");F(this,"col");F(this,"size");F(this,"alpha");F(this,"life");F(this,"max");F(this,"drag");F(this,"grow");F(this,"grav");F(this,"base");F(this,"geo",new et);this.n=e,this.pos=new Float32Array(e*3),this.vel=new Float32Array(e*3),this.col=new Float32Array(e*3),this.size=new Float32Array(e),this.alpha=new Float32Array(e),this.life=new Float32Array(e),this.max=new Float32Array(e).fill(1),this.drag=new Float32Array(e),this.grow=new Float32Array(e),this.grav=new Float32Array(e),this.base=new Float32Array(e),this.geo.setAttribute("position",new lt(this.pos,3).setUsage(Ts)),this.geo.setAttribute("color",new lt(this.col,3).setUsage(Ts)),this.geo.setAttribute("size",new lt(this.size,1).setUsage(Ts)),this.geo.setAttribute("alpha",new lt(this.alpha,1).setUsage(Ts));let n=new Mt({transparent:!0,depthWrite:!1,blending:t?Gt:$i,uniforms:{scale:{value:600}},vertexShader:`attribute float size; attribute float alpha; attribute vec3 color; varying vec3 vC; varying float vA; uniform float scale;
        void main(){ vC = color; vA = alpha; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * scale / max(1.0, -mv.z); gl_Position = projectionMatrix * mv; }`,fragmentShader:`varying vec3 vC; varying float vA;
        void main(){ vec2 d = gl_PointCoord - 0.5; float r = dot(d, d) * 4.0; if (r > 1.0) discard; gl_FragColor = vec4(vC, vA * (1.0 - r) * (1.0 - r)); }`});this.points=new Ji(this.geo,n),this.points.frustumCulled=!1}setScale(e){this.points.material.uniforms.scale.value=e*.9}emit(e,t,n,i,r,o={}){let a=this.i;this.i=(this.i+1)%this.n;let l=typeof n=="number"?fM.setHex(n):n;this.pos.set([e.x,e.y,e.z],a*3),this.vel.set([t.x,t.y,t.z],a*3),this.col.set([l.r,l.g,l.b],a*3),this.size[a]=i,this.base[a]=o.alpha??1,this.alpha[a]=this.base[a],this.life[a]=r,this.max[a]=r,this.drag[a]=o.drag??1.5,this.grow[a]=o.grow??0,this.grav[a]=o.grav??0}burst(e,t,n,i,r,o=1,a={}){for(let l=0;l<n;l++)Or.set(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(i*(.3+Math.random()*.7)),this.emit(e,Or,t[l%t.length],r*(.6+Math.random()*.8),o*(.6+Math.random()*.6),a)}update(e){for(let t=0;t<this.n;t++){if(this.life[t]<=0){this.alpha[t]!==0&&(this.alpha[t]=0);continue}this.life[t]-=e;let n=Math.max(0,1-this.drag[t]*e),i=t*3;this.vel[i]*=n,this.vel[i+1]=this.vel[i+1]*n-this.grav[t]*e,this.vel[i+2]*=n,this.pos[i]+=this.vel[i]*e,this.pos[i+1]+=this.vel[i+1]*e,this.pos[i+2]+=this.vel[i+2]*e,this.size[t]+=this.grow[t]*e,this.alpha[t]=this.base[t]*Math.max(0,this.life[t]/this.max[t])}for(let t of["position","color","size","alpha"])this.geo.attributes[t].needsUpdate=!0}},Or=new S,fM=new te,Cs=class{constructor(e=28,t=.5){F(this,"mesh");F(this,"n");F(this,"pts",[]);F(this,"sides",[]);F(this,"pos");F(this,"col");F(this,"acc",0);F(this,"color",new te(1,1,1));F(this,"width");F(this,"opacity",.55);this.n=e,this.width=t,this.pos=new Float32Array(e*2*3),this.col=new Float32Array(e*2*4);let n=new et;n.setAttribute("position",new lt(this.pos,3).setUsage(Ts)),n.setAttribute("color",new lt(this.col,4).setUsage(Ts));let i=[];for(let r=0;r<e-1;r++){let o=r*2;i.push(o,o+1,o+2,o+1,o+3,o+2)}n.setIndex(i),this.mesh=new ge(n,new Fe({vertexColors:!0,transparent:!0,depthWrite:!1,side:Ct,toneMapped:!1})),this.mesh.frustumCulled=!1}reset(){this.pts=[],this.sides=[]}push(e,t,n){this.acc+=n,this.acc>.035||!this.pts.length?(this.acc=0,this.pts.unshift(e.clone()),this.sides.unshift(t.clone()),this.pts.length>this.n&&(this.pts.pop(),this.sides.pop())):(this.pts[0].copy(e),this.sides[0].copy(t));let i=this.pts.length;for(let o=0;o<this.n;o++){let a=this.pts[Math.min(o,i-1)],l=this.sides[Math.min(o,i-1)],c=o/(this.n-1),h=this.width*(1-c*.6);this.pos.set([a.x+l.x*h,a.y+l.y*h,a.z+l.z*h,a.x-l.x*h,a.y-l.y*h,a.z-l.z*h],o*6);let u=o<i?this.opacity*(1-c):0;this.col.set([this.color.r,this.color.g,this.color.b,u,this.color.r,this.color.g,this.color.b,u],o*8)}let r=this.mesh.geometry;r.attributes.position.needsUpdate=!0,r.attributes.color.needsUpdate=!0}},Pl=class{constructor(e,t){F(this,"group",new qe);F(this,"shots",[]);F(this,"flashes",[]);F(this,"missileGeo");F(this,"bombGeo");F(this,"meteorGeo",new ri(3,0));F(this,"onBoom",()=>{});F(this,"fire");F(this,"smoke");this.fire=e,this.smoke=t;let n=new $e(.35,.35,3,8).rotateX(Math.PI/2),i=new ln(.35,1,8).rotateX(Math.PI/2).translate(0,0,2);this.missileGeo=$p([n,i]),this.bombGeo=$p([new $t(1.6,14,10).scale(1,1,1.5),new Ye(2.6,.15,1).translate(0,0,-2.2),new Ye(.15,2.6,1).translate(0,0,-2.2)])}missile(e,t,n){let i=new ge(this.missileGeo,new Ae({color:14672874,metalness:.6,roughness:.3,emissive:3346688}));i.position.copy(e),this.group.add(i),this.shots.push({kind:"missile",mesh:i,from:e.clone(),to:t,t:0,dur:n/1e3,last:e.clone()})}bomb(e,t){let n=e();if(!n)return;let i=new ge(this.bombGeo,new Ae({color:2303532,metalness:.5,roughness:.4})),r=n.clone().add(new S(0,140,0));i.position.copy(r),this.group.add(i),this.shots.push({kind:"bomb",mesh:i,from:r,to:e,t:0,dur:t/1e3,last:r.clone()})}meteor(e,t){let n=e();if(!n)return;let i=new ge(this.meteorGeo,new Fe({color:16742938,toneMapped:!1})),r=n.clone().add(new S((Math.random()-.5)*160,180+Math.random()*60,(Math.random()-.5)*160));i.position.copy(r),this.group.add(i),this.shots.push({kind:"meteor",mesh:i,from:r,to:e,t:0,dur:t/1e3,last:r.clone()})}bolt(e){let t=[],n=e.clone().add(new S((Math.random()-.5)*40,160,(Math.random()-.5)*40));for(let o=0;o<=10;o++){let a=n.clone().lerp(e,o/10);o>0&&o<10&&a.add(new S((Math.random()-.5)*12,0,(Math.random()-.5)*12)),t.push(a)}let i=new Tr(new Ti(t,!1,"catmullrom",0),40,.9,5,!1),r=new ge(i,new Fe({color:12577023,transparent:!0,toneMapped:!1,blending:Gt,depthWrite:!1}));this.group.add(r),this.flashes.push({mesh:r,t:0,dur:.45,grow:0,fade:1}),this.fire.burst(e,[12577023,16777215,7321855],40,30,1.6,.6)}ring(e,t,n,i,r=.8,o=3){let a=new ge(new En(i,i*.12,8,40),new Fe({color:n,transparent:!0,toneMapped:!1,blending:Gt,depthWrite:!1}));a.position.copy(e),t?a.lookAt(e.clone().add(t)):a.rotation.x=Math.PI/2,this.group.add(a),this.flashes.push({mesh:a,t:0,dur:r,grow:o,fade:1})}boom(e,t){let n=t?2.2:1;this.fire.burst(e,[16765802,16742938,16726810,16777215],t?140:60,45*n,3.5*n,.9),this.smoke.burst(e,[4868682,7039851,3355443],t?50:22,14*n,6*n,2.2,{grow:6,drag:1.2,alpha:.75});let i=new ge(new $t(6*n,18,12),new Fe({color:16757575,transparent:!0,toneMapped:!1,blending:Gt,depthWrite:!1}));i.position.copy(e),this.group.add(i),this.flashes.push({mesh:i,t:0,dur:.5,grow:2.4,fade:1}),this.ring(e,null,16769184,6*n,.7,6),this.onBoom(e,t)}update(e){for(let t=this.shots.length-1;t>=0;t--){let n=this.shots[t];n.t+=e;let i=Math.min(1,n.t/n.dur),r=n.to()??n.last;n.last.copy(r);let o=n.mesh.position.clone();if(n.kind==="missile"){let a=n.from.clone().lerp(r,i*i*(3-2*i));a.y+=Math.sin(i*Math.PI)*14,n.mesh.position.copy(a),this.smoke.emit(a,Or.set((Math.random()-.5)*2,1,(Math.random()-.5)*2),15263976,2.4,1.2,{grow:4,drag:2,alpha:.7}),this.fire.emit(a,Or.set(0,0,0),16756794,2.2,.15)}else if(n.kind==="bomb"){let a=n.from.clone().lerp(r,i*i);n.mesh.position.copy(a),n.mesh.rotation.z+=e*3}else{let a=n.from.clone().lerp(r,i);n.mesh.position.copy(a);for(let l=0;l<3;l++)this.fire.emit(a,Or.set((Math.random()-.5)*6,(Math.random()-.5)*6,(Math.random()-.5)*6),l?16742938:16769162,5,.5);this.smoke.emit(a,Or.set(0,2,0),3815994,5,1.5,{grow:5,alpha:.6})}n.kind!=="bomb"&&n.mesh.position.distanceToSquared(o)>1e-4&&n.mesh.lookAt(n.mesh.position.clone().add(n.mesh.position.clone().sub(o))),i>=1&&(this.group.remove(n.mesh),(n.kind!=="meteor"||Math.random()<1)&&this.boom(r,n.kind==="bomb"),this.shots.splice(t,1))}for(let t=this.flashes.length-1;t>=0;t--){let n=this.flashes[t];n.t+=e;let i=n.t/n.dur;n.mesh.scale.setScalar(1+n.grow*i),n.mesh.material.opacity=Math.max(0,1-i)*n.fade,i>=1&&(this.group.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.flashes.splice(t,1))}}};function $p(s){let e=s.map(r=>r.index?r.toNonIndexed():r),t=[],n=[];for(let r of e)r.computeVertexNormals(),t.push(...r.attributes.position.array),n.push(...r.attributes.normal.array);let i=new et;return i.setAttribute("position",new we(t,3)),i.setAttribute("normal",new we(n,3)),i}var Il=class{constructor(e){F(this,"ws",null);F(this,"retry",0);F(this,"onState",()=>{});F(this,"onStatus",()=>{});F(this,"role");this.role=e}connect(){let e=new WebSocket(`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws?role=${this.role}`);this.ws=e,e.onopen=()=>{this.retry=0,this.onStatus(!0)},e.onmessage=t=>{try{this.onState(JSON.parse(t.data))}catch(n){console.error(n)}},e.onclose=()=>{this.onStatus(!1),setTimeout(()=>this.connect(),Math.min(1e4,500*2**this.retry++))}}send(e){this.ws?.readyState===1&&this.ws.send(JSON.stringify(e))}};var kr=class{constructor(e){F(this,"curve");F(this,"N",4e3);F(this,"length");F(this,"pos");F(this,"tan");F(this,"right");F(this,"up");F(this,"turnA");this.curve=new Ti(e.map(u=>new S(...u)),!0,"centripetal");let t=this.N;this.length=this.curve.getLength(),this.pos=new Float32Array(t*3),this.tan=new Float32Array(t*3),this.right=new Float32Array(t*3),this.up=new Float32Array(t*3),this.turnA=new Float32Array(t);let n=new S,i=new S,r=new S,o=new S,a=new S(0,1,0);for(let u=0;u<t;u++)this.curve.getPointAt(u/t,n),this.curve.getTangentAt(u/t,i).normalize(),r.crossVectors(i,a).normalize(),o.crossVectors(r,i).normalize(),n.toArray(this.pos,u*3),i.toArray(this.tan,u*3),r.toArray(this.right,u*3),o.toArray(this.up,u*3);let l=20,c=this.length/t*l*2,h=new Float32Array(t);for(let u=0;u<t;u++){let d=((u-l)%t+t)%t,f=(u+l)%t;h[u]=((this.tan[f*3]-this.tan[d*3])*this.right[u*3]+(this.tan[f*3+2]-this.tan[d*3+2])*this.right[u*3+2])/c}for(let u=0;u<t;u++){let d=0;for(let f=-30;f<=30;f++)d+=h[((u+f)%t+t)%t];this.turnA[u]=d/61}}pose(e,t){let n=this.N,i=(e%1+1)%1*n,r=Math.floor(i)%n,o=(r+1)%n,a=i-Math.floor(i),l=(c,h)=>h.set(c[r*3]+(c[o*3]-c[r*3])*a,c[r*3+1]+(c[o*3+1]-c[r*3+1])*a,c[r*3+2]+(c[o*3+2]-c[r*3+2])*a);return l(this.pos,t.p),l(this.tan,t.t).normalize(),l(this.right,t.r).normalize(),l(this.up,t.u).normalize(),t.turn=this.turnA[r]+(this.turnA[o]-this.turnA[r])*a,t.climb=t.t.y,t}static pose(){return{p:new S,t:new S,r:new S,u:new S,turn:0,climb:0}}samples(e){let t=[];for(let n=0;n<e;n++)t.push(this.curve.getPointAt(n/e));return t}};var Je=s=>document.getElementById(s);function ne(s,e="",t=""){let n=document.createElement(s);return e&&(n.className=e),t&&(n.textContent=t),n}var as={w:innerWidth,h:innerHeight,s:1};function Zp(){let s=new URLSearchParams(location.search).get("ui"),e=innerWidth/innerHeight<.8,t=s?Math.max(.5,Math.min(4,+s||1)):e&&innerWidth>600?innerWidth/540:1;as.s=t,as.w=innerWidth/t,as.h=innerHeight/t;let n=Je("app");Object.assign(n.style,t===1?{width:"",height:"",transform:""}:{width:as.w+"px",height:as.h+"px",transform:`scale(${t})`,transformOrigin:"0 0"}),document.body.classList.toggle("portrait",e)}var Kp=["\u{1F947}","\u{1F948}","\u{1F949}"],id={racer:"\u{1F3CE}\uFE0F",fighter:"\u{1F6E9}\uFE0F",airliner:"\u2708\uFE0F",prop:"\u{1F6E9}\uFE0F",supersonic:"\u{1F680}",bizjet:"\u{1F4BC}",transport:"\u{1FA96}",stunt:"\u{1F3AA}",future:"\u{1F6F8}",golden:"\u{1F451}"},sd=s=>"#"+s.toString(16).padStart(6,"0"),Ll=class{constructor(){F(this,"feedBox",Je("feed"));F(this,"popBox",Je("pops"));F(this,"centerTimer",0);F(this,"recPage",0);F(this,"boards",{best:[],wins:[],donors:[]});F(this,"pipKey","");F(this,"toastTimer",0);this.skills(),this.howto(),setInterval(()=>{this.recPage=(this.recPage+1)%3,this.renderRecords()},6e3)}status(e,t,n){let i=Math.max(0,e.leftMs-n),r=Math.ceil(i/1e3),o=t.find(c=>!c.fin)??t[0],a=t.some(c=>!c.bot),l=e.phase==="lobby"?a?`\u23F3 Xu\u1EA5t ph\xE1t sau ${Math.floor(r/60)}:${String(r%60).padStart(2,"0")}`:"\u{1F4AC} G\xF5 1 \u0111\u1EC3 v\xE0o \u0111ua!":e.phase==="countdown"?"\u{1F6A6} Chu\u1EA9n b\u1ECB c\u1EA5t c\xE1nh\u2026":e.phase==="race"?`\u{1F4CF} ${(Math.max(0,o?.d??0)/1e3).toFixed(1)}/${(e.laps*e.lapLen/1e3).toFixed(1)} km \xB7 \u23F1 ${Nr(e.raceMs+n)}`:e.phase==="finish"?`\u{1F3C1} \u0110\xE3 c\xF3 ng\u01B0\u1EDDi v\u1EC1 \u0111\xEDch! C\xF2n ${r} gi\xE2y`:`\u{1F3C6} K\u1EBFt qu\u1EA3 cu\u1ED9c \u0111ua #${e.raceNo}`;Je("status").textContent=l,Je("raceNo").textContent=e.raceNo?`Cu\u1ED9c \u0111ua #${e.raceNo+(e.phase==="lobby"||e.phase==="countdown"?1:0)}`:"Cu\u1ED9c \u0111ua #1"}viewers(e){Je("viewers").textContent=`\u{1F440} ${e}`}live(e){let t=Je("live");t.className="pill"+(e.status==="connected"?" on":e.status==="reconnecting"||e.status==="connecting"?" warn":""),t.textContent=e.status==="connected"?`\u25CF LIVE @${e.uniqueId}`:e.status==="reconnecting"?`\u0110ang n\u1ED1i l\u1EA1i @${e.uniqueId}`:e.status==="connecting"?"\u0110ang k\u1EBFt n\u1ED1i\u2026":e.status==="error"?"L\u1ED7i k\u1EBFt n\u1ED1i":"Ch\u01B0a n\u1ED1i TikTok"}board(e,t,n){let i=Je("board"),r=e.find(c=>!c.fin),o=[ne("div","ph",t.phase==="lobby"||t.phase==="countdown"?"\u{1F6EB} H\xC0NG XU\u1EA4T PH\xC1T":"\u{1F3C1} B\u1EA2NG X\u1EBEP H\u1EA0NG")],a=e.slice(0,10),l=e.find(c=>c.id===n);l&&!a.includes(l)&&a.push(l);for(let c of a){let h=ne("div","br"+(c.place<=3?" p"+c.place:"")+(c.id===n?" focus":"")),u=ne("b","bn",String(c.place)),d=ne("i","bd");d.style.background=sd(c.color);let f=ne("span","bnm",c.name);c.bot&&f.append(ne("em","ai","AI"));let g=ne("span","bg");c.fin?g.textContent=Nr(c.fin):t.phase==="lobby"||t.phase==="countdown"?g.textContent=id[c.plane]??"\u2708\uFE0F":c===r?g.textContent="D\u1EAAN \u0110\u1EA6U":g.textContent=`+${Math.max(0,Math.round((r?.d??0)-c.d))}m`,h.append(u,d,f,g),o.push(h)}e.length>a.length&&o.push(ne("div","more",`\u2026 v\xE0 ${e.length-a.length} m\xE1y bay n\u1EEFa`)),i.replaceChildren(...o)}skills(){let e=Je("skills"),t=[ne("div","ph","\u{1F381} QU\xC0 = SKILL")];for(let i of Dr){let r=ne("div","sk");r.append(ne("span","si",i.icon),ne("b","sx",`${i.xu} xu`),ne("span","sn",i.name)),r.title=i.desc,t.push(r)}let n=ne("div","sk like");n.append(ne("span","si","\u2764\uFE0F"),ne("b","sx",`${It.likesPerBoost} tim`),ne("span","sn","= 0,1 \u{1F339} t\u0103ng t\u1ED1c")),t.push(n,ne("div","skn","Qu\xE0 combo x5 = d\xF9ng 5 l\u1EA7n")),e.replaceChildren(...t)}howto(){let e=Je("howto"),t=ne("div","hw");t.append(ne("b","k","1"),ne("span","","G\xF5 1 \u0111\u1EC3 v\xE0o \u0111ua"),ne("b","k tap","\u2764\uFE0F"),ne("span","tapt",`Tap tym t\u0103ng t\u1ED1c (${It.likesPerBoost} tym = 0,1\u{1F339})`));let n=ne("div","hw");n.append(ne("b","k","\u2708"),ne("span","","G\xF5 t\xEAn m\xE1y bay \u0111\u1EC3 \u0111\u1ED5i:"));let i=ne("div","planes");for(let a of ws)i.append(ne("span","pl",`${id[a.key]} ${a.words[0]}`));let r=ne("div","hw");r.append(ne("b","k","\u{1F3A8}"),ne("span","","G\xF5 m\xE0u: "+Cp.slice(0,7).map(a=>a.name.toLowerCase()).join(", ")));let o=ne("div","hw");o.append(ne("b","k","\u{1F440}"),ne("span","watch",'G\xF5 "xem": camera soi m\xE1y bay c\u1EE7a b\u1EA1n \xB7 tym / follow c\u0169ng \u0111\u01B0\u1EE3c v\xE0o \u0111ua')),e.replaceChildren(t,o,n,i,r)}records(e){this.boards=e,this.renderRecords()}renderRecords(){let e=this.boards,t=Je("records"),n=[["\u23F1\uFE0F K\u1EF6 L\u1EE4C NHANH NH\u1EA4T",e.best.slice(0,5).map(a=>[a.name,Nr(a.ms)])],["\u{1F3C6} V\xD4 \u0110\u1ECACH NHI\u1EC0U NH\u1EA4T",e.wins.slice(0,5).map(a=>[a.name,`${a.wins} l\u1EA7n`])],["\u{1F48E} TOP QU\xC0 H\xD4M NAY",e.donors.slice(0,5).map(a=>[a.name,`${a.xu} xu`])]],[i,r]=n[this.recPage],o=[ne("div","ph",i)];r.length||o.push(ne("div","empty","Ch\u01B0a c\xF3 ai, v\xE0o \u0111ua ngay!")),r.forEach(([a,l],c)=>{let h=ne("div","rr");h.append(ne("b","",Kp[c]??String(c+1)),ne("span","rn",a),ne("span","rv",l)),o.push(h)}),t.replaceChildren(...o)}feed(e,t=""){let n=ne("div","fl "+t,e);for(this.feedBox.prepend(n);this.feedBox.childElementCount>5;)this.feedBox.lastElementChild.remove();setTimeout(()=>n.classList.add("old"),6e3),setTimeout(()=>n.remove(),9e3)}pop(e){let t=Ao(e.skill),n=ne("div","pop"+(e.xu>=99?" big":"")),i=ne("div","av");if(e.avatar){let l=ne("img");l.src=e.avatar,l.referrerPolicy="no-referrer",l.onerror=()=>{l.remove(),i.textContent=e.name.slice(0,1).toUpperCase()},i.append(l)}else i.textContent=e.name.slice(0,1).toUpperCase();let r=ne("div","pt");r.append(ne("b","",e.name),ne("small","",`t\u1EB7ng ${e.gift}`));let o=ne("div","pk");o.append(ne("span","pi",t.icon),ne("b","px",`x${e.count}`));let a=ne("div","ps",e.banked?`${t.name} \xB7 bung khi xu\u1EA5t ph\xE1t`:t.name);for(r.append(a),n.append(i,r,o),this.popBox.prepend(n);this.popBox.childElementCount>3;)this.popBox.lastElementChild.remove();setTimeout(()=>n.classList.add("out"),4200),setTimeout(()=>n.remove(),4700)}pip(e){let t=e.id+"|"+e.name;t!==this.pipKey&&(this.pipKey=t,Je("pipName").textContent=e.name+(e.bot?" (AI)":""))}map(e){Je("mapTag").textContent=`${e.icon} ${e.name}`}toast(e){let t=Je("toast");t.textContent=e,t.hidden=!1,t.style.animation="none",t.offsetWidth,t.style.animation="",clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>{t.hidden=!0},900)}center(e,t="",n=1600){let i=Je("center");i.textContent=e,i.className=t,i.hidden=!1,i.style.animation="none",i.offsetWidth,i.style.animation="",clearTimeout(this.centerTimer),this.centerTimer=window.setTimeout(()=>{i.hidden=!0},n)}caption(e){let t=Je("caption");t.textContent=e,t.hidden=!1,clearTimeout(t._t),t._t=window.setTimeout(()=>{t.hidden=!0},Math.min(9e3,2e3+e.length*70))}result(e,t={avatar:"",record:!1}){let n=Je("result"),i=Je("result2");if(!e||!e.podium.length){n.hidden=!0,i.hidden=!0;return}let r=e.podium[0],o=ne("div","cav");if(t.avatar){let u=ne("img");u.src=t.avatar,u.referrerPolicy="no-referrer",u.onerror=()=>{u.remove(),o.textContent=r.name.slice(0,1).toUpperCase()},o.append(u)}else o.textContent=r.name.slice(0,1).toUpperCase();o.style.setProperty("--pc",sd(r.color));let a=ne("div","crown","\u{1F451}"),l=ne("div","cavb");l.append(a,o);let c=[ne("div","ct","\u{1F3C6} NH\xC0 V\xD4 \u0110\u1ECACH \u{1F3C6}"),l,ne("div","cn",r.name+(r.bot?" (AI)":"")),ne("div","cm",`\u23F1 ${Nr(r.ms)} \xB7 ${id[r.plane]??"\u2708\uFE0F"} ${wo(r.plane)} \xB7 Cu\u1ED9c \u0111ua #${e.raceNo}`)];t.record&&c.push(ne("div","crec","\u2B50 K\u1EF6 L\u1EE4C M\u1EDAI \u2B50")),n.replaceChildren(...c),n.hidden=!1;let h=[];for(let u of[1,2]){let d=e.podium[u];if(!d)continue;let f=ne("div","rr2 p"+(u+1));f.append(ne("span","m",Kp[u]),ne("b","",d.name+(d.bot?" (AI)":"")),ne("small","",d.ms?Nr(d.ms):"\u0111ang bay v\u1EC1 \u0111\xEDch")),h.push(f)}i.replaceChildren(...h,ne("div","rs","Cu\u1ED9c \u0111ua m\u1EDBi s\u1EAFp b\u1EAFt \u0111\u1EA7u \xB7 G\xF5 1 \u0111\u1EC3 tham gia!")),i.hidden=!1}cam(e,t,n=""){let i=Je("camTag");if(!e){i.hidden=!0;return}i.hidden=!1,i.textContent=`\u{1F3A5} ${n?n+" \xB7 ":""}#${e.place} ${e.name} \xB7 ${Math.round(t)} km/h`}},Bo=class{constructor(e,t){F(this,"ctx");F(this,"bg");F(this,"map");F(this,"cv");this.cv=e;let n=300;e.width=n,e.height=n,this.ctx=e.getContext("2d");let i=1/0,r=-1/0,o=1/0,a=-1/0;for(let g of t)i=Math.min(i,g.x),r=Math.max(r,g.x),o=Math.min(o,g.z),a=Math.max(a,g.z);let l=(n-40)/Math.max(r-i,a-o),c=(n-(r-i)*l)/2,h=(n-(a-o)*l)/2;this.map=(g,x)=>[c+(g-i)*l,h+(x-o)*l],this.bg=document.createElement("canvas"),this.bg.width=this.bg.height=n;let u=this.bg.getContext("2d");u.lineJoin="round";for(let[g,x]of[[22,"rgba(0,0,0,0.55)"],[14,"#2b3a55"],[5,"#8fd8ff"]])u.beginPath(),t.forEach((p,m)=>{let[y,_]=this.map(p.x,p.z);m?u.lineTo(y,_):u.moveTo(y,_)}),u.closePath(),u.strokeStyle=x,u.lineWidth=g,u.stroke();let[d,f]=this.map(t[0].x,t[0].z);u.fillStyle="#fff",u.fillRect(d-9,f-9,18,18),u.fillStyle="#111",u.fillRect(d-9,f-9,9,9),u.fillRect(d,f,9,9)}draw(e){let t=this.ctx;t.clearRect(0,0,this.cv.width,this.cv.height),t.drawImage(this.bg,0,0);for(let n of[...e].sort((i,r)=>r.place-i.place)){let[i,r]=this.map(n.x,n.z),o=n.focus?12:n.place<=3?10:7;t.beginPath(),t.arc(i,r,o,0,Math.PI*2),t.fillStyle=sd(n.color),t.fill(),t.lineWidth=n.focus?4:2.5,t.strokeStyle=n.place===1?"#ffd23a":n.focus?"#fff":"rgba(0,0,0,0.7)",t.stroke(),n.place<=3&&(t.fillStyle="#000",t.font="bold 12px Segoe UI",t.textAlign="center",t.textBaseline="middle",t.fillText(String(n.place),i,r+.5))}}};var Fo=class s extends ge{constructor(){let e=s.SkyShader,t=new Mt({name:e.name,uniforms:Cn.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:tn,depthWrite:!1});super(new Ye(1,1,1),t),this.isSky=!0}};Fo.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new S},up:{value:new S(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var Dl=class extends ge{constructor(e,t={}){super(e),this.isWater=!0;let n=this,i=t.textureWidth!==void 0?t.textureWidth:512,r=t.textureHeight!==void 0?t.textureHeight:512,o=t.clipBias!==void 0?t.clipBias:0,a=t.alpha!==void 0?t.alpha:1,l=t.time!==void 0?t.time:0,c=t.waterNormals!==void 0?t.waterNormals:null,h=t.sunDirection!==void 0?t.sunDirection:new S(.70707,.70707,0),u=new te(t.sunColor!==void 0?t.sunColor:16777215),d=new te(t.waterColor!==void 0?t.waterColor:8355711),f=t.eye!==void 0?t.eye:new S(0,0,0),g=t.distortionScale!==void 0?t.distortionScale:20,x=t.side!==void 0?t.side:Mn,p=t.fog!==void 0?t.fog:!1,m=new qn,y=new S,_=new S,v=new S,R=new Ce,w=new S(0,0,-1),A=new rt,P=new S,b=new S,M=new rt,I=new Ce,U=new Ut,B=new Zt(i,r),W={name:"MirrorShader",uniforms:Cn.merge([ae.fog,ae.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new Ce},sunColor:{value:new te(8355711)},sunDirection:{value:new S(.70707,.70707,0)},eye:{value:new S},waterColor:{value:new te(5592405)}}]),vertexShader:`
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,fragmentShader:`
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.3;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance);
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <colorspace_fragment>
					#include <fog_fragment>	
				}`},Y=new Mt({name:W.name,uniforms:Cn.clone(W.uniforms),vertexShader:W.vertexShader,fragmentShader:W.fragmentShader,lights:!0,side:x,fog:p});Y.uniforms.mirrorSampler.value=B.texture,Y.uniforms.textureMatrix.value=I,Y.uniforms.alpha.value=a,Y.uniforms.time.value=l,Y.uniforms.normalSampler.value=c,Y.uniforms.sunColor.value=u,Y.uniforms.waterColor.value=d,Y.uniforms.sunDirection.value=h,Y.uniforms.distortionScale.value=g,Y.uniforms.eye.value=f,n.material=Y,n.onBeforeRender=function(V,ee,X){if(_.setFromMatrixPosition(n.matrixWorld),v.setFromMatrixPosition(X.matrixWorld),R.extractRotation(n.matrixWorld),y.set(0,0,1),y.applyMatrix4(R),P.subVectors(_,v),P.dot(y)>0)return;P.reflect(y).negate(),P.add(_),R.extractRotation(X.matrixWorld),w.set(0,0,-1),w.applyMatrix4(R),w.add(v),b.subVectors(_,w),b.reflect(y).negate(),b.add(_),U.position.copy(P),U.up.set(0,1,0),U.up.applyMatrix4(R),U.up.reflect(y),U.lookAt(b),U.far=X.far,U.updateMatrixWorld(),U.projectionMatrix.copy(X.projectionMatrix),I.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),I.multiply(U.projectionMatrix),I.multiply(U.matrixWorldInverse),m.setFromNormalAndCoplanarPoint(y,_),m.applyMatrix4(U.matrixWorldInverse),A.set(m.normal.x,m.normal.y,m.normal.z,m.constant);let oe=U.projectionMatrix;M.x=(Math.sign(A.x)+oe.elements[8])/oe.elements[0],M.y=(Math.sign(A.y)+oe.elements[9])/oe.elements[5],M.z=-1,M.w=(1+oe.elements[10])/oe.elements[14],A.multiplyScalar(2/A.dot(M)),oe.elements[2]=A.x,oe.elements[6]=A.y,oe.elements[10]=A.z+1-o,oe.elements[14]=A.w,f.setFromMatrixPosition(X.matrixWorld);let pe=V.getRenderTarget(),Te=V.xr.enabled,Xe=V.shadowMap.autoUpdate;n.visible=!1,V.xr.enabled=!1,V.shadowMap.autoUpdate=!1,V.setRenderTarget(B),V.state.buffers.depth.setMask(!0),V.autoClear===!1&&V.clear(),V.render(ee,U),n.visible=!0,V.xr.enabled=Te,V.shadowMap.autoUpdate=Xe,V.setRenderTarget(pe);let ft=X.viewport;ft!==void 0&&V.state.viewport(ft)}}};var Is=(s,e)=>{let t=Math.sin(s*127.1+e*311.7)*43758.5453;return t-Math.floor(t)};function zr(s,e){let t=Math.floor(s),n=Math.floor(e),i=s-t,r=e-n,o=i*i*(3-2*i),a=r*r*(3-2*r),l=Is(t,n),c=Is(t+1,n),h=Is(t,n+1),u=Is(t+1,n+1);return l+(c-l)*o+(h-l)*a+(l-c-h+u)*o*a}var St=(s,e,t=5)=>{let n=0,i=.5,r=1;for(let o=0;o<t;o++)n+=i*zr(s*r,e*r),r*=2.03,i*=.5;return n},Ul=(s,e,t=5)=>{let n=0,i=.5,r=1;for(let o=0;o<t;o++)n+=i*(1-Math.abs(zr(s*r,e*r)*2-1))**2,r*=2.07,i*=.5;return n},Oo=(s,e,t)=>{let n=Math.max(0,Math.min(1,(t-s)/(e-s)));return n*n*(3-2*n)};function rd(s){let e=s%2147483647||1;return()=>(e=e*16807%2147483647,e/2147483647)}var Ps=class Ps{constructor(e,t,n){F(this,"cells",new Map);F(this,"pts");F(this,"runway");F(this,"runwayY");this.pts=e,this.runway=t,this.runwayY=n,e.forEach((i,r)=>{let o=`${Math.floor(i.x/Ps.C)},${Math.floor(i.z/Ps.C)}`,a=this.cells.get(o)??[];a.push(r),this.cells.set(o,a)})}near(e,t,n=3){let i=Math.floor(e/Ps.C),r=Math.floor(t/Ps.C),o=1/0,a=0;for(let l=-n;l<=n;l++)for(let c=-n;c<=n;c++){let h=this.cells.get(`${i+l},${r+c}`);if(h)for(let u of h){let d=this.pts[u],f=d.x-e,g=d.z-t,x=f*f+g*g;x<o&&(o=x,a=d.y)}}return{dist:Math.sqrt(o),y:a}}runwayDist(e,t){let n=1/0;for(let i=0;i<this.runway.length-1;i++){let r=this.runway[i],o=this.runway[i+1],a=o.x-r.x,l=o.z-r.z,c=Math.max(0,Math.min(1,((e-r.x)*a+(t-r.z)*l)/(a*a+l*l))),h=r.x+a*c-e,u=r.z+l*c-t;n=Math.min(n,h*h+u*u)}return Math.sqrt(n)}clamp(e,t,n,i=26){let r=this.near(e,t),o=r.y-i+Math.max(0,r.dist-42)*1.25,a=Math.min(n,o),l=this.runwayDist(e,t);if(l<150){let c=Oo(60,150,l);a=(this.runwayY-.35)*(1-c)+a*c}return a}};F(Ps,"C",80);var Nl=Ps;function Jp(s,e,t,n){let{size:i,seg:r,cx:o,cz:a}=s,l=r+1,c=new an(i,i,r,r).rotateX(-Math.PI/2),h=c.attributes.position,u=new Float32Array(l*l);for(let R=0;R<h.count;R++){let w=h.getX(R)+o,A=h.getZ(R)+a,P=e.clamp(w,A,s.height(w,A));u[R]=P,h.setXYZ(R,w,P,A)}c.computeVertexNormals();let d=c.attributes.normal,f=new Float32Array(h.count*3),g=new te;for(let R=0;R<h.count;R++)s.color(u[R],1-d.getY(R),h.getX(R),h.getZ(R),g),f[R*3]=g.r,f[R*3+1]=g.g,f[R*3+2]=g.b;c.setAttribute("color",new lt(f,3));let x=c.attributes.uv;for(let R=0;R<x.count;R++)x.setXY(R,x.getX(R)*i/24,x.getY(R)*i/24);let p=new Ae({vertexColors:!0,map:t,normalMap:n,normalScale:new Q(.9,.9),roughness:.95,metalness:0}),m=new ge(c,p);m.receiveShadow=!0;let y=i/r,_=(R,w)=>{let A=(R-o+i/2)/y,P=(w-a+i/2)/y,b=Math.max(0,Math.min(r-1,Math.floor(A))),M=Math.max(0,Math.min(r-1,Math.floor(P))),I=Math.min(1,Math.max(0,A-b)),U=Math.min(1,Math.max(0,P-M)),B=u[M*l+b],W=u[M*l+b+1],Y=u[(M+1)*l+b],V=u[(M+1)*l+b+1];return B+(W-B)*I+(Y-B)*U+(B-W-Y+V)*I*U};return{mesh:m,at:_,slope:(R,w)=>{let A=y;return Math.hypot(_(R+A,w)-_(R-A,w),_(R,w+A)-_(R,w-A))/(2*A)}}}function jp(s=1){let t=document.createElement("canvas");t.width=t.height=256;let n=t.getContext("2d"),i=n.createImageData(256,256),r=document.createElement("canvas");r.width=r.height=256;let o=r.getContext("2d"),a=o.createImageData(256,256),l=(f,g)=>St(f/18+s,g/18,4)*.7+St(f/5,g/5+s,3)*.3,c=(f,g)=>{let x=f/256,p=g/256;return l(f,g)*(1-x)*(1-p)+l(f-256,g)*x*(1-p)+l(f,g-256)*(1-x)*p+l(f-256,g-256)*x*p},h=new Float32Array(256*256);for(let f=0;f<256;f++)for(let g=0;g<256;g++)h[f*256+g]=c(g,f);for(let f=0;f<256;f++)for(let g=0;g<256;g++){let x=(f*256+g)*4,m=200+h[f*256+g]*55;i.data[x]=i.data[x+1]=i.data[x+2]=Math.min(255,m),i.data[x+3]=255;let y=h[f*256+(g+1)%256]-h[f*256+(g-1+256)%256],_=h[(f+1)%256*256+g]-h[(f-1+256)%256*256+g];a.data[x]=128+y*420,a.data[x+1]=128+_*420,a.data[x+2]=255,a.data[x+3]=255}n.putImageData(i,0,0),o.putImageData(a,0,0);let u=new Pt(t),d=new Pt(r);u.colorSpace=dt;for(let f of[u,d])f.wrapS=f.wrapT=rn,f.anisotropy=8;return{detail:u,normal:d}}function Qp(){let e=document.createElement("canvas");e.width=e.height=256;let t=e.getContext("2d"),n=t.createImageData(256,256),i=(o,a)=>Math.sin(o/256*Math.PI*8+Math.sin(a/256*Math.PI*4)*2)*.5+Math.sin(a/256*Math.PI*10+o/256*Math.PI*2)*.35+St(o/14,a/14,3)*.6;for(let o=0;o<256;o++)for(let a=0;a<256;a++){let l=i(a+1,o)-i(a-1,o),c=i(a,o+1)-i(a,o-1),h=(o*256+a)*4;n.data[h]=128+l*140,n.data[h+1]=128+c*140,n.data[h+2]=255,n.data[h+3]=255}t.putImageData(n,0,0);let r=new Pt(e);return r.wrapS=r.wrapT=rn,r}function Ni(s){let e=s.map(([o,a])=>{let l=o.index?o.toNonIndexed():o.clone();for(let u of Object.keys(l.attributes))u!=="position"&&u!=="normal"&&l.deleteAttribute(u);l.attributes.normal||l.computeVertexNormals();let c=new te(a),h=new Float32Array(l.attributes.position.count*3);for(let u=0;u<h.length;u+=3)h[u]=c.r,h[u+1]=c.g,h[u+2]=c.b;return l.setAttribute("color",new lt(h,3)),l}),t=[],n=[],i=[];for(let o of e)t.push(...o.attributes.position.array),n.push(...o.attributes.normal.array),i.push(...o.attributes.color.array);let r=new et;return r.setAttribute("position",new we(t,3)),r.setAttribute("normal",new we(n,3)),r.setAttribute("color",new we(i,3)),r}function Hl(s,e=1){let t=new ri(1,e),n=t.attributes.position,i=new S;for(let r=0;r<n.count;r++){i.fromBufferAttribute(n,r);let o=.75+St(i.x*1.6+s,i.y*1.6+i.z,3)*.6;i.multiplyScalar(o),n.setXYZ(r,i.x,i.y,i.z)}return t.computeVertexNormals(),t}var pM={tropical:{sky:{turbidity:2.4,rayleigh:1.1,mie:.004,mieG:.8,elev:52,azim:150},exposure:.5,fog:11850474,fogNear:500,fogFar:3400,sun:[16773596,3.4],hemi:[13625087,6258522,1.15],water:"sea",waterY:0,waterColor:679808,veg:[["palm",1700],["broadleaf",500]],clouds:70},snow:{sky:{turbidity:1.4,rayleigh:.55,mie:.003,mieG:.75,elev:30,azim:205},exposure:.5,fog:14082798,fogNear:400,fogFar:2700,sun:[16774376,3],hemi:[15134975,9082534,1.3],water:"ice",waterY:3,waterColor:12575474,veg:[["pine",2600]],clouds:60,weather:"snow"},city:{sky:{turbidity:5.5,rayleigh:2.6,mie:.007,mieG:.88,elev:5,azim:245},exposure:.62,fog:14196864,fogNear:500,fogFar:3e3,sun:[16754282,2.8],hemi:[10466016,4864576,.95],water:"sea",waterY:0,waterColor:1718869,veg:[["broadleaf",500]],clouds:45},jungle:{sky:{turbidity:7,rayleigh:1.6,mie:.006,mieG:.82,elev:42,azim:115},exposure:.5,fog:11980212,fogNear:300,fogFar:2300,sun:[16773320,3.1],hemi:[14217424,3824170,1.2],water:"river",waterY:4,waterColor:2775624,veg:[["jungle",3200],["palm",500]],clouds:60,weather:"mist"},desert:{sky:{turbidity:9,rayleigh:.9,mie:.006,mieG:.8,elev:58,azim:100},exposure:.48,fog:15323560,fogNear:600,fogFar:3300,sun:[16773328,3.7],hemi:[16770752,11569754,1.05],water:"none",waterY:-50,waterColor:2779770,veg:[["cactus",900]],clouds:25,weather:"dust"}},Ui=null;function mM(s){if(Ui)return Ui;let e=new Fo;e.scale.setScalar(9e3);let t=new Dl(new an(12e3,12e3).rotateX(-Math.PI/2),{textureWidth:s?256:512,textureHeight:s?256:512,waterNormals:Qp(),sunDirection:new S(0,1,0),sunColor:16777215,waterColor:679808,distortionScale:3.2,fog:!0});return t.material.uniforms.size.value=6,Ui={sky:e,water:t,detail:jp(3)},Ui}var ko=class{constructor(e,t,n,i,r,o){F(this,"group",new qe);F(this,"def");F(this,"theme");F(this,"sunDir",new S);F(this,"runwayY",6);F(this,"rings",[]);F(this,"blockers",[]);F(this,"terrain");F(this,"track");F(this,"field");F(this,"lite");F(this,"rnd");F(this,"anims",[]);F(this,"env",null);F(this,"owned",[]);F(this,"pose");this.track=n,this.def=i,this.theme=pM[i.key],this.lite=o,this.rnd=rd(i.key.length*7919+13),this.pose={p:new S,t:new S,r:new S,u:new S,turn:0,climb:0};let a=this.theme,l=mM(o);e.add(this.group);let c=l.sky.material.uniforms;c.turbidity.value=a.sky.turbidity,c.rayleigh.value=a.sky.rayleigh,c.mieCoefficient.value=a.sky.mie,c.mieDirectionalG.value=a.sky.mieG,this.sunDir.setFromSphericalCoords(1,oi.degToRad(90-a.sky.elev),oi.degToRad(a.sky.azim)),c.sunPosition.value.copy(this.sunDir),this.group.add(l.sky),t.toneMappingExposure=a.exposure;let h=new Mr(t),u=new br;u.add(l.sky.clone()),this.env=h.fromScene(u,.04).texture,h.dispose(),e.environment=this.env,e.environmentIntensity=.45,e.fog=new ka(a.fog,a.fogNear,a.fogFar),r.sun.color.setHex(a.sun[0]),r.sun.intensity=a.sun[1],r.hemi.color.setHex(a.hemi[0]),r.hemi.groundColor.setHex(a.hemi[1]),r.hemi.intensity=a.hemi[2];let d=[];for(let g=-(Math.ceil(It.maxRacers/It.gridCols)*It.gridGap+120);g<=640;g+=20)n.pose(g/It.lapLen,this.pose),d.push(this.pose.p.clone().setY(this.runwayY));this.field=new Nl(n.samples(Math.ceil(n.length/12)),d,this.runwayY),this.terrain=Jp(this.terrainSpec(),this.field,l.detail.detail,l.detail.normal),this.add(this.terrain.mesh),this.waterSetup(l.water);let f=Math.max(1,n.length/7500)*.65;for(let[g,x]of a.veg)this.vegetation(g,Math.round(x*f*(o?.5:1)));this.rocks(),this.clouds(Math.round(a.clouds*f*(o?.6:1))),this.airport(d),this.startGate(),this.checkpoints(),this.speedGates(),this.mines(),this.shortcutArch(),this.balloons(),this.themeProps(),a.weather&&this.weather(a.weather)}add(...e){this.group.add(...e),this.owned.push(...e)}side(e,t,n=0){let i=this.track.pose(e,this.pose);return i.p.clone().addScaledVector(i.r,t).addScaledVector(i.u,n)}ground(e,t){return this.terrain.at(e,t)}bounds(){let e=this.track.samples(200),t=new on().setFromPoints(e);return{c:t.getCenter(new S),r:Math.max(t.max.x-t.min.x,t.max.z-t.min.z)/2}}terrainSpec(){let{c:e,r:t}=this.bounds(),n=t*2+2600,i=this.lite?260:420,r=this.def.key,o=new te,a=g=>o.setHex(g),l=this.track.samples(60),c=rd(77),h=[];if(r==="tropical"||r==="city"){for(let g=0;g<18*Math.max(1,this.track.length/7500);g++){let x=l[Math.floor(c()*l.length)],p=c()*Math.PI*2,m=90+c()*260;h.push({x:x.x+Math.cos(p)*m,z:x.z+Math.sin(p)*m,r:90+c()*180,h:40+c()*(r==="city"?120:220)})}for(let g=0;g<7;g++){let x=g/7*Math.PI*2+c();h.push({x:e.x+Math.cos(x)*(t+600),z:e.z+Math.sin(x)*(t+600),r:320+c()*200,h:260+c()*200})}if(r==="city"){let g=this.side(.5,0);h.push({x:g.x,z:g.z,r:420,h:9,flat:!0})}}let u=(g,x)=>{let p=-16;for(let m of h){let y=Math.hypot(g-m.x,x-m.z)/m.r;if(y>=1.15)continue;let _=Math.max(0,1-y*y),v=m.flat?y<1?Math.min(m.h,m.h*_*5)+St(g/40,x/40,2)*1.5:-6:m.h*_**1.4*(.35+.55*Ul(g/160+m.r,x/160,4)+.3*St(g/90,x/90,3));p=Math.max(p,v-6*(1-_))}return p},d={tropical:u,city:u,snow:(g,x)=>18+340*Ul(g/760,x/760,6)**1.6*(.45+.75*St(g/1600+3,x/1600,3))+18*St(g/120,x/120,3),jungle:(g,x)=>{let p=12+34*St(g/320,x/320,4),m=zr(g/115,x/115),y=Oo(.6,.78,m)*(120+120*zr(g/57+4,x/57)),_=Oo(.46,.38,St(g/420+7,x/420,3))*30;return p+y+70*Ul(g/700,x/700,4)**2-_},desert:(g,x)=>{let p=2*St(g/320,x/320,3),m=16+15*(1-Math.abs(Math.sin(g/95+x/260+p)))**2+8*St(g/60,x/60,3),y=St(g/540+9,x/540,4),_=Oo(.55,.585,y)*(90+50*St(g/200,x/200,2));return m+_}},f={tropical:(g,x,p,m,y)=>{g<-2?y.copy(a(4175792)).lerp(a(1929096),Math.min(1,-g/14)):g<3.5?y.copy(a(15785124)):x>.5?y.copy(a(9142128)).lerp(a(6972504),Is(p,m)*.5):y.copy(a(5218108)).lerp(a(3111474),St(p/60,m/60,3))},city:(g,x,p,m,y)=>{g<-2?y.copy(a(2779770)):g<3?y.copy(a(13154448)):g<12&&x<.2?y.copy(a(8027778)).lerp(a(6265418),St(p/50,m/50,2)*.4):x>.5?y.copy(a(8747628)):y.copy(a(4885052)).lerp(a(3501616),St(p/60,m/60,3))},snow:(g,x,p,m,y)=>{g>40+St(p/80,m/80,3)*60&&x<.55?y.copy(a(16185852)).lerp(a(14411504),Is(p,m)*.4):x>.42?y.copy(a(6053734)).lerp(a(8093574),St(p/30,m/30,2)):y.copy(a(7305832)).lerp(a(15265524),.55)},jungle:(g,x,p,m,y)=>{g<9?y.copy(a(6969914)):x>.6?y.copy(a(7236188)).lerp(a(4872762),St(p/20,m/20,2)*.7):y.copy(a(3107366)).lerp(a(1855260),St(p/50,m/50,3))},desert:(g,x,p,m,y)=>{if(x>.38){let _=(Math.sin(g/5.5)+1)/2;y.copy(a(11687214)).lerp(a(14191186),_).lerp(a(9062958),St(p/25,m/25,2)*.3)}else g>70?y.copy(a(13207118)):y.copy(a(14925182)).lerp(a(13935716),St(p/40,m/40,3))}};return{size:n,seg:i,cx:e.x,cz:e.z,height:d[r],color:f[r]}}waterSetup(e){let t=this.theme;if(t.water==="sea"||t.water==="river"){let n=e.material.uniforms;n.waterColor.value.setHex(t.waterColor),n.sunDirection.value.copy(this.sunDir),n.sunColor.value.setHex(t.sun[0]),e.position.y=t.waterY,this.group.add(e),this.anims.push(i=>{n.time.value+=i*.6})}else if(t.water==="ice"){let n=new ge(new an(12e3,12e3).rotateX(-Math.PI/2),new vt({color:t.waterColor,roughness:.12,metalness:0,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:1.3}));n.position.y=t.waterY,n.receiveShadow=!0,this.add(n),this.anims.push((i,r,o)=>{n.position.x=o.position.x,n.position.z=o.position.z})}}vegGeo(e){switch(e){case"palm":{let t=[];for(let n=0;n<6;n++)t.push([new $e(.32-n*.03,.38-n*.03,2.2,7).translate(n*n*.05,1.1+n*2.1,0),n%2?8018490:9071174]);for(let n=0;n<9;n++){let i=new Ye(.9,.06,6.5).translate(0,0,3.1);i.rotateX(.55+n%2*.2),i.rotateY(n/9*Math.PI*2),i.translate(1.25,12.6,0),t.push([i,n%2?4165418:3111458])}return t.push([new $t(.7,8,6).translate(1.25,12.4,0),6965792]),Ni(t)}case"pine":{let t=[[new $e(.4,.55,3,6).translate(0,1.5,0),5914408]];for(let n=0;n<4;n++){let i=4.4-n*.95,r=3+n*3.4;t.push([new ln(i,5,9).translate(0,r+2.5,0),2050610]),t.push([new ln(i*.78,2.2,9).translate(0,r+3.9,0),15922938])}return Ni(t)}case"jungle":case"broadleaf":{let t=e==="jungle",n=[[new $e(.5,.8,t?12:6,7).translate(0,t?6:3,0),5916208]],i=t?6:4;for(let r=0;r<i;r++){let o=r/i*Math.PI*2,a=t?3.2:2;n.push([new ri(t?4.2:2.8,1).scale(1,.7,1).translate(Math.cos(o)*a,(t?13:6.5)+r%2*1.6,Math.sin(o)*a),[3107362,4029738,2381852][r%3]])}return n.push([new ri(t?4.6:3,1).scale(1,.8,1).translate(0,t?16:8.5,0),4622638]),Ni(n)}case"cactus":return Ni([[new ji(.7,8,4,9).translate(0,4.4,0),4880954],[new ji(.45,2.6,4,8).translate(1.6,6.2,0),4880954],[new $e(.45,.45,1.4,8).rotateZ(Math.PI/2).translate(.9,4.9,0),4880954],[new ji(.42,2.2,4,8).translate(-1.5,5.2,0),5603136],[new $e(.42,.42,1.3,8).rotateZ(Math.PI/2).translate(-.8,4.1,0),5603136]])}}vegetation(e,t){let n=this.vegGeo(e),i=new Yt(n,new Ae({vertexColors:!0,roughness:.9}),t),r=this.track.samples(120),o=new Ze,a=this.theme.waterY,l=0;for(let c=0;l<t&&c<t*8;c++){let h=r[Math.floor(this.rnd()*r.length)],u=this.rnd()*Math.PI*2,d=20+this.rnd()**.7*900,f=h.x+Math.cos(u)*d,g=h.z+Math.sin(u)*d,x=this.ground(f,g),p=this.terrain.slope(f,g);if(this.field.runwayDist(f,g)<90||!(e==="palm"?x>1.5&&x<40&&p<.5:e==="pine"?x>a+2&&p<.7&&x<260:e==="cactus"?p<.35&&x<60:x>Math.max(2.5,a+1)&&p<.9))continue;let y=this.field.near(f,g);y.dist<30&&x+25>y.y-10||(o.position.set(f,x-.3,g),o.rotation.set((this.rnd()-.5)*.12,this.rnd()*6.3,(this.rnd()-.5)*.12),o.scale.setScalar(.8+this.rnd()*.7),o.updateMatrix(),i.setMatrixAt(l++,o.matrix))}i.count=l,i.instanceMatrix.needsUpdate=!0,this.add(i)}rocks(){let e=this.def.key,t=Math.round((this.lite?120:260)*Math.max(1,this.track.length/7500)*.7),n={tropical:9076848,snow:6975094,city:8222058,jungle:6974042,desert:10902068}[e],i=new Yt(Hl(5),new Ae({color:n,roughness:.95,flatShading:!0}),t),r=this.track.samples(80),o=new Ze,a=0;for(let l=0;a<t&&l<t*6;l++){let c=r[Math.floor(this.rnd()*r.length)],h=this.rnd()*6.3,u=40+this.rnd()*700,d=c.x+Math.cos(h)*u,f=c.z+Math.sin(h)*u;if(this.field.runwayDist(d,f)<100)continue;let g=this.ground(d,f),x=3+this.rnd()**2*14;o.position.set(d,g+x*.2,f),o.rotation.set(this.rnd()*3,this.rnd()*3,this.rnd()*3),o.scale.set(x,x*(.5+this.rnd()*.6),x*(.7+this.rnd()*.5)),o.updateMatrix(),i.setMatrixAt(a++,o.matrix)}i.count=a,i.receiveShadow=!0,this.add(i)}clouds(e){let n=document.createElement("canvas");n.width=n.height=128;let i=n.getContext("2d"),r=i.createImageData(128,128);for(let p=0;p<128;p++)for(let m=0;m<128;m++){let y=m/128-.5,_=p/128-.5,v=Math.sqrt(y*y+_*_)*2,R=Math.max(0,1-v)**1.4*(.55+.6*St(m/18,p/18,4)),w=(p*128+m)*4;r.data[w]=r.data[w+1]=r.data[w+2]=255,r.data[w+3]=Math.min(255,R*255)}i.putImageData(r,0,0);let o=new Pt(n),a=[],l=[],c=0;for(let p=0;c<e&&p<e*8;p++){let{c:m,r:y}=this.bounds(),_=this.rnd()*6.3,v=this.rnd()**.6*(y+1400),R=m.x+Math.cos(_)*v,w=m.z+Math.sin(_)*v,A=170+this.rnd()*220,P=this.field.near(R,w,2);if(P.dist<120&&Math.abs(P.y-A)<90)continue;c++;let b=6+Math.floor(this.rnd()*9),M=40+this.rnd()*50;for(let I=0;I<b;I++){let U=A+(this.rnd()-.4)*M*.5;a.push(R+(this.rnd()-.5)*M*3.2,U,w+(this.rnd()-.5)*M*2.2,M*(1.2+this.rnd()*1.1)),l.push(.72+.28*Math.min(1,(U-A+M*.3)/(M*.6)))}}let h=new ol;h.setAttribute("position",new we([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],3)),h.setAttribute("uv",new we([0,0,1,0,1,1,0,1],2)),h.setIndex([0,1,2,0,2,3]),h.setAttribute("puff",new si(new Float32Array(a),4)),h.setAttribute("shade",new si(new Float32Array(l),1)),h.instanceCount=l.length;let u=this.theme,d=new te(u.fog),f=new te(u.sun[0]),g=new Mt({transparent:!0,depthWrite:!1,uniforms:{map:{value:o},fogColor:{value:d},sunColor:{value:f},fogFar:{value:u.fogFar*1.4}},vertexShader:`attribute vec4 puff; attribute float shade; varying vec2 vUv; varying float vShade; varying float vDist;
        void main(){ vUv = uv; vShade = shade; vec4 mv = viewMatrix * vec4(puff.xyz, 1.0); mv.xy += position.xy * puff.w; vDist = -mv.z; gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform sampler2D map; uniform vec3 fogColor; uniform vec3 sunColor; uniform float fogFar; varying vec2 vUv; varying float vShade; varying float vDist;
        void main(){ vec4 t = texture2D(map, vUv); vec3 c = mix(vec3(0.62, 0.68, 0.78), vec3(1.0), vShade) * mix(vec3(1.0), sunColor, 0.25);
          float f = clamp(vDist / fogFar, 0.0, 1.0); c = mix(c, fogColor, f * 0.8);
          float a = t.a * 0.85 * (1.0 - smoothstep(fogFar * 0.85, fogFar, vDist)) * smoothstep(20.0, 120.0, vDist);
          if (a < 0.01) discard; gl_FragColor = vec4(c, a); }`}),x=new ge(h,g);x.frustumCulled=!1,x.renderOrder=1,this.add(x)}airport(e){let n=document.createElement("canvas");n.width=256,n.height=1024;let i=n.getContext("2d");i.fillStyle="#3b3e43",i.fillRect(0,0,256,1024);for(let b=0;b<4e3;b++)i.fillStyle=`rgba(${Math.random()<.5?"255,255,255":"0,0,0"},0.05)`,i.fillRect(Math.random()*256,Math.random()*1024,2,2);i.fillStyle="#f2f2f2",i.fillRect(8,0,6,1024),i.fillRect(242,0,6,1024);for(let b=0;b<1024;b+=64)i.fillRect(125,b,6,36);let r=new Pt(n);r.colorSpace=dt,r.wrapT=rn,r.anisotropy=8;let o=[],a=[],l=[],c=0;e.forEach((b,M)=>{let I=e[Math.min(M+1,e.length-1)],U=e[Math.max(M-1,0)],B=I.clone().sub(U).setY(0).normalize(),W=new S(-B.z,0,B.x);M&&(c+=b.distanceTo(e[M-1]));let Y=b.clone().addScaledVector(W,64/2),V=b.clone().addScaledVector(W,-64/2);if(o.push(Y.x,this.runwayY+.05,Y.z,V.x,this.runwayY+.05,V.z),a.push(1,c/60,0,c/60),M){let ee=M*2;l.push(ee-2,ee-1,ee,ee-1,ee+1,ee)}});let h=new et;h.setAttribute("position",new we(o,3)),h.setAttribute("uv",new we(a,2)),h.setIndex(l),h.computeVertexNormals();let u=new ge(h,new Ae({map:r,roughness:.85,metalness:0,side:Ct,polygonOffset:!0,polygonOffsetFactor:-2}));u.receiveShadow=!0,this.add(u);let d=new Yt(new $t(.45,8,6),new Fe({color:li(16773824),toneMapped:!1}),e.length*2),f=new Ze;e.forEach((b,M)=>{let I=e[Math.min(M+1,e.length-1)],U=e[Math.max(M-1,0)],B=I.clone().sub(U).setY(0).normalize(),W=new S(-B.z,0,B.x);for(let Y of[1,-1])f.position.copy(b).addScaledVector(W,Y*(64/2+1.5)).setY(this.runwayY+.5),f.updateMatrix(),d.setMatrixAt(M*2+(Y>0?0:1),f.matrix)}),this.add(d);let g=e[Math.floor(e.length*.45)],x=e[Math.floor(e.length*.45)+1],p=x.clone().sub(g).setY(0).normalize(),m=new S(-p.z,0,p.x),y=Math.atan2(p.x,p.z),_=(b,M)=>g.clone().addScaledVector(m,b).addScaledVector(p,M).setY(this.runwayY),v=new Ae({color:14210768,roughness:.8}),R=new vt({color:2771562,metalness:.6,roughness:.08,envMapIntensity:1.5}),w=new qe;w.add(ct(new $e(2.6,3.4,34,16).translate(0,17,0),v)),w.add(ct(new $e(6.2,4.4,6,12).translate(0,37,0),R)),w.add(ct(new $e(6.8,6.8,1.2,12).translate(0,40.6,0),v)),w.add(ct(new $e(.2,.2,8,6).translate(0,45,0),v)),w.position.copy(_(-95,40)),this.add(w);let A=ct(new Ye(110,16,34).translate(0,8,0),v);A.position.copy(_(-120,-90)),A.rotation.y=y,this.add(A);let P=ct(new Ye(111,7,35).translate(0,9,0),R);P.position.copy(A.position),P.rotation.y=y,this.add(P);for(let b=0;b<3;b++){let M=new qe;M.add(ct(new $e(18,18,44,24,1,!1,-Math.PI/2,Math.PI).rotateX(Math.PI/2),new Ae({color:11120824,metalness:.7,roughness:.4}))),M.add(ct(new an(30,14).translate(0,7,22.1),new Ae({color:3817286,roughness:.6}))),M.position.copy(_(-100,150+b*46)),M.rotation.y=y+Math.PI/2,this.add(M)}}startGate(){let e=this.track.pose(0,this.pose),t=e.p.clone().setY(this.runwayY),n=e.t.clone().setY(0).normalize(),i=new S(-n.z,0,n.x),r=new qe,o=58,a=92,l=new Ae({color:15264752,metalness:.8,roughness:.3}),c=new Fe({color:li(3663615),toneMapped:!1});for(let p of[1,-1]){r.add(ct(new Ye(5,o+8,5).translate(p*a/2,(o+8)/2,0),l));for(let m=0;m<8;m++)r.add(ct(new Ye(5.2,1.2,5.2).translate(p*a/2,6+m*7.5,0),m%2?c:new Fe({color:li(16724838),toneMapped:!1})))}let h=p=>{let m=document.createElement("canvas");m.width=1024,m.height=128;let y=m.getContext("2d");for(let v=0;v<64;v++)for(let R=0;R<8;R++)y.fillStyle=(v+R)%2?"#111":"#fff",y.fillRect(v*16,R*16,16,16);y.fillStyle="rgba(220,20,50,0.95)",y.fillRect(150,12,724,104),y.font='italic 900 70px "Segoe UI", Arial',y.textAlign="center",y.textBaseline="middle",y.fillStyle="#fff",y.fillText(p,512,66);let _=new Pt(m);return _.colorSpace=dt,_.anisotropy=8,_},u=new Fe({map:h("\u2708 XU\u1EA4T PH\xC1T \u2708"),toneMapped:!1}),d=new Fe({map:h("\u{1F3C1} V\u1EC0 \u0110\xCDCH \u{1F3C1}"),toneMapped:!1});r.add(new ge(new Ye(a+5,10,2).translate(0,o+3,0),[l,l,l,l,d,u]));let f=document.createElement("canvas");f.width=256,f.height=32;let g=f.getContext("2d");for(let p=0;p<16;p++)for(let m=0;m<2;m++)g.fillStyle=(p+m)%2?"#111":"#fff",g.fillRect(p*16,m*16,16,16);let x=new Pt(f);x.colorSpace=dt,r.add(ct(new an(64,8).rotateX(-Math.PI/2).translate(0,.08,0),new Ae({map:x,roughness:.8}))),r.position.copy(t),r.rotation.y=Math.atan2(n.x,n.z),this.add(r)}checkpoints(){let e=this.track.length,t=Math.floor(e/380),n=new En(26,1.3,12,64),i=new En(23.5,.35,6,64),r=[];for(let l=0;l<12;l++){let c=l/12*Math.PI*2;r.push([new ln(.9,2.4,4).rotateX(Math.PI/2).translate(Math.cos(c)*24.8,Math.sin(c)*24.8,0),16777215])}let o=Ni(r),a=[3663615,16732120,16765498];for(let l=0;l<t;l++){let c=(l+.35)/t;if(c*e<700||c*e>e-300)continue;let h=this.track.pose(c,this.pose),u=new qe,d=li(a[l%3]),f=new Fe({color:d.clone(),toneMapped:!1,transparent:!0,opacity:.95});u.add(new ge(n,f),new ge(i,f));let g=new ge(o,f);u.add(g),u.position.copy(h.p),u.lookAt(h.p.clone().add(h.t)),this.add(u),this.rings.push({u:c,group:u,mat:f,base:d,flash:0}),this.anims.push(x=>{g.rotation.z+=x*.8})}}flashRing(e){let t=this.rings[e];t&&(t.flash=1)}speedGates(){let e=document.createElement("canvas");e.width=256,e.height=128;let t=e.getContext("2d");t.clearRect(0,0,256,128),t.fillStyle="#b8ff3a";for(let o=0;o<3;o++){t.beginPath();let a=30+o*70;t.moveTo(a,20),t.lineTo(a+40,64),t.lineTo(a,108),t.lineTo(a+18,108),t.lineTo(a+58,64),t.lineTo(a+18,20),t.fill()}let n=new Pt(e),i=new Fe({color:li(10354490),toneMapped:!1}),r=new Fe({map:n,transparent:!0,blending:Gt,depthWrite:!1,side:Ct,toneMapped:!1});for(let o of this.def.pads)for(let a=0;a<5;a++){let l=o.at+o.len*a/4,c=this.track.pose(l,this.pose),h=new qe;for(let[d,f,g,x]of[[44,1.2,0,13],[44,1.2,0,-13],[1.2,27,22,0],[1.2,27,-22,0]])h.add(ct(new Ye(d,f,1.2).translate(g,x,0),i));let u=new ge(new an(14,7).rotateZ(-Math.PI/2),r);u.position.y=16.5,u.rotation.x=0,h.add(u),h.position.copy(c.p),h.lookAt(c.p.clone().add(c.t)),this.add(h)}this.anims.push((o,a)=>{i.color.setHSL(.24,1,.5+.15*Math.sin(a*8)).multiplyScalar(3)})}mines(){let e=[new ri(1.4,1)];for(let h=0;h<12;h++){let u=new S().randomDirection();e.push(new ln(.28,1.2,6).translate(0,1.6,0).applyQuaternion(new sn().setFromUnitVectors(new S(0,1,0),u)))}let t=Ni(e.map((h,u)=>[h,u?4869718:2764083])),n=this.def.obstacles.length*8,i=new Yt(t,new Ae({vertexColors:!0,metalness:.8,roughness:.35}),n),r=new Yt(new $t(.55,8,6),new Fe({color:li(16719904),toneMapped:!1}),n),o=new Ze,a=[],l=0;for(let h of this.def.obstacles)for(let u=0;u<8;u++){let d=(u%2?1:-1)*(24+this.rnd()*12),f=(this.rnd()-.5)*16,g=(this.rnd()-.5)*40/this.track.length,x=this.side(h+g,d,f);a.push(x),o.position.copy(x),o.rotation.set(this.rnd()*3,this.rnd()*3,0),o.scale.setScalar(1),o.updateMatrix(),i.setMatrixAt(l,o.matrix),o.position.y+=1.6,o.updateMatrix(),r.setMatrixAt(l,o.matrix),l++}this.add(i,r);let c=r.material;this.anims.push((h,u)=>{c.color.setRGB(Math.sin(u*6)>0?4:.3,.1,.1),i.rotation.y=0})}shortcutArch(){let e=this.def.shortcut,t=this.def.key,n=t==="snow"?new vt({color:11066608,roughness:.15,transmission:0,clearcoat:1,emissive:2779786,emissiveIntensity:.3}):t==="city"?new Ae({color:10133672,metalness:.9,roughness:.3}):new Ae({color:t==="desert"?11558970:8025190,roughness:.95,flatShading:!0});for(let a of[.15,.5,.85]){let l=e.at+e.len*a,c=this.track.pose(l,this.pose),h=c.p.clone().addScaledVector(c.r,34).addScaledVector(c.u,-6),u=new En(12,t==="city"?1.2:3.6,10,40);if(t!=="city"){let f=u.attributes.position,g=new S;for(let x=0;x<f.count;x++)g.fromBufferAttribute(f,x),g.multiplyScalar(1+(St(g.x*.3+a*9,g.y*.3+g.z*.3,3)-.5)*.25),f.setXYZ(x,g.x,g.y,g.z);u.computeVertexNormals()}let d=new ge(u,n);d.position.copy(h),d.lookAt(h.clone().add(c.t)),d.castShadow=!0,this.blockers.push(d),this.add(d)}let i=document.createElement("canvas");i.width=256,i.height=128;let r=i.getContext("2d");r.fillStyle="#ffd21a",r.fillRect(0,0,256,128),r.fillStyle="#111",r.fillRect(6,6,244,116),r.fillStyle="#ffd21a",r.font='900 34px "Segoe UI"',r.textAlign="center",r.fillText("\u26A0 \u0110\u01AF\u1EDCNG T\u1EAET",128,56),r.font='800 22px "Segoe UI"',r.fillText("nhanh m\xE0 d\u1EC5 \u0111\xE2m!",128,94);let o=new Si(new ii({map:new Pt(i),depthWrite:!1}));o.position.copy(this.side(e.at-.004,40,14)),o.scale.set(20,10,1),this.add(o)}balloons(){let e=[15217199,16765498,3112182,3458905,16736168,16747039],t=[];for(let x=0;x<=16;x++){let p=x/16;t.push(new Q(Math.sin(p*Math.PI)**.85*9*(p<.3?.45+p*1.8:1)+.6,p*20-10))}let n=[];for(let x=0;x<12;x++)n.push([new _o(t,2,x/12*Math.PI*2,Math.PI*2/12),e[x%e.length]]);n.push([new Ye(2.4,1.8,2.4).translate(0,-13,0),8018482]);for(let[x,p]of[[1,1],[1,-1],[-1,1],[-1,-1]])n.push([new $e(.05,.05,3.2,4).translate(x*1.1,-11,p*1.1),3355443]);let i=Ni(n),r=Math.round(10*Math.max(1,this.track.length/7500)),o=new Yt(i,new Ae({vertexColors:!0,roughness:.6}),r),a=[];for(let x=0;x<r;x++){let p=.18+x/r*.78,m=(x%2?1:-1)*(75+this.rnd()*90),y=this.side(p,m,10+this.rnd()*30);y.y=Math.max(y.y,this.ground(y.x,y.z)+30),a.push({p:y,ph:this.rnd()*6,s:1+this.rnd()*.6})}let l=new Ze,c=x=>{a.forEach((p,m)=>{l.position.copy(p.p),l.position.y+=Math.sin(x*.4+p.ph)*3,l.rotation.y=x*.05+p.ph,l.scale.setScalar(p.s),l.updateMatrix(),o.setMatrixAt(m,l.matrix)}),o.instanceMatrix.needsUpdate=!0};c(0),this.add(o),this.anims.push((x,p)=>c(p));let h=document.createElement("canvas");h.width=512,h.height=128;let u=h.getContext("2d");u.fillStyle="#e8eaee",u.fillRect(0,0,512,128),u.fillStyle="#d8262b",u.fillRect(0,40,512,48),u.font='italic 900 40px "Segoe UI"',u.textAlign="center",u.textBaseline="middle",u.fillStyle="#fff",u.fillText("\u2708 \u0110UA M\xC1Y BAY \u2708",256,66);let d=new Pt(h);d.colorSpace=dt;let f=new qe;f.add(ct(new $t(1,32,16).scale(9,9,32),new Ae({map:d,roughness:.5}))),f.add(ct(new Ye(3,2.5,8).translate(0,-9.5,4),new Ae({color:3817286})));for(let[x,p]of[[0,0],[Math.PI/2,0]])f.add(ct(new Ye(.4,16,7).rotateZ(x).translate(0,0,-27).rotateZ(p),new Ae({color:14165547})));let g=this.side(.35,-130,60);f.position.copy(g),this.add(f),this.anims.push((x,p)=>{f.rotation.y=p*.03,f.position.x=g.x+Math.sin(p*.03)*80,f.position.z=g.z+Math.cos(p*.03)*80})}themeProps(){switch(this.def.key){case"tropical":this.seaStacks(),this.boats(),this.lighthouse();break;case"snow":for(let e of[.33,.62])this.waterfall(e,150,!0);this.iceSpikes();break;case"city":this.city(),this.bridge();break;case"jungle":for(let e of[.3,.48,.74])this.waterfall(e,130,!1);this.temple();break;case"desert":this.mesas(),this.oasis();break}}seaStacks(){let t=new Yt(Hl(9,2),new Ae({color:9075814,roughness:.95,flatShading:!0}),26),n=new Ze,i=0;for(let r=0;r<26*5&&i<26;r++){let o=this.rnd(),a=(this.rnd()<.5?-1:1)*(45+this.rnd()*160),l=this.side(o,a);if(this.ground(l.x,l.z)>-2||this.field.runwayDist(l.x,l.z)<120)continue;let c=this.field.near(l.x,l.z),h=Math.max(20,Math.min(c.y-18+Math.max(0,c.dist-40),30+this.rnd()*70));n.position.set(l.x,h*.45-6,l.z),n.scale.set(8+this.rnd()*8,h*.55,8+this.rnd()*8),n.rotation.y=this.rnd()*6,n.updateMatrix(),t.setMatrixAt(i++,n.matrix)}t.count=i,this.add(t),this.blockers.push(t)}boats(){let e=Ni([[new Ye(3,1.4,10).translate(0,.4,0),16053492],[new ln(1.5,3,4).rotateX(Math.PI/2).rotateZ(Math.PI/4).translate(0,.4,6.4),16053492],[new $e(.12,.12,12,5).translate(0,7,0),6969920],[new et().setAttribute("position",new we([0,1.5,.3,0,12.5,.3,0,1.5,-5.5,0,1.5,.3,0,1.5,-5.5,0,12.5,.3],3)),16776170]]),t=14,n=new Yt(e,new Ae({vertexColors:!0,roughness:.6,side:Ct}),t),i=new Ze,r=[],o=0;for(let a=0;a<100&&o<t;a++){let l=this.side(this.rnd(),(this.rnd()-.5)*600);this.ground(l.x,l.z)>-3||(r.push(l.setY(.3)),o++)}n.count=o,this.anims.push((a,l)=>{r.forEach((c,h)=>{i.position.copy(c),i.rotation.set(Math.sin(l+h)*.05,h,Math.sin(l*1.3+h)*.06),i.updateMatrix(),n.setMatrixAt(h,i.matrix)}),n.instanceMatrix.needsUpdate=!0}),this.add(n)}lighthouse(){let e=this.side(.08,-150);for(let o=0;o<30&&this.ground(e.x,e.z)<3;o++)e=this.side(this.rnd(),(this.rnd()<.5?-1:1)*(100+this.rnd()*200));let t=new qe,n=new Ae({color:16119285,roughness:.6}),i=new Ae({color:13774639,roughness:.6});for(let o=0;o<6;o++)t.add(ct(new $e(3.2-o*.25,3.45-o*.25,5,16).translate(0,2.5+o*5,0),o%2?i:n));let r=ct(new $t(2.2,12,10).translate(0,32,0),new Fe({color:li(16773792),toneMapped:!1}));t.add(r),t.position.set(e.x,this.ground(e.x,e.z),e.z),this.add(t)}waterfall(e,t,n){let i=this.side(e,t),r=this.ground(i.x,i.z),o=this.field.near(i.x,i.z),a=Math.max(r+50,Math.min(o.y+30,r+110)),l=a-r,c=this.track.pose(e,this.pose).p.clone().sub(i).setY(0).normalize(),h=Math.atan2(c.x,c.z),u=new qe,d=ct(Hl(e*50,2).scale(60,l*.62,18).translate(0,l*.5,-14),new Ae({color:n?6975608:6183502,roughness:.95,flatShading:!0}));d.castShadow=!0,d.receiveShadow=!0,u.add(d);let f=document.createElement("canvas");f.width=64,f.height=256;let g=f.getContext("2d");for(let _=0;_<260;_++)g.fillStyle=`rgba(255,255,255,${.25+Math.random()*.6})`,g.fillRect(Math.random()*64,Math.random()*256,1+Math.random()*3,8+Math.random()*40);let x=new Pt(f);x.wrapS=x.wrapT=rn,x.repeat.set(2,2);let p=new an(22,l,4,12),m=p.attributes.position;for(let _=0;_<m.count;_++){let v=m.getY(_)/l+.5;m.setZ(_,Math.sin((1-v)*Math.PI*.5)*3-3+(1-v)*4)}p.translate(0,l/2,0),p.computeVertexNormals();let y=n?new vt({color:12577023,roughness:.1,metalness:0,clearcoat:1,transparent:!0,opacity:.88,emissive:5941464,emissiveIntensity:.35,map:x}):new Fe({color:14677247,map:x,transparent:!0,opacity:.85,depthWrite:!1});if(u.add(new ge(p,y)),n){let _=new Yt(new ln(.6,5,6).rotateX(Math.PI),y,40),v=new Ze;for(let R=0;R<40;R++)v.position.set((Math.random()-.5)*40,l*(.3+Math.random()*.7),-2+Math.random()*2),v.scale.set(1,.6+Math.random()*1.6,1),v.updateMatrix(),_.setMatrixAt(R,v.matrix);u.add(_)}else{this.anims.push(R=>{x.offset.y+=R*1.4});let _=new ge(new Qi(20,24).rotateX(-Math.PI/2),new vt({color:3832426,roughness:.05,clearcoat:1}));_.position.set(0,.6,8),u.add(_);let v=new Si(new ii({map:em(),color:16777215,transparent:!0,opacity:.55,depthWrite:!1}));v.scale.set(40,22,1),v.position.set(0,8,6),u.add(v),this.anims.push((R,w)=>{v.material.opacity=.45+Math.sin(w*2+e)*.1})}u.position.set(i.x,r,i.z),u.rotation.y=h,this.add(u),this.blockers.push(d)}iceSpikes(){let t=new Yt(new ln(3,18,5),new vt({color:13496314,roughness:.1,clearcoat:1,emissive:3832474,emissiveIntensity:.25,flatShading:!0}),60),n=new Ze,i=0;for(let r=0;r<400&&i<60;r++){let o=this.side(this.rnd(),(this.rnd()-.5)*500);this.ground(o.x,o.z)>this.theme.waterY+6||this.field.runwayDist(o.x,o.z)<120||(n.position.set(o.x,this.theme.waterY+6,o.z),n.rotation.set((this.rnd()-.5)*.5,this.rnd()*6,(this.rnd()-.5)*.5),n.scale.setScalar(.6+this.rnd()),n.updateMatrix(),t.setMatrixAt(i++,n.matrix))}t.count=i,this.add(t)}city(){let e=this.side(.5,0),t=document.createElement("canvas");t.width=64,t.height=128;let n=t.getContext("2d"),i=document.createElement("canvas");i.width=64,i.height=128;let r=i.getContext("2d");n.fillStyle="#9aa3ad",n.fillRect(0,0,64,128),r.fillStyle="#000",r.fillRect(0,0,64,128);for(let x=3;x<128;x+=8)for(let p=3;p<64;p+=8){let m=Math.random()<.45;n.fillStyle=m?"#ffe7a8":"#2a3a4e",n.fillRect(p,x,5,5),m&&(r.fillStyle=Math.random()<.7?"#ffcf70":"#bfe4ff",r.fillRect(p,x,5,5))}let o=new Pt(t),a=new Pt(i);for(let x of[o,a])x.wrapS=x.wrapT=rn,x.colorSpace=dt;let l=new Ye(1,1,1).translate(0,.5,0),c=l.attributes.uv;for(let x=0;x<c.count;x++)c.setXY(x,c.getX(x)*3,c.getY(x)*6);let h=[],u=new Ze,d=[];for(let x=-9;x<=9;x++)for(let p=-9;p<=9;p++){let m=e.x+x*40+(this.rnd()-.5)*8,y=e.z+p*40+(this.rnd()-.5)*8,_=Math.hypot(x,p)/9;if(_>1||this.rnd()<.12)continue;let v=this.ground(m,y);if(v<4)continue;let R=this.field.near(m,y),w=(1-_)**1.2*(60+this.rnd()*140)+14,A=Math.min(w,R.y-22+Math.max(0,R.dist-34)*1.6-v);A<10||(u.position.set(m,v-1,y),u.scale.set(16+this.rnd()*14,A,16+this.rnd()*14),u.rotation.y=0,u.updateMatrix(),h.push(u.matrix.clone()),d.push(new te().setHSL(.58+this.rnd()*.08,.1,.75+this.rnd()*.25)))}let f=new Yt(l,new Ae({map:o,emissiveMap:a,emissive:16777215,emissiveIntensity:1.4,roughness:.4,metalness:.5}),h.length);h.forEach((x,p)=>{f.setMatrixAt(p,x),f.setColorAt(p,d[p])}),f.castShadow=!0,f.receiveShadow=!0,this.add(f),this.blockers.push(f);let g=new vt({color:5933752,metalness:.9,roughness:.06,envMapIntensity:1.8});for(let x=0;x<6;x++){let p=this.side(.42+x*.03,(x%2?1:-1)*(150+this.rnd()*80)),m=this.ground(p.x,p.z);if(m<4)continue;let y=this.field.near(p.x,p.z),_=Math.min(180+this.rnd()*80,y.y-20+(y.dist-34)*1.6-m);if(_<40)continue;let v=new qe;v.add(ct(new $e(10,13,_,20).translate(0,_/2,0),g)),v.add(ct(new ln(4,30,8).translate(0,_+15,0),new Ae({color:14212322,metalness:.9,roughness:.2}))),v.add(ct(new $t(1,8,6).translate(0,_+31,0),new Fe({color:li(16722474),toneMapped:!1}))),v.position.set(p.x,m,p.z),this.add(v),this.blockers.push(v)}for(let[x,p,m]of[[.44,60,"\u0110UA M\xC1Y BAY"],[.56,-60,"SKY RACE"],[.64,70,"T\u1EB6NG QU\xC0 = BOOST"]]){let y=document.createElement("canvas");y.width=512,y.height=128;let _=y.getContext("2d");_.fillStyle="#0a0a14",_.fillRect(0,0,512,128),_.strokeStyle="#ff3ad8",_.lineWidth=8,_.strokeRect(6,6,500,116),_.font='italic 900 58px "Segoe UI"',_.textAlign="center",_.textBaseline="middle",_.fillStyle="#37e6ff",_.shadowColor="#37e6ff",_.shadowBlur=18,_.fillText(m,256,66);let v=new Pt(y);v.colorSpace=dt;let R=this.side(x,p),w=this.ground(R.x,R.z),A=this.field.near(R.x,R.z),P=Math.min(A.y-8,w+60),b=new qe;b.add(ct(new an(40,10),new Fe({map:v,color:li(16777215,2.4),toneMapped:!1,side:Ct}))),b.add(ct(new $e(.6,.6,P-w,6).translate(0,-(P-w)/2,0),new Ae({color:5593696}))),b.position.set(R.x,P,R.z),b.lookAt(this.side(x,0).setY(P)),this.add(b)}}bridge(){let e=.4,t=1/0;for(let d=.3;d<.75;d+=.01){let f=this.track.pose(d,this.pose).p;this.ground(f.x,f.z)<-4&&f.y<t&&(t=f.y,e=d)}let n=this.track.pose(e,this.pose),i=n.p.clone().setY(0),r=n.r.clone().setY(0).normalize(),o=new qe,a=new Ae({color:12728874,metalness:.6,roughness:.4}),l=new Ae({color:6975092,roughness:.8}),c=520,h=115,u=Math.min(78,n.p.y+30);o.add(ct(new Ye(c,2,22).translate(0,16,0),l));for(let d of[1,-1])for(let f of[-9,9])o.add(ct(new Ye(4,u,3).translate(d*h,u/2,f),a));for(let d of[1,-1])o.add(ct(new Ye(4,3,21).translate(d*h,u-6,0),a));for(let d of[-9,9]){let f=[];for(let g=0;g<=40;g++){let x=-c/2+c*g/40,p=Math.abs(x)<=h?1-(x/h)**2:0;f.push(new S(x,Math.abs(x)<=h?u-(u-22)*p:u-(Math.abs(x)-h)/(c/2-h)*(u-17),d))}o.add(ct(new Tr(new Ti(f),80,.5,6),a));for(let g=2;g<39;g+=2){let x=f[g];o.add(ct(new $e(.12,.12,x.y-17,4).translate(x.x,17+(x.y-17)/2,d),a))}for(let g=0;g<26;g++)o.add(ct(new $t(.4,6,4).translate(-c/2+g*c/25,18,d*1.1),new Fe({color:li(16769696),toneMapped:!1})))}for(let d of[1,-1])o.add(ct(new $e(6,7,16,12).translate(d*h,0,0),l));o.position.copy(i),o.rotation.y=Math.atan2(-r.z,r.x),this.add(o)}temple(){let e=this.side(.4,-170);for(let r=0;r<40;r++){let o=this.side(.25+this.rnd()*.6,(this.rnd()<.5?-1:1)*(140+this.rnd()*140));if(this.ground(o.x,o.z)>14&&this.terrain.slope(o.x,o.z)<.25){e=o;break}}let t=new qe,n=new Ae({color:9078130,roughness:.95}),i=new Ae({color:4876858,roughness:1});for(let r=0;r<6;r++){let o=40-r*6;t.add(ct(new Ye(o,5,o).translate(0,2.5+r*5,0),r%2?n:i))}t.add(ct(new Ye(8,8,8).translate(0,34,0),n)),t.add(ct(new Ye(5,30,2).translate(0,15,20),n)),t.position.set(e.x,this.ground(e.x,e.z)-1,e.z),this.add(t)}mesas(){let e=new $e(.85,1,1,9,6).translate(0,.5,0),t=e.attributes.position,n=new Float32Array(t.count*3),i=new te;for(let c=0;c<t.count;c++){let h=t.getY(c),u=t.getX(c),d=t.getZ(c),f=1+(zr(u*3+h*5,d*3)-.5)*.25;t.setXYZ(c,u*f,h,d*f),i.setHex(11687214).lerp(new te(14719586),(Math.sin(h*18)+1)/2*.8),n[c*3]=i.r,n[c*3+1]=i.g,n[c*3+2]=i.b}e.setAttribute("color",new lt(n,3)),e.computeVertexNormals();let r=40,o=new Yt(e,new Ae({vertexColors:!0,roughness:.95,flatShading:!0}),r),a=new Ze,l=0;for(let c=0;c<400&&l<r;c++){let h=this.side(this.rnd(),(this.rnd()<.5?-1:1)*(70+this.rnd()*500)),u=this.ground(h.x,h.z),d=this.field.near(h.x,h.z);if(this.field.runwayDist(h.x,h.z)<140)continue;let f=this.rnd()<.5,g=Math.min(f?60+this.rnd()*80:25+this.rnd()*30,d.y-20+Math.max(0,d.dist-40)*1.3-u);if(g<14)continue;let x=f?6+this.rnd()*8:30+this.rnd()*50;a.position.set(h.x,u-2,h.z),a.scale.set(x,g,x*(.7+this.rnd()*.5)),a.rotation.y=this.rnd()*6,a.updateMatrix(),o.setMatrixAt(l++,a.matrix)}o.count=l,o.castShadow=!0,o.receiveShadow=!0,this.add(o),this.blockers.push(o)}oasis(){let e=this.side(.45,160);for(let l=0;l<30;l++){let c=this.side(.2+this.rnd()*.7,(this.rnd()<.5?-1:1)*(110+this.rnd()*150));if(this.terrain.slope(c.x,c.z)<.15&&this.ground(c.x,c.z)<40){e=c;break}}let t=this.ground(e.x,e.z),n=new ge(new Qi(38,40).rotateX(-Math.PI/2),new vt({color:2783882,roughness:.04,clearcoat:1,envMapIntensity:1.6}));n.position.set(e.x,t+1.2,e.z),this.add(n);let i=this.vegGeo("palm"),r=14,o=new Yt(i,new Ae({vertexColors:!0,roughness:.9}),r),a=new Ze;for(let l=0;l<r;l++){let c=l/r*Math.PI*2,h=42+this.rnd()*14,u=e.x+Math.cos(c)*h,d=e.z+Math.sin(c)*h;a.position.set(u,this.ground(u,d),d),a.rotation.y=this.rnd()*6,a.scale.setScalar(.9+this.rnd()*.4),a.updateMatrix(),o.setMatrixAt(l,a.matrix)}this.add(o)}weather(e){let t=this.lite?1200:2600,n=160,i=new Float32Array(t*3);for(let h=0;h<t*3;h++)i[h]=(Math.random()-.5)*n*2;let r=new et;r.setAttribute("position",new lt(i,3));let o=new Ss({map:em(),size:e==="snow"?1.1:e==="dust"?.9:6,color:e==="snow"?16777215:e==="dust"?15255696:15267054,transparent:!0,opacity:e==="mist"?.12:.85,depthWrite:!1,sizeAttenuation:!0}),a=new Ji(r,o);a.frustumCulled=!1,this.add(a);let l=e==="snow"?6:e==="dust"?.5:.2,c=e==="dust"?14:2;this.anims.push((h,u,d)=>{for(let f=0;f<t;f++){let g=f*3;i[g]+=(Math.sin(u*.7+f)*.5+c*.3)*h,i[g+1]-=l*h,i[g+2]+=Math.cos(u*.5+f)*.5*h;for(let x=0;x<3;x++){let p=i[g+x]-d.position.getComponent(x);p>n?i[g+x]-=n*2:p<-n&&(i[g+x]+=n*2)}}r.attributes.position.needsUpdate=!0})}follow(e){Ui&&(Ui.sky.position.copy(e.position),Ui.water.position.x=e.position.x,Ui.water.position.z=e.position.z)}update(e,t,n){this.follow(n);for(let i of this.anims)i(e,t,n);for(let i of this.rings)i.flash>0&&(i.flash=Math.max(0,i.flash-e*1.8),i.mat.color.copy(i.base).lerp(gM,i.flash),i.group.scale.setScalar(1+i.flash*.12))}dispose(e){let t=Ui;t&&this.group.remove(t.sky,t.water),e.remove(this.group);let n=new Set;for(let i of this.owned)i.traverse(r=>{let o=r;o.geometry&&!n.has(o.geometry)&&(n.add(o.geometry),o.geometry.dispose());let a=o.material?Array.isArray(o.material)?o.material:[o.material]:[];for(let l of a)if(!n.has(l)){n.add(l);for(let c of Object.values(l))c instanceof zt&&c!==t?.detail.detail&&c!==t?.detail.normal&&c!==Bl&&!n.has(c)&&(n.add(c),c.dispose());l.dispose()}});this.env?.dispose()}},gM=new te(5,5,5),li=(s,e=3.2)=>new te(s).multiplyScalar(e),ct=(s,e)=>{let t=new ge(s,e);return t.castShadow=!0,t.receiveShadow=!0,t},Bl=null;function em(){if(Bl)return Bl;let s=document.createElement("canvas");s.width=s.height=64;let e=s.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),Bl=new Pt(s)}var vd=new URLSearchParams(location.search),_d=vd.has("live"),Hs=vd.has("lite");_d&&document.body.classList.add("live");var xM=Je("scene"),Jt=new Oa({canvas:xM,antialias:!0,powerPreference:"high-performance"});Jt.toneMapping=Eo;Jt.shadowMap.enabled=!0;Jt.shadowMap.type=Jh;var yn=new br,Tt=new Ut(62,1,.5,14e3),Md=new sl(14479359,4876880,1.1),kn=new Cr(16773596,3);kn.castShadow=!0;kn.shadow.mapSize.set(Hs?1024:2048,Hs?1024:2048);Object.assign(kn.shadow.camera,{left:-120,right:120,top:120,bottom:-120,near:10,far:1200});kn.shadow.bias=-6e-4;kn.shadow.normalBias=.6;yn.add(Md,kn,kn.target);var Sn=new Ho(Hs?2500:6e3,!0),hs=new Ho(Hs?1500:3500,!1);yn.add(hs.points,Sn.points);var un=new Pl(Sn,hs);yn.add(un.group);var Us=0,Go=0;un.onBoom=(s,e)=>{let t=s.distanceTo(Tt.position);t<400&&(Us=Math.max(Us,(e?1.6:.8)*(1-t/400)),ut.boom(e)),Go=Math.max(Go,e?.5:.2)};var Bs=new xl(Jt);Bs.addPass(new vl(yn,Tt));var fd=new Lr(new Q(256,256),.55,.45,2.6);Bs.addPass(fd);var pd=new Ir({uniforms:{tDiffuse:{value:null},strength:{value:0},center:{value:new Q(.5,.47)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform sampler2D tDiffuse; uniform float strength; uniform vec2 center; varying vec2 vUv;
    void main(){ vec2 d = vUv - center; float r = length(d); vec4 c = vec4(0.0); float w = 0.0;
      for (int i = 0; i < 10; i++){ float t = float(i) / 9.0; float k = 1.0 - t * 0.6; c += texture2D(tDiffuse, vUv - d * strength * t * smoothstep(0.08, 0.6, r)) * k; w += k; }
      gl_FragColor = c / w; }`});Bs.addPass(pd);Bs.addPass(new yl);var Ns=Math.min(devicePixelRatio,Hs?1:2);function bd(){Zp(),Jt.setPixelRatio(Ns),Jt.setSize(innerWidth,innerHeight,!1),Bs.setPixelRatio(Ns),Bs.setSize(innerWidth,innerHeight),Tt.aspect=innerWidth/innerHeight,Tt.updateProjectionMatrix(),Sn.setScale(innerHeight*Ns),hs.setScale(innerHeight*Ns),Wo.width=innerWidth,Wo.height=innerHeight}var Wo=Je("speed"),yM=Wo.getContext("2d");addEventListener("resize",bd);var Pe=new Ll,ut=new Ml,Fs=Co[0].key,hi=new kr(ai(Fs).pts),Ot=new ko(yn,Jt,hi,ai(Fs),{sun:kn,hemi:Md},Hs),hm=new Bo(Je("minimap"),hi.samples(300));function vM(s){if(s===Fs)return;Fs=s;let e=Je("fade");e.classList.add("on"),setTimeout(()=>{Ot.dispose(yn),hi=new kr(ai(s).pts),Ot=new ko(yn,Jt,hi,ai(s),{sun:kn,hemi:Md},Hs),hm=new Bo(Je("minimap"),hi.samples(300));for(let t of Ht.values())t.trails.forEach(n=>n.reset()),t.prev.set(0,-999,0);Pe.map(ai(s)),setTimeout(()=>e.classList.remove("on"),120)},380)}Pe.map(ai(Fs));var Ht=new Map,_M=Je("labels"),um=s=>{let e=7;for(let t of s)e=(e*31+t.charCodeAt(0))%997;return String(10+e%90)};function dm(s){let e=new Rs(s.pub.plane,s.pub.color,s.num);return yn.add(e.root),e}function MM(s){let e=um(s.id),t=dm({pub:s,num:e}),n=[new Cs(26,.22),new Cs(26,.22),new Cs(30,.5),new Cs(30,.5)];for(let a of n)yn.add(a.mesh);let i=ne("div","tag");_M.append(i);let r=0;for(let a of s.id)r=(r*31+a.charCodeAt(0))%10007;let o={pub:s,rig:t,trails:n,label:i,escorts:[],disp:s.d,d0:s.d,v0:s.v,t0:performance.now(),lx:(s.lane-(It.gridCols-1)/2)*It.gridLane,ly:0,rollA:0,warpUntil:0,seed:r,pos:new S,prev:new S(0,-999,0),fwd:new S(1,0,0),up:new S(0,1,0),right:new S(0,0,1),plane:s.plane,color:s.color,num:e,rank:0,lastF:0,lastPlace:s.place,frac:0,gold:0,stuntAt:performance.now()+5e3+Math.random()*1e4,mode:"grid"};return Ht.set(s.id,o),o}function bM(s){s.rig.dispose(),s.rig=dm(s),s.plane=s.pub.plane,s.color=s.pub.color;for(let e of s.escorts)e.dispose();s.escorts=[]}function EM(s){s.rig.dispose();for(let e of s.escorts)e.dispose();for(let e of s.trails)yn.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();s.label.remove(),Ht.delete(s.pub.id)}function SM(s){return[1,-1].map(e=>{let t=new Rs("golden",13936186,"VIP");return t.root.scale.setScalar(.55),t.root.position.set(e*17,1.5,2),s.rig.root.add(t.root),t})}var Be={phase:"lobby",leftMs:0,raceNo:0,raceMs:0,laps:It.laps,lapLen:It.lapLen,podium:[],map:Fs},fm=performance.now(),fn=[],Gl={voice:!0,bots:4,laps:3,map:"auto"},tm="",dn=new Il(_d?"view":"control");dn.onStatus=s=>{Je("offline").hidden=s};dn.onState=s=>{let e=performance.now();Be=s.race,fm=e,fn=s.racers,Be.map&&Be.map!==Fs&&vM(Be.map);let t=new Set;for(let n of s.racers){t.add(n.id);let i=Ht.get(n.id)??MM(n);i.pub=n,i.d0=n.d,i.v0=n.v,i.t0=e,(n.plane!==i.plane||n.color!==i.color)&&bM(i)}for(let n of[...Ht.values()])t.has(n.pub.id)||EM(n);s.boards&&Pe.records(s.boards),s.live&&Pe.live(s.live),s.viewers!==void 0&&Pe.viewers(s.viewers),s.settings&&(Gl=s.settings,yd()),Be.phase!==tm&&(IM(Be.phase,!!s.hello),tm=Be.phase);for(let n of s.fx)LM(n);Pe.board(fn,Be,pn)};var TM={chase:"B\xE1m \u0111u\xF4i",side:"Ngang s\u01B0\u1EDDn",front:"Ch\xEDnh di\u1EC7n",heli:"Tr\u1EF1c th\u0103ng",trackside:"Ven \u0111\u01B0\u1EDDng",low:"G\xF3c th\u1EA5p"},pn="",Wl=0,je={shot:"chase",until:0,side:1,fixed:new S,cut:!0,tag:""};function Ds(s,e,t,n=""){pn=s,je.shot=e,je.until=performance.now()+t,je.side=Math.random()<.5?1:-1,je.cut=!0,je.tag=n;let i=Ht.get(s);i&&Math.abs(_u(i.disp,Be.lapLen||It.lapLen)-ai(Be.map).shortcut.at-.02)<.06&&(je.side=-1),i&&e==="trackside"&&(hi.pose((i.disp+160+i.v0*1.5)/(Be.lapLen||It.lapLen),Kt),je.fixed.copy(Kt.p).addScaledVector(Kt.r,je.side*38).addScaledVector(Kt.u,6),je.fixed.y=Math.max(je.fixed.y,Ot.terrain.at(je.fixed.x,je.fixed.z)+6))}var cs=[],Ed=0;function wM(s){for(;cs.length;){let e=cs.shift(),t=Ht.get(e.id);if(!(!t||t.pub.fin))return Ds(e.id,"chase",7e3,`\u{1F440} Theo y\xEAu c\u1EA7u: ${e.name}`),Wl=Ed=s+7e3,!0}return!1}var ci=(s,e)=>{Ht.has(s)&&(performance.now()<Ed||(Wl=performance.now()+e,Ds(s,"chase",e,"\u{1F381}")))},Fl=s=>{let e=0;for(let[,n]of s)e+=n;let t=Math.random()*e;for(let[n,i]of s)if(t-=i,t<=0)return n;return s[0][0]};function AM(s){if(!(Be.phase==="race"||Be.phase==="finish")){pn=(Be.phase==="result"?fn[0]:fn.find(c=>!c.fin)??fn[0])?.id??"",je.shot="chase",je.tag="";return}let t=Ht.get(pn),n=!!t&&!t.pub.fin;if(cs.length&&Be.raceMs>=7e3&&s>=Ed&&s>=Wl&&wM(s)||s<je.until&&(n||s<Wl))return;if(Be.raceMs<7e3&&fn[0]){pn=fn[0].id,je.shot="chase",je.tag="\u{1F6EB} C\u1EA5t c\xE1nh",je.until=s+300;return}let i=fn.filter(l=>!l.fin&&Ht.get(l.id)?.mode==="fly");if(!i.length){let l=fn[0];l&&Ds(l.id,"chase",4e3);return}let r=[];for(let l=1;l<i.length;l++){let c=i[l-1].d-i[l].d;c<45&&r.push({a:i[l-1],b:i[l],gap:c})}let o=Fl([["fight",r.length?5:0],["leader",1.5],["pack",1.5],["any",2]]),a=4500+Math.random()*3500;if(o==="fight"){let l=r.sort((c,h)=>c.b.place-h.b.place)[Math.floor(Math.random()*Math.min(3,r.length))];Ds(l.b.id,Fl([["chase",3],["side",2],["low",1.5],["trackside",1.5]]),a,`\u2694\uFE0F C\u1EADn chi\u1EBFn #${l.a.place} \u2013 #${l.b.place}`)}else if(o==="leader")Ds(i[0].id,Fl([["front",3],["side",2],["chase",1],["trackside",1.5]]),a,"\u{1F947} D\u1EABn \u0111\u1EA7u");else if(o==="pack"){let l=i[Math.floor(i.length/2)];Ds(l.id,"heli",a,"\u{1F681} To\xE0n c\u1EA3nh \u0111o\xE0n \u0111ua")}else{let l=i[Math.floor(Math.random()*i.length)];Ds(l.id,Fl([["chase",2],["side",2],["front",1.5],["low",1],["trackside",1.5]]),a)}}var On=new S(0,80,-120),Hi=new S,od=new hl,zo=new S(0,6,-25),Ol=new S,kl=new S(0,6,-25),ad=new S,pm=new S,zl=1,nm=0;function RM(s,e){let t=e.clone().sub(s),n=t.length();return od.set(s,t.normalize()),od.far=Math.max(0,n-8),od.intersectObjects(Ot.blockers,!0).length>0}var ld=0,Ls=new Ut(55,16/10,.5,9e3),im=new S,sm=new S,xn=null,Sd=!1;function CM(){xn?.dispose(yn),xn=null;let s=Be.podium[0];if(!s)return;hi.pose(.06,Kt);let e=Kt.p.clone().addScaledVector(Kt.r,-170);e.y=Math.max(Ot.runwayY+115,Ot.terrain.at(e.x,e.z)+75),xn=new Cl(yn,e,s,um(s.id),Sn,hs),document.body.classList.add("champ"),Pe.result(Be,{avatar:fn.find(t=>t.id===s.id)?.avatar??"",record:Sd}),ut.fanfare(),setTimeout(()=>ut.fanfare(),900)}function PM(){xn?.dispose(yn),xn=null,document.body.classList.remove("champ"),Pe.result(null),Sd=!1}var md=-1;function IM(s,e){s==="lobby"&&(PM(),e||Pe.center(`${ai(Be.map).icon} ${ai(Be.map).name.toUpperCase()}
G\xD5 1 \u0110\u1EC2 V\xC0O \u0110UA`,"info",3200)),s==="result"&&CM(),s==="race"&&!e&&(Pe.center("C\u1EA4T C\xC1NH!","go",1200),ut.beep(!0)),md=-1}var cd=s=>()=>{let e=s?Ht.get(s):void 0;return e?e.pos.clone():null},rm=s=>s.toUpperCase(),ls=(s,e,t=1)=>{s&&Math.random()<t&&s.mode==="fly"&&s.rig.maneuver(e)};function LM(s){let e="id"in s?Ht.get(s.id):void 0;switch(s.k){case"join":Pe.feed(`\u2708\uFE0F ${s.name} v\xE0o \u0111ua \xB7 ${wo(s.plane)}${s.late?" (v\xE0o gi\u1EEFa ch\u1EEBng)":""}`,"join");break;case"plane":s.plane!=="golden"&&Pe.feed(`\u{1F527} ${s.name} \u0111\u1ED5i sang ${wo(s.plane)}`,"join");break;case"gift":{Pe.pop(s),ut.coin(s.xu>=99);let t=Ao(s.skill);Pe.feed(`\u{1F381} ${s.name} t\u1EB7ng ${s.count>1?s.count+"x ":""}${s.gift} \u2192 ${t.icon} ${t.name}${s.banked?" (bung khi xu\u1EA5t ph\xE1t)":""}`,"gift"),!s.banked&&s.xu>=5&&ci(s.id,s.xu>=99?9e3:6e3);break}case"skill":{let t=s.n&&s.n>1?` x${s.n}`:"";if(!e)break;switch(s.skill){case"boost":ut.boost(),gd(e,6),Pe.feed(`\u{1F4A8} ${s.name} t\u0103ng t\u1ED1c nh\u1EB9${t}`,"skill");break;case"engine":ut.boost(),gd(e,14),un.ring(e.pos,e.fwd,16777215,5,.5,2),Pe.feed(`\u2699\uFE0F ${s.name} T\u0102NG T\u1ED0C \u0110\u1ED8NG C\u01A0${t}!`,"skill");break;case"nitro":ut.nitro(),un.ring(e.pos,e.fwd,5223679,7,.6,2.2),ls(e,"barrel",.5),Us=Math.max(Us,.3),Pe.feed(`\u{1F525} ${s.name} BOOST${t}!`,"skill");break;case"rocket":ut.launch(),ut.nitro(),un.ring(e.pos,e.fwd,16747050,9,.7,2.5),Pe.feed(`\u{1F680} ${s.name} g\u1EAFn T\xCAN L\u1EECA T\u0102NG T\u1ED0C!`,"skill"),Pe.center("\u{1F680} T\xCAN L\u1EECA T\u0102NG T\u1ED0C","go",1300),ci(s.id,4e3);break;case"super":ut.nitro(),un.ring(e.pos,e.fwd,16769126,10,.8,3),ls(e,"barrel"),Pe.feed(`\u{1F31F} ${s.name} SI\xCAU BOOST!`,"big"),Pe.center(`\u{1F31F} SI\xCAU BOOST
${s.name}`,"big",1800),ci(s.id,7e3);break;case"jet":ut.fanfare(),ut.nitro(),un.ring(e.pos,e.fwd,6277375,12,.9,3),ls(e,"roll"),Pe.feed(`\u{1F6E9}\uFE0F ${s.name} b\u1EADt CH\u1EBE \u0110\u1ED8 PH\u1EA2N L\u1EF0C!`,"big"),Pe.center(`\u{1F6E9}\uFE0F CH\u1EBE \u0110\u1ED8 PH\u1EA2N L\u1EF0C
${s.name}`,"big",2400),ci(s.id,1e4);break;case"vip":ut.fanfare(),Pe.feed(`\u{1F451} ${s.name} tri\u1EC7u h\u1ED3i M\xC1Y BAY VIP!`,"big"),Pe.center(`\u{1F451} M\xC1Y BAY VIP M\u1EA0 V\xC0NG
${s.name}`,"big",3e3),ci(s.id,12e3),setTimeout(()=>{let n=Ht.get(s.id);if(ls(n,"loop"),n)for(let i=0;i<5;i++)setTimeout(()=>Sn.burst(n.pos,[16765498,16773560,16777215],50,30,2,1.2,{grav:6}),i*200)},400);break;case"missile":ut.launch(),s.target&&(un.missile(e.pos.clone().addScaledVector(e.up,-1.5),cd(s.target),yu.missileFlight),Pe.feed(`\u{1F3AF} ${s.name} b\u1EAFn T\xCAN L\u1EECA v\xE0o ${s.targetName}!`,"atk"),ci(s.target,3500));break;case"thunder":Pe.feed(`\u26A1 ${s.name} g\u1ECDi S\xC9T \u0111\xE1nh Top 3!`,"atk"),Pe.center("\u26A1 S\xC9T \u0110\xC1NH TOP 3","atk",1500);break;case"bomb":s.target&&(un.bomb(cd(s.target),yu.bombFall),Pe.feed(`\u{1F4A3} ${s.name} n\xE9m BOM T\u1EA4N v\xE0o ${s.targetName}!`,"atk"),Pe.center(`\u{1F4A3} BOM V\xC0O ${rm(s.targetName??"")}`,"atk",1800),ci(s.target,4e3));break;case"meteor":{Pe.feed(`\u2604\uFE0F ${s.name} g\u1ECDi M\u01AFA THI\xCAN TH\u1EA0CH!`,"big"),Pe.center(`\u2604\uFE0F M\u01AFA THI\xCAN TH\u1EA0CH
${s.name}`,"big",2800),ci(s.id,9e3);let n=[...Ht.values()].filter(i=>i!==e);for(let i=0;i<22;i++)setTimeout(()=>{let r=n[Math.floor(Math.random()*n.length)];if(r){let o=r.pos.clone().add(new S((Math.random()-.5)*60,-10-Math.random()*30,(Math.random()-.5)*60));un.meteor(()=>o,900)}},i*110);break}}break}case"hit":{if(!e)break;if(s.blocked){un.ring(e.pos,null,10482687,7,.5,2.5),ut.shield(),Pe.feed(`\u{1F6E1}\uFE0F ${s.name} ch\u1EB7n \u0111\u01B0\u1EE3c ${Ao(s.skill).name.toLowerCase()} c\u1EE7a ${s.byName}`,"skill");break}s.skill==="thunder"&&(un.bolt(e.pos),ut.zap()),s.skill==="meteor"&&un.meteor(cd(s.id),500),s.skill==="missile"&&Sn.burst(e.pos,[16777215,16765802],20,25,1.4,.5),ls(e,"crash");break}case"event":if(!e)break;if(s.ev==="pad")Sn.burst(e.pos,[12123962,16777215],18,18,1.2,.5),s.id===pn&&ut.boost();else if(s.ev==="obstacle")un.boom(e.pos.clone().addScaledVector(e.right,3),!1),ls(e,"crash"),Pe.feed(`\u{1F4A5} ${s.name} va ph\u1EA3i b\xE3i m\xECn!`,"atk");else{if(e.pub.bot)break;s.ev==="shortcut"?(Pe.feed(`\u26A0\uFE0F ${s.name} li\u1EC1u bay \u0111\u01B0\u1EDDng t\u1EAFt!`,"skill"),e.pub.bot||ci(s.id,3500)):s.ev==="shortcrash"?(un.boom(e.pos,!1),ls(e,"crash"),Pe.feed(`\u{1F4A5} ${s.name} \u0111\xE2m v\xE0o v\xE1ch \u0111\u01B0\u1EDDng t\u1EAFt!`,"atk")):s.ev==="shortok"&&(Pe.feed(`\u2705 ${s.name} \u0111i t\u1EAFt th\xE0nh c\xF4ng, v\u01B0\u1EE3t l\xEAn!`,"big"),ls(e,"roll"))}break;case"like":e&&Sn.burst(e.pos,[16732042,16751296],10,8,1.6,.8);break;case"watch":!cs.some(t=>t.id===s.id)&&cs.length<8&&cs.push({id:s.id,name:s.name}),Pe.feed(`\u{1F440} ${s.name} mu\u1ED1n xem m\xE1y bay c\u1EE7a m\xECnh${cs.length>1?` (ch\u1EDD l\u01B0\u1EE3t ${cs.length})`:""}`,"join");break;case"lap":s.lap===Be.laps-1&&fn.find(t=>!t.fin)?.id===s.id&&Pe.center("\u{1F514} V\xD2NG CU\u1ED0I!","info",1800),Pe.feed(`\u{1F501} ${s.name} v\xE0o v\xF2ng ${s.lap+1}/${Be.laps}`),s.id===pn&&ut.lap();break;case"lead":Pe.feed(`\u{1F451} ${s.name} v\u01B0\u01A1n l\xEAn D\u1EAAN \u0110\u1EA6U!`,"big");break;case"finish":if(Pe.feed(`\u{1F3C1} ${s.name} v\u1EC1 \u0111\xEDch h\u1EA1ng ${s.place} \xB7 ${(s.ms/1e3).toFixed(1)}s${s.record?" \xB7 K\u1EF6 L\u1EE4C!":""}`,s.place<=3?"big":""),s.place===1){if(Sd=s.record,Pe.center(`\u{1F3C6} ${rm(s.name)}
V\u1EC0 NH\u1EA4T!`,"big",3200),ut.fanfare(),ci(s.id,7e3),e){e.rig.maneuver("victory");for(let t=0;t<6;t++)setTimeout(()=>Sn.burst(e.pos.clone().add(new S(0,10,0)),[16765498,16732120,3663615,16777215],70,50,2,1.4,{grav:12}),t*250)}}else s.place<=3&&e&&e.rig.maneuver("roll");break;case"voice":ut.voice(s.url),Pe.caption(s.text);break;case"note":Pe.feed(s.text);break;case"phase":break}}var om=new S,DM=new S;function gd(s,e){s.rig.root.updateMatrixWorld();for(let t of s.rig.exhaust.slice(0,2)){om.copy(t.pos).applyMatrix4(s.rig.body.matrixWorld);for(let n=0;n<e;n++)hs.emit(om,DM.copy(s.fwd).multiplyScalar(-8-Math.random()*8).add(new S((Math.random()-.5)*4,(Math.random()-.5)*4,(Math.random()-.5)*4)),15921906,2.5,1.6,{grow:7,drag:1.4,alpha:.55})}}var Kt=kr.pose(),am=new Ce,In=new S,hd=new S,NM=new S(0,1,0),Gr=new te,UM=new te(16765498),lm=(s,e,t)=>{let n=Math.max(0,Math.min(1,(t-s)/(e-s)));return n*n*(3-2*n)},cm=performance.now(),Vl=0,ud=0;function mm(){requestAnimationFrame(mm);let s=performance.now(),e=Math.min(.05,(s-cm)/1e3);cm=s;let t=s-fm,n=Be.phase==="race"||Be.phase==="finish"||Be.phase==="result",i=s/1e3;if(Ot.update(e,i,Tt),AM(s),Be.phase==="countdown"){let d=Math.ceil(Math.max(0,Be.leftMs-t)/1e3);d!==md&&d>=1&&d<=3&&(md=d,Pe.center(String(d),"count",900),ut.beep())}let r=Be.lapLen||It.lapLen,o=Be.laps*r,a=Be.phase==="lobby"||Be.phase==="countdown",l;for(let d of Ht.values()){let f=d.pub,g=d.d0+(n?d.v0*(s-d.t0)/1e3:0),x=g-d.disp;Math.abs(x)>600&&s>d.warpUntil?d.disp=g:d.disp+=x*Math.min(1,e*(s<d.warpUntil?5:3.5)),hi.pose(d.disp/r,Kt);let p=(f.f&Le.SHORT)!==0,m=a?(f.lane-(It.gridCols-1)/2)*It.gridLane:p?34:(f.lane-3.5)*3.6+Math.sin(i*.31+d.seed)*7,y=a?0:p?-6:Math.sin(i*.23+d.seed*1.7)*5,_=Math.min(1,e*(p?1.6:.9)),v=(m-d.lx)*_;d.lx+=v,d.ly+=(y-d.ly)*_;let R=Ot.runwayY+d.rig.gearH,w=1,A="fly";if(a)w=0,A="grid";else if(f.fin||d.disp>=o){let U=d.disp-o;w=1-lm(0,It.landM*.62,U),A=w>.02?"landing":d.v0<2?"parked":"landing"}else d.disp<It.takeoffM&&f.lap===0&&(w=lm(70,It.takeoffM,d.disp),A=w>.98?"fly":"takeoff");d.mode=A,d.pos.copy(Kt.p).addScaledVector(Kt.r,d.lx).addScaledVector(Kt.u,d.ly*w),d.pos.y=R+(d.pos.y-R)*w,w<1&&(d.pos.y=Math.max(d.pos.y,R)),d.prev.y>-900?(In.copy(d.pos).sub(d.prev),In.lengthSq()>1e-4&&(In.normalize(),w<.05&&(In.y=0),d.fwd.lerp(In,Math.min(1,e*9)).normalize())):d.fwd.copy(Kt.t),(a||A==="parked")&&d.fwd.copy(Kt.t).setY(0).normalize(),d.prev.copy(d.pos),d.right.crossVectors(d.fwd,NM).normalize(),d.up.crossVectors(d.right,d.fwd).normalize(),d.rig.root.position.copy(d.pos),In.crossVectors(d.up,d.fwd),am.makeBasis(In,d.up,d.fwd),d.rig.root.quaternion.setFromRotationMatrix(am);let P=w>.3?Math.max(-1.1,Math.min(1.1,Kt.turn*110-v/Math.max(e,.001)*.05)):0;d.rollA+=(P-d.rollA)*Math.min(1,e*3),d.rig.root.rotateZ(d.rollA);let b=oi.clamp(d.fwd.y*4,-1,1);d.rig.update({dt:e,t:i,speed:d.v0,throttle:a?.08:A==="parked"?.05:1,roll:d.rollA/1.1,pitch:b,yaw:oi.clamp(v*3,-1,1),gear:A==="grid"||A==="parked"||A==="takeoff"&&w<.45||A==="landing"&&w<.75?1:0,ground:w<.02,mode:A,flags:f.f}),f.plane==="stunt"&&A==="fly"&&s>d.stuntAt&&(d.rig.maneuver(Math.random()<.5?"barrel":"roll"),d.stuntAt=s+9e3+Math.random()*12e3);let M=(f.f&Le.ESCORT)!==0;if(M&&!d.escorts.length&&(d.escorts=SM(d)),!M&&d.escorts.length){for(let U of d.escorts)U.dispose();d.escorts=[]}for(let U of d.escorts)U.update({dt:e,t:i,speed:d.v0,throttle:1,roll:0,pitch:0,yaw:0,gear:0,ground:!1,mode:"fly",flags:Le.SUPER});n&&f.place<d.lastPlace&&!f.fin&&A==="fly"&&(d.gold=1.4,d.pub.id===pn&&(Pe.toast("\u26A1 V\u01AF\u1EE2T!"),Sn.burst(d.pos,[16765498,16777215],24,20,1.4,.6))),d.lastPlace=f.place,d.gold=Math.max(0,d.gold-e),f.f&(Le.BOOST|Le.ENGINE)&&!(d.lastF&(Le.BOOST|Le.ENGINE))&&gd(d,10),d.lastF=f.f;let I=_u(d.disp,r);if(n&&A==="fly"&&d.pos.distanceToSquared(Tt.position)<700*700)for(let U=0;U<Ot.rings.length;U++){let B=Ot.rings[U].u;d.frac<B&&I>=B&&I-d.frac<.05&&(Ot.flashRing(U),d.pub.id===pn&&(ut.lap(),Sn.burst(d.pos,[Ot.rings[U].base.getHex(),16777215],30,26,1.3,.6)))}d.frac=I,BM(d,e,A==="fly"||A==="landing"||A==="takeoff"),f.f&Le.STUN&&Math.random()<e*30&&(hs.emit(d.pos,In.set((Math.random()-.5)*4,3,(Math.random()-.5)*4),3092271,4,1.4,{grow:6,alpha:.7}),Sn.emit(d.pos,In.set((Math.random()-.5)*10,Math.random()*6,(Math.random()-.5)*10),16760906,1.4,.4)),f.f&Le.SLOW&&Math.random()<e*10&&hs.emit(d.pos,In.set(0,1,0),6974074,3,1,{grow:3,alpha:.5}),f.f&Le.SUPER&&Math.random()<e*40&&Sn.emit(d.pos.clone().addScaledVector(d.fwd,-d.rig.size*.5),In.set((Math.random()-.5)*8,(Math.random()-.5)*8,(Math.random()-.5)*8),Gr.setHSL(i*.5%1,1,.6),1.6,.7),d.pub.id===pn&&(l=d)}xn&&xn.update(e,Tt),fd.strength+=((xn?.6:.55)-fd.strength)*Math.min(1,e*2),FM(l,e,i),Sn.update(e),hs.update(e),un.update(e),xd(Tt,pn),Bs.render(),HM(e),OM(),kM(l,e),Go=Math.max(0,Go-e*2),Je("flash").style.opacity=String(Go);let c=l?Math.max(0,l.v0)*3.6*(hi.length/r)*1.9:0;Pe.cam(Be.phase==="race"||Be.phase==="finish"?l?.pub:void 0,c,je.tag||(l?TM[je.shot]:"")),ut.engineAt(l?l.v0:0,n),Pe.status(Be,fn,t);let h=(fn.find(d=>!d.fin)??fn[0])?.d??0,u=Be.phase==="result"?"result":Be.phase==="race"||Be.phase==="finish"?h>=o*.85?"final":"race":"lobby";if(ut.setScene(u),hm.draw([...Ht.values()].map(d=>({x:d.pos.x,z:d.pos.z,color:d.pub.color,place:d.pub.place,focus:d.pub.id===pn}))),Vl+=e,ud++,Vl>3){let d=ud/Vl;Vl=0,ud=0,d<38&&Ns>1&&(Ns=Math.max(1,Ns-.5),bd())}}function xd(s,e){for(let t of Ht.values()){if(t.pub.id===e){t.rig.root.visible=!0;continue}let n=Math.max(18,t.rig.size*1.8),i=t.pos.distanceToSquared(s.position)<n*n;t.rig.root.visible=!i;for(let r of t.trails)i&&(r.mesh.visible=!1)}}function HM(s){let e=Je("pip"),t=Be.phase==="race"||Be.phase==="finish",n=fn.find(y=>!y.fin)??fn[0],i=n?Ht.get(n.id):void 0,r=!xn&&t&&!!i&&i.pub.id!==pn&&i.mode==="fly";if(e.hidden=!r,!r||!i)return;Pe.pip(i.pub);let o=Math.max(.8,i.rig.size/13),a=i.pos.clone().addScaledVector(i.fwd,-20*o).addScaledVector(i.up,6*o),l=i.pos.clone().addScaledVector(i.fwd,25),c=i.rig.body.getWorldPosition(pm),h=a.sub(i.pos),u=l.sub(i.pos);kl.distanceTo(h)>300&&(kl.copy(h),ad.copy(u)),kl.lerp(h,1-Math.exp(-s*5)),ad.lerp(u,1-Math.exp(-s*7)),im.copy(c).add(kl),sm.copy(c).add(ad),Ls.position.copy(im),Ls.lookAt(sm);let d=e.querySelector(".pv").getBoundingClientRect(),f=d.left,g=innerHeight-d.bottom,x=d.width,p=d.height;if(x<4||p<4)return;Ls.aspect=x/p,Ls.updateProjectionMatrix(),Jt.setScissorTest(!0),Jt.setScissor(f,g,x,p),Jt.setViewport(f,g,x,p);let m=Jt.autoClear;Jt.autoClear=!0,xd(Ls,i.pub.id),Ot.follow(Ls),Jt.render(yn,Ls),xd(Tt,pn),Ot.follow(Tt),Jt.autoClear=m,Jt.setScissorTest(!1),Jt.setViewport(0,0,innerWidth,innerHeight)}function BM(s,e,t){let n=s.rank>=12||s.pos.distanceToSquared(Tt.position)>202500,i=s.pub.f,r=i&(Le.SUPER|Le.JET)?3:i&(Le.NITRO|Le.ROCKET)?2:i&(Le.BOOST|Le.ENGINE)?1:0;s.rig.body.updateMatrixWorld(),s.trails.forEach((o,a)=>{let l=a<2,c=s.rig.exhaust[a===2?0:s.rig.exhaust.length-1],h=t&&!n&&(l||!!c&&(c.kind!=="prop"||r>0));if(o.mesh.visible=h,!h){o.reset();return}s.gold>0?Gr.copy(UM):r===3?Gr.setHSL((performance.now()/2e3+a*.1)%1,1,.65):r===2?Gr.setHex(l?12576511:6273279):Gr.setHex(16777215),o.color.copy(Gr),l?(o.width=s.gold>0||r>=2?.55:.18,o.opacity=s.gold>0?.9:r>=2?.75:.12+Math.min(.35,Math.abs(s.rollA)*.4),hd.copy(s.rig.tips[a]).applyMatrix4(s.rig.body.matrixWorld)):(o.width=c.r*(r>=2?1.6:1),o.opacity=r>=2?.7:r===1?.35:.14,hd.copy(c.pos).applyMatrix4(s.rig.body.matrixWorld)),o.push(hd,In.copy(s.up),e)})}function FM(s,e,t){let n=s?s.pub.f&(Le.SUPER|Le.JET|Le.ROCKET)?3:s.pub.f&Le.NITRO?2:s.pub.f&(Le.BOOST|Le.ENGINE)?1:0:0,i=[62,68,74,80][n];if(Tt.fov+=(i-Tt.fov)*Math.min(1,e*2),Tt.updateProjectionMatrix(),xn){let a=new S,l=new S;if(xn.camera(a,l),xn.age<.05)On.copy(a),Hi.copy(l);else{let c=1-Math.exp(-e*6);On.lerp(a,c),Hi.lerp(l,c)}}else if(Be.phase==="lobby"){ld+=e*.12;let a=Math.ceil(Ht.size/It.gridCols);hi.pose(-(a*It.gridGap/2+6)/It.lapLen,Kt);let l=Kt.p.clone().setY(Ot.runwayY+3),c=Math.sin(ld)*1.1,h=60+a*6,u=l.clone().addScaledVector(Kt.t,-Math.cos(c)*h).addScaledVector(Kt.r,Math.sin(c)*h).setY(Ot.runwayY+16+Math.sin(ld*.7)*5);On.lerp(u,1-Math.exp(-e*1.5)),Hi.lerp(l,1-Math.exp(-e*2))}else if(s){let a=0;for(let p of Ht.values())p!==s&&p.pos.distanceToSquared(s.pos)<70*70&&a++;zl+=(1+Math.min(a,16)*.07-zl)*Math.min(1,e*1.5);let l=Math.max(.6,s.rig.size/13)*zl,c=je.side;n>0&&je.shot!=="chase"&&je.shot!=="heli"&&(je.shot="chase",je.tag="\u{1F381}");let h=new S,u=new S,d=0,f=4,g=Be.phase==="countdown"?"chase":je.shot;switch(g){case"chase":{let p=(Be.phase==="countdown"?42:22+n*2)*l,m=(Be.phase==="countdown"?10:5+n*2.2)*l;h.copy(s.pos).addScaledVector(s.fwd,-p).addScaledVector(s.up,m).addScaledVector(s.right,Math.sin(t*.2)*4),u.copy(s.pos).addScaledVector(s.fwd,30).addScaledVector(s.up,3);break}case"side":h.copy(s.pos).addScaledVector(s.right,c*Math.max(26*l,48-c*s.lx)).addScaledVector(s.fwd,6*l).addScaledVector(s.up,4*l),u.copy(s.pos).addScaledVector(s.fwd,-4*l),d=-16;break;case"front":h.copy(s.pos).addScaledVector(s.fwd,46*l).addScaledVector(s.up,6*l).addScaledVector(s.right,c*Math.max(8*l,30-c*s.lx)),u.copy(s.pos).addScaledVector(s.fwd,-10*l),d=-14;break;case"heli":h.copy(s.pos).addScaledVector(s.fwd,-60).addScaledVector(s.up,55).addScaledVector(s.right,c*25),u.copy(s.pos).addScaledVector(s.fwd,25),f=2.5,d=4;break;case"low":h.copy(s.pos).addScaledVector(s.fwd,-15*l).addScaledVector(s.up,-3.5*l).addScaledVector(s.right,c*6*l),u.copy(s.pos).addScaledVector(s.fwd,20).addScaledVector(s.up,4),d=6;break;case"trackside":{h.copy(je.fixed),u.copy(s.pos);let p=je.fixed.distanceTo(s.pos);d=oi.clamp(p/6,0,30)*-1+10,f=30,p>260&&s.pos.clone().sub(je.fixed).dot(s.fwd)>0&&(je.until=0);break}}h.y=Math.max(h.y,Ot.terrain.at(h.x,h.z)+4,Ot.runwayY+3),g!=="chase"&&t>nm&&(nm=t+.25,RM(h,s.pos)&&(je.shot="chase",je.cut=!0,je.tag=""));let x=s.rig.body.getWorldPosition(pm);if(u.add(x).sub(s.pos),g==="trackside")je.cut&&(On.copy(h),Hi.copy(u),je.cut=!1),On.lerp(h,1-Math.exp(-e*f)),Hi.lerp(u,1-Math.exp(-e*12)),zo.copy(On).sub(x),Ol.copy(Hi).sub(x);else{let p=h.sub(x),m=u.sub(x);(je.cut||zo.distanceTo(p)>500)&&(zo.copy(p),Ol.copy(m),je.cut=!1),zo.lerp(p,1-Math.exp(-e*f)),Ol.lerp(m,1-Math.exp(-e*6)),On.copy(x).add(zo),Hi.copy(x).add(Ol),On.y=Math.max(On.y,Ot.terrain.at(On.x,On.z)+4,Ot.runwayY+3)}Tt.fov+=(d+(zl-1)*14)*Math.min(1,e*2),Tt.fov=oi.clamp(Tt.fov,32,85),Tt.updateProjectionMatrix()}Tt.position.copy(On);let r=Us+n*.12;r>0&&Tt.position.add(In.set((Math.random()-.5)*r,(Math.random()-.5)*r,(Math.random()-.5)*r)),Us=Math.max(0,Us-e*2),Tt.up.set(0,1,0),Tt.lookAt(Hi),s&&!xn&&(je.shot==="chase"||Be.phase==="countdown")&&Tt.rotateZ(-s.rollA*.18),pd.uniforms.strength.value+=([0,.015,.03,.045][n]-pd.uniforms.strength.value)*Math.min(1,e*3);let o=xn?xn.center:s?s.pos:Hi;kn.target.position.copy(o),kn.position.copy(o).addScaledVector(Ot.sunDir,600),kn.target.updateMatrixWorld()}var Vr=new S;function OM(){[...Ht.values()].map(e=>({v:e,d:e.pos.distanceToSquared(Tt.position)})).sort((e,t)=>e.d-t.d).forEach(({v:e,d:t},n)=>{e.rank=n,Vr.copy(e.pos).addScaledVector(e.up,e.rig.size*.32).project(Tt);let i=e.rig.root.visible&&n<14&&Vr.z<1&&t<700*700&&Math.abs(Vr.x)<1.1&&Math.abs(Vr.y)<1.1;if(e.label.style.display=i?"":"none",!i)return;let r=e.pub,o=`${r.place}|${r.name}|${r.f&Le.SHIELD}|${r.id===pn}|${r.plane}`;e.label.dataset.k!==o&&(e.label.dataset.k=o,e.label.className="tag"+(r.place<=3?" p"+r.place:"")+(r.id===pn?" focus":"")+(r.bot?" bot":"")+(r.plane==="golden"?" vip":""),e.label.replaceChildren(ne("b","",`#${r.place}`),ne("span","",(r.plane==="golden"?"\u{1F451} ":"")+r.name),...r.f&Le.SHIELD?[ne("i","","\u{1F6E1}\uFE0F")]:[]));let a=(Vr.x*.5+.5)*as.w,l=(-Vr.y*.5+.5)*as.h;e.label.style.transform=`translate(${a.toFixed(1)}px, ${l.toFixed(1)}px) translate(-50%, -100%) scale(${Math.max(.65,Math.min(1.1,160/Math.sqrt(t))).toFixed(2)})`})}var Vo=0;function kM(s,e){let t=s?.pub.f??0,n=t&(Le.SUPER|Le.JET|Le.ROCKET)?1:t&Le.NITRO?.75:t&Le.ENGINE?.45:t&Le.BOOST?.3:0;Vo+=(n-Vo)*Math.min(1,e*4);let i=yM,r=Wo.width,o=Wo.height;if(i.clearRect(0,0,r,o),Vo<.02)return;let a=r/2,l=o*.47,c=Math.hypot(r,o)/2;i.strokeStyle=`rgba(255,255,255,${(.3*Vo).toFixed(3)})`,i.lineCap="round";for(let h=0;h<46;h++){let u=Math.random()*Math.PI*2,d=c*(.4+Math.random()*.4),f=d+c*(.15+Math.random()*.3)*Vo;i.lineWidth=1+Math.random()*2.5,i.beginPath(),i.moveTo(a+Math.cos(u)*d,l+Math.sin(u)*d),i.lineTo(a+Math.cos(u)*f,l+Math.sin(u)*f),i.stroke()}}var Xl=()=>{ut.unlock(),Je("unlock").hidden=!0};addEventListener("pointerdown",Xl);addEventListener("keydown",Xl);setTimeout(()=>{ut.unlock(),ut.ready||(Je("unlock").hidden=!1)},300);Je("soundBtn").onclick=s=>{s.stopPropagation(),Xl(),ut.setMuted(!ut.muted),Je("soundBtn").textContent=ut.muted?"\u{1F507}":"\u{1F508}"};Je("musicBtn").onclick=s=>{s.stopPropagation(),Xl();let e=ut.toggleMusic();Je("musicBtn").style.opacity=e?"1":"0.45"};var dd=["Tu\u1EA5n Anh","Mai Linh","Ho\xE0ng Thi\u1EBFu Gia","B\xE9 Na","Khang Kh\xF4ng Kh\xF9ng","Ng\u1ECDc Trinh","V\u0103n Nam","B\u1EA3o An","H\xF9ng Phi C\xF4ng","Thu H\xE0","Minh \u0110\u1EE9c","Lan Chi"],yd=()=>{};function zM(){let s=Je("sim"),e=Je("simBody");s.hidden=!1;let t=(y,_)=>{try{if(_===void 0)return localStorage.getItem("bay-"+y);localStorage.setItem("bay-"+y,_)}catch{}return null};e.hidden=t("open")==="0",Je("simToggle").onclick=()=>{e.hidden=!e.hidden,t("open",e.hidden?"0":"1")};let n=(y,..._)=>{let v=ne("div","srow");return v.append(ne("b","st",y),..._),e.append(v),v},i=(y,_,v="")=>{let R=ne("button",v,y);return R.onclick=_,R},r=ne("input");r.placeholder="username TikTok",r.value=t("user")??"",n("\u{1F4E1} TikTok LIVE",r,i("K\u1EBFt n\u1ED1i",()=>{t("user",r.value),dn.send({t:"ctl",cmd:"connect",user:r.value})},"pri"),i("Ng\u1EAFt",()=>dn.send({t:"ctl",cmd:"disconnect"})));let o=ne("select");for(let y of dd){let _=ne("option","",y);_.value=y,o.append(_)}let a=()=>({id:o.value,name:o.value});n("\u{1F464} Ng\u01B0\u1EDDi th\u1EED",o,i('G\xF5 "1"',()=>dn.send({t:"sim",kind:"comment",...a(),text:"1"})),i("+5 ng\u01B0\u1EDDi",()=>{for(let y=0;y<5;y++){let _=dd[Math.floor(Math.random()*dd.length)]+" "+Math.floor(Math.random()*99);dn.send({t:"sim",kind:"comment",id:_,name:_,text:ws[Math.floor(Math.random()*ws.length)].words[0]})}}),i("\u2764\uFE0F x30",()=>dn.send({t:"sim",kind:"like",...a(),count:30})));let l=ne("select");for(let y of ws){let _=ne("option","",y.name);_.value=y.words[0],l.append(_)}let c=ne("input");c.placeholder="b\xECnh lu\u1EADn\u2026",n("\u{1F4AC} B\xECnh lu\u1EADn",l,i("Ch\u1ECDn m\xE1y bay",()=>dn.send({t:"sim",kind:"comment",...a(),text:l.value})),c,i("G\u1EEDi",()=>{c.value&&dn.send({t:"sim",kind:"comment",...a(),text:c.value}),c.value=""}));let h=ne("div","gifts");for(let y of Dr){let _=i(`${y.icon} ${y.xu} xu`,()=>dn.send({t:"sim",kind:"gift",...a(),gift:y.gift.split(",")[0],diamonds:y.xu,count:1}),"gb");_.title=`${y.name}: ${y.desc}`,h.append(_)}h.append(i("\u{1F339} x10 combo",()=>dn.send({t:"sim",kind:"gift",...a(),gift:"Hoa h\u1ED3ng",diamonds:1,count:10}),"gb")),n("\u{1F381} T\u1EB7ng qu\xE0",h),n("\u{1F3C1} Cu\u1ED9c \u0111ua",i("Xu\u1EA5t ph\xE1t ngay",()=>dn.send({t:"ctl",cmd:"startNow"}),"pri"),i("Cu\u1ED9c \u0111ua m\u1EDBi",()=>dn.send({t:"ctl",cmd:"newRace"})),i("X\xF3a ng\u01B0\u1EDDi th\u1EED",()=>dn.send({t:"ctl",cmd:"clearSim"})));let u=ne("input");u.type="checkbox";let d=ne("input");d.type="number",d.min="0",d.max="20",d.style.width="52px";let f=ne("select");for(let[y,_]of[["auto","\u{1F504} T\u1EF1 \u0111\u1ED5i m\u1ED7i cu\u1ED9c"],...Co.map(v=>[v.key,`${v.icon} ${v.name}`])]){let v=ne("option","",_);v.value=y,f.append(v)}let g=()=>dn.send({t:"ctl",cmd:"settings",settings:{voice:u.checked,bots:+d.value,map:f.value}});u.onchange=g,d.onchange=g,f.onchange=g;let x=(y,_)=>{let v=ne("label","lab");return v.append(_,ne("span","",y)),v};n("\u2699\uFE0F C\xE0i \u0111\u1EB7t",x("Gi\u1ECDng b\xECnh lu\u1EADn",u),x("Bot t\u1ED1i thi\u1EC3u",d),x("B\u1EA3n \u0111\u1ED3",f)),yd=()=>{u.checked=Gl.voice,d.value=String(Gl.bots),f.value=Gl.map},yd();let p=ne("a","golive","\u{1F4FA} M\u1EDF c\u1EEDa s\u1ED5 LIVE 9:16");p.href="/?live=1",p.onclick=y=>{y.preventDefault(),window.open("/?live=1","bay-live","width=540,height=960")};let m=ne("a","golive","\u{1F6E0}\uFE0F X\u01B0\u1EDFng m\xE1y bay");m.href="/hangar.html",m.target="_blank",e.append(p,ne("span","","   "),m,ne("div","note","\u0110ang n\u1ED1i TikTok th\u1EADt th\xEC b\u1EA3ng th\u1EED b\u1ECB kh\xF3a \u0111\u1EC3 live kh\xF4ng c\xF3 qu\xE0 gi\u1EA3."))}_d||zM();bd();vd.has("debug")&&Object.assign(window,{__cam:Tt,__scene:yn,__views:Ht});(async()=>{try{let s=await Yp();s.length&&console.info("Model GLB:",s.join(", "))}catch(s){console.warn(s)}for(let s of ws)Uo(s.key),await new Promise(e=>setTimeout(e,0));Uo("golden"),dn.connect()})();mm();})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
