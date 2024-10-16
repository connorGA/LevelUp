require "test_helper"

class PlotsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get plots_show_url
    assert_response :success
  end
end
