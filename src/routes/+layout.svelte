<script>
	import '../css/theme.css';
	import '../css/animations.css';
	import '../css/global.css';
	import { createWizard } from '../stores/wizardStore';

	let signup = createWizard();
	$: console.log('signup: ', $signup);
</script>

<nav>
	<ul>
		<li><a href="/">Account</a></li>
		<li><a href="/tiers">Tiers</a></li>
		<li><a href="/payment">Payment</a></li>
	</ul>
</nav>
<slot />

<style>
	ul {
		list-style: none;
		display: flex;
		justify-content: space-between;
		max-width: 500px;
		margin: 0 auto 8px;
		padding: 0;
	}
</style>
