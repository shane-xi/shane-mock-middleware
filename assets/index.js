Vue.config.devtools = true
const ConfigItem = {
	template: '#config-item',
	props: {
		config: Object,
		value: String
	},
	computed: {
		opt_list() {
			const opts = this.config.options
			if (Array.isArray(opts)) return opts
			return Object.keys(opts).map((key) => ({value: key, desc: opts[key]}))
		}
	},
	methods: {
		onInput(value) {
			this.$emit('change', {key: this.config.key, value})
		}
	}
}

new Vue({
	el: '#app',
	data: {
		configs: null,
		active_type: 'default'
	},
	components: {
		ConfigItem
	},
	computed: {
		config_groups() {
			let groups = []
			let group_map = {}
			const configs = this.configs
			if (!configs) return null
			for (let configKey of Object.keys(configs)) {
				let configItem = configs[configKey]
				configItem.key = configKey
				let type = configItem.type || 'default'
				let group = group_map[type]
				if (!group) {
					group = {
						type: type,
						configs: []
					}
					group_map[type] = group
					groups.push(group)
				}
				group.configs.push(configItem)
			}
			return groups
		},
		active_group() {
			return this.config_groups && this.config_groups.find((group) => group.type === this.active_type)
		}
	},
	methods: {
		getConfig() {
			return fetch('/mock-config')
				.then(res => res.json())
				.then(data => {
					this.configs = data
				})
		},
		postConfig(config) {
			return fetch('/mock-config', {
				method: 'POST',
				headers:{
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(config)
			})
				.then(res => res.json())
				.then(data => {
					this.configs = data
				})
		},
		onConfigChange({key, value}) {
			this.postConfig({key: key, value: value}, (data) => this.configs = data)
		}
	},
	created() {
		this.getConfig()
	}
})