# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Recommendation.destroy_all
SearchQuery.destroy_all
User.destroy_all

kyle = User.create({name: "Kyle", username: "kylep20", password:"Iheartrhcp30" })

uri_string = "https://tastedive.com/api/similar?q=red+hot+chili+peppers&k=375558-WillReev-I7J6U4X5"
uri = URI.parse(uri_string)
uri_response = Net::HTTP.get_response(uri)
final_result = JSON.parse(uri_response.body)

puts final_result

rhcp = SearchQuery.create({name: final_result["Similar"]["Info"][0]["Name"], search_type: final_result["Similar"]["Info"][0]["Type"], user_id: kyle.id })

final_result["Similar"]["Results"].each do |recomendation|
    Recommendation.create({name: recomendation["Name"], search_query_id: rhcp.id})
end

uri_string = "https://tastedive.com/api/similar?q=Queen&k=375558-WillReev-I7J6U4X5"
uri = URI.parse(uri_string)
uri_response = Net::HTTP.get_response(uri)
final_result = JSON.parse(uri_response.body)

queen = SearchQuery.create({name: final_result["Similar"]["Info"][0]["Name"], search_type: final_result["Similar"]["Info"][0]["Type"], user_id: kyle.id })

final_result["Similar"]["Results"].each do |recomendation|
    Recommendation.create({name: recomendation["Name"], search_query_id: queen.id})
end