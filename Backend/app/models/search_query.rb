class SearchQuery < ApplicationRecord
    has_many :recommendations
    belongs_to :user
end
