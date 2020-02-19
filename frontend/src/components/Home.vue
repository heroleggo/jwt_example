<template>
	<div style="margin-left: 20px;">
		<br>
		<h2>Home</h2>
		<br>
		<div>{{ greeting }}</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data () {
		return {
			greeting: ''
		}
	},
	created () {
		axios.get('http://localhost:3000/home')
			.then(result => this.greeting = result.data.greeting)
	}
}
</script>