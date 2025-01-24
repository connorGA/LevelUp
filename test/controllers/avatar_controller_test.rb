require "test_helper"

class AvatarControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get avatar_show_url
    assert_response :success
  end
end
