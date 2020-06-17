class User < ApplicationRecord
    has_many :search_queries

    # def filter_queries(search)
    #     sq =  self.search_queries.where(search_type: search)
    # end
end
