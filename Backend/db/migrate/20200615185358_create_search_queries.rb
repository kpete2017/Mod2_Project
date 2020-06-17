class CreateSearchQueries < ActiveRecord::Migration[6.0]
  def change
    create_table :search_queries do |t|
      t.string :name
      t.string :search_type
      t.string :wTeaser
      t.string :wUrl
      t.string :yUrl
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
