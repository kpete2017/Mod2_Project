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

kyle = User.create({ name: "Kyle", username: "kylep20", password:"Iheartrhcp30" })
will = User.create({ name: "Will", username: "Will's Username", password: "Will's Password" })


uri_string = "https://tastedive.com/api/similar?q=red+hot+chili+peppers&info=1&k=375558-WillReev-I7J6U4X5"
uri = URI.parse(uri_string)
uri_response = Net::HTTP.get_response(uri)
final_result = JSON.parse(uri_response.body)

rhcp = SearchQuery.create({
    name: final_result["Similar"]["Info"][0]["Name"], 
    search_type: final_result["Similar"]["Info"][0]["Type"],
    wTeaser: final_result["Similar"]["Info"][0]["wTeaser"],
    wUrl: final_result["Similar"]["Info"][0]["wUrl"],
    yUrl: final_result["Similar"]["Info"][0]["yUrl"],  
    user_id: kyle.id })

final_result["Similar"]["Results"].each do |recomendation|
    Recommendation.create({
    name: recomendation["Name"],
    search_type: recomendation["Type"], 
    wTeaser: recomendation["wTeaser"], 
    wUrl: recomendation["wUrl"], 
    yUrl: recomendation["yUrl"], 
    search_query_id: rhcp.id})
end

puts final_result

uri_string = "https://tastedive.com/api/similar?q=Queen&k=375558-WillReev-I7J6U4X5"
uri = URI.parse(uri_string)
uri_response = Net::HTTP.get_response(uri)
final_result = JSON.parse(uri_response.body)

queen = SearchQuery.create({
    name: final_result["Similar"]["Info"][0]["Name"], 
    search_type: final_result["Similar"]["Info"][0]["Type"],
    wTeaser: final_result["Similar"]["Info"][0]["wTeaser"],
    wUrl: final_result["Similar"]["Info"][0]["wUrl"],
    yUrl: final_result["Similar"]["Info"][0]["yUrl"],  
    user_id: kyle.id })

final_result["Similar"]["Results"].each do |recomendation|
    Recommendation.create(
        {name: recomendation["Name"],
        search_type: recomendation["Type"], 
        wTeaser: recomendation["wTeaser"], 
        wUrl: recomendation["wUrl"], 
        yUrl: recomendation["yUrl"], 
        search_query_id: queen.id})
end

puts final_result

uri_string = "https://tastedive.com/api/similar?q=Gorillaz&k=375558-WillReev-I7J6U4X5"
uri = URI.parse(uri_string)
uri_response = Net::HTTP.get_response(uri)
final_result = JSON.parse(uri_response.body)

gorillaz = SearchQuery.create({name: final_result["Similar"]["Info"][0]["Name"], search_type: final_result["Similar"]["Info"][0]["Type"], user_id: will.id })

final_result["Similar"]["Results"].each do |recomendation|
    Recommendation.create({
        name: recomendation["Name"],
        search_type: recomendation["Type"], 
        wTeaser: recomendation["wTeaser"], 
        wUrl: recomendation["wUrl"], 
        yUrl: recomendation["yUrl"], 
        search_query_id: gorillaz.id})
end

puts final_result