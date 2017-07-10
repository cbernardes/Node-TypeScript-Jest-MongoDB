
export let Dates = {
  created: {
    type: Date,
    default: new Date()
  },
  modified: {
    type: Date,
    default: new Date()
  }
}

export let Planning = {
  start: Date,
  end: Date,
  expiry: Date
}

export let Display ={
  active: {
    type: Boolean
    default: false
  }
  live: {
    type: Boolean
    default: false
  }
  test: {
    type: Boolean
    default: false
  }
}
