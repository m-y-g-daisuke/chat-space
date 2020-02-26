FactoryBot.define do
  factory :message
  content {Faker::JapaneseMedia::DragonBall.character}
  image
  group
  user

end