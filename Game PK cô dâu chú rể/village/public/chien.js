"use strict";(()=>{var h0=Object.defineProperty;var u0=(r,e,t)=>e in r?h0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var N=(r,e,t)=>u0(r,typeof e!="symbol"?e+"":e,t);var pu="170";var d0=0,Gd=1,f0=2;var Pa=1,vl=2,ki=3,yi=0,yn=1,Rt=2,sn=0,gr=1,zn=2,Wd=3,Xd=4,mu=5,Jn=100,p0=101,m0=102,g0=103,x0=104,Or=200,y0=201,v0=202,_0=203,qc=204,Yc=205,_l=206,b0=207,bl=208,M0=209,E0=210,S0=211,T0=212,w0=213,A0=214,$c=0,Kc=1,Zc=2,_r=3,jc=4,Jc=5,Qc=6,eh=7,hp=0,R0=1,C0=2,ls=0,gu=1,xu=2,yu=3,Ia=4,P0=5,vu=6,_u=7,qd="attached",I0="detached",up=300,br=301,Mr=302,th=303,nh=304,Ml=306,qt=1e3,Bn=1001,xa=1002,rn=1003,bu=1004;var ur=1005;var Qt=1006,ha=1007;var ui=1008;var di=1009,dp=1010,fp=1011,ya=1012,Mu=1013,Us=1014,Tn=1015,jt=1016,Eu=1017,Su=1018,cs=1020,pp=35902,mp=1021,gp=1022,In=1023,xp=1024,yp=1025,xr=1026,hs=1027,Tu=1028,wu=1029,vp=1030,Au=1031;var Ru=1033,Do=33776,Uo=33777,No=33778,ko=33779,ih=35840,sh=35841,rh=35842,ah=35843,oh=36196,lh=37492,ch=37496,hh=37808,uh=37809,dh=37810,fh=37811,ph=37812,mh=37813,gh=37814,xh=37815,yh=37816,vh=37817,_h=37818,bh=37819,Mh=37820,Eh=37821,Fo=36492,Sh=36494,Th=36495,_p=36283,wh=36284,Ah=36285,Rh=36286,Cu=2200,Pu=2201,L0=2202,Er=2300,Sr=2301,uc=2302,dr=2400,fr=2401,Oo=2402,Iu=2500,D0=2501,bp=0,El=1,La=2,U0=3200,N0=3201;var Lu=0,k0=1,as="",ct="srgb",dn="srgb-linear",Sl="linear",Tt="srgb";var Zs=7680;var Yd=519,F0=512,O0=513,H0=514,Mp=515,B0=516,z0=517,V0=518,G0=519,Ch=35044,Yi=35048;var $d="300 es",Hi=2e3,Ho=2001,zi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Kd=1234567,ua=Math.PI/180,Tr=180/Math.PI;function Qn(){let r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(gn[r&255]+gn[r>>8&255]+gn[r>>16&255]+gn[r>>24&255]+"-"+gn[e&255]+gn[e>>8&255]+"-"+gn[e>>16&15|64]+gn[e>>24&255]+"-"+gn[t&63|128]+gn[t>>8&255]+"-"+gn[t>>16&255]+gn[t>>24&255]+gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]).toLowerCase()}function tn(r,e,t){return Math.max(e,Math.min(t,r))}function Du(r,e){return(r%e+e)%e}function W0(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function X0(r,e,t){return r!==e?(t-r)/(e-r):0}function da(r,e,t){return(1-t)*r+t*e}function q0(r,e,t,n){return da(r,e,1-Math.exp(-t*n))}function Y0(r,e=1){return e-Math.abs(Du(r,e*2)-e)}function $0(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function K0(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Z0(r,e){return r+Math.floor(Math.random()*(e-r+1))}function j0(r,e){return r+Math.random()*(e-r)}function J0(r){return r*(.5-Math.random())}function Q0(r){r!==void 0&&(Kd=r);let e=Kd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function eg(r){return r*ua}function tg(r){return r*Tr}function ng(r){return(r&r-1)===0&&r!==0}function ig(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function sg(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function rg(r,e,t,n,i){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*m,l*f,o*c);break;case"YXY":r.set(l*f,o*h,l*m,o*c);break;case"ZYZ":r.set(l*m,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function hi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function At(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var _i={DEG2RAD:ua,RAD2DEG:Tr,generateUUID:Qn,clamp:tn,euclideanModulo:Du,mapLinear:W0,inverseLerp:X0,lerp:da,damp:q0,pingpong:Y0,smoothstep:$0,smootherstep:K0,randInt:Z0,randFloat:j0,randFloatSpread:J0,seededRandom:Q0,degToRad:eg,radToDeg:tg,isPowerOfTwo:ng,ceilPowerOfTwo:ig,floorPowerOfTwo:sg,setQuaternionFromProperEuler:rg,normalize:At,denormalize:hi},se=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},tt=class r{constructor(e,t,n,i,s,a,o,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],x=i[0],g=i[3],p=i[6],b=i[1],_=i[4],y=i[7],T=i[2],S=i[5],A=i[8];return s[0]=a*x+o*b+l*T,s[3]=a*g+o*_+l*S,s[6]=a*p+o*y+l*A,s[1]=c*x+h*b+u*T,s[4]=c*g+h*_+u*S,s[7]=c*p+h*y+u*A,s[2]=d*x+f*b+m*T,s[5]=d*g+f*_+m*S,s[8]=d*p+f*y+m*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,m=t*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(o*n-i*a)*x,e[3]=d*x,e[4]=(h*t-i*l)*x,e[5]=(i*s-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(dc.makeScale(e,t)),this}rotate(e){return this.premultiply(dc.makeRotation(-e)),this}translate(e,t){return this.premultiply(dc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},dc=new tt;function Ep(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function va(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function ag(){let r=va("canvas");return r.style.display="block",r}var Zd={};function la(r){r in Zd||(Zd[r]=!0,console.warn(r))}function og(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function lg(r){let e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function cg(r){let e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var rt={enabled:!0,workingColorSpace:dn,spaces:{},convert:function(r,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Tt&&(r.r=Bi(r.r),r.g=Bi(r.g),r.b=Bi(r.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(r.applyMatrix3(this.spaces[e].toXYZ),r.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Tt&&(r.r=yr(r.r),r.g=yr(r.g),r.b=yr(r.b))),r},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===as?Sl:this.spaces[r].transfer},getLuminanceCoefficients:function(r,e=this.workingColorSpace){return r.fromArray(this.spaces[e].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,e,t){return r.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Bi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function yr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var jd=[.64,.33,.3,.6,.15,.06],Jd=[.2126,.7152,.0722],Qd=[.3127,.329],ef=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tf=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);rt.define({[dn]:{primaries:jd,whitePoint:Qd,transfer:Sl,toXYZ:ef,fromXYZ:tf,luminanceCoefficients:Jd,workingColorSpaceConfig:{unpackColorSpace:ct},outputColorSpaceConfig:{drawingBufferColorSpace:ct}},[ct]:{primaries:jd,whitePoint:Qd,transfer:Tt,toXYZ:ef,fromXYZ:tf,luminanceCoefficients:Jd,outputColorSpaceConfig:{drawingBufferColorSpace:ct}}});var js,Ph=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{js===void 0&&(js=va("canvas")),js.width=e.width,js.height=e.height;let n=js.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=js}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=va("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Bi(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Bi(t[n]/255)*255):t[n]=Bi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},hg=0,Bo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hg++}),this.uuid=Qn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(fc(i[a].image)):s.push(fc(i[a]))}else s=fc(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function fc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ph.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var ug=0,un=class r extends zi{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=Bn,i=Bn,s=Qt,a=ui,o=In,l=di,c=r.DEFAULT_ANISOTROPY,h=as){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ug++}),this.uuid=Qn(),this.name="",this.source=new Bo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==up)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qt:e.x=e.x-Math.floor(e.x);break;case Bn:e.x=e.x<0?0:1;break;case xa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qt:e.y=e.y-Math.floor(e.y);break;case Bn:e.y=e.y<0?0:1;break;case xa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=up;un.DEFAULT_ANISOTROPY=1;var xt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,y=(f+1)/2,T=(p+1)/2,S=(h+d)/4,A=(u+x)/4,E=(m+g)/4;return _>y&&_>T?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=S/n,s=A/n):y>T?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=S/i,s=E/i):T<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(T),n=A/s,i=E/s),this.set(n,i,s,t),this}let b=Math.sqrt((g-m)*(g-m)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(g-m)/b,this.y=(u-x)/b,this.z=(d-h)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ih=class extends zi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t);let i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new un(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Bo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},en=class extends Ih{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},zo=class extends un{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=rn,this.minFilter=rn,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Lh=class extends un{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=rn,this.minFilter=rn,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var yt=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],f=s[a+1],m=s[a+2],x=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=x;return}if(u!==x||l!==d||c!==f||h!==m){let g=1-o,p=l*d+c*f+h*m+u*x,b=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let T=Math.sqrt(_),S=Math.atan2(T,p*b);g=Math.sin(g*S)/T,o=Math.sin(o*S)/T}let y=o*b;if(l=l*g+d*y,c=c*g+f*y,h=h*g+m*y,u=u*g+x*y,g===1-o){let T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],m=s[a+3];return e[t]=o*m+h*u+l*f-c*d,e[t+1]=l*m+h*d+c*u-o*f,e[t+2]=c*m+h*f+o*d-l*u,e[t+3]=h*m-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),f=l(i/2),m=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tn(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(nf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(nf.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return pc.copy(this).projectOnVector(e),this.sub(pc)}reflect(e){return this.sub(pc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},pc=new P,nf=new yt,vn=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(oi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(oi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=oi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,oi):oi.fromBufferAttribute(s,a),oi.applyMatrix4(e.matrixWorld),this.expandByPoint(oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),no.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),no.copy(n.boundingBox)),no.applyMatrix4(e.matrixWorld),this.union(no)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,oi),oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ea),io.subVectors(this.max,ea),Js.subVectors(e.a,ea),Qs.subVectors(e.b,ea),er.subVectors(e.c,ea),es.subVectors(Qs,Js),ts.subVectors(er,Qs),Ts.subVectors(Js,er);let t=[0,-es.z,es.y,0,-ts.z,ts.y,0,-Ts.z,Ts.y,es.z,0,-es.x,ts.z,0,-ts.x,Ts.z,0,-Ts.x,-es.y,es.x,0,-ts.y,ts.x,0,-Ts.y,Ts.x,0];return!mc(t,Js,Qs,er,io)||(t=[1,0,0,0,1,0,0,0,1],!mc(t,Js,Qs,er,io))?!1:(so.crossVectors(es,ts),t=[so.x,so.y,so.z],mc(t,Js,Qs,er,io))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Pi=[new P,new P,new P,new P,new P,new P,new P,new P],oi=new P,no=new vn,Js=new P,Qs=new P,er=new P,es=new P,ts=new P,Ts=new P,ea=new P,io=new P,so=new P,ws=new P;function mc(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){ws.fromArray(r,s);let o=i.x*Math.abs(ws.x)+i.y*Math.abs(ws.y)+i.z*Math.abs(ws.z),l=e.dot(ws),c=t.dot(ws),h=n.dot(ws);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var dg=new vn,ta=new P,gc=new P,wn=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):dg.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ta.subVectors(e,this.center);let t=ta.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ta,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ta.copy(e.center).add(gc)),this.expandByPoint(ta.copy(e.center).sub(gc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ii=new P,xc=new P,ro=new P,ns=new P,yc=new P,ao=new P,vc=new P,wr=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ii)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ii.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ii.copy(this.origin).addScaledVector(this.direction,t),Ii.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){xc.copy(e).add(t).multiplyScalar(.5),ro.copy(t).sub(e).normalize(),ns.copy(this.origin).sub(xc);let s=e.distanceTo(t)*.5,a=-this.direction.dot(ro),o=ns.dot(this.direction),l=-ns.dot(ro),c=ns.lengthSq(),h=Math.abs(1-a*a),u,d,f,m;if(h>0)if(u=a*l-o,d=a*o-l,m=s*h,u>=0)if(d>=-m)if(d<=m){let x=1/h;u*=x,d*=x,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(xc).addScaledVector(ro,d),f}intersectSphere(e,t){Ii.subVectors(e.center,this.origin);let n=Ii.dot(this.direction),i=Ii.dot(Ii)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ii)!==null}intersectTriangle(e,t,n,i,s){yc.subVectors(t,e),ao.subVectors(n,e),vc.crossVectors(yc,ao);let a=this.direction.dot(vc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ns.subVectors(this.origin,e);let l=o*this.direction.dot(ao.crossVectors(ns,ao));if(l<0)return null;let c=o*this.direction.dot(yc.cross(ns));if(c<0||l+c>a)return null;let h=-o*ns.dot(vc);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},pe=class r{constructor(e,t,n,i,s,a,o,l,c,h,u,d,f,m,x,g){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,u,d,f,m,x,g)}set(e,t,n,i,s,a,o,l,c,h,u,d,f,m,x,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/tr.setFromMatrixColumn(e,0).length(),s=1/tr.setFromMatrixColumn(e,1).length(),a=1/tr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,f=a*u,m=o*h,x=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+m*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,m=c*h,x=c*u;t[0]=d+x*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,m=c*h,x=c*u;t[0]=d-x*o,t[4]=-a*u,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,f=a*u,m=o*h,x=o*u;t[0]=l*h,t[4]=m*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*h,t[4]=x-d*u,t[8]=m*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+m,t[10]=d-x*u}else if(e.order==="XZY"){let d=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=a*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=o*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fg,e,pg)}lookAt(e,t,n){let i=this.elements;return On.subVectors(e,t),On.lengthSq()===0&&(On.z=1),On.normalize(),is.crossVectors(n,On),is.lengthSq()===0&&(Math.abs(n.z)===1?On.x+=1e-4:On.z+=1e-4,On.normalize(),is.crossVectors(n,On)),is.normalize(),oo.crossVectors(On,is),i[0]=is.x,i[4]=oo.x,i[8]=On.x,i[1]=is.y,i[5]=oo.y,i[9]=On.y,i[2]=is.z,i[6]=oo.z,i[10]=On.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],x=n[6],g=n[10],p=n[14],b=n[3],_=n[7],y=n[11],T=n[15],S=i[0],A=i[4],E=i[8],v=i[12],M=i[1],C=i[5],U=i[9],k=i[13],O=i[2],G=i[6],H=i[10],ee=i[14],X=i[3],ie=i[7],J=i[11],oe=i[15];return s[0]=a*S+o*M+l*O+c*X,s[4]=a*A+o*C+l*G+c*ie,s[8]=a*E+o*U+l*H+c*J,s[12]=a*v+o*k+l*ee+c*oe,s[1]=h*S+u*M+d*O+f*X,s[5]=h*A+u*C+d*G+f*ie,s[9]=h*E+u*U+d*H+f*J,s[13]=h*v+u*k+d*ee+f*oe,s[2]=m*S+x*M+g*O+p*X,s[6]=m*A+x*C+g*G+p*ie,s[10]=m*E+x*U+g*H+p*J,s[14]=m*v+x*k+g*ee+p*oe,s[3]=b*S+_*M+y*O+T*X,s[7]=b*A+_*C+y*G+T*ie,s[11]=b*E+_*U+y*H+T*J,s[15]=b*v+_*k+y*ee+T*oe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],x=e[7],g=e[11],p=e[15];return m*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*f-n*l*f)+x*(+t*l*f-t*c*d+s*a*d-i*a*f+i*c*h-s*l*h)+g*(+t*c*u-t*o*f-s*a*u+n*a*f+s*o*h-n*c*h)+p*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],x=e[13],g=e[14],p=e[15],b=u*g*c-x*d*c+x*l*f-o*g*f-u*l*p+o*d*p,_=m*d*c-h*g*c-m*l*f+a*g*f+h*l*p-a*d*p,y=h*x*c-m*u*c+m*o*f-a*x*f-h*o*p+a*u*p,T=m*u*l-h*x*l-m*o*d+a*x*d+h*o*g-a*u*g,S=t*b+n*_+i*y+s*T;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/S;return e[0]=b*A,e[1]=(x*d*s-u*g*s-x*i*f+n*g*f+u*i*p-n*d*p)*A,e[2]=(o*g*s-x*l*s+x*i*c-n*g*c-o*i*p+n*l*p)*A,e[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*f-n*l*f)*A,e[4]=_*A,e[5]=(h*g*s-m*d*s+m*i*f-t*g*f-h*i*p+t*d*p)*A,e[6]=(m*l*s-a*g*s-m*i*c+t*g*c+a*i*p-t*l*p)*A,e[7]=(a*d*s-h*l*s+h*i*c-t*d*c-a*i*f+t*l*f)*A,e[8]=y*A,e[9]=(m*u*s-h*x*s-m*n*f+t*x*f+h*n*p-t*u*p)*A,e[10]=(a*x*s-m*o*s+m*n*c-t*x*c-a*n*p+t*o*p)*A,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*f-t*o*f)*A,e[12]=T*A,e[13]=(h*x*i-m*u*i+m*n*d-t*x*d-h*n*g+t*u*g)*A,e[14]=(m*o*i-a*x*i-m*n*l+t*x*l+a*n*g-t*o*g)*A,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*A,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,m=s*u,x=a*h,g=a*u,p=o*u,b=l*c,_=l*h,y=l*u,T=n.x,S=n.y,A=n.z;return i[0]=(1-(x+p))*T,i[1]=(f+y)*T,i[2]=(m-_)*T,i[3]=0,i[4]=(f-y)*S,i[5]=(1-(d+p))*S,i[6]=(g+b)*S,i[7]=0,i[8]=(m+_)*A,i[9]=(g-b)*A,i[10]=(1-(d+x))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=tr.set(i[0],i[1],i[2]).length(),a=tr.set(i[4],i[5],i[6]).length(),o=tr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],li.copy(this);let c=1/s,h=1/a,u=1/o;return li.elements[0]*=c,li.elements[1]*=c,li.elements[2]*=c,li.elements[4]*=h,li.elements[5]*=h,li.elements[6]*=h,li.elements[8]*=u,li.elements[9]*=u,li.elements[10]*=u,t.setFromRotationMatrix(li),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=Hi){let l=this.elements,c=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),f,m;if(o===Hi)f=-(a+s)/(a-s),m=-2*a*s/(a-s);else if(o===Ho)f=-a/(a-s),m=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Hi){let l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(a-s),d=(t+e)*c,f=(n+i)*h,m,x;if(o===Hi)m=(a+s)*u,x=-2*u;else if(o===Ho)m=s*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},tr=new P,li=new pe,fg=new P(0,0,0),pg=new P(1,1,1),is=new P,oo=new P,On=new P,sf=new pe,rf=new yt,zt=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(tn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-tn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(tn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-tn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(tn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-tn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return sf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rf.setFromEuler(this),this.setFromQuaternion(rf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zt.DEFAULT_ORDER="XYZ";var Vo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},mg=0,af=new P,nr=new yt,Li=new pe,lo=new P,na=new P,gg=new P,xg=new yt,of=new P(1,0,0),lf=new P(0,1,0),cf=new P(0,0,1),hf={type:"added"},yg={type:"removed"},ir={type:"childadded",child:null},_c={type:"childremoved",child:null},Yt=class r extends zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mg++}),this.uuid=Qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new P,t=new zt,n=new yt,i=new P(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new pe},normalMatrix:{value:new tt}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return nr.setFromAxisAngle(e,t),this.quaternion.multiply(nr),this}rotateOnWorldAxis(e,t){return nr.setFromAxisAngle(e,t),this.quaternion.premultiply(nr),this}rotateX(e){return this.rotateOnAxis(of,e)}rotateY(e){return this.rotateOnAxis(lf,e)}rotateZ(e){return this.rotateOnAxis(cf,e)}translateOnAxis(e,t){return af.copy(e).applyQuaternion(this.quaternion),this.position.add(af.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(of,e)}translateY(e){return this.translateOnAxis(lf,e)}translateZ(e){return this.translateOnAxis(cf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?lo.copy(e):lo.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),na.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(na,lo,this.up):Li.lookAt(lo,na,this.up),this.quaternion.setFromRotationMatrix(Li),i&&(Li.extractRotation(i.matrixWorld),nr.setFromRotationMatrix(Li),this.quaternion.premultiply(nr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hf),ir.child=e,this.dispatchEvent(ir),ir.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yg),_c.child=e,this.dispatchEvent(_c),_c.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Li.multiply(e.parent.matrixWorld)),e.applyMatrix4(Li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hf),ir.child=e,this.dispatchEvent(ir),ir.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,e,gg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,xg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Yt.DEFAULT_UP=new P(0,1,0);Yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ci=new P,Di=new P,bc=new P,Ui=new P,sr=new P,rr=new P,uf=new P,Mc=new P,Ec=new P,Sc=new P,Tc=new xt,wc=new xt,Ac=new xt,Ls=class r{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ci.subVectors(e,t),i.cross(ci);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){ci.subVectors(i,t),Di.subVectors(n,t),bc.subVectors(e,t);let a=ci.dot(ci),o=ci.dot(Di),l=ci.dot(bc),c=Di.dot(Di),h=Di.dot(bc),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,m=(a*h-o*l)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ui)===null?!1:Ui.x>=0&&Ui.y>=0&&Ui.x+Ui.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ui.x),l.addScaledVector(a,Ui.y),l.addScaledVector(o,Ui.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return Tc.setScalar(0),wc.setScalar(0),Ac.setScalar(0),Tc.fromBufferAttribute(e,t),wc.fromBufferAttribute(e,n),Ac.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Tc,s.x),a.addScaledVector(wc,s.y),a.addScaledVector(Ac,s.z),a}static isFrontFacing(e,t,n,i){return ci.subVectors(n,t),Di.subVectors(e,t),ci.cross(Di).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ci.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),ci.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;sr.subVectors(i,n),rr.subVectors(s,n),Mc.subVectors(e,n);let l=sr.dot(Mc),c=rr.dot(Mc);if(l<=0&&c<=0)return t.copy(n);Ec.subVectors(e,i);let h=sr.dot(Ec),u=rr.dot(Ec);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(sr,a);Sc.subVectors(e,s);let f=sr.dot(Sc),m=rr.dot(Sc);if(m>=0&&f<=m)return t.copy(s);let x=f*c-l*m;if(x<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(rr,o);let g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return uf.subVectors(s,i),o=(u-h)/(u-h+(f-m)),t.copy(i).addScaledVector(uf,o);let p=1/(g+x+d);return a=x*p,o=d*p,t.copy(n).addScaledVector(sr,a).addScaledVector(rr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Sp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ss={h:0,s:0,l:0},co={h:0,s:0,l:0};function Rc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}var de=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,rt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=rt.workingColorSpace){if(e=Du(e,1),t=tn(t,0,1),n=tn(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Rc(a,s,e+1/3),this.g=Rc(a,s,e),this.b=Rc(a,s,e-1/3)}return rt.toWorkingColorSpace(this,i),this}setStyle(e,t=ct){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ct){let n=Sp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=yr(e.r),this.g=yr(e.g),this.b=yr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ct){return rt.fromWorkingColorSpace(xn.copy(this),e),Math.round(tn(xn.r*255,0,255))*65536+Math.round(tn(xn.g*255,0,255))*256+Math.round(tn(xn.b*255,0,255))}getHexString(e=ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.fromWorkingColorSpace(xn.copy(this),t);let n=xn.r,i=xn.g,s=xn.b,a=Math.max(n,i,s),o=Math.min(n,i,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=rt.workingColorSpace){return rt.fromWorkingColorSpace(xn.copy(this),t),e.r=xn.r,e.g=xn.g,e.b=xn.b,e}getStyle(e=ct){rt.fromWorkingColorSpace(xn.copy(this),e);let t=xn.r,n=xn.g,i=xn.b;return e!==ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ss),this.setHSL(ss.h+e,ss.s+t,ss.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ss),e.getHSL(co);let n=da(ss.h,co.h,t),i=da(ss.s,co.s,t),s=da(ss.l,co.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},xn=new de;de.NAMES=Sp;var vg=0,Ln=class extends zi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vg++}),this.uuid=Qn(),this.name="",this.blending=gr,this.side=yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qc,this.blendDst=Yc,this.blendEquation=Jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new de(0,0,0),this.blendAlpha=0,this.depthFunc=_r,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zs,this.stencilZFail=Zs,this.stencilZPass=Zs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gr&&(n.blending=this.blending),this.side!==yi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==qc&&(n.blendSrc=this.blendSrc),this.blendDst!==Yc&&(n.blendDst=this.blendDst),this.blendEquation!==Jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_r&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Yd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Zs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Zs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},vt=class extends Ln{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zt,this.combine=hp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Oi=_g();function _g(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(c&8388608);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}function bg(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=tn(r,-65504,65504),Oi.floatView[0]=r;let e=Oi.uint32View[0],t=e>>23&511;return Oi.baseTable[t]+((e&8388607)>>Oi.shiftTable[t])}function Mg(r){let e=r>>10;return Oi.uint32View[0]=Oi.mantissaTable[Oi.offsetTable[e]+(r&1023)]+Oi.exponentTable[e],Oi.floatView[0]}var Da={toHalfFloat:bg,fromHalfFloat:Mg},Jt=new P,ho=new se,Ct=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ch,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ho.fromBufferAttribute(this,t),ho.applyMatrix3(e),this.setXY(t,ho.x,ho.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=hi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=At(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=hi(t,this.array)),t}setX(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=hi(t,this.array)),t}setY(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=hi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=hi(t,this.array)),t}setW(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),n=At(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),n=At(n,this.array),i=At(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),n=At(n,this.array),i=At(i,this.array),s=At(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ch&&(e.usage=this.usage),e}};var Go=class extends Ct{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Wo=class extends Ct{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var je=class extends Ct{constructor(e,t,n){super(new Float32Array(e),t,n)}},Eg=0,jn=new pe,Cc=new Yt,ar=new P,Hn=new vn,ia=new vn,hn=new P,Pt=class r extends zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Eg++}),this.uuid=Qn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ep(e)?Wo:Go)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new tt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jn.makeRotationFromQuaternion(e),this.applyMatrix4(jn),this}rotateX(e){return jn.makeRotationX(e),this.applyMatrix4(jn),this}rotateY(e){return jn.makeRotationY(e),this.applyMatrix4(jn),this}rotateZ(e){return jn.makeRotationZ(e),this.applyMatrix4(jn),this}translate(e,t,n){return jn.makeTranslation(e,t,n),this.applyMatrix4(jn),this}scale(e,t,n){return jn.makeScale(e,t,n),this.applyMatrix4(jn),this}lookAt(e){return Cc.lookAt(e),Cc.updateMatrix(),this.applyMatrix4(Cc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ar).negate(),this.translate(ar.x,ar.y,ar.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new je(n,3))}else{for(let n=0,i=t.count;n<i;n++){let s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];Hn.setFromBufferAttribute(s),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){let n=this.boundingSphere.center;if(Hn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];ia.setFromBufferAttribute(o),this.morphTargetsRelative?(hn.addVectors(Hn.min,ia.min),Hn.expandByPoint(hn),hn.addVectors(Hn.max,ia.max),Hn.expandByPoint(hn)):(Hn.expandByPoint(ia.min),Hn.expandByPoint(ia.max))}Hn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)hn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(hn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)hn.fromBufferAttribute(o,c),l&&(ar.fromBufferAttribute(e,c),hn.add(ar)),i=Math.max(i,n.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let E=0;E<n.count;E++)o[E]=new P,l[E]=new P;let c=new P,h=new P,u=new P,d=new se,f=new se,m=new se,x=new P,g=new P;function p(E,v,M){c.fromBufferAttribute(n,E),h.fromBufferAttribute(n,v),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,E),f.fromBufferAttribute(s,v),m.fromBufferAttribute(s,M),h.sub(c),u.sub(c),f.sub(d),m.sub(d);let C=1/(f.x*m.y-m.x*f.y);isFinite(C)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(C),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(C),o[E].add(x),o[v].add(x),o[M].add(x),l[E].add(g),l[v].add(g),l[M].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let E=0,v=b.length;E<v;++E){let M=b[E],C=M.start,U=M.count;for(let k=C,O=C+U;k<O;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}let _=new P,y=new P,T=new P,S=new P;function A(E){T.fromBufferAttribute(i,E),S.copy(T);let v=o[E];_.copy(v),_.sub(T.multiplyScalar(T.dot(v))).normalize(),y.crossVectors(S,v);let C=y.dot(l[E])<0?-1:1;a.setXYZW(E,_.x,_.y,_.z,C)}for(let E=0,v=b.length;E<v;++E){let M=b[E],C=M.start,U=M.count;for(let k=C,O=C+U;k<O;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new P,s=new P,a=new P,o=new P,l=new P,c=new P,h=new P,u=new P;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)hn.fromBufferAttribute(e,t),hn.normalize(),e.setXYZ(t,hn.x,hn.y,hn.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,m=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new Ct(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},df=new pe,As=new wr,uo=new wn,ff=new P,fo=new P,po=new P,mo=new P,Pc=new P,go=new P,pf=new P,xo=new P,Ne=class extends Yt{constructor(e=new Pt,t=new vt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){go.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],u=s[l];h!==0&&(Pc.fromBufferAttribute(u,e),a?go.addScaledVector(Pc,h):go.addScaledVector(Pc.sub(t),h))}t.add(go)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),uo.copy(n.boundingSphere),uo.applyMatrix4(s),As.copy(e.ray).recast(e.near),!(uo.containsPoint(As.origin)===!1&&(As.intersectSphere(uo,ff)===null||As.origin.distanceToSquared(ff)>(e.far-e.near)**2))&&(df.copy(s).invert(),As.copy(e.ray).applyMatrix4(df),!(n.boundingBox!==null&&As.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,As)))}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){let g=d[m],p=a[g.materialIndex],b=Math.max(g.start,f.start),_=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let y=b,T=_;y<T;y+=3){let S=o.getX(y),A=o.getX(y+1),E=o.getX(y+2);i=yo(this,p,e,n,c,h,u,S,A,E),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){let b=o.getX(g),_=o.getX(g+1),y=o.getX(g+2);i=yo(this,a,e,n,c,h,u,b,_,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){let g=d[m],p=a[g.materialIndex],b=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=b,T=_;y<T;y+=3){let S=y,A=y+1,E=y+2;i=yo(this,p,e,n,c,h,u,S,A,E),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){let b=g,_=g+1,y=g+2;i=yo(this,a,e,n,c,h,u,b,_,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function Sg(r,e,t,n,i,s,a,o){let l;if(e.side===yn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===yi,o),l===null)return null;xo.copy(o),xo.applyMatrix4(r.matrixWorld);let c=t.ray.origin.distanceTo(xo);return c<t.near||c>t.far?null:{distance:c,point:xo.clone(),object:r}}function yo(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,fo),r.getVertexPosition(l,po),r.getVertexPosition(c,mo);let h=Sg(r,e,t,n,fo,po,mo,pf);if(h){let u=new P;Ls.getBarycoord(pf,fo,po,mo,u),i&&(h.uv=Ls.getInterpolatedAttribute(i,o,l,c,u,new se)),s&&(h.uv1=Ls.getInterpolatedAttribute(s,o,l,c,u,new se)),a&&(h.normal=Ls.getInterpolatedAttribute(a,o,l,c,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new P,materialIndex:0};Ls.getNormal(fo,po,mo,d.normal),h.face=d,h.barycoord=u}return h}var Ot=class r extends Pt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(u,2));function m(x,g,p,b,_,y,T,S,A,E,v){let M=y/A,C=T/E,U=y/2,k=T/2,O=S/2,G=A+1,H=E+1,ee=0,X=0,ie=new P;for(let J=0;J<H;J++){let oe=J*C-k;for(let xe=0;xe<G;xe++){let Le=xe*M-U;ie[x]=Le*b,ie[g]=oe*_,ie[p]=O,c.push(ie.x,ie.y,ie.z),ie[x]=0,ie[g]=0,ie[p]=S>0?1:-1,h.push(ie.x,ie.y,ie.z),u.push(xe/A),u.push(1-J/E),ee+=1}}for(let J=0;J<E;J++)for(let oe=0;oe<A;oe++){let xe=d+oe+G*J,Le=d+oe+G*(J+1),$=d+(oe+1)+G*(J+1),ce=d+(oe+1)+G*J;l.push(xe,Le,ce),l.push(Le,$,ce),X+=6}o.addGroup(f,X,v),f+=X,d+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ar(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Sn(r){let e={};for(let t=0;t<r.length;t++){let n=Ar(r[t]);for(let i in n)e[i]=n[i]}return e}function Tg(r){let e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Tp(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}var Dn={clone:Ar,merge:Sn},wg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ag=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_t=class extends Ln{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wg,this.fragmentShader=Ag,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ar(e.uniforms),this.uniformsGroups=Tg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Xo=class extends Yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=Hi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},rs=new P,mf=new se,gf=new se,nn=class extends Xo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Tr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ua*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Tr*2*Math.atan(Math.tan(ua*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){rs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(rs.x,rs.y).multiplyScalar(-e/rs.z),rs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(rs.x,rs.y).multiplyScalar(-e/rs.z)}getViewSize(e,t){return this.getViewBounds(e,mf,gf),t.subVectors(gf,mf)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ua*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},or=-90,lr=1,Dh=class extends Yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new nn(or,lr,e,t);i.layers=this.layers,this.add(i);let s=new nn(or,lr,e,t);s.layers=this.layers,this.add(s);let a=new nn(or,lr,e,t);a.layers=this.layers,this.add(a);let o=new nn(or,lr,e,t);o.layers=this.layers,this.add(o);let l=new nn(or,lr,e,t);l.layers=this.layers,this.add(l);let c=new nn(or,lr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===Hi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ho)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},qo=class extends un{constructor(e,t,n,i,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:br,super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Uh=class extends en{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new qo(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Qt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ot(5,5,5),s=new _t({name:"CubemapFromEquirect",uniforms:Ar(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:yn,blending:sn});s.uniforms.tEquirect.value=t;let a=new Ne(i,s),o=t.minFilter;return t.minFilter===ui&&(t.minFilter=Qt),new Dh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},Ic=new P,Rg=new P,Cg=new tt,Fi=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Ic.subVectors(n,t).cross(Rg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Ic),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Cg.getNormalMatrix(e),i=this.coplanarPoint(Ic).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Rs=new wn,vo=new P,Ns=class{constructor(e=new Fi,t=new Fi,n=new Fi,i=new Fi,s=new Fi,a=new Fi){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Hi){let n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],m=i[9],x=i[10],g=i[11],p=i[12],b=i[13],_=i[14],y=i[15];if(n[0].setComponents(l-s,d-c,g-f,y-p).normalize(),n[1].setComponents(l+s,d+c,g+f,y+p).normalize(),n[2].setComponents(l+a,d+h,g+m,y+b).normalize(),n[3].setComponents(l-a,d-h,g-m,y-b).normalize(),n[4].setComponents(l-o,d-u,g-x,y-_).normalize(),t===Hi)n[5].setComponents(l+o,d+u,g+x,y+_).normalize();else if(t===Ho)n[5].setComponents(o,u,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Rs)}intersectsSprite(e){return Rs.center.set(0,0,0),Rs.radius=.7071067811865476,Rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Rs)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(vo.x=i.normal.x>0?e.max.x:e.min.x,vo.y=i.normal.y>0?e.max.y:e.min.y,vo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(vo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function wp(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Pg(r){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l.updateRanges;if(r.bindBuffer(c,o),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],x=u[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let x=u[f];r.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var Vt=class r extends Pt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],m=[],x=[],g=[];for(let p=0;p<h;p++){let b=p*d-a;for(let _=0;_<c;_++){let y=_*u-s;m.push(y,-b,0),x.push(0,0,1),g.push(_/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){let _=b+c*p,y=b+c*(p+1),T=b+1+c*(p+1),S=b+1+c*p;f.push(_,y,S),f.push(y,T,S)}this.setIndex(f),this.setAttribute("position",new je(m,3)),this.setAttribute("normal",new je(x,3)),this.setAttribute("uv",new je(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},Ig=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lg=`#ifdef USE_ALPHAHASH
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
#endif`,Dg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ug=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ng=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fg=`#ifdef USE_AOMAP
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
#endif`,Og=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hg=`#ifdef USE_BATCHING
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
#endif`,Bg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Wg=`#ifdef USE_IRIDESCENCE
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
#endif`,Xg=`#ifdef USE_BUMPMAP
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
#endif`,qg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$g=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Kg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Jg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Qg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ex=`#define PI 3.141592653589793
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
} // validated`,tx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,nx=`vec3 transformedNormal = objectNormal;
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
#endif`,ix=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ax=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ox="gl_FragColor = linearToOutputTexel( gl_FragColor );",lx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cx=`#ifdef USE_ENVMAP
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
#endif`,hx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ux=`#ifdef USE_ENVMAP
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
#endif`,dx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fx=`#ifdef USE_ENVMAP
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
#endif`,px=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yx=`#ifdef USE_GRADIENTMAP
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
}`,vx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_x=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mx=`uniform bool receiveShadow;
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
#endif`,Ex=`#ifdef USE_ENVMAP
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
#endif`,Sx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ax=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rx=`PhysicalMaterial material;
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
#endif`,Cx=`struct PhysicalMaterial {
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
}`,Px=`
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
#endif`,Ix=`#if defined( RE_IndirectDiffuse )
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
#endif`,Lx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ux=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kx=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ox=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Bx=`#if defined( USE_POINTS_UV )
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
#endif`,zx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qx=`#ifdef USE_MORPHTARGETS
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
#endif`,Yx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$x=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Kx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Zx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qx=`#ifdef USE_NORMALMAP
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
#endif`,ey=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ty=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ny=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ry=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ay=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,oy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ly=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,uy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,py=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,my=`float getShadowMask() {
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
}`,gy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xy=`#ifdef USE_SKINNING
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
#endif`,yy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vy=`#ifdef USE_SKINNING
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
#endif`,_y=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,by=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,My=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ey=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sy=`#ifdef USE_TRANSMISSION
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
#endif`,Ty=`#ifdef USE_TRANSMISSION
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
#endif`,wy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ay=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ry=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Py=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Iy=`uniform sampler2D t2D;
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
}`,Ly=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Uy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ny=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ky=`#include <common>
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
}`,Fy=`#if DEPTH_PACKING == 3200
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
}`,Oy=`#define DISTANCE
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
}`,Hy=`#define DISTANCE
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
}`,By=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vy=`uniform float scale;
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
}`,Gy=`uniform vec3 diffuse;
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
}`,Wy=`#include <common>
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
}`,Xy=`uniform vec3 diffuse;
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
}`,qy=`#define LAMBERT
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
}`,Yy=`#define LAMBERT
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
}`,$y=`#define MATCAP
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
}`,Ky=`#define MATCAP
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
}`,Zy=`#define NORMAL
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
}`,jy=`#define NORMAL
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
}`,Jy=`#define PHONG
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
}`,Qy=`#define PHONG
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
}`,ev=`#define STANDARD
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
}`,tv=`#define STANDARD
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
}`,nv=`#define TOON
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
}`,iv=`#define TOON
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
}`,sv=`uniform float size;
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
}`,rv=`uniform vec3 diffuse;
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
}`,av=`#include <common>
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
}`,ov=`uniform vec3 color;
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
}`,lv=`uniform float rotation;
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
}`,cv=`uniform vec3 diffuse;
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
}`,nt={alphahash_fragment:Ig,alphahash_pars_fragment:Lg,alphamap_fragment:Dg,alphamap_pars_fragment:Ug,alphatest_fragment:Ng,alphatest_pars_fragment:kg,aomap_fragment:Fg,aomap_pars_fragment:Og,batching_pars_vertex:Hg,batching_vertex:Bg,begin_vertex:zg,beginnormal_vertex:Vg,bsdfs:Gg,iridescence_fragment:Wg,bumpmap_pars_fragment:Xg,clipping_planes_fragment:qg,clipping_planes_pars_fragment:Yg,clipping_planes_pars_vertex:$g,clipping_planes_vertex:Kg,color_fragment:Zg,color_pars_fragment:jg,color_pars_vertex:Jg,color_vertex:Qg,common:ex,cube_uv_reflection_fragment:tx,defaultnormal_vertex:nx,displacementmap_pars_vertex:ix,displacementmap_vertex:sx,emissivemap_fragment:rx,emissivemap_pars_fragment:ax,colorspace_fragment:ox,colorspace_pars_fragment:lx,envmap_fragment:cx,envmap_common_pars_fragment:hx,envmap_pars_fragment:ux,envmap_pars_vertex:dx,envmap_physical_pars_fragment:Ex,envmap_vertex:fx,fog_vertex:px,fog_pars_vertex:mx,fog_fragment:gx,fog_pars_fragment:xx,gradientmap_pars_fragment:yx,lightmap_pars_fragment:vx,lights_lambert_fragment:_x,lights_lambert_pars_fragment:bx,lights_pars_begin:Mx,lights_toon_fragment:Sx,lights_toon_pars_fragment:Tx,lights_phong_fragment:wx,lights_phong_pars_fragment:Ax,lights_physical_fragment:Rx,lights_physical_pars_fragment:Cx,lights_fragment_begin:Px,lights_fragment_maps:Ix,lights_fragment_end:Lx,logdepthbuf_fragment:Dx,logdepthbuf_pars_fragment:Ux,logdepthbuf_pars_vertex:Nx,logdepthbuf_vertex:kx,map_fragment:Fx,map_pars_fragment:Ox,map_particle_fragment:Hx,map_particle_pars_fragment:Bx,metalnessmap_fragment:zx,metalnessmap_pars_fragment:Vx,morphinstance_vertex:Gx,morphcolor_vertex:Wx,morphnormal_vertex:Xx,morphtarget_pars_vertex:qx,morphtarget_vertex:Yx,normal_fragment_begin:$x,normal_fragment_maps:Kx,normal_pars_fragment:Zx,normal_pars_vertex:jx,normal_vertex:Jx,normalmap_pars_fragment:Qx,clearcoat_normal_fragment_begin:ey,clearcoat_normal_fragment_maps:ty,clearcoat_pars_fragment:ny,iridescence_pars_fragment:iy,opaque_fragment:sy,packing:ry,premultiplied_alpha_fragment:ay,project_vertex:oy,dithering_fragment:ly,dithering_pars_fragment:cy,roughnessmap_fragment:hy,roughnessmap_pars_fragment:uy,shadowmap_pars_fragment:dy,shadowmap_pars_vertex:fy,shadowmap_vertex:py,shadowmask_pars_fragment:my,skinbase_vertex:gy,skinning_pars_vertex:xy,skinning_vertex:yy,skinnormal_vertex:vy,specularmap_fragment:_y,specularmap_pars_fragment:by,tonemapping_fragment:My,tonemapping_pars_fragment:Ey,transmission_fragment:Sy,transmission_pars_fragment:Ty,uv_pars_fragment:wy,uv_pars_vertex:Ay,uv_vertex:Ry,worldpos_vertex:Cy,background_vert:Py,background_frag:Iy,backgroundCube_vert:Ly,backgroundCube_frag:Dy,cube_vert:Uy,cube_frag:Ny,depth_vert:ky,depth_frag:Fy,distanceRGBA_vert:Oy,distanceRGBA_frag:Hy,equirect_vert:By,equirect_frag:zy,linedashed_vert:Vy,linedashed_frag:Gy,meshbasic_vert:Wy,meshbasic_frag:Xy,meshlambert_vert:qy,meshlambert_frag:Yy,meshmatcap_vert:$y,meshmatcap_frag:Ky,meshnormal_vert:Zy,meshnormal_frag:jy,meshphong_vert:Jy,meshphong_frag:Qy,meshphysical_vert:ev,meshphysical_frag:tv,meshtoon_vert:nv,meshtoon_frag:iv,points_vert:sv,points_frag:rv,shadow_vert:av,shadow_frag:ov,sprite_vert:lv,sprite_frag:cv},be={common:{diffuse:{value:new de(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new de(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new de(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new de(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},xi={basic:{uniforms:Sn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:Sn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new de(0)}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:Sn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new de(0)},specular:{value:new de(1118481)},shininess:{value:30}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:Sn([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new de(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:Sn([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new de(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:Sn([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:Sn([be.points,be.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:Sn([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:Sn([be.common,be.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:Sn([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:Sn([be.sprite,be.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distanceRGBA:{uniforms:Sn([be.common,be.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distanceRGBA_vert,fragmentShader:nt.distanceRGBA_frag},shadow:{uniforms:Sn([be.lights,be.fog,{color:{value:new de(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};xi.physical={uniforms:Sn([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new de(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new de(0)},specularColor:{value:new de(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};var _o={r:0,b:0,g:0},Cs=new zt,hv=new pe;function uv(r,e,t,n,i,s,a){let o=new de(0),l=s===!0?0:1,c,h,u=null,d=0,f=null;function m(b){let _=b.isScene===!0?b.background:null;return _&&_.isTexture&&(_=(b.backgroundBlurriness>0?t:e).get(_)),_}function x(b){let _=!1,y=m(b);y===null?p(o,l):y&&y.isColor&&(p(y,1),_=!0);let T=r.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(b,_){let y=m(_);y&&(y.isCubeTexture||y.mapping===Ml)?(h===void 0&&(h=new Ne(new Ot(1,1,1),new _t({name:"BackgroundCubeMaterial",uniforms:Ar(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Cs.copy(_.backgroundRotation),Cs.x*=-1,Cs.y*=-1,Cs.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Cs.y*=-1,Cs.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(hv.makeRotationFromEuler(Cs)),h.material.toneMapped=rt.getTransfer(y.colorSpace)!==Tt,(u!==y||d!==y.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ne(new Vt(2,2),new _t({name:"BackgroundMaterial",uniforms:Ar(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:yi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=rt.getTransfer(y.colorSpace)!==Tt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,f=r.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,_){b.getRGB(_o,Tp(r)),n.buffers.color.setClear(_o.r,_o.g,_o.b,_,a)}return{getClearColor:function(){return o},setClearColor:function(b,_=1){o.set(b),l=_,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(o,l)},render:x,addToRenderList:g}}function dv(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null),s=i,a=!1;function o(M,C,U,k,O){let G=!1,H=u(k,U,C);s!==H&&(s=H,c(s.object)),G=f(M,k,U,O),G&&m(M,k,U,O),O!==null&&e.update(O,r.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,y(M,C,U,k),O!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,C,U){let k=U.wireframe===!0,O=n[M.id];O===void 0&&(O={},n[M.id]=O);let G=O[C.id];G===void 0&&(G={},O[C.id]=G);let H=G[k];return H===void 0&&(H=d(l()),G[k]=H),H}function d(M){let C=[],U=[],k=[];for(let O=0;O<t;O++)C[O]=0,U[O]=0,k[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:U,attributeDivisors:k,object:M,attributes:{},index:null}}function f(M,C,U,k){let O=s.attributes,G=C.attributes,H=0,ee=U.getAttributes();for(let X in ee)if(ee[X].location>=0){let J=O[X],oe=G[X];if(oe===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(oe=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(oe=M.instanceColor)),J===void 0||J.attribute!==oe||oe&&J.data!==oe.data)return!0;H++}return s.attributesNum!==H||s.index!==k}function m(M,C,U,k){let O={},G=C.attributes,H=0,ee=U.getAttributes();for(let X in ee)if(ee[X].location>=0){let J=G[X];J===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(J=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(J=M.instanceColor));let oe={};oe.attribute=J,J&&J.data&&(oe.data=J.data),O[X]=oe,H++}s.attributes=O,s.attributesNum=H,s.index=k}function x(){let M=s.newAttributes;for(let C=0,U=M.length;C<U;C++)M[C]=0}function g(M){p(M,0)}function p(M,C){let U=s.newAttributes,k=s.enabledAttributes,O=s.attributeDivisors;U[M]=1,k[M]===0&&(r.enableVertexAttribArray(M),k[M]=1),O[M]!==C&&(r.vertexAttribDivisor(M,C),O[M]=C)}function b(){let M=s.newAttributes,C=s.enabledAttributes;for(let U=0,k=C.length;U<k;U++)C[U]!==M[U]&&(r.disableVertexAttribArray(U),C[U]=0)}function _(M,C,U,k,O,G,H){H===!0?r.vertexAttribIPointer(M,C,U,O,G):r.vertexAttribPointer(M,C,U,k,O,G)}function y(M,C,U,k){x();let O=k.attributes,G=U.getAttributes(),H=C.defaultAttributeValues;for(let ee in G){let X=G[ee];if(X.location>=0){let ie=O[ee];if(ie===void 0&&(ee==="instanceMatrix"&&M.instanceMatrix&&(ie=M.instanceMatrix),ee==="instanceColor"&&M.instanceColor&&(ie=M.instanceColor)),ie!==void 0){let J=ie.normalized,oe=ie.itemSize,xe=e.get(ie);if(xe===void 0)continue;let Le=xe.buffer,$=xe.type,ce=xe.bytesPerElement,_e=$===r.INT||$===r.UNSIGNED_INT||ie.gpuType===Mu;if(ie.isInterleavedBufferAttribute){let he=ie.data,De=he.stride,We=ie.offset;if(he.isInstancedInterleavedBuffer){for(let He=0;He<X.locationSize;He++)p(X.location+He,he.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let He=0;He<X.locationSize;He++)g(X.location+He);r.bindBuffer(r.ARRAY_BUFFER,Le);for(let He=0;He<X.locationSize;He++)_(X.location+He,oe/X.locationSize,$,J,De*ce,(We+oe/X.locationSize*He)*ce,_e)}else{if(ie.isInstancedBufferAttribute){for(let he=0;he<X.locationSize;he++)p(X.location+he,ie.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let he=0;he<X.locationSize;he++)g(X.location+he);r.bindBuffer(r.ARRAY_BUFFER,Le);for(let he=0;he<X.locationSize;he++)_(X.location+he,oe/X.locationSize,$,J,oe*ce,oe/X.locationSize*he*ce,_e)}}else if(H!==void 0){let J=H[ee];if(J!==void 0)switch(J.length){case 2:r.vertexAttrib2fv(X.location,J);break;case 3:r.vertexAttrib3fv(X.location,J);break;case 4:r.vertexAttrib4fv(X.location,J);break;default:r.vertexAttrib1fv(X.location,J)}}}}b()}function T(){E();for(let M in n){let C=n[M];for(let U in C){let k=C[U];for(let O in k)h(k[O].object),delete k[O];delete C[U]}delete n[M]}}function S(M){if(n[M.id]===void 0)return;let C=n[M.id];for(let U in C){let k=C[U];for(let O in k)h(k[O].object),delete k[O];delete C[U]}delete n[M.id]}function A(M){for(let C in n){let U=n[C];if(U[M.id]===void 0)continue;let k=U[M.id];for(let O in k)h(k[O].object),delete k[O];delete U[M.id]}}function E(){v(),a=!0,s!==i&&(s=i,c(s.object))}function v(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:E,resetDefaultState:v,dispose:T,releaseStatesOfGeometry:S,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:g,disableUnusedAttributes:b}}function fv(r,e,t){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let x=0;x<u;x++)m+=h[x]*d[x];t.update(m,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function pv(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==In&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let E=A===jt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==di&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Tn&&!E)}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),_=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,S=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:b,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:T,maxSamples:S}}function mv(r){let e=this,t=null,n=0,i=!1,s=!1,a=new Fi,o=new tt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,p=r.get(u);if(!i||m===null||m.length===0||s&&!g)s?h(null):c();else{let b=s?0:n,_=b*4,y=p.clippingState||null;l.value=y,y=h(m,d,_,f);for(let T=0;T!==_;++T)y[T]=t[T];p.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){let x=u!==null?u.length:0,g=null;if(x!==0){if(g=l.value,m!==!0||g===null){let p=f+x*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,y=f;_!==x;++_,y+=4)a.copy(u[_]).applyMatrix4(b,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function gv(r){let e=new WeakMap;function t(a,o){return o===th?a.mapping=br:o===nh&&(a.mapping=Mr),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===th||o===nh)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Uh(l.height);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var us=class extends Xo{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},pr=4,xf=[.125,.215,.35,.446,.526,.582],Ds=20,Lc=new us,yf=new de,Dc=null,Uc=0,Nc=0,kc=!1,Is=(1+Math.sqrt(5))/2,cr=1/Is,vf=[new P(-Is,cr,0),new P(Is,cr,0),new P(-cr,0,Is),new P(cr,0,Is),new P(0,Is,-cr),new P(0,Is,cr),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Rr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Dc=this._renderer.getRenderTarget(),Uc=this._renderer.getActiveCubeFace(),Nc=this._renderer.getActiveMipmapLevel(),kc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Dc,Uc,Nc),this._renderer.xr.enabled=kc,e.scissorTest=!1,bo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===br||e.mapping===Mr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Dc=this._renderer.getRenderTarget(),Uc=this._renderer.getActiveCubeFace(),Nc=this._renderer.getActiveMipmapLevel(),kc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:jt,format:In,colorSpace:dn,depthBuffer:!1},i=_f(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_f(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=xv(s)),this._blurMaterial=yv(s,e,t)}return i}_compileMaterial(e){let t=new Ne(this._lodPlanes[0],e);this._renderer.compile(t,Lc)}_sceneToCubeUV(e,t,n,i){let o=new nn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(yf),h.toneMapping=ls,h.autoClear=!1;let f=new vt({name:"PMREM.Background",side:yn,depthWrite:!1,depthTest:!1}),m=new Ne(new Ot,f),x=!1,g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,x=!0):(f.color.copy(yf),x=!0);for(let p=0;p<6;p++){let b=p%3;b===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):b===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));let _=this._cubeSize;bo(i,b*_,p>2?_:0,_,_),h.setRenderTarget(i),x&&h.render(m,o),h.render(e,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=g}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===br||e.mapping===Mr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bf());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new Ne(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;bo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Lc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=vf[(i-s-1)%vf.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ne(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ds-1),x=s/m,g=isFinite(s)?1+Math.floor(h*x):Ds;g>Ds&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ds}`);let p=[],b=0;for(let A=0;A<Ds;++A){let E=A/x,v=Math.exp(-E*E/2);p.push(v),A===0?b+=v:A<g&&(b+=2*v)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:_}=this;d.dTheta.value=m,d.mipInt.value=_-n;let y=this._sizeLods[i],T=3*y*(i>_-pr?i-_+pr:0),S=4*(this._cubeSize-y);bo(t,T,S,3*y,2*y),l.setRenderTarget(t),l.render(u,Lc)}};function xv(r){let e=[],t=[],n=[],i=r,s=r-pr+1+xf.length;for(let a=0;a<s;a++){let o=Math.pow(2,i);t.push(o);let l=1/o;a>r-pr?l=xf[a-r+pr-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,x=3,g=2,p=1,b=new Float32Array(x*m*f),_=new Float32Array(g*m*f),y=new Float32Array(p*m*f);for(let S=0;S<f;S++){let A=S%3*2/3-1,E=S>2?0:-1,v=[A,E,0,A+2/3,E,0,A+2/3,E+1,0,A,E,0,A+2/3,E+1,0,A,E+1,0];b.set(v,x*m*S),_.set(d,g*m*S);let M=[S,S,S,S,S,S];y.set(M,p*m*S)}let T=new Pt;T.setAttribute("position",new Ct(b,x)),T.setAttribute("uv",new Ct(_,g)),T.setAttribute("faceIndex",new Ct(y,p)),e.push(T),i>pr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function _f(r,e,t){let n=new en(r,e,t);return n.texture.mapping=Ml,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function bo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function yv(r,e,t){let n=new Float32Array(Ds),i=new P(0,1,0);return new _t({name:"SphericalGaussianBlur",defines:{n:Ds,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Uu(),fragmentShader:`

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
		`,blending:sn,depthTest:!1,depthWrite:!1})}function bf(){return new _t({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uu(),fragmentShader:`

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
		`,blending:sn,depthTest:!1,depthWrite:!1})}function Mf(){return new _t({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:sn,depthTest:!1,depthWrite:!1})}function Uu(){return`

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
	`}function vv(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===th||l===nh,h=l===br||l===Mr;if(c||h){let u=e.get(o),d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Rr(r)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{let f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Rr(r)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function i(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function _v(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&la("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function bv(r,e,t,n){let i={},s=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);for(let m in d.morphAttributes){let x=d.morphAttributes[m];for(let g=0,p=x.length;g<p;g++)e.remove(x[g])}d.removeEventListener("dispose",a),delete i[d.id];let f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let m in d)e.update(d[m],r.ARRAY_BUFFER);let f=u.morphAttributes;for(let m in f){let x=f[m];for(let g=0,p=x.length;g<p;g++)e.update(x[g],r.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,m=u.attributes.position,x=0;if(f!==null){let b=f.array;x=f.version;for(let _=0,y=b.length;_<y;_+=3){let T=b[_+0],S=b[_+1],A=b[_+2];d.push(T,S,S,A,A,T)}}else if(m!==void 0){let b=m.array;x=m.version;for(let _=0,y=b.length/3-1;_<y;_+=3){let T=_+0,S=_+1,A=_+2;d.push(T,S,S,A,A,T)}}else return;let g=new(Ep(d)?Wo:Go)(d,1);g.version=x;let p=s.get(u);p&&e.remove(p),s.set(u,g)}function h(u){let d=s.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Mv(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*a),t.update(f,n,1)}function c(d,f,m){m!==0&&(r.drawElementsInstanced(n,f,s,d*a,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(d,f,m,x){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,x,0,m);let p=0;for(let b=0;b<m;b++)p+=f[b]*x[b];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Ev(r){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Sv(r,e,t){let n=new WeakMap,i=new xt;function s(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let v=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",v)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],_=0;f===!0&&(_=1),m===!0&&(_=2),x===!0&&(_=3);let y=o.attributes.position.count*_,T=1;y>e.maxTextureSize&&(T=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let S=new Float32Array(y*T*4*u),A=new zo(S,y,T,u);A.type=Tn,A.needsUpdate=!0;let E=_*4;for(let M=0;M<u;M++){let C=g[M],U=p[M],k=b[M],O=y*T*4*M;for(let G=0;G<C.count;G++){let H=G*E;f===!0&&(i.fromBufferAttribute(C,G),S[O+H+0]=i.x,S[O+H+1]=i.y,S[O+H+2]=i.z,S[O+H+3]=0),m===!0&&(i.fromBufferAttribute(U,G),S[O+H+4]=i.x,S[O+H+5]=i.y,S[O+H+6]=i.z,S[O+H+7]=0),x===!0&&(i.fromBufferAttribute(k,G),S[O+H+8]=i.x,S[O+H+9]=i.y,S[O+H+10]=i.z,S[O+H+11]=k.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new se(y,T)},n.set(o,d),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",m),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Tv(r,e,t,n){let i=new WeakMap;function s(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}var Cr=class extends un{constructor(e,t,n,i,s,a,o,l,c,h=xr){if(h!==xr&&h!==hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===xr&&(n=Us),n===void 0&&h===hs&&(n=cs),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:rn,this.minFilter=l!==void 0?l:rn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ap=new un,Ef=new Cr(1,1),Rp=new zo,Cp=new Lh,Pp=new qo,Sf=[],Tf=[],wf=new Float32Array(16),Af=new Float32Array(9),Rf=new Float32Array(4);function Hr(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=Sf[i];if(s===void 0&&(s=new Float32Array(i),Sf[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function an(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function on(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Tl(r,e){let t=Tf[e];t===void 0&&(t=new Int32Array(e),Tf[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function wv(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Av(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;r.uniform2fv(this.addr,e),on(t,e)}}function Rv(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;r.uniform3fv(this.addr,e),on(t,e)}}function Cv(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;r.uniform4fv(this.addr,e),on(t,e)}}function Pv(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;Rf.set(n),r.uniformMatrix2fv(this.addr,!1,Rf),on(t,n)}}function Iv(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;Af.set(n),r.uniformMatrix3fv(this.addr,!1,Af),on(t,n)}}function Lv(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;wf.set(n),r.uniformMatrix4fv(this.addr,!1,wf),on(t,n)}}function Dv(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Uv(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;r.uniform2iv(this.addr,e),on(t,e)}}function Nv(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;r.uniform3iv(this.addr,e),on(t,e)}}function kv(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;r.uniform4iv(this.addr,e),on(t,e)}}function Fv(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Ov(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;r.uniform2uiv(this.addr,e),on(t,e)}}function Hv(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;r.uniform3uiv(this.addr,e),on(t,e)}}function Bv(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;r.uniform4uiv(this.addr,e),on(t,e)}}function zv(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Ef.compareFunction=Mp,s=Ef):s=Ap,t.setTexture2D(e||s,i)}function Vv(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Cp,i)}function Gv(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Pp,i)}function Wv(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Rp,i)}function Xv(r){switch(r){case 5126:return wv;case 35664:return Av;case 35665:return Rv;case 35666:return Cv;case 35674:return Pv;case 35675:return Iv;case 35676:return Lv;case 5124:case 35670:return Dv;case 35667:case 35671:return Uv;case 35668:case 35672:return Nv;case 35669:case 35673:return kv;case 5125:return Fv;case 36294:return Ov;case 36295:return Hv;case 36296:return Bv;case 35678:case 36198:case 36298:case 36306:case 35682:return zv;case 35679:case 36299:case 36307:return Vv;case 35680:case 36300:case 36308:case 36293:return Gv;case 36289:case 36303:case 36311:case 36292:return Wv}}function qv(r,e){r.uniform1fv(this.addr,e)}function Yv(r,e){let t=Hr(e,this.size,2);r.uniform2fv(this.addr,t)}function $v(r,e){let t=Hr(e,this.size,3);r.uniform3fv(this.addr,t)}function Kv(r,e){let t=Hr(e,this.size,4);r.uniform4fv(this.addr,t)}function Zv(r,e){let t=Hr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function jv(r,e){let t=Hr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Jv(r,e){let t=Hr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Qv(r,e){r.uniform1iv(this.addr,e)}function e_(r,e){r.uniform2iv(this.addr,e)}function t_(r,e){r.uniform3iv(this.addr,e)}function n_(r,e){r.uniform4iv(this.addr,e)}function i_(r,e){r.uniform1uiv(this.addr,e)}function s_(r,e){r.uniform2uiv(this.addr,e)}function r_(r,e){r.uniform3uiv(this.addr,e)}function a_(r,e){r.uniform4uiv(this.addr,e)}function o_(r,e,t){let n=this.cache,i=e.length,s=Tl(t,i);an(n,s)||(r.uniform1iv(this.addr,s),on(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Ap,s[a])}function l_(r,e,t){let n=this.cache,i=e.length,s=Tl(t,i);an(n,s)||(r.uniform1iv(this.addr,s),on(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Cp,s[a])}function c_(r,e,t){let n=this.cache,i=e.length,s=Tl(t,i);an(n,s)||(r.uniform1iv(this.addr,s),on(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Pp,s[a])}function h_(r,e,t){let n=this.cache,i=e.length,s=Tl(t,i);an(n,s)||(r.uniform1iv(this.addr,s),on(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Rp,s[a])}function u_(r){switch(r){case 5126:return qv;case 35664:return Yv;case 35665:return $v;case 35666:return Kv;case 35674:return Zv;case 35675:return jv;case 35676:return Jv;case 5124:case 35670:return Qv;case 35667:case 35671:return e_;case 35668:case 35672:return t_;case 35669:case 35673:return n_;case 5125:return i_;case 36294:return s_;case 36295:return r_;case 36296:return a_;case 35678:case 36198:case 36298:case 36306:case 35682:return o_;case 35679:case 36299:case 36307:return l_;case 35680:case 36300:case 36308:case 36293:return c_;case 36289:case 36303:case 36311:case 36292:return h_}}var Nh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Xv(t.type)}},kh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=u_(t.type)}},Fh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},Fc=/(\w+)(\])?(\[|\.)?/g;function Cf(r,e){r.seq.push(e),r.map[e.id]=e}function d_(r,e,t){let n=r.name,i=n.length;for(Fc.lastIndex=0;;){let s=Fc.exec(n),a=Fc.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Cf(t,c===void 0?new Nh(o,r,e):new kh(o,r,e));break}else{let u=t.map[o];u===void 0&&(u=new Fh(o),Cf(t,u)),t=u}}}var vr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);d_(s,a,this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function Pf(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var f_=37297,p_=0;function m_(r,e){let t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var If=new tt;function g_(r){rt._getMatrix(If,rt.workingColorSpace,r);let e=`mat3( ${If.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(r)){case Sl:return[e,"LinearTransferOETF"];case Tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Lf(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+m_(r.getShaderSource(e),a)}else return i}function x_(r,e){let t=g_(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function y_(r,e){let t;switch(e){case gu:t="Linear";break;case xu:t="Reinhard";break;case yu:t="Cineon";break;case Ia:t="ACESFilmic";break;case vu:t="AgX";break;case _u:t="Neutral";break;case P0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Mo=new P;function v_(){rt.getLuminanceCoefficients(Mo);let r=Mo.x.toFixed(4),e=Mo.y.toFixed(4),t=Mo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function __(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ca).join(`
`)}function b_(r){let e=[];for(let t in r){let n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function M_(r,e){let t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(e,i),a=s.name,o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function ca(r){return r!==""}function Df(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Uf(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var E_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oh(r){return r.replace(E_,T_)}var S_=new Map;function T_(r,e){let t=nt[e];if(t===void 0){let n=S_.get(e);if(n!==void 0)t=nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Oh(t)}var w_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nf(r){return r.replace(w_,A_)}function A_(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function kf(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function R_(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Pa?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===vl?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ki&&(e="SHADOWMAP_TYPE_VSM"),e}function C_(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case br:case Mr:e="ENVMAP_TYPE_CUBE";break;case Ml:e="ENVMAP_TYPE_CUBE_UV";break}return e}function P_(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Mr:e="ENVMAP_MODE_REFRACTION";break}return e}function I_(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case hp:e="ENVMAP_BLENDING_MULTIPLY";break;case R0:e="ENVMAP_BLENDING_MIX";break;case C0:e="ENVMAP_BLENDING_ADD";break}return e}function L_(r){let e=r.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function D_(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=R_(t),c=C_(t),h=P_(t),u=I_(t),d=L_(t),f=__(t),m=b_(s),x=i.createProgram(),g,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ca).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ca).join(`
`),p.length>0&&(p+=`
`)):(g=[kf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ca).join(`
`),p=[kf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ls?"#define TONE_MAPPING":"",t.toneMapping!==ls?nt.tonemapping_pars_fragment:"",t.toneMapping!==ls?y_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,x_("linearToOutputTexel",t.outputColorSpace),v_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ca).join(`
`)),a=Oh(a),a=Df(a,t),a=Uf(a,t),o=Oh(o),o=Df(o,t),o=Uf(o,t),a=Nf(a),o=Nf(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===$d?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$d?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let _=b+g+a,y=b+p+o,T=Pf(i,i.VERTEX_SHADER,_),S=Pf(i,i.FRAGMENT_SHADER,y);i.attachShader(x,T),i.attachShader(x,S),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function A(C){if(r.debug.checkShaderErrors){let U=i.getProgramInfoLog(x).trim(),k=i.getShaderInfoLog(T).trim(),O=i.getShaderInfoLog(S).trim(),G=!0,H=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(G=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,x,T,S);else{let ee=Lf(i,T,"vertex"),X=Lf(i,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+U+`
`+ee+`
`+X)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(k===""||O==="")&&(H=!1);H&&(C.diagnostics={runnable:G,programLog:U,vertexShader:{log:k,prefix:g},fragmentShader:{log:O,prefix:p}})}i.deleteShader(T),i.deleteShader(S),E=new vr(i,x),v=M_(i,x)}let E;this.getUniforms=function(){return E===void 0&&A(this),E};let v;this.getAttributes=function(){return v===void 0&&A(this),v};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(x,f_)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=p_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=S,this}var U_=0,Hh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Bh(e),t.set(e,n)),n}},Bh=class{constructor(e){this.id=U_++,this.code=e,this.usedTimes=0}};function N_(r,e,t,n,i,s,a){let o=new Vo,l=new Hh,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(v){return c.add(v),v===0?"uv":`uv${v}`}function g(v,M,C,U,k){let O=U.fog,G=k.geometry,H=v.isMeshStandardMaterial?U.environment:null,ee=(v.isMeshStandardMaterial?t:e).get(v.envMap||H),X=ee&&ee.mapping===Ml?ee.image.height:null,ie=m[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));let J=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,oe=J!==void 0?J.length:0,xe=0;G.morphAttributes.position!==void 0&&(xe=1),G.morphAttributes.normal!==void 0&&(xe=2),G.morphAttributes.color!==void 0&&(xe=3);let Le,$,ce,_e;if(ie){let wt=xi[ie];Le=wt.vertexShader,$=wt.fragmentShader}else Le=v.vertexShader,$=v.fragmentShader,l.update(v),ce=l.getVertexShaderID(v),_e=l.getFragmentShaderID(v);let he=r.getRenderTarget(),De=r.state.buffers.depth.getReversed(),We=k.isInstancedMesh===!0,He=k.isBatchedMesh===!0,ot=!!v.map,Q=!!v.matcap,ue=!!ee,D=!!v.aoMap,Ue=!!v.lightMap,ae=!!v.bumpMap,we=!!v.normalMap,ge=!!v.displacementMap,Xe=!!v.emissiveMap,Ee=!!v.metalnessMap,I=!!v.roughnessMap,w=v.anisotropy>0,V=v.clearcoat>0,Z=v.dispersion>0,ne=v.iridescence>0,j=v.sheen>0,Ie=v.transmission>0,ye=w&&!!v.anisotropyMap,Me=V&&!!v.clearcoatMap,Je=V&&!!v.clearcoatNormalMap,le=V&&!!v.clearcoatRoughnessMap,Ce=ne&&!!v.iridescenceMap,qe=ne&&!!v.iridescenceThicknessMap,Ye=j&&!!v.sheenColorMap,Pe=j&&!!v.sheenRoughnessMap,lt=!!v.specularMap,$e=!!v.specularColorMap,pt=!!v.specularIntensityMap,F=Ie&&!!v.transmissionMap,ve=Ie&&!!v.thicknessMap,Y=!!v.gradientMap,te=!!v.alphaMap,Ae=v.alphaTest>0,Se=!!v.alphaHash,Qe=!!v.extensions,Zt=ls;v.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(Zt=r.toneMapping);let mn={shaderID:ie,shaderType:v.type,shaderName:v.name,vertexShader:Le,fragmentShader:$,defines:v.defines,customVertexShaderID:ce,customFragmentShaderID:_e,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:He,batchingColor:He&&k._colorsTexture!==null,instancing:We,instancingColor:We&&k.instanceColor!==null,instancingMorph:We&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:he===null?r.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:dn,alphaToCoverage:!!v.alphaToCoverage,map:ot,matcap:Q,envMap:ue,envMapMode:ue&&ee.mapping,envMapCubeUVHeight:X,aoMap:D,lightMap:Ue,bumpMap:ae,normalMap:we,displacementMap:d&&ge,emissiveMap:Xe,normalMapObjectSpace:we&&v.normalMapType===k0,normalMapTangentSpace:we&&v.normalMapType===Lu,metalnessMap:Ee,roughnessMap:I,anisotropy:w,anisotropyMap:ye,clearcoat:V,clearcoatMap:Me,clearcoatNormalMap:Je,clearcoatRoughnessMap:le,dispersion:Z,iridescence:ne,iridescenceMap:Ce,iridescenceThicknessMap:qe,sheen:j,sheenColorMap:Ye,sheenRoughnessMap:Pe,specularMap:lt,specularColorMap:$e,specularIntensityMap:pt,transmission:Ie,transmissionMap:F,thicknessMap:ve,gradientMap:Y,opaque:v.transparent===!1&&v.blending===gr&&v.alphaToCoverage===!1,alphaMap:te,alphaTest:Ae,alphaHash:Se,combine:v.combine,mapUv:ot&&x(v.map.channel),aoMapUv:D&&x(v.aoMap.channel),lightMapUv:Ue&&x(v.lightMap.channel),bumpMapUv:ae&&x(v.bumpMap.channel),normalMapUv:we&&x(v.normalMap.channel),displacementMapUv:ge&&x(v.displacementMap.channel),emissiveMapUv:Xe&&x(v.emissiveMap.channel),metalnessMapUv:Ee&&x(v.metalnessMap.channel),roughnessMapUv:I&&x(v.roughnessMap.channel),anisotropyMapUv:ye&&x(v.anisotropyMap.channel),clearcoatMapUv:Me&&x(v.clearcoatMap.channel),clearcoatNormalMapUv:Je&&x(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&x(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&x(v.iridescenceMap.channel),iridescenceThicknessMapUv:qe&&x(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ye&&x(v.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&x(v.sheenRoughnessMap.channel),specularMapUv:lt&&x(v.specularMap.channel),specularColorMapUv:$e&&x(v.specularColorMap.channel),specularIntensityMapUv:pt&&x(v.specularIntensityMap.channel),transmissionMapUv:F&&x(v.transmissionMap.channel),thicknessMapUv:ve&&x(v.thicknessMap.channel),alphaMapUv:te&&x(v.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(we||w),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!G.attributes.uv&&(ot||te),fog:!!O,useFog:v.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:De,skinning:k.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:xe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:Zt,decodeVideoTexture:ot&&v.map.isVideoTexture===!0&&rt.getTransfer(v.map.colorSpace)===Tt,decodeVideoTextureEmissive:Xe&&v.emissiveMap.isVideoTexture===!0&&rt.getTransfer(v.emissiveMap.colorSpace)===Tt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Rt,flipSided:v.side===yn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Qe&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Qe&&v.extensions.multiDraw===!0||He)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return mn.vertexUv1s=c.has(1),mn.vertexUv2s=c.has(2),mn.vertexUv3s=c.has(3),c.clear(),mn}function p(v){let M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(let C in v.defines)M.push(C),M.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(b(M,v),_(M,v),M.push(r.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function b(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapCubeUVHeight),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.morphAttributeCount),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.numLightProbes),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function _(v,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),v.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),v.push(o.mask)}function y(v){let M=m[v.type],C;if(M){let U=xi[M];C=Dn.clone(U.uniforms)}else C=v.uniforms;return C}function T(v,M){let C;for(let U=0,k=h.length;U<k;U++){let O=h[U];if(O.cacheKey===M){C=O,++C.usedTimes;break}}return C===void 0&&(C=new D_(r,M,v,s),h.push(C)),C}function S(v){if(--v.usedTimes===0){let M=h.indexOf(v);h[M]=h[h.length-1],h.pop(),v.destroy()}}function A(v){l.remove(v)}function E(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:T,releaseProgram:S,releaseShaderCache:A,programs:h,dispose:E}}function k_(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function F_(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Ff(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Of(){let r=[],e=0,t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,m,x,g){let p=r[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:x,group:g},r[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=x,p.group=g),e++,p}function o(u,d,f,m,x,g){let p=a(u,d,f,m,x,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,m,x,g){let p=a(u,d,f,m,x,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||F_),n.length>1&&n.sort(d||Ff),i.length>1&&i.sort(d||Ff)}function h(){for(let u=e,d=r.length;u<d;u++){let f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function O_(){let r=new WeakMap;function e(n,i){let s=r.get(n),a;return s===void 0?(a=new Of,r.set(n,[a])):i>=s.length?(a=new Of,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function H_(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new de};break;case"SpotLight":t={position:new P,direction:new P,color:new de,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new de,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new de,groundColor:new de};break;case"RectAreaLight":t={color:new de,position:new P,halfWidth:new P,halfHeight:new P};break}return r[e.id]=t,t}}}function B_(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}var z_=0;function V_(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function G_(r){let e=new H_,t=B_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);let i=new P,s=new pe,a=new pe;function o(c){let h=0,u=0,d=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,b=0,_=0,y=0,T=0,S=0,A=0;c.sort(V_);for(let v=0,M=c.length;v<M;v++){let C=c[v],U=C.color,k=C.intensity,O=C.distance,G=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=U.r*k,u+=U.g*k,d+=U.b*k;else if(C.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(C.sh.coefficients[H],k);A++}else if(C.isDirectionalLight){let H=e.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let ee=C.shadow,X=t.get(C);X.shadowIntensity=ee.intensity,X.shadowBias=ee.bias,X.shadowNormalBias=ee.normalBias,X.shadowRadius=ee.radius,X.shadowMapSize=ee.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=G,n.directionalShadowMatrix[f]=C.shadow.matrix,b++}n.directional[f]=H,f++}else if(C.isSpotLight){let H=e.get(C);H.position.setFromMatrixPosition(C.matrixWorld),H.color.copy(U).multiplyScalar(k),H.distance=O,H.coneCos=Math.cos(C.angle),H.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),H.decay=C.decay,n.spot[x]=H;let ee=C.shadow;if(C.map&&(n.spotLightMap[T]=C.map,T++,ee.updateMatrices(C),C.castShadow&&S++),n.spotLightMatrix[x]=ee.matrix,C.castShadow){let X=t.get(C);X.shadowIntensity=ee.intensity,X.shadowBias=ee.bias,X.shadowNormalBias=ee.normalBias,X.shadowRadius=ee.radius,X.shadowMapSize=ee.mapSize,n.spotShadow[x]=X,n.spotShadowMap[x]=G,y++}x++}else if(C.isRectAreaLight){let H=e.get(C);H.color.copy(U).multiplyScalar(k),H.halfWidth.set(C.width*.5,0,0),H.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=H,g++}else if(C.isPointLight){let H=e.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),H.distance=C.distance,H.decay=C.decay,C.castShadow){let ee=C.shadow,X=t.get(C);X.shadowIntensity=ee.intensity,X.shadowBias=ee.bias,X.shadowNormalBias=ee.normalBias,X.shadowRadius=ee.radius,X.shadowMapSize=ee.mapSize,X.shadowCameraNear=ee.camera.near,X.shadowCameraFar=ee.camera.far,n.pointShadow[m]=X,n.pointShadowMap[m]=G,n.pointShadowMatrix[m]=C.shadow.matrix,_++}n.point[m]=H,m++}else if(C.isHemisphereLight){let H=e.get(C);H.skyColor.copy(C.color).multiplyScalar(k),H.groundColor.copy(C.groundColor).multiplyScalar(k),n.hemi[p]=H,p++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=be.LTC_FLOAT_1,n.rectAreaLTC2=be.LTC_FLOAT_2):(n.rectAreaLTC1=be.LTC_HALF_1,n.rectAreaLTC2=be.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let E=n.hash;(E.directionalLength!==f||E.pointLength!==m||E.spotLength!==x||E.rectAreaLength!==g||E.hemiLength!==p||E.numDirectionalShadows!==b||E.numPointShadows!==_||E.numSpotShadows!==y||E.numSpotMaps!==T||E.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=y+T-S,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=A,E.directionalLength=f,E.pointLength=m,E.spotLength=x,E.rectAreaLength=g,E.hemiLength=p,E.numDirectionalShadows=b,E.numPointShadows=_,E.numSpotShadows=y,E.numSpotMaps=T,E.numLightProbes=A,n.version=z_++)}function l(c,h){let u=0,d=0,f=0,m=0,x=0,g=h.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){let _=c[p];if(_.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(_.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(_.isRectAreaLight){let y=n.rectArea[m];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(_.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),m++}else if(_.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),d++}else if(_.isHemisphereLight){let y=n.hemi[x];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:n}}function Hf(r){let e=new G_(r),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function W_(r){let e=new WeakMap;function t(i,s=0){let a=e.get(i),o;return a===void 0?(o=new Hf(r),e.set(i,[o])):s>=a.length?(o=new Hf(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var zh=class extends Ln{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=U0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Vh=class extends Ln{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},X_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,q_=`uniform sampler2D shadow_pass;
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
}`;function Y_(r,e,t){let n=new Ns,i=new se,s=new se,a=new xt,o=new zh({depthPacking:N0}),l=new Vh,c={},h=t.maxTextureSize,u={[yi]:yn,[yn]:yi,[Rt]:Rt},d=new _t({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:X_,fragmentShader:q_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new Pt;m.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ne(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pa;let p=this.type;this.render=function(S,A,E){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;let v=r.getRenderTarget(),M=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),U=r.state;U.setBlending(sn),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let k=p!==ki&&this.type===ki,O=p===ki&&this.type!==ki;for(let G=0,H=S.length;G<H;G++){let ee=S[G],X=ee.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);let ie=X.getFrameExtents();if(i.multiply(ie),s.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ie.x),i.x=s.x*ie.x,X.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ie.y),i.y=s.y*ie.y,X.mapSize.y=s.y)),X.map===null||k===!0||O===!0){let oe=this.type!==ki?{minFilter:rn,magFilter:rn}:{};X.map!==null&&X.map.dispose(),X.map=new en(i.x,i.y,oe),X.map.texture.name=ee.name+".shadowMap",X.camera.updateProjectionMatrix()}r.setRenderTarget(X.map),r.clear();let J=X.getViewportCount();for(let oe=0;oe<J;oe++){let xe=X.getViewport(oe);a.set(s.x*xe.x,s.y*xe.y,s.x*xe.z,s.y*xe.w),U.viewport(a),X.updateMatrices(ee,oe),n=X.getFrustum(),y(A,E,X.camera,ee,this.type)}X.isPointLightShadow!==!0&&this.type===ki&&b(X,E),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(v,M,C)};function b(S,A){let E=e.update(x);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new en(i.x,i.y)),d.uniforms.shadow_pass.value=S.map.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(A,null,E,d,x,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(A,null,E,f,x,null)}function _(S,A,E,v){let M=null,C=E.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)M=C;else if(M=E.isPointLight===!0?l:o,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let U=M.uuid,k=A.uuid,O=c[U];O===void 0&&(O={},c[U]=O);let G=O[k];G===void 0&&(G=M.clone(),O[k]=G,A.addEventListener("dispose",T)),M=G}if(M.visible=A.visible,M.wireframe=A.wireframe,v===ki?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,E.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let U=r.properties.get(M);U.light=E}return M}function y(S,A,E,v,M){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&M===ki)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,S.matrixWorld);let k=e.update(S),O=S.material;if(Array.isArray(O)){let G=k.groups;for(let H=0,ee=G.length;H<ee;H++){let X=G[H],ie=O[X.materialIndex];if(ie&&ie.visible){let J=_(S,ie,v,M);S.onBeforeShadow(r,S,A,E,k,J,X),r.renderBufferDirect(E,null,k,J,S,X),S.onAfterShadow(r,S,A,E,k,J,X)}}}else if(O.visible){let G=_(S,O,v,M);S.onBeforeShadow(r,S,A,E,k,G,null),r.renderBufferDirect(E,null,k,G,S,null),S.onAfterShadow(r,S,A,E,k,G,null)}}let U=S.children;for(let k=0,O=U.length;k<O;k++)y(U[k],A,E,v,M)}function T(S){S.target.removeEventListener("dispose",T);for(let E in c){let v=c[E],M=S.target.uuid;M in v&&(v[M].dispose(),delete v[M])}}}var $_={[$c]:Kc,[Zc]:Qc,[jc]:eh,[_r]:Jc,[Kc]:$c,[Qc]:Zc,[eh]:jc,[Jc]:_r};function K_(r,e){function t(){let F=!1,ve=new xt,Y=null,te=new xt(0,0,0,0);return{setMask:function(Ae){Y!==Ae&&!F&&(r.colorMask(Ae,Ae,Ae,Ae),Y=Ae)},setLocked:function(Ae){F=Ae},setClear:function(Ae,Se,Qe,Zt,mn){mn===!0&&(Ae*=Zt,Se*=Zt,Qe*=Zt),ve.set(Ae,Se,Qe,Zt),te.equals(ve)===!1&&(r.clearColor(Ae,Se,Qe,Zt),te.copy(ve))},reset:function(){F=!1,Y=null,te.set(-1,0,0,0)}}}function n(){let F=!1,ve=!1,Y=null,te=null,Ae=null;return{setReversed:function(Se){if(ve!==Se){let Qe=e.get("EXT_clip_control");ve?Qe.clipControlEXT(Qe.LOWER_LEFT_EXT,Qe.ZERO_TO_ONE_EXT):Qe.clipControlEXT(Qe.LOWER_LEFT_EXT,Qe.NEGATIVE_ONE_TO_ONE_EXT);let Zt=Ae;Ae=null,this.setClear(Zt)}ve=Se},getReversed:function(){return ve},setTest:function(Se){Se?he(r.DEPTH_TEST):De(r.DEPTH_TEST)},setMask:function(Se){Y!==Se&&!F&&(r.depthMask(Se),Y=Se)},setFunc:function(Se){if(ve&&(Se=$_[Se]),te!==Se){switch(Se){case $c:r.depthFunc(r.NEVER);break;case Kc:r.depthFunc(r.ALWAYS);break;case Zc:r.depthFunc(r.LESS);break;case _r:r.depthFunc(r.LEQUAL);break;case jc:r.depthFunc(r.EQUAL);break;case Jc:r.depthFunc(r.GEQUAL);break;case Qc:r.depthFunc(r.GREATER);break;case eh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}te=Se}},setLocked:function(Se){F=Se},setClear:function(Se){Ae!==Se&&(ve&&(Se=1-Se),r.clearDepth(Se),Ae=Se)},reset:function(){F=!1,Y=null,te=null,Ae=null,ve=!1}}}function i(){let F=!1,ve=null,Y=null,te=null,Ae=null,Se=null,Qe=null,Zt=null,mn=null;return{setTest:function(wt){F||(wt?he(r.STENCIL_TEST):De(r.STENCIL_TEST))},setMask:function(wt){ve!==wt&&!F&&(r.stencilMask(wt),ve=wt)},setFunc:function(wt,ri,Ri){(Y!==wt||te!==ri||Ae!==Ri)&&(r.stencilFunc(wt,ri,Ri),Y=wt,te=ri,Ae=Ri)},setOp:function(wt,ri,Ri){(Se!==wt||Qe!==ri||Zt!==Ri)&&(r.stencilOp(wt,ri,Ri),Se=wt,Qe=ri,Zt=Ri)},setLocked:function(wt){F=wt},setClear:function(wt){mn!==wt&&(r.clearStencil(wt),mn=wt)},reset:function(){F=!1,ve=null,Y=null,te=null,Ae=null,Se=null,Qe=null,Zt=null,mn=null}}}let s=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,b=null,_=null,y=null,T=null,S=null,A=new de(0,0,0),E=0,v=!1,M=null,C=null,U=null,k=null,O=null,G=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,ee=0,X=r.getParameter(r.VERSION);X.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(X)[1]),H=ee>=1):X.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),H=ee>=2);let ie=null,J={},oe=r.getParameter(r.SCISSOR_BOX),xe=r.getParameter(r.VIEWPORT),Le=new xt().fromArray(oe),$=new xt().fromArray(xe);function ce(F,ve,Y,te){let Ae=new Uint8Array(4),Se=r.createTexture();r.bindTexture(F,Se),r.texParameteri(F,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(F,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Qe=0;Qe<Y;Qe++)F===r.TEXTURE_3D||F===r.TEXTURE_2D_ARRAY?r.texImage3D(ve,0,r.RGBA,1,1,te,0,r.RGBA,r.UNSIGNED_BYTE,Ae):r.texImage2D(ve+Qe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ae);return Se}let _e={};_e[r.TEXTURE_2D]=ce(r.TEXTURE_2D,r.TEXTURE_2D,1),_e[r.TEXTURE_CUBE_MAP]=ce(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[r.TEXTURE_2D_ARRAY]=ce(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),_e[r.TEXTURE_3D]=ce(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),he(r.DEPTH_TEST),a.setFunc(_r),ae(!1),we(Gd),he(r.CULL_FACE),D(sn);function he(F){h[F]!==!0&&(r.enable(F),h[F]=!0)}function De(F){h[F]!==!1&&(r.disable(F),h[F]=!1)}function We(F,ve){return u[F]!==ve?(r.bindFramebuffer(F,ve),u[F]=ve,F===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=ve),F===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=ve),!0):!1}function He(F,ve){let Y=f,te=!1;if(F){Y=d.get(ve),Y===void 0&&(Y=[],d.set(ve,Y));let Ae=F.textures;if(Y.length!==Ae.length||Y[0]!==r.COLOR_ATTACHMENT0){for(let Se=0,Qe=Ae.length;Se<Qe;Se++)Y[Se]=r.COLOR_ATTACHMENT0+Se;Y.length=Ae.length,te=!0}}else Y[0]!==r.BACK&&(Y[0]=r.BACK,te=!0);te&&r.drawBuffers(Y)}function ot(F){return m!==F?(r.useProgram(F),m=F,!0):!1}let Q={[Jn]:r.FUNC_ADD,[p0]:r.FUNC_SUBTRACT,[m0]:r.FUNC_REVERSE_SUBTRACT};Q[g0]=r.MIN,Q[x0]=r.MAX;let ue={[Or]:r.ZERO,[y0]:r.ONE,[v0]:r.SRC_COLOR,[qc]:r.SRC_ALPHA,[E0]:r.SRC_ALPHA_SATURATE,[bl]:r.DST_COLOR,[_l]:r.DST_ALPHA,[_0]:r.ONE_MINUS_SRC_COLOR,[Yc]:r.ONE_MINUS_SRC_ALPHA,[M0]:r.ONE_MINUS_DST_COLOR,[b0]:r.ONE_MINUS_DST_ALPHA,[S0]:r.CONSTANT_COLOR,[T0]:r.ONE_MINUS_CONSTANT_COLOR,[w0]:r.CONSTANT_ALPHA,[A0]:r.ONE_MINUS_CONSTANT_ALPHA};function D(F,ve,Y,te,Ae,Se,Qe,Zt,mn,wt){if(F===sn){x===!0&&(De(r.BLEND),x=!1);return}if(x===!1&&(he(r.BLEND),x=!0),F!==mu){if(F!==g||wt!==v){if((p!==Jn||y!==Jn)&&(r.blendEquation(r.FUNC_ADD),p=Jn,y=Jn),wt)switch(F){case gr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case zn:r.blendFunc(r.ONE,r.ONE);break;case Wd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Xd:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case gr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case zn:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Wd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Xd:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}b=null,_=null,T=null,S=null,A.set(0,0,0),E=0,g=F,v=wt}return}Ae=Ae||ve,Se=Se||Y,Qe=Qe||te,(ve!==p||Ae!==y)&&(r.blendEquationSeparate(Q[ve],Q[Ae]),p=ve,y=Ae),(Y!==b||te!==_||Se!==T||Qe!==S)&&(r.blendFuncSeparate(ue[Y],ue[te],ue[Se],ue[Qe]),b=Y,_=te,T=Se,S=Qe),(Zt.equals(A)===!1||mn!==E)&&(r.blendColor(Zt.r,Zt.g,Zt.b,mn),A.copy(Zt),E=mn),g=F,v=!1}function Ue(F,ve){F.side===Rt?De(r.CULL_FACE):he(r.CULL_FACE);let Y=F.side===yn;ve&&(Y=!Y),ae(Y),F.blending===gr&&F.transparent===!1?D(sn):D(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),s.setMask(F.colorWrite);let te=F.stencilWrite;o.setTest(te),te&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Xe(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?he(r.SAMPLE_ALPHA_TO_COVERAGE):De(r.SAMPLE_ALPHA_TO_COVERAGE)}function ae(F){M!==F&&(F?r.frontFace(r.CW):r.frontFace(r.CCW),M=F)}function we(F){F!==d0?(he(r.CULL_FACE),F!==C&&(F===Gd?r.cullFace(r.BACK):F===f0?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):De(r.CULL_FACE),C=F}function ge(F){F!==U&&(H&&r.lineWidth(F),U=F)}function Xe(F,ve,Y){F?(he(r.POLYGON_OFFSET_FILL),(k!==ve||O!==Y)&&(r.polygonOffset(ve,Y),k=ve,O=Y)):De(r.POLYGON_OFFSET_FILL)}function Ee(F){F?he(r.SCISSOR_TEST):De(r.SCISSOR_TEST)}function I(F){F===void 0&&(F=r.TEXTURE0+G-1),ie!==F&&(r.activeTexture(F),ie=F)}function w(F,ve,Y){Y===void 0&&(ie===null?Y=r.TEXTURE0+G-1:Y=ie);let te=J[Y];te===void 0&&(te={type:void 0,texture:void 0},J[Y]=te),(te.type!==F||te.texture!==ve)&&(ie!==Y&&(r.activeTexture(Y),ie=Y),r.bindTexture(F,ve||_e[F]),te.type=F,te.texture=ve)}function V(){let F=J[ie];F!==void 0&&F.type!==void 0&&(r.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Z(){try{r.compressedTexImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ne(){try{r.compressedTexImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function j(){try{r.texSubImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ie(){try{r.texSubImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ye(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Me(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Je(){try{r.texStorage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function le(){try{r.texStorage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ce(){try{r.texImage2D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function qe(){try{r.texImage3D.apply(r,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ye(F){Le.equals(F)===!1&&(r.scissor(F.x,F.y,F.z,F.w),Le.copy(F))}function Pe(F){$.equals(F)===!1&&(r.viewport(F.x,F.y,F.z,F.w),$.copy(F))}function lt(F,ve){let Y=c.get(ve);Y===void 0&&(Y=new WeakMap,c.set(ve,Y));let te=Y.get(F);te===void 0&&(te=r.getUniformBlockIndex(ve,F.name),Y.set(F,te))}function $e(F,ve){let te=c.get(ve).get(F);l.get(ve)!==te&&(r.uniformBlockBinding(ve,te,F.__bindingPointIndex),l.set(ve,te))}function pt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},ie=null,J={},u={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,b=null,_=null,y=null,T=null,S=null,A=new de(0,0,0),E=0,v=!1,M=null,C=null,U=null,k=null,O=null,Le.set(0,0,r.canvas.width,r.canvas.height),$.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:he,disable:De,bindFramebuffer:We,drawBuffers:He,useProgram:ot,setBlending:D,setMaterial:Ue,setFlipSided:ae,setCullFace:we,setLineWidth:ge,setPolygonOffset:Xe,setScissorTest:Ee,activeTexture:I,bindTexture:w,unbindTexture:V,compressedTexImage2D:Z,compressedTexImage3D:ne,texImage2D:Ce,texImage3D:qe,updateUBOMapping:lt,uniformBlockBinding:$e,texStorage2D:Je,texStorage3D:le,texSubImage2D:j,texSubImage3D:Ie,compressedTexSubImage2D:ye,compressedTexSubImage3D:Me,scissor:Ye,viewport:Pe,reset:pt}}function Bf(r,e,t,n){let i=Z_(n);switch(t){case mp:return r*e;case xp:return r*e;case yp:return r*e*2;case Tu:return r*e/i.components*i.byteLength;case wu:return r*e/i.components*i.byteLength;case vp:return r*e*2/i.components*i.byteLength;case Au:return r*e*2/i.components*i.byteLength;case gp:return r*e*3/i.components*i.byteLength;case In:return r*e*4/i.components*i.byteLength;case Ru:return r*e*4/i.components*i.byteLength;case Do:case Uo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case No:case ko:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case sh:case ah:return Math.max(r,16)*Math.max(e,8)/4;case ih:case rh:return Math.max(r,8)*Math.max(e,8)/2;case oh:case lh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ch:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case hh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case uh:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case dh:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case fh:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case ph:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case mh:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case gh:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case xh:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case yh:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case vh:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case _h:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case bh:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Mh:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Eh:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Fo:case Sh:case Th:return Math.ceil(r/4)*Math.ceil(e/4)*16;case _p:case wh:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Ah:case Rh:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Z_(r){switch(r){case di:case dp:return{byteLength:1,components:1};case ya:case fp:case jt:return{byteLength:2,components:1};case Eu:case Su:return{byteLength:2,components:4};case Us:case Mu:case Tn:return{byteLength:4,components:1};case pp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function j_(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new se,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,w){return f?new OffscreenCanvas(I,w):va("canvas")}function x(I,w,V){let Z=1,ne=Ee(I);if((ne.width>V||ne.height>V)&&(Z=V/Math.max(ne.width,ne.height)),Z<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let j=Math.floor(Z*ne.width),Ie=Math.floor(Z*ne.height);u===void 0&&(u=m(j,Ie));let ye=w?m(j,Ie):u;return ye.width=j,ye.height=Ie,ye.getContext("2d").drawImage(I,0,0,j,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+j+"x"+Ie+")."),ye}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),I;return I}function g(I){return I.generateMipmaps}function p(I){r.generateMipmap(I)}function b(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(I,w,V,Z,ne=!1){if(I!==null){if(r[I]!==void 0)return r[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let j=w;if(w===r.RED&&(V===r.FLOAT&&(j=r.R32F),V===r.HALF_FLOAT&&(j=r.R16F),V===r.UNSIGNED_BYTE&&(j=r.R8)),w===r.RED_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.R8UI),V===r.UNSIGNED_SHORT&&(j=r.R16UI),V===r.UNSIGNED_INT&&(j=r.R32UI),V===r.BYTE&&(j=r.R8I),V===r.SHORT&&(j=r.R16I),V===r.INT&&(j=r.R32I)),w===r.RG&&(V===r.FLOAT&&(j=r.RG32F),V===r.HALF_FLOAT&&(j=r.RG16F),V===r.UNSIGNED_BYTE&&(j=r.RG8)),w===r.RG_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.RG8UI),V===r.UNSIGNED_SHORT&&(j=r.RG16UI),V===r.UNSIGNED_INT&&(j=r.RG32UI),V===r.BYTE&&(j=r.RG8I),V===r.SHORT&&(j=r.RG16I),V===r.INT&&(j=r.RG32I)),w===r.RGB_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.RGB8UI),V===r.UNSIGNED_SHORT&&(j=r.RGB16UI),V===r.UNSIGNED_INT&&(j=r.RGB32UI),V===r.BYTE&&(j=r.RGB8I),V===r.SHORT&&(j=r.RGB16I),V===r.INT&&(j=r.RGB32I)),w===r.RGBA_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),V===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),V===r.UNSIGNED_INT&&(j=r.RGBA32UI),V===r.BYTE&&(j=r.RGBA8I),V===r.SHORT&&(j=r.RGBA16I),V===r.INT&&(j=r.RGBA32I)),w===r.RGB&&V===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),w===r.RGBA){let Ie=ne?Sl:rt.getTransfer(Z);V===r.FLOAT&&(j=r.RGBA32F),V===r.HALF_FLOAT&&(j=r.RGBA16F),V===r.UNSIGNED_BYTE&&(j=Ie===Tt?r.SRGB8_ALPHA8:r.RGBA8),V===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),V===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function y(I,w){let V;return I?w===null||w===Us||w===cs?V=r.DEPTH24_STENCIL8:w===Tn?V=r.DEPTH32F_STENCIL8:w===ya&&(V=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Us||w===cs?V=r.DEPTH_COMPONENT24:w===Tn?V=r.DEPTH_COMPONENT32F:w===ya&&(V=r.DEPTH_COMPONENT16),V}function T(I,w){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==rn&&I.minFilter!==Qt?Math.log2(Math.max(w.width,w.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?w.mipmaps.length:1}function S(I){let w=I.target;w.removeEventListener("dispose",S),E(w),w.isVideoTexture&&h.delete(w)}function A(I){let w=I.target;w.removeEventListener("dispose",A),M(w)}function E(I){let w=n.get(I);if(w.__webglInit===void 0)return;let V=I.source,Z=d.get(V);if(Z){let ne=Z[w.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&v(I),Object.keys(Z).length===0&&d.delete(V)}n.remove(I)}function v(I){let w=n.get(I);r.deleteTexture(w.__webglTexture);let V=I.source,Z=d.get(V);delete Z[w.__cacheKey],a.memory.textures--}function M(I){let w=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(w.__webglFramebuffer[Z]))for(let ne=0;ne<w.__webglFramebuffer[Z].length;ne++)r.deleteFramebuffer(w.__webglFramebuffer[Z][ne]);else r.deleteFramebuffer(w.__webglFramebuffer[Z]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[Z])}else{if(Array.isArray(w.__webglFramebuffer))for(let Z=0;Z<w.__webglFramebuffer.length;Z++)r.deleteFramebuffer(w.__webglFramebuffer[Z]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Z=0;Z<w.__webglColorRenderbuffer.length;Z++)w.__webglColorRenderbuffer[Z]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[Z]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let V=I.textures;for(let Z=0,ne=V.length;Z<ne;Z++){let j=n.get(V[Z]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(V[Z])}n.remove(I)}let C=0;function U(){C=0}function k(){let I=C;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),C+=1,I}function O(I){let w=[];return w.push(I.wrapS),w.push(I.wrapT),w.push(I.wrapR||0),w.push(I.magFilter),w.push(I.minFilter),w.push(I.anisotropy),w.push(I.internalFormat),w.push(I.format),w.push(I.type),w.push(I.generateMipmaps),w.push(I.premultiplyAlpha),w.push(I.flipY),w.push(I.unpackAlignment),w.push(I.colorSpace),w.join()}function G(I,w){let V=n.get(I);if(I.isVideoTexture&&ge(I),I.isRenderTargetTexture===!1&&I.version>0&&V.__version!==I.version){let Z=I.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(V,I,w);return}}t.bindTexture(r.TEXTURE_2D,V.__webglTexture,r.TEXTURE0+w)}function H(I,w){let V=n.get(I);if(I.version>0&&V.__version!==I.version){$(V,I,w);return}t.bindTexture(r.TEXTURE_2D_ARRAY,V.__webglTexture,r.TEXTURE0+w)}function ee(I,w){let V=n.get(I);if(I.version>0&&V.__version!==I.version){$(V,I,w);return}t.bindTexture(r.TEXTURE_3D,V.__webglTexture,r.TEXTURE0+w)}function X(I,w){let V=n.get(I);if(I.version>0&&V.__version!==I.version){ce(V,I,w);return}t.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture,r.TEXTURE0+w)}let ie={[qt]:r.REPEAT,[Bn]:r.CLAMP_TO_EDGE,[xa]:r.MIRRORED_REPEAT},J={[rn]:r.NEAREST,[bu]:r.NEAREST_MIPMAP_NEAREST,[ur]:r.NEAREST_MIPMAP_LINEAR,[Qt]:r.LINEAR,[ha]:r.LINEAR_MIPMAP_NEAREST,[ui]:r.LINEAR_MIPMAP_LINEAR},oe={[F0]:r.NEVER,[G0]:r.ALWAYS,[O0]:r.LESS,[Mp]:r.LEQUAL,[H0]:r.EQUAL,[V0]:r.GEQUAL,[B0]:r.GREATER,[z0]:r.NOTEQUAL};function xe(I,w){if(w.type===Tn&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Qt||w.magFilter===ha||w.magFilter===ur||w.magFilter===ui||w.minFilter===Qt||w.minFilter===ha||w.minFilter===ur||w.minFilter===ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,ie[w.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,ie[w.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,ie[w.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,J[w.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,J[w.minFilter]),w.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,oe[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===rn||w.minFilter!==ur&&w.minFilter!==ui||w.type===Tn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");r.texParameterf(I,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Le(I,w){let V=!1;I.__webglInit===void 0&&(I.__webglInit=!0,w.addEventListener("dispose",S));let Z=w.source,ne=d.get(Z);ne===void 0&&(ne={},d.set(Z,ne));let j=O(w);if(j!==I.__cacheKey){ne[j]===void 0&&(ne[j]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,V=!0),ne[j].usedTimes++;let Ie=ne[I.__cacheKey];Ie!==void 0&&(ne[I.__cacheKey].usedTimes--,Ie.usedTimes===0&&v(w)),I.__cacheKey=j,I.__webglTexture=ne[j].texture}return V}function $(I,w,V){let Z=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Z=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Z=r.TEXTURE_3D);let ne=Le(I,w),j=w.source;t.bindTexture(Z,I.__webglTexture,r.TEXTURE0+V);let Ie=n.get(j);if(j.version!==Ie.__version||ne===!0){t.activeTexture(r.TEXTURE0+V);let ye=rt.getPrimaries(rt.workingColorSpace),Me=w.colorSpace===as?null:rt.getPrimaries(w.colorSpace),Je=w.colorSpace===as||ye===Me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je);let le=x(w.image,!1,i.maxTextureSize);le=Xe(w,le);let Ce=s.convert(w.format,w.colorSpace),qe=s.convert(w.type),Ye=_(w.internalFormat,Ce,qe,w.colorSpace,w.isVideoTexture);xe(Z,w);let Pe,lt=w.mipmaps,$e=w.isVideoTexture!==!0,pt=Ie.__version===void 0||ne===!0,F=j.dataReady,ve=T(w,le);if(w.isDepthTexture)Ye=y(w.format===hs,w.type),pt&&($e?t.texStorage2D(r.TEXTURE_2D,1,Ye,le.width,le.height):t.texImage2D(r.TEXTURE_2D,0,Ye,le.width,le.height,0,Ce,qe,null));else if(w.isDataTexture)if(lt.length>0){$e&&pt&&t.texStorage2D(r.TEXTURE_2D,ve,Ye,lt[0].width,lt[0].height);for(let Y=0,te=lt.length;Y<te;Y++)Pe=lt[Y],$e?F&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,Pe.width,Pe.height,Ce,qe,Pe.data):t.texImage2D(r.TEXTURE_2D,Y,Ye,Pe.width,Pe.height,0,Ce,qe,Pe.data);w.generateMipmaps=!1}else $e?(pt&&t.texStorage2D(r.TEXTURE_2D,ve,Ye,le.width,le.height),F&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,le.width,le.height,Ce,qe,le.data)):t.texImage2D(r.TEXTURE_2D,0,Ye,le.width,le.height,0,Ce,qe,le.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){$e&&pt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ve,Ye,lt[0].width,lt[0].height,le.depth);for(let Y=0,te=lt.length;Y<te;Y++)if(Pe=lt[Y],w.format!==In)if(Ce!==null)if($e){if(F)if(w.layerUpdates.size>0){let Ae=Bf(Pe.width,Pe.height,w.format,w.type);for(let Se of w.layerUpdates){let Qe=Pe.data.subarray(Se*Ae/Pe.data.BYTES_PER_ELEMENT,(Se+1)*Ae/Pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,Se,Pe.width,Pe.height,1,Ce,Qe)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,Pe.width,Pe.height,le.depth,Ce,Pe.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Y,Ye,Pe.width,Pe.height,le.depth,0,Pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?F&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,Pe.width,Pe.height,le.depth,Ce,qe,Pe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Y,Ye,Pe.width,Pe.height,le.depth,0,Ce,qe,Pe.data)}else{$e&&pt&&t.texStorage2D(r.TEXTURE_2D,ve,Ye,lt[0].width,lt[0].height);for(let Y=0,te=lt.length;Y<te;Y++)Pe=lt[Y],w.format!==In?Ce!==null?$e?F&&t.compressedTexSubImage2D(r.TEXTURE_2D,Y,0,0,Pe.width,Pe.height,Ce,Pe.data):t.compressedTexImage2D(r.TEXTURE_2D,Y,Ye,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?F&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,Pe.width,Pe.height,Ce,qe,Pe.data):t.texImage2D(r.TEXTURE_2D,Y,Ye,Pe.width,Pe.height,0,Ce,qe,Pe.data)}else if(w.isDataArrayTexture)if($e){if(pt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ve,Ye,le.width,le.height,le.depth),F)if(w.layerUpdates.size>0){let Y=Bf(le.width,le.height,w.format,w.type);for(let te of w.layerUpdates){let Ae=le.data.subarray(te*Y/le.data.BYTES_PER_ELEMENT,(te+1)*Y/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,te,le.width,le.height,1,Ce,qe,Ae)}w.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Ce,qe,le.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ye,le.width,le.height,le.depth,0,Ce,qe,le.data);else if(w.isData3DTexture)$e?(pt&&t.texStorage3D(r.TEXTURE_3D,ve,Ye,le.width,le.height,le.depth),F&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Ce,qe,le.data)):t.texImage3D(r.TEXTURE_3D,0,Ye,le.width,le.height,le.depth,0,Ce,qe,le.data);else if(w.isFramebufferTexture){if(pt)if($e)t.texStorage2D(r.TEXTURE_2D,ve,Ye,le.width,le.height);else{let Y=le.width,te=le.height;for(let Ae=0;Ae<ve;Ae++)t.texImage2D(r.TEXTURE_2D,Ae,Ye,Y,te,0,Ce,qe,null),Y>>=1,te>>=1}}else if(lt.length>0){if($e&&pt){let Y=Ee(lt[0]);t.texStorage2D(r.TEXTURE_2D,ve,Ye,Y.width,Y.height)}for(let Y=0,te=lt.length;Y<te;Y++)Pe=lt[Y],$e?F&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,Ce,qe,Pe):t.texImage2D(r.TEXTURE_2D,Y,Ye,Ce,qe,Pe);w.generateMipmaps=!1}else if($e){if(pt){let Y=Ee(le);t.texStorage2D(r.TEXTURE_2D,ve,Ye,Y.width,Y.height)}F&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ce,qe,le)}else t.texImage2D(r.TEXTURE_2D,0,Ye,Ce,qe,le);g(w)&&p(Z),Ie.__version=j.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function ce(I,w,V){if(w.image.length!==6)return;let Z=Le(I,w),ne=w.source;t.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+V);let j=n.get(ne);if(ne.version!==j.__version||Z===!0){t.activeTexture(r.TEXTURE0+V);let Ie=rt.getPrimaries(rt.workingColorSpace),ye=w.colorSpace===as?null:rt.getPrimaries(w.colorSpace),Me=w.colorSpace===as||Ie===ye?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let Je=w.isCompressedTexture||w.image[0].isCompressedTexture,le=w.image[0]&&w.image[0].isDataTexture,Ce=[];for(let te=0;te<6;te++)!Je&&!le?Ce[te]=x(w.image[te],!0,i.maxCubemapSize):Ce[te]=le?w.image[te].image:w.image[te],Ce[te]=Xe(w,Ce[te]);let qe=Ce[0],Ye=s.convert(w.format,w.colorSpace),Pe=s.convert(w.type),lt=_(w.internalFormat,Ye,Pe,w.colorSpace),$e=w.isVideoTexture!==!0,pt=j.__version===void 0||Z===!0,F=ne.dataReady,ve=T(w,qe);xe(r.TEXTURE_CUBE_MAP,w);let Y;if(Je){$e&&pt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ve,lt,qe.width,qe.height);for(let te=0;te<6;te++){Y=Ce[te].mipmaps;for(let Ae=0;Ae<Y.length;Ae++){let Se=Y[Ae];w.format!==In?Ye!==null?$e?F&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ae,0,0,Se.width,Se.height,Ye,Se.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ae,lt,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?F&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ae,0,0,Se.width,Se.height,Ye,Pe,Se.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ae,lt,Se.width,Se.height,0,Ye,Pe,Se.data)}}}else{if(Y=w.mipmaps,$e&&pt){Y.length>0&&ve++;let te=Ee(Ce[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ve,lt,te.width,te.height)}for(let te=0;te<6;te++)if(le){$e?F&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ce[te].width,Ce[te].height,Ye,Pe,Ce[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,lt,Ce[te].width,Ce[te].height,0,Ye,Pe,Ce[te].data);for(let Ae=0;Ae<Y.length;Ae++){let Qe=Y[Ae].image[te].image;$e?F&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ae+1,0,0,Qe.width,Qe.height,Ye,Pe,Qe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ae+1,lt,Qe.width,Qe.height,0,Ye,Pe,Qe.data)}}else{$e?F&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ye,Pe,Ce[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,lt,Ye,Pe,Ce[te]);for(let Ae=0;Ae<Y.length;Ae++){let Se=Y[Ae];$e?F&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ae+1,0,0,Ye,Pe,Se.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ae+1,lt,Ye,Pe,Se.image[te])}}}g(w)&&p(r.TEXTURE_CUBE_MAP),j.__version=ne.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function _e(I,w,V,Z,ne,j){let Ie=s.convert(V.format,V.colorSpace),ye=s.convert(V.type),Me=_(V.internalFormat,Ie,ye,V.colorSpace),Je=n.get(w),le=n.get(V);if(le.__renderTarget=w,!Je.__hasExternalTextures){let Ce=Math.max(1,w.width>>j),qe=Math.max(1,w.height>>j);ne===r.TEXTURE_3D||ne===r.TEXTURE_2D_ARRAY?t.texImage3D(ne,j,Me,Ce,qe,w.depth,0,Ie,ye,null):t.texImage2D(ne,j,Me,Ce,qe,0,Ie,ye,null)}t.bindFramebuffer(r.FRAMEBUFFER,I),we(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Z,ne,le.__webglTexture,0,ae(w)):(ne===r.TEXTURE_2D||ne>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Z,ne,le.__webglTexture,j),t.bindFramebuffer(r.FRAMEBUFFER,null)}function he(I,w,V){if(r.bindRenderbuffer(r.RENDERBUFFER,I),w.depthBuffer){let Z=w.depthTexture,ne=Z&&Z.isDepthTexture?Z.type:null,j=y(w.stencilBuffer,ne),Ie=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ye=ae(w);we(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ye,j,w.width,w.height):V?r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,j,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,j,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ie,r.RENDERBUFFER,I)}else{let Z=w.textures;for(let ne=0;ne<Z.length;ne++){let j=Z[ne],Ie=s.convert(j.format,j.colorSpace),ye=s.convert(j.type),Me=_(j.internalFormat,Ie,ye,j.colorSpace),Je=ae(w);V&&we(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Je,Me,w.width,w.height):we(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Je,Me,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,Me,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function De(I,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,I),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Z=n.get(w.depthTexture);Z.__renderTarget=w,(!Z.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),G(w.depthTexture,0);let ne=Z.__webglTexture,j=ae(w);if(w.depthTexture.format===xr)we(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0);else if(w.depthTexture.format===hs)we(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function We(I){let w=n.get(I),V=I.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==I.depthTexture){let Z=I.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),Z){let ne=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,Z.removeEventListener("dispose",ne)};Z.addEventListener("dispose",ne),w.__depthDisposeCallback=ne}w.__boundDepthTexture=Z}if(I.depthTexture&&!w.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");De(w.__webglFramebuffer,I)}else if(V){w.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[Z]),w.__webglDepthbuffer[Z]===void 0)w.__webglDepthbuffer[Z]=r.createRenderbuffer(),he(w.__webglDepthbuffer[Z],I,!1);else{let ne=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=w.__webglDepthbuffer[Z];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,j)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),he(w.__webglDepthbuffer,I,!1);else{let Z=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ne=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ne),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,ne)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function He(I,w,V){let Z=n.get(I);w!==void 0&&_e(Z.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),V!==void 0&&We(I)}function ot(I){let w=I.texture,V=n.get(I),Z=n.get(w);I.addEventListener("dispose",A);let ne=I.textures,j=I.isWebGLCubeRenderTarget===!0,Ie=ne.length>1;if(Ie||(Z.__webglTexture===void 0&&(Z.__webglTexture=r.createTexture()),Z.__version=w.version,a.memory.textures++),j){V.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(w.mipmaps&&w.mipmaps.length>0){V.__webglFramebuffer[ye]=[];for(let Me=0;Me<w.mipmaps.length;Me++)V.__webglFramebuffer[ye][Me]=r.createFramebuffer()}else V.__webglFramebuffer[ye]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){V.__webglFramebuffer=[];for(let ye=0;ye<w.mipmaps.length;ye++)V.__webglFramebuffer[ye]=r.createFramebuffer()}else V.__webglFramebuffer=r.createFramebuffer();if(Ie)for(let ye=0,Me=ne.length;ye<Me;ye++){let Je=n.get(ne[ye]);Je.__webglTexture===void 0&&(Je.__webglTexture=r.createTexture(),a.memory.textures++)}if(I.samples>0&&we(I)===!1){V.__webglMultisampledFramebuffer=r.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ye=0;ye<ne.length;ye++){let Me=ne[ye];V.__webglColorRenderbuffer[ye]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,V.__webglColorRenderbuffer[ye]);let Je=s.convert(Me.format,Me.colorSpace),le=s.convert(Me.type),Ce=_(Me.internalFormat,Je,le,Me.colorSpace,I.isXRRenderTarget===!0),qe=ae(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,qe,Ce,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ye,r.RENDERBUFFER,V.__webglColorRenderbuffer[ye])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&(V.__webglDepthRenderbuffer=r.createRenderbuffer(),he(V.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){t.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),xe(r.TEXTURE_CUBE_MAP,w);for(let ye=0;ye<6;ye++)if(w.mipmaps&&w.mipmaps.length>0)for(let Me=0;Me<w.mipmaps.length;Me++)_e(V.__webglFramebuffer[ye][Me],I,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Me);else _e(V.__webglFramebuffer[ye],I,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);g(w)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ie){for(let ye=0,Me=ne.length;ye<Me;ye++){let Je=ne[ye],le=n.get(Je);t.bindTexture(r.TEXTURE_2D,le.__webglTexture),xe(r.TEXTURE_2D,Je),_e(V.__webglFramebuffer,I,Je,r.COLOR_ATTACHMENT0+ye,r.TEXTURE_2D,0),g(Je)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let ye=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ye=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ye,Z.__webglTexture),xe(ye,w),w.mipmaps&&w.mipmaps.length>0)for(let Me=0;Me<w.mipmaps.length;Me++)_e(V.__webglFramebuffer[Me],I,w,r.COLOR_ATTACHMENT0,ye,Me);else _e(V.__webglFramebuffer,I,w,r.COLOR_ATTACHMENT0,ye,0);g(w)&&p(ye),t.unbindTexture()}I.depthBuffer&&We(I)}function Q(I){let w=I.textures;for(let V=0,Z=w.length;V<Z;V++){let ne=w[V];if(g(ne)){let j=b(I),Ie=n.get(ne).__webglTexture;t.bindTexture(j,Ie),p(j),t.unbindTexture()}}}let ue=[],D=[];function Ue(I){if(I.samples>0){if(we(I)===!1){let w=I.textures,V=I.width,Z=I.height,ne=r.COLOR_BUFFER_BIT,j=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ie=n.get(I),ye=w.length>1;if(ye)for(let Me=0;Me<w.length;Me++)t.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Me,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Me,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let Me=0;Me<w.length;Me++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ne|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ne|=r.STENCIL_BUFFER_BIT)),ye){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ie.__webglColorRenderbuffer[Me]);let Je=n.get(w[Me]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Je,0)}r.blitFramebuffer(0,0,V,Z,0,0,V,Z,ne,r.NEAREST),l===!0&&(ue.length=0,D.length=0,ue.push(r.COLOR_ATTACHMENT0+Me),I.depthBuffer&&I.resolveDepthBuffer===!1&&(ue.push(j),D.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,D)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ye)for(let Me=0;Me<w.length;Me++){t.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Me,r.RENDERBUFFER,Ie.__webglColorRenderbuffer[Me]);let Je=n.get(w[Me]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Me,r.TEXTURE_2D,Je,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){let w=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function ae(I){return Math.min(i.maxSamples,I.samples)}function we(I){let w=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function ge(I){let w=a.render.frame;h.get(I)!==w&&(h.set(I,w),I.update())}function Xe(I,w){let V=I.colorSpace,Z=I.format,ne=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||V!==dn&&V!==as&&(rt.getTransfer(V)===Tt?(Z!==In||ne!==di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),w}function Ee(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=U,this.setTexture2D=G,this.setTexture2DArray=H,this.setTexture3D=ee,this.setTextureCube=X,this.rebindTextures=He,this.setupRenderTarget=ot,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=we}function J_(r,e){function t(n,i=as){let s,a=rt.getTransfer(i);if(n===di)return r.UNSIGNED_BYTE;if(n===Eu)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Su)return r.UNSIGNED_SHORT_5_5_5_1;if(n===pp)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===dp)return r.BYTE;if(n===fp)return r.SHORT;if(n===ya)return r.UNSIGNED_SHORT;if(n===Mu)return r.INT;if(n===Us)return r.UNSIGNED_INT;if(n===Tn)return r.FLOAT;if(n===jt)return r.HALF_FLOAT;if(n===mp)return r.ALPHA;if(n===gp)return r.RGB;if(n===In)return r.RGBA;if(n===xp)return r.LUMINANCE;if(n===yp)return r.LUMINANCE_ALPHA;if(n===xr)return r.DEPTH_COMPONENT;if(n===hs)return r.DEPTH_STENCIL;if(n===Tu)return r.RED;if(n===wu)return r.RED_INTEGER;if(n===vp)return r.RG;if(n===Au)return r.RG_INTEGER;if(n===Ru)return r.RGBA_INTEGER;if(n===Do||n===Uo||n===No||n===ko)if(a===Tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Do)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Uo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===No)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ko)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Do)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Uo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===No)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ko)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ih||n===sh||n===rh||n===ah)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ih)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===sh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===rh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ah)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===oh||n===lh||n===ch)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===oh||n===lh)return a===Tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ch)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===hh||n===uh||n===dh||n===fh||n===ph||n===mh||n===gh||n===xh||n===yh||n===vh||n===_h||n===bh||n===Mh||n===Eh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===hh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===uh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===dh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ph)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===mh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===gh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===yh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===vh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_h)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===bh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Mh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Eh)return a===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fo||n===Sh||n===Th)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Fo)return a===Tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Sh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Th)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===_p||n===wh||n===Ah||n===Rh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Fo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===wh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ah)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Rh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===cs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}var Gh=class extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},st=class extends Yt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Q_={type:"move"},fa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new st,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new st,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new st,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Q_)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new st;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},eb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tb=`
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

}`,Wh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let i=new un,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new _t({vertexShader:eb,fragmentShader:tb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ne(new Vt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Xh=class extends zi{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null,x=new Wh,g=t.getContextAttributes(),p=null,b=null,_=[],y=[],T=new se,S=null,A=new nn;A.viewport=new xt;let E=new nn;E.viewport=new xt;let v=[A,E],M=new Gh,C=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ce=_[$];return ce===void 0&&(ce=new fa,_[$]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function($){let ce=_[$];return ce===void 0&&(ce=new fa,_[$]=ce),ce.getGripSpace()},this.getHand=function($){let ce=_[$];return ce===void 0&&(ce=new fa,_[$]=ce),ce.getHandSpace()};function k($){let ce=y.indexOf($.inputSource);if(ce===-1)return;let _e=_[ce];_e!==void 0&&(_e.update($.inputSource,$.frame,c||a),_e.dispatchEvent({type:$.type,data:$.inputSource}))}function O(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",G);for(let $=0;$<_.length;$++){let ce=y[$];ce!==null&&(y[$]=null,_[$].disconnect(ce))}C=null,U=null,x.reset(),e.setRenderTarget(p),f=null,d=null,u=null,i=null,b=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",O),i.addEventListener("inputsourceschange",G),g.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(T),i.renderState.layers===void 0){let ce={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,ce),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new en(f.framebufferWidth,f.framebufferHeight,{format:In,type:di,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ce=null,_e=null,he=null;g.depth&&(he=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=g.stencil?hs:xr,_e=g.stencil?cs:Us);let De={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(De),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new en(d.textureWidth,d.textureHeight,{format:In,type:di,depthTexture:new Cr(d.textureWidth,d.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Le.setContext(i),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function G($){for(let ce=0;ce<$.removed.length;ce++){let _e=$.removed[ce],he=y.indexOf(_e);he>=0&&(y[he]=null,_[he].disconnect(_e))}for(let ce=0;ce<$.added.length;ce++){let _e=$.added[ce],he=y.indexOf(_e);if(he===-1){for(let We=0;We<_.length;We++)if(We>=y.length){y.push(_e),he=We;break}else if(y[We]===null){y[We]=_e,he=We;break}if(he===-1)break}let De=_[he];De&&De.connect(_e)}}let H=new P,ee=new P;function X($,ce,_e){H.setFromMatrixPosition(ce.matrixWorld),ee.setFromMatrixPosition(_e.matrixWorld);let he=H.distanceTo(ee),De=ce.projectionMatrix.elements,We=_e.projectionMatrix.elements,He=De[14]/(De[10]-1),ot=De[14]/(De[10]+1),Q=(De[9]+1)/De[5],ue=(De[9]-1)/De[5],D=(De[8]-1)/De[0],Ue=(We[8]+1)/We[0],ae=He*D,we=He*Ue,ge=he/(-D+Ue),Xe=ge*-D;if(ce.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Xe),$.translateZ(ge),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),De[10]===-1)$.projectionMatrix.copy(ce.projectionMatrix),$.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{let Ee=He+ge,I=ot+ge,w=ae-Xe,V=we+(he-Xe),Z=Q*ot/I*Ee,ne=ue*ot/I*Ee;$.projectionMatrix.makePerspective(w,V,Z,ne,Ee,I),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ie($,ce){ce===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ce.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let ce=$.near,_e=$.far;x.texture!==null&&(x.depthNear>0&&(ce=x.depthNear),x.depthFar>0&&(_e=x.depthFar)),M.near=E.near=A.near=ce,M.far=E.far=A.far=_e,(C!==M.near||U!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,U=M.far),A.layers.mask=$.layers.mask|2,E.layers.mask=$.layers.mask|4,M.layers.mask=A.layers.mask|E.layers.mask;let he=$.parent,De=M.cameras;ie(M,he);for(let We=0;We<De.length;We++)ie(De[We],he);De.length===2?X(M,A,E):M.projectionMatrix.copy(A.projectionMatrix),J($,M,he)};function J($,ce,_e){_e===null?$.matrix.copy(ce.matrixWorld):($.matrix.copy(_e.matrixWorld),$.matrix.invert(),$.matrix.multiply(ce.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ce.projectionMatrix),$.projectionMatrixInverse.copy(ce.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Tr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let oe=null;function xe($,ce){if(h=ce.getViewerPose(c||a),m=ce,h!==null){let _e=h.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let he=!1;_e.length!==M.cameras.length&&(M.cameras.length=0,he=!0);for(let We=0;We<_e.length;We++){let He=_e[We],ot=null;if(f!==null)ot=f.getViewport(He);else{let ue=u.getViewSubImage(d,He);ot=ue.viewport,We===0&&(e.setRenderTargetTextures(b,ue.colorTexture,d.ignoreDepthValues?void 0:ue.depthStencilTexture),e.setRenderTarget(b))}let Q=v[We];Q===void 0&&(Q=new nn,Q.layers.enable(We),Q.viewport=new xt,v[We]=Q),Q.matrix.fromArray(He.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(He.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(ot.x,ot.y,ot.width,ot.height),We===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),he===!0&&M.cameras.push(Q)}let De=i.enabledFeatures;if(De&&De.includes("depth-sensing")){let We=u.getDepthInformation(_e[0]);We&&We.isValid&&We.texture&&x.init(e,We,i.renderState)}}for(let _e=0;_e<_.length;_e++){let he=y[_e],De=_[_e];he!==null&&De!==void 0&&De.update(he,ce,c||a)}oe&&oe($,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),m=null}let Le=new wp;Le.setAnimationLoop(xe),this.setAnimationLoop=function($){oe=$},this.dispose=function(){}}},Ps=new zt,nb=new pe;function ib(r,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Tp(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,b,_,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),u(g,p)):p.isMeshPhongMaterial?(s(g,p),h(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),x(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,b,_):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===yn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===yn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let b=e.get(p),_=b.envMap,y=b.envMapRotation;_&&(g.envMap.value=_,Ps.copy(y),Ps.x*=-1,Ps.y*=-1,Ps.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ps.y*=-1,Ps.z*=-1),g.envMapRotation.value.setFromMatrix4(nb.makeRotationFromEuler(Ps)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,b,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*b,g.scale.value=_*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,b){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===yn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){let b=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function sb(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,_){let y=_.program;n.uniformBlockBinding(b,y)}function c(b,_){let y=i[b.id];y===void 0&&(m(b),y=h(b),i[b.id]=y,b.addEventListener("dispose",g));let T=_.program;n.updateUBOMapping(b,T);let S=e.render.frame;s[b.id]!==S&&(d(b),s[b.id]=S)}function h(b){let _=u();b.__bindingPointIndex=_;let y=r.createBuffer(),T=b.__size,S=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,T,S),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,_,y),y}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){let _=i[b.id],y=b.uniforms,T=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,_);for(let S=0,A=y.length;S<A;S++){let E=Array.isArray(y[S])?y[S]:[y[S]];for(let v=0,M=E.length;v<M;v++){let C=E[v];if(f(C,S,v,T)===!0){let U=C.__offset,k=Array.isArray(C.value)?C.value:[C.value],O=0;for(let G=0;G<k.length;G++){let H=k[G],ee=x(H);typeof H=="number"||typeof H=="boolean"?(C.__data[0]=H,r.bufferSubData(r.UNIFORM_BUFFER,U+O,C.__data)):H.isMatrix3?(C.__data[0]=H.elements[0],C.__data[1]=H.elements[1],C.__data[2]=H.elements[2],C.__data[3]=0,C.__data[4]=H.elements[3],C.__data[5]=H.elements[4],C.__data[6]=H.elements[5],C.__data[7]=0,C.__data[8]=H.elements[6],C.__data[9]=H.elements[7],C.__data[10]=H.elements[8],C.__data[11]=0):(H.toArray(C.__data,O),O+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(b,_,y,T){let S=b.value,A=_+"_"+y;if(T[A]===void 0)return typeof S=="number"||typeof S=="boolean"?T[A]=S:T[A]=S.clone(),!0;{let E=T[A];if(typeof S=="number"||typeof S=="boolean"){if(E!==S)return T[A]=S,!0}else if(E.equals(S)===!1)return E.copy(S),!0}return!1}function m(b){let _=b.uniforms,y=0,T=16;for(let A=0,E=_.length;A<E;A++){let v=Array.isArray(_[A])?_[A]:[_[A]];for(let M=0,C=v.length;M<C;M++){let U=v[M],k=Array.isArray(U.value)?U.value:[U.value];for(let O=0,G=k.length;O<G;O++){let H=k[O],ee=x(H),X=y%T,ie=X%ee.boundary,J=X+ie;y+=ie,J!==0&&T-J<ee.storage&&(y+=T-J),U.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=y,y+=ee.storage}}}let S=y%T;return S>0&&(y+=T-S),b.__size=y,b.__cache={},this}function x(b){let _={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(_.boundary=4,_.storage=4):b.isVector2?(_.boundary=8,_.storage=8):b.isVector3||b.isColor?(_.boundary=16,_.storage=12):b.isVector4?(_.boundary=16,_.storage=16):b.isMatrix3?(_.boundary=48,_.storage=48):b.isMatrix4?(_.boundary=64,_.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),_}function g(b){let _=b.target;_.removeEventListener("dispose",g);let y=a.indexOf(_.__bindingPointIndex);a.splice(y,1),r.deleteBuffer(i[_.id]),delete i[_.id],delete s[_.id]}function p(){for(let b in i)r.deleteBuffer(i[b]);a=[],i={},s={}}return{bind:l,update:c,dispose:p}}var Yo=class{constructor(e={}){let{canvas:t=ag(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;let m=new Uint32Array(4),x=new Int32Array(4),g=null,p=null,b=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ct,this.toneMapping=ls,this.toneMappingExposure=1;let y=this,T=!1,S=0,A=0,E=null,v=-1,M=null,C=new xt,U=new xt,k=null,O=new de(0),G=0,H=t.width,ee=t.height,X=1,ie=null,J=null,oe=new xt(0,0,H,ee),xe=new xt(0,0,H,ee),Le=!1,$=new Ns,ce=!1,_e=!1,he=new pe,De=new pe,We=new P,He=new xt,ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Q=!1;function ue(){return E===null?X:1}let D=n;function Ue(R,B){return t.getContext(R,B)}try{let R={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${pu}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",Ae,!1),t.addEventListener("webglcontextcreationerror",Se,!1),D===null){let B="webgl2";if(D=Ue(B,R),D===null)throw Ue(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ae,we,ge,Xe,Ee,I,w,V,Z,ne,j,Ie,ye,Me,Je,le,Ce,qe,Ye,Pe,lt,$e,pt,F;function ve(){ae=new _v(D),ae.init(),$e=new J_(D,ae),we=new pv(D,ae,e,$e),ge=new K_(D,ae),we.reverseDepthBuffer&&d&&ge.buffers.depth.setReversed(!0),Xe=new Ev(D),Ee=new k_,I=new j_(D,ae,ge,Ee,we,$e,Xe),w=new gv(y),V=new vv(y),Z=new Pg(D),pt=new dv(D,Z),ne=new bv(D,Z,Xe,pt),j=new Tv(D,ne,Z,Xe),Ye=new Sv(D,we,I),le=new mv(Ee),Ie=new N_(y,w,V,ae,we,pt,le),ye=new ib(y,Ee),Me=new O_,Je=new W_(ae),qe=new uv(y,w,V,ge,j,f,l),Ce=new Y_(y,j,we),F=new sb(D,Xe,we,ge),Pe=new fv(D,ae,Xe),lt=new Mv(D,ae,Xe),Xe.programs=Ie.programs,y.capabilities=we,y.extensions=ae,y.properties=Ee,y.renderLists=Me,y.shadowMap=Ce,y.state=ge,y.info=Xe}ve();let Y=new Xh(y,D);this.xr=Y,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let R=ae.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=ae.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(R){R!==void 0&&(X=R,this.setSize(H,ee,!1))},this.getSize=function(R){return R.set(H,ee)},this.setSize=function(R,B,W=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=R,ee=B,t.width=Math.floor(R*X),t.height=Math.floor(B*X),W===!0&&(t.style.width=R+"px",t.style.height=B+"px"),this.setViewport(0,0,R,B)},this.getDrawingBufferSize=function(R){return R.set(H*X,ee*X).floor()},this.setDrawingBufferSize=function(R,B,W){H=R,ee=B,X=W,t.width=Math.floor(R*W),t.height=Math.floor(B*W),this.setViewport(0,0,R,B)},this.getCurrentViewport=function(R){return R.copy(C)},this.getViewport=function(R){return R.copy(oe)},this.setViewport=function(R,B,W,q){R.isVector4?oe.set(R.x,R.y,R.z,R.w):oe.set(R,B,W,q),ge.viewport(C.copy(oe).multiplyScalar(X).round())},this.getScissor=function(R){return R.copy(xe)},this.setScissor=function(R,B,W,q){R.isVector4?xe.set(R.x,R.y,R.z,R.w):xe.set(R,B,W,q),ge.scissor(U.copy(xe).multiplyScalar(X).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(R){ge.setScissorTest(Le=R)},this.setOpaqueSort=function(R){ie=R},this.setTransparentSort=function(R){J=R},this.getClearColor=function(R){return R.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor.apply(qe,arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha.apply(qe,arguments)},this.clear=function(R=!0,B=!0,W=!0){let q=0;if(R){let z=!1;if(E!==null){let me=E.texture.format;z=me===Ru||me===Au||me===wu}if(z){let me=E.texture.type,Te=me===di||me===Us||me===ya||me===cs||me===Eu||me===Su,ke=qe.getClearColor(),Fe=qe.getClearAlpha(),Ze=ke.r,et=ke.g,Oe=ke.b;Te?(m[0]=Ze,m[1]=et,m[2]=Oe,m[3]=Fe,D.clearBufferuiv(D.COLOR,0,m)):(x[0]=Ze,x[1]=et,x[2]=Oe,x[3]=Fe,D.clearBufferiv(D.COLOR,0,x))}else q|=D.COLOR_BUFFER_BIT}B&&(q|=D.DEPTH_BUFFER_BIT),W&&(q|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",Ae,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),Me.dispose(),Je.dispose(),Ee.dispose(),w.dispose(),V.dispose(),j.dispose(),pt.dispose(),F.dispose(),Ie.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Nd),Y.removeEventListener("sessionend",kd),Ss.stop()};function te(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Ae(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let R=Xe.autoReset,B=Ce.enabled,W=Ce.autoUpdate,q=Ce.needsUpdate,z=Ce.type;ve(),Xe.autoReset=R,Ce.enabled=B,Ce.autoUpdate=W,Ce.needsUpdate=q,Ce.type=z}function Se(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Qe(R){let B=R.target;B.removeEventListener("dispose",Qe),Zt(B)}function Zt(R){mn(R),Ee.remove(R)}function mn(R){let B=Ee.get(R).programs;B!==void 0&&(B.forEach(function(W){Ie.releaseProgram(W)}),R.isShaderMaterial&&Ie.releaseShaderCache(R))}this.renderBufferDirect=function(R,B,W,q,z,me){B===null&&(B=ot);let Te=z.isMesh&&z.matrixWorld.determinant()<0,ke=o0(R,B,W,q,z);ge.setMaterial(q,Te);let Fe=W.index,Ze=1;if(q.wireframe===!0){if(Fe=ne.getWireframeAttribute(W),Fe===void 0)return;Ze=2}let et=W.drawRange,Oe=W.attributes.position,mt=et.start*Ze,Dt=(et.start+et.count)*Ze;me!==null&&(mt=Math.max(mt,me.start*Ze),Dt=Math.min(Dt,(me.start+me.count)*Ze)),Fe!==null?(mt=Math.max(mt,0),Dt=Math.min(Dt,Fe.count)):Oe!=null&&(mt=Math.max(mt,0),Dt=Math.min(Dt,Oe.count));let kt=Dt-mt;if(kt<0||kt===1/0)return;pt.setup(z,q,ke,W,Fe);let Pn,Et=Pe;if(Fe!==null&&(Pn=Z.get(Fe),Et=lt,Et.setIndex(Pn)),z.isMesh)q.wireframe===!0?(ge.setLineWidth(q.wireframeLinewidth*ue()),Et.setMode(D.LINES)):Et.setMode(D.TRIANGLES);else if(z.isLine){let Be=q.linewidth;Be===void 0&&(Be=1),ge.setLineWidth(Be*ue()),z.isLineSegments?Et.setMode(D.LINES):z.isLineLoop?Et.setMode(D.LINE_LOOP):Et.setMode(D.LINE_STRIP)}else z.isPoints?Et.setMode(D.POINTS):z.isSprite&&Et.setMode(D.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)Et.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(ae.get("WEBGL_multi_draw"))Et.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let Be=z._multiDrawStarts,Ci=z._multiDrawCounts,St=z._multiDrawCount,ai=Fe?Z.get(Fe).bytesPerElement:1,Ks=Ee.get(q).currentProgram.getUniforms();for(let Fn=0;Fn<St;Fn++)Ks.setValue(D,"_gl_DrawID",Fn),Et.render(Be[Fn]/ai,Ci[Fn])}else if(z.isInstancedMesh)Et.renderInstances(mt,kt,z.count);else if(W.isInstancedBufferGeometry){let Be=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Ci=Math.min(W.instanceCount,Be);Et.renderInstances(mt,kt,Ci)}else Et.render(mt,kt)};function wt(R,B,W){R.transparent===!0&&R.side===Rt&&R.forceSinglePass===!1?(R.side=yn,R.needsUpdate=!0,to(R,B,W),R.side=yi,R.needsUpdate=!0,to(R,B,W),R.side=Rt):to(R,B,W)}this.compile=function(R,B,W=null){W===null&&(W=R),p=Je.get(W),p.init(B),_.push(p),W.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),R!==W&&R.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();let q=new Set;return R.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let me=z.material;if(me)if(Array.isArray(me))for(let Te=0;Te<me.length;Te++){let ke=me[Te];wt(ke,W,z),q.add(ke)}else wt(me,W,z),q.add(me)}),_.pop(),p=null,q},this.compileAsync=function(R,B,W=null){let q=this.compile(R,B,W);return new Promise(z=>{function me(){if(q.forEach(function(Te){Ee.get(Te).currentProgram.isReady()&&q.delete(Te)}),q.size===0){z(R);return}setTimeout(me,10)}ae.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let ri=null;function Ri(R){ri&&ri(R)}function Nd(){Ss.stop()}function kd(){Ss.start()}let Ss=new wp;Ss.setAnimationLoop(Ri),typeof self<"u"&&Ss.setContext(self),this.setAnimationLoop=function(R){ri=R,Y.setAnimationLoop(R),R===null?Ss.stop():Ss.start()},Y.addEventListener("sessionstart",Nd),Y.addEventListener("sessionend",kd),this.render=function(R,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(B),B=Y.getCamera()),R.isScene===!0&&R.onBeforeRender(y,R,B,E),p=Je.get(R,_.length),p.init(B),_.push(p),De.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),$.setFromProjectionMatrix(De),_e=this.localClippingEnabled,ce=le.init(this.clippingPlanes,_e),g=Me.get(R,b.length),g.init(),b.push(g),Y.enabled===!0&&Y.isPresenting===!0){let me=y.xr.getDepthSensingMesh();me!==null&&hc(me,B,-1/0,y.sortObjects)}hc(R,B,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(ie,J),Q=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Q&&qe.addToRenderList(g,R),this.info.render.frame++,ce===!0&&le.beginShadows();let W=p.state.shadowsArray;Ce.render(W,R,B),ce===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();let q=g.opaque,z=g.transmissive;if(p.setupLights(),B.isArrayCamera){let me=B.cameras;if(z.length>0)for(let Te=0,ke=me.length;Te<ke;Te++){let Fe=me[Te];Od(q,z,R,Fe)}Q&&qe.render(R);for(let Te=0,ke=me.length;Te<ke;Te++){let Fe=me[Te];Fd(g,R,Fe,Fe.viewport)}}else z.length>0&&Od(q,z,R,B),Q&&qe.render(R),Fd(g,R,B);E!==null&&(I.updateMultisampleRenderTarget(E),I.updateRenderTargetMipmap(E)),R.isScene===!0&&R.onAfterRender(y,R,B),pt.resetDefaultState(),v=-1,M=null,_.pop(),_.length>0?(p=_[_.length-1],ce===!0&&le.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?g=b[b.length-1]:g=null};function hc(R,B,W,q){if(R.visible===!1)return;if(R.layers.test(B.layers)){if(R.isGroup)W=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(B);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||$.intersectsSprite(R)){q&&He.setFromMatrixPosition(R.matrixWorld).applyMatrix4(De);let Te=j.update(R),ke=R.material;ke.visible&&g.push(R,Te,ke,W,He.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||$.intersectsObject(R))){let Te=j.update(R),ke=R.material;if(q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),He.copy(R.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),He.copy(Te.boundingSphere.center)),He.applyMatrix4(R.matrixWorld).applyMatrix4(De)),Array.isArray(ke)){let Fe=Te.groups;for(let Ze=0,et=Fe.length;Ze<et;Ze++){let Oe=Fe[Ze],mt=ke[Oe.materialIndex];mt&&mt.visible&&g.push(R,Te,mt,W,He.z,Oe)}}else ke.visible&&g.push(R,Te,ke,W,He.z,null)}}let me=R.children;for(let Te=0,ke=me.length;Te<ke;Te++)hc(me[Te],B,W,q)}function Fd(R,B,W,q){let z=R.opaque,me=R.transmissive,Te=R.transparent;p.setupLightsView(W),ce===!0&&le.setGlobalState(y.clippingPlanes,W),q&&ge.viewport(C.copy(q)),z.length>0&&eo(z,B,W),me.length>0&&eo(me,B,W),Te.length>0&&eo(Te,B,W),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function Od(R,B,W,q){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new en(1,1,{generateMipmaps:!0,type:ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float")?jt:di,minFilter:ui,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace}));let me=p.state.transmissionRenderTarget[q.id],Te=q.viewport||C;me.setSize(Te.z,Te.w);let ke=y.getRenderTarget();y.setRenderTarget(me),y.getClearColor(O),G=y.getClearAlpha(),G<1&&y.setClearColor(16777215,.5),y.clear(),Q&&qe.render(W);let Fe=y.toneMapping;y.toneMapping=ls;let Ze=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),ce===!0&&le.setGlobalState(y.clippingPlanes,q),eo(R,W,q),I.updateMultisampleRenderTarget(me),I.updateRenderTargetMipmap(me),ae.has("WEBGL_multisampled_render_to_texture")===!1){let et=!1;for(let Oe=0,mt=B.length;Oe<mt;Oe++){let Dt=B[Oe],kt=Dt.object,Pn=Dt.geometry,Et=Dt.material,Be=Dt.group;if(Et.side===Rt&&kt.layers.test(q.layers)){let Ci=Et.side;Et.side=yn,Et.needsUpdate=!0,Hd(kt,W,q,Pn,Et,Be),Et.side=Ci,Et.needsUpdate=!0,et=!0}}et===!0&&(I.updateMultisampleRenderTarget(me),I.updateRenderTargetMipmap(me))}y.setRenderTarget(ke),y.setClearColor(O,G),Ze!==void 0&&(q.viewport=Ze),y.toneMapping=Fe}function eo(R,B,W){let q=B.isScene===!0?B.overrideMaterial:null;for(let z=0,me=R.length;z<me;z++){let Te=R[z],ke=Te.object,Fe=Te.geometry,Ze=q===null?Te.material:q,et=Te.group;ke.layers.test(W.layers)&&Hd(ke,B,W,Fe,Ze,et)}}function Hd(R,B,W,q,z,me){R.onBeforeRender(y,B,W,q,z,me),R.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),z.onBeforeRender(y,B,W,q,R,me),z.transparent===!0&&z.side===Rt&&z.forceSinglePass===!1?(z.side=yn,z.needsUpdate=!0,y.renderBufferDirect(W,B,q,z,R,me),z.side=yi,z.needsUpdate=!0,y.renderBufferDirect(W,B,q,z,R,me),z.side=Rt):y.renderBufferDirect(W,B,q,z,R,me),R.onAfterRender(y,B,W,q,z,me)}function to(R,B,W){B.isScene!==!0&&(B=ot);let q=Ee.get(R),z=p.state.lights,me=p.state.shadowsArray,Te=z.state.version,ke=Ie.getParameters(R,z.state,me,B,W),Fe=Ie.getProgramCacheKey(ke),Ze=q.programs;q.environment=R.isMeshStandardMaterial?B.environment:null,q.fog=B.fog,q.envMap=(R.isMeshStandardMaterial?V:w).get(R.envMap||q.environment),q.envMapRotation=q.environment!==null&&R.envMap===null?B.environmentRotation:R.envMapRotation,Ze===void 0&&(R.addEventListener("dispose",Qe),Ze=new Map,q.programs=Ze);let et=Ze.get(Fe);if(et!==void 0){if(q.currentProgram===et&&q.lightsStateVersion===Te)return zd(R,ke),et}else ke.uniforms=Ie.getUniforms(R),R.onBeforeCompile(ke,y),et=Ie.acquireProgram(ke,Fe),Ze.set(Fe,et),q.uniforms=ke.uniforms;let Oe=q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Oe.clippingPlanes=le.uniform),zd(R,ke),q.needsLights=c0(R),q.lightsStateVersion=Te,q.needsLights&&(Oe.ambientLightColor.value=z.state.ambient,Oe.lightProbe.value=z.state.probe,Oe.directionalLights.value=z.state.directional,Oe.directionalLightShadows.value=z.state.directionalShadow,Oe.spotLights.value=z.state.spot,Oe.spotLightShadows.value=z.state.spotShadow,Oe.rectAreaLights.value=z.state.rectArea,Oe.ltc_1.value=z.state.rectAreaLTC1,Oe.ltc_2.value=z.state.rectAreaLTC2,Oe.pointLights.value=z.state.point,Oe.pointLightShadows.value=z.state.pointShadow,Oe.hemisphereLights.value=z.state.hemi,Oe.directionalShadowMap.value=z.state.directionalShadowMap,Oe.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Oe.spotShadowMap.value=z.state.spotShadowMap,Oe.spotLightMatrix.value=z.state.spotLightMatrix,Oe.spotLightMap.value=z.state.spotLightMap,Oe.pointShadowMap.value=z.state.pointShadowMap,Oe.pointShadowMatrix.value=z.state.pointShadowMatrix),q.currentProgram=et,q.uniformsList=null,et}function Bd(R){if(R.uniformsList===null){let B=R.currentProgram.getUniforms();R.uniformsList=vr.seqWithValue(B.seq,R.uniforms)}return R.uniformsList}function zd(R,B){let W=Ee.get(R);W.outputColorSpace=B.outputColorSpace,W.batching=B.batching,W.batchingColor=B.batchingColor,W.instancing=B.instancing,W.instancingColor=B.instancingColor,W.instancingMorph=B.instancingMorph,W.skinning=B.skinning,W.morphTargets=B.morphTargets,W.morphNormals=B.morphNormals,W.morphColors=B.morphColors,W.morphTargetsCount=B.morphTargetsCount,W.numClippingPlanes=B.numClippingPlanes,W.numIntersection=B.numClipIntersection,W.vertexAlphas=B.vertexAlphas,W.vertexTangents=B.vertexTangents,W.toneMapping=B.toneMapping}function o0(R,B,W,q,z){B.isScene!==!0&&(B=ot),I.resetTextureUnits();let me=B.fog,Te=q.isMeshStandardMaterial?B.environment:null,ke=E===null?y.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:dn,Fe=(q.isMeshStandardMaterial?V:w).get(q.envMap||Te),Ze=q.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,et=!!W.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Oe=!!W.morphAttributes.position,mt=!!W.morphAttributes.normal,Dt=!!W.morphAttributes.color,kt=ls;q.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(kt=y.toneMapping);let Pn=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Et=Pn!==void 0?Pn.length:0,Be=Ee.get(q),Ci=p.state.lights;if(ce===!0&&(_e===!0||R!==M)){let Zn=R===M&&q.id===v;le.setState(q,R,Zn)}let St=!1;q.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==Ci.state.version||Be.outputColorSpace!==ke||z.isBatchedMesh&&Be.batching===!1||!z.isBatchedMesh&&Be.batching===!0||z.isBatchedMesh&&Be.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Be.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Be.instancing===!1||!z.isInstancedMesh&&Be.instancing===!0||z.isSkinnedMesh&&Be.skinning===!1||!z.isSkinnedMesh&&Be.skinning===!0||z.isInstancedMesh&&Be.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Be.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Be.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Be.instancingMorph===!1&&z.morphTexture!==null||Be.envMap!==Fe||q.fog===!0&&Be.fog!==me||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==le.numPlanes||Be.numIntersection!==le.numIntersection)||Be.vertexAlphas!==Ze||Be.vertexTangents!==et||Be.morphTargets!==Oe||Be.morphNormals!==mt||Be.morphColors!==Dt||Be.toneMapping!==kt||Be.morphTargetsCount!==Et)&&(St=!0):(St=!0,Be.__version=q.version);let ai=Be.currentProgram;St===!0&&(ai=to(q,B,z));let Ks=!1,Fn=!1,Jr=!1,Ft=ai.getUniforms(),gi=Be.uniforms;if(ge.useProgram(ai.program)&&(Ks=!0,Fn=!0,Jr=!0),q.id!==v&&(v=q.id,Fn=!0),Ks||M!==R){ge.buffers.depth.getReversed()?(he.copy(R.projectionMatrix),lg(he),cg(he),Ft.setValue(D,"projectionMatrix",he)):Ft.setValue(D,"projectionMatrix",R.projectionMatrix),Ft.setValue(D,"viewMatrix",R.matrixWorldInverse);let Ji=Ft.map.cameraPosition;Ji!==void 0&&Ji.setValue(D,We.setFromMatrixPosition(R.matrixWorld)),we.logarithmicDepthBuffer&&Ft.setValue(D,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Ft.setValue(D,"isOrthographic",R.isOrthographicCamera===!0),M!==R&&(M=R,Fn=!0,Jr=!0)}if(z.isSkinnedMesh){Ft.setOptional(D,z,"bindMatrix"),Ft.setOptional(D,z,"bindMatrixInverse");let Zn=z.skeleton;Zn&&(Zn.boneTexture===null&&Zn.computeBoneTexture(),Ft.setValue(D,"boneTexture",Zn.boneTexture,I))}z.isBatchedMesh&&(Ft.setOptional(D,z,"batchingTexture"),Ft.setValue(D,"batchingTexture",z._matricesTexture,I),Ft.setOptional(D,z,"batchingIdTexture"),Ft.setValue(D,"batchingIdTexture",z._indirectTexture,I),Ft.setOptional(D,z,"batchingColorTexture"),z._colorsTexture!==null&&Ft.setValue(D,"batchingColorTexture",z._colorsTexture,I));let Qr=W.morphAttributes;if((Qr.position!==void 0||Qr.normal!==void 0||Qr.color!==void 0)&&Ye.update(z,W,ai),(Fn||Be.receiveShadow!==z.receiveShadow)&&(Be.receiveShadow=z.receiveShadow,Ft.setValue(D,"receiveShadow",z.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(gi.envMap.value=Fe,gi.flipEnvMap.value=Fe.isCubeTexture&&Fe.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&B.environment!==null&&(gi.envMapIntensity.value=B.environmentIntensity),Fn&&(Ft.setValue(D,"toneMappingExposure",y.toneMappingExposure),Be.needsLights&&l0(gi,Jr),me&&q.fog===!0&&ye.refreshFogUniforms(gi,me),ye.refreshMaterialUniforms(gi,q,X,ee,p.state.transmissionRenderTarget[R.id]),vr.upload(D,Bd(Be),gi,I)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(vr.upload(D,Bd(Be),gi,I),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Ft.setValue(D,"center",z.center),Ft.setValue(D,"modelViewMatrix",z.modelViewMatrix),Ft.setValue(D,"normalMatrix",z.normalMatrix),Ft.setValue(D,"modelMatrix",z.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let Zn=q.uniformsGroups;for(let Ji=0,Qi=Zn.length;Ji<Qi;Ji++){let Vd=Zn[Ji];F.update(Vd,ai),F.bind(Vd,ai)}}return ai}function l0(R,B){R.ambientLightColor.needsUpdate=B,R.lightProbe.needsUpdate=B,R.directionalLights.needsUpdate=B,R.directionalLightShadows.needsUpdate=B,R.pointLights.needsUpdate=B,R.pointLightShadows.needsUpdate=B,R.spotLights.needsUpdate=B,R.spotLightShadows.needsUpdate=B,R.rectAreaLights.needsUpdate=B,R.hemisphereLights.needsUpdate=B}function c0(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(R,B,W){Ee.get(R.texture).__webglTexture=B,Ee.get(R.depthTexture).__webglTexture=W;let q=Ee.get(R);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=W===void 0,q.__autoAllocateDepthBuffer||ae.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,B){let W=Ee.get(R);W.__webglFramebuffer=B,W.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(R,B=0,W=0){E=R,S=B,A=W;let q=!0,z=null,me=!1,Te=!1;if(R){let Fe=Ee.get(R);if(Fe.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(D.FRAMEBUFFER,null),q=!1;else if(Fe.__webglFramebuffer===void 0)I.setupRenderTarget(R);else if(Fe.__hasExternalTextures)I.rebindTextures(R,Ee.get(R.texture).__webglTexture,Ee.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let Oe=R.depthTexture;if(Fe.__boundDepthTexture!==Oe){if(Oe!==null&&Ee.has(Oe)&&(R.width!==Oe.image.width||R.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(R)}}let Ze=R.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(Te=!0);let et=Ee.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(et[B])?z=et[B][W]:z=et[B],me=!0):R.samples>0&&I.useMultisampledRTT(R)===!1?z=Ee.get(R).__webglMultisampledFramebuffer:Array.isArray(et)?z=et[W]:z=et,C.copy(R.viewport),U.copy(R.scissor),k=R.scissorTest}else C.copy(oe).multiplyScalar(X).floor(),U.copy(xe).multiplyScalar(X).floor(),k=Le;if(ge.bindFramebuffer(D.FRAMEBUFFER,z)&&q&&ge.drawBuffers(R,z),ge.viewport(C),ge.scissor(U),ge.setScissorTest(k),me){let Fe=Ee.get(R.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+B,Fe.__webglTexture,W)}else if(Te){let Fe=Ee.get(R.texture),Ze=B||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Fe.__webglTexture,W||0,Ze)}v=-1},this.readRenderTargetPixels=function(R,B,W,q,z,me,Te){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=Ee.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Te!==void 0&&(ke=ke[Te]),ke){ge.bindFramebuffer(D.FRAMEBUFFER,ke);try{let Fe=R.texture,Ze=Fe.format,et=Fe.type;if(!we.textureFormatReadable(Ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!we.textureTypeReadable(et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=R.width-q&&W>=0&&W<=R.height-z&&D.readPixels(B,W,q,z,$e.convert(Ze),$e.convert(et),me)}finally{let Fe=E!==null?Ee.get(E).__webglFramebuffer:null;ge.bindFramebuffer(D.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(R,B,W,q,z,me,Te){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=Ee.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Te!==void 0&&(ke=ke[Te]),ke){let Fe=R.texture,Ze=Fe.format,et=Fe.type;if(!we.textureFormatReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!we.textureTypeReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=R.width-q&&W>=0&&W<=R.height-z){ge.bindFramebuffer(D.FRAMEBUFFER,ke);let Oe=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Oe),D.bufferData(D.PIXEL_PACK_BUFFER,me.byteLength,D.STREAM_READ),D.readPixels(B,W,q,z,$e.convert(Ze),$e.convert(et),0);let mt=E!==null?Ee.get(E).__webglFramebuffer:null;ge.bindFramebuffer(D.FRAMEBUFFER,mt);let Dt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await og(D,Dt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Oe),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,me),D.deleteBuffer(Oe),D.deleteSync(Dt),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,B=null,W=0){R.isTexture!==!0&&(la("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,R=arguments[1]);let q=Math.pow(2,-W),z=Math.floor(R.image.width*q),me=Math.floor(R.image.height*q),Te=B!==null?B.x:0,ke=B!==null?B.y:0;I.setTexture2D(R,0),D.copyTexSubImage2D(D.TEXTURE_2D,W,0,0,Te,ke,z,me),ge.unbindTexture()},this.copyTextureToTexture=function(R,B,W=null,q=null,z=0){R.isTexture!==!0&&(la("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,R=arguments[1],B=arguments[2],z=arguments[3]||0,W=null);let me,Te,ke,Fe,Ze,et,Oe,mt,Dt,kt=R.isCompressedTexture?R.mipmaps[z]:R.image;W!==null?(me=W.max.x-W.min.x,Te=W.max.y-W.min.y,ke=W.isBox3?W.max.z-W.min.z:1,Fe=W.min.x,Ze=W.min.y,et=W.isBox3?W.min.z:0):(me=kt.width,Te=kt.height,ke=kt.depth||1,Fe=0,Ze=0,et=0),q!==null?(Oe=q.x,mt=q.y,Dt=q.z):(Oe=0,mt=0,Dt=0);let Pn=$e.convert(B.format),Et=$e.convert(B.type),Be;B.isData3DTexture?(I.setTexture3D(B,0),Be=D.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(I.setTexture2DArray(B,0),Be=D.TEXTURE_2D_ARRAY):(I.setTexture2D(B,0),Be=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,B.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,B.unpackAlignment);let Ci=D.getParameter(D.UNPACK_ROW_LENGTH),St=D.getParameter(D.UNPACK_IMAGE_HEIGHT),ai=D.getParameter(D.UNPACK_SKIP_PIXELS),Ks=D.getParameter(D.UNPACK_SKIP_ROWS),Fn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,kt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,kt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Fe),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ze),D.pixelStorei(D.UNPACK_SKIP_IMAGES,et);let Jr=R.isDataArrayTexture||R.isData3DTexture,Ft=B.isDataArrayTexture||B.isData3DTexture;if(R.isRenderTargetTexture||R.isDepthTexture){let gi=Ee.get(R),Qr=Ee.get(B),Zn=Ee.get(gi.__renderTarget),Ji=Ee.get(Qr.__renderTarget);ge.bindFramebuffer(D.READ_FRAMEBUFFER,Zn.__webglFramebuffer),ge.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ji.__webglFramebuffer);for(let Qi=0;Qi<ke;Qi++)Jr&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ee.get(R).__webglTexture,z,et+Qi),R.isDepthTexture?(Ft&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ee.get(B).__webglTexture,z,Dt+Qi),D.blitFramebuffer(Fe,Ze,me,Te,Oe,mt,me,Te,D.DEPTH_BUFFER_BIT,D.NEAREST)):Ft?D.copyTexSubImage3D(Be,z,Oe,mt,Dt+Qi,Fe,Ze,me,Te):D.copyTexSubImage2D(Be,z,Oe,mt,Dt+Qi,Fe,Ze,me,Te);ge.bindFramebuffer(D.READ_FRAMEBUFFER,null),ge.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Ft?R.isDataTexture||R.isData3DTexture?D.texSubImage3D(Be,z,Oe,mt,Dt,me,Te,ke,Pn,Et,kt.data):B.isCompressedArrayTexture?D.compressedTexSubImage3D(Be,z,Oe,mt,Dt,me,Te,ke,Pn,kt.data):D.texSubImage3D(Be,z,Oe,mt,Dt,me,Te,ke,Pn,Et,kt):R.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,z,Oe,mt,me,Te,Pn,Et,kt.data):R.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,z,Oe,mt,kt.width,kt.height,Pn,kt.data):D.texSubImage2D(D.TEXTURE_2D,z,Oe,mt,me,Te,Pn,Et,kt);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ci),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,St),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ai),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ks),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Fn),z===0&&B.generateMipmaps&&D.generateMipmap(Be),ge.unbindTexture()},this.copyTextureToTexture3D=function(R,B,W=null,q=null,z=0){return R.isTexture!==!0&&(la("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,q=arguments[1]||null,R=arguments[2],B=arguments[3],z=arguments[4]||0),la('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,B,W,q,z)},this.initRenderTarget=function(R){Ee.get(R).__webglFramebuffer===void 0&&I.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?I.setTextureCube(R,0):R.isData3DTexture?I.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?I.setTexture2DArray(R,0):I.setTexture2D(R,0),ge.unbindTexture()},this.resetState=function(){S=0,A=0,E=null,ge.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=rt._getUnpackColorSpace()}};var $o=class r{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new de(e),this.near=t,this.far=n}clone(){return new r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ko=class extends Yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zt,this.environmentIntensity=1,this.environmentRotation=new zt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},_a=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ch,this.updateRanges=[],this.version=0,this.uuid=Qn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},En=new P,ba=class r{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)En.fromBufferAttribute(this,t),En.applyMatrix4(e),this.setXYZ(t,En.x,En.y,En.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)En.fromBufferAttribute(this,t),En.applyNormalMatrix(e),this.setXYZ(t,En.x,En.y,En.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)En.fromBufferAttribute(this,t),En.transformDirection(e),this.setXYZ(t,En.x,En.y,En.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=hi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=At(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=At(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=At(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=At(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=At(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=hi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=hi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=hi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=hi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=At(t,this.array),n=At(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=At(t,this.array),n=At(n,this.array),i=At(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=At(t,this.array),n=At(n,this.array),i=At(i,this.array),s=At(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new r(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var zf=new P,Vf=new xt,Gf=new xt,rb=new P,Wf=new pe,Eo=new P,Oc=new wn,Xf=new pe,Hc=new wr,Zo=class extends Ne{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=qd,this.bindMatrix=new pe,this.bindMatrixInverse=new pe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new vn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Eo),this.boundingBox.expandByPoint(Eo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new wn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Eo),this.boundingSphere.expandByPoint(Eo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Oc.copy(this.boundingSphere),Oc.applyMatrix4(i),e.ray.intersectsSphere(Oc)!==!1&&(Xf.copy(i).invert(),Hc.copy(e.ray).applyMatrix4(Xf),!(this.boundingBox!==null&&Hc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Hc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new xt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===qd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===I0?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Vf.fromBufferAttribute(i.attributes.skinIndex,e),Gf.fromBufferAttribute(i.attributes.skinWeight,e),zf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=Gf.getComponent(s);if(a!==0){let o=Vf.getComponent(s);Wf.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(rb.copy(zf).applyMatrix4(Wf),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Ma=class extends Yt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Vi=class extends un{constructor(e=null,t=1,n=1,i,s,a,o,l,c=rn,h=rn,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},qf=new pe,ab=new pe,jo=class r{constructor(e=[],t=[]){this.uuid=Qn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new pe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new pe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:ab;qf.multiplyMatrices(o,t[s]),qf.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Vi(t,e,e,In,Tn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Ma),this.bones.push(a),this.boneInverses.push(new pe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},ks=class extends Ct{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},hr=new pe,Yf=new pe,So=[],$f=new vn,ob=new pe,sa=new Ne,ra=new wn,Ut=class extends Ne{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ks(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ob)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new vn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hr),$f.copy(e.boundingBox).applyMatrix4(hr),this.boundingBox.union($f)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new wn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hr),ra.copy(e.boundingSphere).applyMatrix4(hr),this.boundingSphere.union(ra)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(sa.geometry=this.geometry,sa.material=this.material,sa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ra.copy(this.boundingSphere),ra.applyMatrix4(n),e.ray.intersectsSphere(ra)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,hr),Yf.multiplyMatrices(n,hr),sa.matrixWorld=Yf,sa.raycast(e,So);for(let a=0,o=So.length;a<o;a++){let l=So[a];l.instanceId=s,l.object=this,t.push(l)}So.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ks(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Vi(new Float32Array(i*this.count),i,this.count,Tu,Tn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Ea=class extends Ln{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new de(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Jo=new P,Qo=new P,Kf=new pe,aa=new wr,To=new wn,Bc=new P,Zf=new P,Pr=class extends Yt{constructor(e=new Pt,t=new Ea){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Jo.fromBufferAttribute(t,i-1),Qo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Jo.distanceTo(Qo);e.setAttribute("lineDistance",new je(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),To.copy(n.boundingSphere),To.applyMatrix4(i),To.radius+=s,e.ray.intersectsSphere(To)===!1)return;Kf.copy(i).invert(),aa.copy(e.ray).applyMatrix4(Kf);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let x=f,g=m-1;x<g;x+=c){let p=h.getX(x),b=h.getX(x+1),_=wo(this,e,aa,l,p,b);_&&t.push(_)}if(this.isLineLoop){let x=h.getX(m-1),g=h.getX(f),p=wo(this,e,aa,l,x,g);p&&t.push(p)}}else{let f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let x=f,g=m-1;x<g;x+=c){let p=wo(this,e,aa,l,x,x+1);p&&t.push(p)}if(this.isLineLoop){let x=wo(this,e,aa,l,m-1,f);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function wo(r,e,t,n,i,s){let a=r.geometry.attributes.position;if(Jo.fromBufferAttribute(a,i),Qo.fromBufferAttribute(a,s),t.distanceSqToSegment(Jo,Qo,Bc,Zf)>n)return;Bc.applyMatrix4(r.matrixWorld);let l=e.ray.origin.distanceTo(Bc);if(!(l<e.near||l>e.far))return{distance:l,point:Zf.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}var jf=new P,Jf=new P,el=class extends Pr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)jf.fromBufferAttribute(t,i),Jf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+jf.distanceTo(Jf);e.setAttribute("lineDistance",new je(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},tl=class extends Pr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Sa=class extends Ln{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new de(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Qf=new pe,qh=new wr,Ao=new wn,Ro=new P,Ir=class extends Yt{constructor(e=new Pt,t=new Sa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ao.copy(n.boundingSphere),Ao.applyMatrix4(i),Ao.radius+=s,e.ray.intersectsSphere(Ao)===!1)return;Qf.copy(i).invert(),qh.copy(e.ray).applyMatrix4(Qf);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,x=f;m<x;m++){let g=c.getX(m);Ro.fromBufferAttribute(u,g),ep(Ro,g,l,i,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let m=d,x=f;m<x;m++)Ro.fromBufferAttribute(u,m),ep(Ro,m,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function ep(r,e,t,n,i,s,a){let o=qh.distanceSqToPoint(r);if(o<t){let l=new P;qh.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ln=class extends un{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ei=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);let h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new se:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new P,i=[],s=[],a=[],o=new P,l=new pe;for(let f=0;f<=e;f++){let m=f/e;i[f]=this.getTangentAt(m,new P)}s[0]=new P,a[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(tn(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(tn(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ta=class extends ei{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new se){let n=t,i=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Yh=class extends Ta{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Nu(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(s){let a=s*s,o=a*s;return r+e*s+t*a+n*o}}}var Co=new P,zc=new Nu,Vc=new Nu,Gc=new Nu,$h=class extends ei{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new P){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%s]:(Co.subVectors(i[0],i[1]).add(i[0]),c=Co);let u=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:(Co.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Co),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),zc.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,x,g),Vc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,x,g),Gc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(zc.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Vc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Gc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(zc.calc(l),Vc.calc(l),Gc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new P().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function tp(r,e,t,n,i){let s=(n-e)*.5,a=(i-t)*.5,o=r*r,l=r*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*r+t}function lb(r,e){let t=1-r;return t*t*e}function cb(r,e){return 2*(1-r)*r*e}function hb(r,e){return r*r*e}function pa(r,e,t,n){return lb(r,e)+cb(r,t)+hb(r,n)}function ub(r,e){let t=1-r;return t*t*t*e}function db(r,e){let t=1-r;return 3*t*t*r*e}function fb(r,e){return 3*(1-r)*r*r*e}function pb(r,e){return r*r*r*e}function ma(r,e,t,n,i){return ub(r,e)+db(r,t)+fb(r,n)+pb(r,i)}var nl=class extends ei{constructor(e=new se,t=new se,n=new se,i=new se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new se){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ma(e,i.x,s.x,a.x,o.x),ma(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Kh=class extends ei{constructor(e=new P,t=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new P){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ma(e,i.x,s.x,a.x,o.x),ma(e,i.y,s.y,a.y,o.y),ma(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},il=class extends ei{constructor(e=new se,t=new se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new se){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zh=class extends ei{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},sl=class extends ei{constructor(e=new se,t=new se,n=new se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new se){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(pa(e,i.x,s.x,a.x),pa(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},jh=class extends ei{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(pa(e,i.x,s.x,a.x),pa(e,i.y,s.y,a.y),pa(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},rl=class extends ei{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new se){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(tp(o,l.x,c.x,h.x,u.x),tp(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new se().fromArray(i))}return this}},Jh=Object.freeze({__proto__:null,ArcCurve:Yh,CatmullRomCurve3:$h,CubicBezierCurve:nl,CubicBezierCurve3:Kh,EllipseCurve:Ta,LineCurve:il,LineCurve3:Zh,QuadraticBezierCurve:sl,QuadraticBezierCurve3:jh,SplineCurve:rl}),Qh=class extends ei{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Jh[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Jh[i.type]().fromJSON(i))}return this}},al=class extends Qh{constructor(e){super(),this.type="Path",this.currentPoint=new se,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new il(this.currentPoint.clone(),new se(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new sl(this.currentPoint.clone(),new se(e,t),new se(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new nl(this.currentPoint.clone(),new se(e,t),new se(n,i),new se(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new rl(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){let c=new Ta(e,t,n,i,s,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}};var fi=class r extends Pt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new P,h=new se;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new je(a,3)),this.setAttribute("normal",new je(o,3)),this.setAttribute("uv",new je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},dt=class r extends Pt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],f=[],m=0,x=[],g=n/2,p=0;b(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new je(u,3)),this.setAttribute("normal",new je(d,3)),this.setAttribute("uv",new je(f,2));function b(){let y=new P,T=new P,S=0,A=(t-e)/n;for(let E=0;E<=s;E++){let v=[],M=E/s,C=M*(t-e)+e;for(let U=0;U<=i;U++){let k=U/i,O=k*l+o,G=Math.sin(O),H=Math.cos(O);T.x=C*G,T.y=-M*n+g,T.z=C*H,u.push(T.x,T.y,T.z),y.set(G,A,H).normalize(),d.push(y.x,y.y,y.z),f.push(k,1-M),v.push(m++)}x.push(v)}for(let E=0;E<i;E++)for(let v=0;v<s;v++){let M=x[v][E],C=x[v+1][E],U=x[v+1][E+1],k=x[v][E+1];(e>0||v!==0)&&(h.push(M,C,k),S+=3),(t>0||v!==s-1)&&(h.push(C,U,k),S+=3)}c.addGroup(p,S,0),p+=S}function _(y){let T=m,S=new se,A=new P,E=0,v=y===!0?e:t,M=y===!0?1:-1;for(let U=1;U<=i;U++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),m++;let C=m;for(let U=0;U<=i;U++){let O=U/i*l+o,G=Math.cos(O),H=Math.sin(O);A.x=v*H,A.y=g*M,A.z=v*G,u.push(A.x,A.y,A.z),d.push(0,M,0),S.x=G*.5+.5,S.y=H*.5*M+.5,f.push(S.x,S.y),m++}for(let U=0;U<i;U++){let k=T+U,O=C+U;y===!0?h.push(O,O+1,k):h.push(O+1,O,k),E+=3}c.addGroup(p,E,y===!0?1:2),p+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ds=class r extends dt{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ol=class r extends Pt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];o(i),c(n),h(),this.setAttribute("position",new je(s,3)),this.setAttribute("normal",new je(s.slice(),3)),this.setAttribute("uv",new je(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(b){let _=new P,y=new P,T=new P;for(let S=0;S<t.length;S+=3)f(t[S+0],_),f(t[S+1],y),f(t[S+2],T),l(_,y,T,b)}function l(b,_,y,T){let S=T+1,A=[];for(let E=0;E<=S;E++){A[E]=[];let v=b.clone().lerp(y,E/S),M=_.clone().lerp(y,E/S),C=S-E;for(let U=0;U<=C;U++)U===0&&E===S?A[E][U]=v:A[E][U]=v.clone().lerp(M,U/C)}for(let E=0;E<S;E++)for(let v=0;v<2*(S-E)-1;v++){let M=Math.floor(v/2);v%2===0?(d(A[E][M+1]),d(A[E+1][M]),d(A[E][M])):(d(A[E][M+1]),d(A[E+1][M+1]),d(A[E+1][M]))}}function c(b){let _=new P;for(let y=0;y<s.length;y+=3)_.x=s[y+0],_.y=s[y+1],_.z=s[y+2],_.normalize().multiplyScalar(b),s[y+0]=_.x,s[y+1]=_.y,s[y+2]=_.z}function h(){let b=new P;for(let _=0;_<s.length;_+=3){b.x=s[_+0],b.y=s[_+1],b.z=s[_+2];let y=g(b)/2/Math.PI+.5,T=p(b)/Math.PI+.5;a.push(y,1-T)}m(),u()}function u(){for(let b=0;b<a.length;b+=6){let _=a[b+0],y=a[b+2],T=a[b+4],S=Math.max(_,y,T),A=Math.min(_,y,T);S>.9&&A<.1&&(_<.2&&(a[b+0]+=1),y<.2&&(a[b+2]+=1),T<.2&&(a[b+4]+=1))}}function d(b){s.push(b.x,b.y,b.z)}function f(b,_){let y=b*3;_.x=e[y+0],_.y=e[y+1],_.z=e[y+2]}function m(){let b=new P,_=new P,y=new P,T=new P,S=new se,A=new se,E=new se;for(let v=0,M=0;v<s.length;v+=9,M+=6){b.set(s[v+0],s[v+1],s[v+2]),_.set(s[v+3],s[v+4],s[v+5]),y.set(s[v+6],s[v+7],s[v+8]),S.set(a[M+0],a[M+1]),A.set(a[M+2],a[M+3]),E.set(a[M+4],a[M+5]),T.copy(b).add(_).add(y).divideScalar(3);let C=g(T);x(S,M+0,b,C),x(A,M+2,_,C),x(E,M+4,y,C)}}function x(b,_,y,T){T<0&&b.x===1&&(a[_]=b.x-1),y.x===0&&y.z===0&&(a[_]=T/2/Math.PI+.5)}function g(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}};var Fs=class extends al{constructor(e){super(e),this.uuid=Qn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new al().fromJSON(i))}return this}},mb={triangulate:function(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=Ip(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c,h,u,d,f;if(n&&(s=_b(r,e,s,t)),r.length>80*t){o=c=r[0],l=h=r[1];for(let m=t;m<i;m+=t)u=r[m],d=r[m+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return wa(s,a,t,o,l,f,0),a}};function Ip(r,e,t,n,i){let s,a;if(i===Ib(r,e,t,n)>0)for(s=e;s<t;s+=n)a=np(s,r[s],r[s+1],a);else for(s=t-n;s>=e;s-=n)a=np(s,r[s],r[s+1],a);return a&&wl(a,a.next)&&(Ra(a),a=a.next),a}function Os(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(wl(t,t.next)||Xt(t.prev,t,t.next)===0)){if(Ra(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function wa(r,e,t,n,i,s,a){if(!r)return;!a&&s&&Tb(r,n,i,s);let o=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?xb(r,n,i,s):gb(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(c.i/t|0),Ra(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=yb(Os(r),e,t),wa(r,e,t,n,i,s,2)):a===2&&vb(r,e,t,n,i,s):wa(Os(r),e,t,n,i,s,1);break}}}function gb(r){let e=r.prev,t=r,n=r.next;if(Xt(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=i<s?i<a?i:a:s<a?s:a,u=o<l?o<c?o:c:l<c?l:c,d=i>s?i>a?i:a:s>a?s:a,f=o>l?o>c?o:c:l>c?l:c,m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&mr(i,o,s,l,a,c,m.x,m.y)&&Xt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function xb(r,e,t,n){let i=r.prev,s=r,a=r.next;if(Xt(i,s,a)>=0)return!1;let o=i.x,l=s.x,c=a.x,h=i.y,u=s.y,d=a.y,f=o<l?o<c?o:c:l<c?l:c,m=h<u?h<d?h:d:u<d?u:d,x=o>l?o>c?o:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,p=eu(f,m,e,t,n),b=eu(x,g,e,t,n),_=r.prevZ,y=r.nextZ;for(;_&&_.z>=p&&y&&y.z<=b;){if(_.x>=f&&_.x<=x&&_.y>=m&&_.y<=g&&_!==i&&_!==a&&mr(o,h,l,u,c,d,_.x,_.y)&&Xt(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=f&&y.x<=x&&y.y>=m&&y.y<=g&&y!==i&&y!==a&&mr(o,h,l,u,c,d,y.x,y.y)&&Xt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=x&&_.y>=m&&_.y<=g&&_!==i&&_!==a&&mr(o,h,l,u,c,d,_.x,_.y)&&Xt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=b;){if(y.x>=f&&y.x<=x&&y.y>=m&&y.y<=g&&y!==i&&y!==a&&mr(o,h,l,u,c,d,y.x,y.y)&&Xt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function yb(r,e,t){let n=r;do{let i=n.prev,s=n.next.next;!wl(i,s)&&Lp(i,n,n.next,s)&&Aa(i,s)&&Aa(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Ra(n),Ra(n.next),n=r=s),n=n.next}while(n!==r);return Os(n)}function vb(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Rb(a,o)){let l=Dp(a,o);a=Os(a,a.next),l=Os(l,l.next),wa(a,e,t,n,i,s,0),wa(l,e,t,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function _b(r,e,t,n){let i=[],s,a,o,l,c;for(s=0,a=e.length;s<a;s++)o=e[s]*n,l=s<a-1?e[s+1]*n:r.length,c=Ip(r,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Ab(c));for(i.sort(bb),s=0;s<i.length;s++)t=Mb(i[s],t);return t}function bb(r,e){return r.x-e.x}function Mb(r,e){let t=Eb(r,e);if(!t)return e;let n=Dp(t,r);return Os(n,n.next),Os(t,t.next)}function Eb(r,e){let t=e,n=-1/0,i,s=r.x,a=r.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){let d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=s&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===s))return i}t=t.next}while(t!==e);if(!i)return null;let o=i,l=i.x,c=i.y,h=1/0,u;t=i;do s>=t.x&&t.x>=l&&s!==t.x&&mr(a<c?s:n,a,l,c,a<c?n:s,a,t.x,t.y)&&(u=Math.abs(a-t.y)/(s-t.x),Aa(t,r)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&Sb(i,t)))&&(i=t,h=u)),t=t.next;while(t!==o);return i}function Sb(r,e){return Xt(r.prev,r,e.prev)<0&&Xt(e.next,r,r.next)<0}function Tb(r,e,t,n){let i=r;do i.z===0&&(i.z=eu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,wb(i)}function wb(r){let e,t,n,i,s,a,o,l,c=1;do{for(t=r,r=null,s=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,o--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;t=n}s.nextZ=null,c*=2}while(a>1);return r}function eu(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Ab(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function mr(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Rb(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Cb(r,e)&&(Aa(r,e)&&Aa(e,r)&&Pb(r,e)&&(Xt(r.prev,r,e.prev)||Xt(r,e.prev,e))||wl(r,e)&&Xt(r.prev,r,r.next)>0&&Xt(e.prev,e,e.next)>0)}function Xt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function wl(r,e){return r.x===e.x&&r.y===e.y}function Lp(r,e,t,n){let i=Io(Xt(r,e,t)),s=Io(Xt(r,e,n)),a=Io(Xt(t,n,r)),o=Io(Xt(t,n,e));return!!(i!==s&&a!==o||i===0&&Po(r,t,e)||s===0&&Po(r,n,e)||a===0&&Po(t,r,n)||o===0&&Po(t,e,n))}function Po(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Io(r){return r>0?1:r<0?-1:0}function Cb(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Lp(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function Aa(r,e){return Xt(r.prev,r,r.next)<0?Xt(r,e,r.next)>=0&&Xt(r,r.prev,e)>=0:Xt(r,e,r.prev)<0||Xt(r,r.next,e)<0}function Pb(r,e){let t=r,n=!1,i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Dp(r,e){let t=new tu(r.i,r.x,r.y),n=new tu(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function np(r,e,t,n){let i=new tu(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ra(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function tu(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Ib(r,e,t,n){let i=0;for(let s=e,a=t-n;s<t;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}var ga=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];ip(e),sp(n,e);let a=e.length;t.forEach(ip);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,sp(n,t[l]);let o=mb.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function ip(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function sp(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Lr=class r extends Pt{constructor(e=new Fs([new se(.5,.5),new se(-.5,.5),new se(-.5,-.5),new se(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new je(i,3)),this.setAttribute("uv",new je(s,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:Lb,_,y=!1,T,S,A,E;p&&(_=p.getSpacedPoints(h),y=!0,d=!1,T=p.computeFrenetFrames(h,!1),S=new P,A=new P,E=new P),d||(g=0,f=0,m=0,x=0);let v=o.extractPoints(c),M=v.shape,C=v.holes;if(!ga.isClockWise(M)){M=M.reverse();for(let Q=0,ue=C.length;Q<ue;Q++){let D=C[Q];ga.isClockWise(D)&&(C[Q]=D.reverse())}}let k=ga.triangulateShape(M,C),O=M;for(let Q=0,ue=C.length;Q<ue;Q++){let D=C[Q];M=M.concat(D)}function G(Q,ue,D){return ue||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(ue,D)}let H=M.length,ee=k.length;function X(Q,ue,D){let Ue,ae,we,ge=Q.x-ue.x,Xe=Q.y-ue.y,Ee=D.x-Q.x,I=D.y-Q.y,w=ge*ge+Xe*Xe,V=ge*I-Xe*Ee;if(Math.abs(V)>Number.EPSILON){let Z=Math.sqrt(w),ne=Math.sqrt(Ee*Ee+I*I),j=ue.x-Xe/Z,Ie=ue.y+ge/Z,ye=D.x-I/ne,Me=D.y+Ee/ne,Je=((ye-j)*I-(Me-Ie)*Ee)/(ge*I-Xe*Ee);Ue=j+ge*Je-Q.x,ae=Ie+Xe*Je-Q.y;let le=Ue*Ue+ae*ae;if(le<=2)return new se(Ue,ae);we=Math.sqrt(le/2)}else{let Z=!1;ge>Number.EPSILON?Ee>Number.EPSILON&&(Z=!0):ge<-Number.EPSILON?Ee<-Number.EPSILON&&(Z=!0):Math.sign(Xe)===Math.sign(I)&&(Z=!0),Z?(Ue=-Xe,ae=ge,we=Math.sqrt(w)):(Ue=ge,ae=Xe,we=Math.sqrt(w/2))}return new se(Ue/we,ae/we)}let ie=[];for(let Q=0,ue=O.length,D=ue-1,Ue=Q+1;Q<ue;Q++,D++,Ue++)D===ue&&(D=0),Ue===ue&&(Ue=0),ie[Q]=X(O[Q],O[D],O[Ue]);let J=[],oe,xe=ie.concat();for(let Q=0,ue=C.length;Q<ue;Q++){let D=C[Q];oe=[];for(let Ue=0,ae=D.length,we=ae-1,ge=Ue+1;Ue<ae;Ue++,we++,ge++)we===ae&&(we=0),ge===ae&&(ge=0),oe[Ue]=X(D[Ue],D[we],D[ge]);J.push(oe),xe=xe.concat(oe)}for(let Q=0;Q<g;Q++){let ue=Q/g,D=f*Math.cos(ue*Math.PI/2),Ue=m*Math.sin(ue*Math.PI/2)+x;for(let ae=0,we=O.length;ae<we;ae++){let ge=G(O[ae],ie[ae],Ue);he(ge.x,ge.y,-D)}for(let ae=0,we=C.length;ae<we;ae++){let ge=C[ae];oe=J[ae];for(let Xe=0,Ee=ge.length;Xe<Ee;Xe++){let I=G(ge[Xe],oe[Xe],Ue);he(I.x,I.y,-D)}}}let Le=m+x;for(let Q=0;Q<H;Q++){let ue=d?G(M[Q],xe[Q],Le):M[Q];y?(A.copy(T.normals[0]).multiplyScalar(ue.x),S.copy(T.binormals[0]).multiplyScalar(ue.y),E.copy(_[0]).add(A).add(S),he(E.x,E.y,E.z)):he(ue.x,ue.y,0)}for(let Q=1;Q<=h;Q++)for(let ue=0;ue<H;ue++){let D=d?G(M[ue],xe[ue],Le):M[ue];y?(A.copy(T.normals[Q]).multiplyScalar(D.x),S.copy(T.binormals[Q]).multiplyScalar(D.y),E.copy(_[Q]).add(A).add(S),he(E.x,E.y,E.z)):he(D.x,D.y,u/h*Q)}for(let Q=g-1;Q>=0;Q--){let ue=Q/g,D=f*Math.cos(ue*Math.PI/2),Ue=m*Math.sin(ue*Math.PI/2)+x;for(let ae=0,we=O.length;ae<we;ae++){let ge=G(O[ae],ie[ae],Ue);he(ge.x,ge.y,u+D)}for(let ae=0,we=C.length;ae<we;ae++){let ge=C[ae];oe=J[ae];for(let Xe=0,Ee=ge.length;Xe<Ee;Xe++){let I=G(ge[Xe],oe[Xe],Ue);y?he(I.x,I.y+_[h-1].y,_[h-1].x+D):he(I.x,I.y,u+D)}}}$(),ce();function $(){let Q=i.length/3;if(d){let ue=0,D=H*ue;for(let Ue=0;Ue<ee;Ue++){let ae=k[Ue];De(ae[2]+D,ae[1]+D,ae[0]+D)}ue=h+g*2,D=H*ue;for(let Ue=0;Ue<ee;Ue++){let ae=k[Ue];De(ae[0]+D,ae[1]+D,ae[2]+D)}}else{for(let ue=0;ue<ee;ue++){let D=k[ue];De(D[2],D[1],D[0])}for(let ue=0;ue<ee;ue++){let D=k[ue];De(D[0]+H*h,D[1]+H*h,D[2]+H*h)}}n.addGroup(Q,i.length/3-Q,0)}function ce(){let Q=i.length/3,ue=0;_e(O,ue),ue+=O.length;for(let D=0,Ue=C.length;D<Ue;D++){let ae=C[D];_e(ae,ue),ue+=ae.length}n.addGroup(Q,i.length/3-Q,1)}function _e(Q,ue){let D=Q.length;for(;--D>=0;){let Ue=D,ae=D-1;ae<0&&(ae=Q.length-1);for(let we=0,ge=h+g*2;we<ge;we++){let Xe=H*we,Ee=H*(we+1),I=ue+Ue+Xe,w=ue+ae+Xe,V=ue+ae+Ee,Z=ue+Ue+Ee;We(I,w,V,Z)}}}function he(Q,ue,D){l.push(Q),l.push(ue),l.push(D)}function De(Q,ue,D){He(Q),He(ue),He(D);let Ue=i.length/3,ae=b.generateTopUV(n,i,Ue-3,Ue-2,Ue-1);ot(ae[0]),ot(ae[1]),ot(ae[2])}function We(Q,ue,D,Ue){He(Q),He(ue),He(Ue),He(ue),He(D),He(Ue);let ae=i.length/3,we=b.generateSideWallUV(n,i,ae-6,ae-3,ae-2,ae-1);ot(we[0]),ot(we[1]),ot(we[3]),ot(we[1]),ot(we[2]),ot(we[3])}function He(Q){i.push(l[Q*3+0]),i.push(l[Q*3+1]),i.push(l[Q*3+2])}function ot(Q){s.push(Q.x),s.push(Q.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Db(t,n,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Jh[i.type]().fromJSON(i)),new r(n,e.options)}},Lb={generateTopUV:function(r,e,t,n,i){let s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new se(s,a),new se(o,l),new se(c,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],m=e[i*3+2],x=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new se(a,1-l),new se(c,1-u),new se(d,1-m),new se(x,1-p)]:[new se(o,1-l),new se(h,1-u),new se(f,1-m),new se(g,1-p)]}};function Db(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){let s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var fn=class r extends ol{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Dr=class r extends ol{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Gi=class r extends Pt{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],h=[],u=e,d=(t-e)/i,f=new P,m=new se;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){let p=s+g/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,h.push(m.x,m.y)}u+=d}for(let x=0;x<i;x++){let g=x*(n+1);for(let p=0;p<n;p++){let b=p+g,_=b,y=b+n+1,T=b+n+2,S=b+1;o.push(_,y,S),o.push(y,T,S)}}this.setIndex(o),this.setAttribute("position",new je(l,3)),this.setAttribute("normal",new je(c,3)),this.setAttribute("uv",new je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var It=class r extends Pt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new P,d=new P,f=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){let b=[],_=p/n,y=0;p===0&&a===0?y=.5/t:p===n&&l===Math.PI&&(y=-.5/t);for(let T=0;T<=t;T++){let S=T/t;u.x=-e*Math.cos(i+S*s)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(i+S*s)*Math.sin(a+_*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),g.push(S+y,1-_),b.push(c++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){let _=h[p][b+1],y=h[p][b],T=h[p+1][b],S=h[p+1][b+1];(p!==0||a>0)&&f.push(_,y,S),(p!==n-1||l<Math.PI)&&f.push(y,T,S)}this.setIndex(f),this.setAttribute("position",new je(m,3)),this.setAttribute("normal",new je(x,3)),this.setAttribute("uv",new je(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var _n=class r extends Pt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],h=new P,u=new P,d=new P;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){let x=m/i*s,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(x),u.y=(e+t*Math.cos(g))*Math.sin(x),u.z=t*Math.sin(g),o.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){let x=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,b=(i+1)*f+m;a.push(x,g,b),a.push(g,p,b)}this.setIndex(a),this.setAttribute("position",new je(o,3)),this.setAttribute("normal",new je(l,3)),this.setAttribute("uv",new je(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var ll=class extends _t{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}},ze=class extends Ln{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new de(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lu,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Vn=class extends ze{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return tn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new de(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new de(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new de(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var cl=class extends Ln{static get type(){return"MeshNormalMaterial"}constructor(e){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lu,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}};function Lo(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Ub(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Nb(r){function e(i,s){return r[i]-r[s]}let t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function rp(r,e,t){let n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){let o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function Up(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}var fs=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},nu=class extends fs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:dr,endingEnd:dr}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case fr:s=e,o=2*t-n;break;case Oo:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case fr:a=e,l=2*n-t;break;case Oo:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),x=m*m,g=x*m,p=-d*g+2*d*x-d*m,b=(1+d)*g+(-1.5-2*d)*x+(-.5+d)*m+1,_=(-1-f)*g+(1.5+f)*x+.5*m,y=f*g-f*x;for(let T=0;T!==o;++T)s[T]=p*a[h+T]+b*a[c+T]+_*a[l+T]+y*a[u+T];return s}},hl=class extends fs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}},iu=class extends fs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},ti=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Lo(t,this.TimeBufferType),this.values=Lo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Lo(e.times,Array),values:Lo(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new iu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new hl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new nu(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Er:t=this.InterpolantFactoryMethodDiscrete;break;case Sr:t=this.InterpolantFactoryMethodLinear;break;case uc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Er;case this.InterpolantFactoryMethodLinear:return Sr;case this.InterpolantFactoryMethodSmooth:return uc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&Ub(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===uc,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{let u=o*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let x=t[u+m];if(x!==t[d+m]||x!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};ti.prototype.TimeBufferType=Float32Array;ti.prototype.ValueBufferType=Float32Array;ti.prototype.DefaultInterpolation=Sr;var ps=class extends ti{constructor(e,t,n){super(e,t,n)}};ps.prototype.ValueTypeName="bool";ps.prototype.ValueBufferType=Array;ps.prototype.DefaultInterpolation=Er;ps.prototype.InterpolantFactoryMethodLinear=void 0;ps.prototype.InterpolantFactoryMethodSmooth=void 0;var ul=class extends ti{};ul.prototype.ValueTypeName="color";var Wi=class extends ti{};Wi.prototype.ValueTypeName="number";var su=class extends fs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)yt.slerpFlat(s,0,a,c-o,a,c,l);return s}},Xi=class extends ti{InterpolantFactoryMethodLinear(e){return new su(this.times,this.values,this.getValueSize(),e)}};Xi.prototype.ValueTypeName="quaternion";Xi.prototype.InterpolantFactoryMethodSmooth=void 0;var ms=class extends ti{constructor(e,t,n){super(e,t,n)}};ms.prototype.ValueTypeName="string";ms.prototype.ValueBufferType=Array;ms.prototype.DefaultInterpolation=Er;ms.prototype.InterpolantFactoryMethodLinear=void 0;ms.prototype.InterpolantFactoryMethodSmooth=void 0;var qi=class extends ti{};qi.prototype.ValueTypeName="vector";var Ur=class{constructor(e="",t=-1,n=[],i=Iu){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Qn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Fb(n[a]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(ti.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);let h=Nb(l);l=rp(l,1,h),c=rp(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new Wi(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(s);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,f,m,x){if(f.length!==0){let g=[],p=[];Up(f,g,p,m),g.length!==0&&x.push(new u(d,g,p))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let u=0;u<c.length;u++){let d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let x=0;x<d[m].morphTargets.length;x++)f[d[m].morphTargets[x]]=-1;for(let x in f){let g=[],p=[];for(let b=0;b!==d[m].morphTargets.length;++b){let _=d[m];g.push(_.time),p.push(_.morphTarget===x?1:0)}i.push(new Wi(".morphTargetInfluence["+x+"]",g,p))}l=f.length*a}else{let f=".bones["+t[u].name+"]";n(qi,f+".position",d,"pos",i),n(Xi,f+".quaternion",d,"rot",i),n(qi,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function kb(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Wi;case"vector":case"vector2":case"vector3":case"vector4":return qi;case"color":return ul;case"quaternion":return Xi;case"bool":case"boolean":return ps;case"string":return ms}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Fb(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=kb(r.type);if(r.times===void 0){let t=[],n=[];Up(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}var os={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},ru=class{constructor(e,t,n){let i=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}},Ob=new ru,vi=class{constructor(e){this.manager=e!==void 0?e:Ob,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};vi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ni={},au=class extends Error{constructor(e,t){super(e),this.response=t}},Nr=class extends vi{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=os.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Ni[e]!==void 0){Ni[e].push({onLoad:t,onProgress:n,onError:i});return}Ni[e]=[],Ni[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Ni[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0,x=0,g=new ReadableStream({start(p){b();function b(){u.read().then(({done:_,value:y})=>{if(_)p.close();else{x+=y.byteLength;let T=new ProgressEvent("progress",{lengthComputable:m,loaded:x,total:f});for(let S=0,A=h.length;S<A;S++){let E=h[S];E.onProgress&&E.onProgress(T)}p.enqueue(y),b()}},_=>{p.error(_)})}}});return new Response(g)}else throw new au(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{os.add(e,c);let h=Ni[e];delete Ni[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=Ni[e];if(h===void 0)throw this.manager.itemError(e),c;delete Ni[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var ou=class extends vi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=os.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;let o=va("img");function l(){h(),os.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}};var dl=class extends vi{constructor(e){super(e)}load(e,t,n,i){let s=this,a=new Vi,o=new Nr(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(l){let c;try{c=s.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:Bn,a.wrapT=c.wrapT!==void 0?c.wrapT:Bn,a.magFilter=c.magFilter!==void 0?c.magFilter:Qt,a.minFilter=c.minFilter!==void 0?c.minFilter:Qt,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(a.colorSpace=c.colorSpace),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=ui),c.mipmapCount===1&&(a.minFilter=Qt),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c)},n,i),a}},kr=class extends vi{constructor(e){super(e)}load(e,t,n,i){let s=new un,a=new ou(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},Fr=class extends Yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new de(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},fl=class extends Fr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new de(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Wc=new pe,ap=new P,op=new P,Ca=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new se(512,512),this.map=null,this.mapPass=null,this.matrix=new pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ns,this._frameExtents=new se(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;ap.setFromMatrixPosition(e.matrixWorld),t.position.copy(ap),op.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(op),t.updateMatrixWorld(),Wc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Wc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},lu=class extends Ca{constructor(){super(new nn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Tr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},pl=class extends Fr{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new lu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},lp=new pe,oa=new P,Xc=new P,cu=class extends Ca{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new se(4,2),this._viewportCount=6,this._viewports=[new xt(2,1,1,1),new xt(0,1,1,1),new xt(3,1,1,1),new xt(1,1,1,1),new xt(3,0,1,1),new xt(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),oa.setFromMatrixPosition(e.matrixWorld),n.position.copy(oa),Xc.copy(n.position),Xc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Xc),n.updateMatrixWorld(),i.makeTranslation(-oa.x,-oa.y,-oa.z),lp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lp)}},ml=class extends Fr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new cu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},hu=class extends Ca{constructor(){super(new us(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hs=class extends Fr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.shadow=new hu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var gs=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var gl=class extends vi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=os.get(e);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return os.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),os.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});os.add(e,l),s.manager.itemStart(e)}};var xl=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=cp(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=cp();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function cp(){return performance.now()}var uu=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,s=e*i+i,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){let l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){yt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){let a=this._workIndex*s;yt.multiplyQuaternionsFlat(e,a,e,t,e,n),yt.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){let a=1-i;for(let o=0;o!==s;++o){let l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){let o=t+a;e[o]=e[o]+e[n+a]*i}}},ku="\\[\\]\\.:\\/",Hb=new RegExp("["+ku+"]","g"),Fu="[^"+ku+"]",Bb="[^"+ku.replace("\\.","")+"]",zb=/((?:WC+[\/:])*)/.source.replace("WC",Fu),Vb=/(WCOD+)?/.source.replace("WCOD",Bb),Gb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fu),Wb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fu),Xb=new RegExp("^"+zb+Vb+Gb+Wb+"$"),qb=["material","materials","bones","map"],du=class{constructor(e,t,n){let i=n||Lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Lt=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Hb,"")}static parseTrackName(e){let t=Xb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);qb.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Lt.Composite=du;Lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Lt.prototype.GetterByBindingType=[Lt.prototype._getValue_direct,Lt.prototype._getValue_array,Lt.prototype._getValue_arrayElement,Lt.prototype._getValue_toArray];Lt.prototype.SetterByBindingTypeAndVersioning=[[Lt.prototype._setValue_direct,Lt.prototype._setValue_direct_setNeedsUpdate,Lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_array,Lt.prototype._setValue_array_setNeedsUpdate,Lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_arrayElement,Lt.prototype._setValue_arrayElement_setNeedsUpdate,Lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_fromArray,Lt.prototype._setValue_fromArray_setNeedsUpdate,Lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var fu=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let s=t.tracks,a=s.length,o=new Array(a),l={endingStart:dr,endingEnd:dr};for(let c=0;c!==a;++c){let h=s[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Pu,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,s=i.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let s=this._startTime;if(s!==null){let l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case D0:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case Iu:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,s=this._loopCount,a=n===L0;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===Cu){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){let o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);let l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=fr,i.endingEnd=fr):(e?i.endingStart=this.zeroSlopeAtStart?fr:dr:i.endingStart=Oo,t?i.endingEnd=this.zeroSlopeAtEnd?fr:dr:i.endingEnd=Oo)}_scheduleFading(e,t,n){let i=this._mixer,s=i.time,a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}},Yb=new Float32Array(1),yl=class extends zi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){let d=i[u],f=d.name,m=h[f];if(m!==void 0)++m.referenceCount,a[u]=m;else{if(m=a[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}let x=t&&t._propertyBindings[u].binding.parsedPath;m=new uu(Lt.create(n,f,x),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),a[u]=m}o[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,s=this._actionsByClip,a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,s=this._bindings,a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new hl(new Float32Array(2),new Float32Array(2),1,Yb),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){let i=t||this._root,s=i.uuid,a=typeof e=="string"?Ur.findByName(i,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Iu),l!==void 0){let u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let h=new fu(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,s),h}existingAction(e,t){let n=t||this._root,i=n.uuid,s=typeof e=="string"?Ur.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){let a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(let a in s){let o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pu);var ni={time:{value:0},wind:{value:.3},light:{value:new de(1,1,1)}};function Np(){let r=new ze({roughness:.9,flatShading:!0});return r.onBeforeCompile=e=>{e.uniforms.uTime=ni.time,e.uniforms.uWind=ni.wind,e.vertexShader=`uniform float uTime;
uniform float uWind;
`+e.vertexShader.replace("#include <begin_vertex>",`
      vec3 transformed = vec3(position);
      #ifdef USE_INSTANCING
        vec3 ip = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
      #else
        vec3 ip = vec3(0.0);
      #endif
      float h = clamp(position.y, 0.0, 1.0);
      float gust = 0.6 + 0.4 * sin(uTime * 0.7 + ip.x * 0.05);
      transformed.x += sin(uTime * 2.2 + ip.x * 0.35 + ip.z * 0.21) * uWind * gust * h * h * 0.32;
      transformed.z += cos(uTime * 1.6 + ip.z * 0.3) * uWind * h * h * 0.12;`)},r}function kp(r=4031109,e=8830384){return new _t({uniforms:{uTime:ni.time,uLight:ni.light,uDeep:{value:new de(r)},uShallow:{value:new de(e)}},vertexShader:`
      varying vec3 vW; varying vec2 vUv;
      void main(){
        vec4 p = vec4(position, 1.0);
        #ifdef USE_INSTANCING
          p = instanceMatrix * p;
        #endif
        vec4 w = modelMatrix * p; vW = w.xyz; vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,fragmentShader:`
      uniform float uTime; uniform vec3 uLight; uniform vec3 uDeep; uniform vec3 uShallow;
      varying vec3 vW; varying vec2 vUv;
      void main(){
        float r = sin(vW.x * 0.9 + uTime * 1.3) * sin(vW.z * 1.3 - uTime * 0.9) + 0.5 * sin((vW.x + vW.z) * 2.1 + uTime * 2.0);
        float edge = smoothstep(0.35, 0.5, distance(vUv, vec2(0.5)));
        vec3 c = mix(uDeep, uShallow, 0.35 + 0.25 * r + 0.3 * edge);
        c += vec3(0.9, 0.95, 1.0) * smoothstep(1.05, 1.4, r) * 0.25;
        gl_FragColor = vec4(c * uLight, 1.0);
      }`})}var Fp=96,Op=[16175796,15778718,15250831,16309444],Hp=[15895732,15910987,10186704,8369896,16183782,9425846,16752250,14834298],$b=[7029288,2373214,16052454,3108751,6044270];function Ou(r){let e=2166136261;for(let t=0;t<r.length;t++)e^=r.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}var Bp=[[16513008,16513008,16041684],[14032684,15911244,15911244],[15895732,16513008,16777215],[15910987,14032684,14032684]],zp=[[13639204,13639204,15911244],[3105736,3105736,15911244],[14854458,13639204,13639204],[2042426,2042426,15911244]],Kb={1:{shirt:16761370,trim:14032684,pants:11736095,hat:16767050},2:{shirt:16727972,trim:16769354,pants:16773622,hat:16727972},3:{shirt:1623256,trim:16766042,pants:2763370,hat:1623256}};function Vp(r,e,t="",n=0,i=0){let s=Ou(r)+n*7919,a=(d,f)=>d[(s>>>f)%d.length],o={skin:Op[Ou(r)%Op.length],hair:2759700,longHair:!1,shirt:16777215,pants:2761760,tunic:!1,hat:"none",hatColor:0,scale:1,bouquet:!1,trim:0};if(e==="bride"){let[d,f,m]=Bp[n%Bp.length];return{...o,longHair:!0,shirt:d,pants:16513008,tunic:!0,hat:"man",hatColor:f,bouquet:!0,trim:m}}if(e==="groom"){let[d,f,m]=zp[n%zp.length];return{...o,shirt:d,pants:1972760,tunic:!0,hat:"khan",hatColor:f,trim:m}}if(e==="band")return{...o,shirt:3105736,pants:16052454,tunic:!0,hat:"khan",hatColor:3105736,trim:14214399};if(e==="waiter")return{...o,hair:1708560,shirt:16777215,pants:1842210,trim:14032684};let l={...o,longHair:!0,hair:a([2759700,3810328,1971216],6),shirt:a(Hp,13),pants:16183782,tunic:!0,hat:(s>>>17)%6===0?"non":"none",hatColor:15324058},c={...o,shirt:a($b,15),pants:a([2761760,3882826,5981746],19),tunic:(s>>>21)%3===0,hat:(s>>>23)%5===0?"khan":"none",hatColor:2761760},h=Kb[i];if(h&&(e==="guest"||e==="seat"))return{...t==="nam"?c:l,shirt:h.shirt,trim:h.trim,pants:h.pants,tunic:!0,hat:"khan",hatColor:h.hat,scale:1.08};if(t==="nu")return l;if(t==="nam")return c;let u=Ou(r)%100;return u<14?{...o,hair:14275788,longHair:(s>>>7)%2===0,shirt:a([7029288,6044270,3881554],9),pants:15789024,tunic:!0,hat:"khan",hatColor:2761760}:u<26?{...o,scale:.72,longHair:(s>>>5)%2===0,shirt:a(Hp,11),pants:16183782,tunic:!0}:u<66?l:c}var Gp=new pe,Bs=new pe,Gn=new pe,zs=new pe,qp=new pe,Yp=new yt,$p=new P,Kp=new P,Zp=new zt,Zb=new de,Hu=new P,Wp=new pe,bt=(r,e,t,n,i,s,a,o,l)=>qp.compose($p.set(r,e,t),Yp.setFromEuler(Zp.set(n,i,s)),Kp.set(a,o,l)),Al=class{constructor(){N(this,"group",new st);N(this,"actors",new Map);N(this,"ranks",new Map);N(this,"parts");N(this,"faces",new Map);N(this,"avatars",new Map);N(this,"faceGeo",new fi(.3,32));let e=new ze({roughness:.62}),t=new ze({roughness:.55,side:Rt}),n=(s,a=e,o=!0)=>{let l=new Ut(s,a,Fp);return l.frustumCulled=!1,l.castShadow=o,l.count=0,l},i=new dt(.5,.42,1,12).translate(0,-.5,0);this.parts={legL:n(i),legR:n(i),shoeL:n(new It(.5,12,8).scale(1,.6,1.5)),shoeR:n(new It(.5,12,8).scale(1,.6,1.5)),tunic:n(new dt(.38,.62,1,18,1,!0).translate(0,-.5,0),t),body:n(new dt(.42,.5,1,18).translate(0,.5,0)),collar:n(new dt(.5,.5,1,14).translate(0,.5,0)),armL:n(i),armR:n(i),handL:n(new It(.5,10,8)),handR:n(new It(.5,10,8)),head:n(new It(.34,28,20)),face:n(Jb(),new vt({vertexColors:!0}),!1),hair:n(new It(.365,26,14,0,Math.PI*2,0,Math.PI*.56).rotateX(-.42)),hairBack:n(new It(.5,16,12)),hat:n(new dt(.5,.5,1,26)),hatRing:n(new _n(.5,.18,12,30).rotateX(Math.PI/2)),bouquet:n(Qb(),new ze({vertexColors:!0,roughness:.6})),prop:n(new Ot(1,1,1)),load:n(new dt(.5,.5,1,14))};for(let s of Object.values(this.parts))this.group.add(s);this.parts.hat.castShadow=!1,this.parts.hatRing.castShadow=!1}set(e,t,n,i,s,a,o="",l=0){let c=this.actors.get(e),h=this.ranks.get(e)??0,u=`${n}|${o}|${l}|${h}`;if(!c){let d=n==="band"||n==="extra";c={id:e,name:t,role:n,key:u,look:Vp(e,n,o,l,h),x:d?i.x:s.x+(Math.random()-.5),z:d?i.z:s.z,yaw:Math.PI,tx:i.x,tz:i.z,tyaw:i.yaw,anim:"idle",pose:"",phase:Math.random()*6,seen:a,bubble:"",bubbleUntil:0,giftAt:0,cheerUntil:0,speed:2.4,load:"",glassUntil:0,hold:""},this.actors.set(e,c)}return c.key!==u&&(c.role=n,c.key=u,c.look=Vp(e,n,o,l,h)),c.name=t,c.tx=i.x,c.tz=i.z,c.tyaw=i.yaw,c.seen=a,c}prune(e){for(let[t,n]of this.actors)if(n.seen<e){this.actors.delete(t);let i=this.faces.get(t);i&&(this.group.remove(i),i.geometry.dispose(),i.material.dispose(),this.faces.delete(t))}}say(e,t,n=3500,i=performance.now()){let s=this.actors.get(e);s&&t&&(s.bubble=t,s.bubbleUntil=i+n)}cheer(e,t=3e3,n=performance.now()){let i=this.actors.get(e);i&&(i.cheerUntil=n+t)}update(e,t){let n=0;for(let i of this.actors.values()){let s=i.tx-i.x,a=i.tz-i.z,o=Math.hypot(s,a),l=o>.05;if(l){let c=Math.min(o,i.speed*e);i.x+=s/o*c,i.z+=a/o*c,i.yaw=Xp(i.yaw,Math.atan2(s,a),e*8)}else i.yaw=Xp(i.yaw,i.tyaw,e*5);if(i.anim=l?"walk":i.pose?i.pose==="toast"&&i.role==="seat"?"drink":i.pose:t<i.cheerUntil?"cheer":i.role==="bride"||i.role==="groom"?"couple":i.role==="seat"?"eat":i.role==="band"?i.id==="band-1"?"drum":"play":"clap",!(i.z<-3.4)&&(this.draw(n++,i,t/1e3+i.phase,t),n>=Fp))break}for(let i of Object.values(this.parts))i.count=n,i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)}draw(e,t,n,i){let s=t.look,a=t.anim==="eat"||t.anim==="drink",o=0,l=0,c=.08,h=.08,u=.12,d=-.12,f=0,m=0,x=0,g=0,p=Math.sin(n*9);switch(t.anim){case"walk":o=p*.55,l=-p*.55,c=-p*.45,h=p*.45,m=Math.abs(p)*.04;break;case"clap":{let E=Math.max(0,Math.sin(n*7));c=h=-1.05,u=.55-E*.35,d=-.55+E*.35,x=Math.sin(n*1.3)*.08;break}case"eat":{let E=Math.max(0,Math.sin(n*2.4));o=l=-1.45,h=-1.1-E*.9,c=-.8,f=.12;break}case"couple":{if(s.bouquet)c=h=-.95,u=.42,d=-.42;else{let E=n%8<1.8;h=E?Math.PI-.5+Math.sin(n*7)*.3:-.2,d=E?-.25:-.3,c=-.2,u=.3}f=n%13<1.1?.35:0,x=Math.sin(n*.9)*.1;break}case"play":c=-1.1+Math.sin(n*6)*.15,h=-.9,u=.5,d=-.45,x=Math.sin(n*2)*.12;break;case"drum":{let E=Math.sin(n*5);c=-1.5-E*.6,h=-1.5+E*.6;break}case"bow":{f=.15+Math.max(0,Math.sin(n*1.6))*.55,c=h=-.9,u=.45,d=-.45;break}case"raise":case"toast":h=-2+Math.sin(n*2)*.12,d=-.35,c=-.4,x=.1;break;case"drink":{let E=Math.max(0,Math.sin(n*1.8));o=l=-1.45,h=-1.6-E*.9,d=-.2,c=-.5,x=-E*.25;break}case"cut":{c=h=-1.2-Math.sin(n*3)*.25,u=.3,d=-.3,f=.2;break}case"kick":l=-1.5,o=.25,c=-.7,h=.6,u=.5,d=-.5,f=-.15;break;case"hurt":c=h=Math.PI-.5,u=-.45,d=.45,x=Math.sin(n*14)*.3,m=Math.abs(Math.sin(n*12))*.06,f=Math.sin(n*7)*.12;break;case"swing":{let E=Math.abs(Math.sin(n*8));h=-3+E*2.3,d=-.15,c=-.5,f=.05+E*.2;break}case"pull":h=-2.1+Math.sin(n*9)*.12,d=.3,c=-.3,u=.3,f=-.18,x=.15;break;case"disco":{let E=Math.sin(n*6.5)>0;h=E?Math.PI-.3:-.5,d=E?-.35:.5,c=-.4,u=.25,m=Math.abs(Math.sin(n*13))*.07,g=Math.sin(n*6.5)*.35,x=E?-.15:.15;break}case"twist":{let E=Math.sin(n*13);c=h=-1.3,u=.6+E*.3,d=-.6+E*.3,o=E*.35,l=-E*.35,g=E*.55,f=.12,m=Math.abs(E)*.05;break}case"wave":{let E=Math.sin(n*6.5);c=h=Math.PI-.25,u=.2+E*.4,d=-.2+E*.4,m=Math.abs(Math.sin(n*13))*.09,x=E*.2,o=Math.max(0,E)*.3,l=Math.max(0,-E)*.3;break}case"cheer":c=h=Math.PI-.35+Math.sin(n*10)*.25,u=.25,d=-.25,m=Math.abs(Math.sin(n*10))*.12;break;default:c=h=.06+Math.sin(n*1.4)*.03}t.load&&(c=h=-1.3,u=.32,d=-.32);let b=s.scale*(t.role==="bride"||t.role==="groom"?1.12:1);Bs.compose($p.set(t.x,m+(a?-.22:0)*b,t.z),Yp.setFromEuler(Zp.set(0,t.yaw+g,0)),Kp.set(b,b,b)),Gn.copy(Bs).multiply(bt(0,.62,0,f,0,0,1,1,1));let _=(E,v,M,C)=>{Gp.multiplyMatrices(v,M),this.parts[E].setMatrixAt(e,Gp),this.parts[E].setColorAt(e,Zb.set(C))},y=E=>_(E,Bs,bt(0,0,0,0,0,0,0,0,0),0),T=(E,v,M,C,U,k,O,G,H,ee,X,ie)=>{zs.copy(E).multiply(bt(v,M,0,C,0,U,1,1,1)),_(k,zs,bt(0,0,0,0,0,0,H,G,H),ee),_(O,zs,ie?bt(0,-G,.05,0,0,0,.17,.17,.17):bt(0,-G-.02,0,0,0,0,.12,.12,.12),X)};T(Bs,-.1,.62,o,0,"legL","shoeL",.58,.15,s.pants,t.role==="bride"?16513008:2759700,!0),T(Bs,.1,.62,l,0,"legR","shoeR",.58,.15,s.pants,t.role==="bride"?16513008:2759700,!0),_("body",Gn,bt(0,0,0,0,0,0,.42,.48,.3),s.shirt),_("collar",Gn,bt(0,.47,0,0,0,0,.16,.06,.14),s.trim||s.shirt),s.tunic?_("tunic",Gn,bt(0,.04,0,-Math.abs(o)*.3-(a?.9:0),0,0,.62,a?.32:.56,.5),s.shirt):y("tunic"),T(Gn,-.24,.42,c,u,"armL","handL",.4,.12,s.shirt,s.skin,!1),T(Gn,.24,.42,h,d,"armR","handR",.4,.12,s.shirt,s.skin,!1),Wp.copy(zs),Hu.setFromMatrixPosition(qp.multiplyMatrices(zs,bt(0,-.44,0,0,0,0,1,1,1)));let S=bt(0,.86,0,x*.4,x,0,1,1,1);zs.copy(Gn).multiply(S);let A=zs.clone();_("head",A,bt(0,0,0,0,0,0,1,.96,.96),s.skin),this.faceOf(t,A)?y("face"):_("face",A,bt(0,0,0,0,0,0,1,1,1),16777215),_("hair",A,bt(0,.01,-.01,0,0,0,1,1,1),s.hair),s.longHair&&s.hat!=="khan"?_("hairBack",A,bt(0,-.2,-.16,.12,0,0,.62,.95,.34),s.hair):y("hairBack"),s.hat==="man"?(_("hatRing",A,bt(0,.2,-.02,-.25,0,0,.62,.62,.62),s.hatColor),y("hat")):s.hat==="khan"?(_("hat",A,bt(0,.22,-.02,-.18,0,0,.7,.18,.7),s.hatColor),_("hatRing",A,bt(0,.17,-.01,-.18,0,0,.66,.4,.66),s.trim||s.hatColor)):s.hat==="non"?(_("hat",A,bt(0,.3,0,0,0,0,1.05,.06,1.05),s.hatColor),y("hatRing")):(y("hat"),y("hatRing")),s.bouquet?_("bouquet",Gn,bt(0,.08,.42,.3,0,0,1,1,1),16777215):y("bouquet"),t.role==="band"?_("prop",Gn,t.anim==="drum"?bt(.25,.25,.35,-.6,0,0,.05,.05,.5):t.id==="band-0"?bt(-.05,.25,.3,0,0,.9,.36,.36,.06):bt(.1,.5,.32,0,0,1.4,.04,.6,.04),t.id==="band-0"?11565626:7226408):t.hold==="stick"?_("prop",Wp,bt(0,-.75,.02,0,0,0,.07,.95,.07),9067050):t.load==="beer"?_("prop",Gn,bt(0,.22,.42,0,0,0,.52,.24,.36),13904426):t.load==="food"?_("prop",Gn,bt(0,.3,.44,0,0,0,.6,.03,.6),14211806):t.anim==="toast"||t.anim==="drink"||i<t.glassUntil?_("prop",Bs.clone().setPosition(Hu),bt(0,.02,0,0,0,0,.11/b,.16/b,.11/b),15903018):y("prop"),t.load==="beer"?_("load",Gn,bt(0,.4,.42,0,0,0,.42,.14,.28),3111482):t.load==="food"?_("load",Gn,bt(0,.38,.44,0,0,0,.34,.14,.34),15234090):t.anim==="toast"||t.anim==="drink"||i<t.glassUntil?_("load",Bs.clone().setPosition(Hu),bt(0,.1,0,0,0,0,.12/b,.04/b,.12/b),16776170):y("load")}avatarFor(e){if(e.role==="band"||e.role==="extra"||e.role==="waiter")return null;let t=e.role==="bride"?16748464:e.role==="groom"?15911244:16777215,n=this.avatars.get(e.id),i=performance.now();if(n&&n.tex&&n.ring!==t&&(n.tex.dispose(),n.tex=null,n.retryAt=0),n||(n={tex:null,retryAt:0,loading:!1,ring:t},this.avatars.set(e.id,n),this.avatars.size>200&&this.avatars.delete(this.avatars.keys().next().value)),!n.tex&&!n.loading&&i>=n.retryAt){n.loading=!0,n.ring=t;let s=new Image,a=n;s.onload=()=>{a.loading=!1,a.tex=jb(s,t)},s.onerror=()=>{a.loading=!1,a.retryAt=performance.now()+6e4},s.src="/avatar/"+encodeURIComponent(e.id)}return n.tex}faceOf(e,t){let n=this.avatarFor(e),i=this.faces.get(e.id);if(!n)return i&&(i.visible=!1),!1;i||(i=new Ne(this.faceGeo,new vt({map:n,transparent:!0})),i.matrixAutoUpdate=!1,this.faces.set(e.id,i),this.group.add(i));let s=i.material;return s.map!==n&&(s.map=n,s.needsUpdate=!0),i.visible=!0,i.matrix.multiplyMatrices(t,bt(0,-.01,.325,0,0,0,1,1,1)),!0}labeled(e){let t=n=>n.role==="bride"||n.role==="groom"?0:e<n.bubbleUntil||e-n.giftAt<8e3?1:2;return[...this.actors.values()].filter(n=>n.role!=="band"&&n.role!=="extra"&&n.name&&n.z>=-3.4&&(n.role!=="waiter"||e<n.bubbleUntil)).sort((n,i)=>t(n)-t(i))}};function jb(r,e){let t=document.createElement("canvas");t.width=t.height=160;let n=t.getContext("2d");n.save(),n.beginPath(),n.arc(80,80,72,0,Math.PI*2),n.clip(),n.drawImage(r,8,8,144,144),n.restore(),n.beginPath(),n.arc(80,80,74,0,Math.PI*2),n.lineWidth=10,n.strokeStyle="#"+e.toString(16).padStart(6,"0"),n.stroke();let i=new ln(t);return i.colorSpace=ct,i}function Xp(r,e,t){let n=e-r;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return r+n*Math.min(1,t)}function Jb(){let r=[],e=[],t=(i,s)=>{let a=new de(s),o=i.toNonIndexed().attributes.position;for(let l=0;l<o.count;l++)r.push(o.getX(l),o.getY(l),o.getZ(l)),e.push(a.r,a.g,a.b)};for(let i of[-1,1])t(new It(.068,14,10).scale(.85,1.25,.45).translate(i*.12,-.02,.305),2758156),t(new It(.024,8,6).translate(i*.105,.03,.33),16777215),t(new It(.012,6,4).translate(i*.135,-.05,.33),16777215),t(new Ot(.1,.018,.02).rotateZ(i*-.18).translate(i*.125,.115,.31),3810328),t(new It(.05,10,8).scale(1.4,.7,.3).translate(i*.2,-.11,.255),16095910);t(new _n(.035,.009,4,12,Math.PI).rotateZ(Math.PI).translate(0,-.13,.32),11814972);let n=new Pt;return n.setAttribute("position",new je(r,3)),n.setAttribute("color",new je(e,3)),n}function Qb(){let r=[],e=[],t=(s,a)=>{let o=new de(a),l=s.toNonIndexed().attributes.position;for(let c=0;c<l.count;c++)r.push(l.getX(c),l.getY(c),l.getZ(c)),e.push(o.r,o.g,o.b)},n=[16777215,16761556,16748464,16773364];for(let s=0;s<12;s++){let a=s*2.4,o=s<1?0:.07+s%3*.035;t(new fn(.055,1).translate(Math.cos(a)*o,.12+s%2*.02,Math.sin(a)*o),n[s%n.length])}t(new dt(.03,.02,.22,8).translate(0,-.02,0),5212730),t(new _n(.035,.012,6,12).rotateX(Math.PI/2).translate(0,.02,0),16743072);let i=new Pt;return i.setAttribute("position",new je(r,3)),i.setAttribute("color",new je(e,3)),i.computeVertexNormals(),i}var Rl=class{constructor(){N(this,"canvas",document.createElement("canvas"));N(this,"frames",[document.createElement("canvas"),document.createElement("canvas")]);N(this,"onChange",()=>{});N(this,"g");N(this,"key","");N(this,"last",null);N(this,"imgs",new Map);this.canvas.width=1024,this.canvas.height=640,this.g=this.canvas.getContext("2d");for(let e of this.frames)e.width=512,e.height=640;this.draw(null)}image(e){if(!e.avatar)return null;if(!this.imgs.has(e.id)){this.imgs.set(e.id,null);let t=new Image;t.onload=()=>{this.imgs.set(e.id,t),this.key="",this.draw(this.last)},t.src="/avatar/"+encodeURIComponent(e.id),this.imgs.size>30&&this.imgs.delete(this.imgs.keys().next().value)}return this.imgs.get(e.id)??null}draw(e){this.last=e;let t=e?.bride??null,n=e?.groom??null,i=JSON.stringify([t?.id,t?.name,n?.id,n?.name]);if(i===this.key)return;this.key=i;let s=this.g,a=1024;s.clearRect(0,0,a,640),s.save(),s.beginPath(),s.ellipse(a/2,220,420,200,0,0,Math.PI*2);let l=s.createRadialGradient(a/2,180,40,a/2,220,420);l.addColorStop(0,"#e2283a"),l.addColorStop(1,"#a50f1c"),s.fillStyle=l,s.fill(),s.lineWidth=22,s.strokeStyle="#f2c94c",s.stroke(),s.lineWidth=5,s.strokeStyle="#fff1b8",s.beginPath(),s.ellipse(a/2,220,392,174,0,0,Math.PI*2),s.stroke(),s.restore(),s.textAlign="center",s.textBaseline="middle",s.fillStyle="#ffe08a",s.shadowColor="rgba(80,0,0,.5)",s.shadowBlur=8,s.font='italic bold 92px "Dancing Script", "Brush Script MT", "Segoe Script", Georgia, serif',s.fillText("L\u1EC5 Th\xE0nh H\xF4n",a/2,160),s.font='bold 130px "Noto Serif CJK SC", "Microsoft YaHei", "SimSun", serif',s.fillText("\u56CD",a/2,300),s.shadowBlur=0,s.fillStyle="#fff4f6",s.beginPath(),s.moveTo(90,470),s.lineTo(934,470),s.lineTo(900,520),s.lineTo(934,570),s.lineTo(90,570),s.lineTo(124,520),s.closePath(),s.fill(),s.lineWidth=6,s.strokeStyle="#f2c94c",s.stroke();let c=`${t?t.name:"Ch\u1EDD c\xF4 d\xE2u\u2026"}   \u2665   ${n?n.name:t?"Ch\u1EDD ch\xFA r\u1EC3\u2026":"\u2026"}`;s.fillStyle="#b3141f",s.font='bold 40px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif',s.fillText(Qp(s,c,600),a/2,522),this.portrait(150,520,t),this.portrait(874,520,n),this.frame(this.frames[0],t,"C\xD4 D\xC2U","Ch\u1EDD c\xF4 d\xE2u\u2026"),this.frame(this.frames[1],n,"CH\xDA R\u1EC2","Ch\u1EDD ch\xFA r\u1EC3\u2026"),this.onChange()}frame(e,t,n,i){let s=e.getContext("2d"),a=512,o=640;s.clearRect(0,0,a,o);let l=s.createLinearGradient(0,0,a,o);l.addColorStop(0,"#fff1b0"),l.addColorStop(.3,"#e8b83a"),l.addColorStop(.55,"#fff6c8"),l.addColorStop(.8,"#c8901e"),l.addColorStop(1,"#f6d26a"),s.fillStyle=l,s.beginPath(),s.roundRect(0,0,a,o,40),s.fill(),s.fillStyle="#a50f1c",s.beginPath(),s.roundRect(26,26,a-52,o-52,26),s.fill(),s.strokeStyle="#fff1b8",s.lineWidth=4,s.beginPath(),s.roundRect(40,40,a-80,o-80,20),s.stroke();let c=62,h=96,u=a-124,d=420;s.save(),s.beginPath(),s.roundRect(c,h,u,d,16),s.clip();let f=t?this.image(t):null;if(f){let m=Math.max(u/f.width,d/f.height),x=f.width*m,g=f.height*m;s.drawImage(f,c+(u-x)/2,h+(d-g)/2,x,g)}else{let m=s.createLinearGradient(0,h,0,h+d);m.addColorStop(0,t?Jp(t.id):"#f6c4d2"),m.addColorStop(1,"#ffe6ee"),s.fillStyle=m,s.fillRect(c,h,u,d),s.textAlign="center",s.textBaseline="middle",s.fillStyle="#fff",s.font='bold 150px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif',s.fillText(t?jp(t.name):"?",a/2,h+d/2+6)}s.restore(),s.strokeStyle="#f2c94c",s.lineWidth=8,s.beginPath(),s.roundRect(c,h,u,d,16),s.stroke(),s.fillStyle="#f2c94c",s.beginPath(),s.roundRect(a/2-120,40,240,52,26),s.fill(),s.textAlign="center",s.textBaseline="middle",s.fillStyle="#8a0f18",s.font='bold 34px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif',s.fillText("\u{1F497} "+n+" \u{1F497}",a/2,67),s.fillStyle="#fff4f6",s.beginPath(),s.roundRect(54,530,a-108,66,33),s.fill(),s.strokeStyle="#f2c94c",s.lineWidth=5,s.stroke(),s.fillStyle="#b3141f",s.font='bold 36px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif',s.fillText(Qp(s,t?t.name:i,a-150),a/2,564),s.font='40px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';for(let[m,x]of[[34,34],[a-34,34],[34,o-34],[a-34,o-34]])s.fillText("\u{1F338}",m,x)}portrait(e,t,n){let i=this.g,s=74;i.save(),i.beginPath(),i.arc(e,t,s,0,Math.PI*2),i.closePath(),i.fillStyle=n?Jp(n.id):"#e8b6c2",i.fill();let a=n?this.image(n):null;a?(i.clip(),i.drawImage(a,e-s,t-s,s*2,s*2)):(i.fillStyle="#fff",i.font='bold 64px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif',i.fillText(n?jp(n.name):"?",e,t+4)),i.restore(),i.beginPath(),i.arc(e,t,s,0,Math.PI*2),i.lineWidth=9,i.strokeStyle="#f2c94c",i.stroke()}};function jp(r){let e=r.replace(/[^\p{L}\p{N}\s]/gu,"").trim().split(/\s+/).filter(Boolean);return((e[0]?.[0]??"?")+(e.length>1?e[e.length-1][0]:"")).toUpperCase()}function Jp(r){let e=0;for(let t of r)e=(e*31+t.charCodeAt(0))%360;return`hsl(${e}, 55%, 48%)`}function Qp(r,e,t){if(r.measureText(e).width<=t)return e;let n=e;for(;n.length>1&&r.measureText(n+"\u2026").width>t;)n=n.slice(0,-1);return n+"\u2026"}var em=new pe().makeScale(0,0,0),An=class{constructor(e,t,n,i=!0){N(this,"mesh");N(this,"free",[]);N(this,"used",0);N(this,"dirty",!1);this.mesh=new Ut(e,t,n),this.mesh.instanceMatrix.setUsage(Yi),this.mesh.castShadow=i,this.mesh.receiveShadow=!0,this.mesh.frustumCulled=!1,this.mesh.setColorAt(0,new de(1,1,1));for(let s=0;s<n;s++)this.mesh.setMatrixAt(s,em);this.mesh.count=0}add(e,t){let n=this.free.length?this.free.pop():this.used<this.mesh.instanceMatrix.count?this.used++:-1;return n<0?-1:(this.mesh.count=Math.max(this.mesh.count,n+1),this.set(n,e,t),n)}set(e,t,n){e<0||(this.mesh.setMatrixAt(e,t),n!==void 0&&this.mesh.setColorAt(e,tm.set(n)),this.dirty=!0)}color(e,t){e<0||(this.mesh.setColorAt(e,tm.set(t)),this.dirty=!0)}remove(e){e<0||(this.mesh.setMatrixAt(e,em),this.free.push(e),this.dirty=!0)}flush(){this.dirty&&(this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0),this.dirty=!1)}},tm=new de,eM=new P,tM=new yt,nM=new P,iM=new zt;function bi(r,e,t,n=1,i=1,s=1,a=0,o=0,l=0,c=new pe){return c.compose(eM.set(r,e,t),tM.setFromEuler(iM.set(o,a,l)),nM.set(n,i,s))}var Ua={box:new Ot(1,1,1).translate(0,.5,0),prism:(()=>{let r=new Fs;r.moveTo(-.5,0),r.lineTo(.5,0),r.lineTo(0,1),r.closePath();let e=new Lr(r,{depth:1,bevelEnabled:!1});return e.translate(0,0,-.5),e.rotateY(Math.PI/2),e.computeVertexNormals(),e})(),cone:new ds(.5,1,4,1).rotateY(Math.PI/4).translate(0,.5,0),round:new ds(.5,1,12,1).translate(0,.5,0),cyl:new dt(.5,.5,1,8).translate(0,.5,0),ball:new fn(.5,1).translate(0,.5,0)};var sM=3.7,kl={x:14,z:6},Dl=6,Na=[[3.6,7],[3.6,10.2],[6.4,7],[6.4,10.2],[3.6,13.4],[6.4,13.4],[3.6,16.6],[6.4,16.6],[3.6,19.8],[6.4,19.8]].flatMap(([r,e])=>[{x:-r,z:e},{x:r,z:e}]),Ul=1.35,rM=r=>Array.from({length:Dl},(e,t)=>{let n=Na[r],i=(t+.5)/Dl*Math.PI*2;return{x:n.x+Math.cos(i)*Ul,z:n.z+Math.sin(i)*Ul,yaw:Math.atan2(-Math.cos(i),-Math.sin(i))}}),m1=Na.flatMap((r,e)=>rM(e)),nm=(r,e)=>({x:r,z:e,yaw:Math.atan2(-r,2.6-e)});function sm(r,e){let t=[],n=[];for(let i=0;i<4;i++)for(let s=0;s<e;s++)t.push(nm(r*(2.4+s*1+i%2*.4),3+i*.8));for(let i=0;i<19;i++)for(let s of[1.6,2.15])n.push(nm(r*(s+i%2*.1),6.2+i*.8));return t.sort((i,s)=>Math.hypot(i.x,i.z-2.6)-Math.hypot(s.x,s.z-2.6)),[...t,...n]}var g1=sm(-1,8),x1=sm(1,4),rm=[{x:6.2,z:2.2,yaw:-.5},{x:7.6,z:2.8,yaw:-.6},{x:8.9,z:3.6,yaw:-.7}],Vs=new pe().makeScale(0,0,0),Cl=13116189,xs=15251514,Pl=16447214,Bu=16165311,im=15224954,aM=7226408,Il=4860952,Nl=class{constructor(e,t=[]){N(this,"group",new st);N(this,"lanterns",[]);N(this,"sign");N(this,"frames",[]);N(this,"petals");N(this,"petalState",[]);N(this,"drapes",[]);N(this,"b");N(this,"flowers");N(this,"groundMesh");N(this,"grassMesh");N(this,"carpetMesh");N(this,"cake",new st);N(this,"tables",[]);N(this,"shown",0);N(this,"tableBatches",[]);let n=new ze({roughness:.8});this.b={box:new An(Ua.box,n,1500),cyl:new An(new dt(.5,.5,1,18).translate(0,.5,0),n,600),ball:new An(new It(.5,18,12).translate(0,.5,0),n,800),cone:new An(Ua.round,n,200),prism:new An(Ua.prism,n,80)},this.flowers=new An(new fn(.5,1),new ze({roughness:.6}),2600,!1);for(let o of Object.values(this.b))this.group.add(o.mesh);this.group.add(this.flowers.mesh),this.ground(),this.altar(),this.dinh(),this.arch(),this.buildTables(),this.band(),this.greenery(),this.buildCake(),this.sign=new ln(e),this.sign.colorSpace=ct;let i=new Ne(new Vt(3.7,2.31),new vt({map:this.sign,transparent:!0,toneMapped:!1}));i.position.set(0,4.45,.45),this.group.add(i),this.portraits(t);let s=new fi(.07,6).scale(1,.7,1);this.petals=new Ut(s,new vt({side:Rt,transparent:!0,opacity:.95}),220),this.petals.frustumCulled=!1;let a=[16757704,16743066,16777215,16371932];for(let o=0;o<220;o++)this.petalState.push(this.newPetal(!0)),this.petals.setColorAt(o,new de(a[o%a.length]));this.group.add(this.petals);for(let o of Object.values(this.b))o.flush();this.flowers.flush()}put(e,t,n,i,s,a,o,l,c=0,h=0,u=0){return this.b[e].add(bi(n,i,s,a,o,l,c,h,u),t)}flower(e,t,n,i,s){this.flowers.add(bi(e,t,n,i,i,i),s)}ground(){let e=oM();e.wrapS=e.wrapT=qt,e.repeat.set(10,10);let t=new Ne(new Vt(60,60).rotateX(-Math.PI/2),new ze({map:e,roughness:.95}));t.position.set(0,0,8),t.receiveShadow=!0;let n=new Ne(new Vt(200,200).rotateX(-Math.PI/2),new ze({color:8038474,roughness:1}));n.position.set(0,-.02,0),n.receiveShadow=!0;let i=new Ne(new Vt(2.8,16).rotateX(-Math.PI/2),new ze({color:Cl,roughness:.9}));i.position.set(0,.015,9.2),i.receiveShadow=!0,this.group.add(n,t,i),this.groundMesh=t,this.grassMesh=n,this.carpetMesh=i;let s=Ll(3);for(let a=0;a<240;a++)this.flower((s()-.5)*3.6,.02,1.5+s()*15,.09,[16757704,16743066,16777215][a%3])}dinh(){this.put("box",10129280,0,0,-4.2,17,.6,7),this.put("box",9320998,0,.6,-4.2-1.2,15,3.6,.3);for(let n=0;n<4;n++)this.put("box",6168340,-5.4+n*3.6,.8,-4.2-1,2.2,2.6,.08);for(let n=0;n<8;n++)this.put("cyl",aM,-7+n*2,.6,-4.2+2.6,.38,3.8,.38);this.put("box",Il,0,4.2,-4.2+2.6,16.4,.35,.4);let t=lM();for(let n of[-1,1]){let i=new Ne(new Ot(19,.25,5.6),t);i.position.set(0,5.4,-4.2+n*2.2),i.rotation.x=n*.5,i.castShadow=!0,this.group.add(i)}this.put("box",9058844,0,6.55,-4.2,19.2,.4,.5);for(let n of[-1,1])this.put("cone",9058844,n*9.7,6.2,-4.2,.35,1.4,.35,0,0,-n*.8),this.put("cone",9058844,n*9.7,4,-4.2+4.4,.3,1.2,.3,0,.6,-n*.7),this.put("box",xs,n*2.2,6.8,-4.2,1.8,.35,.25,0,0,n*.25);this.put("ball",xs,0,6.75,-4.2,.6,.6,.6);for(let n of[-6,-3,3,6])this.lantern(n,3.6,-4.2+2.9,.75)}portraits(e){e.forEach((t,n)=>{let i=new ln(t);i.colorSpace=ct,i.anisotropy=4,this.frames.push(i);let s=new st,a=2.7,o=a*1.25,l=new Ne(new Vt(a,o),new vt({map:i,transparent:!0}));l.position.z=.07;let c=new Ne(new Ot(a*.97,o*.97,.12),new ze({color:Il,roughness:.7}));c.castShadow=!0;for(let h of[-1,1]){let u=new Ne(new Ot(.1,1.2,.1),new ze({color:Il}));u.position.set(h*a*.32,-o/2-.3,-.12),s.add(u)}s.add(c,l),s.position.set(n===0?-3.4:3.4,6.15,-.9),s.rotation.x=-.12,s.rotation.y=n===0?.12:-.12,this.group.add(s);for(let h=0;h<=10;h++){let u=h/10;this.flower(s.position.x+(u-.5)*a,s.position.y+o/2+.05-Math.sin(u*Math.PI)*.18,s.position.z+.15,.2,[Bu,im,Pl][h%3])}})}lantern(e,t,n,i){this.put("cyl",xs,e,t+.45*i,n,.35*i,.1*i,.35*i),this.put("ball",Cl,e,t-.45*i,n,.9*i,.95*i,.9*i),this.put("cyl",xs,e,t-.55*i,n,.3*i,.1*i,.3*i),this.put("cyl",xs,e,t-1*i,n,.05*i,.45*i,.05*i),this.put("cyl",3811866,e,t+.5*i,n,.02,.5,.02),this.lanterns.push(new P(e,t,n))}arch(){let e=Ll(9),t=[Bu,im,Pl,16766688,Bu,Pl];for(let n of[-1,1]){this.put("cyl",Pl,n*2.1,0,0,.32,3.8,.32);for(let i=0;i<3.8;i+=.16)for(let s=0;s<3;s++){let a=e()*Math.PI*2;this.flower(n*2.1+Math.cos(a)*.22,i,Math.sin(a)*.22,.18+e()*.12,t[Math.floor(e()*t.length)])}this.put("cyl",15327958,n*2.6,0,.9,.7,.5,.7);for(let i=0;i<22;i++)this.flower(n*2.6+(e()-.5)*.7,.55+e()*.4,.9+(e()-.5)*.7,.2,t[Math.floor(e()*t.length)])}for(let n=0;n<=60;n++){let i=n/60*Math.PI,s=-Math.cos(i)*2.1,a=3.8+Math.sin(i)*1;for(let o=0;o<4;o++)this.flower(s+(e()-.5)*.35,a+(e()-.5)*.3,(e()-.5)*.4,.2+e()*.12,t[Math.floor(e()*t.length)]);n%6===0&&this.flower(s,a,.2,.18,5937736)}for(let n of[-1,1]){let i=new Vt(1.6,4.4,10,24),s=i.attributes.position;for(let o=0;o<s.count;o++){let l=s.getX(o)/1.6+.5,c=s.getY(o)/4.4+.5;s.setXYZ(o,n*(2.1-l*1.3*c),.3+c*4-Math.sin(l*Math.PI)*.25*c,.25+Math.sin(l*8)*.06)}i.computeVertexNormals();let a=new Ne(i,new ze({color:16758476,transparent:!0,opacity:.82,side:Rt,roughness:.6}));this.drapes.push({mesh:a,base:Float32Array.from(s.array)}),this.group.add(a)}}altar(){this.put("box",7020308,0,0,-1.1,2.2,1,.9),this.put("box",xs,0,1,-1.1,2.3,.06,.95),this.put("cyl",9071162,0,1.06,-1.15,.36,.22,.36);for(let e=0;e<3;e++)this.put("cyl",10103322,-.06+e*.06,1.28,-1.15,.02,.4,.02);for(let e of[-1,1])this.put("cyl",Cl,e*.85,1.06,-1.1,.14,.42,.14),this.put("ball",16766042,e*.85,1.48,-1.1,.08,.12,.08);this.put("cyl",xs,.48,1.06,-1,.5,.06,.5);for(let[e,t]of[[-.1,15900730],[.1,8372042],[0,14169130]])this.put("ball",t,.48+e,1.12,-1+(t===14169130?.1:0),.18,.18,.18);this.put("box",3811866,-.45,1.06,-1.35,.4,.5,.05)}buildCake(){let e=new ze({color:16775922,roughness:.5}),t=new ze({color:16754376,roughness:.5}),n=(i,s,a)=>{let o=new Ne(i,s);o.position.y=a,o.castShadow=!0,this.cake.add(o)};n(new dt(.42,.42,.75,20),new ze({color:13116189}),.375),n(new dt(.5,.5,.04,24),new ze({color:15919320}),.77),[[.36,.3],[.27,.26],[.18,.22]].reduce((i,[s,a])=>(n(new dt(s,s,a,22),e,i+a/2),n(new _n(s,.025,6,22).rotateX(Math.PI/2),t,i+.02),i+a),.79),n(new It(.07,10,8),t,1.65),this.cake.position.set(0,0,sM),this.cake.visible=!1,this.group.add(this.cake)}buildTables(){let e=new ze({roughness:.75}),t={cyl:new An(new dt(.5,.5,1,18).translate(0,.5,0),e,900),ball:new An(new It(.5,14,10).translate(0,.5,0),e,320),box:new An(Ua.box,e,420)},n=new An(new dt(.5,.5,1,12).translate(0,.5,0),new ze({roughness:.15,metalness:.1}),340);for(let i of[...Object.values(t),n])this.group.add(i.mesh);Na.forEach((i,s)=>{let a=[],o=[],l=(u,d,f,m,x,g,p,b,_=0)=>{let y=bi(i.x+f,m,i.z+x,g,p,b,_);a.push([t[u],t[u].add(y,d),y])};l("cyl",Cl,0,0,0,1.9,.72,1.9),l("cyl",16248802,0,.72,0,2,.03,2),l("cyl",13225170,0,.75,0,1.15,.03,1.15),l("cyl",16777215,-.22,.78,-.12,.46,.02,.46),l("ball",15317066,-.22,.79,-.12,.36,.24,.3),l("ball",14169130,.24,.78,-.16,.32,.22,.32);for(let u=0;u<3;u++)l("cyl",15976120,.08+u*.1,.78,.22,.12,.04,.12);for(let u=0;u<4;u++)l("box",13138474,-.3+u*.08,.8,.26,.06,.05,.2,.3);l("cyl",16777215,.34,.78,.12,.26,.11,.26),l("ball",8175722,.34,.85,.12,.2,.06,.2),l("ball",5941320,-.02,.78,.02,.26,.1,.26),l("ball",15900730,.02,.78,-.36,.14,.14,.14),l("ball",14169130,.13,.78,-.33,.12,.12,.12);for(let u=0;u<Dl;u++){let d=(u+.5)/Dl*Math.PI*2,f=Math.cos(d),m=Math.sin(d);l("cyl",16777215,f*.72,.75,m*.72,.17,.07,.17),l("box",9067050,f*.62-m*.1,.77,m*.62+f*.1,.02,.02,.26,-d),l("cyl",14034984,f*Ul,0,m*Ul,.4,.42,.4)}for(let u=0;u<8;u++){let d=u/8*Math.PI*2+.2,f=i.x+Math.cos(d)*.5,m=i.z+Math.sin(d)*.5;for(let[x,g,p,b]of[[3111482,.75,.1,.24],[3111482,.99,.045,.1],[15251514,1.09,.05,.02]]){let _=bi(f,g,m,p,b,p);o.push([n,n.add(Vs,x),_])}}let c=[],h=(u,d,f,m,x,g,p,b,_)=>{let y=bi(i.x+m,x,i.z+g,p,b,_);u.push([t[d],t[d].add(Vs,f),y])};for(let u=0;u<4;u++){let d=Math.PI/4+u*Math.PI/2,f=Math.cos(d)*.42,m=Math.sin(d)*.42,x=[];h(x,"cyl",16777215,f,.78,m,.32,.02,.32),u===0&&(h(x,"ball",16734756,f,.79,m,.26,.12,.15),h(x,"ball",16760906,f+.06,.82,m,.08,.06,.08)),u===1&&h(x,"ball",14267002,f,.79,m,.3,.09,.13),u===2&&(h(x,"cyl",3816e3,f,.79,m,.3,.15,.3),h(x,"ball",14172202,f,.9,m,.27,.05,.27),h(x,"ball",8175722,f+.05,.93,m,.1,.03,.1)),u===3&&(h(x,"ball",9058850,f,.79,m,.24,.09,.24),h(x,"ball",5941320,f-.04,.84,m+.03,.09,.05,.09)),c.push(x)}for(let[u,d]of a)u.set(d,Vs);this.tables.push({parts:a,bottles:o,dishes:c,on:!1,beer:0,food:0})}),this.tableBatches=[...Object.values(t),n],this.setTables(2)}setTables(e){this.shown=e,this.tables.forEach((t,n)=>{let i=n<e;if(i!==t.on){t.on=i;for(let[s,a,o]of t.parts)s.set(a,i?o:Vs)}this.bottlesOf(n)});for(let t of this.tableBatches)t.flush()}get tableCount(){return this.shown}showTables(e){let t=new Set(e);this.shown=t.size,this.tables.forEach((n,i)=>{let s=t.has(i);if(s!==n.on){n.on=s;for(let[a,o,l]of n.parts)a.set(o,s?l:Vs)}this.bottlesOf(i)});for(let n of this.tableBatches)n.flush()}addBeer(e){let t=this.tables[e];if(!t)return null;t.beer=Math.min(8,t.beer+1),this.bottlesOf(e);for(let n of this.tableBatches)n.flush();return Na[e]}addFood(e){let t=this.tables[e];if(!t)return null;t.food=Math.min(4,t.food+1),this.bottlesOf(e);for(let n of this.tableBatches)n.flush();return Na[e]}clearOrders(){this.tables.forEach((e,t)=>{e.beer=0,e.food=0,this.bottlesOf(t)});for(let e of this.tableBatches)e.flush()}bottlesOf(e){let t=this.tables[e];t.bottles.forEach(([n,i,s],a)=>n.set(i,t.on&&Math.floor(a/3)<t.beer?s:Vs)),t.dishes.forEach((n,i)=>{for(let[s,a,o]of n)s.set(a,t.on&&i<t.food?o:Vs)})}band(){this.put("box",Il,8.6,0,4.2,1.6,.5,1.2);let e=new Ne(new dt(.78,.78,1.1,28),new ze({color:13114916,roughness:.5}));e.position.set(8.6,1.25,4.2),e.rotation.z=Math.PI/2,e.rotation.y=-.4,e.castShadow=!0;let t=new Ne(new fi(.72,28),new ze({color:15784360,roughness:.8}));t.position.set(8.6+.52*Math.cos(.4),1.25,4.2+.52*Math.sin(.4)),t.rotation.y=Math.PI/2-.4,this.group.add(e,t),this.put("cyl",xs,8.6,.5,4.2,1.65,.04,1.65)}greenery(){let e=Np(),t=new An(new fn(.5,1).translate(0,.5,0),e,120),n=new An(new Ot(1,.04,.32).translate(.5,0,0),e,80);this.group.add(t.mesh,n.mesh),this.put("cyl",6965806,-9.2,0,-1.6,.9,5.2,.9);for(let[s,a,o,l,c]of[[0,4.6,0,5.2,5212724],[-2,4,1,3.8,6134332],[2.2,4.3,.6,4,6989892],[.6,6,.2,3.6,6134332],[-1.2,5.6,-1,3.4,4882224]])t.add(bi(-9.2+s,a,-1.6+o,l,l*.75,l),c);for(let[s,a]of[[10.5,-1.2],[12.2,.6],[9.6,1.4]]){this.put("cyl",9347162,s,0,a,.32,2.4,.32);for(let o=0;o<7;o++)n.add(bi(s,2.3,a,2.4,1,1,o*.9,0,.35+o%2*.25),7319626)}this.put("box",13215615,13,0,-3.5,4,2.4,3.2),this.put("prism",13741410,13,2.4,-3.5,4.8,1.8,4.2);let i=Ll(5);for(let s=0;s<26;s++){let a=-26+s*2.1+i(),o=3+i()*2.5;t.add(bi(a,.5,-11-i()*4,o,o*1.2,o),[5212724,6134332,4487724][s%3])}t.flush(),n.flush()}newPetal(e){return{x:(Math.random()-.5)*22,y:e?Math.random()*9:9+Math.random()*2,z:-2+Math.random()*18,vx:.2+Math.random()*.3,vy:-(.5+Math.random()*.5),rot:Math.random()*6,spin:1+Math.random()*3}}update(e,t,n=0){let i=new pe;for(let s=0;s<this.petalState.length;s++){let a=this.petalState[s];a.x+=(a.vx+Math.sin(t*1.3+s)*.3)*e,a.y+=a.vy*e*(1+n),a.rot+=a.spin*e,a.y<.02&&(this.petalState[s]=this.newPetal(!1)),this.petals.setMatrixAt(s,bi(a.x,Math.max(.02,a.y),a.z,1,1,1,a.rot,a.rot*.7,a.rot*.4,i))}this.petals.instanceMatrix.needsUpdate=!0;for(let s of this.drapes){let a=s.mesh.geometry.attributes.position;for(let o=0;o<a.count;o++){let l=s.base[o*3+1];a.setZ(o,s.base[o*3+2]+Math.sin(t*1.6+l*1.4)*.06*(4.3-l)/4)}a.needsUpdate=!0}}};function Ll(r){return()=>(r=r*16807%2147483647)/2147483647}function oM(){let r=document.createElement("canvas");r.width=r.height=256;let e=r.getContext("2d"),t=Ll(11);e.fillStyle="#b9a58c",e.fillRect(0,0,256,256);for(let i=0;i<256;i+=32)for(let s=i/32%2*24;s<304;s+=48){let a=170+Math.floor(t()*40);e.fillStyle=`rgb(${a+20},${a+6},${a-18})`,e.beginPath(),e.roundRect(s-23+t()*2,i+2+t()*2,44,28,6),e.fill()}let n=new ln(r);return n.colorSpace=ct,n}function lM(){let r=document.createElement("canvas");r.width=128,r.height=128;let e=r.getContext("2d");e.fillStyle="#b5532e",e.fillRect(0,0,128,128);for(let n=0;n<128;n+=16){e.fillStyle="rgba(70,20,8,0.45)",e.fillRect(0,n,128,3);for(let i=n/16%2*8;i<128;i+=16)e.fillStyle="rgba(255,190,140,0.18)",e.fillRect(i,n+4,6,10)}let t=new ln(r);return t.colorSpace=ct,t.wrapS=t.wrapT=qt,t.repeat.set(8,3),new ze({map:t,roughness:.85})}var Nt={trai:{house:{x:-47.5,z:10.3},gate:{x:-42.5,z:10.3},spawn:{x:-44,z:10.3}},gai:{house:{x:47.5,z:10.3},gate:{x:42.5,z:10.3},spawn:{x:44,z:10.3}}},Gt={minX:-49,maxX:49,minZ:-10.5,maxZ:31.5},Vu=3.1;var am=["\u{1F6E3}\uFE0F L\xE0n 1","\u{1F6E3}\uFE0F L\xE0n 2","\u{1F6E3}\uFE0F L\xE0n 3"],cn={minX:-17,maxX:17,minZ:-8,maxZ:22},$t={x:-24,z:50,r:14},cM=[[{x:44,z:10.3},{x:41,z:10.3}],[{x:44,z:10.3},{x:41,z:10.3},{x:37,z:5.8}],[{x:44,z:10.3},{x:41,z:10.3},{x:37,z:15.5}]],om=cM.map(r=>[...r.map(e=>({x:-e.x,z:e.z})),...[...r].reverse()]),lm=[],cm=[{x:8.6,z:4.2,r:.9},{x:7.6,z:2.8,r:1.3},{x:0,z:2.2,r:1.25},{x:-2.1,z:0,r:.5},{x:2.1,z:0,r:.5},{x:-6,z:-4.2,r:3.4},{x:0,z:-4.2,r:3.4},{x:6,z:-4.2,r:3.4},{x:-9.2,z:-1.6,r:2.2},{x:13,z:-3.5,r:2.6},{x:11,z:.3,r:1.8},{x:Nt.trai.house.x,z:10.3,r:3},{x:Nt.gai.house.x,z:10.3,r:3},{x:Nt.trai.gate.x,z:10.3,r:1.6,enemyOf:"trai"},{x:Nt.gai.gate.x,z:10.3,r:1.6,enemyOf:"gai"},...[-1,1].flatMap(r=>[-1,1].flatMap(e=>[{x:r*Nt.gai.gate.x,z:10.3+e*2,r:.55},{x:r*Nt.gai.gate.x,z:10.3+e*2.9,r:.55}]))];var zu=class{constructor(e){N(this,"pts");N(this,"cum",[0]);N(this,"length");this.pts=e;for(let t=1;t<e.length;t++)this.cum.push(this.cum[t-1]+Math.hypot(e[t].x-e[t-1].x,e[t].z-e[t-1].z));this.length=this.cum[this.cum.length-1]}seg(e){let t=1;for(;t<this.cum.length-1&&this.cum[t]<e;)t++;return t}at(e,t){e=Math.max(0,Math.min(this.length,e));let n=this.seg(e),i=this.pts[n-1],s=this.pts[n],a=this.cum[n]-this.cum[n-1]||1,o=(e-this.cum[n-1])/a;return t.x=i.x+(s.x-i.x)*o,t.z=i.z+(s.z-i.z)*o,t.nx=-(s.z-i.z)/a,t.nz=(s.x-i.x)/a,t}project(e,t){let n=0,i=1/0;for(let s=1;s<this.pts.length;s++){let a=this.pts[s-1],o=this.pts[s],l=o.x-a.x,c=o.z-a.z,h=l*l+c*c||1,u=Math.max(0,Math.min(1,((e-a.x)*l+(t-a.z)*c)/h)),d=a.x+l*u,f=a.z+c*u,m=(e-d)**2+(t-f)**2;m<i&&(i=m,n=this.cum[s-1]+Math.sqrt(h)*u)}return n}},Fl=om.map(r=>new zu(r)),$i=class{static length(e){return Fl[e].length}static point(e,t,n,i={x:0,z:0,nx:0,nz:0}){let s=Fl[e];return t==="trai"?s.at(n,i):(s.at(s.length-n,i),i.nx=-i.nx,i.nz=-i.nz,i)}static project(e,t,n,i){let s=Fl[e].project(n,i);return t==="trai"?s:Fl[e].length-s}static path(e){return om[e]}};var hm={byGiftId:{},byName:{},byValue:[{min:1,unit:"danbinh",count:5},{min:5,unit:"xathu",count:5},{min:10,unit:"dausi",count:3},{min:30,unit:"xechien",count:3},{min:100,unit:"trau",count:3},{min:500,unit:"voi",count:2}],maxRepeatPerEvent:500},um=[{name:"Hoa h\u1ED3ng",icon:"\u{1F339}",value:1,giftId:"sim-1"},{name:"K\u1EB9o b\xF4ng",icon:"\u{1F36D}",value:5,giftId:"sim-5"},{name:"Kem \u1ED1c qu\u1EBF",icon:"\u{1F366}",value:10,giftId:"sim-10"},{name:"M\u0169 ph\u1EDBt",icon:"\u{1F3A9}",value:30,giftId:"sim-30"},{name:"Nh\u1EABn c\u01B0\u1EDBi",icon:"\u{1F48D}",value:100,giftId:"sim-100"},{name:"Ph\xE1o hoa",icon:"\u{1F386}",value:500,giftId:"sim-500"}];var dm=["danbinh","xathu","dausi","xechien","trau","voi"],Gs=r=>({windup:.3,radius:0,dmgMult:1,stun:0,knock:0,lift:0,duration:0,speedMult:1,range:0,minTargets:1,...r}),Wt={danbinh:{key:"danbinh",tier:1,label:"1X",name:"D\xE2n binh",icon:"\u{1F962}",role:"swarm",hp:100,damage:5,speed:3.5,range:.45,detect:7,attackCd:.9,windup:.3,radius:.34,mass:1,armor:0,crit:.08,critMult:1.8,knock:.4,siege:1,boss:!1,stackable:!0,projectile:null,block:null,skills:[],giftValue:1},xathu:{key:"xathu",tier:2,label:"5X",name:"X\u1EA1 th\u1EE7",icon:"\u{1F3F9}",role:"ranged",hp:180,damage:15,speed:3.2,range:7,detect:9.5,attackCd:1.2,windup:.35,radius:.36,mass:1,armor:.05,crit:.12,critMult:2,knock:0,siege:.6,boss:!1,stackable:!0,projectile:{speed:18,minRange:2.6},block:null,skills:[Gs({key:"volley",name:"B\u1EAFn li\xEAn t\u1EE5c",cd:7,duration:1.6,speedMult:3.2,minTargets:1})],giftValue:5},dausi:{key:"dausi",tier:3,label:"10X",name:"\u0110\u1EA5u s\u0129",icon:"\u{1F6E1}\uFE0F",role:"tank",hp:500,damage:35,speed:2.8,range:.6,detect:7.5,attackCd:1.3,windup:.45,radius:.5,mass:3,armor:.3,crit:.1,critMult:1.8,knock:.8,siege:1.2,boss:!1,stackable:!0,projectile:null,block:{chance:.35,reduce:.7},skills:[Gs({key:"slam",name:"\u0110\u1EADp b\xFAa",cd:7,windup:.55,radius:2.2,dmgMult:2,stun:1,knock:2,lift:.6,minTargets:2})],giftValue:10},xechien:{key:"xechien",tier:4,label:"30X",name:"Xe chi\u1EBFn",icon:"\u{1F69C}",role:"raider",hp:1500,damage:100,speed:5.5,range:.7,detect:10,attackCd:1.5,windup:.2,radius:.9,mass:8,armor:.35,crit:.1,critMult:1.6,knock:2,siege:1.6,boss:!1,stackable:!1,projectile:null,block:null,skills:[Gs({key:"boost",name:"T\u0103ng t\u1ED1c t\xF4ng",cd:6,windup:0,radius:1.9,dmgMult:1.6,stun:.6,knock:4,lift:2.2,duration:1.8,speedMult:2.1,range:11,minTargets:1})],giftValue:30},trau:{key:"trau",tier:5,label:"100X",name:"K\u1EF5 binh tr\xE2u",icon:"\u{1F403}",role:"breaker",hp:5e3,damage:300,speed:4,range:.9,detect:10.5,attackCd:1.6,windup:.35,radius:1.1,mass:20,armor:.25,crit:.12,critMult:1.7,knock:3,siege:1.5,boss:!0,stackable:!1,projectile:null,block:null,skills:[Gs({key:"charge",name:"H\xFAc xuy\xEAn h\xE0ng",cd:8,windup:.35,radius:1.4,dmgMult:1.5,stun:.8,knock:4,lift:1.6,duration:.75,speedMult:3,range:8,minTargets:2}),Gs({key:"trample",name:"Gi\u1EABm \u0111\u1EA1p",cd:1,windup:0,radius:1.5,dmgMult:.12,minTargets:1})],giftValue:100},voi:{key:"voi",tier:6,label:"500X",name:"T\u01B0\u1EE3ng binh voi",icon:"\u{1F418}",role:"boss",hp:25e3,damage:1e3,speed:2.5,range:1.5,detect:12,attackCd:2.2,windup:.6,radius:1.8,mass:100,armor:.4,crit:.1,critMult:1.5,knock:4,siege:2,boss:!0,stackable:!1,projectile:null,block:null,skills:[Gs({key:"stomp",name:"Gi\u1EABm \u0111\u1EA5t",cd:6,windup:.8,radius:3.6,dmgMult:1.2,stun:.8,knock:4,lift:2.5,minTargets:2}),Gs({key:"roar",name:"G\u1EA7m vang",cd:14,windup:.6,radius:6.5,dmgMult:.3,stun:2.2,knock:1.2,minTargets:5})],giftValue:500}};var Br=["trai","gai"];var ht={trai:{name:"Nh\xE0 Trai",icon:"\u{1F935}",color:3111935,css:"#2f7bff",dir:1},gai:{name:"Nh\xE0 G\xE1i",icon:"\u{1F470}",color:16727423,css:"#ff3d7f",dir:-1}};var fm=8,pm=["spawn","gather","move","approach","attack","skill","stun","dead","cheer"],ii={stun:1,boost:2,charge:4,block:8,air:16,defend:32,volley:64};var hM=r=>()=>((r=(Math.imul(r,16807)+7)%2147483647)&2147483647)/2147483647;function ka(r,e,t,n){let i=document.createElement("canvas");i.width=r,i.height=e;let s=i.getContext("2d");t(s,hM(n));let a=new ln(i);a.colorSpace=ct,a.wrapS=a.wrapT=qt,a.anisotropy=8;let o=new ln(i);return o.wrapS=o.wrapT=qt,{map:a,bump:o}}var zr=(r,e,t,n,i,s,a=!0)=>{for(let o=0;o<i;o++){let l=a?e()*80|0:180+e()*75|0;r.fillStyle=`rgba(${l},${l*.95|0},${l*.85|0},${s*e()})`,r.fillRect(e()*t,e()*n,1+e()*3,1+e()*3)}},ys=(r,e,t,n,i,s,a)=>{for(let o=0;o<i;o++){let l=e()*t,c=e()*n,h=10+e()*60,u=r.createRadialGradient(l,c,0,l,c,h);u.addColorStop(0,`rgba(${s},${a*e()})`),u.addColorStop(1,`rgba(${s},0)`),r.fillStyle=u,r.fillRect(l-h,c-h,h*2,h*2)}},gm=null;function xm(){let r=ka(512,512,(a,o)=>{a.fillStyle="#d9c08a",a.fillRect(0,0,512,512),ys(a,o,512,512,90,"160,128,70",.35),ys(a,o,512,512,50,"240,225,190",.4);for(let l=0;l<40;l++){let c=o()*512,h=a.createLinearGradient(c,0,c,512);h.addColorStop(0,"rgba(90,70,40,0.18)"),h.addColorStop(1,"rgba(90,70,40,0)"),a.fillStyle=h,a.fillRect(c,0,2+o()*6,120+o()*300)}for(let l=0;l<12;l++){a.strokeStyle="rgba(70,55,35,0.5)",a.lineWidth=.8,a.beginPath();let c=o()*512,h=o()*512;a.moveTo(c,h);for(let u=0;u<6;u++)c+=(o()-.5)*30,h+=o()*25,a.lineTo(c,h);a.stroke()}for(let l=430;l<512;l+=18)for(let c=l/18%2*22;c<512;c+=44)o()<.55||(a.fillStyle=`rgb(${130+o()*40|0},${60+o()*20|0},${40+o()*15|0})`,a.fillRect(c+1,l+1,41,15));ys(a,o,512,80,20,"80,90,50",.25),zr(a,o,512,512,9e3,.25)},11),e=ka(512,512,(a,o)=>{a.fillStyle="#5a2a1a",a.fillRect(0,0,512,512);for(let l=0;l<16;l++)for(let c=0;c<16;c++){let h=c*32+l%2*16,u=l*32,d=120+o()*50,f=a.createLinearGradient(h,0,h+30,0);f.addColorStop(0,`rgb(${d*.55|0},${d*.25|0},${d*.15|0})`),f.addColorStop(.5,`rgb(${d|0},${d*.48|0},${d*.3|0})`),f.addColorStop(1,`rgb(${d*.5|0},${d*.22|0},${d*.14|0})`),a.fillStyle=f,a.beginPath(),a.ellipse(h+15,u+18,15,19,0,Math.PI,0),a.lineTo(h+30,u+34),a.lineTo(h,u+34),a.fill(),a.fillStyle="rgba(20,8,4,0.55)",a.fillRect(h,u+30,30,4)}ys(a,o,512,512,70,"70,80,55",.45),ys(a,o,512,512,30,"30,25,20",.35),zr(a,o,512,512,7e3,.3)},21),t=ka(256,512,(a,o)=>{a.fillStyle="#5a3820",a.fillRect(0,0,256,512);for(let l=0;l<160;l++){let c=o()*256,h=o();a.strokeStyle=h<.5?`rgba(30,16,8,${.25+o()*.3})`:`rgba(140,95,55,${.15+o()*.2})`,a.lineWidth=.6+o()*2,a.beginPath(),a.moveTo(c,0);for(let u=0;u<=512;u+=32)a.lineTo(c+Math.sin(u*.02+l)*4+(o()-.5)*2,u);a.stroke()}for(let l=0;l<6;l++){let c=o()*256,h=o()*512;a.strokeStyle="rgba(25,12,6,0.6)";for(let u=1;u<5;u++)a.lineWidth=1,a.beginPath(),a.ellipse(c,h,u*3,u*7,0,0,7),a.stroke()}zr(a,o,256,512,3e3,.25)},31),n=ka(512,256,(a,o)=>{a.fillStyle="#4e4a44",a.fillRect(0,0,512,256);for(let l=0;l<256;l+=64)for(let c=l/64%2*48;c<560;c+=96){let h=105+o()*45|0;a.fillStyle=`rgb(${h},${h-2},${h-8})`,a.fillRect(c-48+3,l+3,90,58)}ys(a,o,512,256,40,"60,70,45",.35),zr(a,o,512,256,6e3,.35),zr(a,o,512,256,2e3,.25,!1)},41),i=ka(512,512,(a,o)=>{a.fillStyle="#8a8070",a.fillRect(0,0,512,512);for(let l=0;l<512;l+=24)for(let c=l/24%2*32;c<560;c+=64){let h=120+o()*50;a.fillStyle=`rgb(${h|0},${h*.45|0},${h*.3|0})`,a.fillRect(c-32+2,l+2,60,20)}ys(a,o,512,512,50,"40,35,30",.3),ys(a,o,512,512,25,"70,85,50",.3),zr(a,o,512,512,8e3,.3)},51),s=(a,o,l,c=16777215)=>new ze({map:a.map,bumpMap:a.bump,bumpScale:l,roughness:o,color:c});return{plaster:r,tiles:e,wood:t,stone:n,brick:i,plasterM:s(r,.95,1.2),tilesM:s(e,.85,2.5),woodM:s(t,.75,1.5),stoneM:s(n,.9,2),brickM:s(i,.9,2),lacquer:new ze({color:8000528,roughness:.35,metalness:.1}),gold:new ze({color:13145642,roughness:.3,metalness:.85}),iron:new ze({color:2762790,roughness:.5,metalness:.7}),glaze:new ze({color:5913124,roughness:.25,metalness:.05})}}function Ht(r,e,t,n,i=1.6){let s=new Ot(r,e,t),a=s.attributes.uv,o=[[t,e],[t,e],[r,t],[r,t],[r,e],[r,e]];for(let c=0;c<6;c++)for(let h=0;h<4;h++){let u=c*4+h;a.setXY(u,a.getX(u)*o[c][0]/i,a.getY(u)*o[c][1]/i)}let l=new Ne(s,n);return l.castShadow=!0,l.receiveShadow=!0,l}var Fa=class{constructor(e){N(this,"group",new st);N(this,"team");N(this,"doors",[]);N(this,"gate",new st);N(this,"roof",new st);N(this,"house",new st);N(this,"flags",[]);N(this,"spawnRing");N(this,"gateFrac",1);N(this,"houseFrac",1);N(this,"gateDown",!1);N(this,"houseDown",!1);N(this,"fallT",0);N(this,"gateFallT",0);this.team=e;let t=gm??(gm=xm()),n=ht[e].color,i=ht[e].dir,s=Nt[e].house,a=Nt[e].gate,o=Nt[e].spawn,l=(T,S,A,E,v)=>(T.position.set(A,E,v),S.add(T),T),c=(T,S,A,E,v=16)=>{let M=new Ne(new dt(T,S,A,v),E);return M.castShadow=!0,M.receiveShadow=!0,M};this.house.position.set(s.x,0,s.z),this.house.rotation.y=i*Math.PI/2,this.group.add(this.house);let h=this.house;l(Ht(6.2,.55,5.2,t.stoneM,1.2),h,0,.27,0);for(let T=0;T<2;T++)l(Ht(2.2-T*.3,.18,.4,t.stoneM,1.2),h,0,.09+T*.18-0,2.75-T*.3+.2);l(Ht(5.2,2.6,3.4,t.plasterM,2.2),h,0,1.85,-.35);for(let T=-1;T<=1;T++){l(Ht(1.5,2.25,.08,t.woodM,1),h,T*1.62,1.68,1.36);for(let S=0;S<4;S++)l(Ht(.05,2.25,.1,t.woodM,1),h,T*1.62-.56+S*.37,1.68,1.41);l(Ht(1.5,.07,.11,t.woodM,1),h,T*1.62,2.1,1.41),l(Ht(1.5,.07,.11,t.woodM,1),h,T*1.62,1.05,1.41)}for(let T of[-2.5,-.82,.82,2.5])l(c(.17,.19,2.75,t.woodM),h,T,1.95,2.15),l(c(.3,.34,.22,t.stoneM,12),h,T,.66,2.15);l(Ht(5.8,.24,.28,t.woodM,1.4),h,0,3.3,2.15),l(Ht(5.8,.16,.2,t.woodM,1.4),h,0,2.95,2.15),this.roof.position.y=3.35,h.add(this.roof);for(let T of[-1,1]){let S=Ht(6.8,.16,3.25,t.tilesM,1.1);S.position.set(0,.88,T*1.36-.1),S.rotation.x=T*.56,this.roof.add(S);let A=Ht(6.8,.14,.08,t.woodM,1);A.position.set(0,.03,T*2.8-.1),A.rotation.x=T*.56,this.roof.add(A)}for(let T of[-1,1]){let S=new Fs;S.moveTo(-1.75,0),S.lineTo(1.75,0),S.lineTo(0,1.45),S.closePath();let A=new Ne(new Lr(S,{depth:.2,bevelEnabled:!1}),t.plasterM);A.rotation.y=Math.PI/2,A.position.set(T*2.5-.1,0,-.35),A.castShadow=!0,this.roof.add(A);let E=A.geometry.attributes.uv;for(let v=0;v<E.count;v++)E.setXY(v,E.getX(v)/2,E.getY(v)/2)}let u=Ht(7,.32,.34,t.tilesM,.8);u.position.set(0,1.78,-.1),this.roof.add(u);let d=Ht(6.6,.12,.2,t.plasterM,1);d.position.set(0,1.98,-.1),this.roof.add(d);for(let T of[-1,1]){let S=new Ne(new _n(.42,.1,8,14,Math.PI*.6),t.tilesM);S.position.set(T*3.55,1.85,-.1),S.rotation.set(0,T>0?0:Math.PI,.25),S.castShadow=!0,this.roof.add(S);for(let A of[-1,1]){let E=new Ne(new _n(.32,.08,8,12,Math.PI*.55),t.tilesM);E.position.set(T*3.45,.05,A*2.75-.1),E.rotation.set(0,T>0?0:Math.PI,.3),this.roof.add(E)}}let f=new Ne(new It(.2,16,12),t.gold);f.position.set(0,2.18,-.1),this.roof.add(f);let m=new st;m.position.set(0,2.62,2.32),h.add(m),m.add(Object.assign(new Ne(new Ot(2.9,.78,.08),t.lacquer),{castShadow:!0}));let x=new Ne(new Ot(3.04,.9,.05),t.gold);x.position.z=-.02,m.add(x);let g=new Ne(new Vt(2.7,.66),new ze({map:mm(e),transparent:!0,roughness:.35,metalness:.6}));g.position.z=.045,m.add(g);for(let T of[-2.5,2.5]){let S=new Ne(new It(.24,16,12),new ze({color:12065300,emissive:7344136,roughness:.5}));S.scale.y=1.25,l(S,h,T,2.62,2.35),l(c(.12,.12,.06,t.gold,12),h,T,2.95,2.35),l(c(.012,.012,.3,t.iron,6),h,T,3.1,2.35)}let p=new Ne(new It(.42,18,14),t.glaze);p.scale.set(1,1.15,1),p.castShadow=!0,l(p,h,-2.85,1,1.6),l(c(.3,.32,.06,t.woodM,16),h,-2.85,1.48,1.6),l(Ht(1.6,.06,.7,t.woodM,.6),h,2.4,.95,1.55);for(let[T,S]of[[1.7,1.3],[3.1,1.3],[1.7,1.8],[3.1,1.8]])l(c(.035,.035,.4,t.woodM,6),h,T,.75,S);for(let T of[-3.7,3.7]){l(c(.06,.08,6,t.woodM,10),this.group,s.x+i*1.2,3,s.z+T),l(c(.18,.22,.3,t.stoneM,10),this.group,s.x+i*1.2,.15,s.z+T);let S=new Ne(new Vt(1.4,.9,10,4),new ze({color:n,side:Rt,roughness:.8}));S.position.set(s.x+i*1.2-i*.7,5.5,s.z+T),S.castShadow=!0,this.group.add(S),this.flags.push(S)}let b=c(.55,.55,.8,new ze({color:11018266,roughness:.4}),24);b.rotation.z=Math.PI/2,l(b,this.group,s.x+i*1.8,.95,s.z+4.1);for(let T of[-.42,.42]){let S=new Ne(new fi(.5,24),new ze({color:14469280,roughness:.9}));S.rotation.y=T>0?Math.PI/2:-Math.PI/2,l(S,this.group,s.x+i*1.8+T,.95,s.z+4.1)}l(Ht(1.1,.55,.8,t.woodM,.8),this.group,s.x+i*1.8,.27,s.z+4.1),this.gate.position.set(a.x,0,a.z),this.gate.rotation.y=i*Math.PI/2,this.group.add(this.gate);for(let T of[-1.45,1.45]){l(Ht(.62,3.4,.62,t.brickM,1),this.gate,T,1.7,0),l(Ht(.8,.22,.8,t.plasterM,.8),this.gate,T,3.5,0),l(Ht(.75,.3,.75,t.stoneM,.8),this.gate,T,.15,0);let S=new Ne(new It(.22,12,10),t.plasterM);l(S,this.gate,T,3.75,0)}l(Ht(3.6,.3,.55,t.woodM,1),this.gate,0,3.25,0);for(let T of[-1,1]){let S=Ht(4.2,.12,.85,t.tilesM,.9);S.position.set(0,3.62,T*.33),S.rotation.x=T*.6,this.gate.add(S)}l(Ht(4.3,.18,.2,t.tilesM,.8),this.gate,0,3.88,0);for(let T of[-1,1]){let S=new Ne(new _n(.28,.07,8,12,Math.PI*.6),t.tilesM);S.position.set(T*2.2,3.95,0),S.rotation.set(0,T>0?0:Math.PI,.25),this.gate.add(S)}let _=new st;_.position.set(0,2.85,.32),this.gate.add(_),_.add(new Ne(new Ot(1.5,.42,.06),t.lacquer));let y=new Ne(new Vt(1.4,.34),new ze({map:mm(e),transparent:!0,roughness:.35,metalness:.6}));y.position.z=.035,_.add(y);for(let T of[-1,1]){let S=new st;S.position.set(T*1.13,0,0),this.gate.add(S),l(Ht(1.12,2.55,.14,t.woodM,1),S,-T*.57,1.3,0);for(let A of[.5,1.3,2.1])l(Ht(1.12,.12,.18,t.woodM,1),S,-T*.57,A,.02);for(let A of[.5,1.3,2.1])for(let E=0;E<4;E++){let v=new Ne(new It(.035,6,4),t.iron);l(v,S,-T*(.15+E*.27),A,.12)}this.doors.push(S)}for(let T of[-1,1])l(Ht(.5,1.2,2.2,t.brickM,1),this.group,a.x,.6,a.z+T*2.45),l(Ht(.62,.14,2.3,t.plasterM,1),this.group,a.x,1.27,a.z+T*2.45);this.spawnRing=new Ne(new Gi(1.2,1.5,36).rotateX(-Math.PI/2),new vt({color:n,transparent:!0,opacity:.7,blending:zn,depthWrite:!1,toneMapped:!1})),this.spawnRing.position.set(o.x,.04,o.z),this.group.add(this.spawnRing)}set(e){this.gateFrac=e.gateMax?e.gateHp/e.gateMax:1,this.houseFrac=e.houseMax?e.houseHp/e.houseMax:1;let t=e.gateHp<=0,n=e.houseHp<=0;t!==this.gateDown&&(this.gateDown=t,this.gateFallT=0),n!==this.houseDown&&(this.houseDown=n,this.fallT=0)}update(e,t,n,i){let s=Nt[this.team].house,a=Nt[this.team].gate;this.flags.forEach((l,c)=>{let h=l.geometry.attributes.position;for(let u=0;u<h.count;u++){let d=h.getX(u)+.7;h.setZ(u,Math.sin(t*4+d*3+c)*.12*d)}h.needsUpdate=!0}),this.spawnRing.material.opacity=.45+.3*Math.sin(t*3)+Math.min(.4,i*.1),this.gateFallT+=e;let o=(1-this.gateFrac)*.35;if(this.doors.forEach((l,c)=>{let h=c?1:-1;if(this.gateDown){let u=Math.min(1,this.gateFallT/.6);l.rotation.set(-u*1.45,0,0),l.position.y=-u*.05}else l.rotation.set(0,h*o*.6,h*o*.15),l.position.y=0}),this.gate.rotation.z=this.gateDown?Math.min(1,this.gateFallT/.8)*.12:0,this.gateFrac<.4&&!this.gateDown&&Math.random()<e*4&&n.smoke(a.x,2.5,a.z,5919824),this.houseFrac<.5&&Math.random()<e*(this.houseFrac<.25?14:6)&&n.smoke(s.x,4.6,s.z,this.houseFrac<.25?2762276:5919824),this.houseFrac<.25&&Math.random()<e*30&&n.fire(s.x,3.5,s.z),this.fallT+=e,this.houseDown){let l=Math.min(1,this.fallT/1.2);this.roof.position.y=3.35-l*2.2,this.roof.rotation.z=l*.35,this.roof.rotation.x=l*.12,Math.random()<e*20&&n.fire(s.x,1.2,s.z)}else this.roof.position.y=3.35,this.roof.rotation.set(0,0,0)}};function mm(r){let e=document.createElement("canvas");e.width=512,e.height=128;let t=e.getContext("2d"),n=ht[r];t.textAlign="center",t.textBaseline="middle",t.font='bold 76px "Noto Serif", "Times New Roman", Georgia, serif';let i=t.createLinearGradient(0,20,0,108);i.addColorStop(0,"#fff0b0"),i.addColorStop(.5,"#e0b040"),i.addColorStop(1,"#a87818"),t.shadowColor="rgba(40,0,0,0.6)",t.shadowBlur=4,t.shadowOffsetY=2,t.fillStyle=i,t.fillText(n.name.toUpperCase(),256,68);let s=new ln(e);return s.colorSpace=ct,s.anisotropy=8,s}function ym(r){let e=gm??(gm=xm()),t=(n,i,s=16777215,a=1)=>{let o=r.tex.get(i);o&&(n.map=o.map,n.normalMap=o.normal??null,n.roughnessMap=o.rough??null,n.bumpMap=null,n.color.setHex(s),n.roughness=a,n.needsUpdate=!0)};t(e.plasterM,"plaster",15917756),t(e.tilesM,"roof",14196872,.9),t(e.woodM,"wood",13146736,.85),t(e.stoneM,"stone",13157564),t(e.brickM,"brick",16777215)}function vs(r,e=!1){let t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},a={},o=r[0].morphTargetsRelative,l=new Pt,c=0;for(let h=0;h<r.length;++h){let u=r[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,u=[];for(let d=0;d<r.length;++d){let f=r[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=r[d].attributes.position.count}l.setIndex(u)}for(let h in s){let u=vm(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let x=0;x<a[h].length;++x)f.push(a[h][x][d]);let m=vm(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function vm(r){let e,t,n,i=-1,s=0;for(let c=0;c<r.length;++c){let h=r[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}let a=new e(s),o=new Ct(a,t,n),l=0;for(let c=0;c<r.length;++c){let h=r[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<t;m++){let x=h.getComponent(d,m);o.setComponent(d+u,m,x)}}else a.set(h.array,l);l+=h.count*t}return i!==void 0&&(o.gpuType=i),o}function Gu(r,e){if(e===bp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===La||e===El){let t=r.getIndex();if(t===null){let a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}let n=t.count-2,i=[];if(e===La)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}var Gr=class extends vi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Zu(t)}),this.register(function(t){return new ju(t)}),this.register(function(t){return new ad(t)}),this.register(function(t){return new od(t)}),this.register(function(t){return new ld(t)}),this.register(function(t){return new Qu(t)}),this.register(function(t){return new ed(t)}),this.register(function(t){return new td(t)}),this.register(function(t){return new nd(t)}),this.register(function(t){return new Ku(t)}),this.register(function(t){return new id(t)}),this.register(function(t){return new Ju(t)}),this.register(function(t){return new rd(t)}),this.register(function(t){return new sd(t)}),this.register(function(t){return new Yu(t)}),this.register(function(t){return new cd(t)}),this.register(function(t){return new hd(t)})}load(e,t,n,i){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=gs.extractUrlBase(e);a=gs.resolveURL(c,this.path)}else a=gs.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Nr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Sm){try{a[at.KHR_BINARY_GLTF]=new ud(e)}catch(u){i&&i(u);return}s=JSON.parse(a[at.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new yd(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){let u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case at.KHR_MATERIALS_UNLIT:a[u]=new $u;break;case at.KHR_DRACO_MESH_COMPRESSION:a[u]=new dd(s,this.dracoLoader);break;case at.KHR_TEXTURE_TRANSFORM:a[u]=new fd;break;case at.KHR_MESH_QUANTIZATION:a[u]=new pd;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};function uM(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}var at={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Yu=class{constructor(e){this.parser=e,this.name=at.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,h=new de(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],dn);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Hs(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new ml(h),c.distance=u;break;case"spot":c=new pl(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Ki(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},$u=class{constructor(){this.name=at.KHR_MATERIALS_UNLIT}getMaterialType(){return vt}extendParams(e,t,n){let i=[];e.color=new de(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],dn),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,ct))}return Promise.all(i)}},Ku=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},Zu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new se(o,o)}return Promise.all(s)}},ju=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},Ju=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}},Qu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new de(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],dn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,ct)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}},ed=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}},td=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new de().setRGB(o[0],o[1],o[2],dn),Promise.all(s)}},nd=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},id=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new de().setRGB(o[0],o[1],o[2],dn),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,ct)),Promise.all(s)}},sd=class{constructor(e){this.parser=e,this.name=at.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}},rd=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}},ad=class{constructor(e){this.parser=e,this.name=at.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},od=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},ld=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},cd=class{constructor(e){this.name=at.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},hd=class{constructor(e){this.name=at.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==si.TRIANGLES&&c.mode!==si.TRIANGLE_STRIP&&c.mode!==si.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(let m of u){let x=new pe,g=new P,p=new yt,b=new P(1,1,1),_=new Ut(m.geometry,m.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,y),l.SCALE&&b.fromBufferAttribute(l.SCALE,y),_.setMatrixAt(y,x.compose(g,p,b));for(let y in l)if(y==="_COLOR_0"){let T=l[y];_.instanceColor=new ks(T.array,T.itemSize,T.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&m.geometry.setAttribute(y,l[y]);Yt.prototype.copy.call(_,m),this.parser.assignFinalMaterial(_),f.push(_)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},Sm="glTF",Oa=12,_m={JSON:1313821514,BIN:5130562},ud=class{constructor(e){this.name=at.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Oa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Sm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-Oa,s=new DataView(e,Oa),a=0;for(;a<i;){let o=s.getUint32(a,!0);a+=4;let l=s.getUint32(a,!0);if(a+=4,l===_m.JSON){let c=new Uint8Array(e,Oa+a,o);this.content=n.decode(c)}else if(l===_m.BIN){let c=Oa+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},dd=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=at.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=gd[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=gd[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],f=Vr[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let m in f.attributes){let x=f.attributes[m],g=l[m];g!==void 0&&(x.normalized=g)}u(f)},o,c,dn,d)})})}},fd=class{constructor(){this.name=at.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},pd=class{constructor(){this.name=at.KHR_MESH_QUANTIZATION}},Ol=class extends fs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,m=e*c,x=m-c,g=-2*f+3*d,p=f-d,b=1-g,_=p-d+u;for(let y=0;y!==o;y++){let T=a[x+y+o],S=a[x+y+l]*h,A=a[m+y+o],E=a[m+y]*h;s[y]=b*T+_*S+g*A+p*E}return s}},dM=new yt,md=class extends Ol{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return dM.fromArray(s).normalize().toArray(s),s}},si={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Vr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},bm={9728:rn,9729:Qt,9984:bu,9985:ha,9986:ur,9987:ui},Mm={33071:Bn,33648:xa,10497:qt},Wu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},gd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},_s={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},fM={CUBICSPLINE:void 0,LINEAR:Sr,STEP:Er},Xu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function pM(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new ze({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:yi})),r.DefaultMaterial}function Ws(r,e,t){for(let n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ki(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function mM(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function gM(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function xM(r){let e,t=r.extensions&&r.extensions[at.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+qu(t.attributes):e=r.indices+":"+qu(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+qu(r.targets[n]);return e}function qu(r){let e="",t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function xd(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function yM(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var vM=new pe,yd=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new uM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new kr(this.options.manager):this.textureLoader=new gl(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Nr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Ws(s,o,i),Ki(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[at.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,a){n.load(gs.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=Wu[i.type],o=Vr[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new Ct(c,a,l))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],l=Wu[i.type],c=Vr[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0,x,g;if(f&&f!==u){let p=Math.floor(d/f),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,_=t.cache.get(b);_||(x=new c(o,p*f,i.count*f/h),_=new _a(x,f/h),t.cache.add(b,_)),g=new ba(_,l,d%f/h,m)}else o===null?x=new c(i.count*l):x=new c(o,d,i.count*l),g=new Ct(x,l,m);if(i.sparse!==void 0){let p=Wu.SCALAR,b=Vr[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,T=new b(a[1],_,i.sparse.count*p),S=new c(a[2],y,i.sparse.count*l);o!==null&&(g=new Ct(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let A=0,E=T.length;A<E;A++){let v=T[A];if(g.setX(v,S[A*l]),l>=2&&g.setY(v,S[A*l+1]),l>=3&&g.setZ(v,S[A*l+2]),l>=4&&g.setW(v,S[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(s.samplers||{})[a.sampler]||{};return h.magFilter=bm[d.magFilter]||Qt,h.minFilter=bm[d.minFilter]||ui,h.wrapS=Mm[d.wrapS]||qt,h.wrapT=Mm[d.wrapT]||qt,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==rn&&h.minFilter!==Qt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(x){let g=new un(x);g.needsUpdate=!0,d(g)}),t.load(gs.resolveURL(u,s.path),m,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Ki(u,a),u.userData.mimeType=a.mimeType||yM(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[at.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[at.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=s.associations.get(a);a=s.extensions[at.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Sa,Ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Ea,Ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return ze}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],a,o={},l=s.extensions||{},c=[];if(l[at.KHR_MATERIALS_UNLIT]){let u=i[at.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{let u=s.pbrMetallicRoughness||{};if(o.color=new de(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],dn),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,ct)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Rt);let h=s.alphaMode||Xu.OPAQUE;if(h===Xu.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Xu.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==vt&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new se(1,1),s.normalTexture.scale!==void 0)){let u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==vt&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==vt){let u=s.emissiveFactor;o.emissive=new de().setRGB(u[0],u[1],u[2],dn)}return s.emissiveTexture!==void 0&&a!==vt&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,ct)),Promise.all(c).then(function(){let u=new a(o);return s.name&&(u.name=s.name),Ki(u,s),t.associations.set(u,{materials:e}),s.extensions&&Ws(i,u,s),u})}createUniqueName(e){let t=Lt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[at.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Em(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=xM(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[at.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Em(new Pt,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?pM(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,m=h.length;f<m;f++){let x=h[f],g=a[f],p,b=c[f];if(g.mode===si.TRIANGLES||g.mode===si.TRIANGLE_STRIP||g.mode===si.TRIANGLE_FAN||g.mode===void 0)p=s.isSkinnedMesh===!0?new Zo(x,b):new Ne(x,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===si.TRIANGLE_STRIP?p.geometry=Gu(p.geometry,El):g.mode===si.TRIANGLE_FAN&&(p.geometry=Gu(p.geometry,La));else if(g.mode===si.LINES)p=new el(x,b);else if(g.mode===si.LINE_STRIP)p=new Pr(x,b);else if(g.mode===si.LINE_LOOP)p=new tl(x,b);else if(g.mode===si.POINTS)p=new Ir(x,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&gM(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Ki(p,s),g.extensions&&Ws(i,p,g),t.assignFinalMaterial(p),u.push(p)}for(let f=0,m=u.length;f<m;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&Ws(i,u[0],s),u[0];let d=new st;s.extensions&&Ws(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,m=u.length;f<m;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new nn(_i.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new us(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ki(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new pe;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new jo(o,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],m=i.samplers[f.sampler],x=f.target,g=x.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,b=i.parameters!==void 0?i.parameters[m.output]:m.output;x.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",b)),c.push(m),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],m=u[2],x=u[3],g=u[4],p=[];for(let b=0,_=d.length;b<_;b++){let y=d[b],T=f[b],S=m[b],A=x[b],E=g[b];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();let v=n._createAnimationTracks(y,T,S,A,E);if(v)for(let M=0;M<v.length;M++)p.push(v[M])}return new Ur(s,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,vM)});for(let f=0,m=u.length;f<m;f++)h.add(u[f]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new Ma:c.length>1?h=new st:c.length===1?h=c[0]:h=new Yt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),Ki(h,s),s.extensions&&Ws(n,h,s),s.matrix!==void 0){let u=new pe;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new st;n.name&&(s.name=i.createUniqueName(n.name)),Ki(s,n),n.extensions&&Ws(t,s,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);let c=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof Ln||d instanceof un)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){let a=[],o=e.name?e.name:e.uuid,l=[];_s[s.path]===_s.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(_s[s.path]){case _s.weights:c=Wi;break;case _s.rotation:c=Xi;break;case _s.position:case _s.scale:c=qi;break;default:switch(n.itemSize){case 1:c=Wi;break;case 2:case 3:default:c=qi;break}break}let h=i.interpolation!==void 0?fM[i.interpolation]:Sr,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){let m=new c(l[d]+"."+_s[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=xd(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Xi?md:Ol;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function _M(r,e,t){let n=e.attributes,i=new vn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new P(l[0],l[1],l[2]),new P(c[0],c[1],c[2])),o.normalized){let h=xd(Vr[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new P,l=new P;for(let c=0,h=s.length;c<h;c++){let u=s[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){let x=xd(Vr[d.componentType]);l.multiplyScalar(x)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;let a=new wn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function Em(r,e,t){let n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(let a in n){let o=gd[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){let a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return rt.workingColorSpace!==dn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${rt.workingColorSpace}" not supported.`),Ki(r,e),_M(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?mM(r,e.targets,t):r})}var Hl=class extends dl{constructor(e){super(e),this.type=jt}parse(e){let a=function(E,v){switch(E){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(v||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(v||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(v||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(v||""))}},h=`
`,u=function(E,v,M){v=v||1024;let U=E.pos,k=-1,O=0,G="",H=String.fromCharCode.apply(null,new Uint16Array(E.subarray(U,U+128)));for(;0>(k=H.indexOf(h))&&O<v&&U<E.byteLength;)G+=H,O+=H.length,U+=128,H+=String.fromCharCode.apply(null,new Uint16Array(E.subarray(U,U+128)));return-1<k?(M!==!1&&(E.pos+=O+k+1),G+H.slice(0,k)):!1},d=function(E){let v=/^#\?(\S+)/,M=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,C=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,U=/^\s*FORMAT=(\S+)\s*$/,k=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,O={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},G,H;for((E.pos>=E.byteLength||!(G=u(E)))&&a(1,"no header found"),(H=G.match(v))||a(3,"bad initial token"),O.valid|=1,O.programtype=H[1],O.string+=G+`
`;G=u(E),G!==!1;){if(O.string+=G+`
`,G.charAt(0)==="#"){O.comments+=G+`
`;continue}if((H=G.match(M))&&(O.gamma=parseFloat(H[1])),(H=G.match(C))&&(O.exposure=parseFloat(H[1])),(H=G.match(U))&&(O.valid|=2,O.format=H[1]),(H=G.match(k))&&(O.valid|=4,O.height=parseInt(H[1],10),O.width=parseInt(H[2],10)),O.valid&2&&O.valid&4)break}return O.valid&2||a(3,"missing format specifier"),O.valid&4||a(3,"missing image size specifier"),O},f=function(E,v,M){let C=v;if(C<8||C>32767||E[0]!==2||E[1]!==2||E[2]&128)return new Uint8Array(E);C!==(E[2]<<8|E[3])&&a(3,"wrong scanline width");let U=new Uint8Array(4*v*M);U.length||a(4,"unable to allocate buffer space");let k=0,O=0,G=4*C,H=new Uint8Array(4),ee=new Uint8Array(G),X=M;for(;X>0&&O<E.byteLength;){O+4>E.byteLength&&a(1),H[0]=E[O++],H[1]=E[O++],H[2]=E[O++],H[3]=E[O++],(H[0]!=2||H[1]!=2||(H[2]<<8|H[3])!=C)&&a(3,"bad rgbe scanline format");let ie=0,J;for(;ie<G&&O<E.byteLength;){J=E[O++];let xe=J>128;if(xe&&(J-=128),(J===0||ie+J>G)&&a(3,"bad scanline data"),xe){let Le=E[O++];for(let $=0;$<J;$++)ee[ie++]=Le}else ee.set(E.subarray(O,O+J),ie),ie+=J,O+=J}let oe=C;for(let xe=0;xe<oe;xe++){let Le=0;U[k]=ee[xe+Le],Le+=C,U[k+1]=ee[xe+Le],Le+=C,U[k+2]=ee[xe+Le],Le+=C,U[k+3]=ee[xe+Le],k+=4}X--}return U},m=function(E,v,M,C){let U=E[v+3],k=Math.pow(2,U-128)/255;M[C+0]=E[v+0]*k,M[C+1]=E[v+1]*k,M[C+2]=E[v+2]*k,M[C+3]=1},x=function(E,v,M,C){let U=E[v+3],k=Math.pow(2,U-128)/255;M[C+0]=Da.toHalfFloat(Math.min(E[v+0]*k,65504)),M[C+1]=Da.toHalfFloat(Math.min(E[v+1]*k,65504)),M[C+2]=Da.toHalfFloat(Math.min(E[v+2]*k,65504)),M[C+3]=Da.toHalfFloat(1)},g=new Uint8Array(e);g.pos=0;let p=d(g),b=p.width,_=p.height,y=f(g.subarray(g.pos),b,_),T,S,A;switch(this.type){case Tn:A=y.length/4;let E=new Float32Array(A*4);for(let M=0;M<A;M++)m(y,M*4,E,M*4);T=E,S=Tn;break;case jt:A=y.length/4;let v=new Uint16Array(A*4);for(let M=0;M<A;M++)x(y,M*4,v,M*4);T=v,S=jt;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:b,height:_,data:T,header:p.string,gamma:p.gamma,exposure:p.exposure,type:S}}setDataType(e){return this.type=e,this}load(e,t,n,i){function s(a,o){switch(a.type){case Tn:case jt:a.colorSpace=dn,a.minFilter=Qt,a.magFilter=Qt,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,o)}return super.load(e,s,n,i)}};var Bl=class{constructor(){N(this,"ok",!1);N(this,"env",null);N(this,"tex",new Map);N(this,"models",new Map);N(this,"foliage",new Map);N(this,"loader",new kr)}async load(e,t="/"){let n;try{let a=await fetch(t+"hd/manifest.json",{cache:"no-cache"});if(!a.ok)return!1;n=await a.json()}catch{return!1}let i=(a,o)=>a?this.loader.loadAsync(t+a).then(l=>(l.wrapS=l.wrapT=qt,l.anisotropy=8,o&&(l.colorSpace=ct),l)).catch(()=>{}):Promise.resolve(void 0);if(await Promise.all(Object.entries(n.textures).map(async([a,o])=>{let[l,c,h,u]=await Promise.all([i(o.map,!0),i(o.normal,!1),i(o.rough,!1),i(o.ao,!1)]);l&&this.tex.set(a,{map:l,normal:c,rough:h,ao:u})})),n.hdri)try{let a=await new Hl().loadAsync(t+n.hdri),o=new Rr(e);this.env=o.fromEquirectangular(a).texture,a.dispose(),o.dispose()}catch(a){console.warn("Kh\xF4ng n\u1EA1p \u0111\u01B0\u1EE3c b\u1EA7u tr\u1EDDi HDR",a)}let s=new Gr;return await Promise.all(Object.entries(n.models).map(async([a,o])=>{try{this.models.set(a,(await s.loadAsync(t+o)).scene)}catch(l){console.warn("Kh\xF4ng n\u1EA1p \u0111\u01B0\u1EE3c model",o,l)}})),await Promise.all(Object.entries(n.foliage??{}).map(async([a,o])=>{let[l,c,h]=await Promise.all([bM(t+o.leaves_map),i(o.bark_map,!0),i(o.bark_normal,!1)]);l&&c&&this.foliage.set(a,{leaves:MM(l,a.length*7+3),bark:{map:c,normal:h}})})),this.ok=this.tex.size>0,this.ok}material(e,t={}){let n=this.tex.get(e);if(!n)return null;let i=a=>{if(!a)return;let o=a.clone();return o.repeat.set(t.repeat??1,t.repeat??1),o.needsUpdate=!0,o},s=new ze({map:i(n.map),normalMap:i(n.normal),roughnessMap:i(n.rough),aoMap:i(n.ao),color:t.color??16777215,roughness:t.rough??1,metalness:t.metal??0});return t.normalScale&&s.normalScale.setScalar(t.normalScale),s}};function bM(r){return new Promise(e=>{let t=new Image;t.onload=()=>e(t),t.onerror=()=>e(null),t.src=r})}function MM(r,e){let t=r.width,n=r.height,i=document.createElement("canvas");i.width=t,i.height=n;let s=i.getContext("2d");s.drawImage(r,0,0);let a=s.getImageData(0,0,t,n),o=a.data;for(let _=0;_<o.length;_+=4){let y=Math.max(o[_],o[_+1],o[_+2]);o[_+3]=Math.max(0,Math.min(255,(y-14)*9))}s.putImageData(a,0,0);let l=[],c=5,h=2,u=t/c,d=n/h;for(let _=0;_<h;_++)for(let y=0;y<c;y++){let T=y*u,S=_*d,A=s.getImageData(T,S,u,d).data,E=0;for(let v=3;v<A.length;v+=16)A[v]>128&&E++;E>200&&l.push([T,S,u,d])}l.length||l.push([0,0,t,n]);let f=512,m=document.createElement("canvas");m.width=m.height=f;let x=m.getContext("2d"),g=e,p=()=>((g=(Math.imul(g,16807)+11)%2147483647)&2147483647)/2147483647;for(let _=0;_<46;_++){let[y,T,S,A]=l[Math.floor(p()*l.length)],E=p()*Math.PI*2,v=.16+p()*.12,M=f*(.14+p()*.72),C=f*(.14+p()*.72);x.save(),x.translate(M,C),x.rotate(E),x.filter=`brightness(${.62+p()*.55}) saturate(${.85+p()*.3})`,x.drawImage(i,y,T,S,A,-S*v/2,-A*v/2,S*v,A*v),x.restore()}let b=new ln(m);return b.colorSpace=ct,b.anisotropy=4,b.generateMipmaps=!0,b}function Tm(r,e,t,n){let i=r.foliage.get(e);if(!i)return null;let s=t,a=()=>((s=(Math.imul(s,16807)+11)%2147483647)&2147483647)/2147483647,o=[],l=[],c=new P(0,1,0),h=(b,_,y,T)=>{let S=b.distanceTo(_),A=new dt(T,y,S,7,1,!0);A.translate(0,S/2,0);let E=A.attributes.uv;for(let v=0;v<E.count;v++)E.setXY(v,E.getX(v)*1.5,E.getY(v)*S/1.2);A.applyQuaternion(new yt().setFromUnitVectors(c,_.clone().sub(b).normalize())),A.translate(b.x,b.y,b.z),o.push(A)},u=(b,_)=>{for(let y=0;y<2;y++){let T=new Vt(_,_);T.rotateY(a()*Math.PI),T.rotateX((a()-.5)*1.2),T.rotateZ((a()-.5)*.6),T.translate(b.x,b.y,b.z);let S=T.attributes.normal,A=T.attributes.position;for(let E=0;E<S.count;E++){let v=new P(A.getX(E),(A.getY(E)-f)*.7+.6,A.getZ(E)).normalize();S.setXYZ(E,v.x,v.y,v.z)}l.push(T)}},d=n==="tall"?7+a()*2:n==="umbrella"?6+a()*1.5:4.5+a()*1.5,f=n==="tall"?d*.6:d*.85,m=new P((a()-.5)*.6,d*(n==="tall"?.9:.62),(a()-.5)*.6);h(new P(0,-.3,0),m,n==="tall"?.22:.3,.16);let x=n==="tall"?9:7;for(let b=0;b<x;b++){let _=b/x*Math.PI*2+a()*.6,y=m.y*(n==="tall"?.35+b/x*.6:.85+a()*.15),T=n==="umbrella"?2.6+a()*1.2:n==="tall"?.8+a()*.6*(1-b/x):1.6+a()*1,S=new P(m.x*y/m.y,y,m.z*y/m.y),A=S.clone().add(new P(Math.cos(_)*T,(n==="umbrella"?.6:1.2)+a()*.8,Math.sin(_)*T));h(S,A,.1,.04);let E=n==="tall"?5:7;for(let v=0;v<E;v++){let M=A.clone().add(new P((a()-.5)*T*1.1,(a()-.3)*(n==="umbrella"?.7:1.4),(a()-.5)*T*1.1));u(M,(n==="tall"?1.5:1.9)+a()*.8)}}for(let b=0;b<(n==="tall"?10:12);b++){let _=new P((a()-.5)*(n==="tall"?1.6:3.6),f+(a()-.5)*(n==="tall"?d*.5:1.4),(a()-.5)*(n==="tall"?1.6:3.6));u(_,2.2+a())}let g=new ze({map:i.bark.map,normalMap:i.bark.normal,roughness:.95}),p=new ze({map:i.leaves,alphaTest:.42,side:Rt,roughness:.75,transparent:!1});return p.onBeforeCompile=b=>{b.uniforms.uTime=ni.time,b.vertexShader=`uniform float uTime;
`+b.vertexShader.replace("#include <begin_vertex>",`
      vec3 transformed = vec3(position);
      vec3 ip = vec3(instanceMatrix[3][0], 0.0, instanceMatrix[3][2]);
      float h = max(0.0, position.y - 2.0) * 0.06;
      transformed.x += sin(uTime * 1.4 + ip.x * 0.3 + position.y) * h;
      transformed.z += cos(uTime * 1.1 + ip.z * 0.3 + position.x) * h * 0.6;`)},{wood:vs(o),leaves:vs(l),woodMat:g,leafMat:p}}var bs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var Rn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},EM=new us(-1,1,1,-1,0,1),vd=class extends Pt{constructor(){super(),this.setAttribute("position",new je([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new je([0,2,0,0,2,0],2))}},SM=new vd,Mi=class{constructor(e){this._mesh=new Ne(SM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,EM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Wr=class extends Rn{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof _t?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Dn.clone(e.uniforms),this.material=new _t({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Mi(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Ha=class extends Rn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}},zl=class extends Rn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Vl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new se);this._width=n.width,this._height=n.height,t=new en(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:jt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Wr(bs),this.copyPass.material.blending=sn,this.clock=new xl}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let i=0,s=this.passes.length;i<s;i++){let a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Ha!==void 0&&(a instanceof Ha?n=!0:a instanceof zl&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new se);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Ba={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new se},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new pe},cameraProjectionMatrixInverse:{value:new pe},cameraWorldMatrix:{value:new pe},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new P(-1,-1,-1)},sceneBoxMax:{value:new P(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;		
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif
		
		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {  
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {   
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}
		
		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif
			
			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {
				
				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w); 
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));
				
				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));
				
				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);	

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}		

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);		
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},za={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Gl={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function wm(r=5){let e=Math.floor(r)%2===0?Math.floor(r)+1:Math.floor(r),t=TM(e),n=t.length,i=new Uint8Array(n*4);for(let a=0;a<n;++a){let o=t[a],l=2*Math.PI*o/n,c=new P(Math.cos(l),Math.sin(l),0).normalize();i[a*4]=(c.x*.5+.5)*255,i[a*4+1]=(c.y*.5+.5)*255,i[a*4+2]=127,i[a*4+3]=255}let s=new Vi(i,e,e);return s.wrapS=qt,s.wrapT=qt,s.needsUpdate=!0,s}function TM(r){let e=Math.floor(r)%2===0?Math.floor(r)+1:Math.floor(r),t=e*e,n=Array(t).fill(0),i=Math.floor(e/2),s=e-1;for(let a=1;a<=t;){if(i===-1&&s===e?(s=e-2,i=0):(s===e&&(s=0),i<0&&(i=e-1)),n[i*e+s]!==0){s-=2,i++;continue}else n[i*e+s]=a++;s++,i--}return n}var Va={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:_d(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new se},cameraProjectionMatrixInverse:{value:new pe},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;
		
		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}
		
		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1    
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1    
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);
			
			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;
		
			denoised += w * neighborColor;
			totalWeight += w;
		}
		
		void main() {
			float depth = getDepth(vUv.xy);	
			vec3 viewNormal = getViewNormal(vUv);	
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);
		
			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}
		
			if (totalWeight > 0.) { 
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function _d(r,e,t){let n=wM(r,e,t),i="vec3[SAMPLES](";for(let s=0;s<r;s++){let a=n[s];i+=`vec3(${a.x}, ${a.y}, ${a.z})${s<r-1?",":")"}`}return i}function wM(r,e,t){let n=[];for(let i=0;i<r;i++){let s=2*Math.PI*e*i/r,a=Math.pow(i/(r-1),t);n.push(new P(Math.cos(s),Math.sin(s),a))}return n}var Wl=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,t,n){return e[0]*t+e[1]*n}dot3(e,t,n,i){return e[0]*t+e[1]*n+e[2]*i}dot4(e,t,n,i,s){return e[0]*t+e[1]*n+e[2]*i+e[3]*s}noise(e,t){let n,i,s,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,u=(l+c)*h,d=l-u,f=c-u,m=e-d,x=t-f,g,p;m>x?(g=1,p=0):(g=0,p=1);let b=m-g+h,_=x-p+h,y=m-1+2*h,T=x-1+2*h,S=l&255,A=c&255,E=this.perm[S+this.perm[A]]%12,v=this.perm[S+g+this.perm[A+p]]%12,M=this.perm[S+1+this.perm[A+1]]%12,C=.5-m*m-x*x;C<0?n=0:(C*=C,n=C*C*this.dot(this.grad3[E],m,x));let U=.5-b*b-_*_;U<0?i=0:(U*=U,i=U*U*this.dot(this.grad3[v],b,_));let k=.5-y*y-T*T;return k<0?s=0:(k*=k,s=k*k*this.dot(this.grad3[M],y,T)),70*(n+i+s)}noise3d(e,t,n){let i,s,a,o,c=(e+t+n)*.3333333333333333,h=Math.floor(e+c),u=Math.floor(t+c),d=Math.floor(n+c),f=1/6,m=(h+u+d)*f,x=h-m,g=u-m,p=d-m,b=e-x,_=t-g,y=n-p,T,S,A,E,v,M;b>=_?_>=y?(T=1,S=0,A=0,E=1,v=1,M=0):b>=y?(T=1,S=0,A=0,E=1,v=0,M=1):(T=0,S=0,A=1,E=1,v=0,M=1):_<y?(T=0,S=0,A=1,E=0,v=1,M=1):b<y?(T=0,S=1,A=0,E=0,v=1,M=1):(T=0,S=1,A=0,E=1,v=1,M=0);let C=b-T+f,U=_-S+f,k=y-A+f,O=b-E+2*f,G=_-v+2*f,H=y-M+2*f,ee=b-1+3*f,X=_-1+3*f,ie=y-1+3*f,J=h&255,oe=u&255,xe=d&255,Le=this.perm[J+this.perm[oe+this.perm[xe]]]%12,$=this.perm[J+T+this.perm[oe+S+this.perm[xe+A]]]%12,ce=this.perm[J+E+this.perm[oe+v+this.perm[xe+M]]]%12,_e=this.perm[J+1+this.perm[oe+1+this.perm[xe+1]]]%12,he=.6-b*b-_*_-y*y;he<0?i=0:(he*=he,i=he*he*this.dot3(this.grad3[Le],b,_,y));let De=.6-C*C-U*U-k*k;De<0?s=0:(De*=De,s=De*De*this.dot3(this.grad3[$],C,U,k));let We=.6-O*O-G*G-H*H;We<0?a=0:(We*=We,a=We*We*this.dot3(this.grad3[ce],O,G,H));let He=.6-ee*ee-X*X-ie*ie;return He<0?o=0:(He*=He,o=He*He*this.dot3(this.grad3[_e],ee,X,ie)),32*(i+s+a+o)}noise4d(e,t,n,i){let s=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,u,d,f,m,x=(e+t+n+i)*l,g=Math.floor(e+x),p=Math.floor(t+x),b=Math.floor(n+x),_=Math.floor(i+x),y=(g+p+b+_)*c,T=g-y,S=p-y,A=b-y,E=_-y,v=e-T,M=t-S,C=n-A,U=i-E,k=v>M?32:0,O=v>C?16:0,G=M>C?8:0,H=v>U?4:0,ee=M>U?2:0,X=C>U?1:0,ie=k+O+G+H+ee+X,J=a[ie][0]>=3?1:0,oe=a[ie][1]>=3?1:0,xe=a[ie][2]>=3?1:0,Le=a[ie][3]>=3?1:0,$=a[ie][0]>=2?1:0,ce=a[ie][1]>=2?1:0,_e=a[ie][2]>=2?1:0,he=a[ie][3]>=2?1:0,De=a[ie][0]>=1?1:0,We=a[ie][1]>=1?1:0,He=a[ie][2]>=1?1:0,ot=a[ie][3]>=1?1:0,Q=v-J+c,ue=M-oe+c,D=C-xe+c,Ue=U-Le+c,ae=v-$+2*c,we=M-ce+2*c,ge=C-_e+2*c,Xe=U-he+2*c,Ee=v-De+3*c,I=M-We+3*c,w=C-He+3*c,V=U-ot+3*c,Z=v-1+4*c,ne=M-1+4*c,j=C-1+4*c,Ie=U-1+4*c,ye=g&255,Me=p&255,Je=b&255,le=_&255,Ce=o[ye+o[Me+o[Je+o[le]]]]%32,qe=o[ye+J+o[Me+oe+o[Je+xe+o[le+Le]]]]%32,Ye=o[ye+$+o[Me+ce+o[Je+_e+o[le+he]]]]%32,Pe=o[ye+De+o[Me+We+o[Je+He+o[le+ot]]]]%32,lt=o[ye+1+o[Me+1+o[Je+1+o[le+1]]]]%32,$e=.6-v*v-M*M-C*C-U*U;$e<0?h=0:($e*=$e,h=$e*$e*this.dot4(s[Ce],v,M,C,U));let pt=.6-Q*Q-ue*ue-D*D-Ue*Ue;pt<0?u=0:(pt*=pt,u=pt*pt*this.dot4(s[qe],Q,ue,D,Ue));let F=.6-ae*ae-we*we-ge*ge-Xe*Xe;F<0?d=0:(F*=F,d=F*F*this.dot4(s[Ye],ae,we,ge,Xe));let ve=.6-Ee*Ee-I*I-w*w-V*V;ve<0?f=0:(ve*=ve,f=ve*ve*this.dot4(s[Pe],Ee,I,w,V));let Y=.6-Z*Z-ne*ne-j*j-Ie*Ie;return Y<0?m=0:(Y*=Y,m=Y*Y*this.dot4(s[lt],Z,ne,j,Ie)),27*(h+u+d+f+m)}};var Ga=class r extends Rn{constructor(e,t,n,i,s,a,o){super(),this.width=n!==void 0?n:512,this.height=i!==void 0?i:512,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=wm(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new en(this.width,this.height,{type:jt}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new _t({defines:Object.assign({},Ba.defines),uniforms:Dn.clone(Ba.uniforms),vertexShader:Ba.vertexShader,fragmentShader:Ba.fragmentShader,blending:sn,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new cl,this.normalMaterial.blending=sn,this.pdMaterial=new _t({defines:Object.assign({},Va.defines),uniforms:Dn.clone(Va.uniforms),vertexShader:Va.vertexShader,fragmentShader:Va.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new _t({defines:Object.assign({},za.defines),uniforms:Dn.clone(za.uniforms),vertexShader:za.vertexShader,fragmentShader:za.fragmentShader,blending:sn}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new _t({uniforms:Dn.clone(bs.uniforms),vertexShader:bs.vertexShader,fragmentShader:bs.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:bl,blendDst:Or,blendEquation:Jn,blendSrcAlpha:_l,blendDstAlpha:Or,blendEquationAlpha:Jn}),this.blendMaterial=new _t({uniforms:Dn.clone(Gl.uniforms),vertexShader:Gl.vertexShader,fragmentShader:Gl.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:mu,blendSrc:bl,blendDst:Or,blendEquation:Jn,blendSrcAlpha:_l,blendDstAlpha:Or,blendEquationAlpha:Jn}),this.fsQuad=new Mi(null),this.originalClearColor=new de,this.setGBuffer(s?s.depthTexture:void 0,s?s.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new Cr,this.depthTexture.format=hs,this.depthTexture.type=cs,this.normalRenderTarget=new en(this.width,this.height,{minFilter:rn,magFilter:rn,type:jt,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let n=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=_d(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case r.OUTPUT.Off:break;case r.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=sn,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case r.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=sn,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case r.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=sn,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case r.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case r.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=sn,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case r.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=sn,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(e,t,n,i,s){e.getClearColor(this.originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(s||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=o,e.setClearColor(this.originalClearColor),e.setClearAlpha(a)}renderOverride(e,t,n,i,s){e.getClearColor(this.originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,s=t.clearAlpha||s,i!=null&&(e.setClearColor(i),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this.originalClearColor),e.setClearAlpha(a)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){t.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){let i=t.get(n);n.visible=i}),t.clear()}generateNoise(e=64){let t=new Wl,n=e*e*4,i=new Uint8Array(n);for(let a=0;a<e;a++)for(let o=0;o<e;o++){let l=a,c=o;i[(a*e+o)*4]=(t.noise(l,c)*.5+.5)*255,i[(a*e+o)*4+1]=(t.noise(l+e,c)*.5+.5)*255,i[(a*e+o)*4+2]=(t.noise(l,c+e)*.5+.5)*255,i[(a*e+o)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}let s=new Vi(i,e,e,In,di);return s.wrapS=qt,s.wrapT=qt,s.needsUpdate=!0,s}};Ga.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Am={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var Xl=class extends Rn{constructor(){super();let e=Am;this.uniforms=Dn.clone(e.uniforms),this.material=new ll({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Mi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},rt.getTransfer(this._outputColorSpace)===Tt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===gu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===xu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===yu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ia?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===vu?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===_u&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var ql=class extends Rn{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new de}render(e,t,n){let i=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}};var Rm={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new de(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var Xr=class r extends Rn{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new se(e.x,e.y):new se(256,256),this.clearColor=new de(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new en(s,a,{type:jt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new en(s,a,{type:jt});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let f=new en(s,a,{type:jt});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),a=Math.round(a/2)}let o=Rm;this.highPassUniforms=Dn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new _t({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new se(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=bs;this.copyUniforms=Dn.clone(h.uniforms),this.blendMaterial=new _t({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:zn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new de,this.oldClearAlpha=1,this.basic=new vt,this.fsQuad=new Mi(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new se(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=r.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=r.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new _t({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new se(.5,.5)},direction:{value:new se(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new _t({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}};Xr.BlurDirectionX=new se(1,0);Xr.BlurDirectionY=new se(0,1);var Ms={medium:{label:"Medium",pixel:1,shadow:2048,ao:0,bloom:0,msaa:0,detail:.45,skins:80},high:{label:"High",pixel:1.5,shadow:4096,ao:1,bloom:.12,msaa:4,detail:.8,skins:160},ultra:{label:"Ultra",pixel:2,shadow:4096,ao:1,bloom:.14,msaa:4,detail:1,skins:340}},Cm=r=>r==="ultra"?"high":r==="high"?"medium":null,AM={uniforms:{tDiffuse:{value:null},uContrast:{value:1.07},uSat:{value:1.06},uWarm:{value:.045},uVig:{value:.32}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform float uContrast, uSat, uWarm, uVig; varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      vec3 col = (c.rgb - 0.5) * uContrast + 0.5;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, uSat);
      col += vec3(1.0, 0.55, 0.15) * uWarm * smoothstep(0.45, 1.0, l) - vec3(0.15, 0.05, -0.12) * uWarm * (1.0 - smoothstep(0.0, 0.35, l));
      vec2 d = vUv - 0.5; col *= 1.0 - uVig * smoothstep(0.35, 0.85, dot(d, d) * 2.2);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), c.a);
    }`};function bd(r,e,t,n,i,s){let a=Ms[n],o=new en(i,s,{type:jt,samples:a.msaa}),l=new Vl(r,o);if(l.addPass(new ql(e,t)),a.ao){let c=new Ga(e,t,i,s);c.updateGtaoMaterial({radius:.9,distanceExponent:1.6,thickness:1.4,scale:1.1,samples:n==="ultra"?16:10}),c.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:6,rings:2,samples:12}),c.blendIntensity=.85,l.addPass(c)}return a.bloom&&l.addPass(new Xr(new se(i/2,s/2),a.bloom,.35,.92)),l.addPass(new Xl),l.addPass(new Wr(AM)),l}var Nn={pitchMin:.3,pitchMax:1.38,yawMax:1.1,distMin:6,distMax:260},Wn=(r,e,t)=>new P(r,e,t),RM=[Wn(Gt.minX+1,0,Gt.minZ),Wn(Gt.maxX-1,0,Gt.minZ),Wn(Gt.minX+1,0,Gt.maxZ-1),Wn(Gt.maxX-1,0,Gt.maxZ-1),Wn(Nt.trai.house.x-Vu,0,Nt.trai.house.z),Wn(Nt.gai.house.x+Vu,0,Nt.gai.house.z),Wn(Nt.trai.house.x,5.2,Nt.trai.house.z),Wn(Nt.gai.house.x,5.2,Nt.gai.house.z)],CM=r=>$i.path(r).flatMap(e=>[Wn(e.x,0,e.z-2.5),Wn(e.x,0,e.z+2.5)]),Yl=class{constructor(e,t){N(this,"cam");N(this,"mode","auto");N(this,"lane",0);N(this,"manual",!1);N(this,"auto",!1);N(this,"safe",{x0:-1,x1:1,y0:-1,y1:1});N(this,"shake",0);N(this,"tgt",new P(0,0,10));N(this,"pitch",.95);N(this,"yaw",0);N(this,"dist",60);N(this,"gTgt",new P(0,0,10));N(this,"gPitch",.95);N(this,"gYaw",0);N(this,"gDist",60);N(this,"fits",new Map);N(this,"bossUntil",0);N(this,"bossPos",()=>null);N(this,"before","auto");N(this,"combatAt",new P);N(this,"combatOk",!1);N(this,"autoNext",0);N(this,"autoUntil",0);N(this,"focus",new P(0,0,10));N(this,"focusW",0);N(this,"wideUntil",0);N(this,"wideNext",45e3);N(this,"pointers",new Map);N(this,"drag",null);N(this,"pinch",0);N(this,"first",!0);N(this,"onManual",()=>{});N(this,"held",new Set);this.cam=e,t.addEventListener("wheel",i=>{i.preventDefault(),i.ctrlKey||i.shiftKey?this.zoom(Math.exp((i.deltaY||i.deltaX)*.0012)):this.tilt(i.deltaY*.0012)},{passive:!1}),t.addEventListener("contextmenu",i=>i.preventDefault()),t.addEventListener("dblclick",()=>this.reset()),t.addEventListener("pointerdown",i=>{t.setPointerCapture(i.pointerId),this.pointers.set(i.pointerId,{x:i.clientX,y:i.clientY}),this.drag={btn:i.shiftKey?2:i.button},this.pinch=0}),t.addEventListener("pointermove",i=>{let s=this.pointers.get(i.pointerId);if(!s)return;let a={...s};if(s.x=i.clientX,s.y=i.clientY,this.pointers.size>=2){let[c,h]=[...this.pointers.values()],u=Math.hypot(c.x-h.x,c.y-h.y);this.pinch&&this.zoom(this.pinch/Math.max(1,u)),this.pinch=u,this.pan((s.x-a.x)/2,(s.y-a.y)/2);return}if(!this.drag)return;let o=i.clientX-a.x,l=i.clientY-a.y;this.drag.btn===2?this.rotate(o,l):this.pan(o,l)});let n=i=>{this.pointers.delete(i.pointerId),this.pointers.size||(this.drag=null),this.pinch=0};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n)}get base(){return this.cam.aspect<.8?Math.PI/2:0}takeOver(){this.manual||(this.manual=!0,this.onManual()),this.mode==="boss"&&(this.mode=this.before)}zoom(e){this.takeOver(),this.gDist=pi(this.gDist*e,Nn.distMin,Nn.distMax)}pan(e,t){this.takeOver();let n=this.gDist*Math.tan(_i.degToRad(this.cam.fov/2))*2/(typeof innerHeight=="number"?innerHeight:900),i=Wn(Math.cos(this.gYaw),0,-Math.sin(this.gYaw)),s=Wn(-Math.sin(this.gYaw),0,-Math.cos(this.gYaw));this.gTgt.addScaledVector(i,-e*n).addScaledVector(s,t*n/Math.max(.4,Math.sin(this.gPitch))),this.gTgt.x=pi(this.gTgt.x,Gt.minX-30,Gt.maxX+30),this.gTgt.z=pi(this.gTgt.z,Gt.minZ-30,Gt.maxZ+40)}tilt(e){this.takeOver(),this.gPitch=pi(this.gPitch+e,Nn.pitchMin,Nn.pitchMax)}hold(e,t){t?(this.held.add(e),this.takeOver()):this.held.delete(e)}applyHeld(e){if(!this.held.size)return;let t=this.held,n=900*e,i=(t.has("right")?1:0)-(t.has("left")?1:0),s=(t.has("down")?1:0)-(t.has("up")?1:0);(i||s)&&this.pan(-i*n,-s*n),t.has("tiltUp")&&this.tilt(-.9*e),t.has("tiltDown")&&this.tilt(.9*e),t.has("zoomIn")&&this.zoom(Math.exp(-1.2*e)),t.has("zoomOut")&&this.zoom(Math.exp(1.2*e)),t.has("rotL")&&this.rotate(-260*e,0),t.has("rotR")&&this.rotate(260*e,0)}rotate(e,t){this.takeOver(),this.gYaw=pi(this.gYaw-e*.005,this.base-Nn.yawMax,this.base+Nn.yawMax),this.gPitch=pi(this.gPitch+t*.004,Nn.pitchMin,Nn.pitchMax)}reset(){this.manual=!1,this.mode="auto",this.gYaw=this.base,this.onManual()}fixAt(e,t,n,i=.6){this.manual=!0,this.gTgt.set(e,0,t),this.gDist=pi(n,Nn.distMin,Nn.distMax),this.gPitch=pi(i,Nn.pitchMin,Nn.pitchMax),this.gYaw=this.base}setMode(e,t){this.manual=!1,this.mode=e,t!==void 0&&(this.lane=t),this.gYaw=this.base,this.onManual()}boss(e,t=2600){this.manual||(this.mode!=="boss"&&(this.before=this.mode),this.mode="boss",this.bossPos=e,this.bossUntil=performance.now()+t)}setCombat(e){this.combatOk=!!e,e&&this.combatAt.copy(e)}setFocus(e,t){this.focus.copy(e),this.focusW=t}fit(e,t,n,i){let s=n.clone(),a=i,o=this.cam,l=new P,c=Math.tan(_i.degToRad(o.fov/2)),h=this.safe.x1-this.safe.x0,u=this.safe.y1-this.safe.y0,d=(this.safe.x0+this.safe.x1)/2,f=(this.safe.y0+this.safe.y1)/2;for(let m=0;m<18;m++){let x=this.base,g=Math.cos(x),p=-Math.sin(x),b=-Math.sin(x),_=-Math.cos(x);this.place(s,t,x,a);let y=1/0,T=-1/0,S=1/0,A=-1/0,E=!1;for(let U of e)l.copy(U).project(o),l.z>1&&(E=!0),y=Math.min(y,l.x),T=Math.max(T,l.x),S=Math.min(S,l.y),A=Math.max(A,l.y);if(E){a*=1.3;continue}let v=Math.max((T-y)/h,(A-S)/u),M=((y+T)/2-d)*a*c*o.aspect*.8,C=((S+A)/2-f)*a*c/Math.max(.3,Math.sin(t))*.8;s.x+=g*M+b*C,s.z+=p*M+_*C,a=pi(a*Math.pow(v,.85),Nn.distMin,Nn.distMax)}return{tgt:s,d:a}}place(e,t,n,i){let s=this.cam;s.position.set(e.x+Math.sin(n)*Math.cos(t)*i,e.y+Math.sin(t)*i,e.z+Math.cos(n)*Math.cos(t)*i),s.lookAt(e),s.updateMatrixWorld(),s.updateProjectionMatrix()}fitted(e,t,n){let i=`${e}|${this.cam.aspect.toFixed(3)}|${Object.values(this.safe).map(a=>a.toFixed(2)).join(",")}`,s=this.fits.get(i);if(!s){let a=this.fit(t,n,Wn(0,0,10),80);s={tgt:a.tgt,dist:a.d,pitch:n},this.fits.set(i,s),this.fits.size>40&&this.fits.delete(this.fits.keys().next().value)}return s}overview(){return this.fitted("ov",RM,this.cam.aspect<.8?1.12:.86)}update(e,t){this.applyHeld(e);let n=this.cam.aspect<.8;this.mode==="boss"&&t>this.bossUntil&&(this.mode=this.before),this.auto&&!this.manual&&this.mode==="overview"&&this.combatOk&&t>this.autoNext&&(this.mode="combat",this.autoUntil=t+5e3,this.autoNext=t+2e4),this.auto&&this.mode==="combat"&&t>this.autoUntil&&!this.manual&&(this.mode="overview");let i=this.overview(),s=n?.98:.82;if(this.manual){if(this.mode==="boss"){let o=this.bossPos();o&&(this.gTgt.set(o.x,1.6,o.z),this.gDist=n?18:14,this.gPitch=.55)}}else switch(this.mode){case"overview":this.gTgt.copy(i.tgt),this.gDist=i.dist,this.gPitch=i.pitch,this.gYaw=this.base;break;case"auto":{if(t>this.wideNext&&(this.wideUntil=t+6e3,this.wideNext=t+45e3),n||t<this.wideUntil||this.focusW<=0){this.gTgt.copy(i.tgt),this.gDist=i.dist,this.gPitch=i.pitch,this.gYaw=this.base;break}let o=2*Math.atan(Math.tan(_i.degToRad(this.cam.fov/2))*this.cam.aspect),l=pi(this.focusW,n?30:48,200),c=Math.tan(_i.degToRad(this.cam.fov/2))*((this.safe.y1-this.safe.y0)/2)/Math.max(.3,Math.sin(s)),h=Math.min(i.dist,n?l/2/c*1.08:l/2/Math.tan(o/2)*1.08),u=(this.safe.y0+this.safe.y1)/2*h*Math.tan(_i.degToRad(this.cam.fov/2))/Math.max(.3,Math.sin(s)),d=this.base;this.gTgt.set(pi(this.focus.x,Gt.minX+l*.35,Gt.maxX-l*.35)+Math.sin(d)*u,0,this.focus.z+Math.cos(d)*u),this.gDist=h,this.gPitch=s,this.gYaw=this.base;break}case"lane":{let o=this.fitted("lane"+this.lane,CM(this.lane),n?.95:.8);this.gTgt.copy(o.tgt),this.gDist=o.dist,this.gPitch=o.pitch,this.gYaw=this.base;break}case"combat":this.combatOk?(this.gTgt.lerp(this.combatAt,Math.min(1,e*1.5)),this.gDist=n?26:20,this.gPitch=.82,this.gYaw=this.base):this.mode=this.auto?"overview":"auto";break;case"boss":{let o=this.bossPos();o&&(this.gTgt.set(o.x,1.6,o.z),this.gDist=n?18:14,this.gPitch=.55,this.gYaw=this.base);break}}let a=this.first?1:1-Math.exp(-e*(this.mode==="boss"?3:1.6));if(this.first=!1,this.tgt.lerp(this.gTgt,a),this.dist+=(this.gDist-this.dist)*a,this.pitch+=(this.gPitch-this.pitch)*a,this.yaw+=(this.gYaw-this.yaw)*a,this.place(this.tgt,this.pitch,this.yaw,this.dist),this.shake>0){this.shake=Math.max(0,this.shake-e*1.6);let o=this.shake*this.shake*.6;this.cam.position.x+=(Math.random()-.5)*o,this.cam.position.y+=(Math.random()-.5)*o,this.cam.updateMatrixWorld()}}get distance(){return this.dist}get target(){return this.tgt}},pi=(r,e,t)=>Math.max(e,Math.min(t,r));var Wa=new pe,Zi=new P,Xs=new yt,Xa=new P,Xn=new de,Pm=new zt,Md=class{constructor(e,t,n){N(this,"mesh");N(this,"x");N(this,"y");N(this,"z");N(this,"vx");N(this,"vy");N(this,"vz");N(this,"age");N(this,"life");N(this,"size");N(this,"grav");N(this,"grow");N(this,"col");N(this,"next",0);N(this,"cap");this.cap=n,this.mesh=new Ut(e,t,n),this.mesh.frustumCulled=!1,this.mesh.count=0,this.mesh.instanceMatrix.setUsage(Yi),this.mesh.setColorAt(0,Xn.set(1,1,1));let i=()=>new Float32Array(n);this.x=i(),this.y=i(),this.z=i(),this.vx=i(),this.vy=i(),this.vz=i(),this.age=i(),this.life=i(),this.size=i(),this.grav=i(),this.grow=i(),this.col=new Uint32Array(n)}add(e,t,n,i,s,a,o,l,c,h=9,u=0){let d=this.next;this.next=(this.next+1)%this.cap,this.x[d]=e,this.y[d]=t,this.z[d]=n,this.vx[d]=i,this.vy[d]=s,this.vz[d]=a,this.age[d]=0,this.life[d]=o,this.size[d]=l,this.col[d]=c,this.grav[d]=h,this.grow[d]=u}update(e,t){let n=0;for(let i=0;i<this.cap;i++){if(this.life[i]<=0)continue;if(this.age[i]+=e,this.age[i]>=this.life[i]){this.life[i]=0;continue}this.vy[i]-=this.grav[i]*e,this.x[i]+=this.vx[i]*e,this.y[i]+=this.vy[i]*e,this.z[i]+=this.vz[i]*e,this.y[i]<.02&&(this.y[i]=.02,this.vy[i]*=-.25,this.vx[i]*=.7,this.vz[i]*=.7);let s=1-this.age[i]/this.life[i],a=this.size[i]*(t?1+this.grow[i]*(1-s):(1+this.grow[i]*(1-s))*Math.min(1,s*2.2));this.mesh.setMatrixAt(n,Wa.compose(Zi.set(this.x[i],this.y[i],this.z[i]),Xs.identity(),Xa.setScalar(a))),Xn.setHex(this.col[i]),t&&Xn.multiplyScalar(s),this.mesh.setColorAt(n++,Xn)}this.mesh.count=n,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}},Ed=class{constructor(e){N(this,"points");N(this,"pos");N(this,"col");N(this,"size");N(this,"alpha");N(this,"vel");N(this,"age");N(this,"life");N(this,"base");N(this,"grow");N(this,"grav");N(this,"next",0);N(this,"cap");this.cap=e;let t=s=>new Float32Array(e*s);this.pos=t(3),this.col=t(3),this.size=t(1),this.alpha=t(1),this.vel=t(3),this.age=t(1),this.life=t(1),this.base=t(1),this.grow=t(1),this.grav=t(1);let n=new Pt;n.setAttribute("position",new Ct(this.pos,3)),n.setAttribute("color",new Ct(this.col,3)),n.setAttribute("size",new Ct(this.size,1)),n.setAttribute("alpha",new Ct(this.alpha,1));let i=new _t({transparent:!0,depthWrite:!1,fog:!0,uniforms:{...be.fog,uScale:{value:600}},vertexShader:`attribute float size; attribute float alpha; attribute vec3 color; varying vec3 vC; varying float vA;
        #include <fog_pars_vertex>
        uniform float uScale;
        void main(){ vC = color; vA = alpha; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * uScale / -mvPosition.z; gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
        }`,fragmentShader:`varying vec3 vC; varying float vA;
        #include <fog_pars_fragment>
        void main(){ vec2 d = gl_PointCoord - 0.5; float r = dot(d, d) * 4.0; if (r > 1.0) discard; gl_FragColor = vec4(vC, vA * (1.0 - r) * (1.0 - r));
        #include <fog_fragment>
        }`});this.points=new Ir(n,i),this.points.frustumCulled=!1}add(e,t,n,i,s,a,o,l,c,h=.5,u=1.5){let d=this.next;this.next=(this.next+1)%this.cap,this.pos[d*3]=e,this.pos[d*3+1]=t,this.pos[d*3+2]=n,this.vel[d*3]=i,this.vel[d*3+1]=s,this.vel[d*3+2]=a,Xn.setHex(c),this.col[d*3]=Xn.r,this.col[d*3+1]=Xn.g,this.col[d*3+2]=Xn.b,this.age[d]=0,this.life[d]=o,this.base[d]=l,this.grow[d]=u,this.grav[d]=h}update(e){for(let n=0;n<this.cap;n++){if(this.life[n]<=0){this.alpha[n]=0;continue}if(this.age[n]+=e,this.age[n]>=this.life[n]){this.life[n]=0,this.alpha[n]=0;continue}let i=this.age[n]/this.life[n],s=Math.exp(-2.5*e);this.vel[n*3]*=s,this.vel[n*3+2]*=s,this.vel[n*3+1]=this.vel[n*3+1]*s-this.grav[n]*e,this.pos[n*3]+=this.vel[n*3]*e,this.pos[n*3+1]=Math.max(.05,this.pos[n*3+1]+this.vel[n*3+1]*e),this.pos[n*3+2]+=this.vel[n*3+2]*e,this.size[n]=this.base[n]*(1+this.grow[n]*i),this.alpha[n]=Math.min(1,i*6)*(1-i)*.75}let t=this.points.geometry;for(let n of["position","size","alpha","color"])t.attributes[n].needsUpdate=!0}},$l=class{constructor(){N(this,"group",new st);N(this,"sparks",new Md(new Dr(.1,0),new vt({blending:zn,transparent:!0,depthWrite:!1,toneMapped:!1}),1600));N(this,"dust",new Ed(900));N(this,"ringMesh",new Ut(new Gi(.85,1,40).rotateX(-Math.PI/2),new vt({blending:zn,transparent:!0,depthWrite:!1,side:Rt,toneMapped:!1}),48));N(this,"arrowMesh",new Ut(new Ot(.05,.05,.6),new vt({toneMapped:!1}),200));N(this,"pillarMesh",new Ut(new dt(.6,.9,1,20,1,!0).translate(0,.5,0),new vt({blending:zn,transparent:!0,depthWrite:!1,side:Rt,toneMapped:!1}),40));N(this,"slashMesh",new Ut(new Gi(.62,.95,24,1,-1.1,2.2).rotateX(-Math.PI/2),new vt({blending:zn,transparent:!0,depthWrite:!1,side:Rt,toneMapped:!1}),64));N(this,"rings",[]);N(this,"arrows",[]);N(this,"pillars",[]);N(this,"slashes",[]);N(this,"onArrowLand",null);N(this,"budget",1);for(let e of[this.ringMesh,this.arrowMesh,this.pillarMesh,this.slashMesh])e.frustumCulled=!1,e.count=0,e.instanceMatrix.setUsage(Yi),e.setColorAt(0,Xn.set(1,1,1));this.group.add(this.sparks.mesh,this.dust.points,this.ringMesh,this.arrowMesh,this.pillarMesh,this.slashMesh)}setViewport(e,t){this.dust.points.material.uniforms.uScale.value=e/(2*Math.tan(t*Math.PI/360))}n(e){return Math.max(1,Math.round(e*this.budget))}burst(e,t,n,i,s,a,o=.7,l=1){for(let c=0;c<this.n(s);c++)Zi.randomDirection().multiplyScalar(a*(.4+Math.random()*.6)),this.sparks.add(e,t,n,Zi.x,Math.abs(Zi.y)*1.2+a*.3,Zi.z,o*(.6+Math.random()*.6),l,i[c%i.length])}puff(e,t,n,i=12166540,s=.6,a=1.2,o=1){for(let l=0;l<this.n(n);l++){let c=Math.random()*Math.PI*2,h=Math.random()*s;this.dust.add(e+Math.cos(c)*h,.15+Math.random()*.3,t+Math.sin(c)*h,Math.cos(c)*1.2,a*(.4+Math.random()),Math.sin(c)*1.2,.9+Math.random()*.6,o*(1.1+Math.random()*.8),i,.6,1.6)}}smoke(e,t,n,i=3814964){this.dust.add(e+(Math.random()-.5)*.8,t,n+(Math.random()-.5)*.8,(Math.random()-.5)*.4,1.4+Math.random(),(Math.random()-.5)*.4,2.6,1.6,i,-.25,2.6)}fire(e,t,n){this.sparks.add(e+(Math.random()-.5)*1.6,t,n+(Math.random()-.5)*1.2,(Math.random()-.5)*.6,2+Math.random()*1.5,(Math.random()-.5)*.6,.7,2.2,Math.random()<.5?16742938:16761402,-1,-.5)}ring(e,t,n,i,s=.6,a=.08){this.rings.length>40&&this.rings.shift(),this.rings.push({x:e,z:t,r:n,age:0,life:s,color:i,y:a})}pillar(e,t,n,i=!1){this.pillars.length>36&&this.pillars.shift(),this.pillars.push({x:e,z:t,age:0,life:i?1.6:.9,color:n,big:i})}arrow(e,t,n,i,s,a,o=7226408){this.arrows.length>=200&&this.arrows.shift(),this.arrows.push({x0:e,z0:t,x1:n,z1:i,get:a,t:0,dur:Math.max(.08,s/1e3),color:o})}trail(e,t,n){this.dust.add(e+(Math.random()-.5)*.6,.1,t+(Math.random()-.5)*.6,Math.random()-.5,.5+Math.random(),Math.random()-.5,.8,.9,n,.3,1.6)}spawn(e,t,n,i){let s=i>=5;this.pillar(e,t,n,s),this.puff(e,t,s?26:6+i,15261904,s?1.8:.6,1.3,s?1.6:.8),this.burst(e,1,t,[n,16777215,16769162],s?70:8+i*3,s?6:3,.8,s?1.6:1),i>=3&&this.ring(e,t,s?4:1.6,n,.7)}impact(e,t,n,i,s){let a=s?[16777215,12575999]:i?[16769354,16742938,16777215]:[16767392,16777215];this.burst(e,.9,t,a,n?16:i?10:4,n?5:3,.45,n?1.4:.9),this.sparks.add(e,1,t,0,0,0,.09,n?4.5:i?3.4:2.2,s?12575999:i?16765024:16774364,0),s&&this.ring(e,t,.9,12575999,.25,1)}slash(e,t,n,i,s){this.slashes.length>=64&&this.slashes.shift(),this.slashes.push({x:e+Math.sin(n)*.35,y:s?1.25:1.05,z:t+Math.cos(n)*.35,yaw:n,age:0,life:s?.24:.17,color:i,s:s?1.5:1,flip:Math.random()<.5})}muzzle(e,t,n,i,s){let a=e+Math.sin(n)*.5,o=t+Math.cos(n)*.5;this.sparks.add(a,1.2,o,Math.sin(n)*2,.4,Math.cos(n)*2,.12,1.2,16773312,0),i&&(this.ring(e,t,1.4,s,.4,.1),this.burst(a,1.3,o,[16773312,s],6,2,.35,.7))}charge(e,t,n,i){this.ring(e,t,2.2,i,.5),this.ring(e,t,1.3,16777215,.35),this.puff(e-Math.sin(n)*.8,t-Math.cos(n)*.8,16,11771258,1,1.4,1.4);for(let s=0;s<this.n(4);s++)this.dust.add(e+Math.sin(n)*1.4,.9,t+Math.cos(n)*1.4,Math.sin(n)*1.5+(Math.random()-.5),.6,Math.cos(n)*1.5+(Math.random()-.5),.6,.6,15921128,.2,1.5)}gore(e,t,n){this.ring(e,t,1.8,16765562,.45),this.sparks.add(e,1,t,0,0,0,.12,5,16773320,0),this.burst(e,.9,t,[16769184,16777215,11771258],18,6,.5,1.1);for(let i=0;i<this.n(14);i++){let s=n+(Math.random()-.5)*1.6,a=3+Math.random()*5;this.dust.add(e,.3,t,Math.sin(s)*a,1.5+Math.random()*2,Math.cos(s)*a,.8,1.1,11048047,.5,1.8)}}footstep(e,t,n){this.puff(e,t,n?8:4,11048047,n?1.1:.6,.6,n?1.3:.9),n&&this.ring(e,t,1.6,14205850,.4,.06)}stomp(e,t,n){this.ring(e,t,n,16765562,.7),this.ring(e,t,n*.6,16777215,.45),this.puff(e,t,34,11048047,n*.8,1.8,1.5);for(let i=0;i<this.n(18);i++){let s=i/18*Math.PI*2;this.dust.add(e+Math.cos(s)*n*.5,.2,t+Math.sin(s)*n*.5,Math.cos(s)*7,1.2,Math.sin(s)*7,.9,1.4,12100222,.2,2)}}roar(e,t,n,i){this.ring(e,t,n,i,1,1.2),this.ring(e,t,n*.7,16777215,.8,2.2),this.ring(e,t,n*.4,i,.6,3.2)}death(e,t,n){this.puff(e,t,n?30:5,10129280,n?1.8:.4,1,n?1.6:.7),n&&this.burst(e,1.5,t,[16777215,16765773],40,5)}explosion(e,t,n){this.puff(e,n,60,6969930,3,2.5,2.2),this.burst(e,t,n,[16742938,16761402,16777215],120,9,1.2,1.6),this.ring(e,n,6,16752698,1.1)}update(e){this.sparks.update(e,!0),this.dust.update(e);let t=0;this.rings=this.rings.filter(i=>(i.age+=e)<i.life);for(let i of this.rings){let s=i.age/i.life,a=i.r*(.2+.8*Math.sqrt(s));this.ringMesh.setMatrixAt(t,Wa.compose(Zi.set(i.x,i.y,i.z),Xs.identity(),Xa.set(a,1,a))),this.ringMesh.setColorAt(t++,Xn.setHex(i.color).multiplyScalar(1-s))}this.ringMesh.count=t,t=0,this.pillars=this.pillars.filter(i=>(i.age+=e)<i.life);for(let i of this.pillars){let s=i.age/i.life,a=(i.big?1.6:.7)*(1-s*.5),o=(i.big?14:6)*Math.min(1,s*4);this.pillarMesh.setMatrixAt(t,Wa.compose(Zi.set(i.x,0,i.z),Xs.identity(),Xa.set(a,o,a))),this.pillarMesh.setColorAt(t++,Xn.setHex(i.color).multiplyScalar((1-s)*.8))}this.pillarMesh.count=t,t=0,this.arrows=this.arrows.filter(i=>(i.t+=e)<i.dur?!0:(this.puff(i.x1,i.z1,2,12166540,.2,.6,.6),this.sparks.add(i.x1,.9,i.z1,0,1,0,.12,1,16771248,2),this.onArrowLand?.(i.x1,i.z1),!1));let n=(this.arrows.length>80?.15:.4)*this.budget;for(let i of this.arrows){let s=i.get?.();s&&(i.x1=s.x,i.z1=s.z);let a=i.t/i.dur,o=i.x0+(i.x1-i.x0)*a,l=i.z0+(i.z1-i.z0)*a,c=1.15+Math.sin(a*Math.PI)*Math.min(2.2,Math.hypot(i.x1-i.x0,i.z1-i.z0)*.18),h=Math.cos(a*Math.PI)*Math.PI*Math.min(2.2,Math.hypot(i.x1-i.x0,i.z1-i.z0)*.18),u=Math.hypot(i.x1-i.x0,i.z1-i.z0)||1;Xs.setFromEuler(Pm.set(-Math.atan2(h,u),Math.atan2(i.x1-i.x0,i.z1-i.z0),0,"YXZ")),this.arrowMesh.setMatrixAt(t,Wa.compose(Zi.set(o,c,l),Xs,Xa.set(1,1,1))),this.arrowMesh.setColorAt(t++,Xn.setHex(i.color)),Math.random()<n&&this.sparks.add(o,c,l,0,0,0,.16,.55,16773832,0,-.8)}this.arrowMesh.count=t,t=0,this.slashes=this.slashes.filter(i=>(i.age+=e)<i.life);for(let i of this.slashes){let s=i.age/i.life,a=i.s*(.7+.5*s);Xs.setFromEuler(Pm.set(i.flip?.35:-.35,i.yaw+(i.flip?-1:1)*(s-.5)*1.4-Math.PI/2,0,"YXZ")),this.slashMesh.setMatrixAt(t,Wa.compose(Zi.set(i.x,i.y,i.z),Xs,Xa.set(a,a,a))),this.slashMesh.setColorAt(t++,Xn.setHex(i.color).multiplyScalar((1-s)*1.2))}this.slashMesh.count=t;for(let i of[this.ringMesh,this.arrowMesh,this.pillarMesh,this.slashMesh])i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)}};var Kl={danbinh:1.75,xathu:1.95,dausi:2.3,xechien:2.5,trau:3.1,voi:5.4},PM={danbinh:1.1,xathu:1.2,dausi:1.4,xechien:1.8,trau:2.3,voi:4},jl=r=>Kl[r],bn=class{constructor(e,t,n,i){N(this,"mesh");N(this,"n",0);N(this,"cap");this.cap=n,this.mesh=new Ut(e,t,n),this.mesh.instanceMatrix.setUsage(Yi),this.mesh.frustumCulled=!1,this.mesh.castShadow=i,this.mesh.receiveShadow=!1,this.mesh.setColorAt(0,new de(1,1,1)),this.mesh.count=0}push(e,t){this.n>=this.cap||(this.mesh.setMatrixAt(this.n,e),this.mesh.setColorAt(this.n,t),this.n++)}end(){this.mesh.count=this.n,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0),this.n=0}},kn=new P,Ei=new yt,qn=new P,Sd=new zt,Yn=new de,IM=new de(1,1,1),Im=new P,Dm=new pe,L=new pe,qr=new pe,Lm=new pe,Mt=Array.from({length:14},()=>new pe),Re=(r,e,t,n=0,i=0,s=0,a=1,o=1,l=1)=>Dm.compose(kn.set(r,e,t),Ei.setFromEuler(Sd.set(n,i,s)),qn.set(a,o,l)),fe=(r,e,t,n,i,s)=>Dm.compose(kn.set(r,e,t),Ei.identity(),qn.set(n,i,s)),it=Math.PI,Td=0,K=r=>(Yn.setHex(r),Td>0&&Yn.lerp(IM,Td),Yn),LM=r=>(r=Math.imul(r^2654435769,2246822507),r^=r>>>13,r=Math.imul(r,3266489909),((r^r>>>16)>>>0)/4294967296),qa=()=>({legL:0,legR:0,armL:.05,armR:.05,armLz:.15,armRz:-.15,bend:0,bob:0,sit:!1,head:0,spin:0}),DM=[15911332,15382932,14921094,16110518],UM=[16762938,14674175,14715466,11565823],Zl=class{constructor(e){N(this,"group",new st);N(this,"units",new Map);N(this,"frameAt",0);N(this,"tickMs",100);N(this,"drawn",0);N(this,"culled",0);N(this,"winner","");N(this,"models",null);N(this,"honor",new Map);N(this,"P");N(this,"frustum",new Ns);N(this,"pm",new pe);N(this,"sphere",new wn);N(this,"camPos",new P);N(this,"quat",new yt);N(this,"lastNow",0);N(this,"dt",.016);N(this,"gold");N(this,"goldSph");N(this,"goldCone");N(this,"goldBand");N(this,"plated",new Set);let t=new ze({roughness:.6,metalness:.02}),n=new ze({roughness:.32,metalness:.75}),i=s=>new vt({toneMapped:!1,...s});this.P={box:new bn(new Ot(1,1,1),t,9e3,e),sph:new bn(new It(.5,16,12),t,11e3,e),cyl:new bn(new dt(.5,.5,1,14),t,9e3,e),frus:new bn(new dt(.4,.5,1,14),t,2400,e),cone:new bn(new ds(.5,1,16),t,5e3,e),tor:new bn(new _n(.5,.14,8,18,Math.PI),t,1200,e),band:new bn(new _n(.5,.1,8,24),t,3e3,e),glow:new bn(new Dr(.5,0),i({blending:zn,transparent:!0,depthWrite:!1}),900,!1),ring:new bn(new Gi(.78,1,28).rotateX(-Math.PI/2),i({transparent:!0,opacity:.85,depthWrite:!1,side:Rt}),800,!1),bar:new bn(new Vt(1,1),i({transparent:!0,depthWrite:!1,depthTest:!1}),900,!1)},this.gold=new bn(new Ot(1,1,1),n,3e3,e),this.goldSph=new bn(new It(.5,12,8),n,2400,e),this.goldCone=new bn(new ds(.5,1,10),n,1200,e),this.goldBand=new bn(new _n(.5,.1,8,24),n,1500,e),this.P.bar.mesh.renderOrder=20,this.P.ring.mesh.renderOrder=2;for(let s of[...Object.values(this.P),this.gold,this.goldSph,this.goldCone,this.goldBand])this.group.add(s.mesh)}add(e,t,n,i){let s=this.units.get(e.id);if(s)s.info=e;else{let a=Wt[e.kind];s={id:e.id,info:e,def:a,team:e.team,px:t,pz:n,py:0,pyaw:0,x:t,z:n,y:0,yaw:e.team==="trai"?it/2:-it/2,rx:t,rz:n,ry:0,ryaw:0,hp:e.maxHp,state:"spawn",flags:0,stateAt:i,seen:0,atkAt:-1e9,atkV:0,hitAt:-1e9,spawnAt:i,deadAt:0,killAt:-1e9,skill:"",skillAt:-1e9,odo:0,seed:LM(e.id),lod:0,visible:!1,dmgAt:-1e9,speed:0},s.pyaw=s.ryaw=s.yaw,this.units.set(e.id,s)}return s}applyFrame(e,t,n){let i=0;for(let s=0;s<e.length;s+=fm){let a=this.units.get(e[s]);if(!a){i++;continue}a.px=a.rx,a.pz=a.rz,a.py=a.ry,a.pyaw=a.ryaw,a.x=e[s+1]/100,a.z=e[s+2]/100,a.y=e[s+3]/100,a.yaw=e[s+4]/100,a.hp=e[s+5];let o=pm[e[s+6]]??"move";o!==a.state&&(a.state=o,a.stateAt=n,o==="dead"&&(a.deadAt=n)),a.flags=e[s+7],a.seen=t}for(let[s,a]of this.units)a.seen!==t&&n-a.spawnAt>400&&this.units.delete(s);return this.frameAt=n,i}clear(){this.units.clear()}draw(e,t){this.dt=Math.min(.1,Math.max(.001,(t-this.lastNow)/1e3)),this.lastNow=t;let n=Math.min(1,Math.max(0,(t-this.frameAt)/this.tickMs));this.pm.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.pm),e.getWorldPosition(this.camPos),this.quat.copy(e.quaternion),this.drawn=this.culled=0,this.models?.beginFrame();for(let i of this.units.values()){let s=i.rx,a=i.rz;i.rx=i.px+(i.x-i.px)*n,i.rz=i.pz+(i.z-i.pz)*n,i.ry=i.py+(i.y-i.py)*n,i.ryaw=NM(i.pyaw,i.yaw,n);let o=Math.hypot(i.rx-s,i.rz-a);if(i.odo+=o,i.speed+=(o/this.dt-i.speed)*.2,this.sphere.center.set(i.rx,1,i.rz),this.sphere.radius=PM[i.info.kind],i.visible=this.frustum.intersectsSphere(this.sphere),!i.visible){this.culled++;continue}let l=this.camPos.distanceTo(this.sphere.center);i.lod=l<34?0:l<70?1:2,this.drawUnit(i,t),this.drawn++}for(let i of[...Object.values(this.P),this.gold,this.goldSph,this.goldCone,this.goldBand])i.end();this.models?.endFrame()}drawUnit(e,t){let n=(e.lod===2?Math.floor(t/83)*83:t)/1e3+e.seed*10;Td=t-e.hitAt<110?.55:0;let i=e.state==="dead",s=(t-e.deadAt)/1e3,a=Math.min(1,(t-e.spawnAt)/650),o=a<1?Math.max(.05,1-Math.pow(1-a,3)*Math.cos(a*9)):1,l=i?Math.min(1,s/.45):0,c=i?Math.max(0,s-.7)*1.2:0,h=e.seed>.5?1:-1;qr.compose(kn.set(e.rx,e.ry-c,e.rz),Ei.setFromEuler(Sd.set(0,e.ryaw,l*1.45*h,"YXZ")),qn.setScalar(o));let u=ht[e.team].color;if(!i){let d=e.def.radius*1.25*o;if(this.P.ring.push(L.compose(kn.set(e.rx,.03,e.rz),Ei.identity(),qn.set(d,1,d)),Yn.setHex(u)),e.def.boss){let m=d*(1.25+Math.sin(t/180)*.08);this.P.ring.push(L.compose(kn.set(e.rx,.035,e.rz),Ei.identity(),qn.set(m,1,m)),Yn.setHex(16765773))}let f=this.honor.get(e.info.owner);if(f){let m=UM[Math.min(f,4)-1],x=d*(1.5+Math.sin(t/240+e.seed*6)*.12);if(this.P.ring.push(L.compose(kn.set(e.rx,.04,e.rz),Ei.identity(),qn.set(x,1,x)),Yn.setHex(m)),this.P.ring.push(L.compose(kn.set(e.rx,.045,e.rz),Ei.identity(),qn.set(x*.72,1,x*.72)),Yn.setHex(m)),e.lod<2)for(let g=0;g<(f<=3?4:2);g++){let p=t/700+g*1.57+e.seed*9,b=(t/900+g*.25+e.seed)%1*Kl[e.info.kind]*1.1;this.P.glow.push(L.compose(kn.set(e.rx+Math.cos(p)*x*.8,b,e.rz+Math.sin(p)*x*.8),Ei.identity(),qn.setScalar(.09)),Yn.setHex(m))}}}if(!this.drawModel(e,t,i,c,o))switch(e.info.kind){case"danbinh":case"xathu":case"dausi":this.infantry(e,n,t);break;case"xechien":this.cart(e,n,t);break;case"trau":this.buffalo(e,n,t);break;case"voi":this.elephant(e,n,t);break}!i&&e.flags&ii.stun&&this.stars(e,t),i||this.hpBar(e,t)}drawModel(e,t,n,i,s){let a=this.models,o=a?.entries.get(e.info.kind);if(!a||!o)return!1;let l=(t-e.atkAt)/1e3,c=e.speed>.4;if(o.skinned){if(e.lod===2&&!e.def.boss)return!1;Lm.compose(kn.set(e.rx,e.ry-(n?Math.max(0,(t-e.deadAt)/1e3-1.6):0),e.rz),Ei.setFromEuler(Sd.set(0,e.ryaw,0)),qn.setScalar(s));let d=n?"death":l<e.def.windup+.5?"attack":t-e.hitAt<250?"hit":c?"walk":"idle";return a.drawSkinned(e.info.kind,e.id,e.team,Lm,d,e.atkAt,e.speed,this.dt)}let h=c?Math.abs(Math.sin(e.odo*3))*.06:0,u=l<.7?Math.sin(Math.min(1,l/.7)*it)*.3:0;return L.multiplyMatrices(qr,Re(0,h,u,l<.7?u*.3:0,0,0)),a.drawStatic(e.info.kind,L,e.team),!0}lookOf(e){let t=e.info.kind,n=e.seed,i=ht[e.team].color,a={skin:DM[Math.floor(n*4)%4],shirt:9067059,sleeve:9067059,pants:13482383,boots:5913122,hair:4861468,hairStyle:"bun",hat:"none",hatColor:0,team:i,armor:!1,ragged:!1,cheeks:!1,angry:!0,belt:9071168,skirt:0};return t==="danbinh"?{...a,shirt:[9067059,8015404,9658936][Math.floor(n*97)%3],sleeve:14271642,ragged:!0,skirt:8015404,hat:n>.75?"khan":"none",hatColor:i}:t==="xathu"?{...a,shirt:15721932,sleeve:15721932,pants:6122328,boots:6965806,hairStyle:"short",hat:"non",hatColor:14200930,cheeks:!0,angry:!1,belt:11569738,skirt:6122328}:{...a,shirt:5857646,sleeve:5857646,pants:2895670,boots:2761760,hair:1971216,hairStyle:"short",hat:"helm",hatColor:9081502,armor:!0,belt:6965806}}human(e,t,n,i){let s=this.P,a=Mt[0].copy(e).multiply(Re(0,n.bob+(n.sit?-.18:0),0,0,n.spin,0)),o=(u,d,f)=>{let m=Mt[f].copy(a).multiply(Re(u,.46,0,n.sit?-1.45:d,0,0));L.multiplyMatrices(m,fe(0,-.2,0,.17,.42,.17)),s.cyl.push(L,K(t.pants)),L.multiplyMatrices(m,fe(0,-.44,.04,.19,.14,.27)),s.sph.push(L,K(t.boots))};o(-.11,n.legL,1),o(.11,n.legR,2);let l=Mt[3].copy(a).multiply(Re(0,.46,0,n.bend,0,0));if(L.multiplyMatrices(l,fe(0,.2,0,.48,.44,.38)),s.frus.push(L,K(t.shirt)),t.skirt&&(L.multiplyMatrices(l,Re(0,-.02,0,it,0,0,.5,.18,.42)),s.frus.push(L,K(t.skirt))),t.ragged&&i<2){for(let u=0;u<6;u++){let d=u/6*it*2+.3;L.multiplyMatrices(l,Re(Math.sin(d)*.22,-.13,Math.cos(d)*.19,it,0,0,.1,.12,.06)),s.cone.push(L,K(u%2?6963748:t.shirt))}L.multiplyMatrices(l,fe(.09,.26,.17,.12,.11,.03)),s.box.push(L,K(14271642)),L.multiplyMatrices(l,fe(-.11,.06,.19,.1,.09,.03)),s.box.push(L,K(13217926)),L.multiplyMatrices(l,Re(-.06,.36,.15,0,0,.5,.2,.1,.04)),s.box.push(L,K(14271642))}if(t.armor){L.multiplyMatrices(l,fe(0,.24,.17,.4,.32,.06)),s.box.push(L,K(t.team));for(let u of[-.27,.27])L.multiplyMatrices(l,fe(u,.42,0,.24,.17,.24)),this.goldSph.push(L,K(10134190))}else t.ragged?(L.multiplyMatrices(l,Re(0,.25,0,0,0,-.62,.52,.05,.4)),s.box.push(L,K(t.team))):(L.multiplyMatrices(l,Re(.03,.27,.17,0,0,.55,.06,.34,.04)),s.box.push(L,K(14208176)),L.multiplyMatrices(l,Re(0,.25,0,0,0,.62,.52,.06,.4)),s.box.push(L,K(t.team)));L.multiplyMatrices(l,Re(0,.04,0,it/2,0,0,.5,.5,.55)),s.band.push(L,K(t.belt));let c=(u,d,f,m)=>{let x=Mt[m].copy(l).multiply(Re(u,.36,0,d,0,f));L.multiplyMatrices(x,fe(0,-.16,0,.14,.34,.14)),s.cyl.push(L,K(t.armor?5857646:t.sleeve)),L.multiplyMatrices(x,fe(0,-.36,0,.15,.15,.15)),s.sph.push(L,K(t.skin)),x.multiply(Re(0,-.37,0))};c(-.27,n.armL,n.armLz,6),c(.27,n.armR,n.armRz,5);let h=Mt[4].copy(l).multiply(Re(0,.78,0,n.head*.4,n.head,0));if(L.multiplyMatrices(h,fe(0,0,0,.84,.8,.8)),s.sph.push(L,K(t.skin)),i<2){for(let u of[-1,1])L.multiplyMatrices(h,fe(u*.14,0,.35,.09,.13,.05)),s.sph.push(L,K(2758156)),L.multiplyMatrices(h,fe(u*.125,.035,.375,.03,.035,.02)),s.sph.push(L,K(16777215)),L.multiplyMatrices(h,Re(u*.14,.15,.36,0,0,t.angry?u*.35:-u*.12,.14,.035,.03)),s.box.push(L,K(3809814)),L.multiplyMatrices(h,fe(u*.42,-.02,0,.1,.15,.09)),s.sph.push(L,K(t.skin)),t.cheeks&&(L.multiplyMatrices(h,fe(u*.22,-.11,.31,.11,.06,.03)),s.sph.push(L,K(16095910)));L.multiplyMatrices(h,fe(0,-.17,.37,t.angry?.1:.08,.025,.02)),s.box.push(L,K(9058860))}if(t.hat!=="helm"&&(L.multiplyMatrices(h,fe(0,.08,-.05,.88,.8,.84)),s.sph.push(L,K(t.hair)),t.hairStyle==="bun"&&t.hat!=="non"&&(L.multiplyMatrices(h,fe(0,.52,-.06,.32,.3,.32)),s.sph.push(L,K(t.hair)),L.multiplyMatrices(h,fe(0,.38,-.05,.2,.06,.2)),s.cyl.push(L,K(11569738)))),t.hat==="non"){if(L.multiplyMatrices(h,fe(0,.48,0,1.95,.5,1.95)),s.cone.push(L,K(t.hatColor)),i<2)for(let u of[.62,.85])L.multiplyMatrices(h,Re(0,.48-.25*u+.25,0,it/2,0,0,1.95*(1-u)+.02,1.95*(1-u)+.02,.2)),s.band.push(L,K(11569738));L.multiplyMatrices(h,Re(0,.23,0,it/2,0,0,1.94,1.94,.25)),s.band.push(L,K(11898960))}else t.hat==="khan"?(L.multiplyMatrices(h,fe(0,.28,-.02,.9,.12,.9)),s.cyl.push(L,K(t.hatColor))):t.hat==="turban"?(L.multiplyMatrices(h,fe(0,.32,-.02,.95,.42,.95)),s.sph.push(L,K(t.hatColor)),L.multiplyMatrices(h,fe(0,.38,.4,.14,.18,.08)),this.goldSph.push(L,K(15911244))):t.hat==="helm"&&(L.multiplyMatrices(h,fe(0,.12,-.02,.92,.72,.92)),this.goldSph.push(L,K(t.hatColor)),L.multiplyMatrices(h,fe(0,.5,-.02,.08,.18,.5)),s.box.push(L,K(t.team)))}infantry(e,t,n){let i=e.info.kind,s=this.lookOf(e),a=qa(),o=this.P,l=e.odo*3.4,c=Math.sin(l),h=e.speed>.35&&e.state!=="attack",u=(n-e.atkAt)/1e3/e.def.windup,d=u>=0&&u<1.6&&e.state!=="dead",f=(n-e.skillAt)/1e3;if(h?(a.legL=c*.65,a.legR=-c*.65,a.armL=-c*.5,a.armR=c*.5,a.bob=Math.abs(c)*.05):(a.armL=a.armR=.06+Math.sin(t*1.6)*.04,a.bob=Math.sin(t*2)*.01),i==="xathu"){a.armL=-1.45,a.armLz=.1;let p=d?u<1?u:Math.max(0,1-(u-1)*3):0;a.armR=-1.35+p*.15,a.armRz=.2+p*.55,h&&!d&&(a.armL=-.9+c*.1,a.armR=c*.4,a.armRz=-.15)}else if(i==="dausi"){if(a.armL=-1.1,a.armLz=.35,e.flags&ii.block&&(a.armL=-1.45,a.armLz=.1,a.bend=.1),d&&(a.armR=u<1?-2.9*u:-2.9+Math.min(1,(u-1)*4)*2.4,a.bend=u<1?-.15*u:.25),e.skill==="slam"&&f<1){let p=Math.min(1,f/.55);a.armR=f<.55?-3.1*p:-.5,a.armL=f<.55?-2.6*p:-.6,a.bend=f<.55?-.2:.45,a.bob=f<.55?p*.25:0}}else a.armR=h?c*.5-.3:-.35,d&&(e.atkV===0?(a.armL=u<1?.6*u:-1.6,a.spin=u<1?.3*u:-.25):e.atkV===1?(a.legR=u<1?.4*u:-1.5,a.legL=.15,a.bend=-.15,a.armL=-.5,a.armLz=.6):(a.armR=u<1?-3*u:-.5,a.bend=u<1?-.1:.2));e.state==="cheer"&&this.cheerPose(e,a,t),(e.flags&ii.air||e.flags&ii.stun)&&(a.armL=a.armR=-2.6+Math.sin(t*14)*.4,a.armLz=.5,a.armRz=-.5,a.legL=Math.sin(t*12)*.5,a.legR=-a.legL,a.head=Math.sin(t*9)*.3);let m=i==="dausi"?1.2:.95;this.human(Mt[11].copy(qr).multiply(fe(0,0,0,m,m,m)),s,a,e.lod);let x=Mt[5],g=Mt[6];if(i==="danbinh")L.multiplyMatrices(x,Re(0,0,.3,-it/2,0,0,.19,.72,.19)),o.cone.push(L,K(10119742)),e.lod<2&&(L.multiplyMatrices(x,fe(.07,.03,.55,.09,.08,.09)),o.sph.push(L,K(8015920)),L.multiplyMatrices(x,fe(-.06,-.04,.45,.08,.07,.08)),o.sph.push(L,K(8015920)));else if(i==="xathu"){Im.setFromMatrixPosition(g);let p=Mt[12].copy(Mt[3]).setPosition(Im);L.multiplyMatrices(p,Re(0,0,-.38,0,it/2,it/2,.82,.82,.45)),o.tor.push(L,K(8014374));let b=(n-e.atkAt)/1e3/e.def.windup,_=b>=0&&b<1?b:0;if(e.lod<2&&(L.multiplyMatrices(p,fe(0,0,-.38-_*.25,.012,.8,.012)),o.box.push(L,K(15788248))),_>.05&&(L.multiplyMatrices(p,fe(0,0,-.1-_*.25,.025,.025,.7)),o.box.push(L,K(7226408)),L.multiplyMatrices(p,Re(0,0,.27-_*.25,it/2,0,0,.06,.1,.06)),o.cone.push(L,K(13159634))),e.lod<2){L.multiplyMatrices(Mt[3],Re(.15,.28,-.24,.35,0,-.2,.15,.5,.15)),o.cyl.push(L,K(7226408));for(let[y,T]of[[.1,-.31],[.17,-.34],[.22,-.3]])L.multiplyMatrices(Mt[3],Re(y,.58,T,.35,0,-.2,.04,.14,.02)),o.box.push(L,K(16777215))}}else i==="dausi"&&(L.multiplyMatrices(x,Re(0,0,.25,it/2,0,0,.06,.85,.06)),o.cyl.push(L,K(7226408)),L.multiplyMatrices(x,fe(0,0,.66,.34,.22,.22)),this.gold.push(L,K(5922922)),L.multiplyMatrices(g,Re(-.04,.02,.12,it/2,0,0,.74,.07,.74)),o.cyl.push(L,K(e.flags&ii.block?16777215:s.team)),L.multiplyMatrices(g,Re(-.04,.02,.15,0,0,0,.74,.74,.5)),this.goldBand.push(L,K(15911244)),L.multiplyMatrices(g,fe(-.04,.02,.18,.2,.2,.1)),this.goldSph.push(L,K(15911244)))}cheerPose(e,t,n){this.winner===e.team||this.winner==="draw"?(t.armL=t.armR=it-.35+Math.sin(n*10)*.25,t.armLz=.25,t.armRz=-.25,t.bob=Math.abs(Math.sin(n*8))*.25,t.legL=t.legR=0):this.winner&&(t.bend=.5,t.armL=t.armR=-.4,t.head=-.3,t.sit=!1,t.legL=-.6,t.legR=.2)}cart(e,t,n){let i=this.P,s=ht[e.team].color,a=!!(e.flags&ii.boost),o=(n-e.atkAt)/1e3/e.def.windup,l=o>=0&&o<1.6?Math.sin(Math.min(1,o/1.6)*it)*.35:0,c=Mt[11].copy(qr).multiply(Re(0,Math.abs(Math.sin(e.odo*4))*.03,l,a?-.05:0,0,0));L.multiplyMatrices(c,fe(0,.55,0,1.3,.14,1.9)),i.box.push(L,K(7226408));for(let f=0;f<4;f++)L.multiplyMatrices(c,fe(0,.63,-.75+f*.5,1.32,.03,.04)),i.box.push(L,K(4860952));for(let f of[-.64,.64]){L.multiplyMatrices(c,fe(f,.86,-.05,.08,.5,1.7)),i.box.push(L,K(9067059)),L.multiplyMatrices(c,fe(f*1.02,.95,-.05,.03,.14,1.6)),i.box.push(L,K(s));for(let m of[-.7,0,.7])L.multiplyMatrices(c,fe(f*1.04,.78,m,.05,.05,.05)),this.goldSph.push(L,K(12088115))}L.multiplyMatrices(c,fe(0,.86,-.88,1.3,.5,.08)),i.box.push(L,K(9067059)),L.multiplyMatrices(c,fe(0,.82,.9,1.3,.42,.12)),i.box.push(L,K(5913122)),L.multiplyMatrices(c,Re(0,.66,1.25,it/2,0,0,.42,.7,.42)),this.goldCone.push(L,K(12088115));for(let f of[-.4,.4])L.multiplyMatrices(c,Re(f,.8,1.1,it/2,0,0,.14,.45,.14)),this.goldCone.push(L,K(13159634));let h=e.odo/.42;for(let[f,m]of[[-.74,.6],[.74,.6],[-.74,-.58],[.74,-.58]]){let x=Mt[7].copy(c).multiply(Re(f,.42,m,h,0,it/2));if(L.multiplyMatrices(x,fe(0,0,0,.84,.12,.84)),i.cyl.push(L,K(5913122)),L.multiplyMatrices(x,Re(0,0,0,it/2,0,0,.84,.84,.6)),this.goldBand.push(L,K(4868688)),e.lod<2)for(let g=0;g<3;g++)L.multiplyMatrices(x,Re(0,0,0,0,g*it/3,0,.78,.14,.07)),i.box.push(L,K(13215615));L.multiplyMatrices(x,fe(0,0,0,.2,.18,.2)),i.cyl.push(L,K(3810838))}L.multiplyMatrices(c,fe(.5,1.55,-.8,.05,1.7,.05)),i.cyl.push(L,K(4860952)),L.multiplyMatrices(c,Re(.5,2.1,-1.1-(a?.1:0),0,Math.sin(t*(a?18:7))*.25,0,.04,.45,.65)),i.box.push(L,K(s));let u={...this.lookOf(e),shirt:7027242,sleeve:7027242,pants:2761760,ragged:!1,hat:"khan",hatColor:s,skirt:0,armor:!1,cheeks:!1},d=qa();if(d.sit=!0,d.armL=d.armR=-1.2+Math.sin(t*(a?16:5))*.15,d.armLz=.25,d.armRz=-.25,d.bend=a?.25:.05,e.state==="cheer"&&this.cheerPose(e,d,t),this.human(Mt[10].copy(c).multiply(fe(0,.66,.2,.82,.82,.82)),u,d,e.lod),e.lod<2){let f=qa();f.armR=-1.2-(o>=0&&o<1.6?.6:0),f.armL=-.6,f.armLz=.4,e.state==="cheer"&&this.cheerPose(e,f,t+1),this.human(Mt[13].copy(c).multiply(fe(-.15,.6,-.45,.78,.78,.78)),{...u,shirt:9067059,sleeve:9067059,hat:"none",hairStyle:"bun"},f,e.lod),L.multiplyMatrices(Mt[5],Re(0,0,.4,it/2,0,0,.045,1.5,.045)),i.cyl.push(L,K(7226408)),L.multiplyMatrices(Mt[5],Re(0,0,1.2,it/2,0,0,.1,.24,.1)),i.cone.push(L,K(14212580))}}buffalo(e,t,n){let i=this.P,s=ht[e.team].color,a=!!(e.flags&ii.charge),o=this.gold,l=this.goldSph,c=e.odo*(a?1.6:2.4),h=e.speed>.4||a,u=(n-e.atkAt)/1e3/e.def.windup,d=u>=0&&u<1.6?u<1?-u*.35:Math.sin(Math.min(1,(u-1)*2)*it)*.6:0,f=e.skill==="charge"&&n-e.skillAt<350?.35:0,m=Mt[11].copy(qr).multiply(Re(0,h?Math.abs(Math.sin(c))*.08:Math.sin(t*1.5)*.015,0,a?.08:0,0,0)),x=2831186,g=3489635;L.multiplyMatrices(m,fe(0,1.12,-.1,1.2,1,1.95)),i.sph.push(L,K(x)),L.multiplyMatrices(m,fe(0,1.3,.45,1.1,.95,.85)),i.sph.push(L,K(g)),L.multiplyMatrices(m,fe(0,.9,.6,.85,.75,.7)),i.sph.push(L,K(2304581));for(let[y,T,S]of[[-.34,.6,0],[.34,.6,it],[-.34,-.66,it],[.34,-.66,0]]){let A=h?Math.sin(c+S)*(a?.8:.55):0,E=Mt[7].copy(m).multiply(Re(y,.85,T,A,0,0));L.multiplyMatrices(E,fe(0,-.22,0,.32,.5,.34)),i.sph.push(L,K(x)),L.multiplyMatrices(E,fe(0,-.55,0,.22,.5,.22)),i.cyl.push(L,K(x)),L.multiplyMatrices(E,fe(0,-.82,.02,.27,.14,.31)),i.cyl.push(L,K(1973794))}let p=Mt[8].copy(m).multiply(Re(0,1.15,1.05,.25+d+f+(a?.35:0),Math.sin(t*.8)*.1,0));if(L.multiplyMatrices(p,fe(0,0,.15,.7,.62,.78)),i.sph.push(L,K(x)),L.multiplyMatrices(p,fe(0,-.12,.55,.48,.36,.34)),i.sph.push(L,K(15312544)),e.lod<2)for(let y of[-1,1])L.multiplyMatrices(p,fe(y*.1,-.12,.71,.07,.07,.03)),i.sph.push(L,K(5909034)),L.multiplyMatrices(p,fe(y*.24,.12,.42,.13,.15,.08)),i.sph.push(L,K(16777215)),L.multiplyMatrices(p,fe(y*.25,.11,.46,.08,.1,.04)),i.sph.push(L,K(3809808)),L.multiplyMatrices(p,Re(y*.4,.12,.02,0,0,y*.7,.14,.26,.08)),i.sph.push(L,K(14191242));for(let y of[-1,1])L.multiplyMatrices(p,Re(y*.6,.38,.08,0,y>0?0:it,.95,.62,.62,.9)),i.tor.push(L,K(15261900));L.multiplyMatrices(p,fe(0,.3,.3,.52,.16,.14)),o.push(L,K(14263585)),L.multiplyMatrices(p,fe(0,.3,.38,.12,.12,.06)),i.glow.push(L,Yn.setHex(4911359)),L.multiplyMatrices(m,Re(0,1.1,.78,it/2+.5,0,0,.78,.78,.7)),this.goldBand.push(L,K(14263585)),L.multiplyMatrices(m,fe(0,.86,1.08,.18,.22,.1)),i.glow.push(L,Yn.setHex(4911359));for(let y of[-1,1])L.multiplyMatrices(m,fe(y*.58,1.42,.5,.42,.34,.55)),l.push(L,K(14263585));e.lod<2&&(L.multiplyMatrices(m,Re(0,1.2,-1.05,-.7+Math.sin(t*3)*.3,0,Math.sin(t*2.2)*.4,.06,.85,.06)),i.cyl.push(L,K(x)),L.multiplyMatrices(m,fe(0,.82,-1.35+Math.sin(t*3)*.1,.16,.26,.16)),i.sph.push(L,K(3811936))),L.multiplyMatrices(m,fe(0,1.66,-.1,1.05,.14,1)),i.box.push(L,K(6963752)),L.multiplyMatrices(m,fe(0,1.6,-.1,1.12,.06,1.06)),o.push(L,K(14263585));for(let y of[-1,1])L.multiplyMatrices(m,fe(y*.6,1.3,-.1,.05,.6,.78)),i.box.push(L,K(4860956)),L.multiplyMatrices(m,fe(y*.62,1.3,-.1,.03,.4,.5)),i.box.push(L,K(s));L.multiplyMatrices(m,fe(.35,2.3,-.6,.04,1.3,.04)),i.cyl.push(L,K(2787994)),L.multiplyMatrices(m,Re(.35,2.85,-.85,0,Math.sin(t*5)*.3,0,.03,.3,.45)),i.box.push(L,K(s));let b={...this.lookOf(e),shirt:8006170,sleeve:8006170,pants:2761760,ragged:!1,hat:"khan",hatColor:s,skirt:0,armor:!1},_=qa();_.sit=!0,_.legL=_.legR=-1.2,_.armR=-1.3-(a?.3:0)+(u>=0&&u<1.6?-.5:0),_.armRz=-.1,_.armL=-.8,_.armLz=.3,_.bend=a?.3:.05,e.state==="cheer"&&this.cheerPose(e,_,t),this.human(Mt[10].copy(m).multiply(fe(0,1.55,-.1,.88,.88,.88)),b,_,e.lod),L.multiplyMatrices(Mt[5],Re(0,0,.35,it/2,0,0,.05,1.5,.05)),i.cyl.push(L,K(7226408)),L.multiplyMatrices(Mt[5],Re(0,0,1.15,it/2,0,0,.12,.26,.12)),i.cone.push(L,K(14212580))}elephant(e,t,n){let i=this.P,s=ht[e.team].color,a=10132642,o=this.gold,l=this.goldSph,c=this.goldCone,h=e.lod<2,u=e.team==="trai"?2789316:13187694,d=13115422,f=e.speed>.4,m=e.odo*1.5,x=(n-e.skillAt)/1e3,g=e.skill==="stomp"&&x<1.3?x<.8?Math.sin(x/.8*it/2):Math.max(0,1-(x-.8)*4):0,p=e.skill==="roar"&&x<1.6?Math.min(1,x/.4)*(x>1.2?Math.max(0,(1.6-x)/.4):1):0,b=(n-e.atkAt)/1e3/e.def.windup,_=b>=0&&b<1.6?b<1?-b:Math.max(-1,-1+(b-1)*4):0,y=Mt[11].copy(qr).multiply(Re(0,f?Math.abs(Math.sin(m))*.06:Math.sin(t*1.2)*.02,0,-g*.32,0,0));L.multiplyMatrices(y,fe(0,2.05,-.1,2.3,2,3.15)),i.sph.push(L,K(a));for(let[v,M,C]of[[-.7,.95,0],[.7,.95,it],[-.7,-.95,it],[.7,-.95,0]]){let U=M>0,k=f?Math.sin(m+C)*.35:0,O=U?-g*.7:0,G=Mt[7].copy(y).multiply(Re(v,1.45,M,k+O,0,0));if(L.multiplyMatrices(G,fe(0,-.72,0,.66,1.5,.66)),i.cyl.push(L,K(a)),L.multiplyMatrices(G,fe(0,-1.42,.05,.72,.12,.74)),i.cyl.push(L,K(8751246)),L.multiplyMatrices(G,Re(0,-1.2,0,it/2,0,0,.72,.72,.9)),i.band.push(L,K(d)),h){for(let H of[0,2.1,4.2])L.multiplyMatrices(G,fe(Math.cos(H)*.36,-1.3,Math.sin(H)*.36,.13,.13,.13)),l.push(L,K(15911244));for(let H of[-.17,0,.17])L.multiplyMatrices(G,fe(H,-1.42,.35,.13,.1,.06)),i.sph.push(L,K(15657174))}}let T=Mt[8].copy(y).multiply(Re(0,2.5,1.6,-p*.45-g*.15,Math.sin(t*.6)*.08,0));L.multiplyMatrices(T,fe(0,0,.1,1.55,1.5,1.4)),i.sph.push(L,K(a)),L.multiplyMatrices(T,Re(0,.22,.6,-.25,0,0,1,1,.12)),i.box.push(L,K(u)),L.multiplyMatrices(T,Re(0,.22,.62,-.25,0,0,.6,.6,.12)),i.box.push(L,K(2802872)),L.multiplyMatrices(T,Re(0,.24,.66,-.25,0,0,.3,.3,.1)),l.push(L,K(14263585));for(let[v,M]of[[.72,1.04],[-.28,1.04]])L.multiplyMatrices(T,Re(0,v,v>0?.46:.73,-.25,0,0,M,.07,.14)),o.push(L,K(14263585));if(h)for(let v=0;v<5;v++)L.multiplyMatrices(T,Re(-.4+v*.2,-.45,.76,it,0,0,.1,.25,.1)),i.cone.push(L,K(d));for(let v=0;v<5;v++)L.multiplyMatrices(T,Re(-.4+v*.2,.86+(v===2?.08:0),.28,-.2,0,0,.13,.32,.13)),c.push(L,K(15911244));for(let v of[-1,1]){let M=Math.sin(t*2.2+v)*.25+p*.7,C=Mt[9].copy(T).multiply(Re(v*.7,.05,-.15,0,v*(.35+M),0));L.multiplyMatrices(C,fe(v*.45,0,0,1,1.2,.12)),i.sph.push(L,K(9277590)),h&&(L.multiplyMatrices(C,fe(v*.45,0,.05,.72,.88,.06)),i.sph.push(L,K(14260896)),L.multiplyMatrices(C,Re(v*.6,-.65,0,it,0,0,.12,.32,.12)),i.cone.push(L,K(d))),L.multiplyMatrices(T,Re(v*.38,-.42,.62,-.5-p*.4,0,-v*.25,.15,.95,.15)),i.cone.push(L,K(16183520)),L.multiplyMatrices(T,Re(v*.38,-.36,.55,-.5-p*.4+it/2,0,0,.2,.2,.25)),this.goldBand.push(L,K(15911244)),h&&(L.multiplyMatrices(T,fe(v*.36,.05,.6,.14,.16,.08)),i.sph.push(L,K(1710618)))}let S=Mt[9].copy(T).multiply(Re(0,-.25,.68,.3,0,0));for(let v=0;v<6;v++){let M=Math.sin(t*1.6+v*.5)*.12+_*.35-p*.55+(v>3?.18:.05);S.multiply(Re(0,0,0,M,Math.sin(t*1.1+v)*.05,0));let C=.38-v*.045;L.multiplyMatrices(S,fe(0,-.22,0,C,.48,C)),i.cyl.push(L,K(a)),h&&v%2===0&&(L.multiplyMatrices(S,Re(0,-.1,0,0,0,0,C*1.02,C*1.02,.06)),i.box.push(L,K(8751246))),S.multiply(Re(0,-.44,0))}h&&(L.multiplyMatrices(y,Re(0,2,-1.65,-.5+Math.sin(t*2.5)*.25,0,Math.sin(t*1.7)*.4,.08,1,.08)),i.cyl.push(L,K(8751246))),L.multiplyMatrices(y,fe(0,3,-.1,2.05,.22,2.55)),i.box.push(L,K(u));for(let v of[-1,1])if(L.multiplyMatrices(y,fe(v*1.05,2.4,-.1,.1,1.15,2.45)),i.box.push(L,K(u)),L.multiplyMatrices(y,fe(v*1.08,2.4,-.1,.06,.7,1.5)),i.box.push(L,K(2802872)),L.multiplyMatrices(y,fe(v*1.09,1.84,-.1,.08,.12,2.45)),o.push(L,K(14263585)),h)for(let M=0;M<7;M++)L.multiplyMatrices(y,Re(v*1.1,1.62,-1.1+M*.33,it,0,0,.12,.32,.12)),i.cone.push(L,K(d));L.multiplyMatrices(y,fe(0,3.3,-.25,1.4,.36,1.35)),o.push(L,K(14263585)),L.multiplyMatrices(y,fe(0,3.5,-.25,1.2,.12,1.15)),i.box.push(L,K(d)),L.multiplyMatrices(y,fe(0,4.2,-.88,1.25,1.3,.14)),o.push(L,K(14263585)),L.multiplyMatrices(y,fe(0,4.3,-.8,.8,.8,.08)),i.box.push(L,K(u)),L.multiplyMatrices(y,fe(0,4.95,-.88,.5,.35,.14)),c.push(L,K(15911244));for(let v of[-.62,.62])L.multiplyMatrices(y,fe(v,3.75,-.25,.12,.45,1.3)),o.push(L,K(14263585));for(let v of[-.55,.55])L.multiplyMatrices(y,fe(v,4.9,-1,.05,2.6,.05)),i.cyl.push(L,K(14263585)),L.multiplyMatrices(y,Re(v+(v>0?.04:-.04),5.7,-1.45,0,Math.sin(t*4+v)*.3,0,.04,.6,.9)),i.box.push(L,K(d)),L.multiplyMatrices(y,fe(v,6.25,-1,.12,.12,.12)),l.push(L,K(15911244));let A={...this.lookOf(e),shirt:14263585,sleeve:9059e3,pants:9059e3,boots:5909018,ragged:!1,hat:"turban",hatColor:9059e3,skirt:0,armor:!1,angry:!1,hairStyle:"short"},E=qa();E.sit=!0,E.legL=E.legR=-1.3,E.armR=-1.6+p*-1.2,E.armL=-.5,E.armLz=.3,E.bend=g*.2,e.state==="cheer"&&this.cheerPose(e,E,t),this.human(Mt[10].copy(y).multiply(fe(0,3.5,-.3,1,1,1)),A,E,e.lod),L.multiplyMatrices(Mt[5],Re(0,0,.3,it/2,0,0,.05,1.3,.05)),i.cyl.push(L,K(15911244))}stars(e,t){let n=Kl[e.info.kind]*(e.info.kind==="voi"?.9:1.02);for(let i=0;i<3;i++){let s=t/220+i*2.09;this.P.glow.push(L.compose(kn.set(e.rx+Math.cos(s)*.35,e.ry+n,e.rz+Math.sin(s)*.35),Ei.identity(),qn.setScalar(.14)),Yn.setHex(16769354))}}hpBar(e,t){if(this.plated.has(e.id))return;let n=Math.max(0,Math.min(1,e.hp/Math.max(1,e.info.maxHp)));if(!e.def.boss&&(n>=.999||t-e.dmgAt>4e3))return;let i=e.def.boss?1.6:e.info.kind==="xechien"?1.1:.7,s=e.def.boss?.14:.09,a=Kl[e.info.kind]+.2;kn.set(e.rx,e.ry+a,e.rz),this.P.bar.push(L.compose(kn,this.quat,qn.set(i+.06,s+.05,1)),Yn.setHex(1709072));let o=qn.set(1,0,0).applyQuaternion(this.quat).multiplyScalar(-(1-n)*i/2);kn.add(o),this.P.bar.push(L.compose(kn,this.quat,qn.set(i*n,s,1)),Yn.setHex(n>.5?ht[e.team].color:n>.25?16756782:16726570))}};function NM(r,e,t){let n=e-r;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return r+n*t}var Ke=r=>document.getElementById(r);function re(r,e="",t=""){let n=document.createElement(r);return e&&(n.className=e),t&&(n.textContent=t),n}var Bt=r=>r>=1e6?(r/1e6).toFixed(1)+"M":r>=1e4?Math.round(r/1e3)+"k":r>=1e3?(r/1e3).toFixed(1)+"k":String(Math.round(r)),kM={danbinh:"D\xE2n binh",xathu:"X\u1EA1 th\u1EE7",dausi:"\u0110\u1EA5u s\u0129",xechien:"Xe chi\u1EBFn",trau:"Tr\xE2u",voi:"Voi"},Um=r=>`${Math.floor(r/60)}:${String(Math.max(0,r)%60).padStart(2,"0")}`,wd=class{constructor(){N(this,"failed",new Set);N(this,"defaults",new Map)}src(e,t,n){return e&&!this.failed.has(e)?e:this.fallback(t,n)}fail(e){e&&(this.failed.add(e),this.failed.size>2e3&&this.failed.delete(this.failed.values().next().value))}fallback(e,t){let n=([...String(e||"?").trim()][0]??"?").toUpperCase(),i=n+t,s=this.defaults.get(i);if(!s){let a=document.createElement("canvas");a.width=a.height=96;let o=a.getContext("2d"),l=ht[t].css,c=o.createLinearGradient(0,0,96,96);c.addColorStop(0,l),c.addColorStop(1,"#1a1020"),o.fillStyle=c,o.beginPath(),o.arc(48,48,48,0,Math.PI*2),o.fill(),o.fillStyle="#fff",o.font='bold 52px "Be Vietnam Pro", "Segoe UI", sans-serif',o.textAlign="center",o.textBaseline="middle",o.fillText(n,48,52),s=a.toDataURL(),this.defaults.set(i,s)}return s}img(e,t,n,i="av"){let s=re("img",i);return s.alt="",s.referrerPolicy="no-referrer",s.decoding="async",this.set(s,e,t,n),s}set(e,t,n,i){let s=this.src(t,n,i);e.dataset.src!==s&&(e.dataset.src=s,e.src=s,e.onerror=()=>{this.fail(t);let a=this.fallback(n,i);e.dataset.src!==a&&(e.dataset.src=a,e.src=a)})}},Yr=44,Jl=class{constructor(e){N(this,"avatars",new wd);N(this,"plates",[]);N(this,"nums",[]);N(this,"numNext",0);N(this,"feedItems",[]);N(this,"topIds",new Set);N(this,"honor",new Map);N(this,"boardKey","");N(this,"leader","");N(this,"prevGift",{});N(this,"_p",new P);N(this,"live");N(this,"pkKey",{});N(this,"resultKey","");N(this,"legendKey","");N(this,"boardOpen",!1);N(this,"showOnLive",!1);N(this,"numBudget",0);this.live=e;let t=Ke("plates");for(let i=0;i<Yr;i++){let s=re("div","plate"),a=this.avatars.img("","?","trai"),o=re("span","nm"),l=re("span","tier"),c=re("div","hp"),h=re("i"),u=re("b","killpop","\u2694\uFE0F+1");c.append(h);let d=re("div","row");d.append(a,o,l),s.append(d,c,u),s.style.display="none",t.append(s),this.plates.push({box:s,img:a,nm:o,tier:l,fill:h,id:0,key:"",kill:u})}let n=Ke("nums");for(let i=0;i<48;i++){let s=re("span","num");s.style.display="none",n.append(s),this.nums.push({e:s,x:0,y:0,z:0,at:0,on:!1})}}render(e){for(let o of Br)this.team(o,e.teams[o]);let t=e.round,n=(t.state==="running"||t.state==="paused")&&t.phase==="taphop";Ke("clock").textContent=t.state==="countdown"?`\u23F3 ${t.countdown}`:t.state==="ended"?"\u{1F3C1}":t.state==="idle"?"\u2694\uFE0F":n?`\u23F3 ${Um(t.gatherLeft)}`:Um(t.left),document.body.classList.toggle("gathering",n||t.state==="countdown"||t.state==="idle"||t.state==="ended"),Ke("phase").textContent=t.state==="idle"?"Ch\u1EDD qu\xE0 \u0111\u1EC3 m\u1EDF tr\u1EADn":t.state==="countdown"?`V\xF2ng ${t.round} s\u1EAFp b\u1EAFt \u0111\u1EA7u`:t.state==="paused"?"\u23F8 T\u1EA1m d\u1EEBng":t.state==="ended"?t.autoNext?`V\xF2ng m\u1EDBi sau ${t.resultLeft}s`:"H\u1EBFt tr\u1EADn":n?`V\xF2ng ${t.round} \xB7 T\u1EADp h\u1EE3p \xB7 xu\u1EA5t qu\xE2n sau ${t.gatherLeft}s`:`V\xF2ng ${t.round} \xB7 ${t.phaseName}`,Ke("tugT").style.width=`${(t.progress*100).toFixed(1)}%`,this.pk(e),document.body.classList.toggle("final",t.state==="running"&&t.phase==="quyetchien");let i=Ke("pot");i.hidden=!t.pot,t.pot&&(i.textContent=`\u2694\uFE0F Qu\u1EF9 l\u1EF1c chi\u1EBFn ${Bt(t.pot)} \xB7 \u0111\u1ED9i th\u1EAFng chia nhau`),this.honor.clear();for(let o of e.board.top)this.honor.set(o.id,o.rank);this.renderBoard(e.board),this.legend(e.gifts);let s=t.state!=="running"?"":t.progress>.56?"trai":t.progress<.44?"gai":this.leader;s&&s!==this.leader&&(this.leader=s,this.feed(`${ht[s].icon} ${ht[s].name} \u0111ang d\u1EABn \u0111\u1EA7u!`,"lead "+s)),t.state!=="running"&&(this.leader=""),this.topIds=new Set([...e.teams.trai.top,...e.teams.gai.top].map(o=>o.id)),e.result&&t.state==="ended"?this.result(e.result):Ke("result").hidden=!0;let a=Ke("stats");a&&(a.textContent=`${e.units} qu\xE2n \xB7 h\xE0ng \u0111\u1EE3i ${e.queue.queued} \xB7 \u0111\xE3 x\u1EED l\xFD ${e.queue.processed} \xB7 tr\xF9ng ${e.queue.duplicates} \xB7 combo ${e.queue.combosMerged} \xB7 th\u1EED l\u1EA1i ${e.queue.retried} \xB7 l\u1ED7i ${e.queue.failed}`)}team(e,t){let n=Ke("t_"+e),i=n.querySelector(".score b");t.gift>(this.prevGift[e]??0)&&this.prevGift[e]!==void 0&&(i.classList.remove("bump"),n.classList.remove("glow"),i.offsetWidth,i.classList.add("bump"),n.classList.add("glow")),this.prevGift[e]=t.gift,i.textContent=Bt(t.gift),n.querySelector(".units").textContent=`\u2694\uFE0F ${t.units} qu\xE2n${t.pending?` \xB7 \u{1F4E6} ${t.pending} trong kho`:""}${t.bosses?` \xB7 \u{1F451} ${t.bosses}`:""}`;let s=n.querySelector(".gate i"),a=n.querySelector(".house i");s.style.width=`${(t.gateHp/t.gateMax*100).toFixed(1)}%`,a.style.width=`${(t.houseHp/t.houseMax*100).toFixed(1)}%`,n.querySelector(".gate span").textContent=t.gateHp>0?`C\u1ED5ng ${Bt(t.gateHp)}`:"C\u1ED5ng \u0111\xE3 v\u1EE1!",n.querySelector(".house span").textContent=`Nh\xE0 ${Bt(t.houseHp)}`,n.classList.toggle("threat",t.threat);let o=n.querySelector(".top"),l=t.top.map((c,h)=>this.row(c,h));o.replaceChildren(...l),l.length||o.append(re("li","empty",e==="trai"?'B\xECnh lu\u1EADn "1" r\u1ED3i t\u1EB7ng qu\xE0':'B\xECnh lu\u1EADn "2" r\u1ED3i t\u1EB7ng qu\xE0'))}pk(e){if(document.getElementById("pk")){Ke("pkClock").textContent=Ke("clock").textContent,Ke("pkPhase").textContent=Ke("phase").textContent,Ke("pkPot").textContent=Bt(e.round.pot);for(let t of Br){let n=e.teams[t],i=n.gateHp+n.houseHp,s=Math.max(1,n.gateMax+n.houseMax),a=document.querySelector(`#pk .pkside.${t} .hpb`);a.querySelector("i").style.width=`${(i/s*100).toFixed(1)}%`,a.querySelector("b").textContent=Bt(i),a.classList.toggle("low",i/s<.3),a.classList.toggle("hit",n.threat),Ke("pkS_"+t).textContent=Bt(n.gift),Ke("pkU_"+t).textContent=`${n.units} qu\xE2n${n.pending?` \xB7 \u{1F4E6}${n.pending}`:""}`;let o=n.top.slice(0,3),l=o.map(h=>`${h.id}:${h.gift}:${h.avatar}:${this.honor.get(h.id)??""}`).join("|");if(l===this.pkKey[t])continue;this.pkKey[t]=l;let c=o.map((h,u)=>{let d=re("li"),f=re("div","pa");f.append(this.avatars.img(h.avatar,h.name,h.team,"av"),re("em","",String(u+1)));let m=re("div","pt");return m.append(re("span","n",h.name),re("small","",`${Bt(h.gift)} xu`)),d.append(f,m),d});Ke("pkTop_"+t).replaceChildren(...c.length?c:[re("li","empty",`B\xECnh lu\u1EADn "${t==="trai"?1:2}" r\u1ED3i t\u1EB7ng qu\xE0`)])}}}row(e,t){let n=re("li");return n.append(re("em","",["\u{1F947}","\u{1F948}","\u{1F949}","4","5"][t]),this.avatars.img(e.avatar,e.name,e.team,"av s"),re("span","n",e.name),re("b","",Bt(e.gift))),n}feed(e,t=""){let n=Ke("feed"),i=re("li",t,e);for(n.prepend(i),this.feedItems.unshift(i);this.feedItems.length>(this.live?5:7);)this.feedItems.pop().remove();setTimeout(()=>i.classList.add("old"),7e3)}gift(e,t,n,i,s,a,o=s){let l=Ke("lastGift");l.replaceChildren();let c=Wt[i];l.append(this.avatars.img(t,e,n,"av m"),re("div","g","")),l.lastElementChild.append(re("b","",e),re("span","",`${s>1?s+" \xD7 ":""}${a} \u2192 ${c.icon} ${o} ${c.name}`)),l.className="show "+n,l.hidden=!1,clearTimeout(l._t),l._t=window.setTimeout(()=>{l.className=n},4e3)}boss(e,t,n,i){let s=Ke("bossBanner"),a=Wt[i];s.replaceChildren(this.avatars.img(t,e,n,"av l"),re("div","bt","")),s.lastElementChild.append(re("small","",`${ht[n].icon} ${ht[n].name}`),re("b","",e),re("span","",`tri\u1EC7u h\u1ED3i ${a.icon} ${a.name.toUpperCase()}!`)),s.className="show "+n,s.hidden=!1,clearTimeout(s._t),s._t=window.setTimeout(()=>{s.hidden=!0},i==="voi"?3200:2400)}banner(e,t="",n="",i=2400){let s=Ke("banner");s.replaceChildren(re("b","",e),re("span","",t)),s.className="show "+n,s.hidden=!1,clearTimeout(s._t),s._t=window.setTimeout(()=>{s.hidden=!0},i)}result(e){let t=`${e.round}|${e.winner}`,n=Ke("result");if(n.hidden=!1,t===this.resultKey)return;this.resultKey=t;let i=e.winner==="draw"?null:ht[e.winner],s=re("div","rh "+(e.winner==="draw"?"draw":e.winner));s.append(re("b","",i?`${i.icon} ${i.name.toUpperCase()} CHI\u1EBEN TH\u1EAENG!`:"\u{1F91D} H\xD2A!"),re("span","",e.reason==="destroyed"?"Ph\xE1 s\u1EADp nh\xE0 ch\xEDnh \u0111\u1ED1i ph\u01B0\u01A1ng":e.reason==="timeout-hp"?"H\u1EBFt gi\u1EDD \xB7 c\u0103n c\u1EE9 c\xF2n nhi\u1EC1u m\xE1u h\u01A1n":e.reason==="timeout-damage"?"H\u1EBFt gi\u1EDD \xB7 g\xE2y nhi\u1EC1u s\xE1t th\u01B0\u01A1ng c\u0103n c\u1EE9 h\u01A1n":e.reason==="timeout-army"?"H\u1EBFt gi\u1EDD \xB7 c\xF2n nhi\u1EC1u qu\xE2n m\u1EA1nh tr\xEAn s\xE2n h\u01A1n":e.reason==="timeout-kills"?"H\u1EBFt gi\u1EDD \xB7 h\u1EA1 \u0111\u01B0\u1EE3c nhi\u1EC1u qu\xE2n \u0111\u1ECBch h\u01A1n":"H\u1EBFt gi\u1EDD \xB7 hai b\xEAn ngang nhau"));let a=re("div","mvp");e.mvp&&a.append(re("em","","MVP"),this.avatars.img(e.mvp.avatar,e.mvp.name,e.mvp.team,"av l"),re("b","",e.mvp.name),re("span","",`${Bt(e.mvp.damage)} s\xE1t th\u01B0\u01A1ng \xB7 ${e.mvp.kills} h\u1EA1 g\u1EE5c \xB7 ${Bt(e.mvp.gift)} xu`));let o=re("table","rt"),l=(u,d="")=>{let f=re("tr",d);for(let m of u)f.append(re("td","",m));return f};o.append(l(["","\u{1F935} Nh\xE0 Trai","\u{1F470} Nh\xE0 G\xE1i"],"th"),l(["T\u1ED5ng qu\xE0 (xu)",Bt(e.teams.trai.gift),Bt(e.teams.gai.gift)]),l(["S\xE1t th\u01B0\u01A1ng",Bt(e.teams.trai.damage),Bt(e.teams.gai.damage)]),l(["S\u1ED1 qu\xE2n",Bt(e.teams.trai.units),Bt(e.teams.gai.units)]),l(["Boss",String(e.teams.trai.bosses),String(e.teams.gai.bosses)]),l(["H\u1EA1 g\u1EE5c",Bt(e.teams.trai.kills),Bt(e.teams.gai.kills)]),l(["M\xE1u c\u0103n c\u1EE9",Bt(e.teams.trai.baseHp),Bt(e.teams.gai.baseHp)]));let c=re("ol","rtop");for(let u of e.top.slice(0,5)){let d=re("li",u.team);d.append(this.avatars.img(u.avatar,u.name,u.team,"av s"),re("span","",u.name),re("b","",`${Bt(u.score)} \u0111i\u1EC3m`)),c.append(d)}let h=re("div","payout");if(e.pot){h.append(re("b","",`\u{1F3C6} Qu\u1EF9 l\u1EF1c chi\u1EBFn ${Bt(e.pot)} ${e.winner==="draw"?"tr\u1EA3 l\u1EA1i cho ng\u01B0\u1EDDi g\xF3p":"chia cho "+ht[e.winner].name}`));let u=re("div","pl");for(let d of e.payouts.slice(0,6)){let f=re("span",d.team);f.append(this.avatars.img(d.avatar,d.name,d.team,"av s"),re("i","",d.name),re("em","","+"+Bt(d.gain))),u.append(f)}h.append(u)}n.replaceChildren(s,a,o,c,h)}legend(e){let t=[...e??[]].sort((s,a)=>s.min-a.min),n=JSON.stringify(t);if(n===this.legendKey||!t.length)return;this.legendKey=n;let i=s=>{let a=Wt[s.unit],o=re("div","gt"+(a.boss?" boss":""));return o.append(re("b","",`${s.min}X`),re("span","",`${a.icon} \xD7${s.count}`),re("small","",`${kM[s.unit]} \xB7 ${s.min} xu`)),o};Ke("gl_trai").replaceChildren(...t.map(i)),Ke("gl_gai").replaceChildren(...t.map(i))}renderBoard(e){let t=Ke("board"),n=this.boardOpen||this.live&&this.showOnLive;if(t.hidden=!n,!n)return;let i=JSON.stringify(e);if(i===this.boardKey)return;this.boardKey=i;let[s,a]=e.month.split("-"),o=re("div","bh");o.append(re("b","",`\u{1F3C6} BXH L\u1EF0C CHI\u1EBEN TH\xC1NG ${+a}/${s}`),re("span","","G\u1ECDi l\xEDnh g\xF3p l\u1EF1c chi\u1EBFn v\xE0o qu\u1EF9 tr\u1EADn \xB7 \u0111\u1ED9i th\u1EAFng chia nhau \xB7 top 20 \u0111\u01B0\u1EE3c vinh danh"));let l=re("ol","bl");e.top.length||l.append(re("li","empty","Ch\u01B0a c\xF3 ai. T\u1EB7ng qu\xE0 g\u1ECDi l\xEDnh v\xE0 th\u1EAFng tr\u1EADn \u0111\u1EC3 l\xEAn b\u1EA3ng!"));for(let c of e.top){let h=re("li","r"+Math.min(c.rank,4));h.append(re("em","",c.rank<=3?["\u{1F947}","\u{1F948}","\u{1F949}"][c.rank-1]:String(c.rank)),this.avatars.img(c.avatar,c.name,"trai","av s"),re("span","n",c.name),re("small","",`${c.wins} th\u1EAFng`),re("b","",Bt(c.power))),l.append(h)}t.replaceChildren(o,l)}plates3d(e,t,n,i,s){let a=innerWidth,o=innerHeight,l=[],c=i>110?4:i>70?3:i>42?2:1;for(let E of e){if(!E.visible||E.state==="dead")continue;let v=E.def.tier,M=n-E.spawnAt<3500,C=n-E.killAt<3e3,U=this.topIds.has(E.info.owner);if(v<c&&!M&&!C&&!(U&&v>=2)&&!this.honor.has(E.info.owner)||(this._p.set(E.rx,E.ry+jl(E.info.kind)+.35,E.rz).project(t),this._p.z>1||Math.abs(this._p.x)>1.02||Math.abs(this._p.y)>1.02))continue;let k=v*100+(this.honor.has(E.info.owner)?300:0)+(E.def.boss?1e3:0)+(C?400:0)+(M?250:0)+(U?150:0)+(n-E.dmgAt<2e3?40:0)+(s.has(E.id)?120:0);l.push({u:E,s:k,sx:(this._p.x+1)/2*a,sy:(1-this._p.y)/2*o})}l.sort((E,v)=>v.s-E.s);let h=new Set(s);s.clear();let u=i>110?18:i>60?28:Yr,d=Math.max(.8,Math.min(1.6,innerWidth/600)),f=84*d,m=24*d,x=[],g=[],p=0;for(let E of l){if(g.length>=u)break;let v=h.has(E.u.id),M=v?.85:1.1,C=n-E.u.spawnAt<3500&&E.u.def.tier<c&&!this.topIds.has(E.u.info.owner)&&!this.honor.has(E.u.info.owner)&&!E.u.def.boss;C&&!v&&p>=4||!E.u.def.boss&&x.some(U=>Math.abs(U.x-E.sx)<f*M&&Math.abs(U.y-E.sy)<m*M)||(C&&!v&&p++,x.push({x:E.sx,y:E.sy}),g.push({c:E,keep:v}))}let b=new Map;this.plates.forEach((E,v)=>{E.id&&E.key&&b.set(E.id,v)});let _=new Set(g.map(E=>E.c.u.id)),y=new Set;for(let E of g){let v=b.get(E.c.u.id);v!==void 0&&y.add(v)}let T=0,S=[];for(let E of g){let v=b.get(E.c.u.id);if(v===void 0){for(;T<Yr&&(y.has(T)||_.has(this.plates[T].id)&&this.plates[T].key);)T++;v=T,y.add(v)}S.push(v)}for(let E=0;E<g.length;E++){let v=g[E].c,M=S[E];if(M>=Yr)continue;let C=this.plates[M],U=v.u;s.add(U.id);let k=this.honor.get(U.info.owner)??0,O=`${U.id}|${U.info.stack}|${U.info.name}|${k}`;C.key!==O&&(C.key=O,C.id=U.id,C.nm.textContent=(k?(k<=3?["\u{1F947}","\u{1F948}","\u{1F949}"][k-1]:"\u{1F3C6}"+k)+" ":"")+U.info.name,C.tier.textContent=`${U.def.icon}${U.info.stack>1?"\xD7"+U.info.stack:""}`,C.box.className=`plate ${U.team} k-${U.info.kind}${k?" honor h"+Math.min(k,4):""}`,this.avatars.set(C.img,U.info.avatar,U.info.name,U.team)),C.fill.style.width=`${Math.max(0,Math.min(100,U.hp/U.info.maxHp*100)).toFixed(0)}%`,C.kill.classList.toggle("on",n-U.killAt<1200),C.box.style.display="",C.box.style.transform=`translate(${v.sx.toFixed(1)}px, ${v.sy.toFixed(1)}px) translate(-50%, -100%)`}let A=new Set(S.filter(E=>E<Yr));for(let E=0;E<Yr;E++)!A.has(E)&&this.plates[E].box.style.display!=="none"&&(this.plates[E].box.style.display="none",this.plates[E].key="",this.plates[E].id=0)}damage(e,t,n,i,s,a,o){if(++this.numBudget>14)return;let l=this.nums[this.numNext];this.numNext=(this.numNext+1)%this.nums.length,l.x=e+(Math.random()-.5)*.5,l.y=t,l.z=n,l.at=performance.now(),l.on=!0,l.e.textContent=a?"\u{1F6E1}\uFE0F"+i:s?i+"!":String(i),l.e.className="num"+(s?" crit":"")+(o?" big":"")+(a?" block":""),l.e.style.display=""}drawNums(e,t){this.numBudget=0;for(let n of this.nums){if(!n.on)continue;let i=(t-n.at)/900;if(i>=1){n.on=!1,n.e.style.display="none";continue}this._p.set(n.x,n.y+i*1.2,n.z).project(e),n.e.style.transform=`translate(${((this._p.x+1)/2*innerWidth).toFixed(1)}px, ${((1-this._p.y)/2*innerHeight).toFixed(1)}px) translate(-50%, -50%) scale(${(1+(1-i)*.3).toFixed(2)})`,n.e.style.opacity=String(Math.min(1,(1-i)*2.5))}}};var FM={hit:45,clash:70,swing:55,arrow:60,twang:50,thunk:60,volley:300,cart:400,moo:900,snort:500,gallop:500,gore:140,trumpet:1500,step:120,stomp:250,roar:1200,gift:120,boss:2500,spawn:90,die:80,gate:1500,house:3e3,win:5e3,lose:5e3,beep:300,go:1e3,kill:250,block:120,slam:200,alarm:4e3},OM=[0,3,5,7,10,12,15,17,19,22,24,27,29],HM=146.83,Ad=(r,e=HM)=>e*2**(r/12),Nm=[[0,7,2],[2,6,2],[4,7,2],[6,8,2],[8,9,4],[12,8,2],[14,7,2],[16,6,3],[19,5,1],[20,6,2],[22,4,2],[24,5,6],[30,4,2],[32,4,2],[34,5,2],[36,6,2],[38,7,2],[40,8,3],[43,9,1],[44,10,4],[48,9,2],[50,8,2],[52,7,4],[56,6,2],[58,5,2],[60,5,4]],BM=[[0,10,2],[2,9,1],[3,8,1],[4,9,2],[6,7,2],[8,8,2],[10,6,2],[12,7,4],[16,5,2],[18,6,1],[19,7,1],[20,8,2],[22,9,2],[24,10,4],[28,9,2],[30,8,2],[32,7,2],[34,8,2],[36,7,2],[38,6,2],[40,5,4],[44,6,2],[46,7,2],[48,8,2],[50,7,1],[51,6,1],[52,5,4],[56,4,2],[58,6,2],[60,5,4]],zM=[0,-2,-5,0],VM=[84,104,114,124,138],Ql=class{constructor(){N(this,"on",!1);N(this,"music",!0);N(this,"locate",null);N(this,"ctx",null);N(this,"out");N(this,"fx");N(this,"mus");N(this,"verb");N(this,"verbIn");N(this,"noise",null);N(this,"grit",null);N(this,"last",new Map);N(this,"live",0);N(this,"mlive",0);N(this,"beatAt",0);N(this,"step",0);N(this,"intensity",0)}start(){if(!this.ctx){let e=this.ctx=new AudioContext,t=e.createDynamicsCompressor();t.threshold.value=-16,t.ratio.value=4,t.attack.value=.004,t.release.value=.2,this.out=e.createGain(),this.out.gain.value=.85,this.out.connect(t).connect(e.destination),this.fx=e.createGain(),this.fx.gain.value=.95,this.fx.connect(this.out),this.mus=e.createGain(),this.mus.gain.value=.42,this.mus.connect(this.out);let n=e.sampleRate*2,i=e.createBuffer(1,n,e.sampleRate),s=i.getChannelData(0);for(let h=0;h<n;h++)s[h]=Math.random()*2-1;this.noise=i;let a=Math.floor(e.sampleRate*1.6),o=e.createBuffer(2,a,e.sampleRate);for(let h=0;h<2;h++){let u=o.getChannelData(h);for(let d=0;d<a;d++)u[d]=(Math.random()*2-1)*(1-d/a)**3}this.verb=e.createConvolver(),this.verb.buffer=o,this.verbIn=e.createGain(),this.verbIn.gain.value=.22,this.verbIn.connect(this.verb).connect(this.out),this.mus.connect(this.verbIn);let l=this.grit=e.createWaveShaper(),c=new Float32Array(1024);for(let h=0;h<1024;h++){let u=h/512-1;c[h]=Math.tanh(u*3.2)}l.curve=c}this.ctx.resume(),this.on=!0,this.beatAt=this.ctx.currentTime+.2}stop(){this.on=!1,this.ctx?.suspend()}ok(e){if(!this.on||!this.ctx||this.live>=18)return!1;let t=performance.now();return t-(this.last.get(e)??-1e9)<FM[e]?!1:(this.last.set(e,t),!0)}t(e=0){return this.ctx.currentTime+e}env(e,t,n,i,s){e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(Math.max(2e-4,n),t+i),e.gain.exponentialRampToValueAtTime(1e-4,t+s)}count(e,t){t?(this.mlive++,e.onended=()=>{this.mlive--}):(this.live++,e.onended=()=>{this.live--})}osc(e,t,n,i,s,a,o=this.fx,l=.005){let c=this.ctx,h=c.createOscillator(),u=c.createGain();return h.type=e,h.frequency.setValueAtTime(t,i),n!==t&&h.frequency.exponentialRampToValueAtTime(Math.max(20,n),i+s*.9),this.env(u,i,a,l,s),h.connect(u).connect(o),h.start(i),h.stop(i+s+.05),this.count(h,o===this.mus),h}hiss(e,t,n,i,s,a=1,o=this.fx,l=s,c=.004){if(!this.noise)return;let h=this.ctx,u=h.createBufferSource(),d=h.createBiquadFilter(),f=h.createGain();u.buffer=this.noise,u.loop=t>1.8,d.type=i,d.frequency.setValueAtTime(s,e),l!==s&&d.frequency.exponentialRampToValueAtTime(l,e+t),d.Q.value=a,this.env(f,e,n,c,t),u.connect(d).connect(f).connect(o),u.start(e,Math.random()),u.stop(e+t+.05),this.count(u,o===this.mus)}metal(e,t,n,i,s){for(let[a,o]of[[1,1],[1.47,.7],[2.09,.5],[2.76,.35],[3.9,.2]])this.osc("sine",t*a,t*a*.995,e,i*(1.1-o*.4),n*o,s,.001)}bus(e,t,n,i=0){let s=this.ctx,a=s.createGain(),o=e,l=0;if(t!==void 0&&n!==void 0&&this.locate){let c=this.locate(t,n);o*=c.gain,l=c.pan}if(o<.04)return null;if(a.gain.value=o,s.createStereoPanner){let c=s.createStereoPanner();if(c.pan.value=Math.max(-1,Math.min(1,l)),a.connect(c).connect(this.fx),i){let h=s.createGain();h.gain.value=i,c.connect(h).connect(this.verbIn)}}else a.connect(this.fx);return setTimeout(()=>a.disconnect(),4e3),a}play(e,t=1,n,i){if(!this.ok(e))return;let s=e==="gore"||e==="stomp"||e==="trumpet"||e==="roar"||e==="gate"||e==="house"||e==="boss"||e==="win",a=this.bus(t,n,i,s?.5:.12);if(!a)return;let o=this.t(),l=Math.random;switch(e){case"hit":this.osc("triangle",150+l()*50,60,o,.1,.13,a),this.hiss(o,.06,.1,"lowpass",1100+l()*500,1,a);break;case"clash":this.metal(o,1500+l()*700,.035,.32,a),this.hiss(o,.05,.12,"highpass",3500,1,a);break;case"swing":this.hiss(o,.16,.08,"bandpass",700+l()*300,2.5,a,2400,.05);break;case"block":this.metal(o,820+l()*120,.06,.4,a),this.osc("triangle",180,120,o,.08,.08,a);break;case"twang":case"arrow":this.osc("triangle",300+l()*60,250,o,.11,.07,a,.001),this.osc("sawtooth",150,140,o,.06,.03,a,.001),this.hiss(o+.02,.22,.05,"bandpass",3200,5,a,900);break;case"thunk":this.osc("square",380+l()*80,160,o,.05,.03,a,.001),this.hiss(o,.05,.06,"bandpass",1400,2,a);break;case"volley":for(let c=0;c<5;c++){let h=c*.06+l()*.03;this.osc("triangle",280+l()*90,230,o+h,.1,.05,a,.001),this.hiss(o+h+.02,.3,.035,"bandpass",3e3,5,a,800)}break;case"cart":this.hiss(o,1.1,.16,"lowpass",260,1,a,160),this.osc("sawtooth",55,70,o,1,.05,a);for(let c=0;c<6;c++)this.osc("square",120+l()*30,90,o+c*.16,.04,.03,a);break;case"moo":{let c=this.ctx,h=c.createOscillator(),u=c.createGain(),d=c.createBiquadFilter(),f=c.createBiquadFilter(),m=c.createOscillator(),x=c.createGain();h.type="sawtooth",h.frequency.setValueAtTime(96,o),h.frequency.linearRampToValueAtTime(128,o+.35),h.frequency.linearRampToValueAtTime(84,o+1.3),m.frequency.value=6,x.gain.value=3,m.connect(x).connect(h.frequency),d.type="bandpass",d.frequency.setValueAtTime(420,o),d.frequency.linearRampToValueAtTime(700,o+.4),d.Q.value=3,f.type="bandpass",f.frequency.value=1150,f.Q.value=5,this.env(u,o,.32,.12,1.4),h.connect(d).connect(u),h.connect(f).connect(u),u.connect(a),h.start(o),h.stop(o+1.45),m.start(o),m.stop(o+1.45),this.count(h,!1);break}case"snort":this.hiss(o,.18,.2,"bandpass",600,1.5,a,300,.01),this.hiss(o+.24,.3,.24,"bandpass",520,1.5,a,220,.01);break;case"gallop":for(let c=0;c<8;c++){let h=Math.floor(c/2)*.2+c%2*.07;this.osc("sine",95,40,o+h,.16,.2,a,.002),this.hiss(o+h,.08,.1,"lowpass",500,1,a)}break;case"gore":{this.osc("sine",120,34,o,.55,.5,a,.002),this.osc("triangle",220,70,o,.18,.2,a,.001),this.hiss(o,.09,.22,"highpass",1800,1,a),this.hiss(o,.45,.22,"lowpass",700,1,a,120),this.osc("square",520+l()*80,240,o,.05,.05,a,.001);break}case"trumpet":{let c=this.ctx,h=c.createOscillator(),u=c.createOscillator(),d=c.createGain(),f=c.createBiquadFilter(),m=c.createBiquadFilter(),x=c.createOscillator(),g=c.createGain(),p=c.createGain();for(let[_,y]of[[h,1],[u,1.006]])_.frequency.setValueAtTime(480*y,o),_.frequency.exponentialRampToValueAtTime(880*y,o+.22),_.frequency.linearRampToValueAtTime(820*y,o+.7),_.frequency.linearRampToValueAtTime(940*y,o+.95),_.frequency.exponentialRampToValueAtTime(420*y,o+1.6);h.type="sawtooth",u.type="square",x.frequency.value=23,g.gain.value=30,x.connect(g),g.connect(h.frequency),g.connect(u.frequency),f.type="bandpass",f.frequency.value=1150,f.Q.value=3,m.type="bandpass",m.frequency.value=2400,m.Q.value=4,p.gain.value=.6,h.connect(p),u.connect(p);let b=this.grit?p.connect(this.grit):p;b.connect(f).connect(d),b.connect(m).connect(d),this.env(d,o,.22,.05,1.7),d.connect(a);for(let _ of[h,u,x])_.start(o),_.stop(o+1.75);this.count(h,!1),this.hiss(o,1.5,.06,"bandpass",3e3,1,a,1800,.05),this.osc("sine",62,45,o,1.4,.2,a,.05);break}case"step":this.osc("sine",58,30,o,.45,.32,a,.004),this.hiss(o,.3,.12,"lowpass",260,1,a,90);break;case"stomp":this.osc("sine",70,26,o,.8,.5,a),this.hiss(o,.6,.3,"lowpass",500,1,a,80),this.hiss(o,.08,.12,"highpass",1500,1,a);break;case"slam":this.osc("sine",120,45,o,.4,.24,a),this.hiss(o,.25,.14,"lowpass",900,1,a),this.metal(o,600,.03,.3,a);break;case"roar":this.hiss(o,1.2,.2,"bandpass",220,2,a,140),this.osc("sawtooth",85,60,o,1.2,.07,a,.1);break;case"gift":[0,4,7,12].forEach((c,h)=>this.osc("triangle",784*2**(c/12),784*2**(c/12),o+h*.06,.35,.06,a));break;case"spawn":this.osc("sine",520,980,o,.18,.05,a);break;case"boss":{[0,.18,.36].forEach(c=>this.drumFx(o+c,.5,90,a)),[196,247,294].forEach(c=>this.osc("sawtooth",c,c,o+.5,1.2,.05,a,.08)),this.gong(o+.5,.25,a);break}case"die":this.osc("triangle",300,90,o,.22,.06,a);break;case"kill":this.osc("square",660,990,o,.12,.03,a);break;case"gate":this.hiss(o,1.2,.35,"lowpass",1200,1,a,150),this.osc("sine",80,35,o,1,.35,a);for(let c=0;c<5;c++)this.osc("square",200+l()*200,80,o+l()*.5,.06,.04,a);break;case"house":this.hiss(o,2.4,.45,"lowpass",1500,1,a,100),this.osc("sine",60,25,o,2,.5,a);break;case"alarm":for(let c=0;c<3;c++)this.drumFx(o+c*.16,.35,150,a);break;case"beep":this.osc("sine",880,880,o,.15,.08,a);break;case"go":this.osc("sawtooth",440,440,o,.5,.06,a),this.osc("sawtooth",660,660,o,.5,.05,a),this.drumFx(o,.5,100,a),this.gong(o,.2,a);break;case"win":[523,659,784,1047,784,1047].forEach((c,h)=>{this.osc("triangle",c,c,o+h*.16,.5,.08,a),this.osc("sawtooth",c/2,c/2,o+h*.16,.4,.025,a)}),[0,.32,.64,.96].forEach(c=>this.drumFx(o+c,.4,100,a)),this.gong(o+.96,.3,a);break;case"lose":[392,349,311,262].forEach((c,h)=>this.osc("triangle",c,c*.98,o+h*.25,.6,.06,a));break}}drumFx(e,t,n,i){this.osc("sine",n,n*.45,e,.45,t,i,.003),this.hiss(e,.07,t*.25,"bandpass",800,1,i)}kick(e,t){this.osc("sine",105,42,e,.42,t,this.mus,.002),this.hiss(e,.05,t*.3,"bandpass",900,1,this.mus)}snare(e,t){this.osc("triangle",240,170,e,.1,t*.5,this.mus,.001),this.hiss(e,.14,t,"bandpass",2100,.9,this.mus)}hat(e,t){this.hiss(e,.045,t,"highpass",7500,1,this.mus)}gong(e,t,n=this.mus){for(let[i,s]of[[98,1],[147,.6],[212,.4],[301,.25]])this.osc("sine",i,i*.985,e,2.6,t*s,n,.008);this.hiss(e,.3,t*.3,"bandpass",600,1,n)}bass(e,t,n,i){let s=this.ctx,a=s.createOscillator(),o=s.createGain(),l=s.createBiquadFilter();a.type="sawtooth",a.frequency.value=t,l.type="lowpass",l.frequency.setValueAtTime(900,e),l.frequency.exponentialRampToValueAtTime(220,e+n),l.Q.value=4,this.env(o,e,i,.005,n),a.connect(l).connect(o).connect(this.mus),a.start(e),a.stop(e+n+.05),this.count(a,!0)}pluck(e,t,n){let i=this.ctx,s=i.createOscillator(),a=i.createOscillator(),o=i.createGain();s.type="triangle",a.type="sine",s.frequency.setValueAtTime(t*1.03,e),s.frequency.exponentialRampToValueAtTime(t,e+.06),a.frequency.value=t*2;let l=i.createGain();l.gain.value=.35,a.connect(l).connect(o),this.env(o,e,n,.002,.9),s.connect(o).connect(this.mus),s.start(e),a.start(e),s.stop(e+.95),a.stop(e+.95),this.count(s,!0)}flute(e,t,n,i){let s=this.ctx,a=s.createOscillator(),o=s.createOscillator(),l=s.createGain(),c=s.createOscillator(),h=s.createGain();a.type="sine",o.type="triangle",a.frequency.value=t,o.frequency.value=t,c.frequency.value=5.4,h.gain.setValueAtTime(0,e),h.gain.linearRampToValueAtTime(t*.012,e+Math.min(.25,n*.6)),c.connect(h),h.connect(a.frequency),h.connect(o.frequency);let u=s.createGain();u.gain.value=.3,o.connect(u).connect(l),l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(i,e+.04),l.gain.setValueAtTime(i,e+Math.max(.05,n-.06)),l.gain.exponentialRampToValueAtTime(1e-4,e+n+.08),a.connect(l).connect(this.mus);for(let d of[a,o,c])d.start(e),d.stop(e+n+.1);this.count(a,!0),this.hiss(e,Math.min(.12,n),i*.5,"bandpass",t*2,2,this.mus)}update(){if(!this.ctx)return;if(!this.on||!this.music){this.beatAt=Math.max(this.beatAt,this.ctx.currentTime);return}let e=Math.max(0,Math.min(4,this.intensity)),t=60/VM[e]/4;for(this.beatAt<this.ctx.currentTime-.5&&(this.beatAt=this.ctx.currentTime+.05);this.beatAt<this.ctx.currentTime+.25;){if(this.mlive>48){this.beatAt+=t,this.step++;continue}let n=this.beatAt,i=this.step%16,s=Math.floor(this.step/16),a=zM[s%4],o=this.step%128,l=e>=2?o<64?Nm:BM:Nm,c=o%64;for(let[u,d,f]of l)u===c&&(e>0||s%2===0||u%4===0)&&this.flute(n,Ad(OM[d]+12),f*t*.95,e===0?.035:.05);let h=[0,7,12,7,14,12,7,12];(e===0?i%4===0:e!==1||i%2===0)&&this.pluck(n,Ad(a+h[(i>>(e>=2?0:1))%8]),e===0?.05:.04),e>0?((e>=4?[1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1]:e>=2?[1,0,0,0,1,0,1,0,1,0,0,1,1,0,1,0]:[1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0])[i]&&this.kick(n,i%4===0?.36:.24),(i===4||i===12)&&this.snare(n,e>=2?.12:.08),e>=3&&(i===14||i===15)&&this.snare(n,.07),e>=2&&i%2===0&&this.hat(n,i%4===2?.05:.025),[1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1][i]&&this.bass(n,Ad(a+(i===6||i===14?12:0),73.42),t*1.6,e>=2?.1:.08),i===0&&(e>=3||e>=2&&s%2===0||s%4===0)&&this.gong(n,e>=3?.08:.05)):i===0&&s%4===0&&this.gong(n,.035),this.beatAt+=t,this.step++}}};function km(r){let e=new Map,t=new Map,n=r.clone();return Fm(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let s=i,a=e.get(i),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Fm(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)Fm(r.children[n],e.children[n],t)}var GM={danbinh:1.75,xathu:1.8,dausi:2.2,xechien:2.2,trau:2.9,voi:4.9},Om={idle:/idle|stand|breath/i,walk:/walk|run|move|gallop|trot/i,attack:/attack|hit_?\d|punch|slash|swing|shoot|strike|bite/i,hit:/hurt|damage|impact|react/i,death:/death|die|dead|fall/i},WM=140,Hm=new pe,XM=new de,ec=class{constructor(){N(this,"group",new st);N(this,"entries",new Map);N(this,"skins",new Map);N(this,"skinCount",0);N(this,"loaded",[]);N(this,"skinCap",WM)}async load(e="/models/"){let t={};try{let i=await fetch(e+"models.json",{cache:"no-cache"});i.ok&&(t=await i.json())}catch{}let n=new Gr;return await Promise.all(dm.map(async i=>{let s=t[i]??{},a=e+(s.file??i+".glb");try{if(!(await fetch(a,{method:"HEAD"})).ok)return;let l=await n.loadAsync(a);this.add(i,l.scene,l.animations,s),this.loaded.push(i)}catch(o){console.warn(`Kh\xF4ng n\u1EA1p \u0111\u01B0\u1EE3c model ${a}:`,o)}})),this.loaded}add(e,t,n,i){t.updateMatrixWorld(!0);let s=new vn().setFromObject(t),a=s.getSize(new P),o=s.getCenter(new P),l=(i.height??GM[e])/Math.max(.001,a.y),c=new pe().makeRotationY(_i.degToRad(i.rotY??0)).multiply(new pe().makeScale(l,l,l)).multiply(new pe().makeTranslation(-o.x,-s.min.y,-o.z)),h=!1;t.traverse(f=>{f.isSkinnedMesh&&(h=!0)});let u={};for(let f of Object.keys(Om)){let m=i.clips?.[f];u[f]=(m?n.find(x=>x.name===m):void 0)??n.find(x=>Om[f].test(x.name))}!u.idle&&n.length&&(u.idle=n[0]);let d={kind:e,skinned:h&&n.length>0,root:t,norm:c,clips:u,parts:[],free:[],teamMat:(i.teamMaterial??"team").toLowerCase()};d.skinned||t.traverse(f=>{let m=f;if(!m.isMesh)return;let x=m.matrixWorld.clone(),g=m.material,p=!!g.name?.toLowerCase().includes(d.teamMat)&&!!g.color;p&&(g=g.clone(),g.color.setHex(16777215));let b=new Ut(m.geometry,g,360);b.setColorAt(0,new de(1,1,1)),b.frustumCulled=!1,b.castShadow=!0,b.receiveShadow=!0,b.count=0,b.instanceMatrix.setUsage(Yi),this.group.add(b),d.parts.push({geo:m.geometry,mat:g,local:x,mesh:b,n:0,team:p})}),this.entries.set(e,d)}has(e){return this.entries.has(e)}beginFrame(){for(let e of this.entries.values())for(let t of e.parts)t.n=0;for(let e of this.skins.values())e.used=!1}drawStatic(e,t,n){let i=this.entries.get(e);for(let s of i.parts)s.n>=360||(Hm.multiplyMatrices(t,i.norm).multiply(s.local),s.mesh.setColorAt(s.n,XM.setHex(s.team?ht[n].color:16777215)),s.mesh.setMatrixAt(s.n++,Hm))}drawSkinned(e,t,n,i,s,a,o,l){let c=this.entries.get(e),h=this.skins.get(t);if(!h){if(h=c.free.pop(),!h){if(this.skinCount>=this.skinCap)return!1;h=this.makeSkin(c),this.skinCount++}h.unit=t,h.cur="",h.atkAt=0,this.skins.set(t,h),h.obj.visible=!0}h.team!==n&&this.tint(h,n,c),h.used=!0,h.obj.matrix.multiplyMatrices(i,c.norm),h.obj.matrixWorldNeedsUpdate=!0,s==="attack"&&a!==h.atkAt&&h.actions.attack&&(h.atkAt=a,h.actions.attack.reset());let u=h.actions[s]?s:h.actions.idle?"idle":"";if(u&&u!==h.cur){let d=h.actions[u],f=h.cur?h.actions[h.cur]:void 0;d.reset(),d.setLoop(u==="death"?Cu:Pu,1/0),d.clampWhenFinished=u==="death",d.play(),f&&d.crossFadeFrom(f,.18,!1),h.cur=u}return h.actions.walk&&(h.actions.walk.timeScale=Math.max(.6,Math.min(2.2,o/2.2))),h.mixer.update(l),!0}makeSkin(e){let t=km(e.root);t.matrixAutoUpdate=!1,t.traverse(s=>{let a=s;a.isMesh&&(a.castShadow=!0,a.frustumCulled=!1,Array.isArray(a.material)?a.material=a.material.map(o=>o.clone()):a.material=a.material.clone())}),this.group.add(t);let n=new yl(t),i={};for(let[s,a]of Object.entries(e.clips))a&&(i[s]=n.clipAction(a));return{kind:e.kind,obj:t,mixer:n,actions:i,cur:"",unit:0,used:!1,atkAt:0,team:""}}tint(e,t,n){e.team=t,e.obj.traverse(i=>{let s=i;if(s.isMesh)for(let a of Array.isArray(s.material)?s.material:[s.material])a.name?.toLowerCase().includes(n.teamMat)&&a.color&&a.color.setHex(ht[t].color)})}endFrame(){for(let e of this.entries.values())for(let t of e.parts)t.mesh.count=t.n,t.mesh.instanceMatrix.needsUpdate=!0,t.mesh.instanceColor&&(t.mesh.instanceColor.needsUpdate=!0);for(let[e,t]of this.skins)t.used||(t.obj.visible=!1,t.mixer.stopAllAction(),t.cur="",this.skins.delete(e),this.entries.get(t.kind)?.free.push(t))}};function tc(r,e){let t=Math.imul(r|0,374761393)+Math.imul(e|0,668265263);return t=Math.imul(t^t>>>13,1274126177),((t^t>>>16)>>>0)/4294967296}function qM(r,e){let t=Math.floor(r),n=Math.floor(e),i=r-t,s=e-n,a=i*i*(3-2*i),o=s*s*(3-2*s),l=tc(t,n),c=tc(t+1,n),h=tc(t,n+1),u=tc(t+1,n+1);return l+(c-l)*a+(h-l)*o+(l-c-h+u)*a*o}function ji(r,e,t=5){let n=0,i=.5,s=1,a=0;for(let o=0;o<t;o++)n+=i*qM(r*s,e*s),a+=i,i*=.5,s*=2.03;return n/a}var Ti=(r,e,t)=>{let n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)},$r=r=>()=>((r=(Math.imul(r,16807)+11)%2147483647)&2147483647)/2147483647;function Ka(r,e){let t=(n,i,s,a)=>Math.hypot(Math.max(n-r,0,r-i),Math.max(s-e,0,e-a));return Math.min(t(Gt.minX-6,Gt.maxX+6,Gt.minZ-5,Gt.maxZ+3),t(-32,32,-20,0))}function Si(r,e){let t=Ka(r,e),n=0;if(t>0){let s=Ti(0,38,t);n=s*(ji(r*.012+3,e*.012-7)*26-6)+Ti(30,160,t)*ji(r*.006,e*.006,3)*40+s*Math.pow(ji(r*.05,e*.05,3),2)*5}let i=Math.hypot(r-$t.x,e-$t.z);if(i<$t.r+10){let s=Ti($t.r+10,$t.r-4,i);n=n*(1-s)-s*2.2}return n}var YM=[0,1,2].map(r=>$i.path(r));function Bm(r,e){let t=1/0;for(let n of YM)for(let i=1;i<n.length;i++){let s=n[i-1],a=n[i],o=a.x-s.x,l=a.z-s.z,c=o*o+l*l||1,h=Math.max(0,Math.min(1,((r-s.x)*o+(e-s.z)*l)/c));t=Math.min(t,Math.hypot(r-s.x-o*h,e-s.z-l*h))}return t}function Rd(r,e,t=1,n=1){let i=document.createElement("canvas");i.width=i.height=r;let s=i.getContext("2d");e(s,$r(n));let a=new ln(i);return a.colorSpace=ct,a.wrapS=a.wrapT=qt,a.repeat.set(t,t),a.anisotropy=8,a}function $M(r){return Rd(512,(e,t)=>{e.fillStyle="#f0f0f0",e.fillRect(0,0,512,512);for(let n=0;n<26e3;n++){let i=t()*512,s=t()*512,a=3+t()*9,o=-Math.PI/2+(t()-.5)*1.2,l=175+t()*80|0;e.strokeStyle=`rgba(${l},${l},${l*.92|0},${.35+t()*.4})`,e.lineWidth=.6+t()*1.1,e.beginPath(),e.moveTo(i,s),e.lineTo(i+Math.cos(o)*a,s+Math.sin(o)*a),e.stroke()}for(let n=0;n<900;n++){let i=110+t()*60|0;e.fillStyle=`rgba(${i},${i-10},${i-25},0.5)`,e.beginPath(),e.arc(t()*512,t()*512,.8+t()*2.2,0,7),e.fill()}},r,5)}var nc=class{constructor(e){N(this,"group",new st);N(this,"sunDir",new P(-.72,.36,-.6).normalize());N(this,"grassMat");N(this,"terrainMesh");N(this,"tufts");N(this,"treeMeshes");N(this,"rockMesh");let t=e==="high";this.terrainMesh=this.terrain(t?280:180),this.group.add(this.sky(),this.terrainMesh,this.water(),this.mountains()),this.grassMat=this.grassMaterial(),this.tufts=this.grass(t?6e3:2500),this.treeMeshes=this.trees(t),this.rockMesh=this.rocks(),this.group.add(this.tufts,...this.treeMeshes,this.rockMesh)}plantTrees(e,t){let n=(a,o,l,c)=>a.length?Ya(e,o,l,a.map(h=>new pe().compose(new P(h.x,Si(h.x,h.z)-.2,h.z),new yt().setFromEuler(new zt(0,h.x*1.7,0)),new P().setScalar(h.s))),c):null,i=n(t.filter(a=>!a.tall),"tree2","umbrella",23)??n(t.filter(a=>!a.tall),"tree1","umbrella",23),s=n(t.filter(a=>a.tall),"tree3","tall",29);for(let a of[i,s])a&&this.group.add(a);return!!(i||s)}applyHD(e,t){let n=T=>e.tex.get(T);n("drygrass")&&n("grass")&&n("dirt")&&n("rock")&&n("sand")&&(this.terrainMesh.material=KM(e)),this.tufts.visible=!1;let i=T=>{let S=[];for(let A=0;A<T.count;A++){let E=new pe;T.getMatrixAt(A,E),S.push(E)}return S},[s,a,o]=this.treeMeshes,l=(T,S)=>{S&&(T.visible=!1,this.group.add(S))};l(s,Ya(e,"tree1","umbrella",i(s),7)??Ya(e,"tree2","umbrella",i(s),7)),l(a,Ya(e,"tree3","tall",i(a),11)??Ya(e,"tree2","tall",i(a),11));let c=i(o),h=Math.ceil(c.length/2),u=new st;for(let[T,S,A]of[["shrub2",c.slice(0,h),1.3],["shrub1",c.slice(h),1.2]]){let E=e.models.get(T);E&&u.add($a(E,S.filter((v,M)=>M<400*t),A))}u.children.length&&l(o,u);let d=i(this.rockMesh),f=new st,m=e.models.get("boulder2"),x=e.models.get("rocks");m&&f.add($a(m,d.filter((T,S)=>S%3!==2),1.05)),x&&f.add($a(x,d.filter((T,S)=>S%3===2),1.3)),f.children.length&&l(this.rockMesh,f);let g=e.models.get("fern"),p=e.models.get("grass"),b=$r(91),_=[],y=[];for(let T=0;_.length+y.length<260*t&&T<6e3;T++){let S=(b()-.5)*240,A=-50+b()*150;if(!this.free(S,A,10)||Ka(S,A)<8)continue;let E=new pe().compose(new P(S,Si(S,A)-.05,A),new yt().setFromEuler(new zt(0,b()*6.28,0)),new P().setScalar(.8+b()*.8));(b()<.5?_:y).push(E)}g&&this.group.add($a(g,_,.8)),p&&this.group.add($a(p,y,.9))}sky(){let e=new _t({side:yn,depthWrite:!1,fog:!1,uniforms:{uSun:{value:this.sunDir},uTime:ni.time},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
        varying vec3 vD; uniform vec3 uSun; uniform float uTime;
        float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
        float fb(vec2 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ s += a * n(p); p *= 2.1; a *= 0.5; } return s; }
        void main(){
          vec3 d = normalize(vD); float y = max(d.y, -0.1);
          vec3 zen = vec3(0.30, 0.42, 0.66), mid = vec3(0.62, 0.66, 0.74), hor = vec3(0.98, 0.78, 0.52);
          vec3 c = mix(hor, mid, smoothstep(0.0, 0.22, y)); c = mix(c, zen, smoothstep(0.2, 0.75, y));
          float s = max(dot(d, uSun), 0.0);
          c += vec3(1.0, 0.62, 0.28) * pow(s, 6.0) * 0.55 + vec3(1.0, 0.85, 0.6) * pow(s, 60.0) * 0.8 + vec3(1.0, 0.95, 0.85) * smoothstep(0.9993, 0.9998, s) * 2.0;
          // m\xE2y t\u1EA7ng m\u1ECFng, s\xE1ng vi\u1EC1n ph\xEDa m\u1EB7t tr\u1EDDi
          vec2 cp = d.xz / max(0.08, d.y + 0.12) * 1.6 + vec2(uTime * 0.004, 0.0);
          float cl = smoothstep(0.52, 0.78, fb(cp)) * smoothstep(0.02, 0.18, y) * (1.0 - smoothstep(0.55, 0.9, y));
          vec3 cc = mix(vec3(0.62, 0.6, 0.66), vec3(1.0, 0.8, 0.6), pow(s, 3.0) * 0.8 + 0.2);
          c = mix(c, cc, cl * 0.75);
          c = mix(c, vec3(0.78, 0.68, 0.58), smoothstep(0.02, -0.08, d.y));
          gl_FragColor = vec4(c, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`}),t=new Ne(new It(1400,48,24),e);return t.renderOrder=-10,t.frustumCulled=!1,t}terrain(e){let n=new Vt(560,560,e,e).rotateX(-Math.PI/2);n.translate(0,0,10);let i=n.attributes.position,s=new Float32Array(i.count*3),a=new Float32Array(i.count*4),o=p=>new de(p),l=o(14201444),c=o(15388814),h=o(10925150),u=o(8229444),d=o(11570786),f=o(10129796),m=o(14469020),x=new de;for(let p=0;p<i.count;p++){let b=i.getX(p),_=i.getZ(p),y=Si(b,_);i.setY(p,y);let T=1.2,S=Math.hypot(Si(b+T,_)-Si(b-T,_),Si(b,_+T)-Si(b,_-T))/(2*T),A=ji(b*.018+11,_*.018+4,4),E=ji(b*.11,_*.11,3);x.copy(l).lerp(c,Ti(.35,.75,E)),x.lerp(h,Ti(.56,.76,A)*.7),x.lerp(u,Ti(.7,.88,A)*.45);let v=Bm(b,_),M=v<3.2&&Ka(b,_)<1?Ti(3.2,.6,v)*(.65+E*.3):0;x.lerp(d,M);let C=Math.hypot(b-$t.x,_-$t.z),U=C<$t.r+5?Ti($t.r+5,$t.r+.5,C):0;x.lerp(m,U);let k=Ti(.45,.9,S);x.lerp(f,k),a[p*4]=M,a[p*4+1]=k,a[p*4+2]=U,a[p*4+3]=Ti(.56,.8,A)*.75,x.multiplyScalar(.92+ji(b*.4,_*.4,2)*.16),s[p*3]=x.r,s[p*3+1]=x.g,s[p*3+2]=x.b}n.setAttribute("color",new Ct(s,3)),n.setAttribute("splat",new Ct(a,4)),n.computeVertexNormals();let g=new Ne(n,new ze({vertexColors:!0,map:$M(140),roughness:.97,metalness:0}));return g.receiveShadow=!0,g.position.y=-.025,g}water(){let e=new st,t=new Ne(new fi($t.r+2,64).rotateX(-Math.PI/2),kp(3103334,8366499));return t.position.set($t.x,-.55,$t.z),e.add(t),e}mountains(){let t=new Pt,n=[],i=[],s=[],a=new de(7305826),o=new de(8358566);for(let l=0;l<2;l++){let c=n.length/3,h=l?620:420,u=h+160;for(let d=0;d<=220;d++){let f=d/220*Math.PI*2,m=ji(Math.cos(f)*3+l*9,Math.sin(f)*3,5),x=(l?110:55)*Math.pow(m,1.6)+15,g=l?o:a;n.push(Math.cos(f)*h,-2,10+Math.sin(f)*h,Math.cos(f)*(h+60),x,10+Math.sin(f)*(h+60),Math.cos(f)*u,-2,10+Math.sin(f)*u);for(let p=0;p<3;p++)s.push(g.r,g.g,g.b);if(d<220)for(let[p,b]of[[0,1],[1,2]]){let _=c+d*3+p,y=c+d*3+b,T=_+3,S=y+3;i.push(_,T,y,y,T,S)}}}return t.setAttribute("position",new je(n,3)),t.setAttribute("color",new je(s,3)),t.setIndex(i),t.computeVertexNormals(),new Ne(t,new ze({vertexColors:!0,roughness:1,flatShading:!0,side:Rt}))}free(e,t,n=3){return!(Ka(e,t)<n&&e>Gt.minX-8&&e<Gt.maxX+8&&t>Gt.minZ-6&&t<Gt.maxZ+4||e>cn.minX-2&&e<cn.maxX+2&&t>-24&&t<cn.maxZ+2||Math.hypot(e-$t.x,t-$t.z)<$t.r+1.5)}grassMaterial(){let e=Rd(256,(n,i)=>{n.clearRect(0,0,256,256);for(let s=0;s<70;s++){let a=20+i()*216,o=2+i()*4,l=120+i()*130,c=(i()-.5)*50,h=170+i()*80|0,u=n.createLinearGradient(0,256,0,256-l);u.addColorStop(0,`rgb(${h*.8|0},${h*.74|0},${h*.5|0})`),u.addColorStop(1,`rgb(${h},${h*.93|0},${h*.7|0})`),n.fillStyle=u,n.beginPath(),n.moveTo(a-o,256),n.quadraticCurveTo(a+c*.4,256-l*.6,a+c,256-l),n.quadraticCurveTo(a+c*.4+o*.3,256-l*.6,a+o,256),n.fill()}},1,9);e.wrapS=e.wrapT=Bn;let t=new ze({map:e,alphaTest:.45,side:Rt,roughness:.95});return t.onBeforeCompile=n=>{n.uniforms.uTime=ni.time,n.vertexShader=`uniform float uTime;
`+n.vertexShader.replace("#include <begin_vertex>",`
        vec3 transformed = vec3(position);
        vec3 ip = vec3(instanceMatrix[3][0], 0.0, instanceMatrix[3][2]);
        float h = clamp(position.y, 0.0, 1.0);
        transformed.x += sin(uTime * 1.8 + ip.x * 0.21 + ip.z * 0.13) * 0.16 * h * h;
        transformed.z += cos(uTime * 1.3 + ip.z * 0.17) * 0.08 * h * h;`)},t}grass(e){let t=[0,1,2].map(m=>new Vt(1.1,.8).translate(0,.4,0).rotateY(m*Math.PI/3)),n=vs(t),i=n.attributes.normal;for(let m=0;m<i.count;m++)i.setXYZ(m,0,1,0);let s=new Ut(n,this.grassMat,e),a=$r(77),o=new pe,l=new yt,c=new P,h=new P,u=new de,d=new zt,f=0;for(let m=0;f<e&&m<e*6;m++){let x=(a()-.5)*260,g=-60+a()*170;if(Ka(x,g)<26||!this.free(x,g,0)&&(Bm(x,g)<3.5||x>cn.minX-1&&x<cn.maxX+1&&g>cn.minZ-3&&g<cn.maxZ+1||a()<.85)||Math.hypot(x-$t.x,g-$t.z)<$t.r+.5)continue;let b=Si(x,g),_=ji(x*.018+11,g*.018+4,4),y=.6+a()*.9;u.setHex(_>.58?10269786:a()<.5?14926972:13610598).multiplyScalar(.85+a()*.3),s.setMatrixAt(f,o.compose(h.set(x,b-.03,g),l.setFromEuler(d.set(0,a()*6.28,0)),c.set(y,y*(.7+a()*.7),y))),s.setColorAt(f++,u)}return s.count=f,s.receiveShadow=!0,s}trees(e){let t=$r(31),n=(u,d,f)=>{let m=u.attributes.position,x=$r(f);for(let g=0;g<m.count;g++)m.setXYZ(g,m.getX(g)+(x()-.5)*d,m.getY(g)+(x()-.5)*d,m.getZ(g)+(x()-.5)*d);return u.computeVertexNormals(),u},i=(u,d)=>{let f=new de(d),m=u.attributes.position.count,x=new Float32Array(m*3);for(let g=0;g<m;g++){let p=.85+Math.random()*.25;x[g*3]=f.r*p,x[g*3+1]=f.g*p,x[g*3+2]=f.b*p}return u.setAttribute("color",new Ct(x,3)),u},s=u=>u.index?u.toNonIndexed():u,a=vs([i(s(new dt(.18,.32,6.5,8).translate(0,3.25,0)),5914672),i(s(n(new fn(1,2).scale(3.4,1.1,3.4).translate(0,6.8,0),.35,1)),5073708),i(s(n(new fn(1,2).scale(2.4,.9,2.2).translate(1.2,7.5,.6),.3,2)),5929524),i(s(n(new fn(1,1).scale(1.8,.8,1.9).translate(-1.3,7.2,-.7),.3,3)),4612906)]),o=vs([i(s(new dt(.12,.2,1.2,6).translate(0,.6,0)),4863012),i(s(n(new fn(1,2).scale(1.1,4.6,1.1).translate(0,4.6,0),.25,4)),3099174)]),l=vs([i(s(n(new fn(1,2).scale(1.5,1,1.4).translate(0,.7,0),.3,5)),6257202),i(s(n(new fn(1,1).scale(1,.8,1).translate(.9,.6,.4),.25,6)),7309882)]),c=new ze({vertexColors:!0,roughness:.9,flatShading:!0}),h=(u,d,f,m,x,g)=>{let p=new Ut(u,c,d);p.castShadow=!0,p.receiveShadow=!0;let b=new pe,_=new yt,y=new P,T=new P,S=new zt,A=0,E=0,v=0;for(let M=0;A<d&&M<d*30;M++){(A%f===0||M%40===0)&&(E=(t()-.5)*420,v=-120+t()*300);let C=E+(t()-.5)*m,U=v+(t()-.5)*m;if(!this.free(C,U,6)||Math.abs(C)>270||U>200)continue;let k=x+t()*(g-x);p.setMatrixAt(A++,b.compose(T.set(C,Si(C,U)-.2,U),_.setFromEuler(S.set((t()-.5)*.08,t()*6.28,(t()-.5)*.08)),y.set(k,k*(.85+t()*.3),k)))}return p.count=A,p};return[h(a,e?420:200,14,46,.7,1.3),h(o,e?260:120,6,22,.7,1.3),h(l,e?700:300,10,34,.5,1.4)]}rocks(){let e=new fn(1,3),t=e.attributes.position,n=new P;for(let x=0;x<t.count;x++){n.fromBufferAttribute(t,x);let g=.75+ji(n.x*2+5,n.y*2+n.z*1.7,4)*.6;n.multiplyScalar(g),n.y=Math.max(n.y,-.35)*(n.y>0?.8:1),t.setXYZ(x,n.x,n.y,n.z)}e.computeVertexNormals();let i=Rd(256,(x,g)=>{x.fillStyle="#b8b0a2",x.fillRect(0,0,256,256);for(let p=0;p<4e3;p++){let b=120+g()*110|0;x.fillStyle=`rgba(${b},${b-6},${b-14},0.35)`,x.fillRect(g()*256,g()*256,1+g()*4,1+g()*3)}for(let p=0;p<60;p++){x.strokeStyle="rgba(70,62,54,0.35)",x.lineWidth=1+g()*2,x.beginPath();let b=g()*256,_=g()*256;x.moveTo(b,_),x.lineTo(b+(g()-.5)*60,_+(g()-.5)*40),x.stroke()}},2,13),s=new Ut(e,new ze({map:i,roughness:.92,color:14209216}),420);s.castShadow=!0,s.receiveShadow=!0;let a=$r(55),o=new pe,l=new yt,c=new P,h=new P,u=new zt,d=new de,f=0,m=(x,g,p,b,_)=>{f>=420||(s.setMatrixAt(f,o.compose(h.set(x,Si(x,g)-b*.15,g),l.setFromEuler(u.set((a()-.5)*.4,a()*6.28,(a()-.5)*.4)),c.set(p,b,_))),s.setColorAt(f++,d.setHSL(.08,.1+a()*.1,.55+a()*.2)))};for(let x of cm)!x.enemyOf&&(Math.abs(x.x)>15&&Math.abs(x.x)<40||x.x===0&&x.z===25)&&m(x.x,x.z,x.r*1.1,x.r*.9,x.r);for(let x=0;x<26;x++){let g=Math.PI*.75+x/26*Math.PI*1.1,p=$t.r+1+a()*3,b=2+a()*3.5;m($t.x+Math.cos(g)*p,$t.z+Math.sin(g)*p,b*1.4,b*(.8+a()*.8),b)}for(let x=0;f<420&&x<3e3;x++){let g=(a()-.5)*400,p=-100+a()*260;if(!this.free(g,p,8))continue;let b=.3+Math.pow(a(),3)*4;m(g,p,b*(1+a()),b*(.6+a()*.6),b)}return s.count=f,s}};function KM(r){let e=n=>r.tex.get(n),t=new ze({map:e("drygrass").map,normalMap:e("drygrass").normal,roughness:1,metalness:0,vertexColors:!1});return t.normalMap&&(t.normalMap=t.normalMap.clone(),t.normalMap.repeat.set(120,120),t.normalMap.needsUpdate=!0,t.normalScale.setScalar(.8)),t.onBeforeCompile=n=>{Object.assign(n.uniforms,{tGrass:{value:e("grass").map},tDirt:{value:e("dirt").map},tRock:{value:e("rock").map},tSand:{value:e("sand").map}}),n.vertexShader=`attribute vec4 splat;
attribute vec3 color;
varying vec4 vSplat;
varying vec3 vTint;
varying vec3 vWP;
`+n.vertexShader.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
vSplat = splat; vTint = color; vWP = (modelMatrix * vec4(transformed, 1.0)).xyz;`),n.fragmentShader=`uniform sampler2D tGrass;
uniform sampler2D tDirt;
uniform sampler2D tRock;
uniform sampler2D tSand;
varying vec4 vSplat;
varying vec3 vTint;
varying vec3 vWP;
`+n.fragmentShader.replace("#include <map_fragment>",`
      vec2 p = vWP.xz;
      vec3 dry = mix(texture2D(map, p * 0.22).rgb, texture2D(map, p * 0.047 + 0.3).rgb, 0.45) * vec3(1.1, 1.0, 0.78);
      vec3 grn = mix(texture2D(tGrass, p * 0.2).rgb, texture2D(tGrass, p * 0.05).rgb, 0.4);
      vec3 col = mix(dry, grn, vSplat.w);
      col = mix(col, texture2D(tDirt, p * 0.25).rgb, vSplat.x);
      col = mix(col, texture2D(tSand, p * 0.2).rgb, vSplat.z);
      col = mix(col, texture2D(tRock, p * 0.12).rgb, vSplat.y);
      // s\xE1ng t\u1ED1i l\u1EDBn theo m\xE0u \u0111\u1EC9nh (gi\u1EEF m\u1EA3ng v\xE0ng, m\u1EA3ng xanh c\u1EE7a \u0111\u1ECBa h\xECnh), ch\u1EC9nh v\u1EC1 \u0111\u1ED9 s\xE1ng chung
      col *= clamp(vTint / vec3(0.78, 0.66, 0.42), 0.55, 1.35);
      diffuseColor.rgb *= col;`)},t}function Ya(r,e,t,n,i){let s=Tm(r,e,i,t);if(!s)return null;let a=new st;for(let[o,l]of[[s.wood,s.woodMat],[s.leaves,s.leafMat]]){let c=new Ut(o,l,n.length);c.castShadow=!0,c.receiveShadow=!0,n.forEach((h,u)=>c.setMatrixAt(u,h)),c.instanceMatrix.needsUpdate=!0,c.computeBoundingSphere(),a.add(c)}return a}function $a(r,e,t){let n=new st;if(!e.length)return n;r.updateMatrixWorld(!0);let i=new vn().setFromObject(r),s=i.getSize(new P),a=i.getCenter(new P),o=t*2/Math.max(s.x,s.z,.001),l=new pe().makeScale(o,o,o).multiply(new pe().makeTranslation(-a.x,-i.min.y,-a.z));return r.traverse(c=>{let h=c;if(!h.isMesh)return;let u=new Ut(h.geometry,h.material,e.length);u.castShadow=!0,u.receiveShadow=!0;let d=new pe().multiplyMatrices(l,h.matrixWorld),f=new pe;e.forEach((m,x)=>u.setMatrixAt(x,f.multiplyMatrices(m,d))),u.instanceMatrix.needsUpdate=!0,u.computeBoundingSphere(),n.add(u)}),n}var Zr=new URLSearchParams(location.search),$s=Zr.has("live"),ZM=(()=>{try{return localStorage.getItem("chien.q")}catch{return null}})(),Ai=(r=>r==="medium"||r==="high"||r==="ultra"?r:null)(Zr.get("q")??(Zr.has("lite")?"medium":ZM))??"high",Qa=Ai==="medium",zm=Math.max(0,Math.min(1e3,+(Zr.get("bench")??0)|0));document.body.classList.toggle("live",$s);var Qm=Ke("scene"),mi=new Yo({canvas:Qm,antialias:!Qa,powerPreference:"high-performance"});mi.setPixelRatio(Math.min(devicePixelRatio,Ms[Ai].pixel));mi.shadowMap.enabled=!0;mi.shadowMap.type=Qa?Pa:vl;mi.toneMapping=Ia;mi.toneMappingExposure=1.18;var pn=new Ko,ac=new nc(Qa?"low":"high");pn.add(ac.group);pn.background=new de(15255968);pn.fog=new $o(14468256,150,760);var Kn=new nn(42,1,.5,3e3),e0=new fl(14674175,11569754,1.35);pn.add(e0);var Cn=new Hs(16767400,3);Cn.castShadow=!0;Cn.shadow.mapSize.setScalar(Ms[Ai].shadow);Object.assign(Cn.shadow.camera,{left:-55,right:55,top:55,bottom:-55,near:1,far:400});Cn.shadow.camera.updateProjectionMatrix();Cn.shadow.bias=-4e-4;Cn.shadow.normalBias=.04;pn.add(Cn,Cn.target);var t0=new Hs(12374271,.55);t0.position.set(30,25,60);pn.add(t0);function jM(r){Cn.target.position.set(r.x,0,r.z),Cn.position.copy(Cn.target.position).addScaledVector(ac.sunDir,160),Cn.target.updateMatrixWorld()}var oc=new Rl,wi=new Nl(oc.canvas,oc.frames);oc.onChange=()=>{wi.sign.needsUpdate=!0;for(let r of wi.frames)r.needsUpdate=!0};wi.showTables(lm);wi.grassMesh.visible=!1;{let r=wi.groundMesh,e=cn.maxX-cn.minX,t=cn.maxZ-cn.minZ;r.scale.set(e/60,1,t/60),r.position.set(0,0,(cn.minZ+cn.maxZ)/2);let n=r.material;n.map?.repeat.set(10*e/60,10*t/60),n.color.setHex(15785144)}var Ys=new Al;pn.add(wi.group,Ys.group);var lc={trai:new Fa("trai"),gai:new Fa("gai")};pn.add(lc.trai.group,lc.gai.group);pn.add(s1());var ft=new Zl(!Qa);pn.add(ft.group);var jr=new ec;pn.add(jr.group);ft.models=jr;jr.skinCap=Ms[Ai].skins;jr.load().then(r=>{r.length&&ut.feed(`\u{1F9E9} \u0110\xE3 n\u1EA1p model 3D: ${r.map(e=>Wt[e].name).join(", ")}`,"note")});var gt=new $l;pn.add(gt.group);var Ge=new Ql,qs=new P;Ge.locate=(r,e)=>{qs.set(r,1,e);let t=Kn.position.distanceTo(qs);qs.project(Kn);let n=Math.max(Math.abs(qs.x),Math.abs(qs.y))>1.1||qs.z>1,i=Math.min(1.25,Math.max(.45,1.5-.5*t/Math.max(20,Ve.distance)));return{pan:Math.max(-1,Math.min(1,qs.x))*.75,gain:(n?.3:1)*i}};gt.onArrowLand=(r,e)=>Ge.play("thunk",.8,r,e);var Za=new Map,cc=bd(mi,pn,Kn,Ai,innerWidth,innerHeight);function n0(r,e=""){if(r===Ai)return;Ai=r;try{e||localStorage.setItem("chien.q",r)}catch{}let t=Ms[r];mi.setPixelRatio(Math.min(devicePixelRatio,t.pixel)),Cn.shadow.mapSize.setScalar(t.shadow),Cn.shadow.map?.dispose(),Cn.shadow.map=null,mi.shadowMap.type=r==="medium"?Pa:vl,cc.dispose(),cc=bd(mi,pn,Kn,r,innerWidth,innerHeight),Ld(),jr&&(jr.skinCap=t.skins);let n=document.getElementById("qSel");n&&(n.value=r),ut.feed(`\u{1F3A8} \u0110\u1ED3 h\u1ECDa: ${t.label}${e?" \xB7 "+e:""}`,"note")}var Es=new Bl;Es.load(mi).then(r=>{if(!r){console.info("Ch\u01B0a c\xF3 t\xE0i nguy\xEAn HD (ch\u1EA1y: npm run assets). D\xF9ng v\u1EADt li\u1EC7u d\u1EF1ng s\u1EB5n.");return}Es.env&&(pn.environment=Es.env,pn.environmentIntensity=.6,e0.intensity=.55),ac.applyHD(Es,Ms[Ai].detail),ym(Es);let e=wi.groundMesh,t=cn.maxX-cn.minX,n=cn.maxZ-cn.minZ,i=Es.material("courtyard",{normalScale:1});if(i){for(let o of[i.map,i.normalMap,i.roughnessMap,i.aoMap])o?.repeat.set(t/2.2,n/2.2);e.material=i}let s=Es.material("carpet",{color:12065816,rough:1});if(s){for(let o of[s.map,s.normalMap,s.roughnessMap])o?.repeat.set(1.5,8);wi.carpetMesh.material=s}let a=[{x:-9.2,z:-1.6,s:1.45}];{let o=5,l=()=>(o=o*16807%2147483647)/2147483647;for(let c=0;c<26;c++){let h=-26+c*2.1+l(),u=3+l()*2.5,d=-11-l()*4;a.push({x:h,z:d,s:.55+u*.12,...c%3===1?{tall:!0}:{}})}}ac.plantTrees(Es,a)&&wi.group.traverse(o=>{let l=o;l.isInstancedMesh&&l.material.flatShading&&l.instanceMatrix.count===120&&(l.visible=!1)}),ut.feed("\u2728 \u0110\xE3 n\u1EA1p \u0111\u1ED3 h\u1ECDa HD: v\xE2n th\u1EADt, \xE1nh s\xE1ng HDR, c\xE2y \u0111\xE1 qu\xE9t 3D","note")});var Ve=new Yl(Kn,Qm);{let r=(Zr.get("look")??"").split(",").map(Number);r.length>=3&&r.every(Number.isFinite)&&Ve.fixAt(r[0],r[1],r[2],r[3]||.6)}{let r=Zr.get("cam")??"";/^lane[123]$/.test(r)?Ve.setMode("lane",+r.slice(4)-1):(r==="overview"||r==="combat"||r==="auto")&&Ve.setMode(r)}var ut=new Jl($s);function Ld(){let r=innerWidth,e=innerHeight,t=r/e<.8;mi.setSize(r,e,!1),cc.setSize(r,e),Kn.aspect=r/e,Kn.fov=t?50:36,Kn.updateProjectionMatrix(),gt.setViewport(e*Math.min(devicePixelRatio,Qa?1:2),Kn.fov);let n=Ke("gl_trai"),i=Ke("hudBottom"),s=Ke("hudTop");t?n.parentElement!==i&&i.insertBefore(n,Ke("howto")):n.parentElement!==s&&s.insertBefore(n,Ke("gl_gai"));let a=Ke("lastGift"),o=document.querySelector("#hudTop .center");t?a.parentElement!==i&&i.insertBefore(a,n):a.parentElement!==o&&o.append(a),Dd()}function Dd(){let r=innerHeight,e=innerWidth/r<.8,t=e?Ke("pk"):document.querySelector("#hudTop .center");pn.traverse(s=>{s.userData.laneLabel&&(s.rotation.y=Ve.base)});let n=t.getBoundingClientRect().bottom+6,i=e?Ke("hudBottom").getBoundingClientRect().top-6:r-46;Ve.safe={x0:-.97,x1:.97,y0:1-2*Math.max(r*.6,i)/r,y1:1-2*Math.min(r*.45,n)/r}}addEventListener("resize",Ld);Ld();setInterval(Dd,2e3);var $n=null,Vm=$s?"view":"control",Gm=0,JM=ft.plated,Pd=null,Wm=0;function i0(){let r=new WebSocket(`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws?role=${$s?"view":"control"}`);Pd=r,r.onopen=()=>{Wm=0,Ke("offline").hidden=!0},r.onclose=()=>{Ke("offline").hidden=!1,setTimeout(i0,Math.min(8e3,500*2**Wm++))},r.onmessage=e=>{let t;try{t=JSON.parse(e.data)}catch{return}QM(t)}}var Kt=r=>{Pd?.readyState===1&&Pd.send(JSON.stringify(r))};function QM(r){let e=performance.now();switch(r.t){case"hello":Vm=r.role,ft.clear();for(let t of r.units)ft.add(t,0,0,e-5e3);ft.applyFrame(r.frame.u,r.frame.tick,e),ft.applyFrame(r.frame.u,r.frame.tick,e),qm(r.hud),Vm==="control"&&n1();break;case"f":{for(let n of r.ev)e1(n,e);ft.applyFrame(r.u,r.tick,e)&&e-Gm>3e3&&(Gm=e,Kt({t:"resync"}));break}case"h":qm(r.hud);break;case"log":{let t=document.getElementById("log");if(t)for(t.prepend(re("div","",r.text));t.childElementCount>40;)t.lastElementChild.remove();break}}}var Xm="";function qm(r){$n=r,ft.tickMs=r.tickMs,ft.winner=r.round.state==="ended"&&r.result?r.result.winner:"";for(let l of Br)lc[l].set(r.teams[l]);ut.showOnLive=r.settings.showBoard,ut.render(r),ft.honor=ut.honor;let e=document.getElementById("liveBoard");e&&(e.checked=r.settings.showBoard),Ge.intensity=r.round.state!=="running"?0:{taphop:1,giaotranh:1,tongtancong:2,boss:3,quyetchien:4}[r.round.phase];let t=l=>{let c=r.teams[l].top[0];return c?{id:c.id,name:c.name,gifted:c.gift,avatar:c.avatar.startsWith("/avatar/")}:null},n=t("gai"),i=t("trai"),s=JSON.stringify([n?.id,n?.name,i?.id,i?.name]);s!==Xm&&(Xm=s,oc.draw({bride:n,groom:i}),s0());let a=document.getElementById("ttStatus");a&&(a.textContent=r.live.status==="connected"?`\u2705 \u0110ang nh\u1EADn qu\xE0 t\u1EEB @${r.live.uniqueId}`:r.live.status==="idle"?"Ch\u01B0a k\u1EBFt n\u1ED1i TikTok. Gift Simulator d\xF9ng \u0111\u01B0\u1EE3c.":`${r.live.status}${r.live.error?": "+r.live.error:""}${r.live.attempt?` (l\u1EA7n ${r.live.attempt})`:""}`),document.body.classList.toggle("simLocked",r.settings.simLocked);let o=Ke("livePill");o.textContent=r.live.status==="connected"?"\u{1F534} LIVE":r.live.status==="reconnecting"?"\u{1F7E0} \u0110ang n\u1ED1i l\u1EA1i":"\u26AA Ch\u01B0a LIVE",o.className="pill "+r.live.status}var ja={bride:"co-dau",groom:"chu-re"};function s0(){let r=performance.now(),e=$n,t=e?.teams.gai.top[0],n=e?.teams.trai.top[0];ja={bride:t?.id??"co-dau",groom:n?.id??"chu-re"},Ys.set(ja.bride,t?.name??"C\xF4 d\xE2u","bride",{x:-.75,z:2.1,yaw:0},kl,r),Ys.set(ja.groom,n?.name??"Ch\xFA r\u1EC3","groom",{x:.75,z:2.1,yaw:0},kl,r),rm.forEach((i,s)=>Ys.set("band-"+s,"","band",i,kl,r)),Ys.prune(r)}s0();var Ym=0,$m=0,ic=new Set,sc=new Map;function e1(r,e){switch(r.e){case"spawn":{let t=ft.add(r.u,r.x,r.z,e),n=Wt[r.u.kind];gt.spawn(r.x,r.z,ht[r.u.team].color,n.tier),Ge.play("spawn");break}case"merge":{let t=ft.units.get(r.id);t&&(t.info={...t.info,stack:r.stack,maxHp:r.maxHp},gt.burst(t.rx,1.4,t.rz,[ht[t.team].color,16777215],8,2.5));break}case"atk":{let t=ft.units.get(r.id);if(!t||(t.atkAt=e,t.atkV=r.v,t.def.projectile))break;let n=t.info.kind,i=ht[t.team].color;if(n==="danbinh"||n==="dausi")t.visible&&gt.slash(t.rx,t.rz,t.ryaw,n==="dausi"?16773320:i,n==="dausi"),Ge.play("swing",.7,t.rx,t.rz),(n==="dausi"||Math.random()<.35)&&Ge.play("clash",n==="dausi"?.9:.5,t.rx,t.rz);else if(n==="trau"||n==="voi"){let s=t.rx+Math.sin(t.ryaw)*1.4,a=t.rz+Math.cos(t.ryaw)*1.4;gt.gore(s,a,t.ryaw),Ge.play("gore",n==="voi"?1:.8,s,a),Ve.shake=Math.max(Ve.shake,n==="voi"?.3:.18)}else Ge.play("slam",.6,t.rx,t.rz),t.visible&&gt.slash(t.rx,t.rz,t.ryaw,16763024,!0);break}case"shot":{let t=r.t>0?r.t:0;gt.arrow(r.x,r.z,r.tx,r.tz,r.ms,t?()=>{let s=ft.units.get(t);return s&&s.state!=="dead"?{x:s.rx,z:s.rz}:null}:null);let n=ft.units.get(r.id),i=!!n&&!!(n.flags&ii.volley);n?.visible&&gt.muzzle(r.x,r.z,n.ryaw,!1,ht[n.team].color),Ge.play("twang",i?.6:.8,r.x,r.z);break}case"hit":{let t=r.id>0?ft.units.get(r.id):null,n=t?t.ry+jl(t.info.kind)*.7:2.4;t&&(t.hitAt=e,t.dmgAt=e),gt.impact(r.x,r.z,r.big,r.crit,r.block),r.block?Ge.play("block",1,r.x,r.z):Ge.play("hit",Math.min(1.5,.4+r.dmg/300),r.x,r.z),r.crit&&!r.block&&Ge.play("clash",.8,r.x,r.z);for(let i of ic){let s=ft.units.get(i);if(!s||!(s.flags&ii.charge)){ic.delete(i);continue}if(Math.hypot(s.rx-r.x,s.rz-r.z)<2.6){gt.gore(r.x,r.z,s.ryaw),Ge.play("gore",1,r.x,r.z),Ve.shake=Math.max(Ve.shake,.4);break}}(r.big||r.crit||r.block||r.id<0||t&&t.def.boss||Math.random()<.25)&&ut.damage(r.x,n,r.z,r.dmg,r.crit,r.block,r.big);break}case"skill":{let t=ft.units.get(r.id);if(!t)break;let n=ht[t.team].color;r.phase==="start"?(t.skill=r.k,t.skillAt=e,r.k==="boost"&&(Ge.play("cart",1,t.rx,t.rz),gt.puff(t.rx,t.rz,10,12166540,.6,.8)),r.k==="charge"&&(ic.add(t.id),Ge.play("snort",1,t.rx,t.rz),Ge.play("moo",1,t.rx,t.rz),Ge.play("gallop",1,t.rx,t.rz),gt.charge(t.rx,t.rz,t.ryaw,n),Ve.shake=Math.max(Ve.shake,.2)),r.k==="roar"&&Ge.play("trumpet",1.1,t.rx,t.rz),r.k==="stomp"&&Ge.play("trumpet",1,t.rx,t.rz),r.k==="volley"&&(Ge.play("volley",1,t.rx,t.rz),gt.muzzle(t.rx,t.rz,t.ryaw,!0,n))):r.phase==="hit"&&(r.k==="slam"&&(gt.ring(r.x,r.z,r.r,16765562,.5),gt.puff(r.x,r.z,10,11048047,.8,1.2),Ge.play("slam",1,r.x,r.z),Ve.shake=Math.max(Ve.shake,.25)),r.k==="stomp"&&(gt.stomp(r.x,r.z,r.r),Ge.play("stomp",1.2,r.x,r.z),Ve.shake=Math.max(Ve.shake,.9)),r.k==="roar"&&(gt.roar(r.x,r.z,r.r,n),Ge.play("roar",1,r.x,r.z),Ve.shake=Math.max(Ve.shake,.45)),r.k==="boost"&&(gt.ring(r.x,r.z,r.r,16752698,.5),gt.burst(r.x,.8,r.z,[16761402,16777215],24,6),gt.puff(r.x,r.z,12,11048047,1,1.5),Ge.play("slam",1,r.x,r.z),Ve.shake=Math.max(Ve.shake,.3)));break}case"die":{let t=ft.units.get(r.id),n=ft.units.get(r.by);n&&(n.killAt=e),gt.death(r.x,r.z,!!t?.def.boss),Ge.play("die",.6,r.x,r.z),Za.delete(r.id),ic.delete(r.id),t?.def.boss&&(Ge.play(t.info.kind==="voi"?"trumpet":"moo",1,r.x,r.z),Ve.shake=Math.max(Ve.shake,.6));break}case"kill":{let t=sc.get(r.killer)??{n:0,at:-1e9,best:r.vkind};if(t.n++,Wt[r.vkind].tier>Wt[t.best].tier&&(t.best=r.vkind),sc.set(r.killer,t),e-t.at<3500||e-Ym<1200)break;ut.feed(t.n>1?`\u2694\uFE0F ${r.killerName} ${Wt[r.kind].icon} h\u1EA1 ${t.n} qu\xE2n (c\xF3 ${Wt[t.best].icon} ${Wt[t.best].name})`:`\u2694\uFE0F ${r.killerName} ${Wt[r.kind].icon} h\u1EA1 ${Wt[r.vkind].icon} ${r.victimName}`,"kill "+r.team),t.n=0,t.at=e,t.best="danbinh",Ym=e,sc.size>300&&sc.clear(),Ge.play("kill");break}case"base":{let t=ht[r.team],n=Nt[r.team][r.part];r.destroyed&&(gt.explosion(n.x,2,n.z),Ve.shake=Math.max(Ve.shake,r.part==="house"?1.2:.8),Ge.play(r.part==="house"?"house":"gate"),ut.banner(r.part==="gate"?`\u{1F4A5} C\u1ED5ng ${t.name} \u0111\xE3 v\u1EE1!`:`\u{1F3DA}\uFE0F Nh\xE0 ch\xEDnh ${t.name} s\u1EE5p \u0111\u1ED5!`,r.part==="gate"?"T\u1EA5n c\xF4ng nh\xE0 ch\xEDnh!":"",r.team,2600),ut.feed(r.part==="gate"?`\u{1F4A5} C\u1ED5ng ${t.name} \u0111\xE3 v\u1EE1!`:`\u{1F3DA}\uFE0F Nh\xE0 ch\xEDnh ${t.name} s\u1EE5p \u0111\u1ED5!`,"alert "+r.team));break}case"boss":{if(ut.boss(r.name,r.avatar,r.team,r.kind),ut.feed(`\u{1F451} ${r.name} tri\u1EC7u h\u1ED3i ${Wt[r.kind].icon} ${Wt[r.kind].name}!`,"boss "+r.team),Ge.play("boss"),Ge.play(r.kind==="voi"?"trumpet":"moo"),gt.pillar(Nt[r.team].spawn.x,Nt[r.team].spawn.z,16765773,!0),r.kind==="voi"&&Kn.aspect>=.8){let t=r.id;Ve.boss(()=>{let n=ft.units.get(t);return n?new P(n.rx,0,n.rz):null})}Cd(r.team,4e3);break}case"gift":{ut.gift(r.name,r.avatar,r.team,r.kind,r.count,r.giftName,r.units??r.count),ut.feed(`\u{1F381} ${r.name}: ${r.count>1?r.count+" \xD7 ":""}${r.giftName} \u2192 ${Wt[r.kind].icon} ${r.units??r.count} ${Wt[r.kind].name}`,"gift "+r.team),Ge.play("gift"),Cd(r.team,2e3);break}case"honor":{let t=r.rank<=3?["\u{1F947}","\u{1F948}","\u{1F949}"][r.rank-1]:"\u{1F3C6}";ut.banner(`${t} Top ${r.rank} l\u1EF1c chi\u1EBFn th\xE1ng`,`${r.name} \u0111\xE3 v\xE0o chi\u1EBFn tr\u01B0\u1EDDng \xB7 ${r.power.toLocaleString("vi-VN")} l\u1EF1c chi\u1EBFn`,"phase",3500),ut.feed(`${t} Top ${r.rank} l\u1EF1c chi\u1EBFn th\xE1ng ${r.name} \u0111\xE3 v\xE0o!`,"boss"),Ge.play("boss");break}case"like":{let t=Nt[r.team].spawn;gt.burst(t.x,2,t.z,[16731514,16752576,16777215],10,3,1),Ge.play("spawn",.7,t.x,t.z),e-$m>1500&&($m=e,ut.feed(`\u2764\uFE0F ${r.name} th\u1EA3 tim \u2192 +${r.units} \u{1F962} D\xE2n binh cho ${ht[r.team].name}`,r.team));break}case"threat":ut.feed(`\u{1F6A8} C\u0103n c\u1EE9 ${ht[r.team].name} \u0111ang b\u1ECB t\u1EA5n c\xF4ng!`,"alert "+r.team),Ge.play("alarm");break;case"team":ut.feed(r.locked?`\u{1F512} ${r.name} \u0111ang c\xF3 qu\xE2n b\xEAn ${ht[r.team].name}, \u0111\u1ED5i phe t\u1EEB v\xF2ng sau`:`${ht[r.team].icon} ${r.name} gia nh\u1EADp ${ht[r.team].name}`,r.team);break;case"phase":ut.banner(`\u2694\uFE0F ${r.name}`,r.text,"phase",2600),ut.feed(`\u{1F4EF} ${r.name}: ${r.text}`,"note"),Ge.play("go");break;case"round":if(r.state==="countdown"&&(ut.banner(`V\xF2ng ${r.round}`,"Chu\u1EA9n b\u1ECB! B\xECnh lu\u1EADn 1 v\xE0o Nh\xE0 Trai \xB7 2 v\xE0o Nh\xE0 G\xE1i","phase",3e3),Ge.play("beep")),r.state==="running"&&(ut.banner("\u2694\uFE0F XU\u1EA4T TR\u1EACN!","T\u1EADp h\u1EE3p qu\xE2n tr\u01B0\u1EDBc c\u1ED5ng","phase",2200),Ge.play("go")),r.state==="ended"){let t=r.winner;if(t&&t!=="draw"){Ge.play("win"),Cd(t,15e3);for(let n=0;n<6;n++)setTimeout(()=>gt.burst((Math.random()-.5)*20,8+Math.random()*3,4+Math.random()*8,[16766042,ht[t].color,16777215],50,5,1.4),n*350)}else Ge.play("lose")}r.state==="idle"&&(ft.clear(),ut.feed("\u{1F504} Tr\u1EADn \u0111\xE3 \u0111\u01B0\u1EE3c \u0111\u1EB7t l\u1EA1i","note")),r.state==="paused"&&ut.banner("\u23F8 T\u1EA1m d\u1EEBng","","phase",1500);break}}function Cd(r,e){Ys.cheer(r==="gai"?ja.bride:ja.groom,e)}function t1(){let r=new Map;for(let l of ft.units.values()){if(l.state!=="attack"&&l.state!=="skill")continue;let c=Math.floor(l.rx/4)*1e3+Math.floor(l.rz/4),h=r.get(c)??{w:0,k:0,x:0,z:0};h.w+=l.def.tier,h.k++,h.x+=l.rx,h.z+=l.rz,r.set(c,h)}let e=null;for(let l of r.values())(!e||l.w>e.w)&&(e=l);Ve.setCombat(e&&e.w>=4?new P(e.x/e.k,0,e.z/e.k):null);let t=new Map,n=1/0,i=-1/0,s=0,a=0;for(let l of ft.units.values()){if(l.state==="dead"||(n=Math.min(n,l.rx),i=Math.max(i,l.rx),s+=l.rz,a++,l.state!=="attack"&&l.state!=="skill"&&l.state!=="approach"))continue;let c=Math.floor(l.rx/12)*1e3+Math.floor(l.rz/12),h=t.get(c)??{w:0,k:0,x:0,z:0};h.w+=l.def.tier*(l.state==="approach"?.5:1),h.k++,h.x+=l.rx,h.z+=l.rz,t.set(c,h)}let o=null;for(let l of t.values())(!o||l.w>o.w)&&(o=l);o&&o.w>=6?Ve.setFocus(new P(o.x/o.k,0,o.z/o.k),40):a&&i-n<70?Ve.setFocus(new P((n+i)/2,0,s/a),i-n+18):Ve.setFocus(new P(0,0,10),0)}setInterval(t1,500);var Km=!1;function n1(){if(Km||$s)return;Km=!0;let r=Ke("ctl");r.hidden=!1;let e=Ke("ctlBody");Ke("ctlToggle").onclick=()=>{e.hidden=!e.hidden,Mn("open",!e.hidden),Dd()},e.hidden=Mn("open")===!1;let t=(J,oe,xe="b")=>{let Le=re("button",xe,J);return Le.onclick=oe,Le},n=(...J)=>{let oe=re("div","line");return oe.append(...J),oe},i=(J,oe,xe,...Le)=>{let $=re("details");return $.open=Mn("s."+J)??xe,$.ontoggle=()=>Mn("s."+J,$.open),$.append(re("summary","",oe),...Le),$},s=(J,oe="",xe="text")=>{let Le=re("input");return Le.placeholder=J,Le.value=oe,Le.type=xe,Le},a=s("@username TikTok",Mn("tt")??""),o=re("div","note");o.id="ttStatus";let l=s("T\xEAn ng\u01B0\u1EDDi ch\u01A1i",Mn("name")??"\xDAt M\xEDt"),c=s("Link \u1EA3nh \u0111\u1EA1i di\u1EC7n (t\xF9y ch\u1ECDn)",Mn("avatar")??"");l.onchange=()=>Mn("name",l.value),c.onchange=()=>Mn("avatar",c.value);let h=re("select");for(let[J,oe]of[["auto","\u{1F3B2} T\u1EF1 chia phe"],["trai","\u{1F935} Nh\xE0 Trai"],["gai","\u{1F470} Nh\xE0 G\xE1i"]]){let xe=re("option","",oe);xe.value=J,h.append(xe)}h.value=Mn("team")??"auto",h.onchange=()=>Mn("team",h.value);let u=s("S\u1ED1 l\u01B0\u1EE3ng","1","number");u.min="1",u.max="100",u.style.width="64px";let d=re("label","tg"),f=re("input");f.type="checkbox",d.append(f,document.createTextNode(" G\u1EEDi d\u1EA1ng combo"));let m=re("div","gifts");um.forEach((J,oe)=>{let xe=Object.values(Wt)[oe],Le=re("button","gb");Le.onclick=()=>Kt({t:"sim",kind:"gift",user:"",name:l.value,avatar:c.value,team:h.value,value:J.value,count:+u.value||1,combo:f.checked});let $=hm.byValue.find(ce=>ce.unit===xe.key)?.count??1;Le.append(re("b","",`${xe.label}`),re("span","",`${xe.icon} ${$} ${xe.name}`),re("small","",`${J.icon} ${J.value} xu`)),m.append(Le)});let x=n(t('\u{1F4AC} "1" v\xE0o Nh\xE0 Trai',()=>Kt({t:"sim",kind:"chat",user:"",name:l.value,text:"1"})),t('\u{1F4AC} "2" v\xE0o Nh\xE0 G\xE1i',()=>Kt({t:"sim",kind:"chat",user:"",name:l.value,text:"2"})),t("\u2764\uFE0F Th\u1EA3 100 tim",()=>Kt({t:"sim",kind:"like",user:"",name:l.value,team:h.value,count:100}))),g=re("div","tests");for(let[J,oe]of[["TEST NH\xC0 TRAI","trai"],["TEST NH\xC0 G\xC1I","gai"],["TEST 100 QU\xC2N","u100"],["TEST 300 QU\xC2N","u300"],["TEST COMBO QU\xC0","combo"],["TEST BOSS","boss"],["QU\xC0 NG\u1EAAU NHI\xCAN","mix"]])g.append(t(J,()=>Kt({t:"test",what:oe}),"b t"));g.append(t("RESET",()=>Kt({t:"ctl",cmd:"reset"}),"b t danger"));let p=re("input");p.type="checkbox",p.checked=$n?.settings.autoNext??!0,p.onchange=()=>Kt({t:"ctl",cmd:"settings",settings:{autoNext:p.checked}});let b=re("input");b.type="checkbox",b.checked=$n?.settings.allowDualTeam??!1,b.onchange=()=>Kt({t:"ctl",cmd:"settings",settings:{allowDualTeam:b.checked}});let _=(J,oe,xe,Le,$=1,ce=76)=>{let _e=s("",String($n?.settings[J]??oe),"number");return _e.min=String(xe),_e.max=String(Le),_e.step=String($),_e.style.width=ce+"px",_e.dataset.key=J,_e.onchange=()=>{let he=Math.max(xe,Math.min(Le,_e.value.trim()===""||!Number.isFinite(+_e.value)?oe:+_e.value));_e.value=String(he),Kt({t:"ctl",cmd:"settings",settings:{[J]:he}})},_e},y=_("countdownSec",5,0,120),T=_("gateHp",15e3,1e3,5e6,1e3,100),S=_("houseHp",4e4,1e3,2e7,1e3,100),A=_("likesPerUnit",3,0,1e4,1,70),E=_("likeUnitsMax",15,0,500,1,64),v=s("Gi\xE2y",String($n?.settings.gatherSec??30),"number");v.min="0",v.max="300",v.style.width="70px",v.onchange=()=>Kt({t:"ctl",cmd:"settings",settings:{gatherSec:+v.value}});let M=s("Gi\xE2y",String($n?.settings.roundSec??270),"number");M.min="30",M.max="3600",M.style.width="76px",M.onchange=()=>Kt({t:"ctl",cmd:"settings",settings:{roundSec:+M.value}});let C=(J,oe)=>{let xe=re("label","tg");return xe.append(J,document.createTextNode(" "+oe)),xe},U=s("T\xEAn ho\u1EB7c id ng\u01B0\u1EDDi xem"),k=n(t("\u{1F3AC} \u0110\u1EA1o di\u1EC5n",()=>Ve.setMode("auto")),t("\u{1F5FA}\uFE0F To\xE0n c\u1EA3nh",()=>Ve.setMode("overview")),...[0,1,2].map(J=>t(am[J],()=>Ve.setMode("lane",J))),t("\u2694\uFE0F Giao tranh",()=>Ve.setMode("combat"))),O=re("input");O.type="checkbox",O.checked=Ve.auto,O.onchange=()=>{Ve.auto=O.checked};let G=re("input");G.type="checkbox",G.id="liveBoard",G.checked=$n?.settings.showBoard??!1,G.onchange=()=>Kt({t:"ctl",cmd:"settings",settings:{showBoard:G.checked}});let H=re("select");H.id="qSel";for(let J of["medium","high","ultra"]){let oe=re("option","",Ms[J].label);oe.value=J,H.append(oe)}H.value=Ai,H.onchange=()=>n0(H.value);let ee=re("a","note","\u2197 M\u1EDF m\xE0n h\xECnh LIVE 9:16");ee.href="/?live=1",ee.onclick=J=>{J.preventDefault(),window.open("/?live=1","chien-live","width=540,height=960")};let X=re("div","stats");X.id="stats";let ie=re("div","log");ie.id="log",e.replaceChildren(i("tt","K\u1EBFt n\u1ED1i TikTok LIVE",!0,n(a,t("K\u1EBFt n\u1ED1i",()=>{Mn("tt",a.value),Kt({t:"ctl",cmd:"connect",user:a.value})},"b main"),t("Ng\u1EAFt",()=>Kt({t:"ctl",cmd:"disconnect"}))),o),i("round","V\xF2ng \u0111\u1EA5u",!0,n(t("\u2694\uFE0F B\u1EAFt \u0111\u1EA7u ngay",()=>Kt({t:"ctl",cmd:"go"}),"b main"),t("\u23F8",()=>Kt({t:"ctl",cmd:"pause"})),t("\u23EF",()=>Kt({t:"ctl",cmd:"resume"})),t("\u23F9 K\u1EBFt th\xFAc",()=>Kt({t:"ctl",cmd:"end"}))),n(C(y,"gi\xE2y \u0111\u1EBFm ng\u01B0\u1EE3c"),C(v,"gi\xE2y t\u1EADp h\u1EE3p")),n(C(M,"gi\xE2y giao chi\u1EBFn (t\u1ED5ng th\u1EDDi gian \u0111\xE1nh)")),re("div","lbl2","M\xE1u c\u0103n c\u1EE9 hai b\xEAn (\xE1p d\u1EE5ng ngay, gi\u1EEF t\u1EC9 l\u1EC7 m\xE1u \u0111ang c\xF2n)"),n(C(T,"m\xE1u c\u1ED5ng"),C(S,"m\xE1u nh\xE0 ch\xEDnh")),re("div","lbl2","Th\u1EA3 tim ra D\xE2n binh (0 tim = t\u1EAFt). Qu\xE2n t\u1EEB tim kh\xF4ng g\xF3p l\u1EF1c chi\u1EBFn, qu\xE2n t\u1EEB qu\xE0 lu\xF4n ra tr\u01B0\u1EDBc"),n(C(A,"tim = 1 D\xE2n binh"),C(E,"t\u1ED1i \u0111a / ng\u01B0\u1EDDi / v\xF2ng")),n(C(p,"T\u1EF1 \u0111\u1ED9ng sang v\xF2ng m\u1EDBi")),n(C(b,"Cho ph\xE9p m\u1ED9t ng\u01B0\u1EDDi c\xF3 qu\xE2n \u1EDF c\u1EA3 hai phe"))),i("sim","Gift Simulator",!0,n(l),n(c),n(h,u,d),m,x,re("div","lockNote","\u{1F512} \u0110ang LIVE th\u1EADt: qu\xE0 th\u1EED b\u1ECB kh\xF3a")),i("test","Ki\u1EC3m th\u1EED nhanh",!0,g),i("board","BXH l\u1EF1c chi\u1EBFn th\xE1ng",!1,n(t("\u{1F3C6} Xem BXH",()=>{ut.boardOpen=!ut.boardOpen,$n&&ut.render($n)}),C(G,"Hi\u1EC7n BXH tr\xEAn m\xE0n LIVE")),n(t("\u{1F9F9} X\xF3a ng\u01B0\u1EDDi ch\u01A1i th\u1EED kh\u1ECFi BXH",()=>Kt({t:"ctl",cmd:"boardClearSim"})))),i("team","Host ph\xE2n phe",!1,n(U,t("\u{1F935} Trai",()=>Kt({t:"ctl",cmd:"assign",user:U.value,team:"trai"})),t("\u{1F470} G\xE1i",()=>Kt({t:"ctl",cmd:"assign",user:U.value,team:"gai"})))),i("gfx","\u0110\u1ED3 h\u1ECDa",!0,n(H,re("span","note","FPS th\u1EA5p k\xE9o d\xE0i th\xEC t\u1EF1 h\u1EA1 m\u1ED9t m\u1EE9c"))),i("cam","Camera",!1,k,n(C(O,"T\u1EF1 \u0111\u1ED9ng gh\xE9 ch\u1ED7 giao tranh"),t("\u21BA Reset camera",()=>Ve.reset()))),ee,X,ie)}function Mn(r,e){try{if(e===void 0){let t=localStorage.getItem("chien."+r);return t===null?null:JSON.parse(t)}localStorage.setItem("chien."+r,JSON.stringify(e))}catch{}return null}var Ud={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down",PageUp:"tiltUp",PageDown:"tiltDown","+":"zoomIn","=":"zoomIn","-":"zoomOut",_:"zoomOut",q:"rotL",Q:"rotL",e:"rotR",E:"rotR"},r0=r=>["INPUT","SELECT","TEXTAREA"].includes(r?.tagName??"");addEventListener("keydown",r=>{let e=Ud[r.key];e&&!r0(r.target)&&(r.preventDefault(),Ve.hold(e,!0))});addEventListener("keyup",r=>{let e=Ud[r.key];e&&Ve.hold(e,!1)});addEventListener("blur",()=>{for(let r of Object.values(Ud))Ve.hold(r,!1)});for(let r of document.querySelectorAll("#camPad [data-hold]")){let e=r.dataset.hold,t=()=>Ve.hold(e,!1);r.addEventListener("pointerdown",n=>{n.preventDefault(),r.setPointerCapture(n.pointerId),Ve.hold(e,!0)}),r.addEventListener("pointerup",t),r.addEventListener("pointercancel",t),r.addEventListener("lostpointercapture",t)}document.getElementById("camPadReset")?.addEventListener("click",()=>Ve.reset());addEventListener("keydown",r=>{r0(r.target)||((r.key==="1"||r.key==="2"||r.key==="3")&&Ve.setMode("lane",+r.key-1),(r.key==="o"||r.key==="O")&&Ve.setMode("overview"),(r.key==="a"||r.key==="A")&&Ve.setMode("auto"),(r.key==="c"||r.key==="C")&&Ve.setMode("combat"),(r.key==="r"||r.key==="R")&&Ve.reset())});Ke("camReset").onclick=()=>Ve.reset();Ke("boardBtn").onclick=()=>{ut.boardOpen=!ut.boardOpen,$n&&ut.render($n)};Ke("goBtn").onclick=()=>Kt({t:"ctl",cmd:"go"});var Ja=Ke("soundBtn"),Id=Ke("musicBtn");Ja.onclick=()=>{Ge.on?(Ge.stop(),Ja.textContent="\u{1F508}"):(Ge.start(),Ja.textContent="\u{1F50A}"),Mn("sound",Ge.on)};Id.onclick=()=>{Ge.music=!Ge.music,Id.style.opacity=Ge.music?"1":"0.45",Mn("music",Ge.music)};Ge.music=Mn("music")??!0;Id.style.opacity=Ge.music?"1":"0.45";($s||Mn("sound"))&&addEventListener("pointerdown",()=>{Ge.on||(Ge.start(),Ja.textContent="\u{1F50A}")},{once:!0});$s&&(Ge.start(),Ja.textContent="\u{1F50A}");var Zm=performance.now(),rc=60,Kr=0,jm=0,Jm=performance.now()+12e3;function a0(r){let e=Math.min(.1,Math.max(0,(r-Zm)/1e3));if(Zm=r,rc+=(1/Math.max(e,.001)-rc)*.05,Kr=rc<40?Kr+e:Math.max(0,Kr-e),gt.budget=Kr>3?.45:1,Kr>6&&r>Jm){let t=Cm(Ai);t&&(n0(t,"t\u1EF1 h\u1EA1 v\xEC FPS th\u1EA5p"),Jm=r+15e3,Kr=0)}ni.time.value=r/1e3,ni.wind.value=.35,Ve.update(e,r),jM(Ve.target),wi.update(e,r/1e3,0),Ys.update(e,r),ft.draw(Kn,r);for(let t of ft.units.values()){if(!t.visible||t.state==="dead")continue;t.flags&6&&Math.random()<e*(t.flags&ii.charge?70:30)&&gt.trail(t.rx,t.rz,12166540);let n=t.info.kind;if(n==="voi"||n==="trau"){let i=n==="voi"?2.2:1.6,s=Za.get(t.id)??t.odo;if(t.odo-s>=i){Za.set(t.id,t.odo);let a=(Math.floor(t.odo/i)%2?1:-1)*.7,o=Math.cos(t.ryaw),l=Math.sin(t.ryaw);gt.footstep(t.rx+o*a,t.rz-l*a,n==="voi"),n==="voi"&&(Ge.play("step",.9,t.rx,t.rz),Ve.shake=Math.max(Ve.shake,.06))}else Za.has(t.id)||Za.set(t.id,t.odo)}}for(let t of Br)lc[t].update(e,r/1e3,gt,$n?.teams[t].pending??0);if(gt.update(e),Ge.update(),cc.render(),ut.plates3d(ft.units.values(),Kn,r,Ve.distance,JM),ut.drawNums(Kn,r),(jm-=e)<=0){jm=1;let t=document.getElementById("fps");t&&(t.textContent=`${Math.round(rc)} fps \xB7 v\u1EBD ${ft.drawn} \xB7 \u1EA9n ${ft.culled} \xB7 cam ${Ve.mode}${Ve.manual?"*":""} ${Ve.distance.toFixed(0)}m`)}requestAnimationFrame(a0)}zm?i1(zm):i0();requestAnimationFrame(a0);function i1(r){let e=Object.keys(Wt),t=performance.now(),n=[];for(let s=0;s<r;s++){let a=s%2?"gai":"trai",o=e[s<r*.02?5:s<r*.05?4:s<r*.1?3:Math.floor(Math.random()*3)],l=(a==="trai"?-1:1)*(4+Math.random()*30),c=-6+Math.random()*30;ft.add({id:s+1,kind:o,team:a,owner:"bench"+s%40,name:"Qu\xE2n "+(s+1),avatar:"",maxHp:Wt[o].hp,stack:1,lane:0},l,c,t-5e3),n.push({id:s+1,x:l,z:c,tx:l,tz:c,yaw:0,sp:Wt[o].speed})}let i=0;setInterval(()=>{let s=[];for(let a of n){Math.hypot(a.tx-a.x,a.tz-a.z)<.5&&(a.tx=(Math.random()-.5)*70,a.tz=-6+Math.random()*30);let o=a.tx-a.x,l=a.tz-a.z,c=Math.hypot(o,l),h=Math.min(c,a.sp*.1);a.x+=o/c*h,a.z+=l/c*h,a.yaw=Math.atan2(o,l);let u=Math.random()<.08;if(u){let d=ft.units.get(a.id);d&&(d.atkAt=performance.now())}s.push(a.id,Math.round(a.x*100),Math.round(a.z*100),0,Math.round(a.yaw*100),9999,u?4:2,0)}ft.applyFrame(s,++i,performance.now())},100),ut.feed(`\u{1F9EA} \u0110o hi\u1EC7u n\u0103ng: ${r} qu\xE2n gi\u1EA3 (kh\xF4ng c\xF3 server). Xem fps \u1EDF g\xF3c d\u01B0\u1EDBi ph\u1EA3i.`,"note")}function s1(){let r=new st;for(let e of[0,1,2])for(let t of[-1,1]){let n=document.createElement("canvas");n.width=256,n.height=96;let i=n.getContext("2d");i.fillStyle="rgba(255,245,220,.85)",i.font='bold 64px "Be Vietnam Pro", "Segoe UI", sans-serif',i.textAlign="center",i.textBaseline="middle",i.fillText(`L\xC0N ${e+1}`,128,50);let s=new ln(n);s.colorSpace=ct;let a=$i.point(e,"trai",t<0?14:$i.length(e)-14),o=new Ne(new Vt(4.4,1.65).rotateX(-Math.PI/2),new vt({map:s,transparent:!0,depthWrite:!1}));o.position.set(a.x,.03,a.z),o.userData.laneLabel=!0,r.add(o)}return r}})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
