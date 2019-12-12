new Vue({
  el: '#app',
  data: {
    currencies: {},
    amount: 0,
    from: 'EUR',
    to: 'USD',
    result: 0,
    loading: false
  },
  mounted() {
    this.getCurrencies();
  },
  //if data changes it will work
  computed: {
    formatedCurrencies() {
      return Object.values(this.currencies);
    },
    calculateResult() {
      return (Number(this.amount) * this.result).toFixed(3);
    },
    disabled() {
      return this.amount === 0 || !this.amount || this.loading;
    }
  },
  methods: {

    getCurrencies() {
      const currencies = localStorage.getItem('currencies');
      if (currencies) {
        this.currencies = JSON.parse(currencies);
        return;
      }

      axios.get('https://free.currconv.com/api/v7/currencies?apiKey=do-not-use-this-key')
        .then(response => {

          this.currencies = response.data.results;
          localStorage.setItem('currencies', JSON.stringify(response.data.results))

        });
    },
    convertCurrencies: function () {
      const key = `${this.from}_${this.to}`
      this.loading = true;
      axios.get(`https://free.currconv.com/api/v7/convert?q=${key}&apiKey=do-not-use-this-key`)
        .then(response => {
          this.loading = false
          this.result = response.data.results[key].val
        })
    }

  },
  watch: {
    from() {
      this.result = 0
    },
    to() {
      this.result = 0
    }
  }

});
