STATE = {};
function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};

document.addEventListener('DOMContentLoaded', function() {
    //paintStatic();
	let v = new URLSearchParams(window.location.search).get("v");
	if( v !== null) {
		console.log( "found vault from url" , v);
		if( ethers.utils.isAddress(v) ) {
			$("inp-addr").value = v;
		}
	}
	let c = new URLSearchParams(window.location.search).get("c");
	if( c !== null) { STATE.uCHAINID = c; }
});

window.addEventListener(
	'load',
	async function() {
		console.log("waitin for 3 secs..");
		$("cw_m").innerHTML = "Connecting.. Please wait."
		setTimeout(async () => { await basetrip(); }, 3000);
	},
	false
);


function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById("tablinks_"+tabName).className+=" active";
    document.getElementById(tabName).style.display = "block";
    //evt?.currentTarget?.className += " active";
    //window.location = "#"+tabName;
}



async function basetrip() {
	////provider = new ethers.providers.JsonRpcProvider("https://base.llamarpc.com")//https://mainnet.base.org");
	////if(window.ethereum) window.ethereum.selectedAddress="0x167d87a906da361a10061fe42bbe89451c2ee584"
	////else window.ethereum = {selectedAddress:"0x167d87a906da361a10061fe42bbe89451c2ee584"}
	////await dexstats();
	/////////////
	////return;

	if(!(window.ethereum)){
		$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");
		return;
	}
	else {
		console.log("Recognized Ethereum Chain:", window.ethereum.chainId);
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = provider.getSigner();
		if(!(window.ethereum.selectedAddress==null)){
			console.log("Found old wallet:", window.ethereum.selectedAddress);
			cw();
		}
		else {
			console.log("Didnt find a connected wallet!");
			cw();
		}
	}


	//DrefreshFarm()
	arf();
	cw();
	await dexstats();
}



async function cw() {
	let cs = await cw2(); cs?console.log("Good to Transact"):cw2();
	cw2();
}
async function cw2() {
	if(!(window.ethereum)){notice(`Metamask not detected!<br>Please Refresh the Page<br><div onclick="window.location.reload()" class="c2a-1 submit equal-gradient c2abtn">Refresh</div>`);return(0)}
	if(typeof provider == "undefined"){notice(`Provider not detected!<br>Please connect with a web3 provider or wallet and refresh this page.<br><div onclick="window.location.reload()" class="c2a-1 submit equal-gradient c2abtn">Refresh</div>`);return(0)}
	/*
	if(!
		(isFinite(Number(accounts[0])))
		|| (isFinite(Number(window.ethereum.selectedAddress)))
	){console.log("NAAAAAAAAAAAAAAAAA");window.location.reload();}
	*/

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}


	/*006
	const en6 = await window.ethereum.enable()
	if(Number(en6[0]) > 0){console.log("006 - Success",en6)}
	else{console.log("006 - Failure", en6)}
	*/


	/*003
	try {
      console.log("attempting cw()")
      const addresses = await provider.request({ method: "eth_requestAccounts" });
      console.log("addresses:",addresses)
    } catch (e) {
      console.log("error in request", e);
      window.location.reload(true);
    }
    */

    //002
    //try{await provider.send("eth_requestAccounts", []);console.log("CWE:",e);}//await window.ethereum.enable();
	//catch(e){console.log("CWE:",e);window.location.reload(true)}
	console.log("doing the paints")
	$("cw").innerHTML=
		"<div>"
		+(window.ethereum.selectedAddress).substr(0,10)
		+"..."
		+(window.ethereum.selectedAddress).substr(34)
		+"</div><div class='hint'>On "
		+Object.keys(ALL_CHAINS).filter( e => ALL_CHAINS[e].chainId == Number(window.ethereum.chainId))[0]??"unknown-chain"
		+"</div>"
	;
	//$("cw").innerHTML= `<div>Connected to your Wallet <br> ${window.ethereum.selectedAddress}</div>`
	//$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);
	//if(window.ethereum.chainId==250) (new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>{if(rn.length>0){$("cw").innerHTML="hi, <span style='/*font-family:bold;font-size:1.337em*/'>"+rn[0]+"</span> 👋"}else{$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);}})
	$("cw_m").innerHTML=""
	$("connect").style.display="none";
	$("switch").style.display="block";
	//farm_1_f_chappro()
	gubs();
	return(1);
}

/*
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Th."}
	else if(_n>0){n_=(_n/1e0).toFixed(5)+""}
	return(n_);
}
*/
function fornum(n,d) {
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+"M"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+"K"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(5)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}
function fornum2(n,d) {
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Thousand"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(4)+""}
	else if(_n>0){n_=(_n).toFixed(8)+""}
	return(n_);
}


function fornum5(n,d) { // full flex
	return (Number(n)/10**Number(d)).toLocaleString(undefined,{maximumFractionDigits:d}) ;
}
function fornum6(n,f) {
	return (Number(n)).toLocaleString(undefined,{maximumFractionDigits:f}) ;
}
// use f when thousands separator is in play, else use f=4 default
function fornum7(n,d,f) {
	let _num = (Number(n)/10**Number(d));
	f = (f == undefined) ? 0 : f;
	return (
		(_num < 1e3)
			? _num.toLocaleString(undefined,{ maximumFractionDigits: ((f>4) ? f : 4) })
			: _num.toLocaleString(undefined,{ maximumFractionDigits: f })
		)
	;
}

function notice(c) {
	window.location = "#note"
	$("content1").innerHTML = c
	console.log(c)
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const timeFormat = (timestamp) => {const seconds = Math.floor((Date.now() - timestamp) / 1000);const prefix = seconds < 0 ? "For the next " : "Expired ";const absSeconds = Math.abs(seconds);return prefix + (absSeconds < 60 ? absSeconds + " seconds" : absSeconds < 3600 ? Math.floor(absSeconds / 60) + " minutes" : absSeconds < 86400 ? Math.floor(absSeconds / 3600) + " hours" : absSeconds < 2592000 ? Math.floor(absSeconds / 86400) + " days" : absSeconds < 31536000 ? Math.floor(absSeconds / 2592000) + " months" : Math.floor(absSeconds / 31536000) + " years") + (seconds < 0 ? "" : " ago");};

LPABI = ["function balanceOf(address) public view returns(uint)","function metadata() public view returns(uint,uint,uint,uint,bool,address,address)","function getAssetPrice(address) public view returns(uint)","function approve(address,uint)","function allowance(address,address) public view returns(uint)","function earned(address,address) public view returns(uint)","function earnings(address,address) public view returns(uint)","function name() public view returns(string)","function symbol() public view returns(string)","function tvl() public view returns(uint)","function tvlDeposits() public view returns(uint)","function apr() public view returns(uint)","function totalSupply() public view returns(uint)","function deposit(uint)","function withdraw(uint)","function depositAll()","function withdrawAll()","function mint(uint)","function redeem(uint)","function mintAll()","function redeemAll()"]



async function paintStatic(_params) {
}

async function dexstats() {
	if( window.ethereum.selectedAddress == null ) {
		notice(`<h3>Welcome!</h3> Please First Switch to desired chain in your Wallet Manully, Then Refresh this Page, then Connect your wallet & Enter the details.`);
		return;
	}

	if( ! TOKEN_MAKERS[ Number(window?.ethereum?.chainId ?? 0 ) ] ) {
		notice(`Token Maker is not supported on this chain yet.. sorry! Please reach out to us on <a target="blank" href="https://discord.gg/QpyfMarNrV">Discord</a> to have this chain added!`);
		return;
	}

	return;
}


async function arf(){
	let c=0;
	var xfr = setInterval(
		async function(){
			console.log("refreshing farm stats", new Date(), c );
			try {
				if( ethers?.utils?.isAddress(window?.ethereum?.selectedAddress) ) { gubs();}
				dexstats()
			}
			catch(e) { console.log('hmm..'); }
			c++;
		},
		16_000
	);
}
async function gubs() {
	dexstats()
	return;
}









async function makeToken() {
	await dexstats();

	_n = $("inp-name").value;
	_s = $("inp-symbol").value;
	_t = $("inp-supply").value;

	if(_n.length==0 || _s.length==0 || !isFinite(_t)) {
		notice("Please correct the Name/Symbol/Supply of your token");
		return;
	}

	else {
		_t = BigInt(Math.floor(_t));
		notice(`
			<h3>Creating your token!</h3>
			Name : ${_n} <br>
			Symbol : ${_s} <br>
			Supply: ${_t} <br> <br>
			<h4><u><i>Confirm this transaction in your wallet!</i></u></h4>
		`);
		TM = new ethers.Contract( TOKEN_MAKERS[Number(window.ethereum.chainId)] , ["function makeToken(string memory _n, string memory _s, uint _its) external"], signer);
		let _tr = await TM.makeToken( _n, _s, _t, {value: BigInt(0.000001337e18)});
		console.log(_tr);
		notice(`
			<h3>Submitting Transaction!</h3>
			Transaction hash: ${_tr.hash}
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Token Deployed!</h3>
			View it here: ${_tr.hash}
		`);
	}
	gubs();
}
