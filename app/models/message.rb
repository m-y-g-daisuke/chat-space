class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  vaidation  :content, precence: true, unless: :image?

  mount_uploader :image, ImageUploader
end
