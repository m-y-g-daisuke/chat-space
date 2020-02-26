FactoryBot.define do
  factory :group
  name    {Faker::Team.name}
end