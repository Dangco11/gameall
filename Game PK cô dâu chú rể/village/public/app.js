"use strict";(()=>{var lp=Object.defineProperty;var hp=(s,t,e)=>t in s?lp(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var O=(s,t,e)=>hp(s,typeof t!="symbol"?t+"":t,e);var lh="170";var up=0,hu=1,fp=2;var Sf=1,hh=2,ai=3,Pi=0,We=1,Te=2,Hn=0,Ps=1,je=2,uu=3,fu=4,dp=5,Yi=100,pp=101,mp=102,gp=103,xp=104,vp=200,_p=201,yp=202,bp=203,Nc=204,kc=205,Mp=206,Ep=207,Sp=208,Tp=209,wp=210,Ap=211,Rp=212,Cp=213,Pp=214,Bc=0,Oc=1,Fc=2,Us=3,zc=4,Hc=5,Vc=6,Gc=7,Tf=0,Ip=1,Lp=2,Ci=0,uh=1,fh=2,dh=3,Dr=4,Dp=5,ph=6,mh=7;var wf=300,Ns=301,ks=302,Wc=303,Xc=304,ao=306,Bs=1e3,Zi=1001,qc=1002,un=1003,Up=1004;var Wr=1005;var Fn=1006,ec=1007;var Ji=1008;var hi=1009,Af=1010,Rf=1011,Er=1012,gh=1013,Ki=1014,zn=1015,In=1016,xh=1017,vh=1018,Os=1020,Cf=35902,Pf=1021,If=1022,An=1023,Lf=1024,Df=1025,Is=1026,Fs=1027,_h=1028,yh=1029,Uf=1030,bh=1031;var Mh=1033,ba=33776,Ma=33777,Ea=33778,Sa=33779,Yc=35840,$c=35841,Zc=35842,Jc=35843,Kc=36196,Qc=37492,jc=37496,tl=37808,el=37809,nl=37810,il=37811,sl=37812,rl=37813,al=37814,ol=37815,cl=37816,ll=37817,hl=37818,ul=37819,fl=37820,dl=37821,Ta=36492,pl=36494,ml=36495,Nf=36283,gl=36284,xl=36285,vl=36286;var wa=2300,_l=2301,nc=2302,du=2400,pu=2401,mu=2402;var Np=3200,kp=3201;var kf=0,Bp=1,Ai="",Se="srgb",qs="srgb-linear",oo="linear",le="srgb";var ls=7680;var gu=519,Op=512,Fp=513,zp=514,Bf=515,Hp=516,Vp=517,Gp=518,Wp=519,yl=35044,Ys=35048;var xu="300 es",ci=2e3,Aa=2001,Ii=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}},Ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vu=1234567,xr=Math.PI/180,zs=180/Math.PI;function Vn(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ve[s&255]+Ve[s>>8&255]+Ve[s>>16&255]+Ve[s>>24&255]+"-"+Ve[t&255]+Ve[t>>8&255]+"-"+Ve[t>>16&15|64]+Ve[t>>24&255]+"-"+Ve[e&63|128]+Ve[e>>8&255]+"-"+Ve[e>>16&255]+Ve[e>>24&255]+Ve[n&255]+Ve[n>>8&255]+Ve[n>>16&255]+Ve[n>>24&255]).toLowerCase()}function Fe(s,t,e){return Math.max(t,Math.min(e,s))}function Eh(s,t){return(s%t+t)%t}function Xp(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function qp(s,t,e){return s!==t?(e-s)/(t-s):0}function vr(s,t,e){return(1-e)*s+e*t}function Yp(s,t,e,n){return vr(s,t,1-Math.exp(-e*n))}function $p(s,t=1){return t-Math.abs(Eh(s,t*2)-t)}function Zp(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Jp(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Kp(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Qp(s,t){return s+Math.random()*(t-s)}function jp(s){return s*(.5-Math.random())}function tm(s){s!==void 0&&(vu=s);let t=vu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function em(s){return s*xr}function nm(s){return s*zs}function im(s){return(s&s-1)===0&&s!==0}function sm(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function rm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function am(s,t,e,n,i){let r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),g=a((n-t)/2);switch(i){case"XYX":s.set(o*h,c*u,c*f,o*l);break;case"YZY":s.set(c*f,o*h,c*u,o*l);break;case"ZXZ":s.set(c*u,c*f,o*h,o*l);break;case"XZX":s.set(o*h,c*g,c*d,o*l);break;case"YXY":s.set(c*d,o*h,c*g,o*l);break;case"ZYZ":s.set(c*g,c*d,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function wn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function fe(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Ur={DEG2RAD:xr,RAD2DEG:zs,generateUUID:Vn,clamp:Fe,euclideanModulo:Eh,mapLinear:Xp,inverseLerp:qp,lerp:vr,damp:Yp,pingpong:$p,smoothstep:Zp,smootherstep:Jp,randInt:Kp,randFloat:Qp,randFloatSpread:jp,seededRandom:tm,degToRad:em,radToDeg:nm,isPowerOfTwo:im,ceilPowerOfTwo:sm,floorPowerOfTwo:rm,setQuaternionFromProperEuler:am,normalize:fe,denormalize:wn},tt=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},$t=class s{constructor(t,e,n,i,r,a,o,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,c,l)}set(t,e,n,i,r,a,o,c,l){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],x=i[0],m=i[3],p=i[6],y=i[1],_=i[4],v=i[7],L=i[2],R=i[5],C=i[8];return r[0]=a*x+o*y+c*L,r[3]=a*m+o*_+c*R,r[6]=a*p+o*v+c*C,r[1]=l*x+h*y+u*L,r[4]=l*m+h*_+u*R,r[7]=l*p+h*v+u*C,r[2]=f*x+d*y+g*L,r[5]=f*m+d*_+g*R,r[8]=f*p+d*v+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,f=o*c-h*r,d=l*r-a*c,g=e*u+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(i*l-h*n)*x,t[2]=(o*n-i*a)*x,t[3]=f*x,t[4]=(h*e-i*c)*x,t[5]=(i*r-o*e)*x,t[6]=d*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-i*l,i*c,-i*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ic.makeScale(t,e)),this}rotate(t){return this.premultiply(ic.makeRotation(-t)),this}translate(t,e){return this.premultiply(ic.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ic=new $t;function Of(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Ra(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function om(){let s=Ra("canvas");return s.style.display="block",s}var _u={};function mr(s){s in _u||(_u[s]=!0,console.warn(s))}function cm(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function lm(s){let t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function hm(s){let t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var jt={enabled:!0,workingColorSpace:qs,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===le&&(s.r=li(s.r),s.g=li(s.g),s.b=li(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===le&&(s.r=Ls(s.r),s.g=Ls(s.g),s.b=Ls(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ai?oo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function li(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ls(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var yu=[.64,.33,.3,.6,.15,.06],bu=[.2126,.7152,.0722],Mu=[.3127,.329],Eu=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Su=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);jt.define({[qs]:{primaries:yu,whitePoint:Mu,transfer:oo,toXYZ:Eu,fromXYZ:Su,luminanceCoefficients:bu,workingColorSpaceConfig:{unpackColorSpace:Se},outputColorSpaceConfig:{drawingBufferColorSpace:Se}},[Se]:{primaries:yu,whitePoint:Mu,transfer:le,toXYZ:Eu,fromXYZ:Su,luminanceCoefficients:bu,outputColorSpaceConfig:{drawingBufferColorSpace:Se}}});var hs,bl=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{hs===void 0&&(hs=Ra("canvas")),hs.width=t.width,hs.height=t.height;let n=hs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=hs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ra("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=li(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(li(e[n]/255)*255):e[n]=li(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},um=0,Ca=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:um++}),this.uuid=Vn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(sc(i[a].image)):r.push(sc(i[a]))}else r=sc(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function sc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?bl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var fm=0,tn=class s extends Ii{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=Zi,i=Zi,r=Fn,a=Ji,o=An,c=hi,l=s.DEFAULT_ANISOTROPY,h=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fm++}),this.uuid=Vn(),this.name="",this.source=new Ca(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new tt(0,0),this.repeat=new tt(1,1),this.center=new tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Bs:t.x=t.x-Math.floor(t.x);break;case Zi:t.x=t.x<0?0:1;break;case qc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Bs:t.y=t.y-Math.floor(t.y);break;case Zi:t.y=t.y<0?0:1;break;case qc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=wf;tn.DEFAULT_ANISOTROPY=1;var pe=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let _=(l+1)/2,v=(d+1)/2,L=(p+1)/2,R=(h+f)/4,C=(u+x)/4,A=(g+m)/4;return _>v&&_>L?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=R/n,r=C/n):v>L?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=R/i,r=A/i):L<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(L),n=C/r,i=A/r),this.set(n,i,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-x)/y,this.z=(f-h)/y,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ml=class extends Ii{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new pe(0,0,t,e),this.scissorTest=!1,this.viewport=new pe(0,0,t,e);let i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new tn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Ca(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ze=class extends Ml{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Pa=class extends tn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=Zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var El=class extends tn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=Zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Oe=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],f=r[a+0],d=r[a+1],g=r[a+2],x=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=x;return}if(u!==x||c!==f||l!==d||h!==g){let m=1-o,p=c*f+l*d+h*g+u*x,y=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let L=Math.sqrt(_),R=Math.atan2(L,p*y);m=Math.sin(m*R)/L,o=Math.sin(o*R)/L}let v=o*y;if(c=c*m+f*v,l=l*m+d*v,h=h*m+g*v,u=u*m+x*v,m===1-o){let L=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=L,l*=L,h*=L,u*=L}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-o*d,t[e+2]=l*g+h*d+o*f-c*u,t[e+3]=h*g-o*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(r/2),f=c(n/2),d=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-i)*d}else if(n>o&&n>u){let d=2*Math.sqrt(1+n-o-u);this._w=(h-c)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+l)/d}else if(o>u){let d=2*Math.sqrt(1+o-n-u);this._w=(r-l)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-o);this._w=(a-i)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Fe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},T=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Tu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Tu.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=i+c*u+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return rc.copy(this).projectOnVector(t),this.sub(rc)}reflect(t){return this.sub(rc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},rc=new T,Tu=new Oe,ui=class{constructor(t=new T(1/0,1/0,1/0),e=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(En.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(En.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=En.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,En):En.fromBufferAttribute(r,a),En.applyMatrix4(t.matrixWorld),this.expandByPoint(En);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xr.copy(n.boundingBox)),Xr.applyMatrix4(t.matrixWorld),this.union(Xr)}let i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,En),En.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(rr),qr.subVectors(this.max,rr),us.subVectors(t.a,rr),fs.subVectors(t.b,rr),ds.subVectors(t.c,rr),bi.subVectors(fs,us),Mi.subVectors(ds,fs),zi.subVectors(us,ds);let e=[0,-bi.z,bi.y,0,-Mi.z,Mi.y,0,-zi.z,zi.y,bi.z,0,-bi.x,Mi.z,0,-Mi.x,zi.z,0,-zi.x,-bi.y,bi.x,0,-Mi.y,Mi.x,0,-zi.y,zi.x,0];return!ac(e,us,fs,ds,qr)||(e=[1,0,0,0,1,0,0,0,1],!ac(e,us,fs,ds,qr))?!1:(Yr.crossVectors(bi,Mi),e=[Yr.x,Yr.y,Yr.z],ac(e,us,fs,ds,qr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,En).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(En).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ei),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},ei=[new T,new T,new T,new T,new T,new T,new T,new T],En=new T,Xr=new ui,us=new T,fs=new T,ds=new T,bi=new T,Mi=new T,zi=new T,rr=new T,qr=new T,Yr=new T,Hi=new T;function ac(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Hi.fromArray(s,r);let o=i.x*Math.abs(Hi.x)+i.y*Math.abs(Hi.y)+i.z*Math.abs(Hi.z),c=t.dot(Hi),l=e.dot(Hi),h=n.dot(Hi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var dm=new ui,ar=new T,oc=new T,Li=class{constructor(t=new T,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):dm.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ar.subVectors(t,this.center);let e=ar.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ar,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(oc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ar.copy(t.center).add(oc)),this.expandByPoint(ar.copy(t.center).sub(oc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},ni=new T,cc=new T,$r=new T,Ei=new T,lc=new T,Zr=new T,hc=new T,Ia=class{constructor(t=new T,e=new T(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ni)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ni.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ni.copy(this.origin).addScaledVector(this.direction,e),ni.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){cc.copy(t).add(e).multiplyScalar(.5),$r.copy(e).sub(t).normalize(),Ei.copy(this.origin).sub(cc);let r=t.distanceTo(e)*.5,a=-this.direction.dot($r),o=Ei.dot(this.direction),c=-Ei.dot($r),l=Ei.lengthSq(),h=Math.abs(1-a*a),u,f,d,g;if(h>0)if(u=a*c-o,f=a*o-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let x=1/h;u*=x,f*=x,d=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(cc).addScaledVector($r,f),d}intersectSphere(t,e){ni.subVectors(t.center,this.origin);let n=ni.dot(this.direction),i=ni.dot(ni)-n*n,r=t.radius*t.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,i=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,i=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,ni)!==null}intersectTriangle(t,e,n,i,r){lc.subVectors(e,t),Zr.subVectors(n,t),hc.crossVectors(lc,Zr);let a=this.direction.dot(hc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ei.subVectors(this.origin,t);let c=o*this.direction.dot(Zr.crossVectors(Ei,Zr));if(c<0)return null;let l=o*this.direction.dot(lc.cross(Ei));if(l<0||c+l>a)return null;let h=-o*Ei.dot(hc);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},zt=class s{constructor(t,e,n,i,r,a,o,c,l,h,u,f,d,g,x,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,c,l,h,u,f,d,g,x,m)}set(t,e,n,i,r,a,o,c,l,h,u,f,d,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/ps.setFromMatrixColumn(t,0).length(),r=1/ps.setFromMatrixColumn(t,1).length(),a=1/ps.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=a*h,d=a*u,g=o*h,x=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-x*l,e[9]=-o*c,e[2]=x-f*l,e[6]=g+d*l,e[10]=a*c}else if(t.order==="YXZ"){let f=c*h,d=c*u,g=l*h,x=l*u;e[0]=f+x*o,e[4]=g*o-d,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=x+f*o,e[10]=a*c}else if(t.order==="ZXY"){let f=c*h,d=c*u,g=l*h,x=l*u;e[0]=f-x*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=x-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let f=a*h,d=a*u,g=o*h,x=o*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+x,e[1]=c*u,e[5]=x*l+f,e[9]=d*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let f=a*c,d=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=x-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-x*u}else if(t.order==="XZY"){let f=a*c,d=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+x,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(pm,t,mm)}lookAt(t,e,n){let i=this.elements;return ln.subVectors(t,e),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),Si.crossVectors(n,ln),Si.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),Si.crossVectors(n,ln)),Si.normalize(),Jr.crossVectors(ln,Si),i[0]=Si.x,i[4]=Jr.x,i[8]=ln.x,i[1]=Si.y,i[5]=Jr.y,i[9]=ln.y,i[2]=Si.z,i[6]=Jr.z,i[10]=ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],x=n[6],m=n[10],p=n[14],y=n[3],_=n[7],v=n[11],L=n[15],R=i[0],C=i[4],A=i[8],S=i[12],M=i[1],I=i[5],H=i[9],B=i[13],V=i[2],J=i[6],G=i[10],nt=i[14],W=i[3],lt=i[7],xt=i[11],Tt=i[15];return r[0]=a*R+o*M+c*V+l*W,r[4]=a*C+o*I+c*J+l*lt,r[8]=a*A+o*H+c*G+l*xt,r[12]=a*S+o*B+c*nt+l*Tt,r[1]=h*R+u*M+f*V+d*W,r[5]=h*C+u*I+f*J+d*lt,r[9]=h*A+u*H+f*G+d*xt,r[13]=h*S+u*B+f*nt+d*Tt,r[2]=g*R+x*M+m*V+p*W,r[6]=g*C+x*I+m*J+p*lt,r[10]=g*A+x*H+m*G+p*xt,r[14]=g*S+x*B+m*nt+p*Tt,r[3]=y*R+_*M+v*V+L*W,r[7]=y*C+_*I+v*J+L*lt,r[11]=y*A+_*H+v*G+L*xt,r[15]=y*S+_*B+v*nt+L*Tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*c*u-i*l*u-r*o*f+n*l*f+i*o*d-n*c*d)+x*(+e*c*d-e*l*f+r*a*f-i*a*d+i*l*h-r*c*h)+m*(+e*l*u-e*o*d-r*a*u+n*a*d+r*o*h-n*l*h)+p*(-i*o*h-e*c*u+e*o*f+i*a*u-n*a*f+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],x=t[13],m=t[14],p=t[15],y=u*m*l-x*f*l+x*c*d-o*m*d-u*c*p+o*f*p,_=g*f*l-h*m*l-g*c*d+a*m*d+h*c*p-a*f*p,v=h*x*l-g*u*l+g*o*d-a*x*d-h*o*p+a*u*p,L=g*u*c-h*x*c-g*o*f+a*x*f+h*o*m-a*u*m,R=e*y+n*_+i*v+r*L;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/R;return t[0]=y*C,t[1]=(x*f*r-u*m*r-x*i*d+n*m*d+u*i*p-n*f*p)*C,t[2]=(o*m*r-x*c*r+x*i*l-n*m*l-o*i*p+n*c*p)*C,t[3]=(u*c*r-o*f*r-u*i*l+n*f*l+o*i*d-n*c*d)*C,t[4]=_*C,t[5]=(h*m*r-g*f*r+g*i*d-e*m*d-h*i*p+e*f*p)*C,t[6]=(g*c*r-a*m*r-g*i*l+e*m*l+a*i*p-e*c*p)*C,t[7]=(a*f*r-h*c*r+h*i*l-e*f*l-a*i*d+e*c*d)*C,t[8]=v*C,t[9]=(g*u*r-h*x*r-g*n*d+e*x*d+h*n*p-e*u*p)*C,t[10]=(a*x*r-g*o*r+g*n*l-e*x*l-a*n*p+e*o*p)*C,t[11]=(h*o*r-a*u*r-h*n*l+e*u*l+a*n*d-e*o*d)*C,t[12]=L*C,t[13]=(h*x*i-g*u*i+g*n*f-e*x*f-h*n*m+e*u*m)*C,t[14]=(g*o*i-a*x*i-g*n*c+e*x*c+a*n*m-e*o*m)*C,t[15]=(a*u*i-h*o*i+h*n*c-e*u*c-a*n*f+e*o*f)*C,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,u=o+o,f=r*l,d=r*h,g=r*u,x=a*h,m=a*u,p=o*u,y=c*l,_=c*h,v=c*u,L=n.x,R=n.y,C=n.z;return i[0]=(1-(x+p))*L,i[1]=(d+v)*L,i[2]=(g-_)*L,i[3]=0,i[4]=(d-v)*R,i[5]=(1-(f+p))*R,i[6]=(m+y)*R,i[7]=0,i[8]=(g+_)*C,i[9]=(m-y)*C,i[10]=(1-(f+x))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,r=ps.set(i[0],i[1],i[2]).length(),a=ps.set(i[4],i[5],i[6]).length(),o=ps.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Sn.copy(this);let l=1/r,h=1/a,u=1/o;return Sn.elements[0]*=l,Sn.elements[1]*=l,Sn.elements[2]*=l,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=u,Sn.elements[9]*=u,Sn.elements[10]*=u,e.setFromRotationMatrix(Sn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=ci){let c=this.elements,l=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i),d,g;if(o===ci)d=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Aa)d=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=ci){let c=this.elements,l=1/(e-t),h=1/(n-i),u=1/(a-r),f=(e+t)*l,d=(n+i)*h,g,x;if(o===ci)g=(a+r)*u,x=-2*u;else if(o===Aa)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ps=new T,Sn=new zt,pm=new T(0,0,0),mm=new T(1,1,1),Si=new T,Jr=new T,ln=new T,wu=new zt,Au=new Oe,Xe=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Fe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Fe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Fe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Fe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return wu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(wu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Au.setFromEuler(this),this.setFromQuaternion(Au,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Xe.DEFAULT_ORDER="XYZ";var La=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},gm=0,Ru=new T,ms=new Oe,ii=new zt,Kr=new T,or=new T,xm=new T,vm=new Oe,Cu=new T(1,0,0),Pu=new T(0,1,0),Iu=new T(0,0,1),Lu={type:"added"},_m={type:"removed"},gs={type:"childadded",child:null},uc={type:"childremoved",child:null},De=class s extends Ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=Vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new T,e=new Xe,n=new Oe,i=new T(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new zt},normalMatrix:{value:new $t}}),this.matrix=new zt,this.matrixWorld=new zt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new La,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ms.setFromAxisAngle(t,e),this.quaternion.multiply(ms),this}rotateOnWorldAxis(t,e){return ms.setFromAxisAngle(t,e),this.quaternion.premultiply(ms),this}rotateX(t){return this.rotateOnAxis(Cu,t)}rotateY(t){return this.rotateOnAxis(Pu,t)}rotateZ(t){return this.rotateOnAxis(Iu,t)}translateOnAxis(t,e){return Ru.copy(t).applyQuaternion(this.quaternion),this.position.add(Ru.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Cu,t)}translateY(t){return this.translateOnAxis(Pu,t)}translateZ(t){return this.translateOnAxis(Iu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Kr.copy(t):Kr.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),or.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ii.lookAt(or,Kr,this.up):ii.lookAt(Kr,or,this.up),this.quaternion.setFromRotationMatrix(ii),i&&(ii.extractRotation(i.matrixWorld),ms.setFromRotationMatrix(ii),this.quaternion.premultiply(ms.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Lu),gs.child=t,this.dispatchEvent(gs),gs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(_m),uc.child=t,this.dispatchEvent(uc),uc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ii.multiply(t.parent.matrixWorld)),t.applyMatrix4(ii),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Lu),gs.child=t,this.dispatchEvent(gs),gs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,t,xm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,vm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};De.DEFAULT_UP=new T(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Tn=new T,si=new T,fc=new T,ri=new T,xs=new T,vs=new T,Du=new T,dc=new T,pc=new T,mc=new T,gc=new pe,xc=new pe,vc=new pe,Ri=class s{constructor(t=new T,e=new T,n=new T){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Tn.subVectors(t,e),i.cross(Tn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Tn.subVectors(i,e),si.subVectors(n,e),fc.subVectors(t,e);let a=Tn.dot(Tn),o=Tn.dot(si),c=Tn.dot(fc),l=si.dot(si),h=si.dot(fc),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-o*h)*f,g=(a*h-o*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,ri)===null?!1:ri.x>=0&&ri.y>=0&&ri.x+ri.y<=1}static getInterpolation(t,e,n,i,r,a,o,c){return this.getBarycoord(t,e,n,i,ri)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ri.x),c.addScaledVector(a,ri.y),c.addScaledVector(o,ri.z),c)}static getInterpolatedAttribute(t,e,n,i,r,a){return gc.setScalar(0),xc.setScalar(0),vc.setScalar(0),gc.fromBufferAttribute(t,e),xc.fromBufferAttribute(t,n),vc.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(gc,r.x),a.addScaledVector(xc,r.y),a.addScaledVector(vc,r.z),a}static isFrontFacing(t,e,n,i){return Tn.subVectors(n,e),si.subVectors(t,e),Tn.cross(si).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Tn.subVectors(this.c,this.b),si.subVectors(this.a,this.b),Tn.cross(si).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,a,o;xs.subVectors(i,n),vs.subVectors(r,n),dc.subVectors(t,n);let c=xs.dot(dc),l=vs.dot(dc);if(c<=0&&l<=0)return e.copy(n);pc.subVectors(t,i);let h=xs.dot(pc),u=vs.dot(pc);if(h>=0&&u<=h)return e.copy(i);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(xs,a);mc.subVectors(t,r);let d=xs.dot(mc),g=vs.dot(mc);if(g>=0&&d<=g)return e.copy(r);let x=d*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(vs,o);let m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Du.subVectors(r,i),o=(u-h)/(u-h+(d-g)),e.copy(i).addScaledVector(Du,o);let p=1/(m+x+f);return a=x*p,o=f*p,e.copy(n).addScaledVector(xs,a).addScaledVector(vs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ff={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},Qr={h:0,s:0,l:0};function _c(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Mt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Se){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=jt.workingColorSpace){if(t=Eh(t,1),e=Fe(e,0,1),n=Fe(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=_c(a,r,t+1/3),this.g=_c(a,r,t),this.b=_c(a,r,t-1/3)}return jt.toWorkingColorSpace(this,i),this}setStyle(t,e=Se){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Se){let n=Ff[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=li(t.r),this.g=li(t.g),this.b=li(t.b),this}copyLinearToSRGB(t){return this.r=Ls(t.r),this.g=Ls(t.g),this.b=Ls(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Se){return jt.fromWorkingColorSpace(Ge.copy(this),t),Math.round(Fe(Ge.r*255,0,255))*65536+Math.round(Fe(Ge.g*255,0,255))*256+Math.round(Fe(Ge.b*255,0,255))}getHexString(t=Se){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(Ge.copy(this),e);let n=Ge.r,i=Ge.g,r=Ge.b,a=Math.max(n,i,r),o=Math.min(n,i,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(Ge.copy(this),e),t.r=Ge.r,t.g=Ge.g,t.b=Ge.b,t}getStyle(t=Se){jt.fromWorkingColorSpace(Ge.copy(this),t);let e=Ge.r,n=Ge.g,i=Ge.b;return t!==Se?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Ti),this.setHSL(Ti.h+t,Ti.s+e,Ti.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ti),t.getHSL(Qr);let n=vr(Ti.h,Qr.h,e),i=vr(Ti.s,Qr.s,e),r=vr(Ti.l,Qr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ge=new Mt;Mt.NAMES=Ff;var ym=0,fi=class extends Ii{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ym++}),this.uuid=Vn(),this.name="",this.blending=Ps,this.side=Pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Nc,this.blendDst=kc,this.blendEquation=Yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=Us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ls,this.stencilZFail=ls,this.stencilZPass=ls,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ps&&(n.blending=this.blending),this.side!==Pi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Nc&&(n.blendSrc=this.blendSrc),this.blendDst!==kc&&(n.blendDst=this.blendDst),this.blendEquation!==Yi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Us&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ls&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ls&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ls&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},de=class extends fi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xe,this.combine=Tf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Le=new T,jr=new tt,Be=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=yl,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)jr.fromBufferAttribute(this,e),jr.applyMatrix3(t),this.setXY(e,jr.x,jr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix3(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=wn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=fe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wn(e,this.array)),e}setX(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wn(e,this.array)),e}setY(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wn(e,this.array)),e}setW(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),i=fe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),i=fe(i,this.array),r=fe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==yl&&(t.usage=this.usage),t}};var Da=class extends Be{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ua=class extends Be{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Kt=class extends Be{constructor(t,e,n){super(new Float32Array(t),e,n)}},bm=0,xn=new zt,yc=new De,_s=new T,hn=new ui,cr=new ui,ke=new T,Ae=class s extends Ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=Vn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Of(t)?Ua:Da)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return xn.makeRotationFromQuaternion(t),this.applyMatrix4(xn),this}rotateX(t){return xn.makeRotationX(t),this.applyMatrix4(xn),this}rotateY(t){return xn.makeRotationY(t),this.applyMatrix4(xn),this}rotateZ(t){return xn.makeRotationZ(t),this.applyMatrix4(xn),this}translate(t,e,n){return xn.makeTranslation(t,e,n),this.applyMatrix4(xn),this}scale(t,e,n){return xn.makeScale(t,e,n),this.applyMatrix4(xn),this}lookAt(t){return yc.lookAt(t),yc.updateMatrix(),this.applyMatrix4(yc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Kt(n,3))}else{for(let n=0,i=e.count;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ui);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];hn.setFromBufferAttribute(r),this.morphTargetsRelative?(ke.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(ke),ke.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(ke)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Li);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(t){let n=this.boundingSphere.center;if(hn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];cr.setFromBufferAttribute(o),this.morphTargetsRelative?(ke.addVectors(hn.min,cr.min),hn.expandByPoint(ke),ke.addVectors(hn.max,cr.max),hn.expandByPoint(ke)):(hn.expandByPoint(cr.min),hn.expandByPoint(cr.max))}hn.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)ke.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(ke));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)ke.fromBufferAttribute(o,l),c&&(_s.fromBufferAttribute(t,l),ke.add(_s)),i=Math.max(i,n.distanceToSquared(ke))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Be(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let A=0;A<n.count;A++)o[A]=new T,c[A]=new T;let l=new T,h=new T,u=new T,f=new tt,d=new tt,g=new tt,x=new T,m=new T;function p(A,S,M){l.fromBufferAttribute(n,A),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,A),d.fromBufferAttribute(r,S),g.fromBufferAttribute(r,M),h.sub(l),u.sub(l),d.sub(f),g.sub(f);let I=1/(d.x*g.y-g.x*d.y);isFinite(I)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(I),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(I),o[A].add(x),o[S].add(x),o[M].add(x),c[A].add(m),c[S].add(m),c[M].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let A=0,S=y.length;A<S;++A){let M=y[A],I=M.start,H=M.count;for(let B=I,V=I+H;B<V;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let _=new T,v=new T,L=new T,R=new T;function C(A){L.fromBufferAttribute(i,A),R.copy(L);let S=o[A];_.copy(S),_.sub(L.multiplyScalar(L.dot(S))).normalize(),v.crossVectors(R,S);let I=v.dot(c[A])<0?-1:1;a.setXYZW(A,_.x,_.y,_.z,I)}for(let A=0,S=y.length;A<S;++A){let M=y[A],I=M.start,H=M.count;for(let B=I,V=I+H;B<V;B+=3)C(t.getX(B+0)),C(t.getX(B+1)),C(t.getX(B+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Be(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new T,r=new T,a=new T,o=new T,c=new T,l=new T,h=new T,u=new T;if(t)for(let f=0,d=t.count;f<d;f+=3){let g=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ke.fromBufferAttribute(t,e),ke.normalize(),t.setXYZ(e,ke.x,ke.y,ke.z)}toNonIndexed(){function t(o,c){let l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h),d=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?d=c[x]*o.data.stride+o.offset:d=c[x]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new Be(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(i[c]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Uu=new zt,Vi=new Ia,ta=new Li,Nu=new T,ea=new T,na=new T,ia=new T,bc=new T,sa=new T,ku=new T,ra=new T,wt=class extends De{constructor(t=new Ae,e=new de){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(r&&o){sa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(bc.fromBufferAttribute(u,t),a?sa.addScaledVector(bc,h):sa.addScaledVector(bc.sub(e),h))}e.add(sa)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ta.copy(n.boundingSphere),ta.applyMatrix4(r),Vi.copy(t.ray).recast(t.near),!(ta.containsPoint(Vi.origin)===!1&&(Vi.intersectSphere(ta,Nu)===null||Vi.origin.distanceToSquared(Nu)>(t.far-t.near)**2))&&(Uu.copy(r).invert(),Vi.copy(t.ray).applyMatrix4(Uu),!(n.boundingBox!==null&&Vi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Vi)))}_computeIntersections(t,e,n){let i,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){let m=f[g],p=a[m.materialIndex],y=Math.max(m.start,d.start),_=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let v=y,L=_;v<L;v+=3){let R=o.getX(v),C=o.getX(v+1),A=o.getX(v+2);i=aa(this,p,t,n,l,h,u,R,C,A),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){let y=o.getX(m),_=o.getX(m+1),v=o.getX(m+2);i=aa(this,a,t,n,l,h,u,y,_,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){let m=f[g],p=a[m.materialIndex],y=Math.max(m.start,d.start),_=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let v=y,L=_;v<L;v+=3){let R=v,C=v+1,A=v+2;i=aa(this,p,t,n,l,h,u,R,C,A),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){let y=m,_=m+1,v=m+2;i=aa(this,a,t,n,l,h,u,y,_,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function Mm(s,t,e,n,i,r,a,o){let c;if(t.side===We?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,t.side===Pi,o),c===null)return null;ra.copy(o),ra.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(ra);return l<e.near||l>e.far?null:{distance:l,point:ra.clone(),object:s}}function aa(s,t,e,n,i,r,a,o,c,l){s.getVertexPosition(o,ea),s.getVertexPosition(c,na),s.getVertexPosition(l,ia);let h=Mm(s,t,e,n,ea,na,ia,ku);if(h){let u=new T;Ri.getBarycoord(ku,ea,na,ia,u),i&&(h.uv=Ri.getInterpolatedAttribute(i,o,c,l,u,new tt)),r&&(h.uv1=Ri.getInterpolatedAttribute(r,o,c,l,u,new tt)),a&&(h.normal=Ri.getInterpolatedAttribute(a,o,c,l,u,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new T,materialIndex:0};Ri.getNormal(ea,na,ia,f.normal),h.face=f,h.barycoord=u}return h}var Ie=class s extends Ae{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Kt(l,3)),this.setAttribute("normal",new Kt(h,3)),this.setAttribute("uv",new Kt(u,2));function g(x,m,p,y,_,v,L,R,C,A,S){let M=v/C,I=L/A,H=v/2,B=L/2,V=R/2,J=C+1,G=A+1,nt=0,W=0,lt=new T;for(let xt=0;xt<G;xt++){let Tt=xt*I-B;for(let Xt=0;Xt<J;Xt++){let ae=Xt*M-H;lt[x]=ae*y,lt[m]=Tt*_,lt[p]=V,l.push(lt.x,lt.y,lt.z),lt[x]=0,lt[m]=0,lt[p]=R>0?1:-1,h.push(lt.x,lt.y,lt.z),u.push(Xt/C),u.push(1-xt/A),nt+=1}}for(let xt=0;xt<A;xt++)for(let Tt=0;Tt<C;Tt++){let Xt=f+Tt+J*xt,ae=f+Tt+J*(xt+1),Z=f+(Tt+1)+J*(xt+1),rt=f+(Tt+1)+J*xt;c.push(Xt,ae,rt),c.push(ae,Z,rt),W+=6}o.addGroup(d,W,S),d+=W,f+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Hs(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function $e(s){let t={};for(let e=0;e<s.length;e++){let n=Hs(s[e]);for(let i in n)t[i]=n[i]}return t}function Em(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function zf(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}var Ui={clone:Hs,merge:$e},Sm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ce=class extends fi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sm,this.fragmentShader=Tm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hs(t.uniforms),this.uniformsGroups=Em(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Na=class extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new zt,this.projectionMatrix=new zt,this.projectionMatrixInverse=new zt,this.coordinateSystem=ci}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},wi=new T,Bu=new tt,Ou=new tt,ze=class extends Na{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=zs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(xr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zs*2*Math.atan(Math.tan(xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(wi.x,wi.y).multiplyScalar(-t/wi.z),wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(wi.x,wi.y).multiplyScalar(-t/wi.z)}getViewSize(t,e){return this.getViewBounds(t,Bu,Ou),e.subVectors(Ou,Bu)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(xr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,e-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ys=-90,bs=1,Sl=class extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new ze(ys,bs,t,e);i.layers=this.layers,this.add(i);let r=new ze(ys,bs,t,e);r.layers=this.layers,this.add(r);let a=new ze(ys,bs,t,e);a.layers=this.layers,this.add(a);let o=new ze(ys,bs,t,e);o.layers=this.layers,this.add(o);let c=new ze(ys,bs,t,e);c.layers=this.layers,this.add(c);let l=new ze(ys,bs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===ci)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Aa)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},ka=class extends tn{constructor(t,e,n,i,r,a,o,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Ns,super(t,e,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Tl=class extends Ze{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new ka(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Fn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ie(5,5,5),r=new Ce({name:"CubemapFromEquirect",uniforms:Hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:We,blending:Hn});r.uniforms.tEquirect.value=e;let a=new wt(i,r),o=e.minFilter;return e.minFilter===Ji&&(e.minFilter=Fn),new Sl(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}},Mc=new T,wm=new T,Am=new $t,oi=class{constructor(t=new T(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Mc.subVectors(n,e).cross(wm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Mc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Am.getNormalMatrix(t),i=this.coplanarPoint(Mc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Gi=new Li,oa=new T,Sr=class{constructor(t=new oi,e=new oi,n=new oi,i=new oi,r=new oi,a=new oi){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ci){let n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],c=i[3],l=i[4],h=i[5],u=i[6],f=i[7],d=i[8],g=i[9],x=i[10],m=i[11],p=i[12],y=i[13],_=i[14],v=i[15];if(n[0].setComponents(c-r,f-l,m-d,v-p).normalize(),n[1].setComponents(c+r,f+l,m+d,v+p).normalize(),n[2].setComponents(c+a,f+h,m+g,v+y).normalize(),n[3].setComponents(c-a,f-h,m-g,v-y).normalize(),n[4].setComponents(c-o,f-u,m-x,v-_).normalize(),e===ci)n[5].setComponents(c+o,f+u,m+x,v+_).normalize();else if(e===Aa)n[5].setComponents(o,u,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Gi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Gi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Gi)}intersectsSprite(t){return Gi.center.set(0,0,0),Gi.radius=.7071067811865476,Gi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Gi)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(oa.x=i.normal.x>0?t.max.x:t.min.x,oa.y=i.normal.y>0?t.max.y:t.min.y,oa.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(oa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Hf(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Rm(s){let t=new WeakMap;function e(o,c){let l=o.array,h=o.usage,u=l.byteLength,f=s.createBuffer();s.bindBuffer(c,f),s.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=s.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=s.SHORT;else if(l instanceof Uint32Array)d=s.UNSIGNED_INT;else if(l instanceof Int32Array)d=s.INT;else if(l instanceof Int8Array)d=s.BYTE;else if(l instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){let h=c.array,u=c.updateRanges;if(s.bindBuffer(l,o),u.length===0)s.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){let g=u[f],x=u[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){let x=u[d];s.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(s.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var en=class s extends Ae{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=t/o,f=e/c,d=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let y=p*f-a;for(let _=0;_<l;_++){let v=_*u-r;g.push(v,-y,0),x.push(0,0,1),m.push(_/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<o;y++){let _=y+l*p,v=y+l*(p+1),L=y+1+l*(p+1),R=y+1+l*p;d.push(_,v,R),d.push(v,L,R)}this.setIndex(d),this.setAttribute("position",new Kt(g,3)),this.setAttribute("normal",new Kt(x,3)),this.setAttribute("uv",new Kt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},Cm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pm=`#ifdef USE_ALPHAHASH
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
#endif`,Im=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Um=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nm=`#ifdef USE_AOMAP
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
#endif`,km=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bm=`#ifdef USE_BATCHING
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
#endif`,Om=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Vm=`#ifdef USE_IRIDESCENCE
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
#endif`,Gm=`#ifdef USE_BUMPMAP
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
#endif`,Wm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Xm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ym=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$m=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Jm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Km=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Qm=`#define PI 3.141592653589793
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
} // validated`,jm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,t0=`vec3 transformedNormal = objectNormal;
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
#endif`,e0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,n0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,i0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,s0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,r0="gl_FragColor = linearToOutputTexel( gl_FragColor );",a0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,o0=`#ifdef USE_ENVMAP
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
#endif`,c0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,l0=`#ifdef USE_ENVMAP
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
#endif`,h0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,u0=`#ifdef USE_ENVMAP
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
#endif`,f0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,d0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,p0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,m0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,g0=`#ifdef USE_GRADIENTMAP
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
}`,x0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,v0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,y0=`uniform bool receiveShadow;
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
#endif`,b0=`#ifdef USE_ENVMAP
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
#endif`,M0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,E0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,S0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,T0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,w0=`PhysicalMaterial material;
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
#endif`,A0=`struct PhysicalMaterial {
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
}`,R0=`
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
#endif`,C0=`#if defined( RE_IndirectDiffuse )
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
#endif`,P0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,I0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,L0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,D0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,U0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,N0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,k0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,B0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,O0=`#if defined( USE_POINTS_UV )
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
#endif`,F0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,z0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,H0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,V0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,G0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,W0=`#ifdef USE_MORPHTARGETS
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
#endif`,X0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,q0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Y0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Z0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,J0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,K0=`#ifdef USE_NORMALMAP
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
#endif`,Q0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,j0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,eg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ng=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ig=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ag=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,og=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ug=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,dg=`float getShadowMask() {
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
}`,pg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mg=`#ifdef USE_SKINNING
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
#endif`,gg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xg=`#ifdef USE_SKINNING
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
#endif`,vg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_g=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mg=`#ifdef USE_TRANSMISSION
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
#endif`,Eg=`#ifdef USE_TRANSMISSION
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
#endif`,Sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ag=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Rg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cg=`uniform sampler2D t2D;
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
}`,Pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ig=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ug=`#include <common>
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
}`,Ng=`#if DEPTH_PACKING == 3200
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
}`,kg=`#define DISTANCE
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
}`,Bg=`#define DISTANCE
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
}`,Og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zg=`uniform float scale;
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
}`,Hg=`uniform vec3 diffuse;
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
}`,Vg=`#include <common>
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
}`,Gg=`uniform vec3 diffuse;
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
}`,Wg=`#define LAMBERT
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
}`,Xg=`#define LAMBERT
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
}`,qg=`#define MATCAP
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
}`,Yg=`#define MATCAP
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
}`,$g=`#define NORMAL
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
}`,Zg=`#define NORMAL
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
}`,Jg=`#define PHONG
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
}`,Kg=`#define PHONG
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
}`,Qg=`#define STANDARD
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
}`,jg=`#define STANDARD
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
}`,tx=`#define TOON
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
}`,ex=`#define TOON
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
}`,nx=`uniform float size;
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
}`,ix=`uniform vec3 diffuse;
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
}`,sx=`#include <common>
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
}`,rx=`uniform vec3 color;
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
}`,ax=`uniform float rotation;
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
}`,ox=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:Cm,alphahash_pars_fragment:Pm,alphamap_fragment:Im,alphamap_pars_fragment:Lm,alphatest_fragment:Dm,alphatest_pars_fragment:Um,aomap_fragment:Nm,aomap_pars_fragment:km,batching_pars_vertex:Bm,batching_vertex:Om,begin_vertex:Fm,beginnormal_vertex:zm,bsdfs:Hm,iridescence_fragment:Vm,bumpmap_pars_fragment:Gm,clipping_planes_fragment:Wm,clipping_planes_pars_fragment:Xm,clipping_planes_pars_vertex:qm,clipping_planes_vertex:Ym,color_fragment:$m,color_pars_fragment:Zm,color_pars_vertex:Jm,color_vertex:Km,common:Qm,cube_uv_reflection_fragment:jm,defaultnormal_vertex:t0,displacementmap_pars_vertex:e0,displacementmap_vertex:n0,emissivemap_fragment:i0,emissivemap_pars_fragment:s0,colorspace_fragment:r0,colorspace_pars_fragment:a0,envmap_fragment:o0,envmap_common_pars_fragment:c0,envmap_pars_fragment:l0,envmap_pars_vertex:h0,envmap_physical_pars_fragment:b0,envmap_vertex:u0,fog_vertex:f0,fog_pars_vertex:d0,fog_fragment:p0,fog_pars_fragment:m0,gradientmap_pars_fragment:g0,lightmap_pars_fragment:x0,lights_lambert_fragment:v0,lights_lambert_pars_fragment:_0,lights_pars_begin:y0,lights_toon_fragment:M0,lights_toon_pars_fragment:E0,lights_phong_fragment:S0,lights_phong_pars_fragment:T0,lights_physical_fragment:w0,lights_physical_pars_fragment:A0,lights_fragment_begin:R0,lights_fragment_maps:C0,lights_fragment_end:P0,logdepthbuf_fragment:I0,logdepthbuf_pars_fragment:L0,logdepthbuf_pars_vertex:D0,logdepthbuf_vertex:U0,map_fragment:N0,map_pars_fragment:k0,map_particle_fragment:B0,map_particle_pars_fragment:O0,metalnessmap_fragment:F0,metalnessmap_pars_fragment:z0,morphinstance_vertex:H0,morphcolor_vertex:V0,morphnormal_vertex:G0,morphtarget_pars_vertex:W0,morphtarget_vertex:X0,normal_fragment_begin:q0,normal_fragment_maps:Y0,normal_pars_fragment:$0,normal_pars_vertex:Z0,normal_vertex:J0,normalmap_pars_fragment:K0,clearcoat_normal_fragment_begin:Q0,clearcoat_normal_fragment_maps:j0,clearcoat_pars_fragment:tg,iridescence_pars_fragment:eg,opaque_fragment:ng,packing:ig,premultiplied_alpha_fragment:sg,project_vertex:rg,dithering_fragment:ag,dithering_pars_fragment:og,roughnessmap_fragment:cg,roughnessmap_pars_fragment:lg,shadowmap_pars_fragment:hg,shadowmap_pars_vertex:ug,shadowmap_vertex:fg,shadowmask_pars_fragment:dg,skinbase_vertex:pg,skinning_pars_vertex:mg,skinning_vertex:gg,skinnormal_vertex:xg,specularmap_fragment:vg,specularmap_pars_fragment:_g,tonemapping_fragment:yg,tonemapping_pars_fragment:bg,transmission_fragment:Mg,transmission_pars_fragment:Eg,uv_pars_fragment:Sg,uv_pars_vertex:Tg,uv_vertex:wg,worldpos_vertex:Ag,background_vert:Rg,background_frag:Cg,backgroundCube_vert:Pg,backgroundCube_frag:Ig,cube_vert:Lg,cube_frag:Dg,depth_vert:Ug,depth_frag:Ng,distanceRGBA_vert:kg,distanceRGBA_frag:Bg,equirect_vert:Og,equirect_frag:Fg,linedashed_vert:zg,linedashed_frag:Hg,meshbasic_vert:Vg,meshbasic_frag:Gg,meshlambert_vert:Wg,meshlambert_frag:Xg,meshmatcap_vert:qg,meshmatcap_frag:Yg,meshnormal_vert:$g,meshnormal_frag:Zg,meshphong_vert:Jg,meshphong_frag:Kg,meshphysical_vert:Qg,meshphysical_frag:jg,meshtoon_vert:tx,meshtoon_frag:ex,points_vert:nx,points_frag:ix,shadow_vert:sx,shadow_frag:rx,sprite_vert:ax,sprite_frag:ox},ht={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},On={basic:{uniforms:$e([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:$e([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Mt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:$e([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:$e([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:$e([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new Mt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:$e([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:$e([ht.points,ht.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:$e([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:$e([ht.common,ht.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:$e([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:$e([ht.sprite,ht.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:$e([ht.common,ht.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:$e([ht.lights,ht.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};On.physical={uniforms:$e([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};var ca={r:0,b:0,g:0},Wi=new Xe,cx=new zt;function lx(s,t,e,n,i,r,a){let o=new Mt(0),c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function x(y){let _=!1,v=g(y);v===null?p(o,c):v&&v.isColor&&(p(v,1),_=!0);let L=s.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(y,_){let v=g(_);v&&(v.isCubeTexture||v.mapping===ao)?(h===void 0&&(h=new wt(new Ie(1,1,1),new Ce({name:"BackgroundCubeMaterial",uniforms:Hs(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,R,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Wi.copy(_.backgroundRotation),Wi.x*=-1,Wi.y*=-1,Wi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Wi.y*=-1,Wi.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(cx.makeRotationFromEuler(Wi)),h.material.toneMapped=jt.getTransfer(v.colorSpace)!==le,(u!==v||f!==v.version||d!==s.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,d=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new wt(new en(2,2),new Ce({name:"BackgroundMaterial",uniforms:Hs(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:Pi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=jt.getTransfer(v.colorSpace)!==le,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,u=v,f=v.version,d=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,_){y.getRGB(ca,zf(s)),n.buffers.color.setClear(ca.r,ca.g,ca.b,_,a)}return{getClearColor:function(){return o},setClearColor:function(y,_=1){o.set(y),c=_,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(o,c)},render:x,addToRenderList:m}}function hx(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null),r=i,a=!1;function o(M,I,H,B,V){let J=!1,G=u(B,H,I);r!==G&&(r=G,l(r.object)),J=d(M,B,H,V),J&&g(M,B,H,V),V!==null&&t.update(V,s.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,v(M,I,H,B),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return s.createVertexArray()}function l(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,I,H){let B=H.wireframe===!0,V=n[M.id];V===void 0&&(V={},n[M.id]=V);let J=V[I.id];J===void 0&&(J={},V[I.id]=J);let G=J[B];return G===void 0&&(G=f(c()),J[B]=G),G}function f(M){let I=[],H=[],B=[];for(let V=0;V<e;V++)I[V]=0,H[V]=0,B[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:H,attributeDivisors:B,object:M,attributes:{},index:null}}function d(M,I,H,B){let V=r.attributes,J=I.attributes,G=0,nt=H.getAttributes();for(let W in nt)if(nt[W].location>=0){let xt=V[W],Tt=J[W];if(Tt===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(Tt=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(Tt=M.instanceColor)),xt===void 0||xt.attribute!==Tt||Tt&&xt.data!==Tt.data)return!0;G++}return r.attributesNum!==G||r.index!==B}function g(M,I,H,B){let V={},J=I.attributes,G=0,nt=H.getAttributes();for(let W in nt)if(nt[W].location>=0){let xt=J[W];xt===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(xt=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(xt=M.instanceColor));let Tt={};Tt.attribute=xt,xt&&xt.data&&(Tt.data=xt.data),V[W]=Tt,G++}r.attributes=V,r.attributesNum=G,r.index=B}function x(){let M=r.newAttributes;for(let I=0,H=M.length;I<H;I++)M[I]=0}function m(M){p(M,0)}function p(M,I){let H=r.newAttributes,B=r.enabledAttributes,V=r.attributeDivisors;H[M]=1,B[M]===0&&(s.enableVertexAttribArray(M),B[M]=1),V[M]!==I&&(s.vertexAttribDivisor(M,I),V[M]=I)}function y(){let M=r.newAttributes,I=r.enabledAttributes;for(let H=0,B=I.length;H<B;H++)I[H]!==M[H]&&(s.disableVertexAttribArray(H),I[H]=0)}function _(M,I,H,B,V,J,G){G===!0?s.vertexAttribIPointer(M,I,H,V,J):s.vertexAttribPointer(M,I,H,B,V,J)}function v(M,I,H,B){x();let V=B.attributes,J=H.getAttributes(),G=I.defaultAttributeValues;for(let nt in J){let W=J[nt];if(W.location>=0){let lt=V[nt];if(lt===void 0&&(nt==="instanceMatrix"&&M.instanceMatrix&&(lt=M.instanceMatrix),nt==="instanceColor"&&M.instanceColor&&(lt=M.instanceColor)),lt!==void 0){let xt=lt.normalized,Tt=lt.itemSize,Xt=t.get(lt);if(Xt===void 0)continue;let ae=Xt.buffer,Z=Xt.type,rt=Xt.bytesPerElement,At=Z===s.INT||Z===s.UNSIGNED_INT||lt.gpuType===gh;if(lt.isInterleavedBufferAttribute){let ot=lt.data,kt=ot.stride,Vt=lt.offset;if(ot.isInstancedInterleavedBuffer){for(let Ft=0;Ft<W.locationSize;Ft++)p(W.location+Ft,ot.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Ft=0;Ft<W.locationSize;Ft++)m(W.location+Ft);s.bindBuffer(s.ARRAY_BUFFER,ae);for(let Ft=0;Ft<W.locationSize;Ft++)_(W.location+Ft,Tt/W.locationSize,Z,xt,kt*rt,(Vt+Tt/W.locationSize*Ft)*rt,At)}else{if(lt.isInstancedBufferAttribute){for(let ot=0;ot<W.locationSize;ot++)p(W.location+ot,lt.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let ot=0;ot<W.locationSize;ot++)m(W.location+ot);s.bindBuffer(s.ARRAY_BUFFER,ae);for(let ot=0;ot<W.locationSize;ot++)_(W.location+ot,Tt/W.locationSize,Z,xt,Tt*rt,Tt/W.locationSize*ot*rt,At)}}else if(G!==void 0){let xt=G[nt];if(xt!==void 0)switch(xt.length){case 2:s.vertexAttrib2fv(W.location,xt);break;case 3:s.vertexAttrib3fv(W.location,xt);break;case 4:s.vertexAttrib4fv(W.location,xt);break;default:s.vertexAttrib1fv(W.location,xt)}}}}y()}function L(){A();for(let M in n){let I=n[M];for(let H in I){let B=I[H];for(let V in B)h(B[V].object),delete B[V];delete I[H]}delete n[M]}}function R(M){if(n[M.id]===void 0)return;let I=n[M.id];for(let H in I){let B=I[H];for(let V in B)h(B[V].object),delete B[V];delete I[H]}delete n[M.id]}function C(M){for(let I in n){let H=n[I];if(H[M.id]===void 0)continue;let B=H[M.id];for(let V in B)h(B[V].object),delete B[V];delete H[M.id]}}function A(){S(),a=!0,r!==i&&(r=i,l(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:A,resetDefaultState:S,dispose:L,releaseStatesOfGeometry:R,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function ux(s,t,e){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function o(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)a(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*f[x];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function fx(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==An&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let A=C===In&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==hi&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==zn&&!A)}function c(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),_=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:v,vertexTextures:L,maxSamples:R}}function dx(s){let t=this,e=null,n=0,i=!1,r=!1,a=new oi,o=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{let y=r?0:n,_=y*4,v=p.clippingState||null;c.value=v,v=h(g,f,_,d);for(let L=0;L!==_;++L)v[L]=e[L];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let p=d+x*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,v=d;_!==x;++_,v+=4)a.copy(u[_]).applyMatrix4(y,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function px(s){let t=new WeakMap;function e(a,o){return o===Wc?a.mapping=Ns:o===Xc&&(a.mapping=ks),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Wc||o===Xc)if(t.has(a)){let c=t.get(a).texture;return e(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new Tl(c.height);return l.fromEquirectangularTexture(s,a),t.set(a,l),a.addEventListener("dispose",i),e(l.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Vs=class extends Na{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,a=n+t,o=i+e,c=i-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Rs=4,Fu=[.125,.215,.35,.446,.526,.582],$i=20,Ec=new Vs,zu=new Mt,Sc=null,Tc=0,wc=0,Ac=!1,qi=(1+Math.sqrt(5))/2,Ms=1/qi,Hu=[new T(-qi,Ms,0),new T(qi,Ms,0),new T(-Ms,0,qi),new T(Ms,0,qi),new T(0,qi,-Ms),new T(0,qi,Ms),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)],Ba=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Sc=this._renderer.getRenderTarget(),Tc=this._renderer.getActiveCubeFace(),wc=this._renderer.getActiveMipmapLevel(),Ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Sc,Tc,wc),this._renderer.xr.enabled=Ac,t.scissorTest=!1,la(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ns||t.mapping===ks?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Sc=this._renderer.getRenderTarget(),Tc=this._renderer.getActiveCubeFace(),wc=this._renderer.getActiveMipmapLevel(),Ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Fn,minFilter:Fn,generateMipmaps:!1,type:In,format:An,colorSpace:qs,depthBuffer:!1},i=Vu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vu(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=mx(r)),this._blurMaterial=gx(r,t,e)}return i}_compileMaterial(t){let e=new wt(this._lodPlanes[0],t);this._renderer.compile(e,Ec)}_sceneToCubeUV(t,e,n,i){let o=new ze(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(zu),h.toneMapping=Ci,h.autoClear=!1;let d=new de({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1}),g=new wt(new Ie,d),x=!1,m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,x=!0):(d.color.copy(zu),x=!0);for(let p=0;p<6;p++){let y=p%3;y===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):y===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));let _=this._cubeSize;la(i,y*_,p>2?_:0,_,_),h.setRenderTarget(i),x&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Ns||t.mapping===ks;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gu());let r=i?this._cubemapMaterial:this._equirectMaterial,a=new wt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;la(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Ec)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Hu[(i-r-1)%Hu.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new wt(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*$i-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):$i;m>$i&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${$i}`);let p=[],y=0;for(let C=0;C<$i;++C){let A=C/x,S=Math.exp(-A*A/2);p.push(S),C===0?y+=S:C<m&&(y+=2*S)}for(let C=0;C<p.length;C++)p[C]=p[C]/y;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-n;let v=this._sizeLods[i],L=3*v*(i>_-Rs?i-_+Rs:0),R=4*(this._cubeSize-v);la(e,L,R,3*v,2*v),c.setRenderTarget(e),c.render(u,Ec)}};function mx(s){let t=[],e=[],n=[],i=s,r=s-Rs+1+Fu.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);e.push(o);let c=1/o;a>s-Rs?c=Fu[a-s+Rs-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,x=3,m=2,p=1,y=new Float32Array(x*g*d),_=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let R=0;R<d;R++){let C=R%3*2/3-1,A=R>2?0:-1,S=[C,A,0,C+2/3,A,0,C+2/3,A+1,0,C,A,0,C+2/3,A+1,0,C,A+1,0];y.set(S,x*g*R),_.set(f,m*g*R);let M=[R,R,R,R,R,R];v.set(M,p*g*R)}let L=new Ae;L.setAttribute("position",new Be(y,x)),L.setAttribute("uv",new Be(_,m)),L.setAttribute("faceIndex",new Be(v,p)),t.push(L),i>Rs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Vu(s,t,e){let n=new Ze(s,t,e);return n.texture.mapping=ao,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function la(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function gx(s,t,e){let n=new Float32Array($i),i=new T(0,1,0);return new Ce({name:"SphericalGaussianBlur",defines:{n:$i,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Sh(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Gu(){return new Ce({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sh(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Wu(){return new Ce({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Sh(){return`

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
	`}function xx(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===Wc||c===Xc,h=c===Ns||c===ks;if(l||h){let u=t.get(o),f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Ba(s)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{let d=o.image;return l&&d&&d.height>0||h&&d&&i(d)?(e===null&&(e=new Ba(s)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function vx(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&mr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function _x(s,t,e,n){let i={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);for(let g in f.morphAttributes){let x=f.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)t.remove(x[m])}f.removeEventListener("dispose",a),delete i[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let g in f)t.update(f[g],s.ARRAY_BUFFER);let d=u.morphAttributes;for(let g in d){let x=d[g];for(let m=0,p=x.length;m<p;m++)t.update(x[m],s.ARRAY_BUFFER)}}function l(u){let f=[],d=u.index,g=u.attributes.position,x=0;if(d!==null){let y=d.array;x=d.version;for(let _=0,v=y.length;_<v;_+=3){let L=y[_+0],R=y[_+1],C=y[_+2];f.push(L,R,R,C,C,L)}}else if(g!==void 0){let y=g.array;x=g.version;for(let _=0,v=y.length/3-1;_<v;_+=3){let L=_+0,R=_+1,C=_+2;f.push(L,R,R,C,C,L)}}else return;let m=new(Of(f)?Ua:Da)(f,1);m.version=x;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function yx(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,d){s.drawElements(n,d,r,f*a),e.update(d,n,1)}function l(f,d,g){g!==0&&(s.drawElementsInstanced(n,d,r,f*a,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/a,d[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,g);let p=0;for(let y=0;y<g;y++)p+=d[y]*x[y];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function bx(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Mx(s,t,e){let n=new WeakMap,i=new pe;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(o);if(f===void 0||f.count!==u){let S=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],_=0;d===!0&&(_=1),g===!0&&(_=2),x===!0&&(_=3);let v=o.attributes.position.count*_,L=1;v>t.maxTextureSize&&(L=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let R=new Float32Array(v*L*4*u),C=new Pa(R,v,L,u);C.type=zn,C.needsUpdate=!0;let A=_*4;for(let M=0;M<u;M++){let I=m[M],H=p[M],B=y[M],V=v*L*4*M;for(let J=0;J<I.count;J++){let G=J*A;d===!0&&(i.fromBufferAttribute(I,J),R[V+G+0]=i.x,R[V+G+1]=i.y,R[V+G+2]=i.z,R[V+G+3]=0),g===!0&&(i.fromBufferAttribute(H,J),R[V+G+4]=i.x,R[V+G+5]=i.y,R[V+G+6]=i.z,R[V+G+7]=0),x===!0&&(i.fromBufferAttribute(B,J),R[V+G+8]=i.x,R[V+G+9]=i.y,R[V+G+10]=i.z,R[V+G+11]=B.itemSize===4?i.w:1)}}f={count:u,texture:C,size:new tt(v,L)},n.set(o,f),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];let g=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Ex(s,t,e,n){let i=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return u}function a(){i=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}var Oa=class extends tn{constructor(t,e,n,i,r,a,o,c,l,h=Is){if(h!==Is&&h!==Fs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Is&&(n=Ki),n===void 0&&h===Fs&&(n=Os),super(null,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:un,this.minFilter=c!==void 0?c:un,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Vf=new tn,Xu=new Oa(1,1),Gf=new Pa,Wf=new El,Xf=new ka,qu=[],Yu=[],$u=new Float32Array(16),Zu=new Float32Array(9),Ju=new Float32Array(4);function $s(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=qu[i];if(r===void 0&&(r=new Float32Array(i),qu[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Ue(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ne(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function co(s,t){let e=Yu[t];e===void 0&&(e=new Int32Array(t),Yu[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Sx(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Tx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;s.uniform2fv(this.addr,t),Ne(e,t)}}function wx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ue(e,t))return;s.uniform3fv(this.addr,t),Ne(e,t)}}function Ax(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;s.uniform4fv(this.addr,t),Ne(e,t)}}function Rx(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ne(e,t)}else{if(Ue(e,n))return;Ju.set(n),s.uniformMatrix2fv(this.addr,!1,Ju),Ne(e,n)}}function Cx(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ne(e,t)}else{if(Ue(e,n))return;Zu.set(n),s.uniformMatrix3fv(this.addr,!1,Zu),Ne(e,n)}}function Px(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ne(e,t)}else{if(Ue(e,n))return;$u.set(n),s.uniformMatrix4fv(this.addr,!1,$u),Ne(e,n)}}function Ix(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Lx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;s.uniform2iv(this.addr,t),Ne(e,t)}}function Dx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;s.uniform3iv(this.addr,t),Ne(e,t)}}function Ux(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;s.uniform4iv(this.addr,t),Ne(e,t)}}function Nx(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function kx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;s.uniform2uiv(this.addr,t),Ne(e,t)}}function Bx(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;s.uniform3uiv(this.addr,t),Ne(e,t)}}function Ox(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;s.uniform4uiv(this.addr,t),Ne(e,t)}}function Fx(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Xu.compareFunction=Bf,r=Xu):r=Vf,e.setTexture2D(t||r,i)}function zx(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Wf,i)}function Hx(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Xf,i)}function Vx(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Gf,i)}function Gx(s){switch(s){case 5126:return Sx;case 35664:return Tx;case 35665:return wx;case 35666:return Ax;case 35674:return Rx;case 35675:return Cx;case 35676:return Px;case 5124:case 35670:return Ix;case 35667:case 35671:return Lx;case 35668:case 35672:return Dx;case 35669:case 35673:return Ux;case 5125:return Nx;case 36294:return kx;case 36295:return Bx;case 36296:return Ox;case 35678:case 36198:case 36298:case 36306:case 35682:return Fx;case 35679:case 36299:case 36307:return zx;case 35680:case 36300:case 36308:case 36293:return Hx;case 36289:case 36303:case 36311:case 36292:return Vx}}function Wx(s,t){s.uniform1fv(this.addr,t)}function Xx(s,t){let e=$s(t,this.size,2);s.uniform2fv(this.addr,e)}function qx(s,t){let e=$s(t,this.size,3);s.uniform3fv(this.addr,e)}function Yx(s,t){let e=$s(t,this.size,4);s.uniform4fv(this.addr,e)}function $x(s,t){let e=$s(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Zx(s,t){let e=$s(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Jx(s,t){let e=$s(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Kx(s,t){s.uniform1iv(this.addr,t)}function Qx(s,t){s.uniform2iv(this.addr,t)}function jx(s,t){s.uniform3iv(this.addr,t)}function tv(s,t){s.uniform4iv(this.addr,t)}function ev(s,t){s.uniform1uiv(this.addr,t)}function nv(s,t){s.uniform2uiv(this.addr,t)}function iv(s,t){s.uniform3uiv(this.addr,t)}function sv(s,t){s.uniform4uiv(this.addr,t)}function rv(s,t,e){let n=this.cache,i=t.length,r=co(e,i);Ue(n,r)||(s.uniform1iv(this.addr,r),Ne(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Vf,r[a])}function av(s,t,e){let n=this.cache,i=t.length,r=co(e,i);Ue(n,r)||(s.uniform1iv(this.addr,r),Ne(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Wf,r[a])}function ov(s,t,e){let n=this.cache,i=t.length,r=co(e,i);Ue(n,r)||(s.uniform1iv(this.addr,r),Ne(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Xf,r[a])}function cv(s,t,e){let n=this.cache,i=t.length,r=co(e,i);Ue(n,r)||(s.uniform1iv(this.addr,r),Ne(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Gf,r[a])}function lv(s){switch(s){case 5126:return Wx;case 35664:return Xx;case 35665:return qx;case 35666:return Yx;case 35674:return $x;case 35675:return Zx;case 35676:return Jx;case 5124:case 35670:return Kx;case 35667:case 35671:return Qx;case 35668:case 35672:return jx;case 35669:case 35673:return tv;case 5125:return ev;case 36294:return nv;case 36295:return iv;case 36296:return sv;case 35678:case 36198:case 36298:case 36306:case 35682:return rv;case 35679:case 36299:case 36307:return av;case 35680:case 36300:case 36308:case 36293:return ov;case 36289:case 36303:case 36311:case 36292:return cv}}var wl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Gx(e.type)}},Al=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=lv(e.type)}},Rl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(t,e[o.id],n)}}},Rc=/(\w+)(\])?(\[|\.)?/g;function Ku(s,t){s.seq.push(t),s.map[t.id]=t}function hv(s,t,e){let n=s.name,i=n.length;for(Rc.lastIndex=0;;){let r=Rc.exec(n),a=Rc.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Ku(e,l===void 0?new wl(o,s,t):new Al(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new Rl(o),Ku(e,u)),e=u}}}var Ds=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);hv(r,a,this)}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function Qu(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var uv=37297,fv=0;function dv(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var ju=new $t;function pv(s){jt._getMatrix(ju,jt.workingColorSpace,s);let t=`mat3( ${ju.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(s)){case oo:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function tf(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+dv(s.getShaderSource(t),a)}else return i}function mv(s,t){let e=pv(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function gv(s,t){let e;switch(t){case uh:e="Linear";break;case fh:e="Reinhard";break;case dh:e="Cineon";break;case Dr:e="ACESFilmic";break;case ph:e="AgX";break;case mh:e="Neutral";break;case Dp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var ha=new T;function xv(){jt.getLuminanceCoefficients(ha);let s=ha.x.toFixed(4),t=ha.y.toFixed(4),e=ha.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gr).join(`
`)}function _v(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function yv(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function gr(s){return s!==""}function ef(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function nf(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var bv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cl(s){return s.replace(bv,Ev)}var Mv=new Map;function Ev(s,t){let e=Jt[t];if(e===void 0){let n=Mv.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Cl(e)}var Sv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sf(s){return s.replace(Sv,Tv)}function Tv(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function rf(s){let t=`precision ${s.precision} float;
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
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function wv(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Sf?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===hh?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ai&&(t="SHADOWMAP_TYPE_VSM"),t}function Av(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ns:case ks:t="ENVMAP_TYPE_CUBE";break;case ao:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Rv(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ks:t="ENVMAP_MODE_REFRACTION";break}return t}function Cv(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Tf:t="ENVMAP_BLENDING_MULTIPLY";break;case Ip:t="ENVMAP_BLENDING_MIX";break;case Lp:t="ENVMAP_BLENDING_ADD";break}return t}function Pv(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Iv(s,t,e,n){let i=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=wv(e),l=Av(e),h=Rv(e),u=Cv(e),f=Pv(e),d=vv(e),g=_v(r),x=i.createProgram(),m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(gr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(gr).join(`
`),p.length>0&&(p+=`
`)):(m=[rf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gr).join(`
`),p=[rf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ci?"#define TONE_MAPPING":"",e.toneMapping!==Ci?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Ci?gv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,mv("linearToOutputTexel",e.outputColorSpace),xv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(gr).join(`
`)),a=Cl(a),a=ef(a,e),a=nf(a,e),o=Cl(o),o=ef(o,e),o=nf(o,e),a=sf(a),o=sf(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===xu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===xu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let _=y+m+a,v=y+p+o,L=Qu(i,i.VERTEX_SHADER,_),R=Qu(i,i.FRAGMENT_SHADER,v);i.attachShader(x,L),i.attachShader(x,R),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function C(I){if(s.debug.checkShaderErrors){let H=i.getProgramInfoLog(x).trim(),B=i.getShaderInfoLog(L).trim(),V=i.getShaderInfoLog(R).trim(),J=!0,G=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(J=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,L,R);else{let nt=tf(i,L,"vertex"),W=tf(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+H+`
`+nt+`
`+W)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(B===""||V==="")&&(G=!1);G&&(I.diagnostics={runnable:J,programLog:H,vertexShader:{log:B,prefix:m},fragmentShader:{log:V,prefix:p}})}i.deleteShader(L),i.deleteShader(R),A=new Ds(i,x),S=yv(i,x)}let A;this.getUniforms=function(){return A===void 0&&C(this),A};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(x,uv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=fv++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=L,this.fragmentShader=R,this}var Lv=0,Pl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Il(t),e.set(t,n)),n}},Il=class{constructor(t){this.id=Lv++,this.code=t,this.usedTimes=0}};function Dv(s,t,e,n,i,r,a){let o=new La,c=new Pl,l=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures,d=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,M,I,H,B){let V=H.fog,J=B.geometry,G=S.isMeshStandardMaterial?H.environment:null,nt=(S.isMeshStandardMaterial?e:t).get(S.envMap||G),W=nt&&nt.mapping===ao?nt.image.height:null,lt=g[S.type];S.precision!==null&&(d=i.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));let xt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Tt=xt!==void 0?xt.length:0,Xt=0;J.morphAttributes.position!==void 0&&(Xt=1),J.morphAttributes.normal!==void 0&&(Xt=2),J.morphAttributes.color!==void 0&&(Xt=3);let ae,Z,rt,At;if(lt){let ue=On[lt];ae=ue.vertexShader,Z=ue.fragmentShader}else ae=S.vertexShader,Z=S.fragmentShader,c.update(S),rt=c.getVertexShaderID(S),At=c.getFragmentShaderID(S);let ot=s.getRenderTarget(),kt=s.state.buffers.depth.getReversed(),Vt=B.isInstancedMesh===!0,Ft=B.isBatchedMesh===!0,ee=!!S.map,Q=!!S.matcap,st=!!nt,P=!!S.aoMap,Lt=!!S.lightMap,et=!!S.bumpMap,bt=!!S.normalMap,ct=!!S.displacementMap,Bt=!!S.emissiveMap,_t=!!S.metalnessMap,w=!!S.roughnessMap,b=S.anisotropy>0,k=S.clearcoat>0,Y=S.dispersion>0,j=S.iridescence>0,$=S.sheen>0,Rt=S.transmission>0,ft=b&&!!S.anisotropyMap,yt=k&&!!S.clearcoatMap,Qt=k&&!!S.clearcoatNormalMap,it=k&&!!S.clearcoatRoughnessMap,Et=j&&!!S.iridescenceMap,Ot=j&&!!S.iridescenceThicknessMap,Ht=$&&!!S.sheenColorMap,St=$&&!!S.sheenRoughnessMap,te=!!S.specularMap,Zt=!!S.specularColorMap,ve=!!S.specularIntensityMap,D=Rt&&!!S.transmissionMap,dt=Rt&&!!S.thicknessMap,q=!!S.gradientMap,K=!!S.alphaMap,gt=S.alphaTest>0,pt=!!S.alphaHash,qt=!!S.extensions,Re=Ci;S.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(Re=s.toneMapping);let He={shaderID:lt,shaderType:S.type,shaderName:S.name,vertexShader:ae,fragmentShader:Z,defines:S.defines,customVertexShaderID:rt,customFragmentShaderID:At,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:Ft,batchingColor:Ft&&B._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&B.instanceColor!==null,instancingMorph:Vt&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ot===null?s.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:qs,alphaToCoverage:!!S.alphaToCoverage,map:ee,matcap:Q,envMap:st,envMapMode:st&&nt.mapping,envMapCubeUVHeight:W,aoMap:P,lightMap:Lt,bumpMap:et,normalMap:bt,displacementMap:f&&ct,emissiveMap:Bt,normalMapObjectSpace:bt&&S.normalMapType===Bp,normalMapTangentSpace:bt&&S.normalMapType===kf,metalnessMap:_t,roughnessMap:w,anisotropy:b,anisotropyMap:ft,clearcoat:k,clearcoatMap:yt,clearcoatNormalMap:Qt,clearcoatRoughnessMap:it,dispersion:Y,iridescence:j,iridescenceMap:Et,iridescenceThicknessMap:Ot,sheen:$,sheenColorMap:Ht,sheenRoughnessMap:St,specularMap:te,specularColorMap:Zt,specularIntensityMap:ve,transmission:Rt,transmissionMap:D,thicknessMap:dt,gradientMap:q,opaque:S.transparent===!1&&S.blending===Ps&&S.alphaToCoverage===!1,alphaMap:K,alphaTest:gt,alphaHash:pt,combine:S.combine,mapUv:ee&&x(S.map.channel),aoMapUv:P&&x(S.aoMap.channel),lightMapUv:Lt&&x(S.lightMap.channel),bumpMapUv:et&&x(S.bumpMap.channel),normalMapUv:bt&&x(S.normalMap.channel),displacementMapUv:ct&&x(S.displacementMap.channel),emissiveMapUv:Bt&&x(S.emissiveMap.channel),metalnessMapUv:_t&&x(S.metalnessMap.channel),roughnessMapUv:w&&x(S.roughnessMap.channel),anisotropyMapUv:ft&&x(S.anisotropyMap.channel),clearcoatMapUv:yt&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:Qt&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ot&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:St&&x(S.sheenRoughnessMap.channel),specularMapUv:te&&x(S.specularMap.channel),specularColorMapUv:Zt&&x(S.specularColorMap.channel),specularIntensityMapUv:ve&&x(S.specularIntensityMap.channel),transmissionMapUv:D&&x(S.transmissionMap.channel),thicknessMapUv:dt&&x(S.thicknessMap.channel),alphaMapUv:K&&x(S.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(bt||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!J.attributes.uv&&(ee||K),fog:!!V,useFog:S.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:kt,skinning:B.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:Tt,morphTextureStride:Xt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:Re,decodeVideoTexture:ee&&S.map.isVideoTexture===!0&&jt.getTransfer(S.map.colorSpace)===le,decodeVideoTextureEmissive:Bt&&S.emissiveMap.isVideoTexture===!0&&jt.getTransfer(S.emissiveMap.colorSpace)===le,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Te,flipSided:S.side===We,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:qt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qt&&S.extensions.multiDraw===!0||Ft)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return He.vertexUv1s=l.has(1),He.vertexUv2s=l.has(2),He.vertexUv3s=l.has(3),l.clear(),He}function p(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let I in S.defines)M.push(I),M.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(y(M,S),_(M,S),M.push(s.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function y(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function _(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),S.push(o.mask)}function v(S){let M=g[S.type],I;if(M){let H=On[M];I=Ui.clone(H.uniforms)}else I=S.uniforms;return I}function L(S,M){let I;for(let H=0,B=h.length;H<B;H++){let V=h[H];if(V.cacheKey===M){I=V,++I.usedTimes;break}}return I===void 0&&(I=new Iv(s,M,S,r),h.push(I)),I}function R(S){if(--S.usedTimes===0){let M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function C(S){c.remove(S)}function A(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:L,releaseProgram:R,releaseShaderCache:C,programs:h,dispose:A}}function Uv(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Nv(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function af(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function of(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,f,d,g,x,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),t++,p}function o(u,f,d,g,x,m){let p=a(u,f,d,g,x,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):e.push(p)}function c(u,f,d,g,x,m){let p=a(u,f,d,g,x,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||Nv),n.length>1&&n.sort(f||af),i.length>1&&i.sort(f||af)}function h(){for(let u=t,f=s.length;u<f;u++){let d=s[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:h,sort:l}}function kv(){let s=new WeakMap;function t(n,i){let r=s.get(n),a;return r===void 0?(a=new of,s.set(n,[a])):i>=r.length?(a=new of,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Bv(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new T,color:new Mt};break;case"SpotLight":e={position:new T,direction:new T,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new T,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new T,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":e={color:new Mt,position:new T,halfWidth:new T,halfHeight:new T};break}return s[t.id]=e,e}}}function Ov(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var Fv=0;function zv(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Hv(s){let t=new Bv,e=Ov(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new T);let i=new T,r=new zt,a=new zt;function o(l){let h=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,g=0,x=0,m=0,p=0,y=0,_=0,v=0,L=0,R=0,C=0;l.sort(zv);for(let S=0,M=l.length;S<M;S++){let I=l[S],H=I.color,B=I.intensity,V=I.distance,J=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=H.r*B,u+=H.g*B,f+=H.b*B;else if(I.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(I.sh.coefficients[G],B);C++}else if(I.isDirectionalLight){let G=t.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let nt=I.shadow,W=e.get(I);W.shadowIntensity=nt.intensity,W.shadowBias=nt.bias,W.shadowNormalBias=nt.normalBias,W.shadowRadius=nt.radius,W.shadowMapSize=nt.mapSize,n.directionalShadow[d]=W,n.directionalShadowMap[d]=J,n.directionalShadowMatrix[d]=I.shadow.matrix,y++}n.directional[d]=G,d++}else if(I.isSpotLight){let G=t.get(I);G.position.setFromMatrixPosition(I.matrixWorld),G.color.copy(H).multiplyScalar(B),G.distance=V,G.coneCos=Math.cos(I.angle),G.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),G.decay=I.decay,n.spot[x]=G;let nt=I.shadow;if(I.map&&(n.spotLightMap[L]=I.map,L++,nt.updateMatrices(I),I.castShadow&&R++),n.spotLightMatrix[x]=nt.matrix,I.castShadow){let W=e.get(I);W.shadowIntensity=nt.intensity,W.shadowBias=nt.bias,W.shadowNormalBias=nt.normalBias,W.shadowRadius=nt.radius,W.shadowMapSize=nt.mapSize,n.spotShadow[x]=W,n.spotShadowMap[x]=J,v++}x++}else if(I.isRectAreaLight){let G=t.get(I);G.color.copy(H).multiplyScalar(B),G.halfWidth.set(I.width*.5,0,0),G.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=G,m++}else if(I.isPointLight){let G=t.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),G.distance=I.distance,G.decay=I.decay,I.castShadow){let nt=I.shadow,W=e.get(I);W.shadowIntensity=nt.intensity,W.shadowBias=nt.bias,W.shadowNormalBias=nt.normalBias,W.shadowRadius=nt.radius,W.shadowMapSize=nt.mapSize,W.shadowCameraNear=nt.camera.near,W.shadowCameraFar=nt.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=J,n.pointShadowMatrix[g]=I.shadow.matrix,_++}n.point[g]=G,g++}else if(I.isHemisphereLight){let G=t.get(I);G.skyColor.copy(I.color).multiplyScalar(B),G.groundColor.copy(I.groundColor).multiplyScalar(B),n.hemi[p]=G,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let A=n.hash;(A.directionalLength!==d||A.pointLength!==g||A.spotLength!==x||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==y||A.numPointShadows!==_||A.numSpotShadows!==v||A.numSpotMaps!==L||A.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=v+L-R,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=C,A.directionalLength=d,A.pointLength=g,A.spotLength=x,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=y,A.numPointShadows=_,A.numSpotShadows=v,A.numSpotMaps=L,A.numLightProbes=C,n.version=Fv++)}function c(l,h){let u=0,f=0,d=0,g=0,x=0,m=h.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){let _=l[p];if(_.isDirectionalLight){let v=n.directional[u];v.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),u++}else if(_.isSpotLight){let v=n.spot[d];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(_.isRectAreaLight){let v=n.rectArea[g];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(_.width*.5,0,0),v.halfHeight.set(0,_.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(_.isPointLight){let v=n.point[f];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){let v=n.hemi[x];v.direction.setFromMatrixPosition(_.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:n}}function cf(s){let t=new Hv(s),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Vv(s){let t=new WeakMap;function e(i,r=0){let a=t.get(i),o;return a===void 0?(o=new cf(s),t.set(i,[o])):r>=a.length?(o=new cf(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Ll=class extends fi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Np,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Dl=class extends fi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Gv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Wv=`uniform sampler2D shadow_pass;
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
}`;function Xv(s,t,e){let n=new Sr,i=new tt,r=new tt,a=new pe,o=new Ll({depthPacking:kp}),c=new Dl,l={},h=e.maxTextureSize,u={[Pi]:We,[We]:Pi,[Te]:Te},f=new Ce({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new tt},radius:{value:4}},vertexShader:Gv,fragmentShader:Wv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new Ae;g.setAttribute("position",new Be(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new wt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sf;let p=this.type;this.render=function(R,C,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;let S=s.getRenderTarget(),M=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),H=s.state;H.setBlending(Hn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let B=p!==ai&&this.type===ai,V=p===ai&&this.type!==ai;for(let J=0,G=R.length;J<G;J++){let nt=R[J],W=nt.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);let lt=W.getFrameExtents();if(i.multiply(lt),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/lt.x),i.x=r.x*lt.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/lt.y),i.y=r.y*lt.y,W.mapSize.y=r.y)),W.map===null||B===!0||V===!0){let Tt=this.type!==ai?{minFilter:un,magFilter:un}:{};W.map!==null&&W.map.dispose(),W.map=new Ze(i.x,i.y,Tt),W.map.texture.name=nt.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();let xt=W.getViewportCount();for(let Tt=0;Tt<xt;Tt++){let Xt=W.getViewport(Tt);a.set(r.x*Xt.x,r.y*Xt.y,r.x*Xt.z,r.y*Xt.w),H.viewport(a),W.updateMatrices(nt,Tt),n=W.getFrustum(),v(C,A,W.camera,nt,this.type)}W.isPointLightShadow!==!0&&this.type===ai&&y(W,A),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(S,M,I)};function y(R,C){let A=t.update(x);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Ze(i.x,i.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(C,null,A,f,x,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(C,null,A,d,x,null)}function _(R,C,A,S){let M=null,I=A.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(I!==void 0)M=I;else if(M=A.isPointLight===!0?c:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let H=M.uuid,B=C.uuid,V=l[H];V===void 0&&(V={},l[H]=V);let J=V[B];J===void 0&&(J=M.clone(),V[B]=J,C.addEventListener("dispose",L)),M=J}if(M.visible=C.visible,M.wireframe=C.wireframe,S===ai?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:u[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,A.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let H=s.properties.get(M);H.light=A}return M}function v(R,C,A,S,M){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===ai)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,R.matrixWorld);let B=t.update(R),V=R.material;if(Array.isArray(V)){let J=B.groups;for(let G=0,nt=J.length;G<nt;G++){let W=J[G],lt=V[W.materialIndex];if(lt&&lt.visible){let xt=_(R,lt,S,M);R.onBeforeShadow(s,R,C,A,B,xt,W),s.renderBufferDirect(A,null,B,xt,R,W),R.onAfterShadow(s,R,C,A,B,xt,W)}}}else if(V.visible){let J=_(R,V,S,M);R.onBeforeShadow(s,R,C,A,B,J,null),s.renderBufferDirect(A,null,B,J,R,null),R.onAfterShadow(s,R,C,A,B,J,null)}}let H=R.children;for(let B=0,V=H.length;B<V;B++)v(H[B],C,A,S,M)}function L(R){R.target.removeEventListener("dispose",L);for(let A in l){let S=l[A],M=R.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}var qv={[Bc]:Oc,[Fc]:Vc,[zc]:Gc,[Us]:Hc,[Oc]:Bc,[Vc]:Fc,[Gc]:zc,[Hc]:Us};function Yv(s,t){function e(){let D=!1,dt=new pe,q=null,K=new pe(0,0,0,0);return{setMask:function(gt){q!==gt&&!D&&(s.colorMask(gt,gt,gt,gt),q=gt)},setLocked:function(gt){D=gt},setClear:function(gt,pt,qt,Re,He){He===!0&&(gt*=Re,pt*=Re,qt*=Re),dt.set(gt,pt,qt,Re),K.equals(dt)===!1&&(s.clearColor(gt,pt,qt,Re),K.copy(dt))},reset:function(){D=!1,q=null,K.set(-1,0,0,0)}}}function n(){let D=!1,dt=!1,q=null,K=null,gt=null;return{setReversed:function(pt){if(dt!==pt){let qt=t.get("EXT_clip_control");dt?qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.ZERO_TO_ONE_EXT):qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.NEGATIVE_ONE_TO_ONE_EXT);let Re=gt;gt=null,this.setClear(Re)}dt=pt},getReversed:function(){return dt},setTest:function(pt){pt?ot(s.DEPTH_TEST):kt(s.DEPTH_TEST)},setMask:function(pt){q!==pt&&!D&&(s.depthMask(pt),q=pt)},setFunc:function(pt){if(dt&&(pt=qv[pt]),K!==pt){switch(pt){case Bc:s.depthFunc(s.NEVER);break;case Oc:s.depthFunc(s.ALWAYS);break;case Fc:s.depthFunc(s.LESS);break;case Us:s.depthFunc(s.LEQUAL);break;case zc:s.depthFunc(s.EQUAL);break;case Hc:s.depthFunc(s.GEQUAL);break;case Vc:s.depthFunc(s.GREATER);break;case Gc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}K=pt}},setLocked:function(pt){D=pt},setClear:function(pt){gt!==pt&&(dt&&(pt=1-pt),s.clearDepth(pt),gt=pt)},reset:function(){D=!1,q=null,K=null,gt=null,dt=!1}}}function i(){let D=!1,dt=null,q=null,K=null,gt=null,pt=null,qt=null,Re=null,He=null;return{setTest:function(ue){D||(ue?ot(s.STENCIL_TEST):kt(s.STENCIL_TEST))},setMask:function(ue){dt!==ue&&!D&&(s.stencilMask(ue),dt=ue)},setFunc:function(ue,bn,jn){(q!==ue||K!==bn||gt!==jn)&&(s.stencilFunc(ue,bn,jn),q=ue,K=bn,gt=jn)},setOp:function(ue,bn,jn){(pt!==ue||qt!==bn||Re!==jn)&&(s.stencilOp(ue,bn,jn),pt=ue,qt=bn,Re=jn)},setLocked:function(ue){D=ue},setClear:function(ue){He!==ue&&(s.clearStencil(ue),He=ue)},reset:function(){D=!1,dt=null,q=null,K=null,gt=null,pt=null,qt=null,Re=null,He=null}}}let r=new e,a=new n,o=new i,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,y=null,_=null,v=null,L=null,R=null,C=new Mt(0,0,0),A=0,S=!1,M=null,I=null,H=null,B=null,V=null,J=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,nt=0,W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(W)[1]),G=nt>=1):W.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),G=nt>=2);let lt=null,xt={},Tt=s.getParameter(s.SCISSOR_BOX),Xt=s.getParameter(s.VIEWPORT),ae=new pe().fromArray(Tt),Z=new pe().fromArray(Xt);function rt(D,dt,q,K){let gt=new Uint8Array(4),pt=s.createTexture();s.bindTexture(D,pt),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let qt=0;qt<q;qt++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(dt,0,s.RGBA,1,1,K,0,s.RGBA,s.UNSIGNED_BYTE,gt):s.texImage2D(dt+qt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,gt);return pt}let At={};At[s.TEXTURE_2D]=rt(s.TEXTURE_2D,s.TEXTURE_2D,1),At[s.TEXTURE_CUBE_MAP]=rt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),At[s.TEXTURE_2D_ARRAY]=rt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),At[s.TEXTURE_3D]=rt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ot(s.DEPTH_TEST),a.setFunc(Us),et(!1),bt(hu),ot(s.CULL_FACE),P(Hn);function ot(D){h[D]!==!0&&(s.enable(D),h[D]=!0)}function kt(D){h[D]!==!1&&(s.disable(D),h[D]=!1)}function Vt(D,dt){return u[D]!==dt?(s.bindFramebuffer(D,dt),u[D]=dt,D===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=dt),D===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=dt),!0):!1}function Ft(D,dt){let q=d,K=!1;if(D){q=f.get(dt),q===void 0&&(q=[],f.set(dt,q));let gt=D.textures;if(q.length!==gt.length||q[0]!==s.COLOR_ATTACHMENT0){for(let pt=0,qt=gt.length;pt<qt;pt++)q[pt]=s.COLOR_ATTACHMENT0+pt;q.length=gt.length,K=!0}}else q[0]!==s.BACK&&(q[0]=s.BACK,K=!0);K&&s.drawBuffers(q)}function ee(D){return g!==D?(s.useProgram(D),g=D,!0):!1}let Q={[Yi]:s.FUNC_ADD,[pp]:s.FUNC_SUBTRACT,[mp]:s.FUNC_REVERSE_SUBTRACT};Q[gp]=s.MIN,Q[xp]=s.MAX;let st={[vp]:s.ZERO,[_p]:s.ONE,[yp]:s.SRC_COLOR,[Nc]:s.SRC_ALPHA,[wp]:s.SRC_ALPHA_SATURATE,[Sp]:s.DST_COLOR,[Mp]:s.DST_ALPHA,[bp]:s.ONE_MINUS_SRC_COLOR,[kc]:s.ONE_MINUS_SRC_ALPHA,[Tp]:s.ONE_MINUS_DST_COLOR,[Ep]:s.ONE_MINUS_DST_ALPHA,[Ap]:s.CONSTANT_COLOR,[Rp]:s.ONE_MINUS_CONSTANT_COLOR,[Cp]:s.CONSTANT_ALPHA,[Pp]:s.ONE_MINUS_CONSTANT_ALPHA};function P(D,dt,q,K,gt,pt,qt,Re,He,ue){if(D===Hn){x===!0&&(kt(s.BLEND),x=!1);return}if(x===!1&&(ot(s.BLEND),x=!0),D!==dp){if(D!==m||ue!==S){if((p!==Yi||v!==Yi)&&(s.blendEquation(s.FUNC_ADD),p=Yi,v=Yi),ue)switch(D){case Ps:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case je:s.blendFunc(s.ONE,s.ONE);break;case uu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case fu:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ps:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case je:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case uu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case fu:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,_=null,L=null,R=null,C.set(0,0,0),A=0,m=D,S=ue}return}gt=gt||dt,pt=pt||q,qt=qt||K,(dt!==p||gt!==v)&&(s.blendEquationSeparate(Q[dt],Q[gt]),p=dt,v=gt),(q!==y||K!==_||pt!==L||qt!==R)&&(s.blendFuncSeparate(st[q],st[K],st[pt],st[qt]),y=q,_=K,L=pt,R=qt),(Re.equals(C)===!1||He!==A)&&(s.blendColor(Re.r,Re.g,Re.b,He),C.copy(Re),A=He),m=D,S=!1}function Lt(D,dt){D.side===Te?kt(s.CULL_FACE):ot(s.CULL_FACE);let q=D.side===We;dt&&(q=!q),et(q),D.blending===Ps&&D.transparent===!1?P(Hn):P(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let K=D.stencilWrite;o.setTest(K),K&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Bt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ot(s.SAMPLE_ALPHA_TO_COVERAGE):kt(s.SAMPLE_ALPHA_TO_COVERAGE)}function et(D){M!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),M=D)}function bt(D){D!==up?(ot(s.CULL_FACE),D!==I&&(D===hu?s.cullFace(s.BACK):D===fp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):kt(s.CULL_FACE),I=D}function ct(D){D!==H&&(G&&s.lineWidth(D),H=D)}function Bt(D,dt,q){D?(ot(s.POLYGON_OFFSET_FILL),(B!==dt||V!==q)&&(s.polygonOffset(dt,q),B=dt,V=q)):kt(s.POLYGON_OFFSET_FILL)}function _t(D){D?ot(s.SCISSOR_TEST):kt(s.SCISSOR_TEST)}function w(D){D===void 0&&(D=s.TEXTURE0+J-1),lt!==D&&(s.activeTexture(D),lt=D)}function b(D,dt,q){q===void 0&&(lt===null?q=s.TEXTURE0+J-1:q=lt);let K=xt[q];K===void 0&&(K={type:void 0,texture:void 0},xt[q]=K),(K.type!==D||K.texture!==dt)&&(lt!==q&&(s.activeTexture(q),lt=q),s.bindTexture(D,dt||At[D]),K.type=D,K.texture=dt)}function k(){let D=xt[lt];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Y(){try{s.compressedTexImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{s.compressedTexImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $(){try{s.texSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Rt(){try{s.texSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ft(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function yt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Qt(){try{s.texStorage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{s.texStorage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Et(){try{s.texImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ot(){try{s.texImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ht(D){ae.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),ae.copy(D))}function St(D){Z.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),Z.copy(D))}function te(D,dt){let q=l.get(dt);q===void 0&&(q=new WeakMap,l.set(dt,q));let K=q.get(D);K===void 0&&(K=s.getUniformBlockIndex(dt,D.name),q.set(D,K))}function Zt(D,dt){let K=l.get(dt).get(D);c.get(dt)!==K&&(s.uniformBlockBinding(dt,K,D.__bindingPointIndex),c.set(dt,K))}function ve(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},lt=null,xt={},u={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,y=null,_=null,v=null,L=null,R=null,C=new Mt(0,0,0),A=0,S=!1,M=null,I=null,H=null,B=null,V=null,ae.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ot,disable:kt,bindFramebuffer:Vt,drawBuffers:Ft,useProgram:ee,setBlending:P,setMaterial:Lt,setFlipSided:et,setCullFace:bt,setLineWidth:ct,setPolygonOffset:Bt,setScissorTest:_t,activeTexture:w,bindTexture:b,unbindTexture:k,compressedTexImage2D:Y,compressedTexImage3D:j,texImage2D:Et,texImage3D:Ot,updateUBOMapping:te,uniformBlockBinding:Zt,texStorage2D:Qt,texStorage3D:it,texSubImage2D:$,texSubImage3D:Rt,compressedTexSubImage2D:ft,compressedTexSubImage3D:yt,scissor:Ht,viewport:St,reset:ve}}function lf(s,t,e,n){let i=$v(n);switch(e){case Pf:return s*t;case Lf:return s*t;case Df:return s*t*2;case _h:return s*t/i.components*i.byteLength;case yh:return s*t/i.components*i.byteLength;case Uf:return s*t*2/i.components*i.byteLength;case bh:return s*t*2/i.components*i.byteLength;case If:return s*t*3/i.components*i.byteLength;case An:return s*t*4/i.components*i.byteLength;case Mh:return s*t*4/i.components*i.byteLength;case ba:case Ma:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ea:case Sa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case $c:case Jc:return Math.max(s,16)*Math.max(t,8)/4;case Yc:case Zc:return Math.max(s,8)*Math.max(t,8)/2;case Kc:case Qc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case jc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case tl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case el:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case nl:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case il:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case sl:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case rl:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case al:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case ol:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case cl:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case ll:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case hl:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case ul:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case fl:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case dl:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Ta:case pl:case ml:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Nf:case gl:return Math.ceil(s/4)*Math.ceil(t/4)*8;case xl:case vl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function $v(s){switch(s){case hi:case Af:return{byteLength:1,components:1};case Er:case Rf:case In:return{byteLength:2,components:1};case xh:case vh:return{byteLength:2,components:4};case Ki:case gh:case zn:return{byteLength:4,components:1};case Cf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Zv(s,t,e,n,i,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new tt,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,b){return d?new OffscreenCanvas(w,b):Ra("canvas")}function x(w,b,k){let Y=1,j=_t(w);if((j.width>k||j.height>k)&&(Y=k/Math.max(j.width,j.height)),Y<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let $=Math.floor(Y*j.width),Rt=Math.floor(Y*j.height);u===void 0&&(u=g($,Rt));let ft=b?g($,Rt):u;return ft.width=$,ft.height=Rt,ft.getContext("2d").drawImage(w,0,0,$,Rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+$+"x"+Rt+")."),ft}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){s.generateMipmap(w)}function y(w){return w.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?s.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function _(w,b,k,Y,j=!1){if(w!==null){if(s[w]!==void 0)return s[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let $=b;if(b===s.RED&&(k===s.FLOAT&&($=s.R32F),k===s.HALF_FLOAT&&($=s.R16F),k===s.UNSIGNED_BYTE&&($=s.R8)),b===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&($=s.R8UI),k===s.UNSIGNED_SHORT&&($=s.R16UI),k===s.UNSIGNED_INT&&($=s.R32UI),k===s.BYTE&&($=s.R8I),k===s.SHORT&&($=s.R16I),k===s.INT&&($=s.R32I)),b===s.RG&&(k===s.FLOAT&&($=s.RG32F),k===s.HALF_FLOAT&&($=s.RG16F),k===s.UNSIGNED_BYTE&&($=s.RG8)),b===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&($=s.RG8UI),k===s.UNSIGNED_SHORT&&($=s.RG16UI),k===s.UNSIGNED_INT&&($=s.RG32UI),k===s.BYTE&&($=s.RG8I),k===s.SHORT&&($=s.RG16I),k===s.INT&&($=s.RG32I)),b===s.RGB_INTEGER&&(k===s.UNSIGNED_BYTE&&($=s.RGB8UI),k===s.UNSIGNED_SHORT&&($=s.RGB16UI),k===s.UNSIGNED_INT&&($=s.RGB32UI),k===s.BYTE&&($=s.RGB8I),k===s.SHORT&&($=s.RGB16I),k===s.INT&&($=s.RGB32I)),b===s.RGBA_INTEGER&&(k===s.UNSIGNED_BYTE&&($=s.RGBA8UI),k===s.UNSIGNED_SHORT&&($=s.RGBA16UI),k===s.UNSIGNED_INT&&($=s.RGBA32UI),k===s.BYTE&&($=s.RGBA8I),k===s.SHORT&&($=s.RGBA16I),k===s.INT&&($=s.RGBA32I)),b===s.RGB&&k===s.UNSIGNED_INT_5_9_9_9_REV&&($=s.RGB9_E5),b===s.RGBA){let Rt=j?oo:jt.getTransfer(Y);k===s.FLOAT&&($=s.RGBA32F),k===s.HALF_FLOAT&&($=s.RGBA16F),k===s.UNSIGNED_BYTE&&($=Rt===le?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function v(w,b){let k;return w?b===null||b===Ki||b===Os?k=s.DEPTH24_STENCIL8:b===zn?k=s.DEPTH32F_STENCIL8:b===Er&&(k=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Ki||b===Os?k=s.DEPTH_COMPONENT24:b===zn?k=s.DEPTH_COMPONENT32F:b===Er&&(k=s.DEPTH_COMPONENT16),k}function L(w,b){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==un&&w.minFilter!==Fn?Math.log2(Math.max(b.width,b.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?b.mipmaps.length:1}function R(w){let b=w.target;b.removeEventListener("dispose",R),A(b),b.isVideoTexture&&h.delete(b)}function C(w){let b=w.target;b.removeEventListener("dispose",C),M(b)}function A(w){let b=n.get(w);if(b.__webglInit===void 0)return;let k=w.source,Y=f.get(k);if(Y){let j=Y[b.__cacheKey];j.usedTimes--,j.usedTimes===0&&S(w),Object.keys(Y).length===0&&f.delete(k)}n.remove(w)}function S(w){let b=n.get(w);s.deleteTexture(b.__webglTexture);let k=w.source,Y=f.get(k);delete Y[b.__cacheKey],a.memory.textures--}function M(w){let b=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(b.__webglFramebuffer[Y]))for(let j=0;j<b.__webglFramebuffer[Y].length;j++)s.deleteFramebuffer(b.__webglFramebuffer[Y][j]);else s.deleteFramebuffer(b.__webglFramebuffer[Y]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[Y])}else{if(Array.isArray(b.__webglFramebuffer))for(let Y=0;Y<b.__webglFramebuffer.length;Y++)s.deleteFramebuffer(b.__webglFramebuffer[Y]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Y=0;Y<b.__webglColorRenderbuffer.length;Y++)b.__webglColorRenderbuffer[Y]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[Y]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let k=w.textures;for(let Y=0,j=k.length;Y<j;Y++){let $=n.get(k[Y]);$.__webglTexture&&(s.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(k[Y])}n.remove(w)}let I=0;function H(){I=0}function B(){let w=I;return w>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),I+=1,w}function V(w){let b=[];return b.push(w.wrapS),b.push(w.wrapT),b.push(w.wrapR||0),b.push(w.magFilter),b.push(w.minFilter),b.push(w.anisotropy),b.push(w.internalFormat),b.push(w.format),b.push(w.type),b.push(w.generateMipmaps),b.push(w.premultiplyAlpha),b.push(w.flipY),b.push(w.unpackAlignment),b.push(w.colorSpace),b.join()}function J(w,b){let k=n.get(w);if(w.isVideoTexture&&ct(w),w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){let Y=w.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(k,w,b);return}}e.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+b)}function G(w,b){let k=n.get(w);if(w.version>0&&k.__version!==w.version){Z(k,w,b);return}e.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+b)}function nt(w,b){let k=n.get(w);if(w.version>0&&k.__version!==w.version){Z(k,w,b);return}e.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+b)}function W(w,b){let k=n.get(w);if(w.version>0&&k.__version!==w.version){rt(k,w,b);return}e.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+b)}let lt={[Bs]:s.REPEAT,[Zi]:s.CLAMP_TO_EDGE,[qc]:s.MIRRORED_REPEAT},xt={[un]:s.NEAREST,[Up]:s.NEAREST_MIPMAP_NEAREST,[Wr]:s.NEAREST_MIPMAP_LINEAR,[Fn]:s.LINEAR,[ec]:s.LINEAR_MIPMAP_NEAREST,[Ji]:s.LINEAR_MIPMAP_LINEAR},Tt={[Op]:s.NEVER,[Wp]:s.ALWAYS,[Fp]:s.LESS,[Bf]:s.LEQUAL,[zp]:s.EQUAL,[Gp]:s.GEQUAL,[Hp]:s.GREATER,[Vp]:s.NOTEQUAL};function Xt(w,b){if(b.type===zn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Fn||b.magFilter===ec||b.magFilter===Wr||b.magFilter===Ji||b.minFilter===Fn||b.minFilter===ec||b.minFilter===Wr||b.minFilter===Ji)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(w,s.TEXTURE_WRAP_S,lt[b.wrapS]),s.texParameteri(w,s.TEXTURE_WRAP_T,lt[b.wrapT]),(w===s.TEXTURE_3D||w===s.TEXTURE_2D_ARRAY)&&s.texParameteri(w,s.TEXTURE_WRAP_R,lt[b.wrapR]),s.texParameteri(w,s.TEXTURE_MAG_FILTER,xt[b.magFilter]),s.texParameteri(w,s.TEXTURE_MIN_FILTER,xt[b.minFilter]),b.compareFunction&&(s.texParameteri(w,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(w,s.TEXTURE_COMPARE_FUNC,Tt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===un||b.minFilter!==Wr&&b.minFilter!==Ji||b.type===zn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");s.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function ae(w,b){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,b.addEventListener("dispose",R));let Y=b.source,j=f.get(Y);j===void 0&&(j={},f.set(Y,j));let $=V(b);if($!==w.__cacheKey){j[$]===void 0&&(j[$]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,k=!0),j[$].usedTimes++;let Rt=j[w.__cacheKey];Rt!==void 0&&(j[w.__cacheKey].usedTimes--,Rt.usedTimes===0&&S(b)),w.__cacheKey=$,w.__webglTexture=j[$].texture}return k}function Z(w,b,k){let Y=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Y=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Y=s.TEXTURE_3D);let j=ae(w,b),$=b.source;e.bindTexture(Y,w.__webglTexture,s.TEXTURE0+k);let Rt=n.get($);if($.version!==Rt.__version||j===!0){e.activeTexture(s.TEXTURE0+k);let ft=jt.getPrimaries(jt.workingColorSpace),yt=b.colorSpace===Ai?null:jt.getPrimaries(b.colorSpace),Qt=b.colorSpace===Ai||ft===yt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qt);let it=x(b.image,!1,i.maxTextureSize);it=Bt(b,it);let Et=r.convert(b.format,b.colorSpace),Ot=r.convert(b.type),Ht=_(b.internalFormat,Et,Ot,b.colorSpace,b.isVideoTexture);Xt(Y,b);let St,te=b.mipmaps,Zt=b.isVideoTexture!==!0,ve=Rt.__version===void 0||j===!0,D=$.dataReady,dt=L(b,it);if(b.isDepthTexture)Ht=v(b.format===Fs,b.type),ve&&(Zt?e.texStorage2D(s.TEXTURE_2D,1,Ht,it.width,it.height):e.texImage2D(s.TEXTURE_2D,0,Ht,it.width,it.height,0,Et,Ot,null));else if(b.isDataTexture)if(te.length>0){Zt&&ve&&e.texStorage2D(s.TEXTURE_2D,dt,Ht,te[0].width,te[0].height);for(let q=0,K=te.length;q<K;q++)St=te[q],Zt?D&&e.texSubImage2D(s.TEXTURE_2D,q,0,0,St.width,St.height,Et,Ot,St.data):e.texImage2D(s.TEXTURE_2D,q,Ht,St.width,St.height,0,Et,Ot,St.data);b.generateMipmaps=!1}else Zt?(ve&&e.texStorage2D(s.TEXTURE_2D,dt,Ht,it.width,it.height),D&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,it.width,it.height,Et,Ot,it.data)):e.texImage2D(s.TEXTURE_2D,0,Ht,it.width,it.height,0,Et,Ot,it.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Zt&&ve&&e.texStorage3D(s.TEXTURE_2D_ARRAY,dt,Ht,te[0].width,te[0].height,it.depth);for(let q=0,K=te.length;q<K;q++)if(St=te[q],b.format!==An)if(Et!==null)if(Zt){if(D)if(b.layerUpdates.size>0){let gt=lf(St.width,St.height,b.format,b.type);for(let pt of b.layerUpdates){let qt=St.data.subarray(pt*gt/St.data.BYTES_PER_ELEMENT,(pt+1)*gt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,pt,St.width,St.height,1,Et,qt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,St.width,St.height,it.depth,Et,St.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,q,Ht,St.width,St.height,it.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Zt?D&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,St.width,St.height,it.depth,Et,Ot,St.data):e.texImage3D(s.TEXTURE_2D_ARRAY,q,Ht,St.width,St.height,it.depth,0,Et,Ot,St.data)}else{Zt&&ve&&e.texStorage2D(s.TEXTURE_2D,dt,Ht,te[0].width,te[0].height);for(let q=0,K=te.length;q<K;q++)St=te[q],b.format!==An?Et!==null?Zt?D&&e.compressedTexSubImage2D(s.TEXTURE_2D,q,0,0,St.width,St.height,Et,St.data):e.compressedTexImage2D(s.TEXTURE_2D,q,Ht,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Zt?D&&e.texSubImage2D(s.TEXTURE_2D,q,0,0,St.width,St.height,Et,Ot,St.data):e.texImage2D(s.TEXTURE_2D,q,Ht,St.width,St.height,0,Et,Ot,St.data)}else if(b.isDataArrayTexture)if(Zt){if(ve&&e.texStorage3D(s.TEXTURE_2D_ARRAY,dt,Ht,it.width,it.height,it.depth),D)if(b.layerUpdates.size>0){let q=lf(it.width,it.height,b.format,b.type);for(let K of b.layerUpdates){let gt=it.data.subarray(K*q/it.data.BYTES_PER_ELEMENT,(K+1)*q/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,K,it.width,it.height,1,Et,Ot,gt)}b.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,Et,Ot,it.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Ht,it.width,it.height,it.depth,0,Et,Ot,it.data);else if(b.isData3DTexture)Zt?(ve&&e.texStorage3D(s.TEXTURE_3D,dt,Ht,it.width,it.height,it.depth),D&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,Et,Ot,it.data)):e.texImage3D(s.TEXTURE_3D,0,Ht,it.width,it.height,it.depth,0,Et,Ot,it.data);else if(b.isFramebufferTexture){if(ve)if(Zt)e.texStorage2D(s.TEXTURE_2D,dt,Ht,it.width,it.height);else{let q=it.width,K=it.height;for(let gt=0;gt<dt;gt++)e.texImage2D(s.TEXTURE_2D,gt,Ht,q,K,0,Et,Ot,null),q>>=1,K>>=1}}else if(te.length>0){if(Zt&&ve){let q=_t(te[0]);e.texStorage2D(s.TEXTURE_2D,dt,Ht,q.width,q.height)}for(let q=0,K=te.length;q<K;q++)St=te[q],Zt?D&&e.texSubImage2D(s.TEXTURE_2D,q,0,0,Et,Ot,St):e.texImage2D(s.TEXTURE_2D,q,Ht,Et,Ot,St);b.generateMipmaps=!1}else if(Zt){if(ve){let q=_t(it);e.texStorage2D(s.TEXTURE_2D,dt,Ht,q.width,q.height)}D&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Et,Ot,it)}else e.texImage2D(s.TEXTURE_2D,0,Ht,Et,Ot,it);m(b)&&p(Y),Rt.__version=$.version,b.onUpdate&&b.onUpdate(b)}w.__version=b.version}function rt(w,b,k){if(b.image.length!==6)return;let Y=ae(w,b),j=b.source;e.bindTexture(s.TEXTURE_CUBE_MAP,w.__webglTexture,s.TEXTURE0+k);let $=n.get(j);if(j.version!==$.__version||Y===!0){e.activeTexture(s.TEXTURE0+k);let Rt=jt.getPrimaries(jt.workingColorSpace),ft=b.colorSpace===Ai?null:jt.getPrimaries(b.colorSpace),yt=b.colorSpace===Ai||Rt===ft?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);let Qt=b.isCompressedTexture||b.image[0].isCompressedTexture,it=b.image[0]&&b.image[0].isDataTexture,Et=[];for(let K=0;K<6;K++)!Qt&&!it?Et[K]=x(b.image[K],!0,i.maxCubemapSize):Et[K]=it?b.image[K].image:b.image[K],Et[K]=Bt(b,Et[K]);let Ot=Et[0],Ht=r.convert(b.format,b.colorSpace),St=r.convert(b.type),te=_(b.internalFormat,Ht,St,b.colorSpace),Zt=b.isVideoTexture!==!0,ve=$.__version===void 0||Y===!0,D=j.dataReady,dt=L(b,Ot);Xt(s.TEXTURE_CUBE_MAP,b);let q;if(Qt){Zt&&ve&&e.texStorage2D(s.TEXTURE_CUBE_MAP,dt,te,Ot.width,Ot.height);for(let K=0;K<6;K++){q=Et[K].mipmaps;for(let gt=0;gt<q.length;gt++){let pt=q[gt];b.format!==An?Ht!==null?Zt?D&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,0,0,pt.width,pt.height,Ht,pt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,te,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Zt?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,0,0,pt.width,pt.height,Ht,St,pt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,te,pt.width,pt.height,0,Ht,St,pt.data)}}}else{if(q=b.mipmaps,Zt&&ve){q.length>0&&dt++;let K=_t(Et[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,dt,te,K.width,K.height)}for(let K=0;K<6;K++)if(it){Zt?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Et[K].width,Et[K].height,Ht,St,Et[K].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,te,Et[K].width,Et[K].height,0,Ht,St,Et[K].data);for(let gt=0;gt<q.length;gt++){let qt=q[gt].image[K].image;Zt?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,0,0,qt.width,qt.height,Ht,St,qt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,te,qt.width,qt.height,0,Ht,St,qt.data)}}else{Zt?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ht,St,Et[K]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,te,Ht,St,Et[K]);for(let gt=0;gt<q.length;gt++){let pt=q[gt];Zt?D&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,0,0,Ht,St,pt.image[K]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,te,Ht,St,pt.image[K])}}}m(b)&&p(s.TEXTURE_CUBE_MAP),$.__version=j.version,b.onUpdate&&b.onUpdate(b)}w.__version=b.version}function At(w,b,k,Y,j,$){let Rt=r.convert(k.format,k.colorSpace),ft=r.convert(k.type),yt=_(k.internalFormat,Rt,ft,k.colorSpace),Qt=n.get(b),it=n.get(k);if(it.__renderTarget=b,!Qt.__hasExternalTextures){let Et=Math.max(1,b.width>>$),Ot=Math.max(1,b.height>>$);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?e.texImage3D(j,$,yt,Et,Ot,b.depth,0,Rt,ft,null):e.texImage2D(j,$,yt,Et,Ot,0,Rt,ft,null)}e.bindFramebuffer(s.FRAMEBUFFER,w),bt(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Y,j,it.__webglTexture,0,et(b)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Y,j,it.__webglTexture,$),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ot(w,b,k){if(s.bindRenderbuffer(s.RENDERBUFFER,w),b.depthBuffer){let Y=b.depthTexture,j=Y&&Y.isDepthTexture?Y.type:null,$=v(b.stencilBuffer,j),Rt=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ft=et(b);bt(b)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ft,$,b.width,b.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,ft,$,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,$,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Rt,s.RENDERBUFFER,w)}else{let Y=b.textures;for(let j=0;j<Y.length;j++){let $=Y[j],Rt=r.convert($.format,$.colorSpace),ft=r.convert($.type),yt=_($.internalFormat,Rt,ft,$.colorSpace),Qt=et(b);k&&bt(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Qt,yt,b.width,b.height):bt(b)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Qt,yt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,yt,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function kt(w,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,w),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=n.get(b.depthTexture);Y.__renderTarget=b,(!Y.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),J(b.depthTexture,0);let j=Y.__webglTexture,$=et(b);if(b.depthTexture.format===Is)bt(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0);else if(b.depthTexture.format===Fs)bt(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Vt(w){let b=n.get(w),k=w.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==w.depthTexture){let Y=w.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),Y){let j=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,Y.removeEventListener("dispose",j)};Y.addEventListener("dispose",j),b.__depthDisposeCallback=j}b.__boundDepthTexture=Y}if(w.depthTexture&&!b.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");kt(b.__webglFramebuffer,w)}else if(k){b.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[Y]),b.__webglDepthbuffer[Y]===void 0)b.__webglDepthbuffer[Y]=s.createRenderbuffer(),ot(b.__webglDepthbuffer[Y],w,!1);else{let j=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$=b.__webglDepthbuffer[Y];s.bindRenderbuffer(s.RENDERBUFFER,$),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,$)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),ot(b.__webglDepthbuffer,w,!1);else{let Y=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,j),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,j)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ft(w,b,k){let Y=n.get(w);b!==void 0&&At(Y.__webglFramebuffer,w,w.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&Vt(w)}function ee(w){let b=w.texture,k=n.get(w),Y=n.get(b);w.addEventListener("dispose",C);let j=w.textures,$=w.isWebGLCubeRenderTarget===!0,Rt=j.length>1;if(Rt||(Y.__webglTexture===void 0&&(Y.__webglTexture=s.createTexture()),Y.__version=b.version,a.memory.textures++),$){k.__webglFramebuffer=[];for(let ft=0;ft<6;ft++)if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer[ft]=[];for(let yt=0;yt<b.mipmaps.length;yt++)k.__webglFramebuffer[ft][yt]=s.createFramebuffer()}else k.__webglFramebuffer[ft]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer=[];for(let ft=0;ft<b.mipmaps.length;ft++)k.__webglFramebuffer[ft]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(Rt)for(let ft=0,yt=j.length;ft<yt;ft++){let Qt=n.get(j[ft]);Qt.__webglTexture===void 0&&(Qt.__webglTexture=s.createTexture(),a.memory.textures++)}if(w.samples>0&&bt(w)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ft=0;ft<j.length;ft++){let yt=j[ft];k.__webglColorRenderbuffer[ft]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[ft]);let Qt=r.convert(yt.format,yt.colorSpace),it=r.convert(yt.type),Et=_(yt.internalFormat,Qt,it,yt.colorSpace,w.isXRRenderTarget===!0),Ot=et(w);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ot,Et,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.RENDERBUFFER,k.__webglColorRenderbuffer[ft])}s.bindRenderbuffer(s.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),ot(k.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if($){e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture),Xt(s.TEXTURE_CUBE_MAP,b);for(let ft=0;ft<6;ft++)if(b.mipmaps&&b.mipmaps.length>0)for(let yt=0;yt<b.mipmaps.length;yt++)At(k.__webglFramebuffer[ft][yt],w,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,yt);else At(k.__webglFramebuffer[ft],w,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0);m(b)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Rt){for(let ft=0,yt=j.length;ft<yt;ft++){let Qt=j[ft],it=n.get(Qt);e.bindTexture(s.TEXTURE_2D,it.__webglTexture),Xt(s.TEXTURE_2D,Qt),At(k.__webglFramebuffer,w,Qt,s.COLOR_ATTACHMENT0+ft,s.TEXTURE_2D,0),m(Qt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let ft=s.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ft=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ft,Y.__webglTexture),Xt(ft,b),b.mipmaps&&b.mipmaps.length>0)for(let yt=0;yt<b.mipmaps.length;yt++)At(k.__webglFramebuffer[yt],w,b,s.COLOR_ATTACHMENT0,ft,yt);else At(k.__webglFramebuffer,w,b,s.COLOR_ATTACHMENT0,ft,0);m(b)&&p(ft),e.unbindTexture()}w.depthBuffer&&Vt(w)}function Q(w){let b=w.textures;for(let k=0,Y=b.length;k<Y;k++){let j=b[k];if(m(j)){let $=y(w),Rt=n.get(j).__webglTexture;e.bindTexture($,Rt),p($),e.unbindTexture()}}}let st=[],P=[];function Lt(w){if(w.samples>0){if(bt(w)===!1){let b=w.textures,k=w.width,Y=w.height,j=s.COLOR_BUFFER_BIT,$=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Rt=n.get(w),ft=b.length>1;if(ft)for(let yt=0;yt<b.length;yt++)e.bindFramebuffer(s.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Rt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let yt=0;yt<b.length;yt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),ft){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Rt.__webglColorRenderbuffer[yt]);let Qt=n.get(b[yt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Qt,0)}s.blitFramebuffer(0,0,k,Y,0,0,k,Y,j,s.NEAREST),c===!0&&(st.length=0,P.length=0,st.push(s.COLOR_ATTACHMENT0+yt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(st.push($),P.push($),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,P)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,st))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ft)for(let yt=0;yt<b.length;yt++){e.bindFramebuffer(s.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.RENDERBUFFER,Rt.__webglColorRenderbuffer[yt]);let Qt=n.get(b[yt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Rt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.TEXTURE_2D,Qt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){let b=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function et(w){return Math.min(i.maxSamples,w.samples)}function bt(w){let b=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ct(w){let b=a.render.frame;h.get(w)!==b&&(h.set(w,b),w.update())}function Bt(w,b){let k=w.colorSpace,Y=w.format,j=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||k!==qs&&k!==Ai&&(jt.getTransfer(k)===le?(Y!==An||j!==hi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),b}function _t(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=H,this.setTexture2D=J,this.setTexture2DArray=G,this.setTexture3D=nt,this.setTextureCube=W,this.rebindTextures=Ft,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=At,this.useMultisampledRTT=bt}function Jv(s,t){function e(n,i=Ai){let r,a=jt.getTransfer(i);if(n===hi)return s.UNSIGNED_BYTE;if(n===xh)return s.UNSIGNED_SHORT_4_4_4_4;if(n===vh)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Cf)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Af)return s.BYTE;if(n===Rf)return s.SHORT;if(n===Er)return s.UNSIGNED_SHORT;if(n===gh)return s.INT;if(n===Ki)return s.UNSIGNED_INT;if(n===zn)return s.FLOAT;if(n===In)return s.HALF_FLOAT;if(n===Pf)return s.ALPHA;if(n===If)return s.RGB;if(n===An)return s.RGBA;if(n===Lf)return s.LUMINANCE;if(n===Df)return s.LUMINANCE_ALPHA;if(n===Is)return s.DEPTH_COMPONENT;if(n===Fs)return s.DEPTH_STENCIL;if(n===_h)return s.RED;if(n===yh)return s.RED_INTEGER;if(n===Uf)return s.RG;if(n===bh)return s.RG_INTEGER;if(n===Mh)return s.RGBA_INTEGER;if(n===ba||n===Ma||n===Ea||n===Sa)if(a===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ba)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ba)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Sa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Yc||n===$c||n===Zc||n===Jc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Yc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===$c)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Zc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Jc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Kc||n===Qc||n===jc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Kc||n===Qc)return a===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===jc)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===tl||n===el||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===cl||n===ll||n===hl||n===ul||n===fl||n===dl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===tl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===el)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===nl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===il)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===sl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===rl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===al)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ol)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===cl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ll)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===hl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ul)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===fl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===dl)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ta||n===pl||n===ml)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ta)return a===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===pl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ml)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Nf||n===gl||n===xl||n===vl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ta)return r.COMPRESSED_RED_RGTC1_EXT;if(n===gl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===xl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===vl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Os?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var Ul=class extends ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},he=class extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}},Kv={type:"move"},_r=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new he,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new he,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new he,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Kv)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new he;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Qv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jv=`
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

}`,Nl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let i=new tn,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ce({vertexShader:Qv,fragmentShader:jv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new wt(new en(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},kl=class extends Ii{constructor(t,e){super();let n=this,i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null,x=new Nl,m=e.getContextAttributes(),p=null,y=null,_=[],v=[],L=new tt,R=null,C=new ze;C.viewport=new pe;let A=new ze;A.viewport=new pe;let S=[C,A],M=new Ul,I=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let rt=_[Z];return rt===void 0&&(rt=new _r,_[Z]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(Z){let rt=_[Z];return rt===void 0&&(rt=new _r,_[Z]=rt),rt.getGripSpace()},this.getHand=function(Z){let rt=_[Z];return rt===void 0&&(rt=new _r,_[Z]=rt),rt.getHandSpace()};function B(Z){let rt=v.indexOf(Z.inputSource);if(rt===-1)return;let At=_[rt];At!==void 0&&(At.update(Z.inputSource,Z.frame,l||a),At.dispatchEvent({type:Z.type,data:Z.inputSource}))}function V(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",J);for(let Z=0;Z<_.length;Z++){let rt=v[Z];rt!==null&&(v[Z]=null,_[Z].disconnect(rt))}I=null,H=null,x.reset(),t.setRenderTarget(p),d=null,f=null,u=null,i=null,y=null,ae.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",V),i.addEventListener("inputsourceschange",J),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(L),i.renderState.layers===void 0){let rt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,rt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Ze(d.framebufferWidth,d.framebufferHeight,{format:An,type:hi,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let rt=null,At=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=m.stencil?Fs:Is,At=m.stencil?Os:Ki);let kt={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(kt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new Ze(f.textureWidth,f.textureHeight,{format:An,type:hi,depthTexture:new Oa(f.textureWidth,f.textureHeight,At,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),ae.setContext(i),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function J(Z){for(let rt=0;rt<Z.removed.length;rt++){let At=Z.removed[rt],ot=v.indexOf(At);ot>=0&&(v[ot]=null,_[ot].disconnect(At))}for(let rt=0;rt<Z.added.length;rt++){let At=Z.added[rt],ot=v.indexOf(At);if(ot===-1){for(let Vt=0;Vt<_.length;Vt++)if(Vt>=v.length){v.push(At),ot=Vt;break}else if(v[Vt]===null){v[Vt]=At,ot=Vt;break}if(ot===-1)break}let kt=_[ot];kt&&kt.connect(At)}}let G=new T,nt=new T;function W(Z,rt,At){G.setFromMatrixPosition(rt.matrixWorld),nt.setFromMatrixPosition(At.matrixWorld);let ot=G.distanceTo(nt),kt=rt.projectionMatrix.elements,Vt=At.projectionMatrix.elements,Ft=kt[14]/(kt[10]-1),ee=kt[14]/(kt[10]+1),Q=(kt[9]+1)/kt[5],st=(kt[9]-1)/kt[5],P=(kt[8]-1)/kt[0],Lt=(Vt[8]+1)/Vt[0],et=Ft*P,bt=Ft*Lt,ct=ot/(-P+Lt),Bt=ct*-P;if(rt.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Bt),Z.translateZ(ct),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),kt[10]===-1)Z.projectionMatrix.copy(rt.projectionMatrix),Z.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{let _t=Ft+ct,w=ee+ct,b=et-Bt,k=bt+(ot-Bt),Y=Q*ee/w*_t,j=st*ee/w*_t;Z.projectionMatrix.makePerspective(b,k,Y,j,_t,w),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function lt(Z,rt){rt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(rt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let rt=Z.near,At=Z.far;x.texture!==null&&(x.depthNear>0&&(rt=x.depthNear),x.depthFar>0&&(At=x.depthFar)),M.near=A.near=C.near=rt,M.far=A.far=C.far=At,(I!==M.near||H!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,H=M.far),C.layers.mask=Z.layers.mask|2,A.layers.mask=Z.layers.mask|4,M.layers.mask=C.layers.mask|A.layers.mask;let ot=Z.parent,kt=M.cameras;lt(M,ot);for(let Vt=0;Vt<kt.length;Vt++)lt(kt[Vt],ot);kt.length===2?W(M,C,A):M.projectionMatrix.copy(C.projectionMatrix),xt(Z,M,ot)};function xt(Z,rt,At){At===null?Z.matrix.copy(rt.matrixWorld):(Z.matrix.copy(At.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(rt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(rt.projectionMatrix),Z.projectionMatrixInverse.copy(rt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=zs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(Z){c=Z,f!==null&&(f.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let Tt=null;function Xt(Z,rt){if(h=rt.getViewerPose(l||a),g=rt,h!==null){let At=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let ot=!1;At.length!==M.cameras.length&&(M.cameras.length=0,ot=!0);for(let Vt=0;Vt<At.length;Vt++){let Ft=At[Vt],ee=null;if(d!==null)ee=d.getViewport(Ft);else{let st=u.getViewSubImage(f,Ft);ee=st.viewport,Vt===0&&(t.setRenderTargetTextures(y,st.colorTexture,f.ignoreDepthValues?void 0:st.depthStencilTexture),t.setRenderTarget(y))}let Q=S[Vt];Q===void 0&&(Q=new ze,Q.layers.enable(Vt),Q.viewport=new pe,S[Vt]=Q),Q.matrix.fromArray(Ft.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Ft.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(ee.x,ee.y,ee.width,ee.height),Vt===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ot===!0&&M.cameras.push(Q)}let kt=i.enabledFeatures;if(kt&&kt.includes("depth-sensing")){let Vt=u.getDepthInformation(At[0]);Vt&&Vt.isValid&&Vt.texture&&x.init(t,Vt,i.renderState)}}for(let At=0;At<_.length;At++){let ot=v[At],kt=_[At];ot!==null&&kt!==void 0&&kt.update(ot,rt,l||a)}Tt&&Tt(Z,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),g=null}let ae=new Hf;ae.setAnimationLoop(Xt),this.setAnimationLoop=function(Z){Tt=Z},this.dispose=function(){}}},Xi=new Xe,t_=new zt;function e_(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,zf(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,y,_,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,y,_):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===We&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===We&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let y=t.get(p),_=y.envMap,v=y.envMapRotation;_&&(m.envMap.value=_,Xi.copy(v),Xi.x*=-1,Xi.y*=-1,Xi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Xi.y*=-1,Xi.z*=-1),m.envMapRotation.value.setFromMatrix4(t_.makeRotationFromEuler(Xi)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=_*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===We&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function n_(s,t,e,n){let i={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,_){let v=_.program;n.uniformBlockBinding(y,v)}function l(y,_){let v=i[y.id];v===void 0&&(g(y),v=h(y),i[y.id]=v,y.addEventListener("dispose",m));let L=_.program;n.updateUBOMapping(y,L);let R=t.render.frame;r[y.id]!==R&&(f(y),r[y.id]=R)}function h(y){let _=u();y.__bindingPointIndex=_;let v=s.createBuffer(),L=y.__size,R=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,L,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,v),v}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let _=i[y.id],v=y.uniforms,L=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let R=0,C=v.length;R<C;R++){let A=Array.isArray(v[R])?v[R]:[v[R]];for(let S=0,M=A.length;S<M;S++){let I=A[S];if(d(I,R,S,L)===!0){let H=I.__offset,B=Array.isArray(I.value)?I.value:[I.value],V=0;for(let J=0;J<B.length;J++){let G=B[J],nt=x(G);typeof G=="number"||typeof G=="boolean"?(I.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,H+V,I.__data)):G.isMatrix3?(I.__data[0]=G.elements[0],I.__data[1]=G.elements[1],I.__data[2]=G.elements[2],I.__data[3]=0,I.__data[4]=G.elements[3],I.__data[5]=G.elements[4],I.__data[6]=G.elements[5],I.__data[7]=0,I.__data[8]=G.elements[6],I.__data[9]=G.elements[7],I.__data[10]=G.elements[8],I.__data[11]=0):(G.toArray(I.__data,V),V+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(y,_,v,L){let R=y.value,C=_+"_"+v;if(L[C]===void 0)return typeof R=="number"||typeof R=="boolean"?L[C]=R:L[C]=R.clone(),!0;{let A=L[C];if(typeof R=="number"||typeof R=="boolean"){if(A!==R)return L[C]=R,!0}else if(A.equals(R)===!1)return A.copy(R),!0}return!1}function g(y){let _=y.uniforms,v=0,L=16;for(let C=0,A=_.length;C<A;C++){let S=Array.isArray(_[C])?_[C]:[_[C]];for(let M=0,I=S.length;M<I;M++){let H=S[M],B=Array.isArray(H.value)?H.value:[H.value];for(let V=0,J=B.length;V<J;V++){let G=B[V],nt=x(G),W=v%L,lt=W%nt.boundary,xt=W+lt;v+=lt,xt!==0&&L-xt<nt.storage&&(v+=L-xt),H.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=v,v+=nt.storage}}}let R=v%L;return R>0&&(v+=L-R),y.__size=v,y.__cache={},this}function x(y){let _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function m(y){let _=y.target;_.removeEventListener("dispose",m);let v=a.indexOf(_.__bindingPointIndex);a.splice(v,1),s.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function p(){for(let y in i)s.deleteBuffer(i[y]);a=[],i={},r={}}return{bind:c,update:l,dispose:p}}var Fa=class{constructor(t={}){let{canvas:e=om(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,y=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Se,this.toneMapping=Ci,this.toneMappingExposure=1;let v=this,L=!1,R=0,C=0,A=null,S=-1,M=null,I=new pe,H=new pe,B=null,V=new Mt(0),J=0,G=e.width,nt=e.height,W=1,lt=null,xt=null,Tt=new pe(0,0,G,nt),Xt=new pe(0,0,G,nt),ae=!1,Z=new Sr,rt=!1,At=!1,ot=new zt,kt=new zt,Vt=new T,Ft=new pe,ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Q=!1;function st(){return A===null?W:1}let P=n;function Lt(E,U){return e.getContext(E,U)}try{let E={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${lh}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",pt,!1),P===null){let U="webgl2";if(P=Lt(U,E),P===null)throw Lt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let et,bt,ct,Bt,_t,w,b,k,Y,j,$,Rt,ft,yt,Qt,it,Et,Ot,Ht,St,te,Zt,ve,D;function dt(){et=new vx(P),et.init(),Zt=new Jv(P,et),bt=new fx(P,et,t,Zt),ct=new Yv(P,et),bt.reverseDepthBuffer&&f&&ct.buffers.depth.setReversed(!0),Bt=new bx(P),_t=new Uv,w=new Zv(P,et,ct,_t,bt,Zt,Bt),b=new px(v),k=new xx(v),Y=new Rm(P),ve=new hx(P,Y),j=new _x(P,Y,Bt,ve),$=new Ex(P,j,Y,Bt),Ht=new Mx(P,bt,w),it=new dx(_t),Rt=new Dv(v,b,k,et,bt,ve,it),ft=new e_(v,_t),yt=new kv,Qt=new Vv(et),Ot=new lx(v,b,k,ct,$,d,c),Et=new Xv(v,$,bt),D=new n_(P,Bt,bt,ct),St=new ux(P,et,Bt),te=new yx(P,et,Bt),Bt.programs=Rt.programs,v.capabilities=bt,v.extensions=et,v.properties=_t,v.renderLists=yt,v.shadowMap=Et,v.state=ct,v.info=Bt}dt();let q=new kl(v,P);this.xr=q,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let E=et.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=et.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(E){E!==void 0&&(W=E,this.setSize(G,nt,!1))},this.getSize=function(E){return E.set(G,nt)},this.setSize=function(E,U,F=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=E,nt=U,e.width=Math.floor(E*W),e.height=Math.floor(U*W),F===!0&&(e.style.width=E+"px",e.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(G*W,nt*W).floor()},this.setDrawingBufferSize=function(E,U,F){G=E,nt=U,W=F,e.width=Math.floor(E*F),e.height=Math.floor(U*F),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(I)},this.getViewport=function(E){return E.copy(Tt)},this.setViewport=function(E,U,F,z){E.isVector4?Tt.set(E.x,E.y,E.z,E.w):Tt.set(E,U,F,z),ct.viewport(I.copy(Tt).multiplyScalar(W).round())},this.getScissor=function(E){return E.copy(Xt)},this.setScissor=function(E,U,F,z){E.isVector4?Xt.set(E.x,E.y,E.z,E.w):Xt.set(E,U,F,z),ct.scissor(H.copy(Xt).multiplyScalar(W).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(E){ct.setScissorTest(ae=E)},this.setOpaqueSort=function(E){lt=E},this.setTransparentSort=function(E){xt=E},this.getClearColor=function(E){return E.copy(Ot.getClearColor())},this.setClearColor=function(){Ot.setClearColor.apply(Ot,arguments)},this.getClearAlpha=function(){return Ot.getClearAlpha()},this.setClearAlpha=function(){Ot.setClearAlpha.apply(Ot,arguments)},this.clear=function(E=!0,U=!0,F=!0){let z=0;if(E){let N=!1;if(A!==null){let at=A.texture.format;N=at===Mh||at===bh||at===yh}if(N){let at=A.texture.type,mt=at===hi||at===Ki||at===Er||at===Os||at===xh||at===vh,Ct=Ot.getClearColor(),Pt=Ot.getClearAlpha(),Gt=Ct.r,Yt=Ct.g,It=Ct.b;mt?(g[0]=Gt,g[1]=Yt,g[2]=It,g[3]=Pt,P.clearBufferuiv(P.COLOR,0,g)):(x[0]=Gt,x[1]=Yt,x[2]=It,x[3]=Pt,P.clearBufferiv(P.COLOR,0,x))}else z|=P.COLOR_BUFFER_BIT}U&&(z|=P.DEPTH_BUFFER_BIT),F&&(z|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),yt.dispose(),Qt.dispose(),_t.dispose(),b.dispose(),k.dispose(),$.dispose(),ve.dispose(),D.dispose(),Rt.dispose(),q.dispose(),q.removeEventListener("sessionstart",nu),q.removeEventListener("sessionend",iu),Fi.stop()};function K(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;let E=Bt.autoReset,U=Et.enabled,F=Et.autoUpdate,z=Et.needsUpdate,N=Et.type;dt(),Bt.autoReset=E,Et.enabled=U,Et.autoUpdate=F,Et.needsUpdate=z,Et.type=N}function pt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function qt(E){let U=E.target;U.removeEventListener("dispose",qt),Re(U)}function Re(E){He(E),_t.remove(E)}function He(E){let U=_t.get(E).programs;U!==void 0&&(U.forEach(function(F){Rt.releaseProgram(F)}),E.isShaderMaterial&&Rt.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,F,z,N,at){U===null&&(U=ee);let mt=N.isMesh&&N.matrixWorld.determinant()<0,Ct=ap(E,U,F,z,N);ct.setMaterial(z,mt);let Pt=F.index,Gt=1;if(z.wireframe===!0){if(Pt=j.getWireframeAttribute(F),Pt===void 0)return;Gt=2}let Yt=F.drawRange,It=F.attributes.position,ie=Yt.start*Gt,_e=(Yt.start+Yt.count)*Gt;at!==null&&(ie=Math.max(ie,at.start*Gt),_e=Math.min(_e,(at.start+at.count)*Gt)),Pt!==null?(ie=Math.max(ie,0),_e=Math.min(_e,Pt.count)):It!=null&&(ie=Math.max(ie,0),_e=Math.min(_e,It.count));let ye=_e-ie;if(ye<0||ye===1/0)return;ve.setup(N,z,Ct,F,Pt);let Qe,oe=St;if(Pt!==null&&(Qe=Y.get(Pt),oe=te,oe.setIndex(Qe)),N.isMesh)z.wireframe===!0?(ct.setLineWidth(z.wireframeLinewidth*st()),oe.setMode(P.LINES)):oe.setMode(P.TRIANGLES);else if(N.isLine){let Dt=z.linewidth;Dt===void 0&&(Dt=1),ct.setLineWidth(Dt*st()),N.isLineSegments?oe.setMode(P.LINES):N.isLineLoop?oe.setMode(P.LINE_LOOP):oe.setMode(P.LINE_STRIP)}else N.isPoints?oe.setMode(P.POINTS):N.isSprite&&oe.setMode(P.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)oe.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))oe.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{let Dt=N._multiDrawStarts,ti=N._multiDrawCounts,ce=N._multiDrawCount,Mn=Pt?Y.get(Pt).bytesPerElement:1,cs=_t.get(z).currentProgram.getUniforms();for(let cn=0;cn<ce;cn++)cs.setValue(P,"_gl_DrawID",cn),oe.render(Dt[cn]/Mn,ti[cn])}else if(N.isInstancedMesh)oe.renderInstances(ie,ye,N.count);else if(F.isInstancedBufferGeometry){let Dt=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,ti=Math.min(F.instanceCount,Dt);oe.renderInstances(ie,ye,ti)}else oe.render(ie,ye)};function ue(E,U,F){E.transparent===!0&&E.side===Te&&E.forceSinglePass===!1?(E.side=We,E.needsUpdate=!0,Gr(E,U,F),E.side=Pi,E.needsUpdate=!0,Gr(E,U,F),E.side=Te):Gr(E,U,F)}this.compile=function(E,U,F=null){F===null&&(F=E),p=Qt.get(F),p.init(U),_.push(p),F.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),E!==F&&E.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();let z=new Set;return E.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;let at=N.material;if(at)if(Array.isArray(at))for(let mt=0;mt<at.length;mt++){let Ct=at[mt];ue(Ct,F,N),z.add(Ct)}else ue(at,F,N),z.add(at)}),_.pop(),p=null,z},this.compileAsync=function(E,U,F=null){let z=this.compile(E,U,F);return new Promise(N=>{function at(){if(z.forEach(function(mt){_t.get(mt).currentProgram.isReady()&&z.delete(mt)}),z.size===0){N(E);return}setTimeout(at,10)}et.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let bn=null;function jn(E){bn&&bn(E)}function nu(){Fi.stop()}function iu(){Fi.start()}let Fi=new Hf;Fi.setAnimationLoop(jn),typeof self<"u"&&Fi.setContext(self),this.setAnimationLoop=function(E){bn=E,q.setAnimationLoop(E),E===null?Fi.stop():Fi.start()},q.addEventListener("sessionstart",nu),q.addEventListener("sessionend",iu),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(U),U=q.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,U,A),p=Qt.get(E,_.length),p.init(U),_.push(p),kt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Z.setFromProjectionMatrix(kt),At=this.localClippingEnabled,rt=it.init(this.clippingPlanes,At),m=yt.get(E,y.length),m.init(),y.push(m),q.enabled===!0&&q.isPresenting===!0){let at=v.xr.getDepthSensingMesh();at!==null&&tc(at,U,-1/0,v.sortObjects)}tc(E,U,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(lt,xt),Q=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Q&&Ot.addToRenderList(m,E),this.info.render.frame++,rt===!0&&it.beginShadows();let F=p.state.shadowsArray;Et.render(F,E,U),rt===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();let z=m.opaque,N=m.transmissive;if(p.setupLights(),U.isArrayCamera){let at=U.cameras;if(N.length>0)for(let mt=0,Ct=at.length;mt<Ct;mt++){let Pt=at[mt];ru(z,N,E,Pt)}Q&&Ot.render(E);for(let mt=0,Ct=at.length;mt<Ct;mt++){let Pt=at[mt];su(m,E,Pt,Pt.viewport)}}else N.length>0&&ru(z,N,E,U),Q&&Ot.render(E),su(m,E,U);A!==null&&(w.updateMultisampleRenderTarget(A),w.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(v,E,U),ve.resetDefaultState(),S=-1,M=null,_.pop(),_.length>0?(p=_[_.length-1],rt===!0&&it.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function tc(E,U,F,z){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)F=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Z.intersectsSprite(E)){z&&Ft.setFromMatrixPosition(E.matrixWorld).applyMatrix4(kt);let mt=$.update(E),Ct=E.material;Ct.visible&&m.push(E,mt,Ct,F,Ft.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Z.intersectsObject(E))){let mt=$.update(E),Ct=E.material;if(z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ft.copy(E.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),Ft.copy(mt.boundingSphere.center)),Ft.applyMatrix4(E.matrixWorld).applyMatrix4(kt)),Array.isArray(Ct)){let Pt=mt.groups;for(let Gt=0,Yt=Pt.length;Gt<Yt;Gt++){let It=Pt[Gt],ie=Ct[It.materialIndex];ie&&ie.visible&&m.push(E,mt,ie,F,Ft.z,It)}}else Ct.visible&&m.push(E,mt,Ct,F,Ft.z,null)}}let at=E.children;for(let mt=0,Ct=at.length;mt<Ct;mt++)tc(at[mt],U,F,z)}function su(E,U,F,z){let N=E.opaque,at=E.transmissive,mt=E.transparent;p.setupLightsView(F),rt===!0&&it.setGlobalState(v.clippingPlanes,F),z&&ct.viewport(I.copy(z)),N.length>0&&Vr(N,U,F),at.length>0&&Vr(at,U,F),mt.length>0&&Vr(mt,U,F),ct.buffers.depth.setTest(!0),ct.buffers.depth.setMask(!0),ct.buffers.color.setMask(!0),ct.setPolygonOffset(!1)}function ru(E,U,F,z){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new Ze(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?In:hi,minFilter:Ji,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));let at=p.state.transmissionRenderTarget[z.id],mt=z.viewport||I;at.setSize(mt.z,mt.w);let Ct=v.getRenderTarget();v.setRenderTarget(at),v.getClearColor(V),J=v.getClearAlpha(),J<1&&v.setClearColor(16777215,.5),v.clear(),Q&&Ot.render(F);let Pt=v.toneMapping;v.toneMapping=Ci;let Gt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),rt===!0&&it.setGlobalState(v.clippingPlanes,z),Vr(E,F,z),w.updateMultisampleRenderTarget(at),w.updateRenderTargetMipmap(at),et.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let It=0,ie=U.length;It<ie;It++){let _e=U[It],ye=_e.object,Qe=_e.geometry,oe=_e.material,Dt=_e.group;if(oe.side===Te&&ye.layers.test(z.layers)){let ti=oe.side;oe.side=We,oe.needsUpdate=!0,au(ye,F,z,Qe,oe,Dt),oe.side=ti,oe.needsUpdate=!0,Yt=!0}}Yt===!0&&(w.updateMultisampleRenderTarget(at),w.updateRenderTargetMipmap(at))}v.setRenderTarget(Ct),v.setClearColor(V,J),Gt!==void 0&&(z.viewport=Gt),v.toneMapping=Pt}function Vr(E,U,F){let z=U.isScene===!0?U.overrideMaterial:null;for(let N=0,at=E.length;N<at;N++){let mt=E[N],Ct=mt.object,Pt=mt.geometry,Gt=z===null?mt.material:z,Yt=mt.group;Ct.layers.test(F.layers)&&au(Ct,U,F,Pt,Gt,Yt)}}function au(E,U,F,z,N,at){E.onBeforeRender(v,U,F,z,N,at),E.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),N.onBeforeRender(v,U,F,z,E,at),N.transparent===!0&&N.side===Te&&N.forceSinglePass===!1?(N.side=We,N.needsUpdate=!0,v.renderBufferDirect(F,U,z,N,E,at),N.side=Pi,N.needsUpdate=!0,v.renderBufferDirect(F,U,z,N,E,at),N.side=Te):v.renderBufferDirect(F,U,z,N,E,at),E.onAfterRender(v,U,F,z,N,at)}function Gr(E,U,F){U.isScene!==!0&&(U=ee);let z=_t.get(E),N=p.state.lights,at=p.state.shadowsArray,mt=N.state.version,Ct=Rt.getParameters(E,N.state,at,U,F),Pt=Rt.getProgramCacheKey(Ct),Gt=z.programs;z.environment=E.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(E.isMeshStandardMaterial?k:b).get(E.envMap||z.environment),z.envMapRotation=z.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Gt===void 0&&(E.addEventListener("dispose",qt),Gt=new Map,z.programs=Gt);let Yt=Gt.get(Pt);if(Yt!==void 0){if(z.currentProgram===Yt&&z.lightsStateVersion===mt)return cu(E,Ct),Yt}else Ct.uniforms=Rt.getUniforms(E),E.onBeforeCompile(Ct,v),Yt=Rt.acquireProgram(Ct,Pt),Gt.set(Pt,Yt),z.uniforms=Ct.uniforms;let It=z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(It.clippingPlanes=it.uniform),cu(E,Ct),z.needsLights=cp(E),z.lightsStateVersion=mt,z.needsLights&&(It.ambientLightColor.value=N.state.ambient,It.lightProbe.value=N.state.probe,It.directionalLights.value=N.state.directional,It.directionalLightShadows.value=N.state.directionalShadow,It.spotLights.value=N.state.spot,It.spotLightShadows.value=N.state.spotShadow,It.rectAreaLights.value=N.state.rectArea,It.ltc_1.value=N.state.rectAreaLTC1,It.ltc_2.value=N.state.rectAreaLTC2,It.pointLights.value=N.state.point,It.pointLightShadows.value=N.state.pointShadow,It.hemisphereLights.value=N.state.hemi,It.directionalShadowMap.value=N.state.directionalShadowMap,It.directionalShadowMatrix.value=N.state.directionalShadowMatrix,It.spotShadowMap.value=N.state.spotShadowMap,It.spotLightMatrix.value=N.state.spotLightMatrix,It.spotLightMap.value=N.state.spotLightMap,It.pointShadowMap.value=N.state.pointShadowMap,It.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=Yt,z.uniformsList=null,Yt}function ou(E){if(E.uniformsList===null){let U=E.currentProgram.getUniforms();E.uniformsList=Ds.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function cu(E,U){let F=_t.get(E);F.outputColorSpace=U.outputColorSpace,F.batching=U.batching,F.batchingColor=U.batchingColor,F.instancing=U.instancing,F.instancingColor=U.instancingColor,F.instancingMorph=U.instancingMorph,F.skinning=U.skinning,F.morphTargets=U.morphTargets,F.morphNormals=U.morphNormals,F.morphColors=U.morphColors,F.morphTargetsCount=U.morphTargetsCount,F.numClippingPlanes=U.numClippingPlanes,F.numIntersection=U.numClipIntersection,F.vertexAlphas=U.vertexAlphas,F.vertexTangents=U.vertexTangents,F.toneMapping=U.toneMapping}function ap(E,U,F,z,N){U.isScene!==!0&&(U=ee),w.resetTextureUnits();let at=U.fog,mt=z.isMeshStandardMaterial?U.environment:null,Ct=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:qs,Pt=(z.isMeshStandardMaterial?k:b).get(z.envMap||mt),Gt=z.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Yt=!!F.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),It=!!F.morphAttributes.position,ie=!!F.morphAttributes.normal,_e=!!F.morphAttributes.color,ye=Ci;z.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ye=v.toneMapping);let Qe=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,oe=Qe!==void 0?Qe.length:0,Dt=_t.get(z),ti=p.state.lights;if(rt===!0&&(At===!0||E!==M)){let gn=E===M&&z.id===S;it.setState(z,E,gn)}let ce=!1;z.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==ti.state.version||Dt.outputColorSpace!==Ct||N.isBatchedMesh&&Dt.batching===!1||!N.isBatchedMesh&&Dt.batching===!0||N.isBatchedMesh&&Dt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Dt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Dt.instancing===!1||!N.isInstancedMesh&&Dt.instancing===!0||N.isSkinnedMesh&&Dt.skinning===!1||!N.isSkinnedMesh&&Dt.skinning===!0||N.isInstancedMesh&&Dt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Dt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Dt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Dt.instancingMorph===!1&&N.morphTexture!==null||Dt.envMap!==Pt||z.fog===!0&&Dt.fog!==at||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==it.numPlanes||Dt.numIntersection!==it.numIntersection)||Dt.vertexAlphas!==Gt||Dt.vertexTangents!==Yt||Dt.morphTargets!==It||Dt.morphNormals!==ie||Dt.morphColors!==_e||Dt.toneMapping!==ye||Dt.morphTargetsCount!==oe)&&(ce=!0):(ce=!0,Dt.__version=z.version);let Mn=Dt.currentProgram;ce===!0&&(Mn=Gr(z,U,N));let cs=!1,cn=!1,ir=!1,be=Mn.getUniforms(),Bn=Dt.uniforms;if(ct.useProgram(Mn.program)&&(cs=!0,cn=!0,ir=!0),z.id!==S&&(S=z.id,cn=!0),cs||M!==E){ct.buffers.depth.getReversed()?(ot.copy(E.projectionMatrix),lm(ot),hm(ot),be.setValue(P,"projectionMatrix",ot)):be.setValue(P,"projectionMatrix",E.projectionMatrix),be.setValue(P,"viewMatrix",E.matrixWorldInverse);let _i=be.map.cameraPosition;_i!==void 0&&_i.setValue(P,Vt.setFromMatrixPosition(E.matrixWorld)),bt.logarithmicDepthBuffer&&be.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&be.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,cn=!0,ir=!0)}if(N.isSkinnedMesh){be.setOptional(P,N,"bindMatrix"),be.setOptional(P,N,"bindMatrixInverse");let gn=N.skeleton;gn&&(gn.boneTexture===null&&gn.computeBoneTexture(),be.setValue(P,"boneTexture",gn.boneTexture,w))}N.isBatchedMesh&&(be.setOptional(P,N,"batchingTexture"),be.setValue(P,"batchingTexture",N._matricesTexture,w),be.setOptional(P,N,"batchingIdTexture"),be.setValue(P,"batchingIdTexture",N._indirectTexture,w),be.setOptional(P,N,"batchingColorTexture"),N._colorsTexture!==null&&be.setValue(P,"batchingColorTexture",N._colorsTexture,w));let sr=F.morphAttributes;if((sr.position!==void 0||sr.normal!==void 0||sr.color!==void 0)&&Ht.update(N,F,Mn),(cn||Dt.receiveShadow!==N.receiveShadow)&&(Dt.receiveShadow=N.receiveShadow,be.setValue(P,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Bn.envMap.value=Pt,Bn.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(Bn.envMapIntensity.value=U.environmentIntensity),cn&&(be.setValue(P,"toneMappingExposure",v.toneMappingExposure),Dt.needsLights&&op(Bn,ir),at&&z.fog===!0&&ft.refreshFogUniforms(Bn,at),ft.refreshMaterialUniforms(Bn,z,W,nt,p.state.transmissionRenderTarget[E.id]),Ds.upload(P,ou(Dt),Bn,w)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ds.upload(P,ou(Dt),Bn,w),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&be.setValue(P,"center",N.center),be.setValue(P,"modelViewMatrix",N.modelViewMatrix),be.setValue(P,"normalMatrix",N.normalMatrix),be.setValue(P,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let gn=z.uniformsGroups;for(let _i=0,yi=gn.length;_i<yi;_i++){let lu=gn[_i];D.update(lu,Mn),D.bind(lu,Mn)}}return Mn}function op(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function cp(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,U,F){_t.get(E.texture).__webglTexture=U,_t.get(E.depthTexture).__webglTexture=F;let z=_t.get(E);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=F===void 0,z.__autoAllocateDepthBuffer||et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,U){let F=_t.get(E);F.__webglFramebuffer=U,F.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,F=0){A=E,R=U,C=F;let z=!0,N=null,at=!1,mt=!1;if(E){let Pt=_t.get(E);if(Pt.__useDefaultFramebuffer!==void 0)ct.bindFramebuffer(P.FRAMEBUFFER,null),z=!1;else if(Pt.__webglFramebuffer===void 0)w.setupRenderTarget(E);else if(Pt.__hasExternalTextures)w.rebindTextures(E,_t.get(E.texture).__webglTexture,_t.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let It=E.depthTexture;if(Pt.__boundDepthTexture!==It){if(It!==null&&_t.has(It)&&(E.width!==It.image.width||E.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(E)}}let Gt=E.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(mt=!0);let Yt=_t.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Yt[U])?N=Yt[U][F]:N=Yt[U],at=!0):E.samples>0&&w.useMultisampledRTT(E)===!1?N=_t.get(E).__webglMultisampledFramebuffer:Array.isArray(Yt)?N=Yt[F]:N=Yt,I.copy(E.viewport),H.copy(E.scissor),B=E.scissorTest}else I.copy(Tt).multiplyScalar(W).floor(),H.copy(Xt).multiplyScalar(W).floor(),B=ae;if(ct.bindFramebuffer(P.FRAMEBUFFER,N)&&z&&ct.drawBuffers(E,N),ct.viewport(I),ct.scissor(H),ct.setScissorTest(B),at){let Pt=_t.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+U,Pt.__webglTexture,F)}else if(mt){let Pt=_t.get(E.texture),Gt=U||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Pt.__webglTexture,F||0,Gt)}S=-1},this.readRenderTargetPixels=function(E,U,F,z,N,at,mt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=_t.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&mt!==void 0&&(Ct=Ct[mt]),Ct){ct.bindFramebuffer(P.FRAMEBUFFER,Ct);try{let Pt=E.texture,Gt=Pt.format,Yt=Pt.type;if(!bt.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!bt.textureTypeReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-z&&F>=0&&F<=E.height-N&&P.readPixels(U,F,z,N,Zt.convert(Gt),Zt.convert(Yt),at)}finally{let Pt=A!==null?_t.get(A).__webglFramebuffer:null;ct.bindFramebuffer(P.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(E,U,F,z,N,at,mt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=_t.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&mt!==void 0&&(Ct=Ct[mt]),Ct){let Pt=E.texture,Gt=Pt.format,Yt=Pt.type;if(!bt.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!bt.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=E.width-z&&F>=0&&F<=E.height-N){ct.bindFramebuffer(P.FRAMEBUFFER,Ct);let It=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,It),P.bufferData(P.PIXEL_PACK_BUFFER,at.byteLength,P.STREAM_READ),P.readPixels(U,F,z,N,Zt.convert(Gt),Zt.convert(Yt),0);let ie=A!==null?_t.get(A).__webglFramebuffer:null;ct.bindFramebuffer(P.FRAMEBUFFER,ie);let _e=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await cm(P,_e,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,It),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,at),P.deleteBuffer(It),P.deleteSync(_e),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,U=null,F=0){E.isTexture!==!0&&(mr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,E=arguments[1]);let z=Math.pow(2,-F),N=Math.floor(E.image.width*z),at=Math.floor(E.image.height*z),mt=U!==null?U.x:0,Ct=U!==null?U.y:0;w.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,F,0,0,mt,Ct,N,at),ct.unbindTexture()},this.copyTextureToTexture=function(E,U,F=null,z=null,N=0){E.isTexture!==!0&&(mr("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,E=arguments[1],U=arguments[2],N=arguments[3]||0,F=null);let at,mt,Ct,Pt,Gt,Yt,It,ie,_e,ye=E.isCompressedTexture?E.mipmaps[N]:E.image;F!==null?(at=F.max.x-F.min.x,mt=F.max.y-F.min.y,Ct=F.isBox3?F.max.z-F.min.z:1,Pt=F.min.x,Gt=F.min.y,Yt=F.isBox3?F.min.z:0):(at=ye.width,mt=ye.height,Ct=ye.depth||1,Pt=0,Gt=0,Yt=0),z!==null?(It=z.x,ie=z.y,_e=z.z):(It=0,ie=0,_e=0);let Qe=Zt.convert(U.format),oe=Zt.convert(U.type),Dt;U.isData3DTexture?(w.setTexture3D(U,0),Dt=P.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(w.setTexture2DArray(U,0),Dt=P.TEXTURE_2D_ARRAY):(w.setTexture2D(U,0),Dt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,U.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,U.unpackAlignment);let ti=P.getParameter(P.UNPACK_ROW_LENGTH),ce=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Mn=P.getParameter(P.UNPACK_SKIP_PIXELS),cs=P.getParameter(P.UNPACK_SKIP_ROWS),cn=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ye.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ye.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Pt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Gt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Yt);let ir=E.isDataArrayTexture||E.isData3DTexture,be=U.isDataArrayTexture||U.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){let Bn=_t.get(E),sr=_t.get(U),gn=_t.get(Bn.__renderTarget),_i=_t.get(sr.__renderTarget);ct.bindFramebuffer(P.READ_FRAMEBUFFER,gn.__webglFramebuffer),ct.bindFramebuffer(P.DRAW_FRAMEBUFFER,_i.__webglFramebuffer);for(let yi=0;yi<Ct;yi++)ir&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_t.get(E).__webglTexture,N,Yt+yi),E.isDepthTexture?(be&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_t.get(U).__webglTexture,N,_e+yi),P.blitFramebuffer(Pt,Gt,at,mt,It,ie,at,mt,P.DEPTH_BUFFER_BIT,P.NEAREST)):be?P.copyTexSubImage3D(Dt,N,It,ie,_e+yi,Pt,Gt,at,mt):P.copyTexSubImage2D(Dt,N,It,ie,_e+yi,Pt,Gt,at,mt);ct.bindFramebuffer(P.READ_FRAMEBUFFER,null),ct.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else be?E.isDataTexture||E.isData3DTexture?P.texSubImage3D(Dt,N,It,ie,_e,at,mt,Ct,Qe,oe,ye.data):U.isCompressedArrayTexture?P.compressedTexSubImage3D(Dt,N,It,ie,_e,at,mt,Ct,Qe,ye.data):P.texSubImage3D(Dt,N,It,ie,_e,at,mt,Ct,Qe,oe,ye):E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,N,It,ie,at,mt,Qe,oe,ye.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,N,It,ie,ye.width,ye.height,Qe,ye.data):P.texSubImage2D(P.TEXTURE_2D,N,It,ie,at,mt,Qe,oe,ye);P.pixelStorei(P.UNPACK_ROW_LENGTH,ti),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ce),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Mn),P.pixelStorei(P.UNPACK_SKIP_ROWS,cs),P.pixelStorei(P.UNPACK_SKIP_IMAGES,cn),N===0&&U.generateMipmaps&&P.generateMipmap(Dt),ct.unbindTexture()},this.copyTextureToTexture3D=function(E,U,F=null,z=null,N=0){return E.isTexture!==!0&&(mr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,z=arguments[1]||null,E=arguments[2],U=arguments[3],N=arguments[4]||0),mr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,U,F,z,N)},this.initRenderTarget=function(E){_t.get(E).__webglFramebuffer===void 0&&w.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?w.setTextureCube(E,0):E.isData3DTexture?w.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?w.setTexture2DArray(E,0):w.setTexture2D(E,0),ct.unbindTexture()},this.resetState=function(){R=0,C=0,A=null,ct.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}};var za=class s{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Mt(t),this.near=e,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ha=class extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xe,this.environmentIntensity=1,this.environmentRotation=new Xe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Bl=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=yl,this.updateRanges=[],this.version=0,this.uuid=Vn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ye=new T,Va=class s{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix4(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyNormalMatrix(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.transformDirection(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=wn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=fe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=wn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=wn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=wn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=wn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),i=fe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),i=fe(i,this.array),r=fe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Be(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Tr=class extends fi{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Mt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Es,lr=new T,Ss=new T,Ts=new T,ws=new tt,hr=new tt,qf=new zt,ua=new T,ur=new T,fa=new T,hf=new tt,Cc=new tt,uf=new tt,Ga=class extends De{constructor(t=new Tr){if(super(),this.isSprite=!0,this.type="Sprite",Es===void 0){Es=new Ae;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Bl(e,5);Es.setIndex([0,1,2,0,2,3]),Es.setAttribute("position",new Va(n,3,0,!1)),Es.setAttribute("uv",new Va(n,2,3,!1))}this.geometry=Es,this.material=t,this.center=new tt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ss.setFromMatrixScale(this.matrixWorld),qf.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ts.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ss.multiplyScalar(-Ts.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;da(ua.set(-.5,-.5,0),Ts,a,Ss,i,r),da(ur.set(.5,-.5,0),Ts,a,Ss,i,r),da(fa.set(.5,.5,0),Ts,a,Ss,i,r),hf.set(0,0),Cc.set(1,0),uf.set(1,1);let o=t.ray.intersectTriangle(ua,ur,fa,!1,lr);if(o===null&&(da(ur.set(-.5,.5,0),Ts,a,Ss,i,r),Cc.set(0,1),o=t.ray.intersectTriangle(ua,fa,ur,!1,lr),o===null))return;let c=t.ray.origin.distanceTo(lr);c<t.near||c>t.far||e.push({distance:c,point:lr.clone(),uv:Ri.getInterpolation(lr,ua,ur,fa,hf,Cc,uf,new tt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function da(s,t,e,n,i,r){ws.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(hr.x=r*ws.x-i*ws.y,hr.y=i*ws.x+r*ws.y):hr.copy(ws),s.copy(t),s.x+=hr.x,s.y+=hr.y,s.applyMatrix4(qf)}var Ol=class extends tn{constructor(t=null,e=1,n=1,i,r,a,o,c,l=un,h=un,u,f){super(null,a,o,c,l,h,i,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Wa=class extends Be{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},As=new zt,ff=new zt,pa=[],df=new ui,i_=new zt,fr=new wt,dr=new Li,Je=class extends wt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Wa(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,i_)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ui),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,As),df.copy(t.boundingBox).applyMatrix4(As),this.boundingBox.union(df)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Li),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,As),dr.copy(t.boundingSphere).applyMatrix4(As),this.boundingSphere.union(dr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(fr.geometry=this.geometry,fr.material=this.material,fr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),dr.copy(this.boundingSphere),dr.applyMatrix4(n),t.ray.intersectsSphere(dr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,As),ff.multiplyMatrices(n,As),fr.matrixWorld=ff,fr.raycast(t,pa);for(let a=0,o=pa.length;a<o;a++){let c=pa[a];c.instanceId=r,c.object=this,e.push(c)}pa.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Wa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ol(new Float32Array(i*this.count),i,this.count,_h,zn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Fl=class extends fi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Mt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},pf=new zt,zl=new Ia,ma=new Li,ga=new T,Xa=class extends De{constructor(t=new Ae,e=new Fl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(i),ma.radius+=r,t.ray.intersectsSphere(ma)===!1)return;pf.copy(i).invert(),zl.copy(t.ray).applyMatrix4(pf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let g=f,x=d;g<x;g++){let m=l.getX(g);ga.fromBufferAttribute(u,m),mf(ga,m,c,i,t,e,this)}}else{let f=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let g=f,x=d;g<x;g++)ga.fromBufferAttribute(u,g),mf(ga,g,c,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function mf(s,t,e,n,i,r,a){let o=zl.distanceSqToPoint(s);if(o<e){let c=new T;zl.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var nn=class extends tn{constructor(t,e,n,i,r,a,o,c,l){super(t,e,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},vn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(r-1);let h=n[i],f=n[i+1]-h,d=(a-h)/f;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),c=e||(a.isVector2?new tt:new T);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new T,i=[],r=[],a=[],o=new T,c=new zt;for(let d=0;d<=t;d++){let g=d/t;i[d]=this.getTangentAt(g,new T)}r[0]=new T,a[0]=new T;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Fe(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(o,g))}a[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(Fe(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],d*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},wr=class extends vn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new tt){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Hl=class extends wr{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Th(){let s=0,t=0,e=0,n=0;function i(r,a,o,c){s=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){i(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let f=(a-r)/l-(o-r)/(l+h)+(o-a)/h,d=(o-a)/h-(c-a)/(h+u)+(c-o)/u;f*=h,d*=h,i(a,o,f,d)},calc:function(r){let a=r*r,o=a*r;return s+t*r+e*a+n*o}}}var xa=new T,Pc=new Th,Ic=new Th,Lc=new Th,Vl=class extends vn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new T){let n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%r]:(xa.subVectors(i[0],i[1]).add(i[0]),l=xa);let u=i[o%r],f=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(xa.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=xa),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Pc.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,x,m),Ic.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,x,m),Lc.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(Pc.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Ic.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Lc.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(Pc.calc(c),Ic.calc(c),Lc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new T().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function gf(s,t,e,n,i){let r=(n-t)*.5,a=(i-e)*.5,o=s*s,c=s*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*s+e}function s_(s,t){let e=1-s;return e*e*t}function r_(s,t){return 2*(1-s)*s*t}function a_(s,t){return s*s*t}function yr(s,t,e,n){return s_(s,t)+r_(s,e)+a_(s,n)}function o_(s,t){let e=1-s;return e*e*e*t}function c_(s,t){let e=1-s;return 3*e*e*s*t}function l_(s,t){return 3*(1-s)*s*s*t}function h_(s,t){return s*s*s*t}function br(s,t,e,n,i){return o_(s,t)+c_(s,e)+l_(s,n)+h_(s,i)}var qa=class extends vn{constructor(t=new tt,e=new tt,n=new tt,i=new tt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new tt){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(br(t,i.x,r.x,a.x,o.x),br(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Gl=class extends vn{constructor(t=new T,e=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new T){let n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(br(t,i.x,r.x,a.x,o.x),br(t,i.y,r.y,a.y,o.y),br(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ya=class extends vn{constructor(t=new tt,e=new tt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new tt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new tt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wl=class extends vn{constructor(t=new T,e=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new T){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new T){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},$a=class extends vn{constructor(t=new tt,e=new tt,n=new tt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new tt){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(yr(t,i.x,r.x,a.x),yr(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xl=class extends vn{constructor(t=new T,e=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new T){let n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(yr(t,i.x,r.x,a.x),yr(t,i.y,r.y,a.y),yr(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Za=class extends vn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new tt){let n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(gf(o,c.x,l.x,h.x,u.x),gf(o,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new tt().fromArray(i))}return this}},ql=Object.freeze({__proto__:null,ArcCurve:Hl,CatmullRomCurve3:Vl,CubicBezierCurve:qa,CubicBezierCurve3:Gl,EllipseCurve:wr,LineCurve:Ya,LineCurve3:Wl,QuadraticBezierCurve:$a,QuadraticBezierCurve3:Xl,SplineCurve:Za}),Yl=class extends vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ql[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new ql[i.type]().fromJSON(i))}return this}},Ja=class extends Yl{constructor(t){super(),this.type="Path",this.currentPoint=new tt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Ya(this.currentPoint.clone(),new tt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new $a(this.currentPoint.clone(),new tt(t,e),new tt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){let o=new qa(this.currentPoint.clone(),new tt(t,e),new tt(n,i),new tt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Za(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,r,a,o,c),this}absellipse(t,e,n,i,r,a,o,c){let l=new wr(t,e,n,i,r,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}};var Rn=class s extends Ae{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);let r=[],a=[],o=[],c=[],l=new T,h=new tt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let d=n+u/e*i;l.x=t*Math.cos(d),l.y=t*Math.sin(d),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Kt(a,3)),this.setAttribute("normal",new Kt(o,3)),this.setAttribute("uv",new Kt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ne=class s extends Ae{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],f=[],d=[],g=0,x=[],m=n/2,p=0;y(),a===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Kt(u,3)),this.setAttribute("normal",new Kt(f,3)),this.setAttribute("uv",new Kt(d,2));function y(){let v=new T,L=new T,R=0,C=(e-t)/n;for(let A=0;A<=r;A++){let S=[],M=A/r,I=M*(e-t)+t;for(let H=0;H<=i;H++){let B=H/i,V=B*c+o,J=Math.sin(V),G=Math.cos(V);L.x=I*J,L.y=-M*n+m,L.z=I*G,u.push(L.x,L.y,L.z),v.set(J,C,G).normalize(),f.push(v.x,v.y,v.z),d.push(B,1-M),S.push(g++)}x.push(S)}for(let A=0;A<i;A++)for(let S=0;S<r;S++){let M=x[S][A],I=x[S+1][A],H=x[S+1][A+1],B=x[S][A+1];(t>0||S!==0)&&(h.push(M,I,B),R+=3),(e>0||S!==r-1)&&(h.push(I,H,B),R+=3)}l.addGroup(p,R,0),p+=R}function _(v){let L=g,R=new tt,C=new T,A=0,S=v===!0?t:e,M=v===!0?1:-1;for(let H=1;H<=i;H++)u.push(0,m*M,0),f.push(0,M,0),d.push(.5,.5),g++;let I=g;for(let H=0;H<=i;H++){let V=H/i*c+o,J=Math.cos(V),G=Math.sin(V);C.x=S*G,C.y=m*M,C.z=S*J,u.push(C.x,C.y,C.z),f.push(0,M,0),R.x=J*.5+.5,R.y=G*.5*M+.5,d.push(R.x,R.y),g++}for(let H=0;H<i;H++){let B=L+H,V=I+H;v===!0?h.push(V,V+1,B):h.push(V+1,V,B),A+=3}l.addGroup(p,A,v===!0?1:2),p+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Di=class s extends ne{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ka=class s extends Ae{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let r=[],a=[];o(i),l(n),h(),this.setAttribute("position",new Kt(r,3)),this.setAttribute("normal",new Kt(r.slice(),3)),this.setAttribute("uv",new Kt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(y){let _=new T,v=new T,L=new T;for(let R=0;R<e.length;R+=3)d(e[R+0],_),d(e[R+1],v),d(e[R+2],L),c(_,v,L,y)}function c(y,_,v,L){let R=L+1,C=[];for(let A=0;A<=R;A++){C[A]=[];let S=y.clone().lerp(v,A/R),M=_.clone().lerp(v,A/R),I=R-A;for(let H=0;H<=I;H++)H===0&&A===R?C[A][H]=S:C[A][H]=S.clone().lerp(M,H/I)}for(let A=0;A<R;A++)for(let S=0;S<2*(R-A)-1;S++){let M=Math.floor(S/2);S%2===0?(f(C[A][M+1]),f(C[A+1][M]),f(C[A][M])):(f(C[A][M+1]),f(C[A+1][M+1]),f(C[A+1][M]))}}function l(y){let _=new T;for(let v=0;v<r.length;v+=3)_.x=r[v+0],_.y=r[v+1],_.z=r[v+2],_.normalize().multiplyScalar(y),r[v+0]=_.x,r[v+1]=_.y,r[v+2]=_.z}function h(){let y=new T;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];let v=m(y)/2/Math.PI+.5,L=p(y)/Math.PI+.5;a.push(v,1-L)}g(),u()}function u(){for(let y=0;y<a.length;y+=6){let _=a[y+0],v=a[y+2],L=a[y+4],R=Math.max(_,v,L),C=Math.min(_,v,L);R>.9&&C<.1&&(_<.2&&(a[y+0]+=1),v<.2&&(a[y+2]+=1),L<.2&&(a[y+4]+=1))}}function f(y){r.push(y.x,y.y,y.z)}function d(y,_){let v=y*3;_.x=t[v+0],_.y=t[v+1],_.z=t[v+2]}function g(){let y=new T,_=new T,v=new T,L=new T,R=new tt,C=new tt,A=new tt;for(let S=0,M=0;S<r.length;S+=9,M+=6){y.set(r[S+0],r[S+1],r[S+2]),_.set(r[S+3],r[S+4],r[S+5]),v.set(r[S+6],r[S+7],r[S+8]),R.set(a[M+0],a[M+1]),C.set(a[M+2],a[M+3]),A.set(a[M+4],a[M+5]),L.copy(y).add(_).add(v).divideScalar(3);let I=m(L);x(R,M+0,y,I),x(C,M+2,_,I),x(A,M+4,v,I)}}function x(y,_,v,L){L<0&&y.x===1&&(a[_]=y.x-1),v.x===0&&v.z===0&&(a[_]=L/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.details)}};var Ar=class extends Ja{constructor(t){super(t),this.uuid=Vn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new Ja().fromJSON(i))}return this}},u_={triangulate:function(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=Yf(s,0,i,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l,h,u,f,d;if(n&&(r=g_(s,t,r,e)),s.length>80*e){o=l=s[0],c=h=s[1];for(let g=e;g<i;g+=e)u=s[g],f=s[g+1],u<o&&(o=u),f<c&&(c=f),u>l&&(l=u),f>h&&(h=f);d=Math.max(l-o,h-c),d=d!==0?32767/d:0}return Rr(r,a,e,o,c,d,0),a}};function Yf(s,t,e,n,i){let r,a;if(i===A_(s,t,e,n)>0)for(r=t;r<e;r+=n)a=xf(r,s[r],s[r+1],a);else for(r=e-n;r>=t;r-=n)a=xf(r,s[r],s[r+1],a);return a&&lo(a,a.next)&&(Pr(a),a=a.next),a}function Qi(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(lo(e,e.next)||we(e.prev,e,e.next)===0)){if(Pr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Rr(s,t,e,n,i,r,a){if(!s)return;!a&&r&&b_(s,n,i,r);let o=s,c,l;for(;s.prev!==s.next;){if(c=s.prev,l=s.next,r?d_(s,n,i,r):f_(s)){t.push(c.i/e|0),t.push(s.i/e|0),t.push(l.i/e|0),Pr(s),s=l.next,o=l.next;continue}if(s=l,s===o){a?a===1?(s=p_(Qi(s),t,e),Rr(s,t,e,n,i,r,2)):a===2&&m_(s,t,e,n,i,r):Rr(Qi(s),t,e,n,i,r,1);break}}}function f_(s){let t=s.prev,e=s,n=s.next;if(we(t,e,n)>=0)return!1;let i=t.x,r=e.x,a=n.x,o=t.y,c=e.y,l=n.y,h=i<r?i<a?i:a:r<a?r:a,u=o<c?o<l?o:l:c<l?c:l,f=i>r?i>a?i:a:r>a?r:a,d=o>c?o>l?o:l:c>l?c:l,g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Cs(i,o,r,c,a,l,g.x,g.y)&&we(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function d_(s,t,e,n){let i=s.prev,r=s,a=s.next;if(we(i,r,a)>=0)return!1;let o=i.x,c=r.x,l=a.x,h=i.y,u=r.y,f=a.y,d=o<c?o<l?o:l:c<l?c:l,g=h<u?h<f?h:f:u<f?u:f,x=o>c?o>l?o:l:c>l?c:l,m=h>u?h>f?h:f:u>f?u:f,p=$l(d,g,t,e,n),y=$l(x,m,t,e,n),_=s.prevZ,v=s.nextZ;for(;_&&_.z>=p&&v&&v.z<=y;){if(_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==i&&_!==a&&Cs(o,h,c,u,l,f,_.x,_.y)&&we(_.prev,_,_.next)>=0||(_=_.prevZ,v.x>=d&&v.x<=x&&v.y>=g&&v.y<=m&&v!==i&&v!==a&&Cs(o,h,c,u,l,f,v.x,v.y)&&we(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;_&&_.z>=p;){if(_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==i&&_!==a&&Cs(o,h,c,u,l,f,_.x,_.y)&&we(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;v&&v.z<=y;){if(v.x>=d&&v.x<=x&&v.y>=g&&v.y<=m&&v!==i&&v!==a&&Cs(o,h,c,u,l,f,v.x,v.y)&&we(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function p_(s,t,e){let n=s;do{let i=n.prev,r=n.next.next;!lo(i,r)&&$f(i,n,n.next,r)&&Cr(i,r)&&Cr(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Pr(n),Pr(n.next),n=s=r),n=n.next}while(n!==s);return Qi(n)}function m_(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&S_(a,o)){let c=Zf(a,o);a=Qi(a,a.next),c=Qi(c,c.next),Rr(a,t,e,n,i,r,0),Rr(c,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function g_(s,t,e,n){let i=[],r,a,o,c,l;for(r=0,a=t.length;r<a;r++)o=t[r]*n,c=r<a-1?t[r+1]*n:s.length,l=Yf(s,o,c,n,!1),l===l.next&&(l.steiner=!0),i.push(E_(l));for(i.sort(x_),r=0;r<i.length;r++)e=v_(i[r],e);return e}function x_(s,t){return s.x-t.x}function v_(s,t){let e=__(s,t);if(!e)return t;let n=Zf(e,s);return Qi(n,n.next),Qi(e,e.next)}function __(s,t){let e=t,n=-1/0,i,r=s.x,a=s.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){let f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,i=e.x<e.next.x?e:e.next,f===r))return i}e=e.next}while(e!==t);if(!i)return null;let o=i,c=i.x,l=i.y,h=1/0,u;e=i;do r>=e.x&&e.x>=c&&r!==e.x&&Cs(a<l?r:n,a,c,l,a<l?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),Cr(e,s)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&y_(i,e)))&&(i=e,h=u)),e=e.next;while(e!==o);return i}function y_(s,t){return we(s.prev,s,t.prev)<0&&we(t.next,s,s.next)<0}function b_(s,t,e,n){let i=s;do i.z===0&&(i.z=$l(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,M_(i)}function M_(s){let t,e,n,i,r,a,o,c,l=1;do{for(e=s,s=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<l&&(o++,n=n.nextZ,!!n);t++);for(c=l;o>0||c>0&&n;)o!==0&&(c===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,o--):(i=n,n=n.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,l*=2}while(a>1);return s}function $l(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function E_(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Cs(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function S_(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!T_(s,t)&&(Cr(s,t)&&Cr(t,s)&&w_(s,t)&&(we(s.prev,s,t.prev)||we(s,t.prev,t))||lo(s,t)&&we(s.prev,s,s.next)>0&&we(t.prev,t,t.next)>0)}function we(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function lo(s,t){return s.x===t.x&&s.y===t.y}function $f(s,t,e,n){let i=_a(we(s,t,e)),r=_a(we(s,t,n)),a=_a(we(e,n,s)),o=_a(we(e,n,t));return!!(i!==r&&a!==o||i===0&&va(s,e,t)||r===0&&va(s,n,t)||a===0&&va(e,s,n)||o===0&&va(e,t,n))}function va(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function _a(s){return s>0?1:s<0?-1:0}function T_(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&$f(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Cr(s,t){return we(s.prev,s,s.next)<0?we(s,t,s.next)>=0&&we(s,s.prev,t)>=0:we(s,t,s.prev)<0||we(s,s.next,t)<0}function w_(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Zf(s,t){let e=new Zl(s.i,s.x,s.y),n=new Zl(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function xf(s,t,e,n){let i=new Zl(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Pr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Zl(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function A_(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var Mr=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];vf(t),_f(n,t);let a=t.length;e.forEach(vf);for(let c=0;c<e.length;c++)i.push(a),a+=e[c].length,_f(n,e[c]);let o=u_.triangulate(n,i);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function vf(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function _f(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}var Qa=class s extends Ae{constructor(t=new Ar([new tt(.5,.5),new tt(-.5,.5),new tt(-.5,-.5),new tt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],r=[];for(let o=0,c=t.length;o<c;o++){let l=t[o];a(l)}this.setAttribute("position",new Kt(i,3)),this.setAttribute("uv",new Kt(r,2)),this.computeVertexNormals();function a(o){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:R_,_,v=!1,L,R,C,A;p&&(_=p.getSpacedPoints(h),v=!0,f=!1,L=p.computeFrenetFrames(h,!1),R=new T,C=new T,A=new T),f||(m=0,d=0,g=0,x=0);let S=o.extractPoints(l),M=S.shape,I=S.holes;if(!Mr.isClockWise(M)){M=M.reverse();for(let Q=0,st=I.length;Q<st;Q++){let P=I[Q];Mr.isClockWise(P)&&(I[Q]=P.reverse())}}let B=Mr.triangulateShape(M,I),V=M;for(let Q=0,st=I.length;Q<st;Q++){let P=I[Q];M=M.concat(P)}function J(Q,st,P){return st||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(st,P)}let G=M.length,nt=B.length;function W(Q,st,P){let Lt,et,bt,ct=Q.x-st.x,Bt=Q.y-st.y,_t=P.x-Q.x,w=P.y-Q.y,b=ct*ct+Bt*Bt,k=ct*w-Bt*_t;if(Math.abs(k)>Number.EPSILON){let Y=Math.sqrt(b),j=Math.sqrt(_t*_t+w*w),$=st.x-Bt/Y,Rt=st.y+ct/Y,ft=P.x-w/j,yt=P.y+_t/j,Qt=((ft-$)*w-(yt-Rt)*_t)/(ct*w-Bt*_t);Lt=$+ct*Qt-Q.x,et=Rt+Bt*Qt-Q.y;let it=Lt*Lt+et*et;if(it<=2)return new tt(Lt,et);bt=Math.sqrt(it/2)}else{let Y=!1;ct>Number.EPSILON?_t>Number.EPSILON&&(Y=!0):ct<-Number.EPSILON?_t<-Number.EPSILON&&(Y=!0):Math.sign(Bt)===Math.sign(w)&&(Y=!0),Y?(Lt=-Bt,et=ct,bt=Math.sqrt(b)):(Lt=ct,et=Bt,bt=Math.sqrt(b/2))}return new tt(Lt/bt,et/bt)}let lt=[];for(let Q=0,st=V.length,P=st-1,Lt=Q+1;Q<st;Q++,P++,Lt++)P===st&&(P=0),Lt===st&&(Lt=0),lt[Q]=W(V[Q],V[P],V[Lt]);let xt=[],Tt,Xt=lt.concat();for(let Q=0,st=I.length;Q<st;Q++){let P=I[Q];Tt=[];for(let Lt=0,et=P.length,bt=et-1,ct=Lt+1;Lt<et;Lt++,bt++,ct++)bt===et&&(bt=0),ct===et&&(ct=0),Tt[Lt]=W(P[Lt],P[bt],P[ct]);xt.push(Tt),Xt=Xt.concat(Tt)}for(let Q=0;Q<m;Q++){let st=Q/m,P=d*Math.cos(st*Math.PI/2),Lt=g*Math.sin(st*Math.PI/2)+x;for(let et=0,bt=V.length;et<bt;et++){let ct=J(V[et],lt[et],Lt);ot(ct.x,ct.y,-P)}for(let et=0,bt=I.length;et<bt;et++){let ct=I[et];Tt=xt[et];for(let Bt=0,_t=ct.length;Bt<_t;Bt++){let w=J(ct[Bt],Tt[Bt],Lt);ot(w.x,w.y,-P)}}}let ae=g+x;for(let Q=0;Q<G;Q++){let st=f?J(M[Q],Xt[Q],ae):M[Q];v?(C.copy(L.normals[0]).multiplyScalar(st.x),R.copy(L.binormals[0]).multiplyScalar(st.y),A.copy(_[0]).add(C).add(R),ot(A.x,A.y,A.z)):ot(st.x,st.y,0)}for(let Q=1;Q<=h;Q++)for(let st=0;st<G;st++){let P=f?J(M[st],Xt[st],ae):M[st];v?(C.copy(L.normals[Q]).multiplyScalar(P.x),R.copy(L.binormals[Q]).multiplyScalar(P.y),A.copy(_[Q]).add(C).add(R),ot(A.x,A.y,A.z)):ot(P.x,P.y,u/h*Q)}for(let Q=m-1;Q>=0;Q--){let st=Q/m,P=d*Math.cos(st*Math.PI/2),Lt=g*Math.sin(st*Math.PI/2)+x;for(let et=0,bt=V.length;et<bt;et++){let ct=J(V[et],lt[et],Lt);ot(ct.x,ct.y,u+P)}for(let et=0,bt=I.length;et<bt;et++){let ct=I[et];Tt=xt[et];for(let Bt=0,_t=ct.length;Bt<_t;Bt++){let w=J(ct[Bt],Tt[Bt],Lt);v?ot(w.x,w.y+_[h-1].y,_[h-1].x+P):ot(w.x,w.y,u+P)}}}Z(),rt();function Z(){let Q=i.length/3;if(f){let st=0,P=G*st;for(let Lt=0;Lt<nt;Lt++){let et=B[Lt];kt(et[2]+P,et[1]+P,et[0]+P)}st=h+m*2,P=G*st;for(let Lt=0;Lt<nt;Lt++){let et=B[Lt];kt(et[0]+P,et[1]+P,et[2]+P)}}else{for(let st=0;st<nt;st++){let P=B[st];kt(P[2],P[1],P[0])}for(let st=0;st<nt;st++){let P=B[st];kt(P[0]+G*h,P[1]+G*h,P[2]+G*h)}}n.addGroup(Q,i.length/3-Q,0)}function rt(){let Q=i.length/3,st=0;At(V,st),st+=V.length;for(let P=0,Lt=I.length;P<Lt;P++){let et=I[P];At(et,st),st+=et.length}n.addGroup(Q,i.length/3-Q,1)}function At(Q,st){let P=Q.length;for(;--P>=0;){let Lt=P,et=P-1;et<0&&(et=Q.length-1);for(let bt=0,ct=h+m*2;bt<ct;bt++){let Bt=G*bt,_t=G*(bt+1),w=st+Lt+Bt,b=st+et+Bt,k=st+et+_t,Y=st+Lt+_t;Vt(w,b,k,Y)}}}function ot(Q,st,P){c.push(Q),c.push(st),c.push(P)}function kt(Q,st,P){Ft(Q),Ft(st),Ft(P);let Lt=i.length/3,et=y.generateTopUV(n,i,Lt-3,Lt-2,Lt-1);ee(et[0]),ee(et[1]),ee(et[2])}function Vt(Q,st,P,Lt){Ft(Q),Ft(st),Ft(Lt),Ft(st),Ft(P),Ft(Lt);let et=i.length/3,bt=y.generateSideWallUV(n,i,et-6,et-3,et-2,et-1);ee(bt[0]),ee(bt[1]),ee(bt[3]),ee(bt[1]),ee(bt[2]),ee(bt[3])}function Ft(Q){i.push(c[Q*3+0]),i.push(c[Q*3+1]),i.push(c[Q*3+2])}function ee(Q){r.push(Q.x),r.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return C_(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ql[i.type]().fromJSON(i)),new s(n,t.options)}},R_={generateTopUV:function(s,t,e,n,i){let r=t[e*3],a=t[e*3+1],o=t[n*3],c=t[n*3+1],l=t[i*3],h=t[i*3+1];return[new tt(r,a),new tt(o,c),new tt(l,h)]},generateSideWallUV:function(s,t,e,n,i,r){let a=t[e*3],o=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[i*3],d=t[i*3+1],g=t[i*3+2],x=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new tt(a,1-c),new tt(l,1-u),new tt(f,1-g),new tt(x,1-p)]:[new tt(o,1-c),new tt(h,1-u),new tt(d,1-g),new tt(m,1-p)]}};function C_(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Cn=class s extends Ka{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},ja=class s extends Ka{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},to=class s extends Ae{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],c=[],l=[],h=[],u=t,f=(e-t)/i,d=new T,g=new tt;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){let p=r+m/n*a;d.x=u*Math.cos(p),d.y=u*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let x=0;x<i;x++){let m=x*(n+1);for(let p=0;p<n;p++){let y=p+m,_=y,v=y+n+1,L=y+n+2,R=y+1;o.push(_,v,R),o.push(v,L,R)}}this.setIndex(o),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(l,3)),this.setAttribute("uv",new Kt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var me=class s extends Ae{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new T,f=new T,d=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let y=[],_=p/n,v=0;p===0&&a===0?v=.5/e:p===n&&c===Math.PI&&(v=-.5/e);for(let L=0;L<=e;L++){let R=L/e;u.x=-t*Math.cos(i+R*r)*Math.sin(a+_*o),u.y=t*Math.cos(a+_*o),u.z=t*Math.sin(i+R*r)*Math.sin(a+_*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),m.push(R+v,1-_),y.push(l++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){let _=h[p][y+1],v=h[p][y],L=h[p+1][y],R=h[p+1][y+1];(p!==0||a>0)&&d.push(_,v,R),(p!==n-1||c<Math.PI)&&d.push(v,L,R)}this.setIndex(d),this.setAttribute("position",new Kt(g,3)),this.setAttribute("normal",new Kt(x,3)),this.setAttribute("uv",new Kt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Gn=class s extends Ae{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],c=[],l=[],h=new T,u=new T,f=new T;for(let d=0;d<=n;d++)for(let g=0;g<=i;g++){let x=g/i*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/i),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=i;g++){let x=(i+1)*d+g-1,m=(i+1)*(d-1)+g-1,p=(i+1)*(d-1)+g,y=(i+1)*d+g;a.push(x,m,y),a.push(m,p,y)}this.setIndex(a),this.setAttribute("position",new Kt(o,3)),this.setAttribute("normal",new Kt(c,3)),this.setAttribute("uv",new Kt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var eo=class extends Ce{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}},Wt=class extends fi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=kf,this.normalScale=new tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function ya(s,t,e){return!s||!e&&s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function P_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var Gs=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Jl=class extends Gs{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:du,endingEnd:du}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,a=t+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case pu:r=t,o=2*e-n;break;case mu:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case pu:a=t,c=2*n-e;break;case mu:a=1,c=n+i[1]-i[0];break;default:a=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-e)/(i-e),x=g*g,m=x*g,p=-f*m+2*f*x-f*g,y=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,_=(-1-d)*m+(1.5+d)*x+.5*g,v=d*m-d*x;for(let L=0;L!==o;++L)r[L]=p*a[h+L]+y*a[l+L]+_*a[c+L]+v*a[u+L];return r}},Kl=class extends Gs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(n-e)/(i-e),u=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*u+a[c+f]*h;return r}},Ql=class extends Gs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Pn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ya(e,this.TimeBufferType),this.values=ya(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ya(t.times,Array),values:ya(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ql(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Kl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Jl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case wa:e=this.InterpolantFactoryMethodDiscrete;break;case _l:e=this.InterpolantFactoryMethodLinear;break;case nc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return wa;case this.InterpolantFactoryMethodLinear:return _l;case this.InterpolantFactoryMethodSmooth:return nc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(i!==void 0&&P_(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===nc,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(i)c=!0;else{let u=o*n,f=u-n,d=u+n;for(let g=0;g!==n;++g){let x=e[u+g];if(x!==e[f+g]||x!==e[d+g]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let u=o*n,f=a*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};Pn.prototype.TimeBufferType=Float32Array;Pn.prototype.ValueBufferType=Float32Array;Pn.prototype.DefaultInterpolation=_l;var ji=class extends Pn{constructor(t,e,n){super(t,e,n)}};ji.prototype.ValueTypeName="bool";ji.prototype.ValueBufferType=Array;ji.prototype.DefaultInterpolation=wa;ji.prototype.InterpolantFactoryMethodLinear=void 0;ji.prototype.InterpolantFactoryMethodSmooth=void 0;var jl=class extends Pn{};jl.prototype.ValueTypeName="color";var th=class extends Pn{};th.prototype.ValueTypeName="number";var eh=class extends Gs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(i-e),l=t*o;for(let h=l+o;l!==h;l+=4)Oe.slerpFlat(r,0,a,l-o,a,l,c);return r}},no=class extends Pn{InterpolantFactoryMethodLinear(t){return new eh(this.times,this.values,this.getValueSize(),t)}};no.prototype.ValueTypeName="quaternion";no.prototype.InterpolantFactoryMethodSmooth=void 0;var ts=class extends Pn{constructor(t,e,n){super(t,e,n)}};ts.prototype.ValueTypeName="string";ts.prototype.ValueBufferType=Array;ts.prototype.DefaultInterpolation=wa;ts.prototype.InterpolantFactoryMethodLinear=void 0;ts.prototype.InterpolantFactoryMethodSmooth=void 0;var nh=class extends Pn{};nh.prototype.ValueTypeName="vector";var ih=class{constructor(t,e,n){let i=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],g=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null}}},I_=new ih,sh=class{constructor(t){this.manager=t!==void 0?t:I_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};sh.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ws=class extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Mt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},io=class extends Ws{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Mt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Dc=new zt,yf=new T,bf=new T,Ir=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new tt(512,512),this.map=null,this.mapPass=null,this.matrix=new zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sr,this._frameExtents=new tt(1,1),this._viewportCount=1,this._viewports=[new pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;yf.setFromMatrixPosition(t.matrixWorld),e.position.copy(yf),bf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(bf),e.updateMatrixWorld(),Dc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Dc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},rh=class extends Ir{constructor(){super(new ze(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,n=zs*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},so=class extends Ws{constructor(t,e,n=0,i=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new rh}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Mf=new zt,pr=new T,Uc=new T,ah=class extends Ir{constructor(){super(new ze(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new tt(4,2),this._viewportCount=6,this._viewports=[new pe(2,1,1,1),new pe(0,1,1,1),new pe(3,1,1,1),new pe(1,1,1,1),new pe(3,0,1,1),new pe(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),pr.setFromMatrixPosition(t.matrixWorld),n.position.copy(pr),Uc.copy(n.position),Uc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Uc),n.updateMatrixWorld(),i.makeTranslation(-pr.x,-pr.y,-pr.z),Mf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mf)}},Xs=class extends Ws{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ah}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},oh=class extends Ir{constructor(){super(new Vs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Lr=class extends Ws{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new oh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var ro=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ef(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Ef();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Ef(){return performance.now()}var wh="\\[\\]\\.:\\/",L_=new RegExp("["+wh+"]","g"),Ah="[^"+wh+"]",D_="[^"+wh.replace("\\.","")+"]",U_=/((?:WC+[\/:])*)/.source.replace("WC",Ah),N_=/(WCOD+)?/.source.replace("WCOD",D_),k_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ah),B_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ah),O_=new RegExp("^"+U_+N_+k_+B_+"$"),F_=["material","materials","bones","map"],ch=class{constructor(t,e,n){let i=n||Ee.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ee=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(L_,"")}static parseTrackName(t){let e=O_.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);F_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[i];if(a===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ee.Composite=ch;Ee.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ee.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ee.prototype.GetterByBindingType=[Ee.prototype._getValue_direct,Ee.prototype._getValue_array,Ee.prototype._getValue_arrayElement,Ee.prototype._getValue_toArray];Ee.prototype.SetterByBindingTypeAndVersioning=[[Ee.prototype._setValue_direct,Ee.prototype._setValue_direct_setNeedsUpdate,Ee.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ee.prototype._setValue_array,Ee.prototype._setValue_array_setNeedsUpdate,Ee.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ee.prototype._setValue_arrayElement,Ee.prototype._setValue_arrayElement_setNeedsUpdate,Ee.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ee.prototype._setValue_fromArray,Ee.prototype._setValue_fromArray_setNeedsUpdate,Ee.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Qy=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lh);var ho={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var fn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},z_=new Vs(-1,1,1,-1,0,1),Rh=class extends Ae{constructor(){super(),this.setAttribute("position",new Kt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Kt([0,2,0,0,2,0],2))}},H_=new Rh,Ni=class{constructor(t){this._mesh=new wt(H_,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,z_)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var uo=class extends fn{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Ce?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Ui.clone(t.uniforms),this.material=new Ce({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Ni(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Nr=class extends fn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}},fo=class extends fn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var po=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new tt);this._width=n.width,this._height=n.height,e=new Ze(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:In}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new uo(ho),this.copyPass.material.blending=Hn,this.clock=new ro}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),n=!1;for(let i=0,r=this.passes.length;i<r;i++){let a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){let o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Nr!==void 0&&(a instanceof Nr?n=!0:a instanceof fo&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new tt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Jf={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var mo=class extends fn{constructor(){super();let t=Jf;this.uniforms=Ui.clone(t.uniforms),this.material=new eo({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Ni(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},jt.getTransfer(this._outputColorSpace)===le&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===uh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===fh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===dh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Dr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ph?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===mh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var go=class extends fn{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Mt}render(t,e,n){let i=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=i}};var Kf={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Mt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var Zs=class s extends fn{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new tt(t.x,t.y):new tt(256,256),this.clearColor=new Mt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ze(r,a,{type:In}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let f=new Ze(r,a,{type:In});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let d=new Ze(r,a,{type:In});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),a=Math.round(a/2)}let o=Kf;this.highPassUniforms=Ui.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ce({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new tt(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=ho;this.copyUniforms=Ui.clone(h.uniforms),this.blendMaterial=new Ce({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:je,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Mt,this.oldClearAlpha=1,this.basic=new de,this.fsQuad=new Ni(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new tt(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=s.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=s.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){let e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Ce({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new tt(.5,.5)},direction:{value:new tt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new Ce({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}};Zs.BlurDirectionX=new tt(1,0);Zs.BlurDirectionY=new tt(0,1);var Rb={points:20,cooldownMs:5*6e4,money:20},Xn={ceremonyMs:21e4,stealBonusMs:2e4,endMs:25e3,introMs:3e4,ritualMs:22500,partyMinMs:3e4,mcEveryMs:9e3,timeXu:40,timeMs:2e4,timeMaxMs:6e4,beerAskMs:12e4,joinAskMs:1e4,joinRestMs:15e3,joinRoundRestMs:3e4,autoPickMs:18e4,joinXu:3,cuop:50,comboMs:1e4,toastXu:99,tables:8,seatsPerTable:6,maxGuests:130},Ch=[{xu:1,key:"beer",icon:"\u{1F37A}",label:"G\u1ECDi bia, ph\u1EE5c v\u1EE5 b\xEA ra m\xE2m",act:"g\u1ECDi bia"},{xu:5,key:"food",icon:"\u{1F357}",label:"G\u1ECDi th\xEAm m\xF3n ra m\xE2m",act:"g\u1ECDi th\xEAm m\xF3n"},{xu:10,key:"confetti",icon:"\u{1F389}",label:"B\u1EAFn ph\xE1o gi\u1EA5y",act:"b\u1EAFn ph\xE1o gi\u1EA5y m\u1EEBng c\u01B0\u1EDBi"},{xu:30,key:"fireworks",icon:"\u{1F386}",label:"B\u1EAFn ph\xE1o hoa",act:"b\u1EAFn ph\xE1o hoa m\u1EEBng c\u01B0\u1EDBi"},{xu:99,key:"toast",icon:"\u{1F37B}",label:"C\u1EA3 ti\u1EC7c n\xE2ng ly, h\xF4 DZ\xD4!",act:"m\u1EDDi c\u1EA3 \u0111\xE1m c\u01B0\u1EDBi c\xF9ng n\xE2ng ly"},{xu:200,key:"dance",icon:"\u{1F57A}",label:"C\u1EA3 s\xE2n c\xF9ng nh\u1EA3y nh\u1EA1c s\xE0n x\u01B0a",act:"m\u1EDDi c\u1EA3 \u0111\xE1m c\u01B0\u1EDBi c\xF9ng nh\u1EA3y"},{xu:299,key:"heartRain",icon:"\u{1F496}",label:"M\u01B0a tim kh\u1EAFp s\xE2n"},{xu:500,key:"lion",icon:"\u{1F981}",label:"M\xFAa l\xE2n r\u1ED9n r\xE0ng"},{xu:1e3,key:"lantern",icon:"\u{1F3EE}",label:"Ho\xE0ng h\xF4n, th\u1EA3 \u0111\xE8n tr\u1EDDi"},{xu:1500,key:"rainbow",icon:"\u{1F308}",label:"C\u1EA7u v\u1ED3ng, m\u01B0a hoa v\xE0ng"},{xu:2e3,key:"grand",icon:"\u{1F451}",label:"Ph\xE1o tim, t\xEAn b\u1EA1n l\xEAn tr\u1EDDi"}],xo=s=>Ch.filter(t=>s>=t.xu);var Qf=[{xu:1,key:"kick",icon:"\u{1F462}",name:"\u0110\xE1 v\xE0o m\xF4ng",verb:"\u0111\xE1 v\xE0o m\xF4ng"},{xu:5,key:"dep",icon:"\u{1F461}",name:"N\xE9m d\xE9p t\u1ED5 ong",verb:"n\xE9m d\xE9p t\u1ED5 ong v\xE0o"},{xu:10,key:"chao",icon:"\u{1F373}",name:"D\xF9ng ch\u1EA3o \u0111\u1EADp \u0111\u1EA7u",verb:"c\u1EA7m ch\u1EA3o \u0111\u1EADp \u0111\u1EA7u"},{xu:30,key:"gay",icon:"\u{1F3CF}",name:"C\u1EA7m g\u1EADy \u0111u\u1ED5i \u0111\xE1nh",verb:"c\u1EA7m g\u1EADy \u0111u\u1ED5i \u0111\xE1nh"},{xu:52,key:"tai",icon:"\u{1F442}",name:"K\xE9o tai ch\xFA r\u1EC3",verb:"k\xE9o tai"},{xu:100,key:"hoidong",icon:"\u{1F44A}",name:"Hai ng\u01B0\u1EDDi lao v\xE0o \u0111\xE1nh h\u1ED9i \u0111\u1ED3ng",verb:"r\u1EE7 ng\u01B0\u1EDDi lao v\xE0o \u0111\xE1nh h\u1ED9i \u0111\u1ED3ng"}];var di={trai:{name:"Nh\xE0 trai",icon:"\u{1F935}",leader:"Ch\xFA r\u1EC3"},gai:{name:"Nh\xE0 g\xE1i",icon:"\u{1F470}",leader:"C\xF4 d\xE2u"},cuop:{name:"C\u01B0\u1EDBp d\xE2u",icon:"\u{1F3AD}",leader:"Tr\xF9m c\u01B0\u1EDBp"}},vo={phases:[{key:"recruit",ms:12e4,name:"Tuy\u1EC3n qu\xE2n",when:"Ph\xFAt 0\u20132"},{key:"sinhle",ms:18e4,name:"\u0110\u1EA1i chi\u1EBFn s\xEDnh l\u1EC5",when:"Ph\xFAt 2\u20135"},{key:"cuop",ms:18e4,name:"C\u01B0\u1EDBp d\xE2u",when:"Ph\xFAt 5\u20138"},{key:"phancong",ms:12e4,name:"Ph\u1EA3n c\xF4ng",when:"Ph\xFAt 8\u201310"},{key:"final",ms:12e4,name:"Chung k\u1EBFt",when:"Ph\xFAt 10\u201312"}],climaxMs:1e4,joinPts:3,cheerPts:2,cheerCooldownMs:5e3,likesPerPt:15,drumMs:15e3,drumX:3,shieldMs:1e4,dragonMs:2e4,dragonX:1.5,crownMs:3e4,crownX:2,swordHit:200,horseHit:800,ultimatePct:.25,cuopX:1.5},jf=[{xu:1,key:"hoa",icon:"\u{1F339}",name:"Hoa",label:"+1 s\u1EE9c m\u1EA1nh"},{xu:5,key:"phongbi",icon:"\u{1F9E7}",name:"Phong b\xEC",label:"+5 s\u1EE9c m\u1EA1nh"},{xu:20,key:"trong",icon:"\u{1F941}",name:"Tr\u1ED1ng",label:"C\u1ED5 v\u0169 phe x3 (15 gi\xE2y)"},{xu:30,key:"ga",icon:"\u{1F414}",name:"G\xE0",label:"+30 s\u1EE9c m\u1EA1nh"},{xu:100,key:"khien",icon:"\u{1F6E1}\uFE0F",name:"Khi\xEAn",label:"Ph\xF2ng th\u1EE7 10 gi\xE2y"},{xu:200,key:"kiem",icon:"\u2694\uFE0F",name:"Ki\u1EBFm",label:"\u0110\xE1nh phe d\u1EABn \u0111\u1EA7u \u2212200"},{xu:500,key:"rong",icon:"\u{1F409}",name:"R\u1ED3ng",label:"C\u1EA3 \u0111\u1ED9i x1.5 (20 gi\xE2y)"},{xu:1e3,key:"ngua",icon:"\u{1F3C7}",name:"Ng\u1EF1a chi\u1EBFn",label:"T\u1EA5n c\xF4ng \u0111\u1EB7c bi\u1EC7t \u2212800"},{xu:5e3,key:"vuongmien",icon:"\u{1F451}",name:"V\u01B0\u01A1ng mi\u1EC7n",label:"L\xE0m Ch\u1EE7 so\xE1i, \u0111\u1ED9i x2 (30 gi\xE2y)"},{xu:1e4,key:"songlong",icon:"\u{1F432}",name:"Song long",label:"\u0110\u1EA1i chi\xEAu: phe kh\xE1c \u221225%"}];var Cb={everyMs:12*6e4,lobbyMs:45e3,contestMs:6e4,resultMs:15e3,scoreGapMs:1e3,rewards:[150,80,40],participation:10};var Wn={skip:0,neighbors:0,wood:0,brick:0,rain:!1,festival:!1,decor:!1,outfit:0,house:0},Pb={tiers:[{...Wn,min:1,key:"mua",icon:"\u{1F4A7}",fx:"rain",level:0,name:"M\u01B0a r\xE0o",skip:60,neighbors:5,desc:"T\u01B0\u1EDBi, cho \u0103n, t\u0103ng t\u1ED1c 1 ph\xFAt cho b\u1EA1n v\xE0 5 nh\xE0 x\xF3m"},{...Wn,min:5,key:"phan",icon:"\u{1F331}",fx:"leaf",level:1,name:"Ph\xE2n b\xF3n",skip:180,neighbors:10,wood:2,brick:2,desc:"T\u0103ng t\u1ED1c 3 ph\xFAt, th\xEAm v\u1EADt li\u1EC7u"},{...Wn,min:10,key:"may",icon:"\u{1F455}",fx:"outfit",level:1,name:"Ti\u1EC7m may",skip:60,neighbors:3,outfit:1,desc:"May t\u1EB7ng m\u1ED9t b\u1ED9 \xE1o m\u1EDBi: \xE1o b\xE0 ba, \xE1o d\xE0i"},{...Wn,min:30,key:"mua2",icon:"\u{1F308}",fx:"rainbow",level:2,name:"\u0110\u01B0\u1EE3c m\xF9a",skip:300,neighbors:20,wood:8,brick:8,rain:!0,desc:"M\u01B0a kh\u1EAFp l\xE0ng, t\u0103ng t\u1ED1c 5 ph\xFAt"},{...Wn,min:50,key:"xe",icon:"\u{1F9F1}",fx:"bricks",level:2,name:"Xe g\u1ED7 g\u1EA1ch",skip:120,neighbors:5,wood:25,brick:25,desc:"Ch\u1EDF 50 g\u1ED7 g\u1EA1ch v\u1EC1 nh\xE0 \u0111\u1EC3 x\xE2y nh\xE0"},{...Wn,min:100,key:"tho",icon:"\u{1F528}",fx:"coins",level:3,name:"Th\u1EE3 v\u1EC1 l\xE0ng",skip:300,neighbors:40,wood:20,brick:20,rain:!0,decor:!0,desc:"X\xE2y nhanh c\xF4ng tr\xECnh, t\u1EB7ng m\u1ED9t m\xF3n trang tr\xED"},{...Wn,min:199,key:"xaynha",icon:"\u{1F3E0}",fx:"house",level:3,name:"Th\u1EE3 x\xE2y nh\xE0",skip:300,neighbors:10,wood:20,brick:20,house:1,desc:"N\xE2ng nh\xE0 b\u1EA1n l\xEAn 1 c\u1EA5p ngay"},{...Wn,min:299,key:"aoquy",icon:"\u{1F458}",fx:"outfit2",level:3,name:"\xC1o qu\xFD",skip:300,neighbors:20,outfit:2,decor:!0,desc:"\xC1o t\u1EE9 th\xE2n, \xE1o the, \xE1o g\u1EA5m v\xE0 m\u1ED9t m\xF3n trang tr\xED"},{...Wn,min:500,key:"hoi",icon:"\u{1F3EE}",fx:"lantern",level:4,name:"M\u1EDF h\u1ED9i c\u1EA3 l\xE0ng",skip:300,neighbors:80,wood:40,brick:40,rain:!0,festival:!0,decor:!0,desc:"M\u1EDF h\u1ED9i l\xE0ng ngay, \u0111\xE8n tr\u1EDDi, ph\xE1o hoa"},{...Wn,min:1e3,key:"daigia",icon:"\u{1F451}",fx:"grand",level:4,name:"\u0110\u1EA1i gia l\xE0ng",skip:300,neighbors:120,wood:40,brick:40,rain:!0,festival:!0,decor:!0,outfit:2,house:1,desc:"N\xE2ng nh\xE0, \xE1o qu\xFD, m\u1EDF h\u1ED9i, ph\xE1o hoa kh\u1EAFp l\xE0ng"}],dailySkipSeconds:1800,dailyMaterials:160,dailyHouseLevels:2,pointsPerDiamond:1,maxStageShare:.25};var V_=[0,2,5,7,9],Me=(s,t=523.25)=>t*2**((V_[(s%5+5)%5]+12*Math.floor(s/5))/12),td=[0,3,4,2,0,3,1,4],G_=[[[3,.5],[4,.5],[5,1],[4,.5],[3,.5],[2,1],[3,.5],[4,.5],[3,.5],[2,.5],[1,2]],[[3,.5],[4,.5],[5,1],[6,.5],[5,.5],[4,1],[3,.5],[2,.5],[1,.5],[2,.5],[0,2]],[[5,1],[5,.5],[6,.5],[7,1],[6,1],[5,.5],[4,.5],[5,.5],[6,.5],[5,2]],[[4,1],[4,.5],[5,.5],[3,1],[2,1],[1,.5],[2,.5],[3,.5],[1,.5],[0,2]]],nd=[];{let s=0;for(let t of G_)for(let[e,n]of t)nd.push([s,e,n]),s+=n}var W_=32,ed=[3,2,3,1,3,4,3,0,0,4,0,3,2,3,1,0],_o=class{constructor(){O(this,"on",!1);O(this,"music",!0);O(this,"mode","village");O(this,"ctx",null);O(this,"master");O(this,"fxBus");O(this,"musicBus");O(this,"ambBus");O(this,"reverb");O(this,"rain",null);O(this,"noise",null);O(this,"nextAmb",0);O(this,"voices",[]);O(this,"speaking",!1);O(this,"lastPop",0);O(this,"beatAt",0);O(this,"beat",0);O(this,"night",0);O(this,"melodyStep",7);O(this,"crowd",new Map);O(this,"crowdTry",0);O(this,"holdUntil",0);O(this,"songAt",0);O(this,"songBeat",0);O(this,"playlist",[]);O(this,"track",null);O(this,"trackI",0);O(this,"current",null)}start(){if(!this.ctx){let t=this.ctx=new AudioContext,e=t.createDynamicsCompressor();e.threshold.value=-16,e.ratio.value=3,this.master=t.createGain(),this.master.gain.value=.75,this.master.connect(e).connect(t.destination);let n=Math.floor(t.sampleRate*2.4),i=t.createBuffer(2,n,t.sampleRate);for(let u=0;u<2;u++){let f=i.getChannelData(u);for(let d=0;d<n;d++)f[d]=(Math.random()*2-1)*Math.pow(1-d/n,3)}let r=t.createConvolver();r.buffer=i,this.reverb=t.createGain(),this.reverb.gain.value=.35,this.reverb.connect(r).connect(this.master),this.fxBus=t.createGain(),this.fxBus.connect(this.master),this.fxBus.connect(this.reverb),this.musicBus=t.createGain(),this.musicBus.gain.value=.42,this.musicBus.connect(this.master),this.musicBus.connect(this.reverb),this.ambBus=t.createGain(),this.ambBus.connect(this.master);let a=t.sampleRate*2,o=t.createBuffer(1,a,t.sampleRate),c=o.getChannelData(0);for(let u=0;u<a;u++)c[u]=Math.random()*2-1;this.noise=o;let l=t.createBufferSource();l.buffer=o,l.loop=!0;let h=t.createBiquadFilter();h.type="lowpass",h.frequency.value=1400,this.rain=t.createGain(),this.rain.gain.value=0,l.connect(h).connect(this.rain).connect(this.ambBus),l.start(),this.loadCrowd()}this.ctx.resume(),this.beatAt=this.ctx.currentTime+.3,this.on=!0}stop(){this.on=!1,this.ctx?.suspend()}setMusic(t){this.music=t}setMode(t){this.mode=t}get ok(){return this.on&&!!this.ctx}env(t,e,n,i,r){t.gain.setValueAtTime(1e-4,e),t.gain.exponentialRampToValueAtTime(n,e+i),t.gain.exponentialRampToValueAtTime(1e-4,e+r)}osc(t,e,n,i,r,a,o=.005,c=0){let l=this.ctx,h=l.createOscillator(),u=l.createGain();h.type=t,h.frequency.setValueAtTime(e*(1+c),n),c&&h.frequency.exponentialRampToValueAtTime(e,n+.08),this.env(u,n,r,o,i),h.connect(u).connect(a),h.start(n),h.stop(n+i+.05)}zither(t,e,n,i){this.osc("triangle",t,e,1.6,n,i,.004,.02),this.osc("sine",t*2,e,.6,n*.3,i,.004),this.osc("sine",t*3,e,.25,n*.12,i,.003)}flute(t,e,n,i,r){let a=this.ctx,o=a.createOscillator(),c=a.createGain(),l=a.createOscillator(),h=a.createGain();if(o.type="sine",o.frequency.setValueAtTime(t*.985,e),o.frequency.linearRampToValueAtTime(t,e+.12),l.frequency.value=5.2,h.gain.setValueAtTime(0,e),h.gain.linearRampToValueAtTime(t*.012,e+n*.5),l.connect(h).connect(o.frequency),c.gain.setValueAtTime(1e-4,e),c.gain.exponentialRampToValueAtTime(i,e+.12),c.gain.setValueAtTime(i,e+n*.7),c.gain.exponentialRampToValueAtTime(1e-4,e+n),o.connect(c).connect(r),o.start(e),o.stop(e+n+.05),l.start(e),l.stop(e+n+.05),this.osc("sine",t*2,e,n*.8,i*.08,r,.1),this.noise){let u=a.createBufferSource(),f=a.createBiquadFilter(),d=a.createGain();u.buffer=this.noise,f.type="bandpass",f.frequency.value=t*2,f.Q.value=2,this.env(d,e,i*.15,.05,Math.min(n,.6)),u.connect(f).connect(d).connect(r),u.start(e),u.stop(e+n)}}monochord(t,e,n,i,r){let a=this.ctx,o=a.createOscillator(),c=a.createGain();o.type="sine",o.frequency.setValueAtTime(t,e),o.frequency.linearRampToValueAtTime(t*1.06,e+n*.4),o.frequency.linearRampToValueAtTime(t,e+n*.8),this.env(c,e,i,.02,n),o.connect(c).connect(r),o.start(e),o.stop(e+n+.05)}bell(t,e,n){this.osc("sine",t,e,1.8,n,this.fxBus,.003),this.osc("sine",t*2.76,e,.4,n*.22,this.fxBus,.002)}woodAt(t,e,n=820){this.osc("sine",n,t,.09,e,this.fxBus,.002),this.osc("triangle",n*1.5,t,.04,e*.4,this.fxBus,.001)}drum(t,e){this.drumOut(t,e,this.fxBus)}drumOut(t,e,n){if(!this.noise)return;let i=this.ctx,r=i.createOscillator(),a=i.createGain();r.frequency.setValueAtTime(120,t),r.frequency.exponentialRampToValueAtTime(52,t+.25),this.env(a,t,e,.003,.5),r.connect(a).connect(n),r.start(t),r.stop(t+.55);let o=i.createBufferSource(),c=i.createBiquadFilter(),l=i.createGain();o.buffer=this.noise,c.type="bandpass",c.frequency.value=900,this.env(l,t,e*.22,.002,.08),o.connect(c).connect(l).connect(n),o.start(t),o.stop(t+.1)}gongAt(t,e){[[1,1],[1.48,.5],[2.1,.3],[2.9,.18]].forEach(([n,i])=>this.osc("sine",98*n,t,3.5,e*i,this.fxBus,.01))}sparkleAt(t,e,n){for(let i=0;i<e;i++)this.bell(Me(10+Math.floor(Math.random()*6)),t+i*.08+Math.random()*.04,n)}dropsAt(t,e){for(let n=0;n<e;n++){let i=t+n*.14+Math.random()*.05,r=1200+Math.random()*900,a=this.ctx.createOscillator(),o=this.ctx.createGain();a.frequency.setValueAtTime(r,i),a.frequency.exponentialRampToValueAtTime(r*1.9,i+.06),this.env(o,i,.05,.002,.1),a.connect(o).connect(this.fxBus),a.start(i),a.stop(i+.12)}}tune(t,e,n,i,r="zither"){t.forEach((a,o)=>r==="flute"?this.flute(Me(a),e+o*n,n*1.6,i,this.fxBus):this.zither(Me(a),e+o*n,i,this.fxBus))}now(t=0){return this.ctx.currentTime+t}pop(){if(!this.ok)return;let t=performance.now();t-this.lastPop<120||(this.lastPop=t,this.woodAt(this.now(),.06,760+Math.random()*160))}coin(){this.ok&&(this.zither(Me(7),this.now(),.08,this.fxBus),this.zither(Me(9),this.now(.09),.08,this.fxBus))}boom(){this.ok&&(this.drum(this.now(),.14),this.sparkleAt(this.now(.15),3,.03))}welcome(){this.ok&&this.tune([4,5,7],this.now(),.11,.07)}levelUp(){this.ok&&([5,7,9,10].forEach((t,e)=>this.bell(Me(t),this.now(e*.1),.07)),this.flute(Me(12),this.now(.45),.9,.07,this.fxBus))}festival(){if(!this.ok)return;let t=this.now();this.drum(t,.32),this.drum(t+.28,.3),this.drum(t+.5,.28),this.gongAt(t+.75,.22),this.tune([5,7,9,10,9,7],t+1,.22,.08,"flute")}wedding(t){if(!this.ok)return;let e=this.now();if(t==="bride"&&([7,9,10,12,14].forEach((n,i)=>this.bell(Me(n),e+i*.12,.08)),this.tune([5,7,9,10],e+.7,.16,.1,"flute")),(t==="groom"||t==="end")&&(this.drum(e,.3),this.drum(e+.25,.28),this.gongAt(e+.5,.2),this.tune([0,2,4,5,7,9,10],e+.7,.14,.12),this.sparkleAt(e+1.8,8,.04)),t==="steal"){for(let n=0;n<10;n++)this.drum(e+n*.08,.26);this.tune([10,9,7,5],e+.9,.09,.12),this.tune([5,7,10,12,14],e+1.3,.08,.13),this.gongAt(e+1.8,.2)}t==="mung"&&(this.zither(Me(9),e,.08,this.fxBus),this.zither(Me(12),e+.09,.08,this.fxBus),this.bell(Me(14),e+.2,.05))}show(t){if(!this.ok)return;let e=this.now();if((t==="beer"||t==="food")&&(this.bell(Me(14),e,.07),this.bell(Me(17),e+.12,.07)),t==="toast"){for(let n=0;n<10;n++)this.drum(e+n*.09,.12+n*.015);this.gongAt(e+.95,.16)}if(t==="heartRain"&&(this.sparkleAt(e,14,.05),this.tune([9,10,12,14,12],e+.3,.2,.1,"flute")),t==="lion")for(let n=0;n<56;n++){let i=e+n*.25;n%4!==3?this.drum(i,n%4===0?.32:.2):this.woodAt(i,.09,900),n%16===0&&this.gongAt(i,.2)}if(t==="lantern"&&(this.gongAt(e,.16),this.tune([0,2,4,7,9,7,4,2,4],e+.6,.55,.09,"flute"),this.sparkleAt(e+5.5,8,.03)),t==="rainbow")for(let n=0;n<3;n++)[5,7,9,10,12,14,15].forEach((i,r)=>this.bell(Me(i+n*2),e+n*.9+r*.1,.07));if(t==="grand"){this.festival();for(let n=0;n<4;n++)setTimeout(()=>this.boom(),1300*n);this.tune([12,14,15,17,15,14,12,14,17],e+1.4,.3,.11,"flute")}}hiss(t,e,n,i,r,a=.8,o=.002,c=this.fxBus,l=0){let h=this.ctx,u=h.createBufferSource(),f=h.createBiquadFilter(),d=h.createGain();u.buffer=this.noise,f.type=i,f.frequency.setValueAtTime(r,t),l&&f.frequency.exponentialRampToValueAtTime(l,t+e),f.Q.value=a,this.env(d,t,n,o,e),u.connect(f).connect(d).connect(c),u.start(t,Math.random()*1.2),u.stop(t+e+.05)}cannon(){if(!this.ok||!this.noise)return;let t=this.now();for(let e of[0,.07])this.osc("sine",60,t+e,.22,.3,this.fxBus,.002,1.4),this.hiss(t+e,.28,.32,"bandpass",1800,.7,.001);this.hiss(t+.05,.9,.08,"highpass",3e3,.5,.01);for(let e=0;e<30;e++)this.hiss(t+.6+Math.random()*2.6,.06,.012,"highpass",4e3+Math.random()*3e3,.6)}beerPop(){if(!this.ok||!this.noise)return;let t=this.now();this.osc("sine",600,t,.06,.12,this.fxBus,.001,.8),this.hiss(t,.05,.1,"bandpass",2500,1.2,.001),this.hiss(t+.12,.8,.05,"bandpass",900,.9,.05,this.fxBus,1500),this.clink(3,t+.9)}plate(){if(!this.ok)return;let t=this.now();this.osc("triangle",2200,t,.12,.05,this.fxBus,.001),this.osc("sine",3300,t+.02,.1,.03,this.fxBus,.001),this.woodAt(t+.08,.05,700)}clink(t=6,e=0){if(!this.ok)return;let n=e||this.now();for(let i=0;i<t;i++){let r=n+Math.random()*.25,a=2400+Math.random()*2400;this.osc("sine",a,r,.35,.035,this.fxBus,.001),this.osc("sine",a*2.76,r,.15,.012,this.fxBus,.001)}}fwLaunch(){if(!this.ok||!this.noise)return;let t=this.now(),e=this.ctx.createOscillator(),n=this.ctx.createGain();e.frequency.setValueAtTime(800,t),e.frequency.exponentialRampToValueAtTime(2100,t+1.2),this.env(n,t,.025,.15,1.3),e.connect(n).connect(this.fxBus),e.start(t),e.stop(t+1.4),this.hiss(t,1.2,.05,"bandpass",1200,2,.1,this.fxBus,3200)}fwBurst(t,e=!1){if(!this.ok||!this.noise)return;let n=this.now(.08),i=e?1.3:1;if(this.osc("sine",45,n,.7,.4*i,this.fxBus,.003,1.2),this.hiss(n,1.6*i,.45*i,"lowpass",900,.7,.002,this.fxBus,120),this.hiss(n,.15,.25,"bandpass",2400,.6,.001),t==="crackle"||t==="willow"||e){let r=t==="crackle"?70:30;for(let a=0;a<r;a++)this.hiss(n+.9+Math.random()*(t==="crackle"?.8:2.2),.025,t==="crackle"?.09:.03,"highpass",2500+Math.random()*3e3,.7,8e-4)}}loadCrowd(){if(!(!this.ctx||performance.now()-this.crowdTry<2e4)){this.crowdTry=performance.now();for(let t of["mot","hai","ba","do"])for(let e of["nam","nu"]){let n=`${t}-${e}`;this.crowd.has(n)||fetch(`/sfx/${n}.mp3`).then(i=>i.ok?i.arrayBuffer():Promise.reject(new Error(String(i.status)))).then(i=>this.ctx.decodeAudioData(i)).then(i=>{let r=i.getChannelData(0),a=0;for(;a<r.length&&Math.abs(r[a])<.02;)a++;this.crowd.set(n,{buf:i,start:Math.max(0,a/i.sampleRate-.01)})}).catch(()=>{})}}}shout(t,e=1){if(!this.ok)return;let n=this.ctx,i=this.now(.02),r=n.createGain();r.gain.value=e,r.connect(this.master),r.connect(this.reverb);let a=this.crowd.get(t+"-nam"),o=this.crowd.get(t+"-nu");if(!a&&!o){this.loadCrowd(),this.shoutSynth(t,i,e,r);return}for(let[c,l]of[[a??o,6],[o??a,3]])for(let h=0;h<l;h++){let u=n.createBufferSource(),f=n.createGain(),d=n.createStereoPanner();u.buffer=c.buf,u.playbackRate.value=.84+Math.random()*.3,f.gain.value=h===0?.7:.32+Math.random()*.2,d.pan.value=h===0?0:(Math.random()-.5)*1.6,u.connect(f).connect(d).connect(r),u.start(i+(h===0?0:Math.random()*.07),c.start)}this.hiss(i,t==="do"?.7:.3,t==="do"?.12*e:.05*e,"bandpass",700,.8,.03,r)}shoutSynth(t,e,n,i){let r=this.ctx,[a,o]=t==="do"||t==="mot"?[480,880]:[780,1250],c=t==="do"?.55:.28;this.hiss(e,.03,.2*n,"bandpass",t==="ba"?900:2600,1,.001,i);for(let l=0;l<12;l++){let h=r.createOscillator(),u=r.createBiquadFilter(),f=r.createBiquadFilter(),d=r.createGain(),g=e+Math.random()*.05,x=105+Math.random()*150;h.type="sawtooth",h.frequency.setValueAtTime(x*.9,g),h.frequency.linearRampToValueAtTime(x*1.12,g+c*.4),h.frequency.linearRampToValueAtTime(x*.85,g+c),u.type="bandpass",u.frequency.value=a,u.Q.value=5,f.type="bandpass",f.frequency.value=o,f.Q.value=7,this.env(d,g,.05*n,.02,c),h.connect(u).connect(d),h.connect(f).connect(d),d.connect(i),h.start(g),h.stop(g+c+.1)}}disco(t=15){if(!this.ok||!this.noise)return 0;let e=this.ctx,n=this.now(.15),i=124,r=60/i,a=Math.round(t/r/4)*4;this.holdUntil=n+a*r+.3;let o=e.createGain();o.gain.setValueAtTime(1e-4,n),o.gain.exponentialRampToValueAtTime(.85,n+.4),o.gain.setValueAtTime(.85,n+(a-4)*r),o.gain.exponentialRampToValueAtTime(1e-4,n+a*r+.2),o.connect(this.master);let c=e.createGain();c.gain.value=.25,o.connect(c).connect(this.reverb);let l=x=>440*2**((x-69)/12),h=(x,m,p,y,_,v=0,L=0)=>{let R=e.createOscillator(),C=e.createGain();if(R.type=x,R.frequency.value=m,R.detune.value=L,C.gain.setValueAtTime(1e-4,p),C.gain.exponentialRampToValueAtTime(_,p+.008),C.gain.setValueAtTime(_,p+y*.6),C.gain.exponentialRampToValueAtTime(1e-4,p+y),v){let A=e.createBiquadFilter();A.type="lowpass",A.frequency.value=v,A.Q.value=4,R.connect(A).connect(C)}else R.connect(C);C.connect(o),R.start(p),R.stop(p+y+.05)},u=(x,m,p,y,_,v=.7)=>this.hiss(x,m,p,y,_,v,.001,o),f=[[57,60,64],[62,65,69],[55,59,62],[60,64,67]],d=[45,50,43,48],g=[[0,76,.5],[.5,76,.5],[1,74,.5],[1.5,72,1],[2.5,69,.5],[3,72,.5],[3.5,74,.5],[4,77,.5],[4.5,76,.5],[5,74,.5],[5.5,72,.5],[6,74,1],[7,71,.5],[7.5,72,.5]];this.hiss(n-.1,1.2,.12,"bandpass",400,2,.6,o,6e3);for(let x=0;x<a;x++){let m=n+x*r,p=Math.floor(x/4),y=f[p%4],_=d[p%4];if(this.osc("sine",52,m,.28,.55,o,.002,1.8),u(m+r/2,.16,.09,"highpass",7e3),u(m+r/4,.03,.03,"highpass",9e3),u(m+r*3/4,.03,.03,"highpass",9e3),x%2===1)for(let v of[0,.012,.024])u(m+v,.09,.14,"bandpass",1300,1.2);if(h("sawtooth",l(_),m,r*.45,.17,700),h("sawtooth",l(_+12),m+r/2,r*.4,.13,900),x%2===1)for(let v of y)h("square",l(v),m+r/2,r*.3,.025,2400,-6),h("square",l(v),m+r/2,r*.3,.025,2400,6);if(x%4===3&&h("square",800,m+r*.75,.09,.03,3e3),p>=2){let v=(x-8)%8,L=Math.floor((x-8)/16)%2?12:0;for(let[R,C,A]of g)if(R>=v&&R<v+1){let S=m+(R-v)*r;h("square",l(C+L),S,A*r*.9,.05,3200,-4),h("sawtooth",l(C+L),S,A*r*.9,.03,2600,7)}}}return a*r}pk(t){if(!this.ok||!this.noise)return;let e=this.now(),n=(r,a=1)=>{this.osc("sine",55,r,.18,.32*a,this.fxBus,.002,1.6),this.hiss(r,.09,.22*a,"lowpass",900,.7,.001)},i=(r,a=1)=>{this.hiss(r,.07,.3*a,"bandpass",2200,.9,8e-4),this.osc("triangle",420,r,.05,.08*a,this.fxBus,.001)};if(t==="start"){for(let r=0;r<14;r++)this.drum(e+r*.07,.12+r*.012);this.gongAt(e+1,.24),this.tune([5,7,10,12],e+1.1,.12,.12)}if(t==="kick"&&(this.hiss(e,.12,.05,"bandpass",900,1,.03,this.fxBus,2600),n(e+.1),this.osc("sine",700,e+.16,.25,.05,this.fxBus,.005,-.4)),t==="dep"&&i(e,1.3),t==="chao"){for(let[r,a,o]of[[196,.22,1.6],[196*2.76,.1,1.1],[196*5.4,.06,.7],[196*1.5,.08,1.3]])this.osc("sine",r,e,o,a,this.fxBus,.001);this.hiss(e,.12,.25,"highpass",2500,.6,.001)}if(t==="gay"&&(this.hiss(e,.05,.28,"bandpass",1300,1.4,8e-4),this.woodAt(e,.12,520)),t==="tai"){let r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="triangle",r.frequency.setValueAtTime(800,e),r.frequency.linearRampToValueAtTime(1500,e+.5),r.frequency.linearRampToValueAtTime(1100,e+.9),this.env(a,e,.06,.02,.95),r.connect(a).connect(this.fxBus),r.start(e),r.stop(e+1)}if(t==="hoidong")for(let r=0;r<18;r++){let a=e+Math.random()*2.5;r%2?n(a,.8):i(a,.8)}t==="win"&&(this.drum(e,.3),this.gongAt(e+.2,.22),this.tune([7,9,10,12,14,12,14,17],e+.3,.13,.12,"flute")),t==="lose"&&[0,1,2,3].forEach(r=>{let a=this.ctx.createOscillator(),o=this.ctx.createGain(),c=e+r*.42;a.type="sawtooth",a.frequency.setValueAtTime(260-r*22,c),a.frequency.linearRampToValueAtTime(240-r*22-(r===3?60:0),c+(r===3?.9:.36)),this.env(o,c,.05,.03,r===3?.95:.38),a.connect(o).connect(this.fxBus),a.start(c),a.stop(c+1)})}applause(t=6){if(!this.ok||!this.noise)return;let e=this.ctx,n=this.now(),i=Math.floor(t*70);for(let r=0;r<i;r++){let a=r/i,o=n+a*t+Math.random()*.03,c=.012+.05*Math.sin(Math.PI*Math.min(1,a*1.3)),l=e.createBufferSource(),h=e.createBiquadFilter(),u=e.createGain();l.buffer=this.noise,h.type="bandpass",h.frequency.value=1100+Math.random()*1900,h.Q.value=1.2,this.env(u,o,c,.001,.05),l.connect(h).connect(u).connect(this.fxBus),l.start(o,Math.random()*1.5),l.stop(o+.08)}}firecrackers(t=3.5){if(!this.ok||!this.noise)return;let e=this.ctx,n=this.now(),i=Math.floor(t*28);for(let r=0;r<i;r++){let a=n+Math.random()*t,o=e.createBufferSource(),c=e.createBiquadFilter(),l=e.createGain();o.buffer=this.noise,c.type="bandpass",c.frequency.value=1800+Math.random()*2600,c.Q.value=.8,this.env(l,a,.1+Math.random()*.06,8e-4,.035),o.connect(c).connect(l).connect(this.fxBus),o.start(a,Math.random()*1.5),o.stop(a+.06),r%9===0&&this.drum(a,.18)}}battle(t,e){if(!this.ok)return;let n=this.now();if(t==="start"||t==="phase"){for(let i=0;i<8;i++)this.drum(n+i*.16,i%4===0?.34:.2);this.gongAt(n+1.4,.24)}if(t==="climax"){for(let i=0;i<20;i++)this.drum(n+i*.09,.22+i*.006);this.gongAt(n+1.9,.26)}if(t==="join"&&this.woodAt(n,.07,980),t==="power"&&this.coin(),t==="drum")for(let i=0;i<12;i++)this.drum(n+i*.2,i%2?.16:.3);if(t==="shield"&&[9,12,14].forEach((i,r)=>this.bell(Me(i),n+r*.07,.08)),t==="attack"||t==="blocked"){let i=e==="ngua";for(let r=0;r<(i?10:4);r++)this.woodAt(n+r*.07,.08,600+r*40);this.drum(n+(i?1.1:.8),.36),t==="blocked"&&this.bell(Me(15),n+.85,.1)}if(t==="dragon"&&(this.tune([0,2,4,5,7,9,10,12],n,.1,.11,"flute"),this.gongAt(n+.9,.18)),t==="crown"&&this.levelUp(),t==="ultimate"){this.gongAt(n,.3);for(let i=0;i<24;i++)this.drum(n+.2+i*.07,.3);this.boom(),setTimeout(()=>this.boom(),900),this.tune([12,14,15,17],n+1.9,.18,.12,"flute")}t==="win"&&this.wedding("end"),t==="end"&&this.wedding("bride")}gift(t,e){if(!this.ok)return;let n=this.now(),i=n;if((e==="rain"||e==="rainbow"||e==="grand")&&this.dropsAt(n,t>=2?8:5),e==="bricks"||e==="house"){for(let a=0;a<4;a++)this.woodAt(n+a*.16,.11,620);i=n+.6}if((e==="outfit"||e==="outfit2")&&(this.tune([7,9,7,10,9,12],n,.08,.08),i=n+.5),t>=3&&e!=="house"&&e!=="bricks"&&(this.drum(n,.3),this.drum(n+.22,.26),i=n+.45),t>=4){for(let a=0;a<7;a++)this.drum(n+a*Math.max(.09,.24-a*.022),.28);this.gongAt(n+1.2,.26),i=n+1.35}let r=[[5,7],[4,5,7],[0,2,4,5,7,9],[2,4,5,7,9,7,10],[0,2,4,5,7,5,7,9,10]];this.tune(r[Math.min(4,t)],i,t>=3?.14:.12,.12),t>=1&&this.flute(Me(r[Math.min(4,t)].slice(-1)[0]+5),i+r[Math.min(4,t)].length*.13,1.2,.08,this.fxBus),(t>=2||e==="outfit2")&&this.sparkleAt(i+.9,4+t*2,.04)}musicTick(){if(!this.music||!this.ctx)return;if(this.ctx.currentTime<this.holdUntil){this.beatAt=Math.max(this.beatAt,this.holdUntil),this.songAt=Math.max(this.songAt,this.holdUntil);return}if(this.playlist.length)return;if(this.mode==="wedding"){this.weddingSongTick();return}let t=this.ctx,e=this.night>.5?.62:.5,n=this.musicBus;for(;this.beatAt<t.currentTime+.6;){let i=this.beatAt,r=Math.floor(this.beat/8),a=this.beat%8,o=td[r%td.length],c=this.night>.5?.6:1,l=[0,2,4,5,7,5,4,2];this.night>.5&&a%2||this.zither(Me(o+l[a],261.63),i,.05*c,n),a===0&&this.monochord(Me(o,130.81),i,e*6,.07*c,n),r%2===1&&(a===0||a===3||a===6)&&Math.random()<.85&&(this.melodyStep=Math.max(o+3,Math.min(o+9,this.melodyStep+[-2,-1,1,2][Math.floor(Math.random()*4)])),this.flute(Me(this.melodyStep),i,e*(a===6?3.5:2.6),.06*c,n)),this.beatAt+=e/2*(a%2?.92:1.08),this.beat++}}weddingSongTick(){let t=this.ctx,e=112,n=60/e,i=this.musicBus;for(this.songAt<t.currentTime&&(this.songAt=t.currentTime+.1);this.songAt<t.currentTime+.6;){let r=this.songAt,a=this.songBeat%W_,o=Math.round(this.songBeat%1*2);for(let[h,u,f]of nd)Math.abs(h-a)<.01&&(this.horn(Me(u,523.25),r,f*n,i),this.flute(Me(u+5,523.25),r,f*n*.9,.018,i));let c=Math.floor(a/2),l=ed[c%ed.length];o===0&&a%2===0&&(this.bass(Me(l,130.81),r,n*.9,i),this.drumOut(r,.13,i)),o===0&&a%2===1&&(this.bass(Me(l+3,130.81),r,n*.9,i),this.snare(r,i)),o===1&&this.woodAt(r,.035,1050),this.zither(Me(l+[0,2,4,2][Math.floor(a*2)%4],261.63),r,.035,i),this.songAt+=n/2,this.songBeat+=.5}}horn(t,e,n,i){let r=this.ctx,a=r.createOscillator(),o=r.createBiquadFilter(),c=r.createGain(),l=r.createOscillator(),h=r.createGain();a.type="sawtooth",a.frequency.setValueAtTime(t*.97,e),a.frequency.linearRampToValueAtTime(t,e+.05),l.frequency.value=5.5,h.gain.value=t*.006,l.connect(h).connect(a.frequency),o.type="lowpass",o.Q.value=1.2,o.frequency.setValueAtTime(900,e),o.frequency.linearRampToValueAtTime(2600,e+.08),o.frequency.linearRampToValueAtTime(1500,e+n),c.gain.setValueAtTime(1e-4,e),c.gain.exponentialRampToValueAtTime(.06,e+.04),c.gain.setValueAtTime(.06,e+Math.max(.05,n*.75)),c.gain.exponentialRampToValueAtTime(1e-4,e+n),a.connect(o).connect(c).connect(i),a.start(e),a.stop(e+n+.05),l.start(e),l.stop(e+n+.05)}bass(t,e,n,i){this.osc("triangle",t,e,n,.13,i,.01),this.osc("sine",t/2,e,n,.09,i,.01)}snare(t,e){if(!this.noise)return;let n=this.ctx,i=n.createBufferSource(),r=n.createBiquadFilter(),a=n.createGain();i.buffer=this.noise,r.type="highpass",r.frequency.value=1800,this.env(a,t,.06,.002,.12),i.connect(r).connect(a).connect(e),i.start(t),i.stop(t+.15)}setPlaylist(t){this.playlist=[...t].sort(()=>Math.random()-.5),this.trackI=0,this.on&&this.music&&this.nextTrack()}nextTrack(){if(!this.playlist.length||!this.ctx)return;this.track?.pause();let t=new Audio(this.playlist[this.trackI++%this.playlist.length]);t.crossOrigin="anonymous",this.ctx.createMediaElementSource(t).connect(this.musicBus),t.onended=()=>this.nextTrack(),t.onerror=()=>setTimeout(()=>this.nextTrack(),2e3),this.track=t,this.music&&t.play().catch(()=>{})}syncTrack(){this.playlist.length&&(this.track?this.ctx&&this.ctx.currentTime<this.holdUntil?this.track.paused||this.track.pause():this.on&&this.music&&this.track.paused?this.track.play().catch(()=>{}):(!this.on||!this.music)&&!this.track.paused&&this.track.pause():this.nextTrack())}voice(t,e,n,i=0,r=""){return!this.on||(r==="chat"&&(this.voices=this.voices.filter(a=>a.kind!=="verse"),this.current?.kind==="verse"&&(this.current.audio.pause(),this.current.done())),this.voices.length>=6)?!1:(this.voices.push({url:t,onPlay:e,onEnd:n,until:i?performance.now()+i:0,kind:r}),this.nextVoice(),!0)}hush(t){this.duck(!0),setTimeout(()=>{this.speaking||this.duck(!1)},t)}duck(t){this.ctx&&(this.musicBus.gain.setTargetAtTime(t?.12:.42,this.ctx.currentTime,t?.15:.6),this.ambBus.gain.setTargetAtTime(t?.3:1,this.ctx.currentTime,t?.15:.6))}nextVoice(){for(;this.voices.length&&this.voices[0].until&&performance.now()>this.voices[0].until;)this.voices.shift();if(this.speaking||!this.voices.length){this.speaking||this.duck(!1);return}this.speaking=!0;let t=this.voices.shift(),e=new Audio(t.url);this.duck(!0);let n=!1,i=!1;e.onplaying=()=>{n||(n=!0,t.onPlay?.())};let r=()=>{i||(i=!0,this.current=null,n||(n=!0,t.onPlay?.()),t.onEnd?.(),this.speaking=!1,this.voices.length||this.duck(!1),setTimeout(()=>this.nextVoice(),250))};this.current={audio:e,kind:t.kind,done:r},e.onended=r,e.onerror=r,e.play().catch(r)}ambience(t,e,n){if(!this.ok||(this.night=e,this.musicTick(),this.syncTrack(),this.rain&&(this.rain.gain.value+=((n?.1:0)-this.rain.gain.value)*Math.min(1,t)),this.nextAmb-=t,this.nextAmb>0))return;this.nextAmb=1.4+Math.random()*3;let i=this.ctx,r=(a,o,c,l)=>{let h=i.currentTime+o,u=i.createOscillator(),f=i.createGain();u.frequency.setValueAtTime(a,h),u.frequency.exponentialRampToValueAtTime(a*l,h+.1),this.env(f,h,c,.01,.12),u.connect(f).connect(this.ambBus),u.start(h),u.stop(h+.15)};if(e>.5)for(let a=0;a<3;a++)r(4300,a*.06,.01,1);else if(!n){let a=2400+Math.random()*1200;r(a,0,.016,1.25),r(a*1.15,.15,.013,.9)}}};var kr={time:{value:0},wind:{value:.3},light:{value:new Mt(1,1,1)}};function id(){let s=new Wt({roughness:.9,flatShading:!0});return s.onBeforeCompile=t=>{t.uniforms.uTime=kr.time,t.uniforms.uWind=kr.wind,t.vertexShader=`uniform float uTime;
uniform float uWind;
`+t.vertexShader.replace("#include <begin_vertex>",`
      vec3 transformed = vec3(position);
      #ifdef USE_INSTANCING
        vec3 ip = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
      #else
        vec3 ip = vec3(0.0);
      #endif
      float h = clamp(position.y, 0.0, 1.0);
      float gust = 0.6 + 0.4 * sin(uTime * 0.7 + ip.x * 0.05);
      transformed.x += sin(uTime * 2.2 + ip.x * 0.35 + ip.z * 0.21) * uWind * gust * h * h * 0.32;
      transformed.z += cos(uTime * 1.6 + ip.z * 0.3) * uWind * h * h * 0.12;`)},s}var yo=class{constructor(t){O(this,"ws",null);O(this,"retry",0);O(this,"role");O(this,"onHello",()=>{});O(this,"onDelta",()=>{});O(this,"onStatus",()=>{});this.role=t}connect(){let t=new WebSocket(`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws?role=${this.role}`);this.ws=t,t.onopen=()=>{this.retry=0,this.onStatus(!0)},t.onmessage=e=>{let n;try{n=JSON.parse(e.data)}catch{return}n.t==="hello"?this.onHello(n):this.onDelta(n)},t.onclose=()=>{this.onStatus(!1),setTimeout(()=>this.connect(),Math.min(1e4,500*2**this.retry++))}}send(t){this.ws?.readyState===1&&this.ws.send(JSON.stringify(t))}};var sd=96,rd=[16175796,15778718,15250831,16309444],ad=[15895732,15910987,10186704,8369896,16183782,9425846,16752250,14834298],X_=[7029288,2373214,16052454,3108751,6044270];function Ph(s){let t=2166136261;for(let e=0;e<s.length;e++)t^=s.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}var od=[[16513008,16513008,16041684],[14032684,15911244,15911244],[15895732,16513008,16777215],[15910987,14032684,14032684]],cd=[[13639204,13639204,15911244],[3105736,3105736,15911244],[14854458,13639204,13639204],[2042426,2042426,15911244]],q_={1:{shirt:16761370,trim:14032684,pants:11736095,hat:16767050},2:{shirt:16727972,trim:16769354,pants:16773622,hat:16727972},3:{shirt:1623256,trim:16766042,pants:2763370,hat:1623256}};function ld(s,t,e="",n=0,i=0){let r=Ph(s)+n*7919,a=(f,d)=>f[(r>>>d)%f.length],o={skin:rd[Ph(s)%rd.length],hair:2759700,longHair:!1,shirt:16777215,pants:2761760,tunic:!1,hat:"none",hatColor:0,scale:1,bouquet:!1,trim:0};if(t==="bride"){let[f,d,g]=od[n%od.length];return{...o,longHair:!0,shirt:f,pants:16513008,tunic:!0,hat:"man",hatColor:d,bouquet:!0,trim:g}}if(t==="groom"){let[f,d,g]=cd[n%cd.length];return{...o,shirt:f,pants:1972760,tunic:!0,hat:"khan",hatColor:d,trim:g}}if(t==="band")return{...o,shirt:3105736,pants:16052454,tunic:!0,hat:"khan",hatColor:3105736,trim:14214399};if(t==="waiter")return{...o,hair:1708560,shirt:16777215,pants:1842210,trim:14032684};let c={...o,longHair:!0,hair:a([2759700,3810328,1971216],6),shirt:a(ad,13),pants:16183782,tunic:!0,hat:(r>>>17)%6===0?"non":"none",hatColor:15324058},l={...o,shirt:a(X_,15),pants:a([2761760,3882826,5981746],19),tunic:(r>>>21)%3===0,hat:(r>>>23)%5===0?"khan":"none",hatColor:2761760},h=q_[i];if(h&&(t==="guest"||t==="seat"))return{...e==="nam"?l:c,shirt:h.shirt,trim:h.trim,pants:h.pants,tunic:!0,hat:"khan",hatColor:h.hat,scale:1.08};if(e==="nu")return c;if(e==="nam")return l;let u=Ph(s)%100;return u<14?{...o,hair:14275788,longHair:(r>>>7)%2===0,shirt:a([7029288,6044270,3881554],9),pants:15789024,tunic:!0,hat:"khan",hatColor:2761760}:u<26?{...o,scale:.72,longHair:(r>>>5)%2===0,shirt:a(ad,11),pants:16183782,tunic:!0}:u<66?c:l}var hd=new zt,es=new zt,dn=new zt,ns=new zt,dd=new zt,pd=new Oe,md=new T,gd=new T,xd=new Xe,Y_=new Mt,Ih=new T,ud=new zt,re=(s,t,e,n,i,r,a,o,c)=>dd.compose(md.set(s,t,e),pd.setFromEuler(xd.set(n,i,r)),gd.set(a,o,c)),bo=class{constructor(){O(this,"group",new he);O(this,"actors",new Map);O(this,"ranks",new Map);O(this,"parts");O(this,"faces",new Map);O(this,"avatars",new Map);O(this,"faceGeo",new Rn(.3,32));let t=new Wt({roughness:.62}),e=new Wt({roughness:.55,side:Te}),n=(r,a=t,o=!0)=>{let c=new Je(r,a,sd);return c.frustumCulled=!1,c.castShadow=o,c.count=0,c},i=new ne(.5,.42,1,12).translate(0,-.5,0);this.parts={legL:n(i),legR:n(i),shoeL:n(new me(.5,12,8).scale(1,.6,1.5)),shoeR:n(new me(.5,12,8).scale(1,.6,1.5)),tunic:n(new ne(.38,.62,1,18,1,!0).translate(0,-.5,0),e),body:n(new ne(.42,.5,1,18).translate(0,.5,0)),collar:n(new ne(.5,.5,1,14).translate(0,.5,0)),armL:n(i),armR:n(i),handL:n(new me(.5,10,8)),handR:n(new me(.5,10,8)),head:n(new me(.34,28,20)),face:n(Z_(),new de({vertexColors:!0}),!1),hair:n(new me(.365,26,14,0,Math.PI*2,0,Math.PI*.56).rotateX(-.42)),hairBack:n(new me(.5,16,12)),hat:n(new ne(.5,.5,1,26)),hatRing:n(new Gn(.5,.18,12,30).rotateX(Math.PI/2)),bouquet:n(J_(),new Wt({vertexColors:!0,roughness:.6})),prop:n(new Ie(1,1,1)),load:n(new ne(.5,.5,1,14))};for(let r of Object.values(this.parts))this.group.add(r);this.parts.hat.castShadow=!1,this.parts.hatRing.castShadow=!1}set(t,e,n,i,r,a,o="",c=0){let l=this.actors.get(t),h=this.ranks.get(t)??0,u=`${n}|${o}|${c}|${h}`;if(!l){let f=n==="band"||n==="extra";l={id:t,name:e,role:n,key:u,look:ld(t,n,o,c,h),x:f?i.x:r.x+(Math.random()-.5),z:f?i.z:r.z,yaw:Math.PI,tx:i.x,tz:i.z,tyaw:i.yaw,anim:"idle",pose:"",phase:Math.random()*6,seen:a,bubble:"",bubbleUntil:0,giftAt:0,cheerUntil:0,speed:2.4,load:"",glassUntil:0,hold:""},this.actors.set(t,l)}return l.key!==u&&(l.role=n,l.key=u,l.look=ld(t,n,o,c,h)),l.name=e,l.tx=i.x,l.tz=i.z,l.tyaw=i.yaw,l.seen=a,l}prune(t){for(let[e,n]of this.actors)if(n.seen<t){this.actors.delete(e);let i=this.faces.get(e);i&&(this.group.remove(i),i.geometry.dispose(),i.material.dispose(),this.faces.delete(e))}}say(t,e,n=3500,i=performance.now()){let r=this.actors.get(t);r&&e&&(r.bubble=e,r.bubbleUntil=i+n)}cheer(t,e=3e3,n=performance.now()){let i=this.actors.get(t);i&&(i.cheerUntil=n+e)}update(t,e){let n=0;for(let i of this.actors.values()){let r=i.tx-i.x,a=i.tz-i.z,o=Math.hypot(r,a),c=o>.05;if(c){let l=Math.min(o,i.speed*t);i.x+=r/o*l,i.z+=a/o*l,i.yaw=fd(i.yaw,Math.atan2(r,a),t*8)}else i.yaw=fd(i.yaw,i.tyaw,t*5);if(i.anim=c?"walk":i.pose?i.pose==="toast"&&i.role==="seat"?"drink":i.pose:e<i.cheerUntil?"cheer":i.role==="bride"||i.role==="groom"?"couple":i.role==="seat"?"eat":i.role==="band"?i.id==="band-1"?"drum":"play":"clap",!(i.z<-3.4)&&(this.draw(n++,i,e/1e3+i.phase,e),n>=sd))break}for(let i of Object.values(this.parts))i.count=n,i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)}draw(t,e,n,i){let r=e.look,a=e.anim==="eat"||e.anim==="drink",o=0,c=0,l=.08,h=.08,u=.12,f=-.12,d=0,g=0,x=0,m=0,p=Math.sin(n*9);switch(e.anim){case"walk":o=p*.55,c=-p*.55,l=-p*.45,h=p*.45,g=Math.abs(p)*.04;break;case"clap":{let A=Math.max(0,Math.sin(n*7));l=h=-1.05,u=.55-A*.35,f=-.55+A*.35,x=Math.sin(n*1.3)*.08;break}case"eat":{let A=Math.max(0,Math.sin(n*2.4));o=c=-1.45,h=-1.1-A*.9,l=-.8,d=.12;break}case"couple":{if(r.bouquet)l=h=-.95,u=.42,f=-.42;else{let A=n%8<1.8;h=A?Math.PI-.5+Math.sin(n*7)*.3:-.2,f=A?-.25:-.3,l=-.2,u=.3}d=n%13<1.1?.35:0,x=Math.sin(n*.9)*.1;break}case"play":l=-1.1+Math.sin(n*6)*.15,h=-.9,u=.5,f=-.45,x=Math.sin(n*2)*.12;break;case"drum":{let A=Math.sin(n*5);l=-1.5-A*.6,h=-1.5+A*.6;break}case"bow":{d=.15+Math.max(0,Math.sin(n*1.6))*.55,l=h=-.9,u=.45,f=-.45;break}case"raise":case"toast":h=-2+Math.sin(n*2)*.12,f=-.35,l=-.4,x=.1;break;case"drink":{let A=Math.max(0,Math.sin(n*1.8));o=c=-1.45,h=-1.6-A*.9,f=-.2,l=-.5,x=-A*.25;break}case"cut":{l=h=-1.2-Math.sin(n*3)*.25,u=.3,f=-.3,d=.2;break}case"kick":c=-1.5,o=.25,l=-.7,h=.6,u=.5,f=-.5,d=-.15;break;case"hurt":l=h=Math.PI-.5,u=-.45,f=.45,x=Math.sin(n*14)*.3,g=Math.abs(Math.sin(n*12))*.06,d=Math.sin(n*7)*.12;break;case"swing":{let A=Math.abs(Math.sin(n*8));h=-3+A*2.3,f=-.15,l=-.5,d=.05+A*.2;break}case"pull":h=-2.1+Math.sin(n*9)*.12,f=.3,l=-.3,u=.3,d=-.18,x=.15;break;case"disco":{let A=Math.sin(n*6.5)>0;h=A?Math.PI-.3:-.5,f=A?-.35:.5,l=-.4,u=.25,g=Math.abs(Math.sin(n*13))*.07,m=Math.sin(n*6.5)*.35,x=A?-.15:.15;break}case"twist":{let A=Math.sin(n*13);l=h=-1.3,u=.6+A*.3,f=-.6+A*.3,o=A*.35,c=-A*.35,m=A*.55,d=.12,g=Math.abs(A)*.05;break}case"wave":{let A=Math.sin(n*6.5);l=h=Math.PI-.25,u=.2+A*.4,f=-.2+A*.4,g=Math.abs(Math.sin(n*13))*.09,x=A*.2,o=Math.max(0,A)*.3,c=Math.max(0,-A)*.3;break}case"cheer":l=h=Math.PI-.35+Math.sin(n*10)*.25,u=.25,f=-.25,g=Math.abs(Math.sin(n*10))*.12;break;default:l=h=.06+Math.sin(n*1.4)*.03}e.load&&(l=h=-1.3,u=.32,f=-.32);let y=r.scale*(e.role==="bride"||e.role==="groom"?1.12:1);es.compose(md.set(e.x,g+(a?-.22:0)*y,e.z),pd.setFromEuler(xd.set(0,e.yaw+m,0)),gd.set(y,y,y)),dn.copy(es).multiply(re(0,.62,0,d,0,0,1,1,1));let _=(A,S,M,I)=>{hd.multiplyMatrices(S,M),this.parts[A].setMatrixAt(t,hd),this.parts[A].setColorAt(t,Y_.set(I))},v=A=>_(A,es,re(0,0,0,0,0,0,0,0,0),0),L=(A,S,M,I,H,B,V,J,G,nt,W,lt)=>{ns.copy(A).multiply(re(S,M,0,I,0,H,1,1,1)),_(B,ns,re(0,0,0,0,0,0,G,J,G),nt),_(V,ns,lt?re(0,-J,.05,0,0,0,.17,.17,.17):re(0,-J-.02,0,0,0,0,.12,.12,.12),W)};L(es,-.1,.62,o,0,"legL","shoeL",.58,.15,r.pants,e.role==="bride"?16513008:2759700,!0),L(es,.1,.62,c,0,"legR","shoeR",.58,.15,r.pants,e.role==="bride"?16513008:2759700,!0),_("body",dn,re(0,0,0,0,0,0,.42,.48,.3),r.shirt),_("collar",dn,re(0,.47,0,0,0,0,.16,.06,.14),r.trim||r.shirt),r.tunic?_("tunic",dn,re(0,.04,0,-Math.abs(o)*.3-(a?.9:0),0,0,.62,a?.32:.56,.5),r.shirt):v("tunic"),L(dn,-.24,.42,l,u,"armL","handL",.4,.12,r.shirt,r.skin,!1),L(dn,.24,.42,h,f,"armR","handR",.4,.12,r.shirt,r.skin,!1),ud.copy(ns),Ih.setFromMatrixPosition(dd.multiplyMatrices(ns,re(0,-.44,0,0,0,0,1,1,1)));let R=re(0,.86,0,x*.4,x,0,1,1,1);ns.copy(dn).multiply(R);let C=ns.clone();_("head",C,re(0,0,0,0,0,0,1,.96,.96),r.skin),this.faceOf(e,C)?v("face"):_("face",C,re(0,0,0,0,0,0,1,1,1),16777215),_("hair",C,re(0,.01,-.01,0,0,0,1,1,1),r.hair),r.longHair&&r.hat!=="khan"?_("hairBack",C,re(0,-.2,-.16,.12,0,0,.62,.95,.34),r.hair):v("hairBack"),r.hat==="man"?(_("hatRing",C,re(0,.2,-.02,-.25,0,0,.62,.62,.62),r.hatColor),v("hat")):r.hat==="khan"?(_("hat",C,re(0,.22,-.02,-.18,0,0,.7,.18,.7),r.hatColor),_("hatRing",C,re(0,.17,-.01,-.18,0,0,.66,.4,.66),r.trim||r.hatColor)):r.hat==="non"?(_("hat",C,re(0,.3,0,0,0,0,1.05,.06,1.05),r.hatColor),v("hatRing")):(v("hat"),v("hatRing")),r.bouquet?_("bouquet",dn,re(0,.08,.42,.3,0,0,1,1,1),16777215):v("bouquet"),e.role==="band"?_("prop",dn,e.anim==="drum"?re(.25,.25,.35,-.6,0,0,.05,.05,.5):e.id==="band-0"?re(-.05,.25,.3,0,0,.9,.36,.36,.06):re(.1,.5,.32,0,0,1.4,.04,.6,.04),e.id==="band-0"?11565626:7226408):e.hold==="stick"?_("prop",ud,re(0,-.75,.02,0,0,0,.07,.95,.07),9067050):e.load==="beer"?_("prop",dn,re(0,.22,.42,0,0,0,.52,.24,.36),13904426):e.load==="food"?_("prop",dn,re(0,.3,.44,0,0,0,.6,.03,.6),14211806):e.anim==="toast"||e.anim==="drink"||i<e.glassUntil?_("prop",es.clone().setPosition(Ih),re(0,.02,0,0,0,0,.11/y,.16/y,.11/y),15903018):v("prop"),e.load==="beer"?_("load",dn,re(0,.4,.42,0,0,0,.42,.14,.28),3111482):e.load==="food"?_("load",dn,re(0,.38,.44,0,0,0,.34,.14,.34),15234090):e.anim==="toast"||e.anim==="drink"||i<e.glassUntil?_("load",es.clone().setPosition(Ih),re(0,.1,0,0,0,0,.12/y,.04/y,.12/y),16776170):v("load")}avatarFor(t){if(t.role==="band"||t.role==="extra"||t.role==="waiter")return null;let e=t.role==="bride"?16748464:t.role==="groom"?15911244:16777215,n=this.avatars.get(t.id),i=performance.now();if(n&&n.tex&&n.ring!==e&&(n.tex.dispose(),n.tex=null,n.retryAt=0),n||(n={tex:null,retryAt:0,loading:!1,ring:e},this.avatars.set(t.id,n),this.avatars.size>200&&this.avatars.delete(this.avatars.keys().next().value)),!n.tex&&!n.loading&&i>=n.retryAt){n.loading=!0,n.ring=e;let r=new Image,a=n;r.onload=()=>{a.loading=!1,a.tex=$_(r,e)},r.onerror=()=>{a.loading=!1,a.retryAt=performance.now()+6e4},r.src="/avatar/"+encodeURIComponent(t.id)}return n.tex}faceOf(t,e){let n=this.avatarFor(t),i=this.faces.get(t.id);if(!n)return i&&(i.visible=!1),!1;i||(i=new wt(this.faceGeo,new de({map:n,transparent:!0})),i.matrixAutoUpdate=!1,this.faces.set(t.id,i),this.group.add(i));let r=i.material;return r.map!==n&&(r.map=n,r.needsUpdate=!0),i.visible=!0,i.matrix.multiplyMatrices(e,re(0,-.01,.325,0,0,0,1,1,1)),!0}labeled(t){let e=n=>n.role==="bride"||n.role==="groom"?0:t<n.bubbleUntil||t-n.giftAt<8e3?1:2;return[...this.actors.values()].filter(n=>n.role!=="band"&&n.role!=="extra"&&n.name&&n.z>=-3.4&&(n.role!=="waiter"||t<n.bubbleUntil)).sort((n,i)=>e(n)-e(i))}};function $_(s,t){let e=document.createElement("canvas");e.width=e.height=160;let n=e.getContext("2d");n.save(),n.beginPath(),n.arc(80,80,72,0,Math.PI*2),n.clip(),n.drawImage(s,8,8,144,144),n.restore(),n.beginPath(),n.arc(80,80,74,0,Math.PI*2),n.lineWidth=10,n.strokeStyle="#"+t.toString(16).padStart(6,"0"),n.stroke();let i=new nn(e);return i.colorSpace=Se,i}function fd(s,t,e){let n=t-s;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return s+n*Math.min(1,e)}function Z_(){let s=[],t=[],e=(i,r)=>{let a=new Mt(r),o=i.toNonIndexed().attributes.position;for(let c=0;c<o.count;c++)s.push(o.getX(c),o.getY(c),o.getZ(c)),t.push(a.r,a.g,a.b)};for(let i of[-1,1])e(new me(.068,14,10).scale(.85,1.25,.45).translate(i*.12,-.02,.305),2758156),e(new me(.024,8,6).translate(i*.105,.03,.33),16777215),e(new me(.012,6,4).translate(i*.135,-.05,.33),16777215),e(new Ie(.1,.018,.02).rotateZ(i*-.18).translate(i*.125,.115,.31),3810328),e(new me(.05,10,8).scale(1.4,.7,.3).translate(i*.2,-.11,.255),16095910);e(new Gn(.035,.009,4,12,Math.PI).rotateZ(Math.PI).translate(0,-.13,.32),11814972);let n=new Ae;return n.setAttribute("position",new Kt(s,3)),n.setAttribute("color",new Kt(t,3)),n}function J_(){let s=[],t=[],e=(r,a)=>{let o=new Mt(a),c=r.toNonIndexed().attributes.position;for(let l=0;l<c.count;l++)s.push(c.getX(l),c.getY(l),c.getZ(l)),t.push(o.r,o.g,o.b)},n=[16777215,16761556,16748464,16773364];for(let r=0;r<12;r++){let a=r*2.4,o=r<1?0:.07+r%3*.035;e(new Cn(.055,1).translate(Math.cos(a)*o,.12+r%2*.02,Math.sin(a)*o),n[r%n.length])}e(new ne(.03,.02,.22,8).translate(0,-.02,0),5212730),e(new Gn(.035,.012,6,12).rotateX(Math.PI/2).translate(0,.02,0),16743072);let i=new Ae;return i.setAttribute("position",new Kt(s,3)),i.setAttribute("color",new Kt(t,3)),i.computeVertexNormals(),i}var Mo=class{constructor(){O(this,"canvas",document.createElement("canvas"));O(this,"frames",[document.createElement("canvas"),document.createElement("canvas")]);O(this,"onChange",()=>{});O(this,"g");O(this,"key","");O(this,"last",null);O(this,"imgs",new Map);this.canvas.width=1024,this.canvas.height=640,this.g=this.canvas.getContext("2d");for(let t of this.frames)t.width=512,t.height=640;this.draw(null)}image(t){if(!t.avatar)return null;if(!this.imgs.has(t.id)){this.imgs.set(t.id,null);let e=new Image;e.onload=()=>{this.imgs.set(t.id,e),this.key="",this.draw(this.last)},e.src="/avatar/"+encodeURIComponent(t.id),this.imgs.size>30&&this.imgs.delete(this.imgs.keys().next().value)}return this.imgs.get(t.id)??null}draw(t){this.last=t;let e=t?.bride??null,n=t?.groom??null,i=JSON.stringify([e?.id,e?.name,n?.id,n?.name]);if(i===this.key)return;this.key=i;let r=this.g,a=1024;r.clearRect(0,0,a,640),r.save(),r.beginPath(),r.ellipse(a/2,220,420,200,0,0,Math.PI*2);let c=r.createRadialGradient(a/2,180,40,a/2,220,420);c.addColorStop(0,"#e2283a"),c.addColorStop(1,"#a50f1c"),r.fillStyle=c,r.fill(),r.lineWidth=22,r.strokeStyle="#f2c94c",r.stroke(),r.lineWidth=5,r.strokeStyle="#fff1b8",r.beginPath(),r.ellipse(a/2,220,392,174,0,0,Math.PI*2),r.stroke(),r.restore(),r.textAlign="center",r.textBaseline="middle",r.fillStyle="#ffe08a",r.shadowColor="rgba(80,0,0,.5)",r.shadowBlur=8,r.font='italic bold 92px "Dancing Script", "Brush Script MT", "Segoe Script", Georgia, serif',r.fillText("L\u1EC5 Th\xE0nh H\xF4n",a/2,160),r.font='bold 130px "Noto Serif CJK SC", "Microsoft YaHei", "SimSun", serif',r.fillText("\u56CD",a/2,300),r.shadowBlur=0,r.fillStyle="#fff4f6",r.beginPath(),r.moveTo(90,470),r.lineTo(934,470),r.lineTo(900,520),r.lineTo(934,570),r.lineTo(90,570),r.lineTo(124,520),r.closePath(),r.fill(),r.lineWidth=6,r.strokeStyle="#f2c94c",r.stroke();let l=`${e?e.name:"Ch\u1EDD c\xF4 d\xE2u\u2026"}   \u2665   ${n?n.name:e?"Ch\u1EDD ch\xFA r\u1EC3\u2026":"\u2026"}`;r.fillStyle="#b3141f",r.font='bold 40px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif',r.fillText(yd(r,l,600),a/2,522),this.portrait(150,520,e),this.portrait(874,520,n),this.frame(this.frames[0],e,"C\xD4 D\xC2U","Ch\u1EDD c\xF4 d\xE2u\u2026"),this.frame(this.frames[1],n,"CH\xDA R\u1EC2","Ch\u1EDD ch\xFA r\u1EC3\u2026"),this.onChange()}frame(t,e,n,i){let r=t.getContext("2d"),a=512,o=640;r.clearRect(0,0,a,o);let c=r.createLinearGradient(0,0,a,o);c.addColorStop(0,"#fff1b0"),c.addColorStop(.3,"#e8b83a"),c.addColorStop(.55,"#fff6c8"),c.addColorStop(.8,"#c8901e"),c.addColorStop(1,"#f6d26a"),r.fillStyle=c,r.beginPath(),r.roundRect(0,0,a,o,40),r.fill(),r.fillStyle="#a50f1c",r.beginPath(),r.roundRect(26,26,a-52,o-52,26),r.fill(),r.strokeStyle="#fff1b8",r.lineWidth=4,r.beginPath(),r.roundRect(40,40,a-80,o-80,20),r.stroke();let l=62,h=96,u=a-124,f=420;r.save(),r.beginPath(),r.roundRect(l,h,u,f,16),r.clip();let d=e?this.image(e):null;if(d){let g=Math.max(u/d.width,f/d.height),x=d.width*g,m=d.height*g;r.drawImage(d,l+(u-x)/2,h+(f-m)/2,x,m)}else{let g=r.createLinearGradient(0,h,0,h+f);g.addColorStop(0,e?_d(e.id):"#f6c4d2"),g.addColorStop(1,"#ffe6ee"),r.fillStyle=g,r.fillRect(l,h,u,f),r.textAlign="center",r.textBaseline="middle",r.fillStyle="#fff",r.font='bold 150px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif',r.fillText(e?vd(e.name):"?",a/2,h+f/2+6)}r.restore(),r.strokeStyle="#f2c94c",r.lineWidth=8,r.beginPath(),r.roundRect(l,h,u,f,16),r.stroke(),r.fillStyle="#f2c94c",r.beginPath(),r.roundRect(a/2-120,40,240,52,26),r.fill(),r.textAlign="center",r.textBaseline="middle",r.fillStyle="#8a0f18",r.font='bold 34px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif',r.fillText("\u{1F497} "+n+" \u{1F497}",a/2,67),r.fillStyle="#fff4f6",r.beginPath(),r.roundRect(54,530,a-108,66,33),r.fill(),r.strokeStyle="#f2c94c",r.lineWidth=5,r.stroke(),r.fillStyle="#b3141f",r.font='bold 36px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif',r.fillText(yd(r,e?e.name:i,a-150),a/2,564),r.font='40px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';for(let[g,x]of[[34,34],[a-34,34],[34,o-34],[a-34,o-34]])r.fillText("\u{1F338}",g,x)}portrait(t,e,n){let i=this.g,r=74;i.save(),i.beginPath(),i.arc(t,e,r,0,Math.PI*2),i.closePath(),i.fillStyle=n?_d(n.id):"#e8b6c2",i.fill();let a=n?this.image(n):null;a?(i.clip(),i.drawImage(a,t-r,e-r,r*2,r*2)):(i.fillStyle="#fff",i.font='bold 64px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif',i.fillText(n?vd(n.name):"?",t,e+4)),i.restore(),i.beginPath(),i.arc(t,e,r,0,Math.PI*2),i.lineWidth=9,i.strokeStyle="#f2c94c",i.stroke()}};function vd(s){let t=s.replace(/[^\p{L}\p{N}\s]/gu,"").trim().split(/\s+/).filter(Boolean);return((t[0]?.[0]??"?")+(t.length>1?t[t.length-1][0]:"")).toUpperCase()}function _d(s){let t=0;for(let e of s)t=(t*31+e.charCodeAt(0))%360;return`hsl(${t}, 55%, 48%)`}function yd(s,t,e){if(s.measureText(t).width<=e)return t;let n=t;for(;n.length>1&&s.measureText(n+"\u2026").width>e;)n=n.slice(0,-1);return n+"\u2026"}var se=s=>document.getElementById(s);function X(s,t="",e=""){let n=document.createElement(s);return t&&(n.className=t),e&&(n.textContent=e),n}var So=class{constructor(){O(this,"bannerTimer",0);O(this,"page",0);O(this,"pageTimer",0);O(this,"waiterTimer",0);O(this,"waiterNames",[]);O(this,"waiterKind","");O(this,"chantTimer",0);O(this,"topKey","");O(this,"mcTimer",0)}stats(t){se("online").textContent=`${t.realOnline} kh\xE1ch \u0111ang xem`}live(t){let e=se("liveStatus");e.className="pill"+(t.status==="connected"?" live":t.status==="reconnecting"||t.status==="connecting"?" warn":""),e.textContent=t.status==="connected"?`\u25CF LIVE @${t.uniqueId}`:t.status==="reconnecting"?`\u0110ang n\u1ED1i l\u1EA1i @${t.uniqueId}`:t.status==="connecting"?"\u0110ang k\u1EBFt n\u1ED1i\u2026":t.status==="error"?"L\u1ED7i k\u1EBFt n\u1ED1i":"Ch\u01B0a k\u1EBFt n\u1ED1i"}wedding(t,e){let n=se("weddingBox"),i=Math.max(0,t.leftMs-e),r=Math.floor(i/6e4),a=Math.floor(i/1e3)%60,o=(u,f,d,g)=>{let x=X("div","wr"+(d?"":" empty"));return x.append(X("span","wi",u),X("span","wl",f),X("b","",d?d.name:g)),x},c=t.phase==="waiting"?"\u{1F449} Mu\u1ED1n l\xE0m c\xF4 d\xE2u, ch\xFA r\u1EC3? Xem 3 b\u01B0\u1EDBc C\xE1ch ch\u01A1i b\xEAn d\u01B0\u1EDBi":t.phase==="bride"?`\u{1F449} \u0110ang thi\u1EBFu ch\xFA r\u1EC3: b\xECnh lu\u1EADn "nam" r\u1ED3i t\u1EB7ng \u0111\xFAng ${Xn.joinXu} xu`:t.phase==="groom"?`\u{1F449} \u0110ang thi\u1EBFu c\xF4 d\xE2u: b\xECnh lu\u1EADn "n\u1EEF" r\u1ED3i t\u1EB7ng \u0111\xFAng ${Xn.joinXu} xu`:t.phase==="married"?ty(t,e)+(t.steals?` \xB7 ${t.steals} l\u1EA7n c\u01B0\u1EDBp`:""):"\u{1F491} C\xF4 d\xE2u ch\xFA r\u1EC3 n\u1EAFm tay v\xE0o nh\xE0, tr\u0103m n\u0103m h\u1EA1nh ph\xFAc!",l=[X("div","wt","\u{1F492} \u0110\xE1m c\u01B0\u1EDBi l\xE0ng qu\xEA"),o("\u{1F470}","C\xF4 d\xE2u",t.bride,"\u0111ang ch\u1EDD\u2026"),o("\u{1F935}","Ch\xFA r\u1EC3",t.groom,"\u0111ang ch\u1EDD\u2026"),X("div","ws",c)];if(t.phase==="married")l.push(X("div","wsteal",`\u{1F3C3} ${t.stealPrice} xu: nam c\u01B0\u1EDBp d\xE2u \xB7 \u{1F483} n\u1EEF c\u01B0\u1EDBp r\u1EC3`));else if(t.autoLeftMs>0&&(t.phase==="waiting"||t.phase==="bride"||t.phase==="groom")){let u=Math.max(0,t.autoLeftMs-e),f=Math.ceil(u/1e3),d=X("div","wauto"+(f<=30?" soon":""));d.append(X("b","wclock",`\u23F3 ${Math.floor(f/60)}:${String(f%60).padStart(2,"0")}`),X("span",""," n\u1EEFa l\xE0ng ch\u1ECDn ng\u1EABu nhi\xEAn c\xF4 d\xE2u ch\xFA r\u1EC3 trong ph\xF2ng")),l.push(d)}if(l.push(X("div","wg",`\u{1F372} ${t.guests.length} kh\xE1ch d\u1EF1 c\u01B0\u1EDBi`)),t.gifts.length){let u=X("ol","wm");for(let f of t.gifts){let d=X("li");d.append(X("span","",f.name),X("b","",`${f.value} xu`)),u.append(d)}l.push(X("div","wl2","\u{1F9E7} M\u1EEBng c\u01B0\u1EDBi"),u)}n.replaceChildren(...l),this.giftList();let h=se("giftList");h.style.top=innerWidth/innerHeight<.8?`${Math.round(n.getBoundingClientRect().bottom+6)}px`:""}showPage(t){this.page=t%Eo.length,se("giftHead").textContent=`${Eo[this.page].title}  ${this.page+1}/${Eo.length}`;for(let e of se("giftList").querySelectorAll(".gc"))e.style.display=e.dataset.page===String(this.page)?"":"none"}giftList(){let t=se("giftList");if(!t.childElementCount){let e=X("div","howto");for(let[i,r]of Q_){let a=X("div","hs");a.append(X("b","hn",i),X("span","",r)),e.append(a)}let n=X("div","gh2");n.id="giftHead",t.append(X("div","gh2","\u{1F4DC} C\xE1ch ch\u01A1i"),e,n),Eo.forEach((i,r)=>{for(let a of i.cards){let o=X("div","gc tone-"+a.tone);o.dataset.page=String(r);let c=X("div","gbadge");c.append(X("span","gemo",a.icon));let l=X("div","gbody"),h=X("div","gtop");h.append(X("b","gname",a.name),X("span","gprice",a.price)),l.append(h,X("div","gdesc",a.desc)),o.append(c,l),t.append(o)}})}this.pageTimer||(this.showPage(0),this.pageTimer=window.setInterval(()=>this.showPage(this.page+1),7e3))}waiterBox(){let t=document.getElementById("waiterBox");if(!t){t=X("div","waiterBox"),t.id="waiterBox",t.hidden=!0;let e=X("div","wpic");e.innerHTML=j_;let n=X("div","wtxt");n.append(X("b","wshout"),X("span","wwho"),X("small","wtab")),t.append(e,n),se("app").append(t)}return t}showWaiter(t,e){t.hidden=!1,t.style.animation="none",t.offsetWidth,t.style.animation="",clearTimeout(this.waiterTimer),this.waiterTimer=window.setTimeout(()=>{t.hidden=!0},e)}waiterAsk(t){let e=this.waiterBox();this.waiterKind="ask",this.waiterNames=[],e.className="waiterBox beer",e.querySelector(".wshout").textContent="\u{1F37A} BIA L\u1EA0NH \u0110\xC2Y!!!",e.querySelector(".wwho").textContent="Ai g\u1ECDi bia kh\xF4ng \u1EA1?",e.querySelector(".wtab").textContent=t,this.showWaiter(e,6e3)}waiter(t,e,n){let i=this.waiterBox();(i.hidden||this.waiterKind!==t)&&(this.waiterNames=[],this.waiterKind=t),this.waiterNames=[e,...this.waiterNames.filter(o=>o!==e)].slice(0,12);let r=this.waiterNames,a=r.length===1?r[0]:r.length===2?`${r[0]} v\xE0 ${r[1]}`:`${r[0]}, ${r[1]} v\xE0 ${r.length-2} ng\u01B0\u1EDDi n\u1EEFa`;i.className="waiterBox "+t,i.querySelector(".wshout").textContent=t==="beer"?"\u{1F37A} BIA \u0110\xC2Y!!!":"\u{1F357} M\xD3N \u0110\xC2Y!!!",i.querySelector(".wwho").textContent=`${a} ${t==="beer"?"g\u1ECDi bia":"g\u1ECDi th\xEAm m\xF3n"}`,i.querySelector(".wtab").textContent=r.length===1?`Ph\u1EE5c v\u1EE5 b\xEA ra m\xE2m s\u1ED1 ${n}, c\xF3 ngay!`:"Ph\u1EE5c v\u1EE5 ch\u1EA1y b\xE0n li\xEAn t\u1EE5c, c\xF3 ngay!",this.showWaiter(i,4200)}chant(t,e=!1){let n=document.getElementById("chant");n||(n=X("div"),n.id="chant",se("app").append(n)),n.textContent=t,n.className=e?"big":"",n.hidden=!1,n.style.animation="none",n.offsetWidth,n.style.animation="",clearTimeout(this.chantTimer),this.chantTimer=window.setTimeout(()=>{n.hidden=!0},e?1100:480)}top(t,e){let n=JSON.stringify([t,e]);if(n===this.topKey)return;this.topKey=n;let i=document.getElementById("topBox");i||(i=X("div"),i.id="topBox",se("app").append(i));let r=[X("b","tt",`\u{1F3C6} Top qu\xE0 c\u01B0\u1EDBi T${+e.slice(5)||""}`)];t.length||r.push(X("span","te","Ch\u01B0a c\xF3 ai, t\u1EB7ng qu\xE0 \u0111\u1EC3 l\xEAn b\u1EA3ng!")),t.forEach((a,o)=>{let c=X("span","tc t"+(o+1));c.append(X("i","",Js[o]),X("span","tn",a.name),X("b","",K_(a.xu))),r.push(c)}),i.replaceChildren(...r)}banner(t,e,n,i){let r=se("banner");r.className=`gift wed ${i}`;let a=X("div","gh"),o=X("div");o.append(X("b","",e),X("small","",n)),a.append(X("span","gi",t),o),r.replaceChildren(a),r.hidden=!1,r.style.animation="none",r.offsetWidth,r.style.animation="",clearTimeout(this.bannerTimer),this.bannerTimer=window.setTimeout(()=>{r.hidden=!0},5e3),this.confetti(i==="steal"?12:18,i==="steal"?["\u{1F3C3}","\u{1F4A5}","\u2764\uFE0F"]:["\u{1F338}","\u{1F490}","\u2764\uFE0F","\u{1F48D}"])}feed(t,e=""){if(!t)return;let n=se("feedFloat"),i=X("li",e,t);for(n.prepend(i);n.children.length>3;)n.lastElementChild.remove();setTimeout(()=>{i.classList.add("out"),setTimeout(()=>i.remove(),600)},5e3)}confetti(t,e){let n=se("hearts");for(let i=0;i<t;i++){let r=X("span","confetti",e[i%e.length]);r.style.left=`${Math.random()*100}%`,r.style.animationDelay=`${Math.random()*1.2}s`,r.style.animationDuration=`${2.6+Math.random()*1.6}s`,r.style.setProperty("--dx",`${(Math.random()-.5)*120}px`),r.style.fontSize=`${12+Math.random()*8}px`,n.append(r),setTimeout(()=>r.remove(),5200)}}offline(t){se("offline").hidden=!t}mc(t){let e=se("mcCaption");e.replaceChildren(X("b","","\u{1F3A4} MC: "),document.createTextNode(t)),e.hidden=!1,e.style.animation="none",e.offsetWidth,e.style.animation="",clearTimeout(this.mcTimer),this.mcTimer=window.setTimeout(()=>{e.hidden=!0},14e3)}},Js=["\u{1F947}","\u{1F948}","\u{1F949}"],K_=s=>s>=1e4?`${(s/1e3).toFixed(s>=1e5?0:1).replace(".0","")}k xu`:`${s.toLocaleString("vi-VN")} xu`,Lh={beer:["G\u1ECDi bia","Ph\u1EE5c v\u1EE5 b\xEA bia ra m\xE2m","gold"],food:["G\u1ECDi m\xF3n","Th\xEAm m\xF3n n\xF3ng ra m\xE2m","orange"],confetti:["Ph\xE1o gi\u1EA5y","Hai \u1ED1ng ph\xE1o gi\u1EA5y n\u1ED5 tung","pink"],fireworks:["Ph\xE1o hoa","Tr\u1EDDi t\u1ED1i, ph\xE1o hoa r\u1EF1c r\u1EE1","blue"],toast:["N\xE2ng ly","C\u1EA3 ti\u1EC7c h\xF4 DZ\xD4 3 l\u1EA7n","gold"],dance:["S\xE0n nh\u1EA3y","C\u1EA3 s\xE2n nh\u1EA3y nh\u1EA1c s\xE0n x\u01B0a","purple"],heartRain:["M\u01B0a tim","Tim h\u1ED3ng r\u01A1i kh\u1EAFp s\xE2n","pink"],lion:["M\xFAa l\xE2n","L\xE2n v\xE0o s\xE2n m\xFAa ch\xFAc","red"],lantern:["\u0110\xE8n tr\u1EDDi","Ho\xE0ng h\xF4n, th\u1EA3 \u0111\xE8n tr\u1EDDi","orange"],rainbow:["C\u1EA7u v\u1ED3ng","C\u1EA7u v\u1ED3ng, m\u01B0a hoa v\xE0ng","green"],grand:["Ph\xE1o tim","T\xEAn b\u1EA1n s\xE1ng tr\xEAn tr\u1EDDi","red"]},Dn=s=>Ch.filter(t=>t.xu===s).map(t=>({icon:t.icon,name:Lh[t.key][0],price:`${t.xu} xu`,desc:Lh[t.key][1],tone:Lh[t.key][2]})),Eo=[{title:"\u{1F381} Qu\xE0 nh\u1ECF",cards:[...Dn(1),{icon:"\u{1F48D}",name:"V\xE0o vai",price:`${Xn.joinXu} xu`,desc:"L\xE0m c\xF4 d\xE2u, ch\xFA r\u1EC3 (vai tr\u1ED1ng)",tone:"pink"},...Dn(5),...Dn(10),...Dn(30),{icon:"\u{1F3C3}",name:"C\u01B0\u1EDBp d\xE2u, r\u1EC3",price:`${Xn.cuop} xu`,desc:"Nam c\u01B0\u1EDBp d\xE2u, n\u1EEF c\u01B0\u1EDBp r\u1EC3",tone:"red"}]},{title:"\u2728 Qu\xE0 l\u1EDBn",cards:[...Dn(99),...Dn(200),...Dn(299),...Dn(500),...Dn(1e3),...Dn(1500)]},{title:"\u{1F451} Si\xEAu qu\xE0 v\xE0 th\xEAm",cards:[...Dn(2e3),{icon:"\u{1F457}",name:"\xC1o m\u1EDBi",price:"T\u1EEB 20 xu",desc:"\u0110\u1ED5i trang ph\u1EE5c m\u1EDBi",tone:"purple"},{icon:"\u23F0",name:"Th\xEAm gi\u1EDD",price:"M\u1ED7i 40 xu",desc:"+20 gi\xE2y l\u1EC5 c\u01B0\u1EDBi",tone:"blue"},{icon:"\u2764\uFE0F",name:"V\xE0o d\u1EF1",price:"Tim, chat",desc:"Ng\u1ED3i m\xE2m \u0103n c\u1ED7",tone:"green"}]}],Q_=[["1",'B\xECnh lu\u1EADn "nam" ho\u1EB7c "n\u1EEF" \u0111\u1EC3 ch\u1ECDn nh\xE2n v\u1EADt'],["2",`T\u1EB7ng \u0111\xFAng ${Xn.joinXu} xu (3 b\xF4ng hoa li\u1EC1n c\u0169ng \u0111\u01B0\u1EE3c): n\u1EEF l\xE0m \u{1F470} c\xF4 d\xE2u, nam l\xE0m \u{1F935} ch\xFA r\u1EC3. Ch\u01B0a ch\u1ECDn th\xEC v\xE0o vai \u0111ang tr\u1ED1ng`],["3",`Vai c\xF3 ng\u01B0\u1EDDi r\u1ED3i? T\u1EB7ng ${Xn.cuop} xu: nam c\u01B0\u1EDBp d\xE2u, n\u1EEF c\u01B0\u1EDBp r\u1EC3`],["\u2728","M\u1ED7i m\u1EE9c qu\xE0 m\u1ED9t m\xE0n ri\xEAng, xem b\u1EA3ng b\xEAn d\u01B0\u1EDBi"]],j_=`<svg viewBox="0 0 130 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M28 150 Q30 96 65 92 Q100 96 102 150Z" fill="#fff" stroke="#ddd"/>
<path d="M44 150 L48 100 L60 112 L56 150Z M86 150 L82 100 L70 112 L74 150Z" fill="#1c1c22"/>
<path d="M65 96 l-11 -6 v12z M65 96 l11 -6 v12z" fill="#d61f2c"/><circle cx="65" cy="96" r="3" fill="#a3141f"/>
<path d="M34 112 Q20 96 22 74" stroke="#fff" stroke-width="13" fill="none" stroke-linecap="round"/>
<circle cx="22" cy="72" r="7" fill="#f6d2b4"/>
<ellipse cx="22" cy="66" rx="22" ry="4.5" fill="#cfd3da" stroke="#9aa0a8"/>
<g class="mugs"><rect x="6" y="42" width="13" height="21" rx="2.5" fill="#f2a92a" stroke="#b8781a"/><rect x="24" y="42" width="13" height="21" rx="2.5" fill="#f2a92a" stroke="#b8781a"/>
<ellipse cx="12.5" cy="42" rx="8" ry="4.5" fill="#fffbea"/><ellipse cx="30.5" cy="42" rx="8" ry="4.5" fill="#fffbea"/>
<path d="M19 47 h4 v9 h-4" fill="none" stroke="#b8781a" stroke-width="2.4"/><path d="M37 47 h4 v9 h-4" fill="none" stroke="#b8781a" stroke-width="2.4"/></g>
<g class="dish"><ellipse cx="22" cy="58" rx="15" ry="8" fill="#e8742a"/><ellipse cx="17" cy="55" rx="5" ry="3" fill="#ffb060"/><path d="M33 56 q6 -6 10 -2" stroke="#fff" stroke-width="3" fill="none"/></g>
<path d="M96 112 Q110 96 99 76" stroke="#fff" stroke-width="13" fill="none" stroke-linecap="round"/>
<circle cx="65" cy="54" r="31" fill="#f6d2b4"/>
<path d="M34 50 Q36 20 66 21 Q95 21 96 50 Q88 34 66 35 Q44 34 34 50Z" fill="#1a1210"/>
<path d="M47 50 q6 -6 12 0 M71 50 q6 -6 12 0" stroke="#2a160c" stroke-width="3.2" fill="none" stroke-linecap="round"/>
<ellipse cx="44" cy="62" rx="6" ry="3.5" fill="#f59aa6" opacity=".8"/><ellipse cx="86" cy="62" rx="6" ry="3.5" fill="#f59aa6" opacity=".8"/>
<ellipse class="mouth" cx="65" cy="70" rx="10" ry="9" fill="#7a1420"/><ellipse cx="65" cy="75" rx="6" ry="3.5" fill="#f07a8a"/>
<circle cx="97" cy="70" r="7.5" fill="#f6d2b4"/>
<g class="yell" stroke="#ffd23a" stroke-width="4" stroke-linecap="round" fill="none"><path d="M110 58 l12 -8"/><path d="M112 70 h14"/><path d="M110 82 l12 8"/></g>
</svg>`;function ty(s,t){let e=n=>{let i=Math.max(0,n-t);return`${Math.floor(i/6e4)}:${String(Math.floor(i/1e3)%60).padStart(2,"0")}`};return s.step==="introBride"?`\u{1F3A4} Gi\u1EDBi thi\u1EC7u c\xF4 d\xE2u \xB7 ${e(s.stepLeftMs)}`:s.step==="introGroom"?`\u{1F3A4} Gi\u1EDBi thi\u1EC7u ch\xFA r\u1EC3 \xB7 ${e(s.stepLeftMs)}`:s.step==="giaTien"?`\u{1F64F} L\u1EC5 gia ti\xEAn \xB7 ${e(s.stepLeftMs)}`:s.step==="rings"?`\u{1F48D} Trao nh\u1EABn \xB7 ${e(s.stepLeftMs)}`:s.step==="ruou"?`\u{1F377} R\u01B0\u1EE3u giao b\xF4i \xB7 ${e(s.stepLeftMs)}`:s.step==="banh"?`\u{1F382} C\u1EAFt b\xE1nh c\u01B0\u1EDBi \xB7 ${e(s.stepLeftMs)}`:`\u{1F942} Ti\u1EC7c c\u01B0\u1EDBi \xB7 c\xF2n ${e(s.leftMs)}`}var Br=["trai","gai","cuop"],qn={trai:new T(4.6,1.4,6.5),gai:new T(-4.6,1.4,6.5),cuop:new T(0,1.4,11.5)},bd={trai:3836927,gai:16734874,cuop:11553535},Md=s=>s.toLocaleString("vi-VN"),Ed=s=>`${Math.floor(s/6e4)}:${String(Math.floor(s/1e3)%60).padStart(2,"0")}`,To=class{constructor(t){O(this,"group",new he);O(this,"shake",0);O(this,"domes",{});O(this,"sparks");this.sparks=t;for(let e of Br){let n=new wt(new me(e==="cuop"?3:3.6,28,14,0,Math.PI*2,0,Math.PI/2),new de({color:8052991,transparent:!0,opacity:0,blending:je,depthWrite:!1,side:Te}));n.position.set(qn[e].x,0,qn[e].z),n.scale.y=.75,n.visible=!1,this.domes[e]=n,this.group.add(n)}}update(t,e,n,i){this.shake=Math.max(0,this.shake-t*2.5);for(let r of Br){let a=this.domes[r],o=n?.phase!=="idle"?n?.teams[r]:null,c=!!o&&o.shieldMs-i>0,l=a.material;if(l.opacity+=((c?.22+Math.sin(e/160)*.06:0)-l.opacity)*Math.min(1,t*6),a.visible=l.opacity>.01,!o)continue;let h=qn[r];o.boostMs-i>0&&Math.random()<t*22&&this.sparks.glow(new T(h.x+(Math.random()-.5)*5,1.2,h.z+(Math.random()-.5)*5)),o.drumMs-i>0&&Math.random()<t*8&&this.sparks.burst(new T(h.x+(Math.random()-.5)*4,1.6,h.z+(Math.random()-.5)*4),[16730698,16766042],4,1.4)}}power(t,e){e&&this.sparks.arc(e,qn[t],[bd[t],16777215],10,.7)}attack(t,e,n){let i=qn[t].clone().setY(2),r=qn[e].clone().setY(1.2);this.sparks.arc(i,r,n?[16726570,16766042,16777215]:[16734778,16777215],n?70:34,n?1.1:.8,n?1.4:.6),setTimeout(()=>{this.sparks.burst(r,[16726570,16752704,16777215],n?140:60,n?7:4.5),this.shake=n?1.2:.55},(n?1.1:.8)*1e3)}blocked(t){let e=qn[t];this.sparks.burst(new T(e.x,2.6,e.z),[8052991,16777215],70,4)}dragon(t){let e=qn[t];for(let n=0;n<4;n++)setTimeout(()=>this.sparks.burst(new T(e.x+(n-1.5)*1.4,2.2+n*.3,e.z),[16766042,16747050,16774064],40,3.5),n*180)}ultimate(t){this.shake=2;for(let e of Br)e!==t&&setTimeout(()=>this.sparks.burst(qn[e].clone().setY(1.5),[16766042,16726570,8052991,16777215],180,8),900);this.sparks.fireworks()}win(t){let e=qn[t];this.sparks.fireworks(),this.sparks.hearts(e),this.sparks.rain([bd[t],16766042,16777215],300,5)}},wo=class{constructor(){O(this,"built",!1)}render(t,e){let n=se("battleBox"),i=vo.phases.findIndex(u=>u.key===t.phase),r=vo.phases[i],a=Math.max(0,t.phaseLeftMs-e),o=[],c=X("div","bh");if(c.append(X("b","","\u2694\uFE0F \u0110\u1EA1i chi\u1EBFn Nh\xE0 trai \u2013 Nh\xE0 g\xE1i"),X("span","bclock",Ed(Math.max(0,t.leftMs-e)))),o.push(c),r){let u=X("div","bsteps");vo.phases.forEach((f,d)=>u.append(X("span",d<i?"done":d===i?"now":"",f.name))),o.push(u,X("div","bphase",`${r.when} \xB7 ${r.name} \xB7 c\xF2n ${Ed(a)}${t.climax?" \xB7 \u{1F525} \u0110I\u1EC2M x2":""}`))}let l=Math.max(1,...Br.map(u=>t.teams[u].power));for(let u of Br){let f=t.teams[u],d=X("div",`bteam ${u}${t.winner===u?" win":""}`),g=[f.shieldMs-e>0?`\u{1F6E1}\uFE0F${Math.ceil((f.shieldMs-e)/1e3)}s`:"",f.boostMs-e>0?`${f.boostX>=2?"\u{1F451}":"\u{1F409}"}x${f.boostX}`:"",f.drumMs-e>0?"\u{1F941}x3":""].filter(Boolean).join(" "),x=X("div","bbar"),m=X("i");m.style.width=`${Math.round(f.power/l*100)}%`,x.append(m);let p=X("div","bname");p.append(X("span","",`${di[u].icon} ${di[u].name}`),X("small","",`${f.count} ng\u01B0\u1EDDi`));let y=X("div","blead",f.leader?`${f.leader.crown?"\u{1F451} Ch\u1EE7 so\xE1i":di[u].leader}: ${f.leader.name}`:"ch\u01B0a c\xF3 ai");d.append(p,x,X("b","bpow",Md(f.power)),X("span","btags",g),y),o.push(d)}if(t.phase==="final"){o.push(X("div","bwin",t.winner?`\u{1F3C6} ${di[t.winner].name} chi\u1EBFn th\u1EAFng!`:"\u{1F91D} H\xF2a"));for(let u of t.titles){let f=X("div","btitle");f.append(X("span","",u.title),X("b","",u.name)),o.push(f)}}else o.push(X("div","bhint",t.phase==="recruit"?"\u{1F449} B\xECnh lu\u1EADn 1 Nh\xE0 trai \xB7 2 Nh\xE0 g\xE1i \xB7 3 C\u01B0\u1EDBp d\xE2u (\u0111\u01B0\u1EE3c \u0111\u1ED5i phe trong 2 ph\xFAt \u0111\u1EA7u)":"\u{1F449} Ch\u01B0a c\xF3 phe: b\xECnh lu\u1EADn 1 / 2 / 3 \xB7 B\xECnh lu\u1EADn, th\u1EA3 tim \u0111\u1EC3 c\u1ED5 v\u0169 phe m\xECnh"));n.replaceChildren(...o),this.gifts(i);let h=se("battleGifts");h.style.top=innerWidth/innerHeight<.8?`${Math.round(n.getBoundingClientRect().bottom+6)}px`:""}gifts(t){let e=se("battleGifts");if(!this.built){this.built=!0,e.append(X("div","gh2","\u{1F381} Qu\xE0 k\u1EF9 n\u0103ng"));for(let n of jf){let i=X("div","gr"+(n.key==="kiem"||n.key==="ngua"||n.key==="songlong"?" atk":""));i.append(X("span","gi2",n.icon),X("b","gx2",`${Md(n.xu)} xu`),X("span","gt2",`${n.name}: ${n.label}`)),e.append(i)}e.append(X("div","gnote","\u2694\uFE0F Ki\u1EBFm, Ng\u1EF1a chi\u1EBFn, Song long m\u1EDF t\u1EEB ph\xFAt 5 \xB7 \u2764\uFE0F Tim, b\xECnh lu\u1EADn c\u0169ng c\u1ED9ng s\u1EE9c m\u1EA1nh"))}e.classList.toggle("locked",t>=0&&t<2)}ultimate(t,e){let n=se("ultimate");n.replaceChildren(X("div","udragon l","\u{1F432}"),X("div","udragon r","\u{1F409}"),X("div","utext","\u{1F432} SONG LONG \u{1F432}"),X("div","usub",`${t} \xB7 ${di[e].name}`)),n.className="u "+e,n.hidden=!1,n.style.animation="none",n.offsetWidth,n.style.animation="",setTimeout(()=>{n.hidden=!0},4200)}dash(t){let e=X("div","dash",t);se("hearts").append(e),setTimeout(()=>e.remove(),1600)}};var Sd=2600,Td=260,wd=[16726876,16765498,3854591,8257386,16747232,16777215,16753978,11565823,15911244,15263984],ey=new zt,Ad=new Oe,ny=new Xe,$b=new T,iy=new T,sy=new Mt,Ao=class{constructor(){O(this,"group",new he);O(this,"paper");O(this,"ribbon");O(this,"bits",[]);O(this,"ribs",[]);O(this,"tubes",[]);let t=new Wt({side:Te,roughness:.35,metalness:.35});this.paper=new Je(new en(.075,.11),t,Sd);let e=new en(.035,.7,1,16),n=e.attributes.position;for(let i=0;i<n.count;i++){let r=n.getY(i),a=r*11;n.setXYZ(i,n.getX(i)+Math.sin(a)*.06,r,Math.cos(a)*.06)}e.computeVertexNormals(),this.ribbon=new Je(e,t,Td);for(let i of[this.paper,this.ribbon])i.count=0,i.frustumCulled=!1,this.group.add(i)}fire(t,e,n=360,i=1){let r=new T().crossVectors(e,new T(0,0,1)).normalize(),a=new T().crossVectors(r,e).normalize(),o=(c,l,h,u)=>{for(let f=0;f<h;f++){c.length>=l&&c.shift();let d=Math.random()*Math.PI*2,g=Math.pow(Math.random(),.6)*.32,x=e.clone().addScaledVector(r,Math.cos(d)*g).addScaledVector(a,Math.sin(d)*g).normalize().multiplyScalar((10+Math.random()*5)*i*(u?.85:1));c.push({p:t.clone(),v:x,rx:Math.random()*6,ry:Math.random()*6,rz:Math.random()*6,sx:(Math.random()-.5)*16,sy:(Math.random()-.5)*10,sz:(Math.random()-.5)*16,age:-Math.random()*.06,life:(u?9:8)+Math.random()*3,ph:Math.random()*6,k:u?2.2+Math.random():3+Math.random()*2.5,landed:!1,color:wd[Math.floor(Math.random()*wd.length)]})}};o(this.bits,Sd,n,!1),o(this.ribs,Td,Math.round(n/9),!0)}cannons(t,e){for(let n of[-1,1]){let i=new T(t.x+n*2.4,.95,t.z+1.2);this.tube(i,n),this.fire(i,new T(-n*.22,1,.42).normalize(),520,1.05)}e&&this.fire(new T(e.x,1.4,e.z),new T(0,1,.15).normalize(),240,.8)}tube(t,e){let n=new he,i=new wt(new ne(.13,.11,.9,16),new Wt({color:16765498,metalness:.6,roughness:.3}));i.position.y=-.2;let r=new wt(new ne(.135,.135,.12,16),new Wt({color:14032684,roughness:.5}));r.position.y=-.1;let a=r.clone();a.position.y=-.45,n.add(i,r,a),n.position.copy(t).setY(.45),n.rotation.z=e*.22,n.rotation.x=.4,this.group.add(n),this.tubes.push({g:n,t:0,side:e})}update(t,e){let n=(i,r,a)=>{let o=0;for(let c of i){if(c.age+=t,c.age<0||c.age>c.life)continue;if(!c.landed){let h=.25+c.k*Ur.smoothstep(c.age,.12,.9),u=Math.exp(-h*t);c.v.x*=u,c.v.z*=u,c.v.y=c.v.y*u-9.8*t;let f=Ur.smoothstep(c.age,.5,1.5);c.p.x+=(c.v.x+Math.sin(e/260+c.ph)*.9*f)*t,c.p.y+=c.v.y*t,c.p.z+=(c.v.z+Math.cos(e/340+c.ph*1.3)*.6*f)*t,c.rx+=c.sx*t,c.ry+=c.sy*t,c.rz+=c.sz*t,c.p.y<=.02&&(c.p.y=.02+Math.random()*.01,c.landed=!0,c.rx=-Math.PI/2,c.rz=0,c.life=Math.max(c.life,c.age+3))}let l=Math.min(1,(c.life-c.age)/.8);Ad.setFromEuler(ny.set(c.rx,c.ry,c.rz)),r.setMatrixAt(o,ey.compose(c.p,Ad,iy.setScalar(l))),r.setColorAt(o++,sy.set(c.color))}r.count=o,r.instanceMatrix.needsUpdate=!0,r.instanceColor&&(r.instanceColor.needsUpdate=!0)};this.bits=this.bits.filter(i=>i.age<=i.life),this.ribs=this.ribs.filter(i=>i.age<=i.life),n(this.bits,this.paper,!1),n(this.ribs,this.ribbon,!0);for(let i of this.tubes){i.t+=t;let r=i.t<.15?i.t/.15:i.t>3?Math.max(0,1-(i.t-3)/.4):1,a=i.t<.4?Math.sin(i.t/.4*Math.PI)*.12:0;i.g.scale.setScalar(Math.max(.001,r)),i.g.position.y=.45-a}for(let i of this.tubes.filter(r=>r.t>3.4))this.group.remove(i.g),i.g.traverse(r=>{r instanceof wt&&(r.geometry.dispose(),r.material.dispose())});this.tubes=this.tubes.filter(i=>i.t<=3.4)}};var Ks=16e3,Ro=[[1,.25,.3],[1,.8,.25],[.35,.7,1],[.5,1,.45],[.95,.4,1],[1,.55,.15]],Dh=[1,.7,.3],Co=class{constructor(t,e){O(this,"points");O(this,"stars",[]);O(this,"pos",new Float32Array(Ks*3));O(this,"col",new Float32Array(Ks*3));O(this,"siz",new Float32Array(Ks));O(this,"geo",new Ae);O(this,"mat");O(this,"lights",[]);O(this,"timers",[]);O(this,"hooks");this.hooks=e,this.geo.setAttribute("position",new Be(this.pos,3).setUsage(Ys)),this.geo.setAttribute("color",new Be(this.col,3).setUsage(Ys)),this.geo.setAttribute("size",new Be(this.siz,1).setUsage(Ys)),this.geo.setDrawRange(0,0),this.mat=new Ce({uniforms:{scale:{value:600}},vertexShader:`attribute float size; attribute vec3 color; varying vec3 vColor; uniform float scale;
        void main(){ vColor = color; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = max(1.0, size * scale / -mv.z); gl_Position = projectionMatrix * mv; }`,fragmentShader:`varying vec3 vColor;
        void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; float a = smoothstep(0.5, 0.05, d); float core = smoothstep(0.18, 0.0, d);
          gl_FragColor = vec4(vColor * (a + core * 0.6), a); }`,transparent:!0,depthWrite:!1,blending:je}),this.points=new Xa(this.geo,this.mat),this.points.frustumCulled=!1,t.add(this.points);for(let n=0;n<3;n++){let i=new Xs(16777215,0,60,1.2);t.add(i),this.lights.push({l:i,v:0})}}add(t){if(this.stars.length>=Ks)return null;let e={vx:0,vy:0,vz:0,age:0,life:1,r:1,g:1,b:1,r2:-1,g2:0,b2:0,size:.2,drag:0,grav:0,trail:0,flick:0,pop:!1,rocket:null,...t};return this.stars.push(e),e}launch(t,e=(Math.random()-.5)*13,n=!1){let i=["peony","willow","ring","chrys","crackle","palm"],r=t??i[Math.floor(Math.random()*i.length)],a=Ro[Math.floor(Math.random()*Ro.length)],o=Ro[Math.floor(Math.random()*Ro.length)],c=(n?9.5:7.5)+Math.random()*2,l=Math.sqrt(2*9.8*c),h=l/9.8;this.add({x:e,y:1.5,z:-6.5,vx:(Math.random()-.5)*1.5,vy:l,vz:(8+Math.random()*3)/h,life:9,r:1,g:.75,b:.4,size:.3,grav:9.8,trail:70,rocket:{kind:r,color:a,color2:o,big:n}}),this.hooks.launch()}salvo(t,e=4e3){for(let n=0;n<t;n++){let i=n===t-1&&t>2;this.later(n*e/Math.max(1,t-1)+Math.random()*200,()=>this.launch(i?"chrys":void 0,i?0:void 0,i))}}later(t,e){this.timers.push(window.setTimeout(e,t)),this.timers.length>60&&this.timers.shift()}explode(t){let e=t.rocket,n=e.big?1.35:1,[i,r,a]=e.color;this.add({x:t.x,y:t.y,z:t.z,life:.18,r:3,g:3,b:3,size:5*n});let o=this.lights.reduce((h,u)=>h.v<u.v?h:u);o.l.position.set(t.x,t.y,t.z),o.l.color.setRGB(i*.7+.3,r*.7+.3,a*.7+.3),o.v=1;let c=new T,l=(h,u)=>{this.add({x:t.x,y:t.y,z:t.z,vx:c.x*h+t.vx*.3,vy:c.y*h+t.vy*.3,vz:c.z*h,r:i*1.25,g:r*1.25,b:a*1.25,size:.42,drag:1.9,grav:2.4,life:1.8+Math.random()*.7,flick:.4,...u})};switch(e.kind){case"peony":{let h=Math.round(150*n);for(let u=0;u<h;u++)c.randomDirection(),l((8+Math.random()*1.2)*n,{trail:6});break}case"chrys":{let h=Math.round(180*n),[u,f,d]=e.color2;for(let g=0;g<h;g++)c.randomDirection(),l((8.5+Math.random())*n,{r:2.2,g:1.9,b:1.4,r2:u*1.9,g2:f*1.9,b2:d*1.9,trail:22,life:2.2+Math.random()*.5});for(let g=0;g<h/3;g++)c.randomDirection(),l(4*n,{r:i*2,g:r*2,b:a*2,life:1.6,trail:0});break}case"willow":{let h=Math.round(110*n);for(let u=0;u<h;u++)c.randomDirection(),l((6.5+Math.random())*n,{r:Dh[0]*1.6,g:Dh[1]*1.6,b:Dh[2]*1.6,drag:2.6,grav:1.6,life:3.6+Math.random()*.9,trail:45,size:.26,flick:.6});break}case"ring":{let h=Math.round(90*n),u=new T().randomDirection(),f=new T().crossVectors(u,new T(0,1,.3)).normalize(),d=new T().crossVectors(u,f);for(let p=0;p<h;p++){let y=p/h*Math.PI*2;c.copy(f).multiplyScalar(Math.cos(y)).addScaledVector(d,Math.sin(y)),l(8.5*n,{trail:8})}let[g,x,m]=e.color2;for(let p=0;p<40;p++)c.randomDirection(),l(3*n,{r:g*2,g:x*2,b:m*2,life:1.4});break}case"crackle":{let h=Math.round(110*n);for(let u=0;u<h;u++)c.randomDirection(),l((7.5+Math.random()*1.5)*n,{r:2,g:2,b:1.8,life:1.2+Math.random()*.5,pop:!0,trail:4,size:.24});break}case"palm":{for(let h=0;h<14;h++)c.set(Math.cos(h/14*Math.PI*2),.5+Math.random()*.4,Math.sin(h/14*Math.PI*2)).normalize(),l(9*n,{r:2,g:1.5,b:.6,size:.55,drag:1.4,grav:3.2,life:2.6,trail:70,flick:.2});for(let h=0;h<50;h++)c.randomDirection(),l(5*n,{r:i*2,g:r*2,b:a*2,life:1.5});break}}this.hooks.burst(e.kind,e.big)}update(t,e,n){this.mat.uniforms.scale.value=n.domElement.height/(2*Math.tan(Ur.degToRad(e.fov)/2));let i=[],r=0;for(let a of this.stars){if(a.age+=t,a.age>=a.life)continue;let o=Math.exp(-a.drag*t);if(a.vx*=o,a.vy=a.vy*o-a.grav*t,a.vz*=o,a.x+=a.vx*t,a.y+=a.vy*t,a.z+=a.vz*t,a.rocket&&a.vy<1.5){this.explode(a),a.age=a.life;continue}if(a.trail&&Math.random()<a.trail*t){let d=a.age/a.life,g=a.rocket?1:.55*(1-d);i.push({x:a.x,y:a.y,z:a.z,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4-(a.rocket?1.5:.3),vz:0,age:0,life:a.rocket?.45:.5+Math.random()*.6,r:(a.rocket?1.6:a.r)*g,g:(a.rocket?1:a.g)*g,b:(a.rocket?.4:a.b)*g,r2:-1,g2:0,b2:0,size:a.size*.6,drag:1,grav:1.2,trail:0,flick:.3,pop:!1,rocket:null})}if(a.pop&&a.age>a.life*.75){a.pop=!1;for(let d=0;d<4;d++)i.push({x:a.x,y:a.y,z:a.z,vx:(Math.random()-.5)*3,vy:(Math.random()-.5)*3,vz:(Math.random()-.5)*3,age:0,life:.25+Math.random()*.2,r:2.4,g:2.4,b:2.2,r2:-1,g2:0,b2:0,size:.16,drag:3,grav:1,trail:0,flick:0,pop:!1,rocket:null})}if(r>=Ks)continue;let c=a.age/a.life,l=c<.7?1:1-(c-.7)/.3;a.flick&&c>.45&&(l*=1-a.flick+a.flick*(Math.random()<.5?1:.2));let h=a.r,u=a.g,f=a.b;if(a.r2>=0&&c>.4){let d=Math.min(1,(c-.4)*4);h+=(a.r2-h)*d,u+=(a.g2-u)*d,f+=(a.b2-f)*d}this.pos[r*3]=a.x,this.pos[r*3+1]=a.y,this.pos[r*3+2]=a.z,this.col[r*3]=h*l,this.col[r*3+1]=u*l,this.col[r*3+2]=f*l,this.siz[r]=a.size*(a.rocket?1:.6+.4*l),r++}this.stars=this.stars.filter(a=>a.age<a.life);for(let a of i)this.stars.length<Ks&&this.stars.push(a);this.geo.setDrawRange(0,r);for(let a of["position","color","size"])this.geo.attributes[a].needsUpdate=!0;for(let a of this.lights)a.v*=Math.exp(-t*3.2),a.l.intensity=a.v<.01?0:a.v*260}};var Lo={stolen:{x:0,z:4,yaw:0},def:{x:-1.6,z:5,yaw:1.1},thief:{x:1.6,z:5,yaw:-1.1}},pn={x:0,z:4.8},Do=3.4,Rd=s=>({x:Math.sin(s),z:Math.cos(s)}),Uh=(s,t)=>Math.atan2(t.x-s.x,t.z-s.z),Po=class{constructor(t,e,n){O(this,"group",new he);O(this,"spots",new Map);O(this,"poses",new Map);O(this,"props",[]);O(this,"queue",[]);O(this,"busyUntil",0);O(this,"chase",null);O(this,"stars",[]);O(this,"dashUntil",0);O(this,"thiefId","");O(this,"cast");O(this,"sparks");O(this,"hooks");this.cast=t,this.sparks=e,this.hooks=n}spot(t){let e=this.spots.get(t);return e&&performance.now()<e.until?e:null}pose(t){let e=this.poses.get(t);return e&&performance.now()<e.until?e.pose:""}hold(t,e,n){this.spots.set(t,{...e,until:performance.now()+n});let i=this.cast.actors.get(t);i&&(i.tx=e.x,i.tz=e.z,i.tyaw=e.yaw)}release(...t){for(let e of t)this.spots.delete(e);this.hooks.reassign()}setPose(t,e,n){let i=this.cast.actors.get(t),r=performance.now()+n;this.poses.set(t,{pose:e,until:r}),i&&(i.pose=e),setTimeout(()=>{let a=this.poses.get(t);a&&a.until===r&&(this.poses.delete(t),i&&i.pose===e&&(i.pose=""))},n)}hurt(t,e,n){this.setPose(t,"hurt",e),this.cast.say(t,n,Math.max(1400,e));let i=this.cast.actors.get(t);i&&this.sparks.burst(new T(i.x,1.7,i.z),[16769354,16777215,16738874],18,2.2)}walkMs(t,e,n){return t.speed=n,Math.hypot(t.x-e.x,t.z-e.z)/n*1e3+80}start(t,e,n){this.thiefId=t,this.dashUntil=performance.now()+3500;let i=this.cast.actors.get(t);i&&(i.speed=7.5),setTimeout(()=>{let r=this.cast.actors.get(t);r&&r.speed>3&&(r.speed=2.4)},3500),this.cast.say(t,"\u{1F3C3} C\u01B0\u1EDBp \u0111\xE2y!!!",3500),this.cast.say(e,"\u{1F620} \u0110\u1EE9a n\xE0o d\xE1m!",3500),this.cast.say(n,"\u{1F631} \u1ED0i gi\u1EDDi \u01A1i!",3500),this.hooks.sound("start")}end(t,e,n){this.queue=[],this.chase=null;for(let i of[e,n]){let r=this.cast.actors.get(i);r&&(r.hold="",r.speed=2.4)}if(this.spots.clear(),this.poses.clear(),t==="cuop")this.cast.say(e,"\u{1F60E} C\u01B0\u1EDBp \u0111\u01B0\u1EE3c r\u1ED3i nh\xE9!",4e3),this.cast.cheer(e,4e3),this.setPose(n,"hurt",2500),this.cast.say(n,"\u{1F62D} Tr\u1EDDi \u01A1i!",3e3),this.hooks.sound("win");else{this.cast.say(e,"\u{1F62D} Th\xF4i em v\u1EC1 m\xE2m!",4e3),this.cast.say(n,"\u{1F4AA} \u0110i v\u1EC1!",3e3),this.cast.cheer(n,4e3);let i=this.cast.actors.get(n);i&&(i.hold="stick",this.setPose(n,"swing",2500),setTimeout(()=>{i.hold=""},2500));let r=this.cast.actors.get(e);r&&(r.speed=6),this.hooks.sound("lose")}}hit(t,e,n,i,r){if(this.cast.actors.get(n)){if(t==="dep"){this.slipper(i,n);return}if(t==="chao"){this.pan(n);return}if(this.queue.length>=4){this.quick(t,n);return}this.queue.push(()=>t==="kick"?this.kick(e,n):t==="gay"?this.stick(e,n):t==="tai"?this.ear(e,n):this.gang(e,r,n))}}quick(t,e){this.hurt(e,900,t==="kick"?"\u{1F635} Ui da!":"\u{1F635} \xC1!"),this.hooks.sound(t==="hoidong"?"kick":t)}kick(t,e){let n=this.cast.actors.get(t),i=this.cast.actors.get(e);if(!n||!i||t===e)return this.quick("kick",e),600;let r=Rd(i.yaw),a={x:i.x-r.x*.7,z:i.z-r.z*.7,yaw:i.yaw},o=this.walkMs(n,a,6.5);return this.hold(t,a,o+1200),setTimeout(()=>{this.setPose(t,"kick",450),this.hooks.sound("kick"),this.hurt(e,1300,"\u{1F635} Ui da c\xE1i m\xF4ng!"),this.hold(e,{x:i.x+r.x*.6,z:i.z+r.z*.6,yaw:i.yaw},900),i.speed=6},o),setTimeout(()=>{n.speed=2.4,i.speed=2.4,this.release(t,e)},o+1100),o+1300}slipper(t,e){let n=this.cast.actors.get(e),i=this.cast.actors.get(t),r=i&&t!==e?new T(i.x,1.4,i.z):new T(n.x+(Math.random()<.5?-5:5),1.4,n.z+4),a=new he,o=new wt(new Ie(.13,.035,.28),new Wt({color:8373486,roughness:.7})),c=new wt(new Ie(.14,.05,.06),new Wt({color:16777215,roughness:.6}));c.position.set(0,.035,.04),a.add(o,c),a.scale.setScalar(1.5),a.position.copy(r),this.group.add(a);let l=.75,h=()=>new T(n.x,2.05,n.z),u=!1;this.props.push({obj:a,t:0,life:l+2.2,step:(f,d)=>{if(f.t<l){let g=f.t/l,x=h();a.position.lerpVectors(r,x,g),a.position.y+=Math.sin(g*Math.PI)*1.6,a.rotation.x+=d*16,a.rotation.y+=d*5}else u||(u=!0,this.hooks.sound("dep"),this.hurt(e,1100,"\u{1F635} \xC1! D\xE9p t\u1ED5 ong!")),a.position.y=Math.max(.03,a.position.y-d*3.5),a.position.x+=d*.6,a.rotation.x=0,a.rotation.z=0}})}pan(t){let e=this.cast.actors.get(t),n=new he,i=new Wt({color:2500139,metalness:.7,roughness:.35}),r=new wt(new ne(.34,.27,.09,24),i),a=new wt(new Rn(.29,24).rotateX(-Math.PI/2),new Wt({color:4868690,metalness:.8,roughness:.25}));a.position.y=.046;let o=new wt(new Ie(.06,.05,.5),new Wt({color:5913120}));o.position.set(0,.02,.55),n.add(r,a,o),n.rotation.x=Math.PI,n.position.set(e.x,3.6,e.z),this.group.add(n);let c=!1;this.props.push({obj:n,t:0,life:1.3,step:l=>{l.t<.25?n.position.set(e.x,3.6-(3.6-2.3)*(l.t/.25)**2,e.z):(c||(c=!0,this.hooks.sound("chao"),this.hooks.shake(.25),this.hurt(t,1700,"\u{1F4AB} Cho\xE1ng qu\xE1!"),this.stars.push({id:t,until:performance.now()+1800})),n.position.set(e.x,2.3+Math.max(0,Math.sin((l.t-.25)*18))*.08,e.z),n.rotation.z=Math.sin(l.t*20)*.15,n.scale.setScalar(l.t>1.05?Math.max(.01,1-(l.t-1.05)/.25):1))}})}stick(t,e){let n=this.cast.actors.get(t),i=this.cast.actors.get(e);return!n||!i||t===e?(this.quick("gay",e),600):(n.hold="stick",this.chase={leader:t,target:e,t:0,a0:Math.atan2(i.x-pn.x,i.z-pn.z)},this.setPose(t,"swing",4300),this.cast.say(t,"\u{1F624} \u0110\u1EE9ng l\u1EA1i!",2500),this.cast.say(e,"\u{1F3C3} Tha cho em!",3e3),setTimeout(()=>{this.chase=null,n.hold="",n.speed=2.4,i.speed=2.4,this.release(t,e)},4300),4500)}ear(t,e){let n=this.cast.actors.get(t),i=this.cast.actors.get(e);if(!n||!i||t===e)return this.quick("tai",e),600;let r={x:Math.cos(i.yaw),z:-Math.sin(i.yaw)},a=n.x<i.x?-1:1,o=(n.x-i.x)*r.x+(n.z-i.z)*r.z>=0?1:-1,c={x:i.x+r.x*.55*o,z:i.z+r.z*.55*o},l={...c,yaw:Uh(c,i)},h=this.walkMs(n,l,6);return this.hold(t,l,h+2600),setTimeout(()=>{this.setPose(t,"pull",1900),this.hurt(e,1900,"\u{1F442} \xC1 \xE1 \u0111au tai!"),this.cast.say(t,"\u{1F624} L\u1EA1i \u0111\xE2y!",1800),this.hooks.sound("tai");let u=a*1.1;n.speed=.75,i.speed=.75,this.hold(t,{x:l.x+u,z:l.z,yaw:l.yaw},2e3),this.hold(e,{x:i.x+u,z:i.z,yaw:i.yaw},2e3)},h),setTimeout(()=>{n.speed=2.4,i.speed=2.4,this.release(t,e)},h+2100),h+2300}gang(t,e,n){let i=this.cast.actors.get(n);if(!i)return 300;let r=[t,e].filter(l=>!!l&&l!==n&&!!this.cast.actors.get(l));if(!r.length)return this.quick("hoidong",n),600;let a=Rd(i.yaw),o={x:Math.cos(i.yaw),z:-Math.sin(i.yaw)},c=0;return r.forEach((l,h)=>{let u=this.cast.actors.get(l),f=h===0?1:-1,d={x:i.x+o.x*.6*f+a.x*.3,z:i.z+o.z*.6*f+a.z*.3,yaw:0};d.yaw=Uh(d,i);let g=this.walkMs(u,d,7);c=Math.max(c,g),this.hold(l,d,g+3e3),this.cast.say(l,h===0?"\u{1F44A} X\xF4ng l\xEAn!":"\u{1F44A} \u0110\xE1nh!",2e3)}),setTimeout(()=>{for(let l of r)this.setPose(l,"swing",2600);this.hurt(n,2700,"\u{1F62D} C\u1EE9u v\u1EDBi!"),this.hooks.sound("hoidong"),this.hooks.shake(.4),this.hooks.flash(1.5),this.hooks.confetti(14,["\u{1F4A5}","\u{1F44A}","\u2B50","\u{1F4A2}"]);for(let l=0;l<20;l++)setTimeout(()=>{let h=new T(i.x+(Math.random()-.5)*.9,.4+Math.random()*1.4,i.z+(Math.random()-.5)*.9);this.sparks.burst(h,[13616304,16777215,11049088,16769354],10,1.6)},l*125)},c),setTimeout(()=>{for(let l of r){let h=this.cast.actors.get(l);h&&(h.speed=2.4)}this.release(...r)},c+2800),c+3e3}update(t,e){if(this.queue.length&&e>=this.busyUntil){let i=this.queue.shift();this.busyUntil=e+i()}for(let i of this.props)i.t+=t,i.step(i,t);for(let i of this.props.filter(r=>r.t>=r.life))this.group.remove(i.obj),i.obj.traverse(r=>{r instanceof wt&&(r.geometry.dispose(),r.material.dispose())});this.props=this.props.filter(i=>i.t<i.life);let n=this.chase;if(n){n.t+=t;let i=this.cast.actors.get(n.leader),r=this.cast.actors.get(n.target),a=n.a0-n.t*1.9,o=1.7;if(i&&r){let c={x:pn.x+Math.sin(a)*o,z:pn.z+.4+Math.cos(a)*o},l={x:pn.x+Math.sin(a+.9)*o,z:pn.z+.4+Math.cos(a+.9)*o};r.speed=7,i.speed=7,this.hold(n.target,{...c,yaw:0},600),this.hold(n.leader,{...l,yaw:Uh(l,c)},600),Math.random()<t*1.6&&(this.hooks.sound("gay"),this.sparks.burst(new T(r.x,1.5,r.z),[16769354,16777215],10,1.6))}}this.stars=this.stars.filter(i=>e<i.until);for(let i of this.stars){let r=this.cast.actors.get(i.id);if(r&&Math.random()<t*30){let a=e/160;this.sparks.glow(new T(r.x+Math.cos(a)*.35,2.55,r.z+Math.sin(a)*.35))}}if(e<this.dashUntil){let i=this.cast.actors.get(this.thiefId);i&&Math.hypot(i.tx-i.x,i.tz-i.z)>.2&&Math.random()<t*20&&this.sparks.burst(new T(i.x,.15,i.z),[13616304,15260872],4,.8)}}reset(){this.queue=[],this.chase=null,this.spots.clear(),this.poses.clear(),this.stars=[]}},Io=class{constructor(){O(this,"box",null)}render(t,e){this.box||(this.box=X("div"),this.box.id="pkBox",se("app").append(this.box));let n=Math.max(0,t.leftMs-e),i=Math.ceil(n/1e3),r=t.kind==="dau"?"\u0110\u1ED9i D\xE2u":"\u0110\u1ED9i R\u1EC3",a=t.kind==="dau"?"\u{1F470}":"\u{1F935}",o=t.score.def+t.score.cuop,c=o?t.score.def/o*100:50,l=X("div","pkh",`\u2694\uFE0F PK ${t.kind==="dau"?"C\u01AF\u1EDAP D\xC2U":"C\u01AF\u1EDAP R\u1EC2"} \xB7 ${Math.floor(i/60)}:${String(i%60).padStart(2,"0")}`),h=X("div","pkbar"),u=X("div","pkl"),f=X("div","pkr");u.style.width=`${Math.max(8,Math.min(92,c))}%`,u.append(X("b","",`${a} ${r}`),X("span","",String(t.score.def))),f.append(X("span","",String(t.score.cuop)),X("b","","\u{1F3AD} \u0110\u1ED9i C\u01B0\u1EDBp")),h.append(u,f);let d=X("div","pkwho");d.append(X("span","",`\u{1F6E1}\uFE0F ${t.holder.name} \xB7 ${t.count.def} ng\u01B0\u1EDDi${t.top.def?` \xB7 \u2B50 ${t.top.def}`:""}`),X("span","",`${t.count.cuop} ng\u01B0\u1EDDi \xB7 \u{1F3C3} ${t.thief.name}${t.top.cuop&&t.top.cuop!==t.thief.name?` \xB7 \u2B50 ${t.top.cuop}`:""}`));let g=X("div","pkhow",`\u{1F4AC} B\xECnh lu\u1EADn 1 v\xE0o ${r} \xB7 2 v\xE0o \u0110\u1ED9i C\u01B0\u1EDBp. Qu\xE0 c\u1ED9ng \u0111i\u1EC3m cho \u0111\u1ED9i m\xECnh. H\u1EBFt gi\u1EDD \u0110\u1ED9i C\u01B0\u1EDBp h\u01A1n \u0111i\u1EC3m th\xEC c\u01B0\u1EDBp \u0111\u01B0\u1EE3c ${t.stolen.name}`),x=X("div","pkskills");for(let m of Qf){let p=X("div","pks");p.append(X("span","pki",m.icon),X("b","",`${m.xu} xu`),X("span","",m.name)),x.append(p)}this.box.replaceChildren(l,h,d,g,x),this.box.classList.toggle("last",i<=10),this.box.hidden=!1}hide(){this.box&&(this.box.hidden=!0)}};var Cd=90,ry=new T(0,1,0),ay=new zt,Pd=new Oe,oy=new T,Id=new T,cy=new Mt,Uo=class{constructor(t,e,n,i){O(this,"group",new he);O(this,"vip",new Set);O(this,"wideUntil",0);O(this,"lanterns");O(this,"lanternList",[]);O(this,"dusk",{v:0,until:0,dim:0,dimUntil:0});O(this,"duskSky");O(this,"base");O(this,"duskFog",new Mt(6965870));O(this,"lion");O(this,"rainbow");O(this,"sky");O(this,"timers",[]);O(this,"cast");O(this,"sparks");O(this,"env");O(this,"hooks");this.cast=t,this.sparks=e,this.env=n,this.hooks=i,this.base={hemi:n.hemi.intensity,sun:n.sun.intensity,fog:n.fog.color.clone()};let r=new ne(.24,.17,.48,10,1,!0);this.lanterns=new Je(r,new de({side:Te,toneMapped:!1,fog:!1}),Cd),this.lanterns.count=0,this.lanterns.frustumCulled=!1,this.duskSky=new wt(new me(120,24,16),new de({map:ly([[0,"#160f30"],[.3,"#2e1c58"],[.4,"#6a3478"],[.46,"#d0607a"],[.5,"#ffa070"],[1,"#ffc890"]]),side:We,transparent:!0,opacity:0,depthWrite:!1,fog:!1})),this.duskSky.renderOrder=-1,this.duskSky.visible=!1,this.lion=this.buildLion(),this.rainbow=this.buildRainbow();let a=document.createElement("canvas");a.width=1024,a.height=256;let o=new nn(a);o.colorSpace=Se;let c=new Ga(new Tr({map:o,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1,opacity:0}));c.position.set(0,9.5,-1),c.scale.set(11,2.75,1),c.visible=!1,this.sky={s:c,c:a,tex:o,t:0,on:!1},this.group.add(this.lanterns,this.duskSky,this.lion.g,this.rainbow.g,c)}play(t,e,n,i,r){let a=xo(t).at(-1);if(!a)return;let o=a.key,c=i??r;this.hooks.sound(o);let l=o==="lion"?15e3:o==="lantern"?22e3:o==="rainbow"?2e4:o==="grand"?22e3:0;l&&(this.wideUntil=Math.max(this.wideUntil,performance.now()+l)),a.xu>=200&&this.hooks.paper(i),this.after(a.xu>=200?900:0,()=>this.run(o,e,n,c,r,i))}dim(t,e=.8){this.dusk.dimUntil=Math.max(this.dusk.dimUntil,performance.now()+t),this.dusk.dim=e}after(t,e){if(!t){e();return}this.timers.push(window.setTimeout(e,t)),this.timers.length>40&&this.timers.shift()}run(t,e,n,i,r,a){let o=this.sparks;switch(t){case"beer":this.hooks.beer(e,n);break;case"food":this.hooks.food(e,n);break;case"confetti":this.hooks.paper(a),this.hooks.confetti(14,["\u{1F389}","\u{1F38A}","\u2728"]),this.hooks.flash(1);break;case"fireworks":this.dim(7500),this.wideUntil=Math.max(this.wideUntil,performance.now()+7e3),this.hooks.fireworks(5);break;case"toast":this.hooks.toast(e,n);break;case"dance":this.dim(16e3,.55),this.wideUntil=Math.max(this.wideUntil,performance.now()+16e3),this.hooks.dance(n);break;case"heartRain":this.hooks.confetti(50,["\u{1F496}","\u2764\uFE0F","\u{1F495}","\u{1F497}"]),o.hearts(r),o.rain([16734858,16754376,16777215],160,4),this.hooks.flash(3);break;case"lion":this.lion.t=0,this.lion.on=!0,this.lion.g.visible=!0;break;case"lantern":this.dusk.until=performance.now()+24e3;for(let c=0;c<70;c++)this.addLantern(c*.12);break;case"rainbow":this.rainbow.t=0,this.rainbow.on=!0,this.rainbow.g.visible=!0,o.rain([16766042,16771488,16777215,16760906],420,8);break;case"grand":this.grand(n);break}}grand(t){this.drawName(t),this.sky.t=0,this.sky.on=!0,this.sky.s.visible=!0;let e=this.sparks,n=[16732042,16766042,16743096];for(let i=0;i<3;i++)this.after(i*1300,()=>{e.heart(new T((i-1)*4.5,9.5+i%2*1.2,-2),n[i]),this.hooks.boom(),this.hooks.flash(2.5)});this.after(4200,()=>{e.heart(new T(0,11,-2),16723818,.45),this.hooks.fireworks(4),this.hooks.boom()}),this.hooks.confetti(40,["\u{1F451}","\u{1F496}","\u2728","\u{1F386}"])}drawName(t){let{c:e,tex:n}=this.sky,i=e.getContext("2d");i.clearRect(0,0,e.width,e.height);let r=`\u{1F496} ${t.slice(0,24)} \u{1F496}`,a=120;for(i.font=`900 ${a}px "Segoe UI", system-ui, sans-serif`;i.measureText(r).width>e.width-60&&a>40;)a-=6,i.font=`900 ${a}px "Segoe UI", system-ui, sans-serif`;i.textAlign="center",i.textBaseline="middle";let o=i.createLinearGradient(0,60,0,200);o.addColorStop(0,"#fff6c8"),o.addColorStop(.5,"#ffd45a"),o.addColorStop(1,"#ff9a3c"),i.shadowColor="#ff6aa8",i.shadowBlur=36,i.lineWidth=10,i.strokeStyle="#8a1f3c",i.strokeText(r,512,132),i.fillStyle=o,i.fillText(r,512,132),n.needsUpdate=!0}addLantern(t){this.lanternList.length>=Cd&&this.lanternList.shift(),this.lanternList.push({p:new T((Math.random()-.5)*18,.6+Math.random()*.8,-1+Math.random()*15),vy:.8+Math.random()*.6,age:-t-Math.random()*1.5,life:20+Math.random()*4,ph:Math.random()*6})}buildLion(){let t=new he,e=new he,n=new Wt({color:14165546,roughness:.6}),i=new Wt({color:16762938,roughness:.4,metalness:.3,emissive:4204544}),r=new Wt({color:16777215,roughness:.8}),a=new de({color:1118481}),o=new Wt({color:3124826,roughness:.6}),c=(m,p,y,_)=>{let v=new wt(new Ie(m,p,y),_);return v.castShadow=!0,v},l=c(1,.8,.9,n);e.add(l);let h=c(1.06,.18,.2,i);h.position.set(0,.32,.42),e.add(h);let u=new wt(new Di(.1,.35,8),i);u.position.set(0,.55,.15),e.add(u);let f=new wt(new Rn(.12,16),new de({color:16774864,toneMapped:!1}));f.position.set(0,.14,.46),e.add(f);for(let m of[-1,1]){let p=new wt(new me(.15,14,10),r);p.position.set(m*.26,.12,.42),e.add(p);let y=new wt(new me(.07,10,8),a);y.position.set(m*.26,.12,.55),e.add(y);let _=c(.12,.3,.2,o);_.position.set(m*.5,.42,0),_.rotation.z=m*-.4,e.add(_);let v=new wt(new me(.16,10,8),r);v.position.set(m*.55,-.1,.25),e.add(v)}let d=c(.9,.16,.7,i);d.position.set(0,-.48,.12),e.add(d);let g=new wt(new Di(.22,.45,10),r);g.rotation.x=Math.PI,g.position.set(0,-.28,.18),d.add(g),t.add(e);let x=[];for(let m=0;m<6;m++){let p=new he,y=1-m*.09,_=c(.95*y,.6*y,.55,m%2?i:n);p.add(_);let v=c(1*y,.08,.58,r);if(v.position.y=-.32*y,p.add(v),m===1||m===5)for(let L of[-1,1]){let R=new wt(new ne(.08,.08,.6,8),i);R.position.set(L*.2,-.6,0),R.name="leg",p.add(R)}if(m===5){let L=new wt(new me(.22,10,8),r);L.position.set(0,.1,-.3),p.add(L)}x.push(p),t.add(p)}return t.visible=!1,{g:t,head:e,jaw:d,segs:x,t:0,on:!1}}buildRainbow(){let t=new he,e=[];return[16730698,16751164,16769354,5953114,4892927,5921535,11557631].forEach((n,i)=>{let r=new de({color:n,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),a=new wt(new Gn(19-i*.55,.3,6,72,Math.PI),r);e.push(r),t.add(a)}),t.position.set(0,-4,-16),t.visible=!1,{g:t,mats:e,t:0,on:!1}}lionPath(t,e){let i=Math.min(1,Math.max(0,t/15));return e.set(Math.sin(t*1.7)*.9,0,13-9*Math.sin(Math.PI*i)),e}update(t,e){let n=0;this.lanternList=this.lanternList.filter(h=>(h.age+=t)<h.life);for(let h of this.lanternList){if(h.age<0)continue;h.p.y+=h.vy*t,h.p.x+=Math.sin(e/1400+h.ph)*t*.3;let u=Math.min(1,h.age)*(h.age>h.life-2?(h.life-h.age)/2:1);Pd.setFromAxisAngle(ry,h.ph+e/3e3),this.lanterns.setMatrixAt(n,ay.compose(h.p,Pd,oy.set(u,u,u)));let f=1.5+Math.sin(e/90+h.ph*5)*.15;this.lanterns.setColorAt(n++,cy.setRGB(1.15*f,.36*f,.07*f))}this.lanterns.count=n,this.lanterns.instanceMatrix.needsUpdate=!0,this.lanterns.instanceColor&&(this.lanterns.instanceColor.needsUpdate=!0);let i=e<this.dusk.dimUntil?this.dusk.dim:0,r=Math.max(e<this.dusk.until?1:0,i);this.dusk.v+=(r-this.dusk.v)*Math.min(1,t*(r>this.dusk.v?i>=r?2.6:.9:.35));let a=this.dusk.v<.002?0:this.dusk.v;this.duskSky.visible=a>0,this.duskSky.material.opacity=a,this.env.hemi.intensity=this.base.hemi*(1-.6*a),this.env.sun.intensity=this.base.sun*(1-.7*a),this.env.fog.color.copy(this.base.fog).lerp(this.duskFog,a);let o=this.lion;if(o.on)if(o.t+=t,o.t>15)o.on=!1,o.g.visible=!1;else{let h=this.lionPath(o.t,Id),u=this.lionPath(o.t+.05,new T),f=Math.abs(Math.sin(o.t*6))*.25+(Math.sin(o.t*1.3)>.85?.5:0);o.head.position.set(h.x,1.25+f,h.z),o.head.lookAt(u.x,1.25+f,u.z),o.head.rotateY(Math.PI),o.head.rotation.z+=Math.sin(o.t*4)*.25,o.jaw.position.y=-.48-Math.abs(Math.sin(o.t*5))*.15,o.segs.forEach((d,g)=>{let x=this.lionPath(o.t-(g+1)*.16,new T),m=this.lionPath(o.t-(g+1)*.16+.05,new T);d.position.set(x.x,1.05+Math.abs(Math.sin(o.t*6-g*.6))*.18-g*.05,x.z),d.lookAt(m.x,d.position.y,m.z);for(let p of d.children)p.name==="leg"&&(p.rotation.x=Math.sin(o.t*10+g)*.5)}),Math.random()<t*8&&this.sparks.burst(new T(h.x,1.8,h.z),[16766042,16730698],3,1.2)}let c=this.rainbow;if(c.on){c.t+=t;let h=c.t<2.5?c.t/2.5:c.t>16?Math.max(0,1-(c.t-16)/3):1;for(let u of c.mats)u.opacity=h*.55;c.t>19&&(c.on=!1,c.g.visible=!1)}let l=this.sky;if(l.on){l.t+=t;let h=l.t<1.2?l.t/1.2:l.t>11?Math.max(0,1-(l.t-11)/2):1;l.s.material.opacity=h,l.s.position.y=9.5+Math.sin(l.t*1.4)*.15,Math.random()<t*14&&this.sparks.glow(new T((Math.random()-.5)*10,10.5,-1)),l.t>13&&(l.on=!1,l.s.visible=!1)}for(let h of this.vip){let u=this.cast.actors.get(h);u&&Math.random()<t*9&&this.sparks.glow(Id.set(u.x,1.2,u.z))}}reset(){this.vip.clear()}};function ly(s){let t=document.createElement("canvas");t.width=4,t.height=256;let e=t.getContext("2d"),n=e.createLinearGradient(0,0,0,256);for(let[r,a]of s)n.addColorStop(r,a);e.fillStyle=n,e.fillRect(0,0,4,256);let i=new nn(t);return i.colorSpace=Se,i}var Ld=2400,No=class{constructor(){O(this,"mesh",new Je(new ja(.09,0),new de({blending:je,transparent:!0,depthWrite:!1,toneMapped:!1}),Ld));O(this,"list",[]);O(this,"m",new zt);O(this,"c",new Mt);O(this,"q",new Oe);O(this,"s",new T);this.mesh.frustumCulled=!1,this.mesh.count=0}add(t,e,n,i,r=9,a=1,o=0){this.list.length<Ld&&this.list.push({p:t.clone(),v:e,age:-o,life:n,color:i,g:r,size:a})}hearts(t){for(let e=0;e<70;e++){let n=Math.random()*Math.PI*2;this.add(t.clone().add(new T(Math.cos(n)*.8,0,Math.sin(n)*.5)),new T(Math.cos(n)*.8,1.6+Math.random()*1.5,Math.sin(n)*.4),2.4,[16734858,16754376,16777215,16765773][e%4],-.3,1.2)}}burst(t,e,n,i){for(let r=0;r<n;r++){let a=new T().randomDirection().multiplyScalar(i*(.6+Math.random()*.4));a.y=Math.abs(a.y)+1,this.add(t,a,1.4,e[r%e.length],9,1.3)}}envelope(t,e){for(let i=0;i<6;i++)this.add(t,new T((e.x-t.x)/1.3,6,(e.z-t.z)/1.3),1.3,i%2?14032684:16765773,9,1.8,i*.08)}fireworks(){for(let t=0;t<6;t++){let e=new T((Math.random()-.5)*16,8+Math.random()*3,-2+Math.random()*4),n=[16766042,16734842,8048895,11599738][t%4];for(let i=0;i<60;i++)this.add(e,new T().randomDirection().multiplyScalar(4+Math.random()*2),1.6,n,3,1.2,t*.35)}}heart(t,e,n=.32,i=0){for(let r=0;r<160;r++){let a=r/160*Math.PI*2,o=16*Math.sin(a)**3,c=13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a);this.add(t,new T(o*n,c*n,(Math.random()-.5)*.4),2.6,r%9?e:16777215,.6,1.5,i)}for(let r=0;r<30;r++)this.add(t,new T(0,-2,0).add(new T().randomDirection().multiplyScalar(.6)),1.2,16774064,0,1,i)}rain(t,e,n=6){for(let i=0;i<e;i++)this.add(new T((Math.random()-.5)*22,9+Math.random()*4,-2+Math.random()*16),new T((Math.random()-.5)*.6,-1.4-Math.random(),0),7,t[i%t.length],.05,1.4,Math.random()*n)}arc(t,e,n,i,r=.9,a=.5){let o=new T((e.x-t.x)/r,(e.y-t.y)/r+4.5*r,(e.z-t.z)/r);for(let c=0;c<i;c++){let l=t.clone().add(new T((Math.random()-.5)*a,0,(Math.random()-.5)*a));this.add(l,o.clone(),r,n[c%n.length],9,1.6,c*.02)}}glow(t){let e=Math.random()*Math.PI*2;this.add(t.clone().add(new T(Math.cos(e)*.45,Math.random()*1.6-.8,Math.sin(e)*.3)),new T(0,.7,0),1.1,Math.random()<.7?16766042:16777215,0,.9)}update(t){let e=0;this.list=this.list.filter(n=>(n.age+=t)<n.life);for(let n of this.list){if(n.age<0)continue;n.v.y-=n.g*t,n.p.addScaledVector(n.v,t);let i=(1-n.age/n.life)*n.size;this.mesh.setMatrixAt(e,this.m.compose(n.p,this.q,this.s.set(i,i,i))),this.mesh.setColorAt(e++,this.c.set(n.color))}this.mesh.count=e,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}};var Dd=new zt().makeScale(0,0,0),Ke=class{constructor(t,e,n,i=!0){O(this,"mesh");O(this,"free",[]);O(this,"used",0);O(this,"dirty",!1);this.mesh=new Je(t,e,n),this.mesh.instanceMatrix.setUsage(Ys),this.mesh.castShadow=i,this.mesh.receiveShadow=!0,this.mesh.frustumCulled=!1,this.mesh.setColorAt(0,new Mt(1,1,1));for(let r=0;r<n;r++)this.mesh.setMatrixAt(r,Dd);this.mesh.count=0}add(t,e){let n=this.free.length?this.free.pop():this.used<this.mesh.instanceMatrix.count?this.used++:-1;return n<0?-1:(this.mesh.count=Math.max(this.mesh.count,n+1),this.set(n,t,e),n)}set(t,e,n){t<0||(this.mesh.setMatrixAt(t,e),n!==void 0&&this.mesh.setColorAt(t,Ud.set(n)),this.dirty=!0)}color(t,e){t<0||(this.mesh.setColorAt(t,Ud.set(e)),this.dirty=!0)}remove(t){t<0||(this.mesh.setMatrixAt(t,Dd),this.free.push(t),this.dirty=!0)}flush(){this.dirty&&(this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0),this.dirty=!1)}},Ud=new Mt,hy=new T,uy=new Oe,fy=new T,dy=new Xe;function Yn(s,t,e,n=1,i=1,r=1,a=0,o=0,c=0,l=new zt){return l.compose(hy.set(s,t,e),uy.setFromEuler(dy.set(o,a,c)),fy.set(n,i,r))}var Or={box:new Ie(1,1,1).translate(0,.5,0),prism:(()=>{let s=new Ar;s.moveTo(-.5,0),s.lineTo(.5,0),s.lineTo(0,1),s.closePath();let t=new Qa(s,{depth:1,bevelEnabled:!1});return t.translate(0,0,-.5),t.rotateY(Math.PI/2),t.computeVertexNormals(),t})(),cone:new Di(.5,1,4,1).rotateY(Math.PI/4).translate(0,.5,0),round:new Di(.5,1,12,1).translate(0,.5,0),cyl:new ne(.5,.5,1,8).translate(0,.5,0),ball:new Cn(.5,1).translate(0,.5,0)};var Nd=0,$n={bride:{x:-.75,z:2.2,yaw:Nd},groom:{x:.75,z:2.2,yaw:Nd}},Vo=3.7,yn={x:14,z:6},_n=6,sn=[[3.6,7],[3.6,10.2],[6.4,7],[6.4,10.2],[3.6,13.4],[6.4,13.4],[3.6,16.6],[6.4,16.6],[3.6,19.8],[6.4,19.8]].flatMap(([s,t])=>[{x:-s,z:t},{x:s,z:t}]),zo=1.35,py=s=>Array.from({length:_n},(t,e)=>{let n=sn[s],i=(e+.5)/_n*Math.PI*2;return{x:n.x+Math.cos(i)*zo,z:n.z+Math.sin(i)*zo,yaw:Math.atan2(-Math.cos(i),-Math.sin(i))}}),Go=sn.flatMap((s,t)=>py(t)),kd=(s,t)=>({x:s,z:t,yaw:Math.atan2(-s,2.6-t)});function Od(s,t){let e=[],n=[];for(let i=0;i<4;i++)for(let r=0;r<t;r++)e.push(kd(s*(2.4+r*1+i%2*.4),3+i*.8));for(let i=0;i<19;i++)for(let r of[1.6,2.15])n.push(kd(s*(r+i%2*.1),6.2+i*.8));return e.sort((i,r)=>Math.hypot(i.x,i.z-2.6)-Math.hypot(r.x,r.z-2.6)),[...e,...n]}var Wo=Od(-1,8),kh=Od(1,4),Bh=[{x:6.2,z:2.2,yaw:-.5},{x:7.6,z:2.8,yaw:-.6},{x:8.9,z:3.6,yaw:-.7}],is=new zt().makeScale(0,0,0),ko=13116189,ki=15251514,Bo=16447214,Nh=16165311,Bd=15224954,my=7226408,Oo=4860952,Ho=class{constructor(t,e=[]){O(this,"group",new he);O(this,"lanterns",[]);O(this,"sign");O(this,"frames",[]);O(this,"petals");O(this,"petalState",[]);O(this,"drapes",[]);O(this,"b");O(this,"flowers");O(this,"groundMesh");O(this,"grassMesh");O(this,"cake",new he);O(this,"tables",[]);O(this,"shown",0);O(this,"tableBatches",[]);let n=new Wt({roughness:.8});this.b={box:new Ke(Or.box,n,1500),cyl:new Ke(new ne(.5,.5,1,18).translate(0,.5,0),n,600),ball:new Ke(new me(.5,18,12).translate(0,.5,0),n,800),cone:new Ke(Or.round,n,200),prism:new Ke(Or.prism,n,80)},this.flowers=new Ke(new Cn(.5,1),new Wt({roughness:.6}),2600,!1);for(let o of Object.values(this.b))this.group.add(o.mesh);this.group.add(this.flowers.mesh),this.ground(),this.altar(),this.dinh(),this.arch(),this.buildTables(),this.band(),this.greenery(),this.buildCake(),this.sign=new nn(t),this.sign.colorSpace=Se;let i=new wt(new en(3.7,2.31),new de({map:this.sign,transparent:!0,toneMapped:!1}));i.position.set(0,4.45,.45),this.group.add(i),this.portraits(e);let r=new Rn(.07,6).scale(1,.7,1);this.petals=new Je(r,new de({side:Te,transparent:!0,opacity:.95}),220),this.petals.frustumCulled=!1;let a=[16757704,16743066,16777215,16371932];for(let o=0;o<220;o++)this.petalState.push(this.newPetal(!0)),this.petals.setColorAt(o,new Mt(a[o%a.length]));this.group.add(this.petals);for(let o of Object.values(this.b))o.flush();this.flowers.flush()}put(t,e,n,i,r,a,o,c,l=0,h=0,u=0){return this.b[t].add(Yn(n,i,r,a,o,c,l,h,u),e)}flower(t,e,n,i,r){this.flowers.add(Yn(t,e,n,i,i,i),r)}ground(){let t=gy();t.wrapS=t.wrapT=Bs,t.repeat.set(10,10);let e=new wt(new en(60,60).rotateX(-Math.PI/2),new Wt({map:t,roughness:.95}));e.position.set(0,0,8),e.receiveShadow=!0;let n=new wt(new en(200,200).rotateX(-Math.PI/2),new Wt({color:8038474,roughness:1}));n.position.set(0,-.02,0),n.receiveShadow=!0;let i=new wt(new en(2.8,16).rotateX(-Math.PI/2),new Wt({color:ko,roughness:.9}));i.position.set(0,.015,9.2),i.receiveShadow=!0,this.group.add(n,e,i),this.groundMesh=e,this.grassMesh=n;let r=Fo(3);for(let a=0;a<240;a++)this.flower((r()-.5)*3.6,.02,1.5+r()*15,.09,[16757704,16743066,16777215][a%3])}dinh(){this.put("box",10129280,0,0,-4.2,17,.6,7),this.put("box",9320998,0,.6,-4.2-1.2,15,3.6,.3);for(let n=0;n<4;n++)this.put("box",6168340,-5.4+n*3.6,.8,-4.2-1,2.2,2.6,.08);for(let n=0;n<8;n++)this.put("cyl",my,-7+n*2,.6,-4.2+2.6,.38,3.8,.38);this.put("box",Oo,0,4.2,-4.2+2.6,16.4,.35,.4);let e=xy();for(let n of[-1,1]){let i=new wt(new Ie(19,.25,5.6),e);i.position.set(0,5.4,-4.2+n*2.2),i.rotation.x=n*.5,i.castShadow=!0,this.group.add(i)}this.put("box",9058844,0,6.55,-4.2,19.2,.4,.5);for(let n of[-1,1])this.put("cone",9058844,n*9.7,6.2,-4.2,.35,1.4,.35,0,0,-n*.8),this.put("cone",9058844,n*9.7,4,-4.2+4.4,.3,1.2,.3,0,.6,-n*.7),this.put("box",ki,n*2.2,6.8,-4.2,1.8,.35,.25,0,0,n*.25);this.put("ball",ki,0,6.75,-4.2,.6,.6,.6);for(let n of[-6,-3,3,6])this.lantern(n,3.6,-4.2+2.9,.75)}portraits(t){t.forEach((e,n)=>{let i=new nn(e);i.colorSpace=Se,i.anisotropy=4,this.frames.push(i);let r=new he,a=2.7,o=a*1.25,c=new wt(new en(a,o),new de({map:i,transparent:!0}));c.position.z=.07;let l=new wt(new Ie(a*.97,o*.97,.12),new Wt({color:Oo,roughness:.7}));l.castShadow=!0;for(let h of[-1,1]){let u=new wt(new Ie(.1,1.2,.1),new Wt({color:Oo}));u.position.set(h*a*.32,-o/2-.3,-.12),r.add(u)}r.add(l,c),r.position.set(n===0?-3.4:3.4,6.15,-.9),r.rotation.x=-.12,r.rotation.y=n===0?.12:-.12,this.group.add(r);for(let h=0;h<=10;h++){let u=h/10;this.flower(r.position.x+(u-.5)*a,r.position.y+o/2+.05-Math.sin(u*Math.PI)*.18,r.position.z+.15,.2,[Nh,Bd,Bo][h%3])}})}lantern(t,e,n,i){this.put("cyl",ki,t,e+.45*i,n,.35*i,.1*i,.35*i),this.put("ball",ko,t,e-.45*i,n,.9*i,.95*i,.9*i),this.put("cyl",ki,t,e-.55*i,n,.3*i,.1*i,.3*i),this.put("cyl",ki,t,e-1*i,n,.05*i,.45*i,.05*i),this.put("cyl",3811866,t,e+.5*i,n,.02,.5,.02),this.lanterns.push(new T(t,e,n))}arch(){let t=Fo(9),e=[Nh,Bd,Bo,16766688,Nh,Bo];for(let n of[-1,1]){this.put("cyl",Bo,n*2.1,0,0,.32,3.8,.32);for(let i=0;i<3.8;i+=.16)for(let r=0;r<3;r++){let a=t()*Math.PI*2;this.flower(n*2.1+Math.cos(a)*.22,i,Math.sin(a)*.22,.18+t()*.12,e[Math.floor(t()*e.length)])}this.put("cyl",15327958,n*2.6,0,.9,.7,.5,.7);for(let i=0;i<22;i++)this.flower(n*2.6+(t()-.5)*.7,.55+t()*.4,.9+(t()-.5)*.7,.2,e[Math.floor(t()*e.length)])}for(let n=0;n<=60;n++){let i=n/60*Math.PI,r=-Math.cos(i)*2.1,a=3.8+Math.sin(i)*1;for(let o=0;o<4;o++)this.flower(r+(t()-.5)*.35,a+(t()-.5)*.3,(t()-.5)*.4,.2+t()*.12,e[Math.floor(t()*e.length)]);n%6===0&&this.flower(r,a,.2,.18,5937736)}for(let n of[-1,1]){let i=new en(1.6,4.4,10,24),r=i.attributes.position;for(let o=0;o<r.count;o++){let c=r.getX(o)/1.6+.5,l=r.getY(o)/4.4+.5;r.setXYZ(o,n*(2.1-c*1.3*l),.3+l*4-Math.sin(c*Math.PI)*.25*l,.25+Math.sin(c*8)*.06)}i.computeVertexNormals();let a=new wt(i,new Wt({color:16758476,transparent:!0,opacity:.82,side:Te,roughness:.6}));this.drapes.push({mesh:a,base:Float32Array.from(r.array)}),this.group.add(a)}}altar(){this.put("box",7020308,0,0,-1.1,2.2,1,.9),this.put("box",ki,0,1,-1.1,2.3,.06,.95),this.put("cyl",9071162,0,1.06,-1.15,.36,.22,.36);for(let t=0;t<3;t++)this.put("cyl",10103322,-.06+t*.06,1.28,-1.15,.02,.4,.02);for(let t of[-1,1])this.put("cyl",ko,t*.85,1.06,-1.1,.14,.42,.14),this.put("ball",16766042,t*.85,1.48,-1.1,.08,.12,.08);this.put("cyl",ki,.48,1.06,-1,.5,.06,.5);for(let[t,e]of[[-.1,15900730],[.1,8372042],[0,14169130]])this.put("ball",e,.48+t,1.12,-1+(e===14169130?.1:0),.18,.18,.18);this.put("box",3811866,-.45,1.06,-1.35,.4,.5,.05)}buildCake(){let t=new Wt({color:16775922,roughness:.5}),e=new Wt({color:16754376,roughness:.5}),n=(i,r,a)=>{let o=new wt(i,r);o.position.y=a,o.castShadow=!0,this.cake.add(o)};n(new ne(.42,.42,.75,20),new Wt({color:13116189}),.375),n(new ne(.5,.5,.04,24),new Wt({color:15919320}),.77),[[.36,.3],[.27,.26],[.18,.22]].reduce((i,[r,a])=>(n(new ne(r,r,a,22),t,i+a/2),n(new Gn(r,.025,6,22).rotateX(Math.PI/2),e,i+.02),i+a),.79),n(new me(.07,10,8),e,1.65),this.cake.position.set(0,0,Vo),this.cake.visible=!1,this.group.add(this.cake)}buildTables(){let t=new Wt({roughness:.75}),e={cyl:new Ke(new ne(.5,.5,1,18).translate(0,.5,0),t,900),ball:new Ke(new me(.5,14,10).translate(0,.5,0),t,320),box:new Ke(Or.box,t,420)},n=new Ke(new ne(.5,.5,1,12).translate(0,.5,0),new Wt({roughness:.15,metalness:.1}),340);for(let i of[...Object.values(e),n])this.group.add(i.mesh);sn.forEach((i,r)=>{let a=[],o=[],c=(u,f,d,g,x,m,p,y,_=0)=>{let v=Yn(i.x+d,g,i.z+x,m,p,y,_);a.push([e[u],e[u].add(v,f),v])};c("cyl",ko,0,0,0,1.9,.72,1.9),c("cyl",16248802,0,.72,0,2,.03,2),c("cyl",13225170,0,.75,0,1.15,.03,1.15),c("cyl",16777215,-.22,.78,-.12,.46,.02,.46),c("ball",15317066,-.22,.79,-.12,.36,.24,.3),c("ball",14169130,.24,.78,-.16,.32,.22,.32);for(let u=0;u<3;u++)c("cyl",15976120,.08+u*.1,.78,.22,.12,.04,.12);for(let u=0;u<4;u++)c("box",13138474,-.3+u*.08,.8,.26,.06,.05,.2,.3);c("cyl",16777215,.34,.78,.12,.26,.11,.26),c("ball",8175722,.34,.85,.12,.2,.06,.2),c("ball",5941320,-.02,.78,.02,.26,.1,.26),c("ball",15900730,.02,.78,-.36,.14,.14,.14),c("ball",14169130,.13,.78,-.33,.12,.12,.12);for(let u=0;u<_n;u++){let f=(u+.5)/_n*Math.PI*2,d=Math.cos(f),g=Math.sin(f);c("cyl",16777215,d*.72,.75,g*.72,.17,.07,.17),c("box",9067050,d*.62-g*.1,.77,g*.62+d*.1,.02,.02,.26,-f),c("cyl",14034984,d*zo,0,g*zo,.4,.42,.4)}for(let u=0;u<8;u++){let f=u/8*Math.PI*2+.2,d=i.x+Math.cos(f)*.5,g=i.z+Math.sin(f)*.5;for(let[x,m,p,y]of[[3111482,.75,.1,.24],[3111482,.99,.045,.1],[15251514,1.09,.05,.02]]){let _=Yn(d,m,g,p,y,p);o.push([n,n.add(is,x),_])}}let l=[],h=(u,f,d,g,x,m,p,y,_)=>{let v=Yn(i.x+g,x,i.z+m,p,y,_);u.push([e[f],e[f].add(is,d),v])};for(let u=0;u<4;u++){let f=Math.PI/4+u*Math.PI/2,d=Math.cos(f)*.42,g=Math.sin(f)*.42,x=[];h(x,"cyl",16777215,d,.78,g,.32,.02,.32),u===0&&(h(x,"ball",16734756,d,.79,g,.26,.12,.15),h(x,"ball",16760906,d+.06,.82,g,.08,.06,.08)),u===1&&h(x,"ball",14267002,d,.79,g,.3,.09,.13),u===2&&(h(x,"cyl",3816e3,d,.79,g,.3,.15,.3),h(x,"ball",14172202,d,.9,g,.27,.05,.27),h(x,"ball",8175722,d+.05,.93,g,.1,.03,.1)),u===3&&(h(x,"ball",9058850,d,.79,g,.24,.09,.24),h(x,"ball",5941320,d-.04,.84,g+.03,.09,.05,.09)),l.push(x)}for(let[u,f]of a)u.set(f,is);this.tables.push({parts:a,bottles:o,dishes:l,on:!1,beer:0,food:0})}),this.tableBatches=[...Object.values(e),n],this.setTables(2)}setTables(t){this.shown=t,this.tables.forEach((e,n)=>{let i=n<t;if(i!==e.on){e.on=i;for(let[r,a,o]of e.parts)r.set(a,i?o:is)}this.bottlesOf(n)});for(let e of this.tableBatches)e.flush()}get tableCount(){return this.shown}showTables(t){let e=new Set(t);this.shown=e.size,this.tables.forEach((n,i)=>{let r=e.has(i);if(r!==n.on){n.on=r;for(let[a,o,c]of n.parts)a.set(o,r?c:is)}this.bottlesOf(i)});for(let n of this.tableBatches)n.flush()}addBeer(t){let e=this.tables[t];if(!e)return null;e.beer=Math.min(8,e.beer+1),this.bottlesOf(t);for(let n of this.tableBatches)n.flush();return sn[t]}addFood(t){let e=this.tables[t];if(!e)return null;e.food=Math.min(4,e.food+1),this.bottlesOf(t);for(let n of this.tableBatches)n.flush();return sn[t]}clearOrders(){this.tables.forEach((t,e)=>{t.beer=0,t.food=0,this.bottlesOf(e)});for(let t of this.tableBatches)t.flush()}bottlesOf(t){let e=this.tables[t];e.bottles.forEach(([n,i,r],a)=>n.set(i,e.on&&Math.floor(a/3)<e.beer?r:is)),e.dishes.forEach((n,i)=>{for(let[r,a,o]of n)r.set(a,e.on&&i<e.food?o:is)})}band(){this.put("box",Oo,8.6,0,4.2,1.6,.5,1.2);let t=new wt(new ne(.78,.78,1.1,28),new Wt({color:13114916,roughness:.5}));t.position.set(8.6,1.25,4.2),t.rotation.z=Math.PI/2,t.rotation.y=-.4,t.castShadow=!0;let e=new wt(new Rn(.72,28),new Wt({color:15784360,roughness:.8}));e.position.set(8.6+.52*Math.cos(.4),1.25,4.2+.52*Math.sin(.4)),e.rotation.y=Math.PI/2-.4,this.group.add(t,e),this.put("cyl",ki,8.6,.5,4.2,1.65,.04,1.65)}greenery(){let t=id(),e=new Ke(new Cn(.5,1).translate(0,.5,0),t,120),n=new Ke(new Ie(1,.04,.32).translate(.5,0,0),t,80);this.group.add(e.mesh,n.mesh),this.put("cyl",6965806,-9.2,0,-1.6,.9,5.2,.9);for(let[r,a,o,c,l]of[[0,4.6,0,5.2,5212724],[-2,4,1,3.8,6134332],[2.2,4.3,.6,4,6989892],[.6,6,.2,3.6,6134332],[-1.2,5.6,-1,3.4,4882224]])e.add(Yn(-9.2+r,a,-1.6+o,c,c*.75,c),l);for(let[r,a]of[[10.5,-1.2],[12.2,.6],[9.6,1.4]]){this.put("cyl",9347162,r,0,a,.32,2.4,.32);for(let o=0;o<7;o++)n.add(Yn(r,2.3,a,2.4,1,1,o*.9,0,.35+o%2*.25),7319626)}this.put("box",13215615,13,0,-3.5,4,2.4,3.2),this.put("prism",13741410,13,2.4,-3.5,4.8,1.8,4.2);let i=Fo(5);for(let r=0;r<26;r++){let a=-26+r*2.1+i(),o=3+i()*2.5;e.add(Yn(a,.5,-11-i()*4,o,o*1.2,o),[5212724,6134332,4487724][r%3])}e.flush(),n.flush()}newPetal(t){return{x:(Math.random()-.5)*22,y:t?Math.random()*9:9+Math.random()*2,z:-2+Math.random()*18,vx:.2+Math.random()*.3,vy:-(.5+Math.random()*.5),rot:Math.random()*6,spin:1+Math.random()*3}}update(t,e,n=0){let i=new zt;for(let r=0;r<this.petalState.length;r++){let a=this.petalState[r];a.x+=(a.vx+Math.sin(e*1.3+r)*.3)*t,a.y+=a.vy*t*(1+n),a.rot+=a.spin*t,a.y<.02&&(this.petalState[r]=this.newPetal(!1)),this.petals.setMatrixAt(r,Yn(a.x,Math.max(.02,a.y),a.z,1,1,1,a.rot,a.rot*.7,a.rot*.4,i))}this.petals.instanceMatrix.needsUpdate=!0;for(let r of this.drapes){let a=r.mesh.geometry.attributes.position;for(let o=0;o<a.count;o++){let c=r.base[o*3+1];a.setZ(o,r.base[o*3+2]+Math.sin(e*1.6+c*1.4)*.06*(4.3-c)/4)}a.needsUpdate=!0}}};function Fo(s){return()=>(s=s*16807%2147483647)/2147483647}function gy(){let s=document.createElement("canvas");s.width=s.height=256;let t=s.getContext("2d"),e=Fo(11);t.fillStyle="#b9a58c",t.fillRect(0,0,256,256);for(let i=0;i<256;i+=32)for(let r=i/32%2*24;r<304;r+=48){let a=170+Math.floor(e()*40);t.fillStyle=`rgb(${a+20},${a+6},${a-18})`,t.beginPath(),t.roundRect(r-23+e()*2,i+2+e()*2,44,28,6),t.fill()}let n=new nn(s);return n.colorSpace=Se,n}function xy(){let s=document.createElement("canvas");s.width=128,s.height=128;let t=s.getContext("2d");t.fillStyle="#b5532e",t.fillRect(0,0,128,128);for(let n=0;n<128;n+=16){t.fillStyle="rgba(70,20,8,0.45)",t.fillRect(0,n,128,3);for(let i=n/16%2*8;i<128;i+=16)t.fillStyle="rgba(255,190,140,0.18)",t.fillRect(i,n+4,6,10)}let e=new nn(s);return e.colorSpace=Se,e.wrapS=e.wrapT=Bs,e.repeat.set(8,3),new Wt({map:e,roughness:.85})}var Jd=new URLSearchParams(location.search),Qh=Jd.has("live"),Kd=Jd.has("lite");Qh&&document.body.classList.add("live");var vy=se("scene"),xi=new Fa({canvas:vy,antialias:!0,powerPreference:"high-performance"});xi.setPixelRatio(Math.min(devicePixelRatio,2));xi.shadowMap.enabled=!Kd;xi.shadowMap.type=hh;xi.toneMapping=Dr;xi.toneMappingExposure=1.08;var Pe=new Ha;Pe.background=Jy();Pe.fog=new za(13624562,28,70);var an=new ze(42,1,.5,200),Qd=new io(14216447,10123866,1.25);Pe.add(Qd);var Nn=new Lr(16773334,2.4);Nn.position.set(-9,14,12);Nn.target.position.set(0,0,5);Nn.castShadow=!0;Nn.shadow.mapSize.set(2048,2048);Object.assign(Nn.shadow.camera,{left:-16,right:16,top:16,bottom:-10,near:1,far:60});Nn.shadow.camera.updateProjectionMatrix();Nn.shadow.bias=-5e-4;Nn.shadow.normalBias=.03;Pe.add(Nn,Nn.target);var jd=new Lr(16766694,.5);jd.position.set(8,6,10);Pe.add(jd);var ss=new so(16773840,0,18,.32,.6,1.2);ss.position.set(0,9,9);Pe.add(ss,ss.target);for(let s=0;s<7;s++){let t=new wt(new me(1,16,10),new de({color:16777215,transparent:!0,opacity:.85,fog:!1}));t.scale.set(4+s%3*1.5,1.4,1.6),t.position.set(-24+s*8,13+s%2*2.5,-40),Pe.add(t)}var js=new Mo,Qn=new Ho(js.canvas,js.frames);js.onChange=()=>{Qn.sign.needsUpdate=!0;for(let s of Qn.frames)s.needsUpdate=!0};var ut=new bo;Pe.add(Qn.group,ut.group);var xe=new No;Pe.add(xe.mesh);var Oi=new Co(Pe,{launch:()=>Nt.fwLaunch(),burst:(s,t)=>{Nt.fwBurst(s,t),ge=Math.max(ge,t?2.5:1.5)}}),jh=new Ao;Pe.add(jh.group);function tu(s){let t=Hr()??{x:0,z:$n.bride.z};jh.cannons(new T(t.x,0,t.z),s),Nt.cannon(),xe.burst(new T(t.x-2.4,1.1,t.z+1.2),[16777215,16774064],16,1.4),xe.burst(new T(t.x+2.4,1.1,t.z+1.2),[16777215,16774064],16,1.4)}var vi=new Uo(ut,xe,{scene:Pe,hemi:Qd,sun:Nn,fog:Pe.fog},{beer:(s,t)=>Xd("beer",s,t),food:(s,t)=>Xd("food",s,t),paper:s=>tu(s),fireworks:s=>Oi.salvo(s,900*s),toast:(s,t)=>By(t),dance:s=>Oy(s),confetti:(s,t)=>Ut.confetti(s,t),sound:s=>Nt.show(s),boom:()=>Nt.boom(),flash:s=>{ge=Math.max(ge,s)}});Pe.add(vi.group);var rn=new To(xe);Pe.add(rn.group);var gi=new Po(ut,xe,{sound:s=>Nt.pk(s),flash:s=>{ge=Math.max(ge,s)},shake:s=>{as=Math.max(as,s)},confetti:(s,t)=>Ut.confetti(s,t),reassign:()=>kn()});Pe.add(gi.group);var Gh=new Io,eu=[16762938,15266047,16738996],_y=eu.map(s=>{let t=new he,e=new wt(new to(.42,.72,40).rotateX(-Math.PI/2),new de({color:s,transparent:!0,opacity:.85,blending:je,depthWrite:!1,toneMapped:!1,side:Te})),n=new wt(new ne(.5,.62,3.2,24,1,!0).translate(0,1.6,0),new de({color:s,transparent:!0,opacity:.16,blending:je,depthWrite:!1,side:Te}));return e.position.y=.04,t.add(e,n),t.visible=!1,Pe.add(t),{g:t,ring:e,beam:n}}),rs=[];function yy(s){rs=s.top.map(e=>e.id),Ut.top(s.top,s.month),(rs.some((e,n)=>ut.ranks.get(e)!==n+1)||[...ut.ranks.keys()].some(e=>!rs.includes(e)))&&(ut.ranks.clear(),rs.forEach((e,n)=>ut.ranks.set(e,n+1)))}function by(s,t){_y.forEach((e,n)=>{let i=rs[n]?ut.actors.get(rs[n]):void 0;if(e.g.visible=!!i&&i.z>-3.4,!i||!e.g.visible)return;e.g.position.set(i.x,0,i.z);let r=1+Math.sin(t/260+n)*.08;e.ring.scale.set(r,1,r),e.ring.rotation.y=t/900,e.beam.material.opacity=.12+Math.sin(t/400+n)*.05,Math.random()<s*(14-n*3)&&xe.burst(new T(i.x+(Math.random()-.5)*.7,.3+Math.random()*1.8,i.z+(Math.random()-.5)*.7),[eu[n],16777215],2,.5)})}var Wh=null,$o=new Map,Bi=Kd?null:new po(xi),My=new Zs(new tt(256,256),.22,.4,.92);Bi&&(Bi.addPass(new go(Pe,an)),Bi.addPass(My),Bi.addPass(new mo));function tp(){let s=innerWidth,t=innerHeight,e=s/t<.8;xi.setSize(s,t,!1),Bi?.setPixelRatio(Math.min(devicePixelRatio,2)),Bi?.setSize(s,t),an.aspect=s/t,an.fov=e?56:34,an.updateProjectionMatrix()}addEventListener("resize",tp);tp();var Ey=[[[0,10,26,5.6,0],[0,5.5,23,2,5]],[[0,14,32,5.5,0],[0,7,28,2,7]],[[0,19,42,5.7,0],[0,9,34,1.8,10]]],Oh=new T(0,4.6,19.5),Fd=new T(0,2.6,3.5),zd=new T,Hd=new T,Sy=new T(0,0,4);function Ty(s){let[t,e,n,i,r]=Ey[np][innerWidth/innerHeight<.8?0:1];zd.set(t,e,n),Hd.set(0,i,r);let a=s<0?1:1-Math.exp(-s*1.2);Oh.lerp(zd,a),Fd.lerp(Hd,a),an.position.copy(Oh),an.lookAt(Fd);let o=Pe.fog,c=Oh.distanceTo(Sy);o.near=c+18,o.far=c+90}var Ut=new So,Zo=new wo,Nt=new _o;Nt.setMode("wedding");fetch("/music/list.json").then(s=>s.json()).then(s=>{s.length&&Nt.setPlaylist(s)}).catch(()=>{});var qe=new yo(Qh?"view":"control"),on=new Map,vt=null,Xh=0,mn=null,Jo=0,Ko=new Map,Kn=()=>!!mn&&mn.phase!=="idle",os={idleBots:!0,voice:!0,readChat:!0,scene:"wedding"},Vd=!1,qh={status:"idle",uniqueId:"",error:"",attempt:0};function wy(s){Vd=s.role==="control",on.clear();for(let t of s.players)on.set(t.id,t);os=s.settings,ep({t:"delta",wedding:s.wedding,live:s.live,stats:s.stats}),Vd&&(Zy(),os.scene!=="wedding"&&qe.send({t:"ctl",cmd:"settings",settings:{scene:"wedding"}}))}function ep(s){if(s.players)for(let t of s.players)on.set(t.id,t);if(s.removed)for(let t of s.removed)on.delete(t);if(s.wedding){let t=vt?.step;if(s.wedding.phase==="waiting"&&vi.reset(),s.wedding.phase==="waiting"&&vt?.phase==="done"&&Qn.clearOrders(),vt=s.wedding,Xh=performance.now(),Ut.wedding(vt,0),js.draw(vt),yy(vt),$o.clear(),vt.pk){Wh=vt.pk;for(let[e,n]of vt.pk.members)$o.set(e,n);Gh.render(vt.pk,0)}else Gh.hide(),gi.reset();document.body.classList.toggle("pk",!!vt.pk),t!==void 0&&vt.step!==t&&Ry(vt.step)}if(s.battle){let t=Kn();mn=s.battle,Jo=performance.now(),Ko.clear();for(let[e,n]of mn.members)Ko.set(e,n);if(document.body.classList.toggle("battle",Kn()),document.body.classList.toggle("bfinal",mn.phase==="final"),Kn()){if(Zo.render(mn,0),vt){let e=n=>{let i=mn.teams[n].leader;return i?{id:i.id,name:i.name,gifted:i.gifted,avatar:i.avatar}:null};js.draw({...vt,bride:e("gai"),groom:e("trai")})}}else t&&vt&&(js.draw(vt),Ut.wedding(vt,0))}if(s.settings){os=s.settings;for(let t of["idleBots","voice","readChat"]){let e=document.getElementById("set_"+t);e&&(e.checked=os[t])}}if(s.stats){Ut.stats(s.stats);let t=document.getElementById("simStats");t&&(t.textContent=`H\xE0ng \u0111\u1EE3i ${s.stats.queue} \xB7 \u0111\xE3 x\u1EED l\xFD ${s.stats.processed} \xB7 tr\xF9ng ${s.stats.duplicates} \xB7 ${Math.round(Kh)} fps`)}if(s.live){qh=s.live,Ut.live(s.live);let t=document.getElementById("ttStatus");t&&(t.textContent=s.live.status==="connected"?`\u0110ang nh\u1EADn s\u1EF1 ki\u1EC7n t\u1EEB @${s.live.uniqueId}`:s.live.status==="idle"?"Ch\u01B0a k\u1EBFt n\u1ED1i. C\xE1c n\xFAt b\xEAn d\u01B0\u1EDBi ch\u1EC9 \u0111\u1EC3 th\u1EED khi ch\u01B0a live, k\u1EBFt n\u1ED1i TikTok r\u1ED3i th\xEC b\u1ECB kh\xF3a.":`${s.live.status}${s.live.error?": "+s.live.error:""}`)}if(s.fx)for(let t of s.fx)Wy(t);(s.players||s.removed||s.wedding||s.battle)&&kn()}var pi=new Map,np=0,Un=0;function ip(s){if(s===Un)return;let t=s>Un&&Un>0;Un=s,Qn.setTables(s),np=s<=4?0:s<=10?1:2,t&&(Ut.feed(`\u{1F372} Kh\xE1ch \u0111\xF4ng, k\xEA th\xEAm m\xE2m c\u1ED7: ${s} m\xE2m`,"note"),Nt.wedding("mung"))}var Ay=s=>{let t=pi.get(s);return t===void 0?-1:Math.floor(t/_n)};function kn(){if(Kn()){Ly(mn);return}let s=performance.now(),t=y=>[on.get(y)?.gender??"",on.get(y)?.look??0],e=vt?.phase==="married"?vt.step:vt?.phase==="done"?"home":"",n=$n.bride.z,i=Math.PI/2,r={introBride:[{x:0,z:n+1.5,yaw:0,pose:""},{x:1.6,z:n,yaw:0,pose:""}],introGroom:[{x:-1.6,z:n,yaw:0,pose:""},{x:0,z:n+1.5,yaw:0,pose:""}],giaTien:[{x:-.45,z:.4,yaw:Math.PI,pose:"bow"},{x:.45,z:.4,yaw:Math.PI,pose:"bow"}],rings:[{x:-.5,z:n+.6,yaw:i,pose:""},{x:.5,z:n+.6,yaw:-i,pose:""}],ruou:[{x:-.45,z:n+.6,yaw:i,pose:"toast"},{x:.45,z:n+.6,yaw:-i,pose:"toast"}],banh:[{x:-.75,z:Vo-.55,yaw:.6,pose:"cut"},{x:.75,z:Vo-.55,yaw:-.6,pose:"cut"}],home:[{x:-1.45,z:-4.6,yaw:Math.PI,pose:""},{x:1.45,z:-4.6,yaw:Math.PI,pose:""}]},[a,o]=r[e]??[{...$n.bride,pose:""},{...$n.groom,pose:""}],c=vt?.pk;if(c){let y=(L,R)=>({...gi.spot(L)??R,pose:gi.pose(L)}),_=L=>L===c.stolen.id?y(L,Lo.stolen):y(L,Lo.def);vt?.bride&&(a=_(vt.bride.id)),vt?.groom&&(o=_(vt.groom.id));let v=y(c.thief.id,Lo.thief);ut.set(c.thief.id,on.get(c.thief.id)?.name??c.thief.name,"guest",v,yn,s,...t(c.thief.id)).pose=v.pose}Qn.cake.visible=!c&&(e==="banh"||e==="party");let l=s<Yo;vt?.bride&&(ut.set(vt.bride.id,vt.bride.name,"bride",a,yn,s,...t(vt.bride.id)).pose=Qo||(l?"wave":a.pose)),vt?.groom&&(ut.set(vt.groom.id,vt.groom.name,"groom",o,yn,s,...t(vt.groom.id)).pose=Qo||(l?"disco":o.pose));let h=new Set([vt?.bride?.id,vt?.groom?.id,c?.thief.id]),u=(vt?.guests??[]).filter(y=>!h.has(y)&&on.get(y)?.online),f=Math.min(sn.length,Math.max(2,Math.ceil(u.length/_n)));f+=f%2,f<Un&&u.length>(Un-2)*_n-4&&(f=Un),ip(f);let d=Un*_n;for(let[y,_]of[...pi])(!u.includes(y)||_>=d)&&pi.delete(y);let g=new Set(pi.values());for(let y of u){if(pi.has(y))continue;let _=0;for(;g.has(_)&&_<d;)_++;if(_>=d)break;pi.set(y,_),g.add(_)}let x=vt?.phase==="married"&&!!vt.step&&vt.step!=="party",m=new Map;if(x){let y=0,_=0;for(let[v,L]of[...pi].sort((R,C)=>R[1]-C[1])){let C=Go[L].x<0?Wo[y]??kh[_]:kh[_]??Wo[y];C===Wo[y]?y++:_++,C&&m.set(v,C)}}let p=y=>{if(!y||!c)return y;let _=y.x-pn.x,v=y.z-pn.z,L=Math.hypot(_,v);if(L>=Do)return y;let R=Do/Math.max(L,.01),C=pn.x+(L<.01?Do:_*R),A=pn.z+v*R;return{x:C,z:A,yaw:Math.atan2(pn.x-C,pn.z-A)}};for(let[y,_]of pi){let v=Vy(y),L=gi.spot(y)??v??p(m.get(y));ut.set(y,on.get(y)?.name??"",L?"guest":"seat",L??Go[_],yn,s,...t(y))}for(let[y,_]of er)ut.set(y,"Ph\u1EE5c v\u1EE5","waiter",_.state==="back"?_.from:_.to,_.from,s);Bh.forEach((y,_)=>ut.set("band-"+_,"","band",y,yn,s)),ut.prune(s)}function Ry(s){let t=new T(0,1.8,$n.bride.z+1);(s==="introBride"||s==="introGroom")&&(Nt.wedding("groom"),xe.hearts(t),ge=2),(s==="giaTien"||s==="ruou")&&Nt.wedding("mung"),(s==="rings"||s==="banh")&&(Nt.wedding("bride"),xe.burst(t,[16766042,16774064,16777215],70,3)),s==="party"&&(Nt.wedding("end"),Oi.salvo(3,1800),ge=3,Ut.confetti(24,["\u{1F942}","\u{1F389}","\u{1F338}","\u2728"]))}var Fh=[],zh=0,tr=new Map;function Cy(s){if(!Nt.on||!os.voice){Ut.mc(s);return}clearTimeout(tr.get(s)),tr.set(s,window.setTimeout(()=>{tr.delete(s),Ut.mc(s)},15e3))}function Gd(s){clearTimeout(tr.get(s)),tr.delete(s),Ut.mc(s)}function Py(s){Fh.push(s),!zh&&(zh=window.setTimeout(()=>{let t=Fh;Fh=[],zh=0,Ut.feed(`\u{1F44B} Ch\xE0o m\u1EEBng ${t.slice(0,3).join(", ")}${t.length>3?` v\xE0 ${t.length-3} ng\u01B0\u1EDDi n\u1EEFa`:""} \u0111\u1EBFn d\u1EF1 \u0111\xE1m c\u01B0\u1EDBi!`,"note")},3e3))}var Wd=Array.from({length:30},(s,t)=>({x:(t%3-1)*.9,z:9.2+Math.floor(t/3)*1,yaw:Math.PI})),Iy=(s,t)=>Go.slice(0,t*_n).filter(e=>s==="trai"?e.x>0:e.x<0);function Ly(s){let t=performance.now(),e=g=>[on.get(g)?.gender??"",on.get(g)?.look??0],n=g=>on.get(g)?.name??"",i={trai:s.teams.trai.leader?.id,gai:s.teams.gai.leader?.id,cuop:s.teams.cuop.leader?.id},r=s.phase==="final",a=r&&s.phaseLeftMs-(t-Jo)<1e5,o=$n.bride,c=$n.groom,l={x:0,z:7.4,yaw:Math.PI},h="";r&&s.winner==="trai"&&a&&(o={x:-1.45,z:-4.6,yaw:Math.PI},c={x:1.45,z:-4.6,yaw:Math.PI}),r&&s.winner==="gai"&&(c={x:.35,z:$n.groom.z+.9,yaw:-Math.PI/2-.5},h="bow"),r&&s.winner==="cuop"&&(l=a?{x:13,z:9,yaw:Math.PI/2}:{x:6.8,z:8,yaw:Math.PI/2},o={x:l.x-.9,z:l.z+.3,yaw:Math.PI/2}),i.gai&&(ut.set(i.gai,n(i.gai),"bride",o,yn,t,...e(i.gai)).pose=""),i.trai&&(ut.set(i.trai,n(i.trai),"groom",c,yn,t,...e(i.trai)).pose=h),i.cuop&&ut.set(i.cuop,n(i.cuop),"guest",l,yn,t,...e(i.cuop));let u=new Set(Object.values(i)),f={trai:[],gai:[],cuop:[]};for(let[g,x]of s.members)!u.has(g)&&on.get(g)?.online&&f[x].push(g);let d=Math.max(f.trai.length,f.gai.length);ip(Math.min(sn.length,Math.max(2,2*Math.ceil(d/_n))));for(let g of["trai","gai"]){let x=Iy(g,Un);f[g].slice(0,x.length).forEach((m,p)=>ut.set(m,n(m),"seat",x[p],yn,t,...e(m)))}f.cuop.slice(0,Wd.length).forEach((g,x)=>ut.set(g,n(g),"guest",Wd[x],yn,t,...e(g))),Qn.cake.visible=!1,Bh.forEach((g,x)=>ut.set("band-"+x,"","band",g,yn,t)),ut.prune(t)}function Dy(s,t,e){s.text&&s.ev!=="start"&&s.ev!=="phase"&&s.ev!=="win"&&Ut.feed(s.text,s.ev==="join"||s.ev==="locked"?"":"gift"),Nt.battle(s.ev,s.gift);let n=s.team?di[s.team]:null;switch(s.ev){case"start":Ut.banner("\u2694\uFE0F","\u0110\u1EA1i chi\u1EBFn Nh\xE0 trai \u2013 Nh\xE0 g\xE1i!","B\xECnh lu\u1EADn 1 Nh\xE0 trai \xB7 2 Nh\xE0 g\xE1i \xB7 3 C\u01B0\u1EDBp d\xE2u","steal"),xe.fireworks();break;case"phase":Ut.banner("\u2694\uFE0F",s.name,s.text,"groom"),ge=2;break;case"climax":Ut.banner("\u{1F525}","10 gi\xE2y cu\u1ED1i!","M\u1ECDi \u0111i\u1EC3m nh\xE2n \u0111\xF4i, l\u1EADt k\xE8o ngay!","steal"),ge=3;break;case"join":n&&ut.say(s.id,`${n.icon} ${n.name}!`,3e3);break;case"power":s.team&&rn.power(s.team,t),ut.cheer(s.id);break;case"drum":if(s.team){rn.power(s.team,t);for(let[i,r]of Ko)r===s.team&&ut.cheer(i,6e3)}break;case"shield":s.team&&rn.power(s.team,t),ut.say(s.id,"\u{1F6E1}\uFE0F Khi\xEAn!");break;case"attack":s.team&&s.target&&rn.attack(s.team,s.target,s.gift==="ngua"),s.gift==="ngua"&&Zo.dash("\u{1F3C7}"),ut.say(s.id,s.gift==="ngua"?"\u{1F3C7} Xung phong!":"\u2694\uFE0F \u0110\xE1nh!"),ut.cheer(s.id);break;case"blocked":if(s.team&&s.target){let i=s.target;rn.attack(s.team,i,!1),setTimeout(()=>rn.blocked(i),800)}break;case"dragon":s.team&&n&&(rn.dragon(s.team),Ut.banner("\u{1F409}",`${s.name} g\u1ECDi R\u1ED3ng!`,`${n.name} s\u1EE9c m\u1EA1nh x1.5 trong 20 gi\xE2y`,"groom"));break;case"crown":n&&(Ut.banner("\u{1F451}",`${s.name} l\xE0m Ch\u1EE7 so\xE1i!`,`${n.name} s\u1EE9c m\u1EA1nh x2 trong 30 gi\xE2y`,"bride"),xe.burst(t??e,[16766042,16774064,16777215],140,5));break;case"ultimate":s.team&&(Zo.ultimate(s.name,s.team),rn.ultimate(s.team),ge=4);break;case"win":s.team&&n?(Ut.banner("\u{1F3C6}",`${n.name} chi\u1EBFn th\u1EAFng!`,"Trao danh hi\u1EC7u, ph\xE1o hoa v\xE0 r\u01B0\u1EDBc d\xE2u","groom"),rn.win(s.team),Ut.confetti(40,["\u{1F3C6}","\u{1F386}","\u{1F496}","\u2728"]),ge=4):Ut.banner("\u{1F91D}","H\xF2a!","Ch\u01B0a phe n\xE0o c\xF3 s\u1EE9c m\u1EA1nh","groom");break;case"end":Ut.banner("\u{1F492}","H\u1EBFt \u0110\u1EA1i chi\u1EBFn","\u0110\xE1m c\u01B0\u1EDBi l\xE0ng qu\xEA m\u1EDF l\u1EA1i","bride");break}}var Xo=new Map,er=new Map,Uy=0;function Ny(s){let t=Ay(s),e=ut.actors.get(s);return t<0&&e&&(t=sn.slice(0,Un).reduce((n,i,r)=>Math.hypot(i.x-e.x,i.z-e.z)<Math.hypot(sn[n].x-e.x,sn[n].z-e.z)?r:n,0)),Math.max(0,t)}function Xd(s,t,e){let n=Ny(t);if(Ut.waiter(s,e,n+1),er.size>=6||Kn()){Yh(s,n,t);return}let i=sn[n],r=Math.sign(i.x)||1,a=Math.abs(i.x)<5,o=a?{x:i.x-r*1.25,z:i.z,yaw:r*Math.PI/2}:{x:i.x+r*1.25,z:i.z,yaw:-r*Math.PI/2},c=a?{x:r*.9,z:23,yaw:0}:{x:r*11.5,z:i.z,yaw:0},l="waiter-"+ ++Uy,h=performance.now();er.set(l,{kind:s,table:n,caller:t,from:c,to:o,state:"go",until:0,born:h}),kn();let u=ut.actors.get(l);u&&(u.load=s,u.speed=4.6,ut.say(l,s==="beer"?"\u{1F37A} C\xF3 ngay!":"\u{1F357} C\xF3 ngay!",1600))}function Yh(s,t,e){let n=s==="beer"?Qn.addBeer(t):Qn.addFood(t);if(!n)return;xe.burst(new T(n.x,1.1,n.z),[16766042,16774064,16777215],22,1.6),s==="beer"?Nt.beerPop():Nt.plate();let i=[...pi].filter(([,r])=>Math.floor(r/_n)===t).map(([r])=>r);i.includes(e)||i.push(e);for(let r of i){let a=ut.actors.get(r);!a||a.pose||(s==="beer"?(a.pose="toast",ut.say(r,r===e?"\u{1F37A} D\xF4! U\u1ED1ng \u0111i anh em!":Math.random()<.5?"\u{1F37B} D\xF4!":"\u{1F37A} M\u1ED9t hai ba, d\xF4!",2600),setTimeout(()=>{a.pose==="toast"&&(a.pose="")},3200)):(ut.cheer(r,1500),ut.say(r,r===e?"\u{1F60B} M\xF3n ngon t\u1EDBi r\u1ED3i!":Math.random()<.5?"\u{1F60B} Ngon qu\xE1!":"\u{1F357} Th\u01A1m qu\xE1!",2400)))}}function ky(s){let t=!1;for(let[e,n]of er){let i=ut.actors.get(e);if(!i){s-n.born>1500&&(er.delete(e),Yh(n.kind,n.table,n.caller));continue}let r=a=>Math.hypot(i.x-a.x,i.z-a.z)<.15;n.state==="go"&&(r(n.to)||s-n.born>9e3)?(n.state="serve",n.until=s+1400,i.load="",ut.say(e,n.kind==="beer"?"\u{1F37A} Bia \u0111\xE2y! D\xF4 d\xF4!":"\u{1F357} M\xF3n ngon \u0111\xE2y!",1800),Yh(n.kind,n.table,n.caller)):n.state==="serve"&&s>n.until?(n.state="back",i.tx=n.from.x,i.tz=n.from.z):n.state==="back"&&(r(n.from)||s-n.born>2e4)&&(er.delete(e),t=!0)}t&&kn()}var qo=0,$h=null,Qo="",as=0,nr=()=>[...ut.actors.values()].filter(s=>s.role!=="band"&&s.role!=="waiter"&&s.role!=="extra");function jo(s,t=0){let e=performance.now();Qo=s==="toast"?"":s;for(let n of nr())n.pose=s,t&&(n.glassUntil=e+t)}function By(s){let t=performance.now();if(t<qo){ge=Math.max(ge,2),Nt.clink(6);return}qo=t+2e4,Ut.banner("\u{1F37B}",`${s} m\u1EDDi c\u1EA3 \u0111\xE1m c\u01B0\u1EDBi n\xE2ng ly!`,"\u0110\u1EE9ng d\u1EADy n\xE0o! M\u1ED9t, hai, ba, DZ\xD4!","groom"),jo("raise",2e4),Nt.clink(10);let e=!1,n=()=>{if(!e){e=!0,$h=null,Nt.hush(9e3);for(let i=0;i<3;i++){let r=i*2300;setTimeout(()=>{Ut.chant("M\u1ED8T!"),Nt.shout("mot")},r),setTimeout(()=>{Ut.chant("HAI!"),Nt.shout("hai")},r+450),setTimeout(()=>{Ut.chant("BA!"),Nt.shout("ba")},r+900),setTimeout(()=>zy(i),r+1400)}setTimeout(()=>{jo("toast",3500),Qo="",Ut.confetti(30,["\u{1F37B}","\u{1F942}","\u{1F389}","\u{1F37A}"]),Nt.applause(3),setTimeout(()=>{for(let i of nr())(i.pose==="toast"||i.pose==="raise")&&(i.pose="");qo=0,kn()},3200)},2*2300+2400)}};$h=n,setTimeout(n,os.voice&&Nt.on?7e3:900)}var Yo=0,sp=0,Hh=["disco","twist","wave"],Qs=[16726708,3858687,16769082,7012202],Jn=(()=>{let s=new he,t=new wt(new Cn(.55,2),new Wt({color:16053503,metalness:.25,roughness:.25,flatShading:!0,emissive:9079456})),e=new wt(new ne(.02,.02,6,6).translate(0,3.5,0),new de({color:2236962})),n=Qs.map(r=>{let a=new wt(new ne(.06,1.5,9,20,1,!0).translate(0,-4.5,0),new de({color:r,transparent:!0,opacity:.16,blending:je,depthWrite:!1,side:Te}));return s.add(a),a}),i=Qs.slice(0,2).map(r=>{let a=new Xs(r,0,16,1.2);return Pe.add(a),a});return s.add(t,e),s.visible=!1,Pe.add(s),{g:s,ball:t,beams:n,lights:i}})();function Oy(s){let t=performance.now();if(t<Yo){ge=Math.max(ge,2);return}let e=(Nt.disco(15)||15)*1e3;Yo=t+e,sp=t,Ut.banner("\u{1F57A}",`${s} m\u1EDF s\xE0n nh\u1EA3y!`,"C\u1EA3 s\xE2n c\xF9ng nh\u1EA3y nh\u1EA1c s\xE0n x\u01B0a","groom"),Ut.confetti(24,["\u{1F57A}","\u{1F483}","\u{1F3B6}","\u2728"]);let n=0;for(let i of nr())i.pose=Hh[n++%Hh.length];Jn.g.visible=!0,kn(),setTimeout(()=>{for(let i of nr())Hh.includes(i.pose)&&(i.pose="");for(let i of Jn.lights)i.intensity=0;Jn.g.visible=!1,Yo=0,kn(),Ut.confetti(20,["\u{1F44F}","\u{1F389}","\u2728"])},e)}function Fy(s,t){if(!Jn.g.visible)return;let e=(t-sp)/1e3,n=e*124/60,i=Math.pow(1-n%1,3),r=Math.min(1,e/1.2);if(Jn.g.position.set(0,13-6.2*r,6),Jn.ball.rotation.y=e*1.2,Jn.beams.forEach((a,o)=>{a.rotation.set(.75*Math.sin(e*.9+o*1.7),o*Math.PI/2+e*.6,.75*Math.cos(e*.8+o*1.3)),a.material.opacity=(.1+.16*i)*r}),Jn.lights.forEach((a,o)=>{let c=e*1.3+o*Math.PI;a.position.set(Math.sin(c)*5,2.5,7+Math.cos(c)*4),a.color.setHex(Qs[(Math.floor(n)+o*2)%Qs.length]),a.intensity=(25+45*i)*r}),Jn.ball.material.emissive.setHex(Qs[Math.floor(n)%Qs.length]).lerp(new Mt(10132144),.6),Math.random()<s*30){let a=new T().randomDirection().multiplyScalar(.6);xe.glow(Jn.g.position.clone().add(a))}if(Math.random()<s*1.5){let a=nr(),o=a[Math.floor(Math.random()*a.length)];o&&ut.say(o.id,["\u{1F57A} Qu\u1EA9y l\xEAn!","\u{1F483} Nh\u1EA3y n\xE0o!","\u{1F3B6} Nh\u1EA1c hay qu\xE1!","\u{1F525} Sung qu\xE1!"][Math.floor(Math.random()*4)],1800)}}function zy(s){Ut.chant(s===2?"DZ\xD4!!!":"DZ\xD4!",!0),Nt.shout("do",s===2?1.5:1.25),Nt.clink(16),jo("cheer"),setTimeout(()=>{qo&&jo("raise")},750);let t=0;for(let n of nr())t++%2===s%2&&t<60&&ut.say(n.id,s===2?"\u{1F37B} DZ\xD4!!!":"\u{1F37B} DZ\xD4!",900);for(let n=0;n<Un;n++)xe.burst(new T(sn[n].x,1.9,sn[n].z),[16766042,16774064,16777215],12,1.8);let e=Hr();e&&xe.burst(new T(e.x,2.2,e.z),[16766042,16777215],30,2.4),ge=Math.max(ge,s===2?4:3),as=s===2?.5:.35,s===2&&Oi.salvo(2,600)}function Hy(){Nt.applause(6),Nt.firecrackers(3.5);let s=0;for(let t of ut.actors.values())t.role==="band"||t.role==="bride"||t.role==="groom"||(ut.cheer(t.id,6e3),s++<24&&ut.say(t.id,["\u{1F44F} Hoan h\xF4!","\u{1F44F}\u{1F44F}","\u{1F389} Ch\xFAc m\u1EEBng!","\u{1F496} \u0110\u1EB9p \u0111\xF4i qu\xE1!"][s%4],3500+Math.random()*2e3));vi.dim(7e3,.6),Oi.salvo(6,4500),tu(null);for(let t=0;t<30;t++)setTimeout(()=>{let e=t%2?1:-1;xe.burst(new T(e*1.7,.4,3+Math.random()*11),[16726570,16766042,16777215],10,2.6)},t*110);Ut.confetti(44,["\u{1F389}","\u{1F38A}","\u{1F44F}","\u{1F496}","\u{1F9E7}"]),ge=4}function Hr(){let s=vt?.bride?ut.actors.get(vt.bride.id):void 0,t=vt?.groom?ut.actors.get(vt.groom.id):void 0;if(s&&t)return{x:(s.tx+t.tx)/2,z:(s.tz+t.tz)/2};let e=s??t;return e?{x:e.tx,z:e.tz}:null}function Vy(s){let t=Xo.get(s),e=Hr();if(!t||!e||performance.now()>t.until)return null;let n=e.x+[-1.6,1.6,-2.35][t.slot],i=e.z+(t.slot===2?1:.6);return{x:n,z:i,yaw:Math.atan2(e.x-n,e.z-i)}}function Gy(s,t){if(!vt||vt.phase==="done"||vt.bride?.id===s||vt.groom?.id===s)return;let e=ut.actors.get(s),n=Hr();if(!e||!n)return;let i=performance.now(),r=new Set([...Xo.values()].filter(l=>l.until>i).map(l=>l.slot)),a=[0,1,2].find(l=>!r.has(l));if(a===void 0)return;let o=Math.hypot(n.x-e.x,n.z+.6-e.z)/2.4*1e3,c=3500;Xo.set(s,{until:i+o+c,slot:a}),kn(),setTimeout(()=>{let l=ut.actors.get(s),h=Hr();!l||!h||(ut.say(s,t>=100?"\u{1F49D} Ch\xFAc tr\u0103m n\u0103m h\u1EA1nh ph\xFAc!":"\u{1F9E7} Ch\xFAc m\u1EEBng h\u1EA1nh ph\xFAc!",c),vt?.bride&&ut.cheer(vt.bride.id,2500),vt?.groom&&ut.cheer(vt.groom.id,2500),xe.envelope(new T(l.x,1.4,l.z),new T(h.x,1.5,h.z)),xe.burst(new T(h.x,1.8,h.z),[16766042,16743066,16777215],30,2.5),Nt.coin())},o),setTimeout(()=>{Xo.delete(s),kn()},o+c+50)}function Wy(s){let t=n=>{let i=ut.actors.get(n);return i?new T(i.x,1.6,i.z):null},e=new T(0,1.8,$n.bride.z);switch(s.k){case"wedding":{if(s.ev==="mc"){Cy(s.text),ut.cheer(s.id,2500);return}if(s.ev==="time"){Ut.feed(s.text,"note"),Nt.coin(),ut.say(s.id,`\u23F0 +${s.amount??20} gi\xE2y`);let i=ut.actors.get(s.id);i&&xe.burst(new T(i.x,2,i.z),[16766042,8048895],30,2);return}if(s.ev==="ask"){Ut.waiterAsk(s.text),Nt.show("beer");return}if(s.ev==="guest"){let i=rs.indexOf(s.id);if(i>=0){Ut.banner(Js[i],`Top ${i+1} qu\xE0 c\u01B0\u1EDBi th\xE1ng ${s.name} \u0111\xE3 t\u1EDBi!`,"C\u1EA3 s\xE2n v\u1ED7 tay ch\xE0o \u0111\xF3n","bride"),ut.say(s.id,`${Js[i]} Ch\xE0o c\u1EA3 nh\xE0!`,4e3),Nt.wedding("bride"),Nt.applause(3);let r=t(s.id);r&&xe.burst(r,[eu[i],16777215,16766042],80,3.5),Ut.confetti(24,[Js[i],"\u2728","\u{1F44F}"]);for(let a of ut.actors.values())(a.role==="seat"||a.role==="guest")&&ut.cheer(a.id,2500)}else ut.say(s.id,"Ch\xE0o c\u1EA3 nh\xE0! \u{1F44B}",3500),Py(s.name);return}Ut.feed(s.text,s.ev==="mung"?"gift":"note"),Nt.wedding(s.ev);let n=(s.ev==="bride"||s.ev==="groom")&&!!s.other;if((s.ev==="bride"||s.ev==="groom")&&s.auto&&(Nt.wedding("steal"),xe.burst(e,[16766042,16743096,16777215],80,4)),s.ev==="bride"&&Ut.banner("\u{1F470}",s.auto?`\u{1F3B2} ${s.name} \u0111\u01B0\u1EE3c ch\u1ECDn l\xE0m c\xF4 d\xE2u!`:`${s.name} l\xE0m c\xF4 d\xE2u!`,s.other?`V\u1EC1 b\xEAn ch\xFA r\u1EC3 ${s.other}, l\u1EC5 th\xE0nh h\xF4n b\u1EAFt \u0111\u1EA7u`:`B\u1EA1n nam: b\xECnh lu\u1EADn "nam" r\u1ED3i t\u1EB7ng \u0111\xFAng ${Xn.joinXu} xu \u0111\u1EC3 l\xE0m ch\xFA r\u1EC3`,"bride"),s.ev==="groom"&&Ut.banner("\u{1F935}",s.auto?`\u{1F3B2} ${s.name} \u0111\u01B0\u1EE3c ch\u1ECDn l\xE0m ch\xFA r\u1EC3!`:`${s.name} l\xE0m ch\xFA r\u1EC3!`,s.other?`R\u01B0\u1EDBc c\xF4 d\xE2u ${s.other}, l\u1EC5 th\xE0nh h\xF4n b\u1EAFt \u0111\u1EA7u`:`B\u1EA1n n\u1EEF: b\xECnh lu\u1EADn "n\u1EEF" r\u1ED3i t\u1EB7ng \u0111\xFAng ${Xn.joinXu} xu \u0111\u1EC3 l\xE0m c\xF4 d\xE2u`,"groom"),(s.ev==="bride"||s.ev==="groom")&&(xe.hearts(e),ge=2,n&&Hy()),s.ev==="steal"&&(Ut.banner(s.role==="bride"?"\u{1F483}":"\u{1F3C3}",s.role==="bride"?`${s.name} c\u01B0\u1EDBp r\u1EC3!`:`${s.name} c\u01B0\u1EDBp d\xE2u!`,s.role==="bride"?`Gi\xE0nh ch\xFA r\u1EC3 t\u1EEB tay ${s.other??""}`:`Gi\xE0nh c\xF4 d\xE2u t\u1EEB tay ${s.other??""}`,"steal"),xe.burst(e,[16730698,16769146],80,6)),s.ev==="outfit"){ut.say(s.id,"\u{1F457} \xC1o m\u1EDBi!"),ut.cheer(s.id);let i=t(s.id);i&&xe.burst(i,[16747216,8048895,16766042,16777215],40,2.5);break}if(s.ev==="mung"){let i=xo(s.amount??0).at(-1)?.key;ut.say(s.id,i?qy[i]??`\u{1F9E7} M\u1EEBng c\u01B0\u1EDBi ${s.amount??""} xu`:"\u{1F9E7}",3e3),ut.cheer(s.id),i!=="beer"&&i!=="food"&&Gy(s.id,s.amount??0)}s.amount&&(vi.play(s.amount,s.id,s.name,t(s.id),e),ge=Math.max(ge,1.5)),s.ev==="end"&&(Ut.banner("\u{1F491}","Tr\u0103m n\u0103m h\u1EA1nh ph\xFAc!",`${s.name} v\xE0 ${s.other??""} n\u1EAFm tay nhau v\xE0o nh\xE0`,"groom"),vi.dim(8e3,.7),Oi.salvo(6,5e3),xe.hearts(e),ge=4);break}case"gift":{let n=ut.actors.get(s.id);n&&(n.giftAt=performance.now(),ut.cheer(s.id));break}case"act":s.act==="chat"&&s.bubble&&ut.say(s.id,s.bubble);break;case"like":$y(s.id,s.count);break;case"voice":{let n=s.text,i=s.who==="boy",r=s.tag==="toast"?()=>$h?.():void 0;Nt.voice(s.url,()=>{i||Gd(n)},r,s.tag==="chat"?12e3:0,s.tag??"")||(!i&&tr.has(n)&&Gd(n),r?.());break}case"fireworks":vt?.pk||Oi.salvo(2,1200);break;case"battle":Dy(s,t(s.id),e);break;case"pk":Xy(s);break}}function Xy(s){let t=vt?.pk??Wh;if(!t)return;let e=t.kind==="dau"?"\u0110\u1ED9i D\xE2u":"\u0110\u1ED9i R\u1EC3";switch(s.ev){case"start":Ut.banner("\u2694\uFE0F",`${s.name} x\xF4ng l\xEAn ${t.kind==="dau"?"c\u01B0\u1EDBp d\xE2u":"c\u01B0\u1EDBp r\u1EC3"}!`,`B\xECnh lu\u1EADn 1 v\xE0o ${e} \xB7 2 v\xE0o \u0110\u1ED9i C\u01B0\u1EDBp \xB7 PK 2 ph\xFAt`,"steal"),Ut.feed(s.text,"note"),gi.start(t.thief.id,t.holder.id,t.stolen.id),ge=2.5,kn();break;case"join":ut.say(s.id,s.team==="def"?`\u{1F48D} V\xE0o ${e}!`:"\u{1F3AD} Theo \u0110\u1ED9i C\u01B0\u1EDBp!",2500),ut.cheer(s.id,1500);break;case"hit":{if(Ut.feed(s.text,"gift"),ut.cheer(s.id,1500),!s.skill||!s.target||!s.team)break;let n=s.team==="def"?t.holder.id:t.thief.id,i=s.id!==n&&s.id!==s.target&&ut.actors.has(s.id)?s.id:null;!i&&s.skill==="hoidong"&&(i=[...$o].find(([r,a])=>a===s.team&&r!==n&&r!==s.target&&ut.actors.has(r))?.[0]??null),gi.hit(s.skill,n,s.target,s.id,i);break}case"tick":Ut.banner("\u23F0",`C\xF2n ${s.amount} gi\xE2y!`,s.text.replace(/^⏰ Còn \d+ giây! /,""),"steal"),Nt.boom();break;case"end":gi.end(s.win??"def",t.thief.id,t.holder.id),s.win==="cuop"?(Ut.banner("\u{1F3C6}","\u0110\u1ED9i C\u01B0\u1EDBp th\u1EAFng!",`${t.thief.name} ${t.kind==="dau"?"c\u01B0\u1EDBp d\xE2u":"c\u01B0\u1EDBp r\u1EC3"} th\xE0nh c\xF4ng`,"steal"),Oi.salvo(3,2e3),Ut.confetti(30,["\u{1F3AD}","\u{1F4A5}","\u{1F3C6}"])):(Ut.banner("\u{1F6E1}\uFE0F",`${e} th\u1EAFng!`,`${t.thief.name} b\u1ECB \u0111u\u1ED5i v\u1EC1 m\xE2m, \u0111\xE1m c\u01B0\u1EDBi ti\u1EBFp t\u1EE5c`,"groom"),tu(null),Ut.confetti(30,["\u{1F48D}","\u{1F6E1}\uFE0F","\u{1F389}"])),Ut.feed(s.text,"note"),ge=3,Wh=null;break}}var qy={beer:"\u{1F37A} Em \u01A1i, cho bia!",food:"\u{1F357} Th\xEAm m\xF3n nh\xE9!",confetti:"\u{1F389} B\xF9m! Ph\xE1o gi\u1EA5y!",fireworks:"\u{1F386} Ph\xE1o hoa \u0111\xE2y!",toast:"\u{1F37B} C\u1EA3 nh\xE0 n\xE2ng ly n\xE0o!"},Zh=140,Fr=[];for(let s=0;s<Zh;s++){let t=X("div","tag"),e=X("span","bb"),n=X("span","nm");t.append(e,n),t.style.display="none",se("labels").append(t),Fr.push({box:t,nm:n,bb:e,id:"",role:""})}var mi=new T;function Yy(s){let t=0;for(let e of ut.labeled(s)){if(mi.set(e.x,2.15*e.look.scale*(e.role==="bride"||e.role==="groom"?1.12:1)+(e.role==="seat"?-.2:0),e.z).project(an),mi.z>1||Math.abs(mi.x)>1.05||Math.abs(mi.y)>1.05||vt?.pk&&!Kn()&&e.id!==vt.pk.thief.id&&e.id!==vt.pk.holder.id&&e.id!==vt.pk.stolen.id&&s>e.bubbleUntil&&s-e.giftAt>4e3)continue;let n=Fr[t++],i=Kn()?Ko.get(e.id):void 0,r=!!i&&mn.teams[i].leader?.id===e.id,a=!Kn()&&vt?.pk?$o.get(e.id):void 0,o=ut.ranks.get(e.id)??0,c=e.role+(vi.vip.has(e.id)?" vip":"")+(i??"")+(r?"!":"")+(a??"")+o;(n.id!==e.id||n.role!==c)&&(n.id=e.id,n.role=c,n.nm.textContent=(r&&i?(mn.teams[i].leader.crown?"\u{1F451} ":"")+di[i].icon+" ":e.role==="bride"?"\u{1F470} ":e.role==="groom"?"\u{1F935} ":"")+e.name,on.get(e.id)?.sim&&n.nm.append(X("i","demo","DEMO")),n.box.className="tag"+(e.role==="bride"||e.role==="groom"?" "+e.role:" guest")+(vi.vip.has(e.id)?" vip":"")+(i?" team-"+i:"")+(a?a==="def"?" team-gai":" team-cuop":""),a&&e.role!=="bride"&&e.role!=="groom"&&n.nm.prepend(a==="def"?"\u{1F48D} ":"\u{1F3AD} "),o&&(n.nm.prepend(Js[o-1]+" "),n.box.classList.add("top"+o)));let l=s<e.bubbleUntil?e.bubble:"";if(n.bb.textContent!==l&&(n.bb.textContent=l),n.box.style.display="",n.box.style.transform=`translate(${(mi.x+1)/2*innerWidth}px, ${(1-mi.y)/2*innerHeight}px) translate(-50%, -100%)`,t>=Zh)break}for(let e=t;e<Zh;e++)Fr[e].box.style.display!=="none"&&(Fr[e].box.style.display="none",Fr[e].id="")}var Vh=0;function $y(s,t){let e=ut.actors.get(s),n=innerWidth*.85,i=innerHeight*.7;e&&(mi.set(e.x,2,e.z).project(an),n=(mi.x+1)/2*innerWidth,i=(1-mi.y)/2*innerHeight);for(let r=0;r<Math.min(4,Math.ceil(t/10))&&Vh<40;r++){Vh++;let a=X("span","heart",["\u2764\uFE0F","\u{1F497}","\u{1F495}","\u{1F338}"][Math.floor(Math.random()*4)]);a.style.left=`${n+(Math.random()-.5)*20}px`,a.style.top=`${i}px`,a.style.setProperty("--dx",`${(Math.random()-.5)*60}px`),se("hearts").append(a),setTimeout(()=>{a.remove(),Vh--},1800)}}var qd=!1;function Zy(){if(qd)return;qd=!0;let s=se("sim"),t=se("simBody");s.hidden=!1,t.hidden=!(Zn("simOpen")??!0),se("simToggle").onclick=()=>{t.hidden=!t.hidden,Zn("simOpen",!t.hidden)};let e=(p,y,_="btn2 ghost")=>{let v=X("button",_,p);return v.onclick=y,v},n=(...p)=>{let y=X("div","line");return y.append(...p),y},i=(p,y,_,...v)=>{let L=X("details");return L.open=Zn("sec."+p)??_,L.ontoggle=()=>Zn("sec."+p,L.open),L.append(X("summary","",y),...v),L},r=X("input");r.placeholder="@username TikTok",r.value=Zn("ttUser")??"";let a=X("div","note");a.id="ttStatus";let o=X("input");o.value=Zn("simName")??"B\u1EA1n",o.onchange=()=>Zn("simName",o.value);let c=()=>{let p=o.value.trim()||"B\u1EA1n";return{id:p,name:p}},l=p=>qe.send({t:"sim",kind:"comment",...c(),text:p}),h=X("div","acts");for(let p of["nam","n\u1EEF","1","2","Ch\xFAc m\u1EEBng h\u1EA1nh ph\xFAc!","\u0102N C\u1ED6","\u0110\u1EB9p \u0111\xF4i qu\xE1"])h.append(e(p,()=>l(p),""));let u=X("input");u.placeholder="B\xECnh lu\u1EADn t\u1EF1 do, Enter \u0111\u1EC3 g\u1EEDi",u.onkeydown=p=>{p.key==="Enter"&&u.value.trim()&&(l(u.value.trim()),u.value="")};let f=X("div","acts");f.append(e("\u{1F44B} V\xE0o",()=>qe.send({t:"sim",kind:"join",...c()}),""),e("\u2764\uFE0F Tim",()=>qe.send({t:"sim",kind:"like",...c(),count:30}),""),e("\u{1F4E3} Chia s\u1EBB",()=>qe.send({t:"sim",kind:"share",...c()}),""));let d=X("div","giftGrid");for(let[p,y,_]of[["\u{1F339}","Hoa h\u1ED3ng",1],["\u{1F36C}","K\u1EB9o",5],["\u{1F366}","Kem",10],["\u{1F3A9}","M\u0169",30],["\u{1F9F4}","N\u01B0\u1EDBc hoa",50],["\u{1F380}","N\u01A1",52],["\u{1F37B}","N\xE2ng ly",99],["\u{1F48D}","Nh\u1EABn",100],["\u{1F436}","C\xFAn con",199],["\u{1F451}","V\u01B0\u01A1ng mi\u1EC7n",299],["\u{1F386}","Ph\xE1o hoa",500]]){let v=X("button","gb");v.onclick=()=>qe.send({t:"sim",kind:"gift",...c(),gift:y,diamonds:_,count:1}),v.append(X("span","gn",`${p} ${y}`),X("b","gx",`${_} xu`)),d.append(v)}let g=(p,y)=>{let _=X("label","toggle"),v=X("input");return v.type="checkbox",v.id="set_"+p,v.checked=os[p],v.onchange=()=>qe.send({t:"ctl",cmd:"settings",settings:{[p]:v.checked}}),_.append(v,document.createTextNode(y)),_},x=X("a","note","\u2197 M\u1EDF m\xE0n h\xECnh LIVE 9:16");x.href="/?live=1",x.onclick=p=>{p.preventDefault(),window.open("/?live=1","cuoi-live","width=540,height=960")};let m=X("div","stats");m.id="simStats",t.replaceChildren(i("tt","K\u1EBFt n\u1ED1i TikTok LIVE",!0,n(r,e("K\u1EBFt n\u1ED1i",()=>{Zn("ttUser",r.value),qe.send({t:"ctl",cmd:"connect",user:r.value})},"btn2"),e("Ng\u1EAFt",()=>qe.send({t:"ctl",cmd:"disconnect"}))),a),i("play","Th\u1EED nh\u01B0 ng\u01B0\u1EDDi xem",!0,n(X("span","lbl","T\xEAn"),o),h,u,f,X("div","lbl2","T\u1EB7ng qu\xE0 (xu TikTok)"),d),i("cuoi","\u0110\xE1m c\u01B0\u1EDBi",!1,n(e("\u{1F504} M\u1EDF \u0111\xE1m c\u01B0\u1EDBi m\u1EDBi",()=>qe.send({t:"ctl",cmd:"newWedding"}))),n(e("\u2694\uFE0F B\u1EAFt \u0111\u1EA7u \u0110\u1EA1i chi\u1EBFn (12 ph\xFAt)",()=>qe.send({t:"ctl",cmd:"battleStart"}),"btn2"),e("\u23F9 D\u1EEBng",()=>qe.send({t:"ctl",cmd:"battleStop"}))),g("voice","Gi\u1ECDng MC \u0111\u1ECDc t\xEAn"),g("readChat","\u0110\u1ECDc b\xECnh lu\u1EADn c\u1EE7a ng\u01B0\u1EDDi xem")),x,m),a.textContent=qh.status==="idle"?"Ch\u01B0a k\u1EBFt n\u1ED1i. C\xE1c n\xFAt b\xEAn d\u01B0\u1EDBi ch\u1EC9 \u0111\u1EC3 th\u1EED khi ch\u01B0a live, k\u1EBFt n\u1ED1i TikTok r\u1ED3i th\xEC b\u1ECB kh\xF3a.":qh.status}function Zn(s,t){try{if(t===void 0){let e=localStorage.getItem("cuoi."+s);return e===null?null:JSON.parse(e)}localStorage.setItem("cuoi."+s,JSON.stringify(t))}catch{}return null}var zr=se("soundBtn"),Jh=se("musicBtn");zr.onclick=()=>{Nt.on?(Nt.stop(),zr.textContent="\u{1F508}"):(Nt.start(),zr.textContent="\u{1F50A}")};Nt.setMusic(Zn("music")??!0);Jh.style.opacity=Nt.music?"1":"0.45";Jh.onclick=()=>{Nt.setMusic(!Nt.music),Zn("music",Nt.music),Nt.music&&!Nt.on&&(Nt.start(),zr.textContent="\u{1F50A}"),Jh.style.opacity=Nt.music?"1":"0.45"};Qh&&(Nt.start(),zr.textContent="\u{1F50A}",addEventListener("pointerdown",()=>Nt.start(),{once:!0}));qe.onHello=wy;qe.onDelta=ep;qe.onStatus=s=>Ut.offline(!s);qe.connect();var Yd=performance.now(),Kh=60,ge=0,$d=0,Zd=0;function rp(s){let t=Math.min(.25,Math.max(0,(s-Yd)/1e3));Yd=s,Kh+=(1/Math.max(t,.001)-Kh)*.05,kr.time.value=s/1e3,kr.wind.value=.35,ge=Math.max(0,ge-t),Ty(t),rn.shake>0&&(an.position.x+=(Math.random()-.5)*rn.shake*.35,an.position.y+=(Math.random()-.5)*rn.shake*.25),as>0&&(as-=t,an.position.x+=(Math.random()-.5)*as*.5,an.position.y+=(Math.random()-.5)*as*.4);let e=vt?.phase==="married"?vt.step==="introBride"?vt.bride:vt.step==="introGroom"?vt.groom:null:null,n=e?ut.actors.get(e.id):null;ss.intensity+=((n?60:0)-ss.intensity)*Math.min(1,t*2),n&&(ss.target.position.set(n.x,1,n.z),ss.position.set(n.x,9,n.z+7),Math.random()<t*6&&xe.burst(new T(n.x,2.4,n.z),[16774064,16766042],3,1.2)),Qn.update(t,s/1e3,ge),ut.update(t,s),xe.update(t),Oi.update(t,an,xi),jh.update(t,s),gi.update(t,s),by(t,s),Fy(t,s),ky(s),vi.update(t,s),rn.update(t,s,mn,s-Jo),document.body.classList.toggle("climax",Kn()&&!!mn?.climax),document.body.classList.toggle("showtime",s<vi.wideUntil),($d-=t)<=0&&(Kn()?Zo.render(mn,s-Jo):vt&&(Ut.wedding(vt,s-Xh),vt.pk&&Gh.render(vt.pk,s-Xh)),$d=1),(Zd-=t)<=0&&(kn(),Zd=3),Nt.ambience(t,0,!1),Bi?Bi.render():xi.render(Pe,an),Yy(s),requestAnimationFrame(rp)}requestAnimationFrame(rp);function Jy(){let s=document.createElement("canvas");s.width=4,s.height=256;let t=s.getContext("2d"),e=t.createLinearGradient(0,0,0,256);e.addColorStop(0,"#5aa8e6"),e.addColorStop(.55,"#a9d4f2"),e.addColorStop(1,"#f6e6d2"),t.fillStyle=e,t.fillRect(0,0,4,256);let n=new nn(s);return n.colorSpace=Se,n}})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
