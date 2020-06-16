class SearchQuery < ApplicationRecord
    has_many :recommendations, dependent: :destroy
    belongs_to :user
end
