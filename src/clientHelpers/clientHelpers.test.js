const ch = require('./clientHelpers')

it('catches invalid passwords', ()=>{
  expect(ch.validPassword('1')).toBeFalsy()
  expect(ch.validPassword('√åß∂ƒ©πøˆ¨¥')).toBeFalsy()
  expect(ch.validPassword(' starts-with-spaces')).toBeFalsy()
  expect(ch.validPassword('1[]\<>;\'"}{|()}')).toBeFalsy()
  expect(ch.validPassword('!K8*^.!@8')).toBeTruthy()
})

it('catches invalid names', ()=>{
  expect(ch.validName('1')).toBeFalsy()
  expect(ch.validName('James')).toBeTruthy()
})

it('catches invalid emails', ()=>{
  expect(ch.validEmail('1')).toBeFalsy()
  expect(ch.validEmail('James@bob.com')).toBeTruthy()
  expect(ch.validEmail('James@mailinator.net')).toBeTruthy()
})