Factory.define :user do |user|
  user.name                  "Sarzema"
  user.email                 "khplanner@gmx.de"
  user.password              "foobar"
  user.password_confirmation "foobar"
end

Factory.sequence :email do |n|
  "person-#{n}@example.com"
end