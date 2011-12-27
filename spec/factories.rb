Factory.define :user do |user|
  user.name                  "Sarzema"
  user.email                 "khplanner@gmx.de"
  user.password              "foobar"
  user.password_confirmation "foobar"
end

Factory.sequence :email do |n|
  "person-#{n}@example.com"
end

Factory.define :doctor do |doctor|
  doctor.name   "Prof.Dr.Brainiac"
  doctor.avatar "http://portraits.kapihospital.de/users/3/3220505bba8933555b772d759d9e83a5_m.png"
  doctor.level  25
  doctor.server 8
  doctor.av     "Grey's Anatomy"
end